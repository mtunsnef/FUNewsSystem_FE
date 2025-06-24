document.addEventListener("DOMContentLoaded", () => {
    // --- Dữ liệu bài viết mẫu (thay thế cho backend/CMS) ---
    const sampleArticles = [
        {
            id: 1,
            slug: "cong-nghe-ai-thay-doi-the-gioi",
            title: "Công nghệ AI đang thay đổi thế giới như thế nào?",
            category: "Công nghệ",
            author: "Trí Nhân Tạo",
            date: "03/06/2025",
            imageUrl: "/placeholder.svg?width=800&height=450&text=AI+World",
            snippet:
                "Trí tuệ nhân tạo (AI) không còn là một khái niệm khoa học viễn tưởng. Nó đang hiện hữu và tác động mạnh mẽ đến mọi mặt của đời sống.",
            content:
                '<p>Trí tuệ nhân tạo (AI) không còn là một khái niệm khoa học viễn tưởng. Nó đang hiện hữu và tác động mạnh mẽ đến mọi mặt của đời sống, từ y tế, giáo dục đến kinh doanh và giải trí.</p><p>Các ứng dụng AI như xe tự lái, trợ lý ảo, hệ thống chẩn đoán bệnh thông minh đang dần trở nên phổ biến. AI giúp tự động hóa các quy trình phức tạp, tăng hiệu suất làm việc và mở ra những khả năng mới mà con người khó có thể đạt được.</p><h2>Tiềm năng và thách thức</h2><p>Mặc dù tiềm năng của AI là rất lớn, nhưng cũng đi kèm với không ít thách thức. Các vấn đề về đạo đức, bảo mật dữ liệu, và nguy cơ mất việc làm do tự động hóa cần được xem xét và giải quyết một cách cẩn trọng.</p><blockquote>Việc xây dựng một hành lang pháp lý vững chắc và các tiêu chuẩn đạo đức cho AI là vô cùng quan trọng để đảm bảo công nghệ này phát triển theo hướng tích cực, phục vụ lợi ích của con người.</blockquote><p>Trong lĩnh vực y tế, AI hỗ trợ bác sĩ trong việc phân tích hình ảnh y khoa, phát hiện sớm bệnh tật và cá nhân hóa phác đồ điều trị. Ở lĩnh vực giáo dục, AI có thể tạo ra các chương trình học tập thích ứng, giúp học sinh tiến bộ theo tốc độ của riêng mình.</p><figure><img src="/placeholder.svg?width=600&height=350&text=AI+Application" alt="Ứng dụng AI"><figcaption>Một ví dụ về ứng dụng AI trong phân tích dữ liệu.</figcaption></figure><p>Tuy nhiên, sự phát triển nhanh chóng của AI cũng đặt ra câu hỏi về tương lai việc làm. Nhiều công việc có tính lặp đi lặp lại có thể bị thay thế bởi robot và thuật toán. Điều này đòi hỏi người lao động phải không ngừng học hỏi, nâng cao kỹ năng để thích ứng với thị trường lao động thay đổi.</p>',
            tags: ["AI", "Công nghệ", "Tương lai"],
        },
        {
            id: 2,
            slug: "kinh-te-toan-cau-phuc-hoi",
            title: "Kinh tế toàn cầu: Dấu hiệu phục hồi sau đại dịch",
            category: "Kinh doanh",
            author: "Chuyên gia Kinh tế",
            date: "02/06/2025",
            imageUrl: "/placeholder.svg?width=800&height=450&text=Economy",
            snippet:
                "Sau những ảnh hưởng nặng nề của đại dịch COVID-19, kinh tế toàn cầu đang cho thấy những dấu hiệu phục hồi tích cực, dù vẫn còn nhiều thách thức.",
            content:
                "<p>Sau những ảnh hưởng nặng nề của đại dịch COVID-19, kinh tế toàn cầu đang cho thấy những dấu hiệu phục hồi tích cực. Nhiều quốc gia đã ghi nhận tăng trưởng GDP trở lại, tỷ lệ thất nghiệp giảm và các hoạt động sản xuất kinh doanh dần ổn định.</p><p>Tuy nhiên, quá trình phục hồi không đồng đều giữa các khu vực và các ngành nghề. Lạm phát, gián đoạn chuỗi cung ứng và căng thẳng địa chính trị vẫn là những yếu tố rủi ro tiềm ẩn.</p><h3>Các biện pháp kích thích kinh tế</h3><p>Nhiều chính phủ đã tung ra các gói kích thích kinh tế lớn để hỗ trợ doanh nghiệp và người dân. Các ngân hàng trung ương cũng duy trì chính sách tiền tệ nới lỏng để thúc đẩy tăng trưởng. Tuy nhiên, hiệu quả của các biện pháp này vẫn cần thời gian để đánh giá đầy đủ.</p>",
            tags: ["Kinh tế", "Toàn cầu", "Phục hồi", "COVID-19"],
        },
        {
            id: 3,
            slug: "giai-bong-da-quoc-gia",
            title: "Giải vô địch bóng đá quốc gia: Những trận cầu nảy lửa",
            category: "Thể thao",
            author: "Bình Luận Viên",
            date: "01/06/2025",
            imageUrl: "/placeholder.svg?width=800&height=450&text=Football",
            snippet:
                "Mùa giải bóng đá quốc gia năm nay đang diễn ra vô cùng hấp dẫn với những cuộc đua tranh quyết liệt ở cả nhóm đầu và nhóm cuối bảng xếp hạng.",
            content:
                "<p>Mùa giải bóng đá quốc gia năm nay đang diễn ra vô cùng hấp dẫn với những cuộc đua tranh quyết liệt ở cả nhóm đầu và nhóm cuối bảng xếp hạng. Các đội bóng đã cống hiến cho khán giả những trận cầu mãn nhãn, đầy kịch tính và bất ngờ.</p><p>Sự xuất hiện của các tân binh chất lượng cùng với phong độ ổn định của các trụ cột đã tạo nên một mùa giải khó đoán và đáng xem. Cuộc đua đến ngôi vô địch hứa hẹn sẽ còn nhiều bất ngờ cho đến những vòng đấu cuối cùng.</p>",
            tags: ["Bóng đá", "Thể thao", "V-League", "Giải đấu"],
        },
        {
            id: 4,
            slug: "du-lich-ben-vung",
            title: "Xu hướng du lịch bền vững lên ngôi",
            category: "Đời sống",
            author: "Người Lữ Hành",
            date: "31/05/2025",
            imageUrl: "/placeholder.svg?width=800&height=450&text=Travel",
            snippet:
                "Du lịch bền vững không chỉ là một trào lưu mà đang trở thành một xu hướng tất yếu, được nhiều du khách và doanh nghiệp quan tâm.",
            content:
                "<p>Du lịch bền vững, tập trung vào việc giảm thiểu tác động tiêu cực đến môi trường và văn hóa địa phương, đồng thời mang lại lợi ích kinh tế cho cộng đồng, đang ngày càng được ưa chuộng. Du khách có ý thức hơn trong việc lựa chọn các điểm đến và dịch vụ du lịch thân thiện với môi trường.</p><p>Các hoạt động như du lịch cộng đồng, du lịch sinh thái, và lựa chọn các cơ sở lưu trú có chứng nhận xanh đang trở nên phổ biến. Điều này không chỉ giúp bảo vệ tài nguyên thiên nhiên mà còn mang lại những trải nghiệm chân thực và ý nghĩa hơn cho du khách.</p>",
            tags: ["Du lịch", "Bền vững", "Môi trường", "Xu hướng"],
        },
        {
            id: 5,
            slug: "smartphone-moi-chip-sieu-manh",
            title: "Smartphone mới với chip siêu mạnh",
            category: "Công nghệ",
            author: "TechReviewer",
            date: "30/05/2025",
            imageUrl: "/placeholder.svg?width=800&height=450&text=Smartphone",
            snippet:
                "Đánh giá chi tiết về mẫu smartphone flagship vừa ra mắt với hiệu năng đột phá và nhiều tính năng AI thông minh.",
            content:
                "<p>Mẫu smartphone flagship mới nhất vừa được trình làng đã gây ấn tượng mạnh với con chip xử lý thế hệ mới, mang lại hiệu năng vượt trội cho các tác vụ nặng và chơi game. Bên cạnh đó, máy còn được trang bị nhiều tính năng AI thông minh, tối ưu hóa trải nghiệm người dùng từ camera cho đến quản lý pin.</p><h3>Thiết kế và Màn hình</h3><p>Thiết kế của máy vẫn giữ được vẻ sang trọng với khung kim loại và mặt lưng kính. Màn hình AMOLED với tần số quét cao mang lại hình ảnh mượt mà và sống động.</p><h3>Camera cải tiến</h3><p>Hệ thống camera được nâng cấp đáng kể với cảm biến lớn hơn và thuật toán xử lý hình ảnh mới, hứa hẹn mang lại những bức ảnh chất lượng cao trong mọi điều kiện ánh sáng.</p>",
            tags: ["Smartphone", "Công nghệ", "Đánh giá", "AI", "Chip"],
        },
    ];

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            const isExpanded = mainNav.classList.contains("active");
            mobileMenuToggle.setAttribute("aria-expanded", isExpanded.toString());
        });

        // Đóng menu khi click vào một link trong menu mobile
        const navLinks = mainNav.querySelectorAll("a");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (mainNav.classList.contains("active")) {
                    mainNav.classList.remove("active");
                    mobileMenuToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // --- Notification Bell Toggle ---
    const notificationBell = document.getElementById("notification-bell");
    const notificationDropdown = document.getElementById("notification-dropdown");
    const notificationDot = document.querySelector(".notification-dot");
    const notificationListUl = document.getElementById("notification-list-ul");

    if (notificationBell && notificationDropdown) {
        if (notificationDot) {
            setTimeout(() => {
                notificationDot.style.display = "block";
                // Thêm thông báo mới demo
                if (notificationListUl) {
                    const newNotif = document.createElement("li");
                    newNotif.innerHTML =
                        '<a href="#">Khuyến mãi hè cực sốc!</a><span>Vừa xong</span>';
                    notificationListUl.prepend(newNotif);
                }
            }, 3000);
        }

        notificationBell.addEventListener("click", (event) => {
            event.stopPropagation();
            notificationDropdown.classList.toggle("show");
            if (notificationDot) {
                notificationDot.style.display = "none";
            }
        });

        document.addEventListener("click", (event) => {
            if (
                notificationDropdown.classList.contains("show") &&
                !notificationBell.contains(event.target) &&
                !notificationDropdown.contains(event.target)
            ) {
                notificationDropdown.classList.remove("show");
            }
        });
    }

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById("theme-toggle-button");
    const sunIcon = document.querySelector(".sun-icon");
    const moonIcon = document.querySelector(".moon-icon");

    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            if (sunIcon) sunIcon.style.display = "none";
            if (moonIcon) moonIcon.style.display = "block";
        } else {
            if (sunIcon) sunIcon.style.display = "block";
            if (moonIcon) moonIcon.style.display = "none";
        }
    };

    const currentTheme = localStorage.getItem("theme") || "light";
    applyTheme(currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", () => {
            let newTheme =
                document.documentElement.getAttribute("data-theme") === "dark"
                    ? "light"
                    : "dark";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }

    // --- Current Year in Footer ---
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Client-side Search and Category Filtering (Chỉ cho index.html) ---
    if (document.getElementById("all-articles-grid")) {
        // Kiểm tra xem có phải trang chủ không
        const searchInput = document.getElementById("search-input");
        const articlesGrid = document.getElementById("all-articles-grid");
        const allArticleCards = Array.from(
            articlesGrid.getElementsByClassName("article-card")
        );
        const noArticlesMessage = document.getElementById("no-articles-message");
        const categoryFilterLinks = document.querySelectorAll(
            ".category-filter-link, .nav-category-link"
        );
        const navCategoryLinks = document.querySelectorAll(".nav-category-link");

        const filterArticles = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const activeCategoryFilter =
                document.querySelector(".nav-category-link.active")?.dataset
                    .categoryFilter || "all";
            let foundArticles = 0;

            allArticleCards.forEach((card) => {
                const title =
                    card.querySelector("h3 a")?.textContent.toLowerCase() || "";
                const snippet =
                    card.querySelector("p.snippet")?.textContent.toLowerCase() || "";
                const cardCategory = card.dataset.category;

                const matchesSearch =
                    searchTerm === "" ||
                    title.includes(searchTerm) ||
                    snippet.includes(searchTerm);
                const matchesCategory =
                    activeCategoryFilter === "all" ||
                    (cardCategory &&
                        cardCategory.toLowerCase() === activeCategoryFilter.toLowerCase());

                if (matchesSearch && matchesCategory) {
                    card.classList.remove("hidden");
                    foundArticles++;
                } else {
                    card.classList.add("hidden");
                }
            });

            if (noArticlesMessage) {
                noArticlesMessage.style.display =
                    foundArticles === 0 ? "block" : "none";
            }
        };

        if (searchInput) {
            searchInput.addEventListener("keyup", filterArticles);
        }

        categoryFilterLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const filterValue = link.dataset.categoryFilter;

                // Cập nhật active class cho nav links
                navCategoryLinks.forEach((navLink) => {
                    if (navLink.dataset.categoryFilter === filterValue) {
                        navLink.classList.add("active");
                    } else {
                        navLink.classList.remove("active");
                    }
                });

                // Nếu click vào link "Xem tất cả" trong section, cũng cập nhật nav
                const correspondingNavLink = document.querySelector(
                    `.nav-category-link[data-category-filter="${filterValue}"]`
                );
                if (correspondingNavLink) {
                    navCategoryLinks.forEach((nl) => nl.classList.remove("active"));
                    correspondingNavLink.classList.add("active");
                }

                filterArticles(); // Gọi lại filterArticles để áp dụng cả search và category

                // Scroll đến section tin mới nhất để người dùng thấy kết quả
                const recentArticlesSection = document.getElementById("tin-moi-nhat");
                if (recentArticlesSection) {
                    recentArticlesSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    // --- Dynamic Article Content Loading (Cho article.html) ---
    if (document.getElementById("article-main-content-area")) {
        // Kiểm tra xem có phải trang chi tiết bài viết không
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get("id"));

        const article = sampleArticles.find((a) => a.id === articleId);

        if (article) {
            document.title = `${article.title} - TinTucHay`;
            document.getElementById("article-category").textContent =
                article.category;
            document.getElementById("article-title").textContent = article.title;
            document.getElementById("article-author").textContent = article.author;
            document.getElementById("article-author-avatar").alt = article.author;
            document.getElementById(
                "article-author-avatar"
            ).src = `/placeholder.svg?width=40&height=40&text=${article.author
                .substring(0, 1)
                .toUpperCase()}`;
            document.getElementById("article-date").textContent = article.date;
            document.getElementById("article-image").src = article.imageUrl;
            document.getElementById("article-image").alt = article.title;
            document.getElementById("article-body-content").innerHTML =
                article.content;

            const tagsContainer = document.getElementById("article-tags");
            if (article.tags && article.tags.length > 0) {
                tagsContainer.innerHTML = "<strong>Tags:</strong> ";
                article.tags.forEach((tag) => {
                    const tagElement = document.createElement("a");
                    tagElement.href = `#tag-${tag.toLowerCase().replace(/\s+/g, "-")}`; // Placeholder link
                    tagElement.className = "tag-badge";
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
            } else {
                tagsContainer.innerHTML = "";
            }

            // Load related articles (demo: 3 bài viết khác category hoặc khác ID)
            const relatedArticlesGrid = document.getElementById(
                "related-articles-grid"
            );
            const relatedSection = document.getElementById(
                "related-articles-section"
            );
            if (relatedArticlesGrid && relatedSection) {
                const related = sampleArticles
                    .filter((rel) => rel.id !== article.id)
                    .sort(() => 0.5 - Math.random()) // Randomize
                    .slice(0, 3);
                if (related.length > 0) {
                    related.forEach((relArt) => {
                        const card = document.createElement("article");
                        card.className = "article-card";
                        card.innerHTML = `
                            <a href="article.html?id=${relArt.id
                            }" class="article-image-link"><img src="${relArt.imageUrl.replace(
                                "800&height=450",
                                "400&height=225"
                            )}" alt="${relArt.title}"></a>
                            <div class="article-card-content">
                                <span class="category-badge">${relArt.category
                            }</span>
                                <h3><a href="article.html?id=${relArt.id}">${relArt.title
                            }</a></h3>
                                <div class="article-meta">
                                    <span>${relArt.author
                            }</span> &bull; <span>${relArt.date}</span>
                                </div>
                            </div>
                        `;
                        relatedArticlesGrid.appendChild(card);
                    });
                } else {
                    relatedSection.style.display = "none";
                }
            }
            // Xử lý nút search trên trang article (chuyển hướng về trang chủ với query)
            const searchInputArticle = document.getElementById(
                "search-input-article"
            );
            const searchButtonArticle = document.getElementById(
                "search-button-article"
            );
            if (searchInputArticle && searchButtonArticle) {
                const performSearchRedirect = () => {
                    const searchTerm = searchInputArticle.value.trim();
                    if (searchTerm) {
                        window.location.href = `index.html?search=${encodeURIComponent(
                            searchTerm
                        )}`;
                    }
                };
                searchButtonArticle.addEventListener("click", performSearchRedirect);
                searchInputArticle.addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        performSearchRedirect();
                    }
                });
            }
        } else {
            document.getElementById("article-main-content-area").innerHTML =
                '<h1 style="text-align:center; margin-top: 50px;">Bài viết không tồn tại hoặc đã bị xóa.</h1><p style="text-align:center;"><a href="index.html" class="btn btn-primary">Về trang chủ</a></p>';
            const relatedSection = document.getElementById(
                "related-articles-section"
            );
            if (relatedSection) relatedSection.style.display = "none";
        }
    } else {
        // Nếu đang ở trang chủ, kiểm tra xem có query search từ trang article không
        const urlParams = new URLSearchParams(window.location.search);
        const searchFromArticle = urlParams.get("search");
        if (searchFromArticle && document.getElementById("search-input")) {
            document.getElementById("search-input").value =
                decodeURIComponent(searchFromArticle);
            // Kích hoạt filter
            const event = new Event("keyup");
            document.getElementById("search-input").dispatchEvent(event);
        }
    }

    // --- Form Validation (Giữ nguyên từ trước) ---
    const registerForm = document.querySelector("body.auth-page form"); // Chung cho cả login và register
    if (registerForm && window.location.pathname.includes("register.html")) {
        registerForm.addEventListener("submit", function (event) {
            // ... (code validation cũ) ...
            const password = document.getElementById("password");
            const confirmPassword = document.getElementById("confirm-password");
            const terms = document.querySelector('input[name="terms"]');
            let isValid = true;
            let errorMessages = [];

            if (
                password &&
                confirmPassword &&
                password.value !== confirmPassword.value
            ) {
                errorMessages.push("Mật khẩu không khớp.");
                isValid = false;
            }
            if (password && password.value.length < 6) {
                errorMessages.push("Mật khẩu phải có ít nhất 6 ký tự.");
                isValid = false;
            }
            if (terms && !terms.checked) {
                errorMessages.push(
                    "Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật."
                );
                isValid = false;
            }

            if (!isValid) {
                alert("Vui lòng kiểm tra lại thông tin:\n" + errorMessages.join("\n"));
                event.preventDefault();
            } else {
                alert("Đăng ký thành công! (Đây là bản demo)");
                event.preventDefault();
                // window.location.href = "login.html";
            }
        });
    }

    if (registerForm && window.location.pathname.includes("login.html")) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Đăng nhập thành công! (Đây là bản demo)");
            // window.location.href = "index.html";
        });
    }
});
