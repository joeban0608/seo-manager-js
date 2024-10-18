// script標籤會長這樣
//<script src="https://storage.googleapis.com/seo-js/multiple.js?replace_id=content&domain=bonus365"></script>

document.addEventListener("DOMContentLoaded", function () {
    const script = document.currentScript;
    const url = new URL(script.src);

    // 取得 URL 中的參數
    const replaceId = url.searchParams.get('replace_id');
    const domain = url.searchParams.get('domain');


    // 單頁資料結構,fetch by domain
    // 從API拿到的資料,articleIds
    // fetch deploy-article 在自己 filter by domain，找出文章秀出 List
    const fetchData = [
        {
            "id": "G0Ocebt06wrmou3L2SVm",
            "title": "About chris",
            "cover": "https://firebasestorage.googleapis.com/v0/b/seo-manager-429705.appspot.com/o/images%2FCQ8tn9YXkYWat3myR3oLXRNggsT2%2F1729066841503_pig.jpeg?alt=media&token=dcf8f9c8-1c31-4955-9296-ebf8c5f7a812",
            "content": "# Hello, World! fuck you  This is a **Markdown** example.  - Item 1 - Item 2 - Item 3",
            "created_at": 1728900483237,
            "updated_at": 1728900483237,
            "user_id": "CQ8tn9YXkYWat3myR3oLXRNggsT2"
        },
        {
            "id": "twbwWsIykpmUKM57HXhW",
            "content": "# Hello, World!  This is a **Markdown** example.  - Item 1 - Item 2 - Item 3",
            "created_at": 1728899633949,
            "user_id": "CQ8tn9YXkYWat3myR3oLXRNggsT2",
            "updated_at": 1728899818384,
            "title": "chris",
            "cover":"https://firebasestorage.googleapis.com/v0/b/seo-manager-429705.appspot.com/o/images%2FCQ8tn9YXkYWat3myR3oLXRNggsT2%2F1729066841503_pig.jpeg?alt=media&token=dcf8f9c8-1c31-4955-9296-ebf8c5f7a812"
        }
    ];
    
    const contentDiv = document.getElementById(replaceId);
    let message = "<ul>";
    // 資料內容後續使用fetch取得firebase中的資料組成
    fetchData.forEach(item => {

        message += 
        `
            <img src="${item.cover}">
            <li>${item.title}</li>
        `;
    })

    message += "</ul>"

    // 將 HTML 內容插入到 content div 中
    contentDiv.innerHTML = message;
});

