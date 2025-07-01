import AuthManager from "../core/auth-manager.js";
import { completeRegister, verify2FAToken, setupExternalLoginButtons } from "../services/auth.service.js";

setupExternalLoginButtons();

const params = new URLSearchParams(window.location.search);

// Bổ sung thông tin sau khi đăng nhập OAuth
if (params.get("register") === "true") {
    const email = params.get("email") || "";
    const name = params.get("name") || "";
    const externalId = params.get("externalId") || "";
    const provider = params.get("provider") || "";

    $(".auth-form, .social-login, .auth-switch").remove();
    $(".auth-header h2").text("Hoàn tất đăng ký");

    const html = `
        <form id="extra-info-form" class="auth-form">
            <div class="form-group">
                <label for="fullName">Họ và tên</label>
                <input type="text" id="fullName" value="${decodeURIComponent(name)}" required>
            </div>
            <div class="form-group">
                <label for="emailInput">Email</label>
                <input type="email" id="emailInput" value="${decodeURIComponent(email)}" disabled>
            </div>
            <div class="form-group">
                <label for="phoneNumber">Số điện thoại</label>
                <input type="tel" id="phoneNumber" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Hoàn tất đăng ký</button>
        </form>
    `;
    $(".auth-container").append(html);

    $("#extra-info-form").on("submit", async function (e) {
        e.preventDefault();

        const fullName = $("#fullName").val().trim();
        const phoneNumber = $("#phoneNumber").val().trim();

        if (!fullName || !phoneNumber) {
            showToast("Vui lòng nhập đầy đủ thông tin", "error");
            return;
        }

        showLoading();
        try {
            const data = await completeRegister({ email, name: fullName, phoneNumber, externalId, provider });
            hideLoading();

            if (data?.authenticated) {
                AuthManager.setToken(data.accessToken);
                showToast("Đăng ký và đăng nhập thành công!", "success");
                window.location.href = "/trang-chu";
            } else {
                window.location.href = "/dang-nhap";
            }
        } catch {
            hideLoading();
            showToast("Đăng ký thất bại", "error");
        }
    });
}

// Xác thực mã 2FA sau khi đăng nhập OAuth thành công
if (params.get("token")) {
    const token = params.get("token");
    const is2FA = params.get("is2FAEnabled") === "true";

    if (is2FA) {
        sessionStorage.setItem("pending_external_token", token);
        showToast("Vui lòng xác thực mã 2FA", "info");

        $(".auth-form, .social-login, .auth-switch").remove();
        $(".auth-header h2").text("Xác minh 2 bước");

        const html = `
            <form id="verify-2fa-form" class="auth-form">
                <h4>Xác thực 2 bước</h4>
                <div class="form-group mt-1">
                    <label for="twofa-code">Nhập mã xác thực</label>
                    <input type="text" id="twofa-code" class="form-control" placeholder="123456" required>
                </div>
                <button type="submit" class="btn btn-success btn-block">Xác minh</button>
            </form>
        `;
        $(".auth-container").append(html);

        $("#verify-2fa-form").on("submit", async function (e) {
            e.preventDefault();

            const code = $("#twofa-code").val().trim();
            const tempToken = sessionStorage.getItem("pending_external_token");

            if (!code) {
                showToast("Vui lòng nhập mã xác thực!", "error");
                return;
            }

            showLoading();
            try {
                await verify2FAToken(tempToken, code);
                AuthManager.setToken(tempToken);
                sessionStorage.removeItem("pending_external_token");

                showToast("Đăng nhập thành công!", "success");
                window.location.href = "/trang-chu";
            } catch {
                showToast("Mã xác thực không đúng!", "error");
            } finally {
                hideLoading();
            }
        });
    } else {
        AuthManager.setToken(token);
        showToast("Đăng nhập thành công!", "success");
        setTimeout(() => window.location.href = "/trang-chu", 2000);
    }
}
