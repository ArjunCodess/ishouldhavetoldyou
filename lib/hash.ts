import crypto from 'crypto-js';

export function hashAccessCode(code: string): string {
  return crypto.SHA256(code.trim().toLowerCase()).toString();
}

export function validateAccessCode(inputCode: string, storedHash: string): boolean {
  return hashAccessCode(inputCode) === storedHash;
}
