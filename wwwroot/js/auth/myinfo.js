
$(function () {
    updateUserInfoInElement(".article-meta-detailed");

    const authControl = $("#auth-control");
    const token = AuthManager.getToken();

    if (token) {
        $.ajax({
            url: "https://funewsapi.azurewebsites.net/api/Auth/myinfo",
            method: "GET",
            headers: { Authorization: "Bearer " + token },
            success: function (user) {
                authControl.html(renderUserDropdown(user));
                setupUserDropdown();
            },
            error: function () {
                AuthManager.clearToken();
                renderLoginLinks();
            }
        });
    } else {
        renderLoginLinks();
    }

    /* ─────────────────── Đăng xuất ─────────────────── */
    $(document).on("click", "#logout-btn", function (e) {
        e.preventDefault();

        const token = AuthManager.getToken();
        if (!token) {
            showToast("Bạn chưa đăng nhập!", "warning");
            return;
        }

        $.ajax({
            url: "https://funewsapi.azurewebsites.net/api/Auth/logout",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ token }), 
            success: function () {
                AuthManager.clearToken();
                showToast("Đăng xuất thành công!", "success");
                setTimeout(() => location.reload(), 800);
            },
            error: function () {
                showToast("Lỗi đăng xuất!", "error");
            }
        });
    });

    function renderUserDropdown(user) {
        return `
            <div class="user-dropdown">
                <div class="user-toggle" id="userToggle">
                    <img src="${user.avatarUrl || '/images/default-image.jpg'}" class="user-avatar"/>
                    <span style="line-height:0;">${user.AccountName || user.AccountEmail}</span>
                </div>
                <div class="dropdown-menu" id="userDropdownMenu" style="display:none;">
                    <a class="dropdown-item" href="/thong-tin-ca-nhan">Thông tin cá nhân</a>
                    <a class="dropdown-item" href="/dang-tin">Đăng tin</a>
                    <a class="dropdown-item" href="/quan-ly-tin">Quản lý tin</a>
                    <a class="dropdown-item" href="/quan-ly-tin">Đổi mật khẩu</a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" href="#" id="logout-btn">Đăng xuất</a>
                </div>
            </div>
        `;
    }

    function renderLoginLinks() {
        authControl.html(`
            <a href="/dang-nhap" class="auth-link">Đăng nhập</a>
            <a href="/dang-ky"   class="auth-link btn btn-primary">Đăng ký</a>
        `);
    }

    function setupUserDropdown() {
        const toggleBtn = document.getElementById("userToggle");
        const dropdown = document.getElementById("userDropdownMenu");
        if (!toggleBtn || !dropdown) return;

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
        document.addEventListener("click", (e) => {
            if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });
    }

    function updateUserInfoInElement(selector) {
        const token = AuthManager.getToken();
        if (!token) return;

        $.ajax({
            url: "https://funewsapi.azurewebsites.net/api/Auth/myinfo",
            method: "GET",
            headers: { Authorization: "Bearer " + token },
            success: function (user) {
                const container = $(selector);
                if (container.length) {
                    container.find(".author-avatar").attr("src", user.avatarUrl || "/images/default-image.jpg");
                    container.find(".author-info span").text(user.AccountName || user.AccountEmail);
                }
            },
            error: function () {
                console.warn("Không lấy được thông tin user để cập nhật UI");
            }
        });
    }
});
