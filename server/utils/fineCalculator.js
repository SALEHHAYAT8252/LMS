export const calculateFine = (dueDate) => {
    const finePerHour = .25; // Fine of ₹0.25 per hour
    const today = new Date(); // Get current date and time
    
    if(today > dueDate) {
       const lateHours = Math.floor((today - dueDate) / (1000 * 60 * 60)); // Calculate late hours
       const fine = lateHours * finePerHour; // Calculate fine
       return fine; // Return the fine amount
    }
    return 0; // No fine if not overdue

}