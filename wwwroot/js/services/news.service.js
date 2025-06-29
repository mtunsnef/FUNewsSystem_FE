import axios from '../config/axios.customize.js';

export function getAllNewsArticles() {
    return axios.get(`/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$filter=NewsStatus eq 'A'&$orderby=CreatedDate desc`);
}

export function getTopArticles(top = 3) {
    return axios.get(`/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$filter=NewsStatus eq 'A'&$orderby=CreatedDate desc&$top=${top}`);
}

export function getArticlesByCategory(categoryName, top = 4) {
    const filter = `Category/ParentCategory/CategoryName eq '${categoryName}' and NewsStatus eq 'A'`;
    return axios.get(`/odata/NewsArticle?$expand=Category($expand=ParentCategory),CreatedBy&$top=${top}&$filter=${encodeURIComponent(filter)}`);
}

export function getNewsArticleById(id) {
    return axios.get(`/odata/NewsArticle?$filter=NewsArticleId eq '${id}'&$expand=Category($expand=ParentCategory),CreatedBy,Tags`);
}
