// src/screens/ChatScreen.tsx
import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

export const ChatScreen = () => {
  // Initialize with a welcome message
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: "Welcome to the live chat!",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Chat Bot",
      },
    },
  ]);

  // Append new messages to the state
  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMsgs) => onSend(newMsgs)}
        user={{
          _id: 1, // Change this to the current user's id if you have authentication
          name: "You",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
