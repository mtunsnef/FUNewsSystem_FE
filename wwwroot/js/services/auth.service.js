// wwwroot/js/services/auth.service.js
import axios from "../config/axios.customize.js";

export function loginWithEmail(email, password) {
    return axios.post("/api/Auth/token", {
        Email: email,
        Password: password
    });
}

export function check2FAStatus() {
    return axios.get("/api/Auth/2fa/is-enabled");
}

export function verify2FACode(code) {
    return axios.post("/api/Auth/2fa/verify-token-after-login", { code });
}

export function completeRegister(data) {
    return axios.post("/api/Auth/complete-register", data);
}

export function verify2FAToken(code) {
    return axios.post("/api/Auth/2fa/verify-token-after-login", { code });
}

export function getMyInfo() {
    return axios.get("/api/Auth/myinfo");
}

export function logout(token) {
    return axios.post("/api/Auth/logout", { token });
}


export async function checkAccessForPostPage() {
    try {
        const res = await axios.get("/api/NewsArticle/check-access");

        if (res.status === 200) {
            document.body.style.visibility = "visible";
        }
    } catch (err) {
        const status = err?.response?.status;
        if (status === 401) {
            window.location.href = "/dang-nhap";
        } else if (status === 403) {
            window.location.href = "/access-denied";
        } else {
            console.error("Check-access lỗi:", err);
            window.location.href = "/dang-nhap";
        }
    }
}

export function setupExternalLoginButtons(returnUrl = "https://localhost:44352/dang-nhap") {
    const encodedReturnUrl = encodeURIComponent(returnUrl);

    $(document).ready(function () {
        $('#btnGoogle').on('click', function () {
            window.location.href = `https://funewsystemapi.azurewebsites.net/api/Auth/external-login?provider=Google&returnUrl=${encodedReturnUrl}`;
        });

        $('#btnFacebook').on('click', function () {
            window.location.href = `https://funewsystemapi.azurewebsites.net/api/Auth/external-login?provider=Facebook&returnUrl=${encodedReturnUrl}`;
        });
    });
}