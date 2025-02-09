// notifications.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications are displayed when your app is foregrounded.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Request permissions and get the Expo push token.
export const registerForPushNotificationsAsync = async () => {
  // On Android, create a default notification channel.
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // Get existing permissions.
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  // If no permission, ask for it.
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for notifications!");
    return null;
  }
  // Get the Expo push token.
  const tokenData = await Notifications.getExpoPushTokenAsync();
  const token = tokenData.data;
  console.log("Expo Push Token:", token);
  return token;
};

// Set up listeners for incoming notifications.
export const configureNotifications = () => {
  // When a notification is received while the app is in the foreground.
  Notifications.addNotificationReceivedListener((notification) => {
    console.log("Foreground notification received:", notification);
  });

  // When the user interacts with a notification (taps on it).
  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log("Notification response received:", response);
  });
};


