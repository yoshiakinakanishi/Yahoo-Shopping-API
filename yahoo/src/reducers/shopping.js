const initialState = {
    // カテゴリ情報
    // 本来はカテゴリID取得APIで取得すべき

    categories: [
        {
            id: '1',
            name: 'すべてのカテゴリ'
        },
        {
            id: '2502',
            name: 'パソコン関連'
        },
        {
            id: '10002',
            name: '本、雑誌、コミック'
        },        
    ]
};

export default () => initialState;