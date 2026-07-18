/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { loginSchema } from './auth-schema';

describe('Login Schema Validation', () => {
  it('should validate a correct email and password', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter a valid email address');
    }
  });

  it('should fail on short password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '123',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters');
    }
  });
});
