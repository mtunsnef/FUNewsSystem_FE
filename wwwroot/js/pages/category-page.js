import { getArticlesByCategoryId } from "../services/category.service.js";

$(document).ready(async function () {
    const $container = $("#category-articles");
    const categoryId = parseInt($container.data("category-id"));
    const $title = $("#category-title");

    try {
        const articles = await getArticlesByCategoryId(categoryId);

        if (!articles || articles.length === 0) {
            $container.html("<p>Không có bài viết nào trong chuyên mục này.</p>");
            return;
        }

        const mainCategory = articles[0].Category;
        const parent = mainCategory?.ParentCategory;

        if (mainCategory.CategoryId === categoryId) {
            $title.text(mainCategory.CategoryName);
        } else if (parent && parent.CategoryId === categoryId) {
            $title.text(parent.CategoryName);
        } else {
            $title.text(mainCategory.CategoryName);
        }

        articles.forEach(article => {
            const title = article.NewsTitle || "Không có tiêu đề";
            const author = article.CreatedBy?.AccountName || "Ẩn danh";
            const createdDate = formatVNDate(article.CreatedDate);
            const imageSrc = article.ImageTitle || "/placeholder.svg?width=300&height=170";

            const html = `
                <article class="article-card">
                    <a href="/chi-tiet/${article.NewsArticleId}" class="article-image-link">
                        <img src="${imageSrc}" alt="${title}">
                    </a>
                    <div class="article-card-content">
                        <h3><a href="/chi-tiet/${article.NewsArticleId}">${title}</a></h3>
                        <div class="article-meta">
                            <span>${author}</span> &bull; <span>${createdDate}</span>
                        </div>
                    </div>
                </article>
            `;

            $container.append(html);
        });
    } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
    }
});

function formatVNDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
}
