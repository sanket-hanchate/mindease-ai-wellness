const Conversation =
require("../models/Conversation");

exports.createConversation =
async (req, res) => {

  try {

    const conversation =
      await Conversation.create({
        userId: req.user.userId,
        title: "New Chat",
      });

    res.status(201).json(
      conversation
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getConversations =
async (req, res) => {

  try {

    const conversations =
      await Conversation.find({
        userId: req.user.userId,
      })
      .sort({
        updatedAt: -1,
      });

    res.json(conversations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getConversationMessages =
async (req, res) => {

  try {

    const chats =
      await Chat.find({
        conversationId: req.params.id,
      }).sort({
        createdAt: 1,
      });

    res.json(chats);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};