const User = require('../src/models/user');
const { findOneBy } = require('../src/repository/user');

describe('Test Repository', () => {
  it('Get all users', async () => {
    const user = await User.findAll();
    expect(user).not.toBeUndefined();
  });

  it('Get user by username', async () => {
    const username = "garry";
    const user = await findOneBy({ username });
    expect(username).toBe(user.username);
  });
});
