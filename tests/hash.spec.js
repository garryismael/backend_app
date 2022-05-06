const { hashPassword, checkPassword } = require('../src/utils/auth');

const password = 'password';

describe('Test Hashing Password', () => {
  it('Hashes Password', () => {
    const hashedPassword = hashPassword(password);
    expect(password).not.toBe(hashedPassword);
  });

  it('Checks Password hashed To Be Thruthy', () => {
    const hashedPassword = hashPassword(password);
    expect(checkPassword(password, hashedPassword)).toBeTruthy();
  });

  it('Checks Password hashed to Be Not False', () => {
    const hashedPassword = hashPassword(password);
    expect(checkPassword('pass', hashedPassword)).not.toBeTruthy();
  });
});

