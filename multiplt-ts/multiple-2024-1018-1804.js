// script標籤會長這樣
//<script src="https://storage.googleapis.com/seo-js/multiple-script.js?replace_id=blog-posts&article_ids=pr14QyolSnRKIkFHG9uV,nKNAEuwsJklwkuYWKuEb"></script>
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
// const replaceElementId = 'blog-posts'
// const article_ids = "pr14QyolSnRKIkFHG9uV,nKNAEuwsJklwkuYWKuEb";
const articleList = article_ids.split(",");

const apiUrl = "https://seo-manager.wows-ai.dev/api/article"; // API URL
let allPostsInfo = []; // 用來存儲所有文章信息
let currentIndex = 0; // 當前顯示的文章索引

// 加載每個文章
async function fetchPosts() {
  try {
    // 使用 Promise.all 等待所有文章的請求完成
    const fetchPromises = articleList.map(async (article_Id) => {
      const url = `${apiUrl}?id=${article_Id}`;
      const response = await fetch(url); // 按照 article_Id 抓取文章
      if (!response.ok) throw new Error(`Error fetching post ${article_Id}`);
      const getPostRes = await response.json();
      if (!getPostRes?.data)
        throw new Error(`Post data for ${article_Id} is empty`);
      return getPostRes.data; // 返回每篇文章的信息
    });

    allPostsInfo = await Promise.all(fetchPromises); // 等待所有文章抓取完畢
    displayPost(currentIndex); // 顯示第一篇文章
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// 顯示特定文章
function displayPost(index) {
  const postInfo = allPostsInfo[index]; // 獲取當前文章信息
  if (!postInfo) return; // 如果文章信息不存在，返回

  const postDate = new Date(postInfo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postsHTML = `
    <div class="blog-post">
      <div class="blog-image" style="position: relative;">
        <img src="${postInfo.cover_url}" alt="${
    postInfo.title
  }" style="width: 100%; height: auto;">
        <div id="preview-pre-btn" style="position: absolute; display: flex; justify-content: space-between; width: 100%; top: 50%; transform: translateY(-50%);">
          <button onclick="changePost(-1)" style="margin-left: 12px;">&lt;&lt;</button>
          <button onclick="changePost(1)" style="margin-right: 12px;">&gt;&gt;</button>
        </div>
      </div>
      <div class="blog-content">
        <div class="post-date">${postDate}</div>
        <h2>${postInfo.title}</h2>
        <p>${marked.parse(postInfo.content)}</p>
      </div>
    </div>
  `;

  // 渲染文章到頁面
  document.getElementById(replaceElementId).innerHTML = postsHTML;
}

// 切換文章
window.changePost = function (direction) {
  currentIndex += direction; // 根據方向更新索引
  if (currentIndex < 0) currentIndex = 0; // 不允許小於0
  if (currentIndex >= allPostsInfo.length)
    currentIndex = allPostsInfo.length - 1; // 不允許大於可用文章數
  displayPost(currentIndex); // 顯示新的文章
};

// 初始化，當頁面加載完畢時開始抓取文章
document.addEventListener("DOMContentLoaded", function () {
  fetchPosts(); // 每次載入時抓取並顯示文章
});
