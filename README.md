# Yahoo shopping api

# API仕様
- appid 
```dj00aiZpPVJxOUZRS0RpQkRHQyZzPWNvbnN1bWVyc2VjcmV0Jng9MWQ-```
- category_id
取得するランキングのカテゴリIDで、13457はファッション、2502はパソコン関連、未指定や1の場合は総合ランキングを返す
- Postmanで返り値を確認する
```https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking?appid=dj00aiZpPVJxOUZRS0RpQkRHQyZzPWNvbnN1bWVyc2VjcmV0Jng9MWQ-&category_id=13457&callback=jsonpCallback"```
