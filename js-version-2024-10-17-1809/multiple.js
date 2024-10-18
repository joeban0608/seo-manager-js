// script標籤會長這樣
//<script src="https://wows-ai.dev/multiple.js?replace_id=content&article_ids=G0Ocebt06wrmou3L2SVm,twbwWsIykpmUKM57HXhW"></script>
// 
document.addEventListener("DOMContentLoaded", function () {
  const script = document.currentScript;
  const url = new URL(script.src);

  // 取得 URL 中的參數
  const replaceId = url.searchParams.get("replace_id");
  const articleIds = url.searchParams.get("article_id");

  // 單頁資料結構,fetch by article ids
  // 從API拿到的資料,articleIds
  const fetchData = [
    {
      id: "G0Ocebt06wrmou3L2SVm",
      title: "About chris",
      content:
        "# Hello, World! fuck you  This is a **Markdown** example.  - Item 1 - Item 2 - Item 3",
      created_at: 1728900483237,
      updated_at: 1728900483237,
      user_id: "CQ8tn9YXkYWat3myR3oLXRNggsT2",
    },
    {
      id: "twbwWsIykpmUKM57HXhW",
      content:
        "# Hello, World!  This is a **Markdown** example.  - Item 1 - Item 2 - Item 3",
      created_at: 1728899633949,
      user_id: "CQ8tn9YXkYWat3myR3oLXRNggsT2",
      updated_at: 1728899818384,
      title: "chris",
    },
  ];

  const contentDiv = document.getElementById(replaceId);
  let message = "";
  // 資料內容後續使用fetch取得firebase中的資料組成
  fetchData.forEach((item) => {
    message += `
        <div>
            <h2>${item.title}</h2>
            <p>${item.content}</p>\
        </div>
        `;
  });

  // 將 HTML 內容插入到 content div 中
  contentDiv.innerHTML = message;
});
