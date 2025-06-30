import { getNewsArticleById } from '../services/news.service.js';

$(document).ready(function () {
    const $container = $('#article-detail');
    const id = $container.data('id');

    getNewsArticleById(id)
        .then(response => {
            console.log(response);
            const data = response?.data || [];
            const article = data[0];

            if (!article) {
                $container.html("<p>Bài viết không tồn tại.</p>");
                return;
            }

            let tagHtml = '';
            if (article.Tags?.length > 0) {
                tagHtml = `
                    <footer class="article-footer">
                        <div class="tags">
                            <strong>Tags:</strong>
                            ${article.Tags.map(tag => `<a href="#" class="tag-badge">${tag.TagName}</a>`).join('')}
                        </div>
                    </footer>`;
            }

            const categoryBadgeHtml = article.Category?.ParentCategory
                        ? `
                <div class="d-flex align-items-center mb-2" style="gap: 8px;text-transform: uppercase;">
                    <a href="/category/${article.Category.ParentCategory.CategoryId}" class="category-badge mb-0">${article.Category.ParentCategory.CategoryName}</a>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#777777"/>
                    </svg>
                    <span class="text-muted">${article.Category.CategoryName}</span>
                </div>
            `
                        : `
                <div class="mb-2" style="text-transform: uppercase;">
                    <a href="/category/${article.Category?.CategoryId}" class="category-badge mb-0">${article.Category?.CategoryName || ''}</a>
                </div>
            `;


                        const html = `
                <a href="/trang-chu" class="back-link d-inline-flex align-items-center gap-2 mb-3">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Về trang chủ
                </a>

                <article class="article-content-main">
                    <div class="article-header">
                        ${categoryBadgeHtml}

                        <h1 class="mb-3">${article.NewsTitle}</h1>

                        <div class="article-meta-detailed d-flex flex-wrap align-items-center gap-3 mb-3">
                            <div class="author-info d-flex align-items-center gap-2">
                                <img src="/images/default-image.jpg" width="25" height="25" class="rounded-circle" alt="avatar">
                                <span>${article.CreatedBy?.AccountName || 'Ẩn danh'}</span>
                            </div>
                            <span class="publish-date text-muted">
                                Đăng ngày: ${new Date(article.CreatedDate).toLocaleDateString("vi-VN")}
                            </span>
                        </div>
                    </div>

                    <figure class="article-main-image mb-3">
                        <img src="${article.ImageTitle}" alt="${article.NewsTitle}" class="img-fluid w-100 rounded">
                    </figure>

                    <div id="article-body" class="article-body px-2"></div>

                    ${tagHtml}
                </article>
            `;


            $container.html(html);

            const parsedContent = parseMarkdown(article.NewsContent);
            $('#article-body').html(parsedContent);
        })
        .catch(err => {
            console.error(err);
            $container.html("<p>Lỗi khi tải bài viết.</p>");
        });
});
