import { SanitizedStaffDoc, StaffDoc } from '../types/staff/staff.js';

export const sanitizeReturnedStaff = (staff: StaffDoc): SanitizedStaffDoc => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: newPassword, ...otherFields } = staff;
  return otherFields as SanitizedStaffDoc;
};

export const passwordGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};