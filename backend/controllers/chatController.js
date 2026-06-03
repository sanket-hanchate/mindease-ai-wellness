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
    } = req.body;

    

    const userId = req.user.userId;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    if (!conversationId) {
      return res.status(400).json({
        message: "Conversation ID is required",
      });
    }

    console.log("Conversation ID:", conversationId);

    // Save user message
    await Chat.create({
      userId,
      conversationId,
      role: "user",
      message,
    });

    const conversation =
  await Conversation.findById(
    conversationId
  );

if (
  conversation &&
  conversation.title === "New Chat"
) {

  conversation.title =
    message.length > 30
      ? message.substring(0, 30) + "..."
      : message;

  await conversation.save();
}

    // AI response
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content:
              "You are MindEase, an empathetic AI mental wellness companion. Respond supportively, calmly, and professionally.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    const reply =
      completion.choices[0].message.content;

    // Save AI message
    await Chat.create({
      userId,
      conversationId,
      role: "ai",
      message: reply,
    });

    res.status(200).json({
      reply,
    });

  } catch (error) {

    console.error("CHAT ERROR:", error);

    res.status(500).json({
      message: "AI response failed",
      error: error.message,
    });

  }
};

exports.getChatHistory = async (req, res) => {
  try {

    const chats =
      await Chat.find({
        userId: req.user.userId,
      }).sort({
        createdAt: 1,
      });

    res.status(200).json(chats);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getConversationMessages = async (req, res) => {
  try {

    const chats =
      await Chat.find({
        conversationId: req.params.id,
      }).sort({
        createdAt: 1,
      });

    res.status(200).json(chats);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};