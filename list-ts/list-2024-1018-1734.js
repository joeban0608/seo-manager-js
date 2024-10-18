// script標籤會長這樣
//<script src="https://storage.googleapis.com/seo-js/list.js?replace_id=blog-posts&domain=masaya365tayataya.win"></script>

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
const script =
  document.currentScript || document.querySelector('script[src*="list"]');

if (!script) {
  console.error("Script element not found.");
}

const script_url = new URL(script.src);
// 取得 URL 中的參數
const replaceElementId = script_url.searchParams.get("replace_id");
const domain = script_url.searchParams.get("domain");

if (!replaceElementId || !domain) {
  console.error("replaceElementId and domain is required in list.js");
}

// const replaceElementId = "blog-posts";
// const domain = "masaya365tayataya.win";
const baseApiUrl = "https://seo-manager.wows-ai.dev/api";
let allPostList = []; // 存儲所有文章
let article_ids = [];

// 加載所有頁面的文章，直到抓取完畢
async function fetchPosts() {
  if (!article_ids?.length) throw new Error("article ids are not found");

  try {
    const fetchPromises = article_ids.map(async (article_Id) => {
      const url = `${baseApiUrl}/article?id=${article_Id}`;
      const response = await fetch(url); // 按照 article_Id 抓取文章
      if (!response.ok) throw new Error(`Error fetching post ${article_Id}`);

      const getPostRes = await response.json();
      if (!getPostRes?.data)
        throw new Error(`Post data for ${article_Id} is empty`);

      return getPostRes.data; // 返回每篇文章的信息
    });

    allPostList = await Promise.all(fetchPromises); // 等待所有文章抓取完畢
    displayPosts(); // 顯示文章
  } catch (error) {
    console.error("Error fetch deploy article list:", error);
    return { error: `Error fetch deploy article list: ${error}` };
  }
}

// 顯示當前頁面的文章
function displayPosts() {
  let postsHTML = "";

  if (!allPostList.length) {
    postsHTML = "No posts found for the specified domain.";
  } else {
    // 遍歷 allPostList 並生成每篇文章的 HTML
    allPostList.forEach((postInfo) => {
      const postDate = new Date(postInfo.updated_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

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
  }

  document.getElementById(replaceElementId).innerHTML = postsHTML;
}

// 初始化
document.addEventListener("DOMContentLoaded", async function () {
  // 拿取文章列表 ids by domain
  await getArticleIDsByDomain(); // 等待文章 IDs 被拿取完
  await fetchPosts(); // 等待文章抓取並顯示
});

// 定義異步函數 getArticleIDsByDomain
async function getArticleIDsByDomain() {
  try {
    let deployArticleList = [];
    const response = await fetch(`${baseApiUrl}/deploy-article`);
    if (!response.ok) throw new Error("Error fetching deploy article list");

    const getDeployArticleListRes = await response.json();
    if (!getDeployArticleListRes?.data?.length)
      throw new Error("deploy article data is empty");

    deployArticleList = getDeployArticleListRes.data;
    deployArticleList = deployArticleList.filter(
      (deployArticleInfo) => deployArticleInfo?.domain === domain
    );

    article_ids = deployArticleList.map(
      (deployArticleInfo) => deployArticleInfo.article_id
    );
  } catch (error) {
    console.error("Error fetch deploy article list:", error);
    return { error: `Error fetch deploy article list: ${error}` };
  }
}
