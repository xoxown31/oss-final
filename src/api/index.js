
import axios from 'axios';

// Axios instance for our mock API
const mockApi = axios.create({
  baseURL: 'https://692b1a6f7615a15ff24ebcc8.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});


// --- Live API Functions ---

// User Authentication
export const register = async (username, password, isNewUser = true) => {
  try {
    // Check if username already exists
    const response = await mockApi.get('/users');
    const existingUser = response.data.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      throw new Error('Username already exists');
    }

    // If not, create new user
    const newUser = { username, password, isNewUser };
    const createResponse = await mockApi.post('/users', newUser);
    return createResponse.data;
  } catch (error) {
    console.error('Registration API failed:', error.message);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await mockApi.get('/users');
    const user = response.data.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // In a real app, the token would come from the server
      return { ...user, token: `${user.username}-fake-jwt-token` };
    } else {
      throw new Error('User not found or password incorrect');
    }
  } catch (error) {
    console.error('Login API failed:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await mockApi.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Update User API failed:', error);
    throw error;
  }
};

// Reading Records - CRUD
export const getRecords = async (userId) => {
  try {
    // mockapi.io supports filtering via search params
    const response = await mockApi.get(`/readingRecords`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Get Records API failed:', error);
    throw error;
  }
};

export const getRecord = async (recordId) => {
  try {
    const response = await mockApi.get(`/readingRecords/${recordId}`);
    return response.data;
  } catch (error) {
    console.error('Get Record API failed:', error);
    throw error;
  }
};

export const createRecord = async (newRecord) => {
  try {
    const response = await mockApi.post('/readingRecords', newRecord);
    return response.data;
  } catch (error) {
    console.error('Create Record API failed:', error);
    throw error;
  }
};

export const getPublicRecords = async () => {
  try {
    const response = await mockApi.get('/readingRecords', { params: { isPublic: true } });
    return response.data;
  } catch (error) {
    console.error('Get Public Records API failed:', error);
    throw error;
  }
};

export const updateRecord = async (recordId, updatedData) => {
  try {
    const response = await mockApi.put(`/readingRecords/${recordId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Update Record API failed:', error);
    throw error;
  }
};

export const deleteRecord = async (recordId) => {
  try {
    const response = await mockApi.delete(`/readingRecords/${recordId}`);
    return response.data;
  } catch (error) {
    console.error('Delete Record API failed:', error);
    throw error;
  }
};


// Naver Book Search
export const searchBooks = async (query) => {
  try {
    // Call our own Netlify function endpoint
    const response = await axios.get('/.netlify/functions/search-books', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

