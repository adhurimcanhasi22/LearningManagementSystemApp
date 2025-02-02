import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export const MaterialItem = ({
  type,
  title,
  date,
}: {
  type: string;
  title: string;
  date: string;
}) => {
  const getIcon = () => {
    switch (type) {
      case "pdf":
        return (
          <MaterialIcons name="picture-as-pdf" size={24} color="#e74c3c" />
        );

      case "video":
        return <MaterialIcons name="videocam" size={24} color="#2980b9" />;

      default:
        return (
          <MaterialIcons name="insert-drive-file" size={24} color="#7f8c8d" />
        );
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>{getIcon()}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.date}>{date}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#95a5a6" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#fff",

    padding: 16,

    marginVertical: 4,

    borderRadius: 8,

    elevation: 2,
  },

  iconContainer: {
    marginRight: 16,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,

    marginBottom: 4,
  },

  date: {
    fontSize: 12,

    color: "#95a5a6",
  },
});
