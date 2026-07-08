import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// If access token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      localStorage.getItem("refresh")
    ) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/refresh/",
          {
            refresh: localStorage.getItem("refresh"),
          }
        );

        localStorage.setItem("access", response.data.access);

        error.config.headers.Authorization =
          `Bearer ${response.data.access}`;

        return axios(error.config);

      } catch (err) {

        localStorage.clear();
        window.location.href = "/";

      }
    }

    return Promise.reject(error);
  }
);

export default api;