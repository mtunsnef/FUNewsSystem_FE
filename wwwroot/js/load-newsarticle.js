$(document).ready(function () {
    loadAllNewsArticle();
    loadTopArticles();
    loadAcademicArticles();
    loadEntertainmentArticles();
});

function loadAllNewsArticle() {
    const $carousel = $("#featured-carousel");
    $carousel.empty();

    $.ajax({
        url: "https://funewsapi.azurewebsites.net/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$filter=NewsStatus eq 'A'",
        method: "GET",
        dataType: "json",
        success: function (response) {
            const articles = response;

            articles.forEach(article => {
                const title = article.NewsTitle || "Không có tiêu đề";
                const content = article.NewsContent || "Không có mô tả";
                const category = article.Category?.ParentCategory?.CategoryName || article.Category?.CategoryName || "Không rõ";
                const author = article.CreatedBy?.AccountName || "Ẩn danh";
                const createdDate = formatVNDate(article.CreatedDate);
                const imageSrc = article.ImageTitle || "/placeholder.svg?width=700&height=400";

                const html = `
                    <div class="featured-article">
                        <div class="featured-image">
                            <img src="${imageSrc}" alt="${title}">
                        </div>
                        <div class="featured-content">
                            <span class="category-badge">${category}</span>
                            <h2><a href="chi-tiet/${article.NewsArticleId}">${title}</a></h2>
                            <p class="snippet">${content}</p>
                            <div class="article-meta">
                                <span>${author}</span> &bull; <span>${createdDate}</span>
                            </div>
                            <a href="chi-tiet/${article.NewsArticleId}" class="btn btn-secondary">Đọc thêm</a>
                        </div>
                    </div>
                `;
                $carousel.append(html);
            });

            startFeaturedCarousel();
        },
        error: function (xhr, status, error) {
            console.error("Lỗi khi tải Featured Articles:", error);
            $carousel.html("<p style='color:red;'>Không thể tải bài viết nổi bật.</p>");
        }
    });
}


function loadTopArticles() {
    const $container = $("#top-articles");
    $container.empty();

    $.ajax({
        url: "https://funewsapi.azurewebsites.net/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$top=3&$filter=NewsStatus eq 'A'",
        method: "GET",
        dataType: "json",
        success: function (data) {
            const articles = data;
            articles.forEach(article => {
                const title = article.NewsTitle || "Không có tiêu đề";
                const content = article.NewsContent || "Không có mô tả";
                const category = article.Category?.ParentCategory.CategoryName || "Không rõ";
                const author = article.CreatedBy?.AccountName || "Ẩn danh";
                const createdDate = formatVNDate(article.CreatedDate);
                const imageSrc = article.ImageTitle || "/placeholder.svg?width=400&height=225";

                const html = `
                    <article class="article-card">
                        <a href="chi-tiet/${article.NewsArticleId}" class="article-image-link">
                            <img src="${imageSrc}" alt="${title}">
                        </a>
                        <div class="article-card-content">
                            <span class="category-badge">${category}</span>
                            <h3><a href="chi-tiet/${article.NewsArticleId}">${title}</a></h3>
                            <p class="snippet">${content}</p>
                            <div class="article-meta">
                                <span>${author}</span> &bull; <span>${createdDate}</span>
                            </div>
                        </div>
                    </article>`;
                $container.append(html);
            });
        },
        error: function (xhr, status, error) {
            console.error("Lỗi khi tải bài viết mới nhất:", error);
            $container.html("<p style='color:red;'>Không thể tải dữ liệu bài viết.</p>");
        }
    });
}

function loadAcademicArticles() {
    const $container = $("#academics-articles");
    $container.empty();

    const filter = "Category/ParentCategory/CategoryName eq 'Công nghệ' and NewsStatus eq 'A'";
    const url = `https://funewsapi.azurewebsites.net/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$top=4&$filter=${encodeURIComponent(filter)}`;

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (data) {
            const articles = data;
            articles.forEach(article => {
                const title = article.NewsTitle || "Không có tiêu đề";
                const author = article.CreatedBy?.AccountName || "Ẩn danh";
                const createdDate = formatVNDate(article.CreatedDate);
                const imageSrc = article.ImageTitle || "/placeholder.svg?width=300&height=170";

                const html = `
                    <article class="article-card article-card-small">
                        <a href="chi-tiet/${article.NewsArticleId}" class="article-image-link">
                            <img src="${imageSrc}" alt="${title}">
                        </a>
                        <div class="article-card-content">
                            <h3><a href="chi-tiet/${article.NewsArticleId}">${title}</a></h3>
                            <div class="article-meta">
                                <span>${author}</span> &bull; <span>${createdDate}</span>
                            </div>
                        </div>
                    </article>`;
                $container.append(html);
            });
        },
        error: function (xhr, status, error) {
            console.error("Lỗi khi tải bài viết Academics:", error);
            $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
        }
    });
}

function loadEntertainmentArticles() {
    const $container = $("#kinh-doanh .articles-grid");
    $container.empty();

    const filter = "Category/ParentCategory/CategoryName eq 'Giải trí' and NewsStatus eq 'A'";
    const url = `https://funewsapi.azurewebsites.net/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$top=4&$filter=${encodeURIComponent(filter)}`;

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (data) {
            const articles = data;
            articles.forEach(article => {
                const title = article.NewsTitle || "Không có tiêu đề";
                const author = article.CreatedBy?.AccountName || "Ẩn danh";
                const createdDate = formatVNDate(article.CreatedDate);
                const imageSrc = article.ImageTitle || "/placeholder.svg?width=300&height=170";

                const html = `
                    <article class="article-card article-card-horizontal">
                        <a href="chi-tiet/${article.NewsArticleId}" class="article-image-link">
                            <img src="${imageSrc}" alt="${title}">
                        </a>
                        <div class="article-card-content">
                            <span class="category-badge">Giải trí</span>
                            <h3><a href="chi-tiet/${article.NewsArticleId}">${title}</a></h3>
                            <p class="snippet">${article.ShortDescription || ""}</p>
                            <div class="article-meta">
                                <span>${author}</span> &bull; <span>${createdDate}</span>
                            </div>
                        </div>
                    </article>`;
                $container.append(html);
            });
        },
        error: function (xhr, status, error) {
            console.error("Lỗi khi tải bài viết Giải trí:", error);
            $container.html("<p style='color:red;'>Không thể tải bài viết Giải trí.</p>");
        }
    });
}


function formatVNDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
}
