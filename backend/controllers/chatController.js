const Groq = require("groq-sdk");
const Chat = require("../models/Chat");
const Conversation = require("../models/Conversation");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.sendMessage = async (req, res) => {
  try {

    const {
      message,
      conversationId,
      language,
    } = req.body;

    let languagePrompt = "";

    switch (language) {

      case "hi":
        languagePrompt =
          "Reply ONLY in Hindi.";
        break;

      case "mr":
        languagePrompt =
          "Reply ONLY in Marathi.";
        break;

      case "ta":
        languagePrompt =
          "Reply ONLY in Tamil.";
        break;

      case "te":
        languagePrompt =
          "Reply ONLY in Telugu.";
        break;

      default:
        languagePrompt =
          "Reply ONLY in English.";
    }

    const finalPrompt = `
${languagePrompt}

User Message:
${message}
`;

    const userId =
      req.user.userId;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    if (!conversationId) {
      return res.status(400).json({
        message:
          "Conversation ID is required",
      });
    }

    console.log(
      "Conversation ID:",
      conversationId
    );

    // =====================================
    // SAVE USER MESSAGE
    // =====================================

    await Chat.create({
      userId,
      conversationId,
      role: "user",
      message,
    });

    // =====================================
    // UPDATE CONVERSATION TITLE
    // =====================================

    const conversation =
      await Conversation.findById(
        conversationId
      );

    if (
      conversation &&
      conversation.title ===
      "New Chat"
    ) {

      conversation.title =
        message.length > 30
          ? message.substring(
            0,
            30
          ) + "..."
          : message;

      await conversation.save();
    }

    // =====================================
    // AI CRISIS DETECTION
    // =====================================

    const crisisCheck =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        temperature: 0,

        messages: [
          {
            role: "system",
            content: `
You are a mental-health risk classifier.

Analyze the user's message.

Return ONLY one word:

CRISIS
or
SAFE

CRISIS means:
- suicidal thoughts
- self harm
- wanting to die
- hopelessness with risk
- severe emotional crisis
- danger to self

SAFE means all other situations.
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    const crisisResult =
      crisisCheck.choices[0]
        .message.content
        .trim()
        .toUpperCase();

    const isCrisis =
      crisisResult.includes(
        "CRISIS"
      );

    console.log(
      "AI Crisis Detection:",
      crisisResult
    );

    // =====================================
    // DYNAMIC SYSTEM PROMPT
    // =====================================

    const systemPrompt =
      isCrisis
        ? `
You are MindEase Crisis Support.

The user may be experiencing severe emotional distress.

Your goals:

1. Stay calm and supportive.
2. Ask whether the user is currently safe.
3. Encourage reaching out to trusted people.
4. Encourage professional support.
5. Offer grounding techniques.
6. Never encourage self-harm.
7. Keep responses warm and concise.
8. Make the user feel heard.

Respond like a caring crisis counselor.
`
        : `
You are MindEase,
an empathetic AI mental wellness companion.

Respond supportively,
calmly and professionally.
`;

    // =====================================
    // MAIN AI RESPONSE
    // =====================================

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: finalPrompt,
          },
        ],
      });

    const reply =
      completion.choices[0]
        .message.content;

    // =====================================
    // SAVE AI MESSAGE
    // =====================================

    await Chat.create({
      userId,
      conversationId,
      role: "ai",
      message: reply,
    });

    // =====================================
    // RESPONSE
    // =====================================

    res.status(200).json({
      reply,
      crisisMode:
        isCrisis,
    });

  } catch (error) {

    console.error(
      "CHAT ERROR:",
      error
    );

    res.status(500).json({
      message:
        "AI response failed",
      error:
        error.message,
    });

  }
};

exports.getChatHistory = async (
  req,
  res
) => {
  try {

    const chats =
      await Chat.find({
        userId:
          req.user.userId,
      }).sort({
        createdAt: 1,
      });

    res.status(200).json(
      chats
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

exports.getConversationMessages =
  async (req, res) => {
    try {

      const chats =
        await Chat.find({
          conversationId:
            req.params.id,
        }).sort({
          createdAt: 1,
        });

      res.status(200).json(
        chats
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };