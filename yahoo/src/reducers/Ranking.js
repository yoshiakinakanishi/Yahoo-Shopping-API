// 以下はYahooショッピングAPIのレスポンス構造
// ResultSet.totalResultsReturned  「レスポンスされた商品数」
// ResultSet["0"][N]  「N+1位の商品の情報」
// ResultSet["0"][N].Name  「N+1位の商品の商品名」
// ResultSet["0"][N].Code  「N+1位の商品の商品コード」
// ResultSet["0"][N].Url  「N+1位の商品のページURL」
// ResultSet["0"][N].Image.Small  「N+1位の商品の画像URL」

// actionsのSTART_REQUESTにフックして、リクエスト開始時に状態をリセット
// RECEIVE_DATAにフックして、レスポンスからランキング情報を取得し状態へ設定　＊リクエストが失敗している場合はエラーを出す
// getRanking関数は、レスポンスから商品名、商品URL、商品画像URLを抜き出している

// レスポンスからランキング情報のみを抜き出す
const getRanking = response => {
    const ranking = [];
    const itemLength = response.ResultSet.totalResultsReturned
    for (let index = 0; index < itemLength; index++) {
        const item = response.ResultSet['0'].Result[index + ''];
        ranking.push({
            code: item.Code,
            name: item.name,
            url: item.Url,
            imageUrl: item.Image.Medium
        })
    }
    return ranking;
};

// 初期状態
const initialState = {
    categoryId: undefined,
    ranking: undefined,
    error: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        // リクエスト開始時に状態をリセット
        case 'START_REQUEST':
            return {
                // categoryを状態に保持
                // categoryIdをcategoryに変更
                category: action.payload.category,
                ranking: undefined,
                error: false,
            }

        // データ受信
        case 'RECEIVE_DATA':
            return action.payload.error
            ? { ...state, error: true }
            : { ...state, ranking: getRanking(action.payload.response) };
        
        default:
            return state;
    }
}
