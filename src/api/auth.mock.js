const VALID_USER = 'user@test.com';
const VALID_PASSWORD = '123456';
const VALID_2FA = '123456';

export const mockLogin = async ({ username, password }) => {
  await new Promise((r) => setTimeout(r, 1000));

  if (username !== VALID_USER) {
    const error = new Error('User does not exist');
    error.type = 'USER_NOT_FOUND';
    throw error;
  }

  if (password !== VALID_PASSWORD) {
    const error = new Error('Incorrect password');
    error.type = 'INVALID_PASSWORD';
    throw error;
  }

  return { success: true, requires2FA: true };
};

export const mockVerify2FA = async (code) => {
  await new Promise((r) => setTimeout(r, 1000));

  if (code !== VALID_2FA) {
    const error = new Error('Invalid 2FA code');
    error.type = 'INVALID_2FA';
    throw error;
  }

  return { success: true };
};
