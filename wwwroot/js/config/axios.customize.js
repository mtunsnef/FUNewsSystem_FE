// wwwroot/js/config/axios.customize.js
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import AuthManager from '../core/auth-manager.js';

const instance = axios.create({
    baseURL: window.BASE_API_URL || "/",
    withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
    const noAuthRoutes = [
        "/api/Auth/token",
        "/api/Auth/2fa/verify-token-after-login",
        "/api/Auth/2fa/is-enabled",
        "/api/Auth/complete-register"
    ];

    const isNoAuthRoute = noAuthRoutes.some((path) => config.url.includes(path));

    if (!isNoAuthRoute) {
        const token = await AuthManager.ensureValidToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => Promise.reject(error));


export default instance;
