$(document).ready(function () {
    $('.auth-form').on('submit', function (e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        if (!email || !password) {
            showToast("Vui lòng nhập đầy đủ Email và Mật khẩu!", 'warning');
            return;
        }

        showLoading();

        $.ajax({
            url: 'https://funewsapi.azurewebsites.net/api/Auth/token',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Email: email, Password: password }),
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                AuthManager.setToken(response.accessToken);
                showToast("Đăng nhập thành công!", 'success');

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            },
            error: function (xhr) {
                let errorMsg = "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!";
                showToast(errorMsg, 'error');
            },
            complete: function () {
                hideLoading();
            }
        });
    });
});
