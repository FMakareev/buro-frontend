export const phoneNumber = value =>
  value && value.length < 7 ? 'Invalid phone number, must be minimum 7 digits' : undefined;
export default phoneNumber;
