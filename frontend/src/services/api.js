import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  console.error("API_URL is not defined in the environment variables");
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// export const submitFraudReport = async (reportData) => {
//   try {
//     const response = await api.post("/fraud/report", reportData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

export const reportFraud = async (fraudData) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  try {
    const response = await api.post('/fraud/report',
      fraudData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error reporting fraud:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// export const checkExistingReport = async (phone) => {
//   try {
//     const response = await api.get(`/fraud/check/${phone}`);
//     return response.data;
//   } catch (error) {
//     if (error.response?.status === 404) {
//       return null;
//     }
//     throw error.response?.data || error.message;
//   }
// };

export const checkExistingReport = async (phoneNumber) => {
  try {
    const response = await api.get(`/fraud/check/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error checking existing report:', error);
    throw error;
  }
};

export const getUserFraudReports = async (params = {}) => {
  try {
    const response = await api.get("/fraud/reports", { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { message: error.message };
  }
};

export const getPublicFraudReports = async (params = {}) => {
  try {
    const response = await api.get("/public/fraud/reports", { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || error.message;
  }
};

export const searchFraudReport = async (phoneNumber) => {
  try {
    const response = await api.get(`/fraud/search/${phoneNumber}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error.response?.data || error.message;
  }
};

export const submitNewReport = async (phoneNumber, reportText) => {
  try {
    const response = await api.post("/fraud/report", {
      phoneNumber,
      reportText,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create API Key
export const createAPIKey = async ({ apiKeyName, domain }) => {
  try {
    const response = await api.post("/keys/generate", {
      apiKeyName,
      domain,
    });
    console.log("API Key Created:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get API Keys
export const fetchAPIKeys = async () => {
  try {
    const response = await api.get("/keys");
    console.log("Full API response:", response.data);
    return response.data.apiKey || []; // Fallback to empty array

  } catch (error) {
    console.error("Error fetching API keys:", error);
    throw error.response?.data || error.message;
  }
};





// Update API Key
export const updateAPIKey = async (keyId, updatedData) => {
  try {
    const response = await api.put(`/keys/restrict/${keyId}`, updatedData);
    console.log("API Key Updated:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete API Key
export const deleteAPIKey = async (keyId) => {
  try {
    const response = await api.delete(`/keys/${keyId}`);
    console.log("API Key Deleted:", response.data);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token (status 401) and we haven't tried to refresh yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/auth/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        // Update the token in localStorage and axios headers
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refreshing fails, log out the user
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);





export default api;



