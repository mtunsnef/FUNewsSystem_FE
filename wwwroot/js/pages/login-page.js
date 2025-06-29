import AuthManager from '../core/auth-manager.js';
import {
    loginWithEmail,
    check2FAStatus,
    verify2FACode
} from '../services/auth.service.js';

$(function () {
    AuthManager.init();

    $('.auth-form').on('submit', async function (e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        if (!email || !password) {
            showToast("Vui lòng nhập đầy đủ Email và Mật khẩu!", 'warning');
            return;
        }

        showLoading();

        try {
            const res = await loginWithEmail(email, password);
            const token = res.accessToken;

            AuthManager.setToken(token);

            const status = await check2FAStatus();

            if (status.is2FAEnabled) {
                $('.auth-form, .social-login, .auth-switch').hide();
                $('#form-2fa').show();
                showToast("Vui lòng xác thực mã 2FA", "info");

                sessionStorage.setItem("pending_token", token);
            } else {
                showToast("Đăng nhập thành công!", 'success');
                setTimeout(() => window.location.href = "/", 1000);
            }
        } catch (err) {
            AuthManager.clearToken();
            showToast("Đăng nhập thất bại!", 'error');
        } finally {
            hideLoading();
        }
    });

    $('#btnVerify2FA').on('click', async function () {
        const code = $('#verifyCode').val().trim();
        const token = sessionStorage.getItem("pending_token");

        if (!code || !token) {
            showToast("Vui lòng nhập mã xác thực!", "warning");
            return;
        }

        showLoading();
        try {
            AuthManager.setToken(token);
            await verify2FACode(code);

            sessionStorage.removeItem("pending_token");
            showToast("Đăng nhập thành công!", 'success');
            setTimeout(() => window.location.href = "/", 1000);
        } catch (err) {
            showToast("Mã xác thực không đúng!", 'error');
        } finally {
            hideLoading();
        }
    });
});
