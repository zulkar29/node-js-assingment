import User from "../model/user.mode.js";
class UserService {
  async createUser(userData) {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(page = 1, limit = 10) {
    try {
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();

