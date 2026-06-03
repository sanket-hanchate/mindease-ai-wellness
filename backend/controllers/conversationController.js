const Conversation =
require("../models/Conversation");

const Chat = require("../models/Chat");

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

exports.deleteConversation =
async (req, res) => {

  try {

    const conversationId =
      req.params.id;

    await Conversation.findByIdAndDelete(
      conversationId
    );

    await Chat.deleteMany({
      conversationId,
    });

    res.json({
      message:
        "Conversation deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};