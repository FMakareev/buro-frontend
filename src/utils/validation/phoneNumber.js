export const phoneNumber = value =>
  value && value.length < 17 ? 'Invalid phone number, must be 10 digits' : undefined;
export default phoneNumber;
