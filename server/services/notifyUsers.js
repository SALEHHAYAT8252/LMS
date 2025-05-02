import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Book } from "../models/bookModel.js";
import { generateBookReturnReminderEmail } from "../utils/generateBookReturnReminderEmail.js";
export const notifyUsers = () => {
  // Schedule a task to run every day at 9 AM
  cron.schedule("*/10 * * * *", async () => {
    try {

      const now = new Date();
      const twoHourInMs = 2 * 60 * 60 * 1000;
      const twoHourFromNow = new Date(now.getTime() + twoHourInMs);
      const upcomingDueBorrowers = await Borrow.find({
        dueDate: {
          $lte: twoHourFromNow, // Due within the next hour
        },  
        returnDate: null,
        notified: false,
      });

      for (const borrower of upcomingDueBorrowers) {
        const book = await Book.findById(borrower.book);
        if (borrower.user && borrower.user.email) {
          const message = generateBookReturnReminderEmail(
            borrower.user.name,
            borrower.dueDate,
            book.title,
            book.author
          );
          sendEmail({
            email: borrower.user.email,
            subject: "Book Return Remainder",
            message,
          });
          borrower.notified = true; // Mark as notified
          await borrower.save(); // Save the updated borrower record
          console.log(
            `Notification sent to ${borrower.user.email} for book ${book.title}`
          );
        }
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  });
};
