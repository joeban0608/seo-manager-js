# seo-manager-js

- for seo-manager webflow 遷入文章使用

---

## list.js 的引用方式：

- https://storage.googleapis.com/seo-js/list.js?replace_id=blog-posts&domain=masaya365tayataya.win
- replace_id 要取代的區塊 id，對應 html 上顯示的區塊
- domain 查詢 domain 有哪些文章
- 對應 seo-manager deploy-article api
- get method: https://seo-manager.wows-ai.dev/api/deploy-article
  - 再自己 filter by domain，找出文章秀出 List
  - 無分頁功能，列出全部。
- filter by domain-article-list 之後，重新組合 article_id 為 [] => [id1, id2, ...]
- 再 fetch 每一篇文章渲染畫面

---

## multiple.js 的引用方式：

- https://storage.googleapis.com/seo-js/multiple-script.js?replace_id=blog-posts&article_ids=pr14QyolSnRKIkFHG9uV,nKNAEuwsJklwkuYWKuEb
- replace_id 要取代的區塊 id，對應 html 上顯示的區塊
- article_ids 要顯示的文章 id，對應 seo-manager 後台的文章，有幾個 ids，就會動態從後台產生 .html
- 目前只支援一個.html 檔案只能放一個 multiple 區塊
- 對應 https://seo-manager.wows-ai.dev/api/article?id={id}

---

## single.js 的引用方式：

- https://storage.googleapis.com/seo-js/single.js?replace_id=blog-posts&article_id=pr14QyolSnRKIkFHG9uV
- replace_id 要取代的區塊 id，對應 html 上顯示的區塊
- article_id 要顯示的文章 id，對應 seo-manager 後台
- 對應 https://seo-manager.wows-ai.dev/api/article?id={id}
