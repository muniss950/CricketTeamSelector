const API_URL = 'http://127.0.0.1:5000/users'; // Replace with your base API URL if different

const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Get a user by ID
  getUserById: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Add a new user
  addUser: async (userData) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to add user');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Update a user by ID
  updateUser: async (userId, userData) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Delete a user by ID
  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default userService;
