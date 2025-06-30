import { getAllCategories } from "../services/category.service.js";

$(document).ready(function () {
    loadCategories();

    $(document).on('click', '.nav-item.dropdown > .nav-link', function (e) {
        e.preventDefault();
        const parentLi = $(this).parent();
        $('.nav-item.dropdown.show').not(parentLi).removeClass('show');
        parentLi.toggleClass('show');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav-item.dropdown').length) {
            $('.nav-item.dropdown.show').removeClass('show');
        }
    });
});

export async function loadCategories() {
    try {
        const categories = await getAllCategories();

        const parentCategories = categories.filter(c => c.ParentCategoryId === null);

        parentCategories.forEach(parent => {
            const childCategories = categories.filter(c => c.ParentCategoryId === parent.CategoryId);

            if (childCategories.length > 0) {
                const li = $(`
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button">${parent.CategoryName}</a>
                        <ul class="custom-dropdown-menu"></ul>
                    </li>
                `);

                childCategories.forEach(child => {
                    li.find(".custom-dropdown-menu").append(`
                        <li style="margin: 0; text-align: left;">
                            <a class="dropdown-item" href="/category/${child.CategoryId}">${child.CategoryName}</a>
                        </li>
                    `);
                });

                $("#category-menu").append(li);
            } else {
                $("#category-menu").append(`
                    <li class="nav-item">
                        <a class="nav-link" href="/category/${parent.CategoryId}">${parent.CategoryName}</a>
                    </li>
                `);
            }
        });
    } catch (error) {
        console.error("Lỗi load category:", error);
    }
}
