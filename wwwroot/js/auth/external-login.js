const returnUrlGoogle = encodeURIComponent('https://funews.azurewebsites.net/dang-nhap');
const returnUrlFacebook = encodeURIComponent('https://funews.azurewebsites.net/dang-nhap');


document.getElementById('btnGoogle').addEventListener('click', () => {
    window.location.href = `https://funewsapi.azurewebsites.net/api/Auth/external-login?provider=Google&returnUrl=${returnUrlGoogle}`;
});

document.getElementById('btnFacebook').addEventListener('click', () => {
    window.location.href = `https://funewsapi.azurewebsites.net/api/Auth/external-login?provider=Facebook&returnUrl=${returnUrlFacebook}`;
});


$(document).ready(function () {
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split("&");
        for (const pair of pairs) {
            const [key, value] = pair.split("=");
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || "");
            }
        }
        return params;
    }

    const params = getQueryParams();

    if (params.token) {
        AuthManager.setToken(params.token);
        showToast("Đăng nhập thành công!");

        setTimeout(() => {
            window.location.href = "/trang-chu";
        }, 2500);
    }

    if (params.register === "true") {
        $(".auth-form, .social-login, .auth-switch").hide();

        const email = params.email || "";
        const name = params.name || "";
        const externalId = params.externalId || "";
        const provider = params.provider || "";

        const registerForm = `
                <form id="extra-info-form" class="auth-form">
                    <div class="form-group">
                        <label for="fullName">Họ và tên</label>
                        <input type="text" id="fullName" name="fullName" value="${decodeURIComponent(name)}" required>
                    </div>
                    <div class="form-group">
                        <label for="emailInput">Email</label>
                        <input type="email" id="emailInput" name="emailInput" value="${decodeURIComponent(email)}" required disabled>
                    </div>
                    <div class="form-group">
                        <label for="phoneNumber">Số điện thoại</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Hoàn tất đăng ký</button>
                </form>
            `;

        $(".auth-header h2").text("Hoàn tất đăng ký");
        $(".auth-container").append(registerForm);

        $("#extra-info-form").on("submit", function (e) {
            e.preventDefault();

            const fullName = $("#fullName").val().trim();
            const phoneNumber = $("#phoneNumber").val().trim();

            if (!fullName || !phoneNumber) {
                showToast("Vui lòng nhập đầy đủ thông tin", "error");
                return;
            }

            showLoading();

            $.ajax({
                url: "https://funewsapi.azurewebsites.net/api/Auth/complete-register",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    email,
                    name: fullName,
                    phoneNumber,
                    externalId,
                    provider
                }),
                success: function (data) {
                    hideLoading();
                    console.log("API response:", data);

                    showToast("Đăng ký thành công!", 'success');

                    if (data.authenticated) {
                        AuthManager.setToken(data.accessToken);
                        window.location.href = "/trang-chu";
                    } else {
                        console.warn("Dữ liệu trả về thiếu hoặc sai cấu trúc!");
                        window.location.href = "/dang-nhap";
                    }
                },
                error: function (xhr, status, error) {
                    hideLoading();
                    console.error("Đăng ký thất bại:", error);
                    showToast("Đăng ký thất bại", "error");
                }
            });
        });
    }
});