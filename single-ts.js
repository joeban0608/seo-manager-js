// script標籤會長這樣
//<script src="https://wows-ai.dev/single.js?replace_id=content&article_id=G0Ocebt06wrmou3L2SVm"></script>

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
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "__session=eyJhbGciOiJSUzI1NiIsImtpZCI6InVzQWVOQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9zZW8tbWFuYWdlci00Mjk3MDUiLCJhdWQiOiJzZW8tbWFuYWdlci00Mjk3MDUiLCJhdXRoX3RpbWUiOjE3MjkxNTU1MzYsInVzZXJfaWQiOiJDUTh0bjlZWGtZV2F0M215UjNvTFhSTmdnc1QyIiwic3ViIjoiQ1E4dG45WVhrWVdhdDNteVIzb0xYUk5nZ3NUMiIsImlhdCI6MTcyOTE1NTUzNywiZXhwIjoxNzI5MjQxOTM3LCJlbWFpbCI6ImRldkB3b3dzLmFpIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRldkB3b3dzLmFpIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gsypBZ1cESQJO6h6_QDt6PeiAqpf8eUhtEdMtmJGRyWVMbc0v0Zs3JgyuSOChnfu0Bp8C7XW_jTJvapwSwc8-fQXl_Atx3e6cirWZv4PkiGe738WK-jBV29rs8Co0JBQbhE9NM1I946CtHjN3Bm83-J6uGlf354cB2VGiZhLNnzsJxvFtDLZBJ9QYUwujTuifmIshcZLPPKKwtHzLsTw5cWXT4BsRiWRR-7jfQuulHXp3KX68z677_Hryb0tYuaJ1vhFXdfL3F0dQqvQ1L7lgSC1l4i5xf1nonnKBmGdnILTok24dknNEhBee5_uJWwJyUXfkzGlr_DeRlADy8j3MQ"
  );
  const requestOptions = {
    headers: myHeaders,
  };
  const api_url = "https://seo-manager.wows-ai.dev/api/article";
  const getPostInfo = async () => {
    if (!articleId) return { error: "article id is required" };
    url = `${api_url}?id=${articleId}`;
    try {
      const res = await fetch(url, requestOptions);
      const getPostInfoRes = await res.json();
      console.log("getPostInfoRes", getPostInfoRes);
      return getPostInfoRes.data;
    } catch (err) {
      console.error("get post error", err);
      return { error: `get post error: ${err?.message}` };
    }
  };
  const data = await getPostInfo();
  // 從API拿到的資料,透過articleId
  const fetchData = {
    id: "G0Ocebt06wrmou3L2SVm",
    title: "About chris",
    content:
      "# Hello, World! fuck you  This is a **Markdown** example.  - Item 1 - Item 2 - Item 3",
    created_at: 1728900483237,
    updated_at: 1728900483237,
    user_id: "CQ8tn9YXkYWat3myR3oLXRNggsT2",
  };

  const contentDiv = document.getElementById(replaceId);
  // 資料內容後續使用fetch取得firebase中的資料組成
  const message = `
    <div>
        <h2>${fetchData.title}</h2>
        <p>${fetchData.content}</p>\
    </div>
    `;

  // 將 HTML 內容插入到 content div 中
  contentDiv.innerHTML = message;
});
