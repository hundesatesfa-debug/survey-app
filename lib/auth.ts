import bcrypt from 'bcryptjs';

const ADMIN_USERNAME = 'Addajabo';
// Pre-hashed password (you should change this)
// Default password: "admin123"
const ADMIN_PASSWORD_HASH =
  '$2a$10$XfqHvKEjgxoN5YxqPsA8I.sR0OVxI1bCTwXqPzJ9K7e9K3K3K3K3K'; // admin123

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

export function validateAdminUsername(username: string): boolean {
  return username === ADMIN_USERNAME;
}

// Generate a hash for a password (use this to create new hashes)
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
