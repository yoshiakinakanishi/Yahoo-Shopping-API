// Rankingコンポーネントのprops.onMountとprops.onUpdateが呼び出された時に実行するfetchRanking関数を用意する
// (1)リクエスト開始　(2)レスポンス受信　(3)リクエスト完了のActionを生成するstartRequest、recieveData、finishRequestを定義する

// ランキングページに以下の３つの機能追加をおこなう
    // 1. state.shopping.categoriesに無いカテゴリIDへのアクセスは、トップページにリダイレクトさせる
    // 2. Rankingコンポーネントのタイトルを「カテゴリ名のランキング」と表示させる
    // 3. ランキング情報の表示

// 1と2は「state.shopping.categories」のデータ、3は「state.Ranking.ranking」のデータを使用
// actions/Ranking.jsに1と2の機能追加のために、ActionのpayloadにカテゴリIDに対応するstate.shopping.categoriesの要素を含むように修正


import fetchJsonp from 'fetch-jsonp';　// XMLHttpRequestの後継のfetch関数と同じインターフェースで、JSONPのAPIと通信できるライブラリ
import qs from 'qs';　// クエリ文字列を扱うライブラリ
import { replace } from 'react-router-redux'; // 追加　＊リダイレクトさせる役割

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const APP_ID = 'dj00aiZpPVJxOUZRS0RpQkRHQyZzPWNvbnN1bWVyc2VjcmV0Jng9MWQ-';　// 取得したアプリケーションID

// categoryIdからcategoryに変更する
// categoryをpayloadに含むように修正する

// (1)リクエスト開始
const startRequest = category => ({
    type: 'START_REQUEST',
    payload: { category },
});

// (2)レスポンス受信
const receiveData = (category, error, response) => ({ // errorとresponseを追加
    type: 'RECIEVE_DATA',
    payload: { category, error, response },
});

// (3)リクエスト完了
const finishRequest = category => ({
    type:'FINISH_REQUEST',
    payload: { category },
});

// ランキングを取得する
export const fetchRanking = categoryId => {
    
    // redux-thunkを使った非同期処理
    // getState関数でstate.shopping.categoriesにアクセスする
    return async (dispatch, getState) => {
        
        // カテゴリIDに対応するstate.shopping.categoriesの要素を取得
        const categories = getState().shopping.categories;
        const category = categories.find(category => (category.id === categoryId));

        // 対応するデータがない場合はトップへリダイレクト
        if (typeof category === 'undefined') {
            dispatch(replace('/'));
            return;
        }

        dispatch(startRequest(categoryId)); // categoryIdからcategoryに変更

        const queryString = qs.stringify({　// アプリケーションIDとカテゴリIDをJSON文字列に変換しておく
            appid: APP_ID,
            category_Id:categoryId,
        });

        try {
            const responce = await fetchJsonp(`${API_URL}?${queryString}`);
            const data = await responce.json();
            dispatch(receiveData(category, null, data));　// categoryIdからcategoryに変更
        } catch(err) {
            dispatch(receiveData(category, err));　// categoryIdからcategoryに変更
        }
        dispatch(finishRequest(category));　// categoryIdからcategoryに変更
    };
};