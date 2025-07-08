import { vi } from 'vitest';
// We might want to mock otherwise, for instance mocking `getSession`

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => Promise.resolve(new Map())),
  cookies: vi.fn(() => Promise.resolve(new Map())),
}));

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() => Promise.resolve((key: string) => key)),
  getLocale: vi.fn(() => Promise.resolve('en')),
}));

// Mock the auth module
vi.mock('@repo/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(() => Promise.resolve(null)),
    },
  },
}));
