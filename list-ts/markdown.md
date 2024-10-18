# list.js 的引用方式：
- https://storage.googleapis.com/seo-js/list.js?replace_id=list&domain=bonus365hulaan.win
  - replace_id 要取代的區塊 id，對應 html 上顯示的區塊
  - domain 查詢 domain 有哪些文章
  - 對應 seo-manager deploy-article api
  - get method: https://seo-manager.wows-ai.dev/api/deploy-article
    - 再自己 filter by domain，找出文章秀出 List
    - 無分頁功能，列出全部。