// public/service-worker.js
importScripts(
  "https://unpkg.com/expo-notifications/build/ExpoNotificationsWebServiceWorker.js"
);
self.addEventListener("push", function (event) {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon.png",
    })
  );
});
