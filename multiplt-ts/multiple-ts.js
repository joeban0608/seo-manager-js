// script標籤會長這樣
//<script src="https://wows-ai.dev/multiple.js?replace_id=content&article_ids=G0Ocebt06wrmou3L2SVm,twbwWsIykpmUKM57HXhW"></script>
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
const script =
  document.currentScript || document.querySelector('script[src*="multiple"]');

if (!script) {
  console.error("Script element not found.");
}

const script_url = new URL(script.src);
// 取得 URL 中的參數
const replaceElementId = script_url.searchParams.get("replace_id");
const article_ids = script_url.searchParams.get("article_ids");

if (!replaceElementId || !article_ids) {
  console.error(
    "replaceElementId and article_Ids is required in multiple script.js"
  );
}
// https://seo-manager.wows-ai.dev/api/article?id={id}
const apiUrl = "https://seo-manager.wows-ai.dev/api/article"; // 每頁最多抓取 100 篇文章
// const article_id = "pr14QyolSnRKIkFHG9uV";
let postInfo = null; // 存儲所有文章
// 加載所有頁面的文章，直到抓取完畢
async function fetchPosts() {
  const url = `${apiUrl}?id=${article_Id}`;
  try {
    const response = await fetch(url); // 按頁面逐次抓取
    if (!response.ok) throw new Error("Error fetching posts");
    const getPostRes = await response.json();
    if (!getPostRes?.data) throw new Error("post data is empty");
    postInfo = getPostRes.data;
    // 如果抓取的文章數量小於每頁的最大值，代表已經抓取完所有文章
    // 只保留分類為 "Slot games" 和 "318Promo" 的文章
    // 隨機排列文章
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
  if (!postInfo) {
    postsHTML = "Post in not found";
    return;
  }

  const postDate = new Date(postInfo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  postsHTML += `
    <div class="blog-post" onclick="redirectToPost(${postInfo.title})">
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
