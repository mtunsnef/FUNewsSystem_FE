import { getAllNewsArticles, getTopArticles, getArticlesByCategory } from '../services/news.service.js';

$(document).ready(function () {
    loadAllNewsArticle();
    loadTopArticles();
    loadTechnologyArticles();
    loadEntertainmentArticles();
    loadEucationArticles();
    loadSportArticles();
    loadHealthyArticles();
});

function initFeaturedCarousel() {
    const $track = $('#featured-carousel');
    const $slides = $track.find('.featured-article');
    const $dotsContainer = $('#carousel-dots');

    const totalSlides = $slides.length;
    const groupSize = 3; // Số bài mỗi nhóm dot
    let currentIndex = 0;
    let timer;

    function renderDotsForGroup(startIndex) {
        $dotsContainer.empty();
        const groupEnd = Math.min(startIndex + groupSize, totalSlides);
        for (let i = startIndex; i < groupEnd; i++) {
            const active = i === currentIndex ? 'active' : '';
            $dotsContainer.append(`<span class="dot ${active}" data-index="${i}"></span>`);
        }

        const $dots = $dotsContainer.find('.dot');
        $dots.on('click', function () {
            stopAutoSlide();
            const index = parseInt($(this).data('index'));
            showSlide(index);
            startAutoSlide();
        });
    }

    function showSlide(index) {
        const slideWidth = $slides.first().outerWidth(true);
        const offset = -index * slideWidth;
        $track.css('transform', `translateX(${offset}px)`);

        currentIndex = index;
        const currentGroupStart = Math.floor(currentIndex / groupSize) * groupSize;
        renderDotsForGroup(currentGroupStart);
    }

    function nextSlideSmart() {
        let nextIndex = currentIndex + 1;

        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }

        const currentGroupStart = Math.floor(currentIndex / groupSize) * groupSize;
        const currentGroupEnd = currentGroupStart + groupSize;

        if (nextIndex < currentGroupEnd) {
            showSlide(nextIndex);
        } else {
            showSlide(nextIndex);
        }
    }

    function startAutoSlide() {
        timer = setInterval(nextSlideSmart, 5000);
    }


    function stopAutoSlide() {
        clearInterval(timer);
    }

    if (totalSlides > 0) {
        showSlide(0);
        startAutoSlide();
    }
}

function loadAllNewsArticle() {
    const $carousel = $("#featured-carousel");
    const $dotsContainer = $("#carousel-dots");
    $carousel.empty();
    $dotsContainer.empty();

    getAllNewsArticles()
        .then(res => {
            const articleList = res.data;

            articleList.forEach(article => {
                const html = generateFeaturedArticleHtml(article);
                $carousel.append(html);
            });

            initFeaturedCarousel();
        })
        .catch(() => {
            $carousel.html("<p style='color:red;'>Không thể tải bài viết nổi bật.</p>");
        });
}



// Top mới nhất
function loadTopArticles() {
    const $container = $("#top-articles");
    $container.empty();

    getTopArticles()
        .then(res => {
            const articleList = res.data;
            articleList.forEach(article => {
                const html = generateTopArticleHtml(article);
                $container.append(html);
            });
        })
        .catch(() => {
            $container.html("<p style='color:red;'>Không thể tải dữ liệu bài viết.</p>");
        });
}

// Chuyên mục Công nghệ
function loadTechnologyArticles() {
    const $container = $("#technology-articles");
    $container.empty();

    getArticlesByCategory("Công nghệ")
        .then(res => {
            const articleList = res.data;
            articleList.forEach(article => {
                const html = generateSmallCardHtml(article);
                $container.append(html);
            });
        })
        .catch(() => {
            $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
        });
}

// Chuyên mục Giải trí
function loadEntertainmentArticles() {
    const $container = $("#entertainment-articles");
    $container.empty();

    getArticlesByCategory("Giải trí")
        .then(res => {
            const articleList = res.data;
            articleList.forEach(article => {
                const html = generateSmallCardHtml(article);
                $container.append(html);
            });
        })
        .catch(() => {
            $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
        });
}

// Chuyên mục Giáo dục
function loadEucationArticles() {
    const $container = $("#education-articles");
    $container.empty();

    getArticlesByCategory("Giáo dục")
        .then(res => {
            const articleList = res.data;
            articleList.forEach(article => {
                const html = generateSmallCardHtml(article);
                $container.append(html);
            });
        })
        .catch(() => {
            $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
        });
}


// Chuyên mục Thể thao
function loadSportArticles() {
    const $container = $("#sport-articles");
    $container.empty();

    getArticlesByCategory("Thể thao")
        .then(res => {
            const articleList = res.data;
            articleList.forEach(article => {
                const html = generateHorizontalCardHtml(article);
                $container.append(html);
            });
        })
        .catch(() => {
            $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
        });
}

// Chuyên mục Suckhoe
function loadHealthyArticles() {
    const $container = $("#healthy-articles");
    $container.empty();

    getArticlesByCategory("Sức khỏe")
        .then(res => {
            const articleList = res.data;
            articleList.forEach(article => {
                const html = generateHorizontalCardHtml(article);
                $container.append(html);
            });
        })
        .catch(() => {
            $container.html("<p style='color:red;'>Không thể tải bài viết.</p>");
        });
}


// Định dạng ngày
function formatVNDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
}

// Template HTML bài viết

function generateFeaturedArticleHtml(article) {
    const title = article.NewsTitle || "Không có tiêu đề";
    const content = article.NewsContent || "Không có mô tả";
    const category = article.Category?.ParentCategory?.CategoryName || article.Category?.CategoryName || "Không rõ";
    const author = article.CreatedBy?.AccountName || "Ẩn danh";
    const createdDate = formatVNDate(article.CreatedDate);
    const imageSrc = article.ImageTitle || "/placeholder.svg?width=700&height=400";

    return `
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
}

function generateTopArticleHtml(article) {
    const title = article.NewsTitle || "Không có tiêu đề";
    const content = article.NewsContent || "Không có mô tả";
    const category = article.Category?.ParentCategory?.CategoryName || article.Category?.CategoryName || "Không rõ";
    const author = article.CreatedBy?.AccountName || "Ẩn danh";
    const createdDate = formatVNDate(article.CreatedDate);
    const imageSrc = article.ImageTitle || "/placeholder.svg?width=400&height=225";

    return `
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
}

function generateSmallCardHtml(article) {
    const title = article.NewsTitle || "Không có tiêu đề";
    const author = article.CreatedBy?.AccountName || "Ẩn danh";
    const createdDate = formatVNDate(article.CreatedDate);
    const imageSrc = article.ImageTitle || "/placeholder.svg?width=300&height=170";

    return `
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
}

function generateHorizontalCardHtml(article) {
    const title = article.NewsTitle || "Không có tiêu đề";
    const author = article.CreatedBy?.AccountName || "Ẩn danh";
    const createdDate = formatVNDate(article.CreatedDate);
    const imageSrc = article.ImageTitle || "/placeholder.svg?width=300&height=170";
    const short = article.ShortDescription || "";

    return `
        <article class="article-card article-card-horizontal">
            <a href="chi-tiet/${article.NewsArticleId}" class="article-image-link">
                <img src="${imageSrc}" alt="${title}">
            </a>
            <div class="article-card-content">
                <span class="category-badge">${article.Category.ParentCategory.CategoryName}</span>
                <h3><a href="chi-tiet/${article.NewsArticleId}">${title}</a></h3>
                <p class="snippet">${short}</p>
                <div class="article-meta">
                    <span>${author}</span> &bull; <span>${createdDate}</span>
                </div>
            </div>
        </article>`;
}
