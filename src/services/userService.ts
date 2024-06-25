import User, { UserDocument } from '../ models/User';

const userServices = {
  // Get all users
  getAllUsers: async (): Promise<UserDocument[]> => {
    return await User.find({ deleted: false });
  },

  // Get user by ID
  getUserById: async (userId: string): Promise<UserDocument | null> => {
    return await User.findById(userId);
  },

  // Create a new user
  createUser: async (userData: any): Promise<UserDocument> => {
    const user = new User(userData);
    return await user.save();
  },

  // Update user
  updateUser: async (userData: any): Promise<UserDocument | null> => {
    const { id, ...updateData } = userData;
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  },

  // Partial update user
  partialUpdateUser: async (userId: string, userData: any): Promise<UserDocument | null> => {
    const { id, ...updateData } = userData;
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  // Soft delete user
  softDeleteUser: async (userId: string): Promise<UserDocument | null> => {
    return await User.findByIdAndUpdate(userId, { deleted: true }, { new: true });
  },
};

export default userServices;
