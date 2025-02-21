import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  GiftedChat,
  IMessage,
  Bubble,
  InputToolbar,
} from "react-native-gifted-chat";

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

  // Customize chat bubbles for a modern look
  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#0066ff",
          borderRadius: 15,
          margin: 0,
        },
        left: {
          backgroundColor: "#e6e6e6",
          borderRadius: 15,
          margin: 0,
        },
      }}
      textStyle={{
        right: {
          color: "#fff",
        },
        left: {
          color: "#333",
        },
      }}
    />
  );

  // Customize the input toolbar with rounded corners
  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
        borderRadius: 25,
        margin: 10,
        paddingHorizontal: 10,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMsgs) => onSend(newMsgs)}
        user={{
          _id: 1,
          name: "You",
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc", // Soft modern background color
  },
});
