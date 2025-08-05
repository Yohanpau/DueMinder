import { useEffect } from "react";
import emailjs from "emailjs-com";

function EmailReminderHandler() {
  useEffect(() => {
    const sendReminders = () => {
      const storedBills = localStorage.getItem("bills");
      const notificationsAllowed = JSON.parse(
        localStorage.getItem("notificationsEnabled")
      );
      const storedEmail = localStorage.getItem("userEmail");
      const today = new Date().toISOString().split("T")[0];

      if (!storedBills || !notificationsAllowed || !storedEmail) return;

      const bills = JSON.parse(storedBills);

      bills.forEach((bill) => {
        const daysLeft =
          (new Date(bill.dueDate) - new Date(today)) / (1000 * 60 * 60 * 24);
        const key = `reminderSent-${bill.name}-${bill.dueDate}`;

        if (daysLeft <= 2 && !localStorage.getItem(key)) {
          console.log(
            `📤 Processing email for: ${bill.name} (Due: ${bill.dueDate})`
          );

          const templateParams = {
            email: storedEmail,
            bill_name: bill.name,
            due_date: bill.dueDate,
            amount: bill.amount,
          };

          emailjs
            .send(
              "service_p4kh83e",
              "template_knq28ca",
              templateParams,
              "muDJ0JS2U8D5QQgZ_"
            )
            .then(() => {
              console.log(`✅ Reminder sent: ${bill.name}`);
              localStorage.setItem(key, "true");
            })
            .catch((err) => console.error("❌ Email error:", err));
        }
      });
    };

    // Run immediately and then every 1 minute
    sendReminders();
    const interval = setInterval(sendReminders, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default EmailReminderHandler;
