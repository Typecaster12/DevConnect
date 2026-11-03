const BASE_URL = import.meta.env.VITE_API_URL || (
    import.meta.env.PROD
        ? "https://devconnect-zth5.onrender.com"
        : "http://localhost:5000"
);

export default BASE_URL;
