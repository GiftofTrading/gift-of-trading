import bcrypt from "bcryptjs";

// Admin credentials - hardcoded for security
// Passwords are hashed using bcrypt
export const ADMIN_CREDENTIALS = [
  {
    email: "Giftoftrading@gmail.com",
    // Password: G!ft0fTr@d!ng$$$
    // Hash generated with: bcrypt.hashSync("G!ft0fTr@d!ng$$$", 10)
    passwordHash: "$2b$10$pAo0z8IysP3XnVGvnJr0C.IgcceinWA3EIcL.epWVFUvn/m1MJYHa",
  },
  {
    email: "hgdhami77@gmail.com",
    // Password: G!ft0fTr@d!ng$$$
    // Hash generated with: bcrypt.hashSync("G!ft0fTr@d!ng$$$", 10)
    passwordHash: "$2b$10$pAo0z8IysP3XnVGvnJr0C.IgcceinWA3EIcL.epWVFUvn/m1MJYHa",
  },
];

/**
 * Verify admin credentials
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const admin = ADMIN_CREDENTIALS.find(
    (cred) => cred.email.toLowerCase() === email.toLowerCase()
  );

  if (!admin) {
    return false;
  }

  return bcrypt.compare(password, admin.passwordHash);
}

/**
 * Check if email is a valid admin email
 */
export function isValidAdminEmail(email: string): boolean {
  return ADMIN_CREDENTIALS.some(
    (cred) => cred.email.toLowerCase() === email.toLowerCase()
  );
}
