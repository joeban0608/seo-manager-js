// script標籤會長這樣
//<script src="https://wows-ai.dev/single.js?replace_id=content&article_id=G0Ocebt06wrmou3L2SVm"></script>
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", async function () {
  // const script = document.currentScript;
  const script =
    document.currentScript || document.querySelector('script[src*="single"]');
  console.log("script", script);

  if (!script) {
    console.error("Script element not found.");
    return; // 提前返回以避免后续错误
  }

  console.log("script", script);
  const script_url = new URL(script.src);

  // 取得 URL 中的參數
  const replaceId = script_url.searchParams.get("replace_id");
  const articleId = script_url.searchParams.get("article_id");

  // 單頁資料結構,fetch by article id
  let url = "";

  const api_url = "https://seo-manager.wows-ai.dev/api/article";
  const getPostInfo = async () => {
    if (!articleId) return { error: "article id is required" };
    url = `${api_url}?id=${articleId}`;
    try {
      const res = await fetch(url);
      const getPostInfoRes = await res.json();
      console.log("getPostInfoRes", getPostInfoRes);
      return getPostInfoRes.data;
    } catch (err) {
      console.error("get post error", err);
      return { error: `get post error: ${err?.message}` };
    }
  };
  const resInfo = await getPostInfo();
  console.log("resInfo", resInfo);
  // 從API拿到的資料,透過articleId
  // const fetchData = {
  //   id: "G0Ocebt06wrmou3L2SVm",
  //   title: "About chris",
  //   content:
  //     "# Hello, World! fuck you  This is a **Markdown** example.  - Item 1 - Item 2 - Item 3",
  //   created_at: 1728900483237,
  //   updated_at: 1728900483237,
  //   user_id: "CQ8tn9YXkYWat3myR3oLXRNggsT2",
  // };

  const md2htmlContent = marked.parse(resInfo.content);
  // console.log("md2htmlContent", md2htmlContent);
  const contentDiv = document.getElementById(replaceId);
  // 資料內容後續使用fetch取得firebase中的資料組成;
  const message = `
    <div>
        <h2>${resInfo.title}</h2>
        <p>${md2htmlContent}</p>\
    </div>
    `;

  // 將 HTML 內容插入到 content div 中
  contentDiv.innerHTML = message;
});
