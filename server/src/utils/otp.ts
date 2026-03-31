// In-memory OTP store (email -> { otp, expiresAt })
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(email: string, otp: string): void {
  otpStore.set(email.toLowerCase(), {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
  });
}

export function verifyOTP(email: string, otp: string): { valid: boolean; message: string } {
  const entry = otpStore.get(email.toLowerCase());

  if (!entry) {
    return { valid: false, message: 'No OTP found for this email. Please request a new one.' };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  }

  if (entry.otp !== otp) {
    return { valid: false, message: 'Invalid OTP. Please check and try again.' };
  }

  // OTP is valid — remove it (one-time use)
  otpStore.delete(email.toLowerCase());
  return { valid: true, message: 'Email verified successfully!' };
}
