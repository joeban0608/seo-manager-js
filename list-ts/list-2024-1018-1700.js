// script標籤會長這樣
//<script src="https://storage.googleapis.com/seo-js/list.js?replace_id=content&domain=masaya365tayataya.win"></script>

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const replaceElementId = "blog-posts";
const domain = "masaya365tayataya.win";

const apiUrl = "https://seo-manager.wows-ai.dev/api/deploy-article"; // 每頁最多抓取 100 篇文章
// const article_id = "pr14QyolSnRKIkFHG9uV";
let allPostList = []; // 存儲所有文章
// 加載所有頁面的文章，直到抓取完畢
async function fetchPosts() {
  try {
    let deployArticleList = [];
    const response = await fetch(apiUrl); // 按頁面逐次抓取
    if (!response.ok) throw new Error("Error fetching deploy article list");
    const getDeployArticleListRes = await response.json();
    if (!getDeployArticleListRes?.data?.length)
      throw new Error("deploy article data is empty");

    deployArticleList = getDeployArticleListRes.data;
    deployArticleList = deployArticleList.filter((deployArticleInfo) => {
      return deployArticleInfo?.domain === domain;
    });
    allPostList = deployArticleList;
    displayPosts(); // 顯示當前頁面的文章
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return { error: `Error fetching WordPress posts: ${error}` };
  }
}

// 顯示當前頁面的文章
function displayPosts() {
  // 如果選擇了分類，根據分類過濾文章
  let postsHTML = "";
  if (!allPostList.length) {
    postsHTML = "No posts found for the specified domain.";
    return;
  }

  // 遍歷 allPostList 並生成每篇文章的 HTML
  allPostList.forEach((postInfo) => {
    const postDate = new Date(postInfo.updated_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    postsHTML += `
    <div class="blog-post" onclick="redirectToPost('${postInfo.title}')">
      <div class="blog-image">
        <img src="${postInfo.cover_url}" alt="${postInfo.title}">
      </div>
      <div class="blog-content">
        <div class="post-date">${postDate}</div>
        <h2>${postInfo.title}</h2>
        <p>${marked.parse(postInfo.content)}</p>
      </div>
    </div>
  `;
  });
  document.getElementById(replaceElementId).innerHTML = postsHTML;
}
// 顯示分頁按鈕

// // 跳轉到文章詳細頁面
// function redirectToPost(postId) {
//   window.location.href = `/posts?post_id=${postId}`;
// }

// 初始化
document.addEventListener("DOMContentLoaded", function () {
  fetchPosts(); // 每次載入時抓取並顯示文章
});
