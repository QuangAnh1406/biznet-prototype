// Validation utilities for BizNet

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validatePhoneNumber = (phone) => {
  // Vietnamese phone number format
  const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
  return phoneRegex.test(phone);
};

export const validateIdNumber = (idNumber) => {
  // Vietnamese ID number format
  return idNumber.length >= 9 && idNumber.length <= 12;
};

export const validatePrice = (price) => {
  return !isNaN(price) && price > 0;
};

export const validateAssociationName = (name) => {
  return name && name.length >= 3 && name.length <= 100;
};