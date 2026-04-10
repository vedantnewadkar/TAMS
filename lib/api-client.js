/**
 * TAMS API Client
 * Optimized fetch wrapper for Supabase-backed Route Handlers.
 */

export const apiClient = {
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  },

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async patch(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  },

  async request(url, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: result.message || "An error occurred during communication with the neural link.",
          ...result
        };
      }

      return result;
    } catch (error) {
      const errorDetail = error.status
        ? `[Status ${error.status}] ${error.message}`
        : error.message || "Unknown Network Error";
      console.error("API Neural Error:", errorDetail, error);
      throw error;
    }
  }
};
