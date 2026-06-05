// Email Service for BizNet
// Handles sending emails for notifications, verification, etc.

export const sendVerificationEmail = async (email, token) => {
  // Mock implementation
  console.log(`Sending verification email to ${email} with token ${token}`);
  return Promise.resolve();
};

export const sendOrderNotification = async (email, orderId) => {
  // Mock implementation
  console.log(`Sending order notification to ${email} for order ${orderId}`);
  return Promise.resolve();
};

export const sendPaymentConfirmation = async (email, transactionId, amount) => {
  // Mock implementation
  console.log(`Sending payment confirmation to ${email} for transaction ${transactionId}`);
  return Promise.resolve();
};