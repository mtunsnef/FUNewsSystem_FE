import axios from "../config/axios.customize.js";

export async function getAllCategories() {
    const res = await axios.get("/api/categories");
    return res.data;
}

export async function getParentCategories() {
    const all = await getAllCategories();
    return all.filter(c => c.ParentCategoryId === null);
}

export async function getChildCategories(parentId) {
    const all = await getAllCategories();
    return all.filter(c => c.ParentCategoryId === parentId);
}

export async function getArticlesByCategoryId(categoryId) {
    const filter = `(Category/CategoryId eq ${categoryId} or Category/ParentCategory/CategoryId eq ${categoryId})`;
    const url = `/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$filter=${encodeURIComponent(filter)}&$orderby=CreatedDate desc`;

    const res = await axios.get(url);
    return res.data || [];
}