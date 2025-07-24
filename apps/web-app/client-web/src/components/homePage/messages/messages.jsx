import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Star, Circle, Clock } from "lucide-react";
import styles from "./messages.module.css";

const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([
    {
      id: 1,
      providerName: "Sarah Johnson",
      profilePicture:
        "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      status: "online",
      lastMessage: "I'll be there in 15 minutes!",
      timestamp: "2 min ago",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "provider",
          text: "Hi! I'm on my way to your location.",
          timestamp: "10:30 AM",
          read: true,
        },
        {
          id: 2,
          sender: "client",
          text: "Great! How long until you arrive?",
          timestamp: "10:32 AM",
          read: true,
        },
        {
          id: 3,
          sender: "provider",
          text: "I'll be there in 15 minutes!",
          timestamp: "10:33 AM",
          read: false,
        },
        {
          id: 4,
          sender: "provider",
          text: "Traffic is lighter than expected 😊",
          timestamp: "10:34 AM",
          read: false,
        },
      ],
    },
    {
      id: 2,
      providerName: "Mike Rodriguez",
      profilePicture:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.7,
      status: "Last seen 5 mins ago",
      lastMessage: "The deep cleaning is complete!",
      timestamp: "1 hour ago",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "How's the deep cleaning going?",
          timestamp: "9:15 AM",
          read: true,
        },
        {
          id: 2,
          sender: "provider",
          text: "Going well! Just finished the kitchen and bathrooms.",
          timestamp: "9:45 AM",
          read: true,
        },
        {
          id: 3,
          sender: "provider",
          text: "The deep cleaning is complete!",
          timestamp: "10:30 AM",
          read: true,
        },
        {
          id: 4,
          sender: "client",
          text: "Excellent! Thank you so much.",
          timestamp: "10:32 AM",
          read: true,
        },
      ],
    },
    {
      id: 3,
      providerName: "Emma Chen",
      profilePicture:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 5.0,
      status: "Last seen 2 hours ago",
      lastMessage: "I can reschedule for tomorrow",
      timestamp: "3 hours ago",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Hi Emma, I need to reschedule today's appointment",
          timestamp: "7:30 AM",
          read: true,
        },
        {
          id: 2,
          sender: "provider",
          text: "No problem! What works better for you?",
          timestamp: "7:45 AM",
          read: true,
        },
        {
          id: 3,
          sender: "provider",
          text: "I can reschedule for tomorrow",
          timestamp: "8:00 AM",
          read: false,
        },
      ],
    },
  ]);

  const messagesEndRef = useRef(null);
  const currentConversation = conversations[selectedConversation];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: currentConversation.messages.length + 1,
        sender: "client",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };

      const updatedConversations = [...conversations];
      updatedConversations[selectedConversation].messages.push(newMsg);
      updatedConversations[selectedConversation].lastMessage = newMessage;
      updatedConversations[selectedConversation].timestamp = "now";

      setConversations(updatedConversations);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Thank you!",
    "What's your ETA?",
    "Looks great!",
    "Any updates?",
  ];

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
  };

  return (
    <div className={styles.container}>
      {/* Left Pane - Conversations List */}
      <div className={styles.leftPane}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Messages</h1>
          <p className={styles.headerSubtitle}>
            Your cleaning service conversations
          </p>
        </div>

        <div className={styles.conversationsList}>
          {conversations.map((conversation, index) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(index)}
              className={`${styles.conversationItem} ${
                selectedConversation === index ? styles.selected : ""
              }`}
            >
              <div className={styles.conversationContent}>
                <div className={styles.profilePictureContainer}>
                  <img
                    src={conversation.profilePicture}
                    alt={conversation.providerName}
                    className={styles.profilePicture}
                  />
                  {conversation.status === "online" && (
                    <div className={styles.onlineIndicator}></div>
                  )}
                </div>

                <div className={styles.conversationDetails}>
                  <div className={styles.conversationHeader}>
                    <h3 className={styles.providerName}>
                      {conversation.providerName}
                    </h3>
                    <span className={styles.timestamp}>
                      {conversation.timestamp}
                    </span>
                  </div>

                  <div className={styles.ratingContainer}>
                    <Star className={styles.starIcon} />
                    <span className={styles.rating}>{conversation.rating}</span>
                  </div>

                  <p className={styles.lastMessage}>
                    {conversation.lastMessage}
                  </p>

                  {conversation.unread > 0 && (
                    <div className={styles.unreadContainer}>
                      <span className={styles.unreadBadge}>
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane - Chat Thread */}
      <div className={styles.rightPane}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderContent}>
            <img
              src={currentConversation.profilePicture}
              alt={currentConversation.providerName}
              className={styles.chatProfilePicture}
            />
            <div className={styles.chatUserInfo}>
              <h2 className={styles.chatUserName}>
                {currentConversation.providerName}
              </h2>
              <div className={styles.chatUserStatus}>
                <div className={styles.statusRating}>
                  <Star className={styles.starIcon} />
                  <span>{currentConversation.rating}</span>
                </div>
                <div className={styles.statusOnline}>
                  {currentConversation.status === "online" ? (
                    <>
                      <Circle className={styles.onlineCircle} />
                      <span className={styles.onlineText}>Online</span>
                    </>
                  ) : (
                    <>
                      <Clock className={styles.clockIcon} />
                      <span>{currentConversation.status}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {currentConversation.messages.map((message, index) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${styles[message.sender]}`}
            >
              <div
                className={`${styles.messageBubble} ${styles[message.sender]}`}
              >
                <p className={styles.messageText}>{message.text}</p>
                <div
                  className={`${styles.messageFooter} ${
                    styles[message.sender]
                  }`}
                >
                  <span className={styles.messageTime}>
                    {message.timestamp}
                  </span>
                  {message.sender === "client" && (
                    <div
                      className={`${styles.readIndicator} ${
                        message.read ? styles.read : styles.unread
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className={styles.quickReplies}>
          <div className={styles.quickRepliesContainer}>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className={styles.quickReplyButton}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className={styles.messageInput}>
          <div className={styles.inputContainer}>
            <button className={styles.attachButton}>
              <Paperclip className={styles.attachIcon} />
            </button>

            <div className={styles.textareaContainer}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={styles.textarea}
                rows="1"
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`${styles.sendButton} ${
                newMessage.trim() ? styles.enabled : styles.disabled
              }`}
            >
              <Send className={styles.sendIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Messaging };
