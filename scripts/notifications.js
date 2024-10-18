document.addEventListener("DOMContentLoaded", () => {
  const notificationIcon = document.createElement("div");
  notificationIcon.id = "notificationIcon";
  notificationIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span id="notificationCount"></span>
    `;
  document.body.appendChild(notificationIcon);

  const notificationPanel = document.createElement("div");
  notificationPanel.id = "notificationPanel";
  notificationPanel.innerHTML = `
        <h3>Notifications</h3>
        <ul id="notificationList"></ul>
    `;
  document.body.appendChild(notificationPanel);

  function updateNotifications() {
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    const unreadCount = notifications.filter((n) => !n.read).length;

    const notificationCount = document.getElementById("notificationCount");
    notificationCount.textContent = unreadCount;
    notificationCount.style.display = unreadCount > 0 ? "block" : "none";

    const notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = "";

    notifications.forEach((notification, index) => {
      const li = document.createElement("li");
      li.textContent = notification.message;
      if (!notification.read) {
        li.classList.add("unread");
      }
      li.addEventListener("click", () => markAsRead(index));
      notificationList.appendChild(li);
    });
  }

  function markAsRead(index) {
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    notifications[index].read = true;
    localStorage.setItem("notifications", JSON.stringify(notifications));
    updateNotifications();
  }

  notificationIcon.addEventListener("click", () => {
    notificationPanel.classList.toggle("show");
    updateNotifications();
  });

  setInterval(updateNotifications, 30000);

  updateNotifications();
});
