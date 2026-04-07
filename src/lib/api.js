const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Custom fetch wrapper to handle authorization and errors
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    // If response is not JSON
  }

  if (!response.ok) {
    let message = 'Something went wrong';
    
    if (typeof data.error === 'string') {
      message = data.error;
    } else if (data.error && data.error.message) {
      message = data.error.message;
    } else if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      message = data.errors[0].msg;
    } else if (data.message) {
      message = data.message;
    }

    const error = new Error(message);
    error.status = response.status;
    error.code = data.code;
    throw error;
  }

  return data;
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
