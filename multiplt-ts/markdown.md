# multiple.js 的引用方式：
- https://storage.googleapis.com/seo-js/multiple-script.js?replace_id=blog-posts&article_ids=pr14QyolSnRKIkFHG9uV,nKNAEuwsJklwkuYWKuEb
  - replace_id 要取代的區塊 id，對應 html 上顯示的區塊
  - article_ids 要顯示的文章 id，對應 seo-manager 後台的文章，有幾個 ids，就會動態從後台產生 .html
  - 目前只支援一個.html 檔案只能放一個 multiple 區塊
  - 對應 https://seo-manager.wows-ai.dev/api/article?id={id}