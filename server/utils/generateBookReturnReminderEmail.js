export const generateBookReturnReminderEmail = (
  userName,
  dueDate,
  bookTitle,
  bookAuthor
) => {
  return `
   <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <!-- Header with Book Icon -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 28px; text-align: center;">
    <div style="background: white; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
      <span style="font-size: 28px; color: #764ba2;">📚</span>
    </div>
    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Book Return Reminder</h1>
  </div>
  
  <!-- Main Content -->
  <div style="padding: 28px; background: #f8f9fa;">
    <p style="font-size: 16px; color: #495057; margin-bottom: 20px; line-height: 1.5;">
      Dear <strong style="color: #343a40;">${userName}</strong>,<br>
      This is a friendly reminder about your borrowed book.
    </p>
    
    <!-- Book Card -->
    <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-top: 3px solid #667eea;">
      <h2 style="margin: 0 0 5px 0; color: #212529; font-size: 20px;">${bookTitle}</h2>
      <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 15px;">by ${bookAuthor}</p>
      
      <div style="display: flex; align-items: center; background: #fff3bf; padding: 10px; border-radius: 6px;">
        <div style="margin-right: 12px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#f59f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8V12L15 15" stroke="#f59f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <p style="margin: 0; font-size: 15px; color: #f59f00; font-weight: 600;">Due Date: ${dueDate}</p>
        </div>
      </div>
    </div>
    </div>
    
    <!-- Additional Info -->
    <p style="font-size: 14px; color: #868e96; text-align: center; margin-top: 30px; line-height: 1.5;">
      Please return or renew this book by the due date to avoid late fees.<br>
      Late fees are charged at ₹6 per day per book.
    </p>
  </div>
  
  <!-- Footer -->
  <div style="background: #e9ecef; padding: 20px; text-align: center; font-size: 13px; color: #6c757d; border-top: 1px solid #dee2e6;">
    <p style="margin: 0 0 8px 0;">Library Services Team</p>
    <p style="margin: 0; font-size: 12px;">
      <a href="#" style="color: #4dabf7; text-decoration: none;">Contact Us</a> | 
      <a href="#" style="color: #4dabf7; text-decoration: none;">Library Hours</a> | 
      <a href="#" style="color: #4dabf7; text-decoration: none;">FAQs</a>
    </p>
  </div>
</div>
  `;
}