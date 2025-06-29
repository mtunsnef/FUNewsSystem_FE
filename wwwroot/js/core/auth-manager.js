// wwwroot/js/core/auth-manager.js
class AuthManager {
    static ACCESS_KEY = 'access_token';
    static ACCESS_EXP = 'access_token_exp';
    static REFRESH_URL = '/api/Auth/refresh';

    static setToken(token) {
        localStorage.setItem(this.ACCESS_KEY, token);
        const payload = this.#decode(token);
        if (payload?.exp) localStorage.setItem(this.ACCESS_EXP, payload.exp);
    }

    static clearToken() {
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.ACCESS_EXP);
    }

    static getToken() {
        return localStorage.getItem(this.ACCESS_KEY);
    }

    static async ensureValidToken() {
        return await this.#refreshIfNeeded();
    }

    static init() {
        // fallback cho jQuery ajax nếu dùng song song
        const self = this;

        $(document).ajaxSend(async function (_e, jqXHR, settings) {
            if (settings.url.includes('/api/Auth/refresh')) return;
            const token = await self.#refreshIfNeeded();
            if (token) jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
        });

        $(document).ajaxError(function (_e, jqXHR) {
            if (jqXHR.status === 401) {
                self.clearToken();
                window.location.href = '/dang-nhap';
            }
        });

        setInterval(() => self.#refreshIfNeeded(), 5000);
    }

    static async #refreshIfNeeded() {
        const token = this.getToken();
        if (!token) return null;
        if (!this.#isAboutToExpire(40)) return token;

        try {
            const res = await fetch(this.REFRESH_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: token }),
            });

            const data = await res.json();
            if (data?.accessToken) {
                this.setToken(data.accessToken);
                return data.accessToken;
            }
        } catch (err) {
            console.error("Token refresh failed", err);
            this.clearToken();
        }

        return null;
    }

    static #isAboutToExpire(bufferSec = 60) {
        const exp = parseInt(localStorage.getItem(this.ACCESS_EXP) || '0', 10);
        const now = Math.floor(Date.now() / 1000);
        return exp === 0 || (exp - now) <= bufferSec;
    }

    static #decode(token) {
        try { return JSON.parse(atob(token.split('.')[1])); }
        catch { return null; }
    }
}

export default AuthManager;