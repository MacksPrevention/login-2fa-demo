export const mockLogin = async ({ username, password }) => {
  console.log('Mock login API call', username, password);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (username === 'user@test.com' && password === '123456') {
    return { success: true, requires2FA: true };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const mockVerify2FA = async (code) => {
  console.log('Mock verify 2FA API call', code);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (code === '123456') {
    return { success: true };
  } else {
    throw new Error('Invalid code');
  }
};
