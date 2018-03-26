// Rankingコンポーネントのprops.onMount、props.onUpdateが呼び出された時に実行するfetchRanking関数を用意する
// (1)リクエスト開始、(2)レスポンス受信、(3)リクエスト完了のActionを生成するstartRequest、recieveData、finishRequestを各々定義する

import fetchJsonp from 'fetch-jsonp';　// XMLHttpRequestの後継のfetch関数と同じインターフェースで、JSONPのAPIと通信できるライブラリ
import qs from 'qs';　// クエリ文字列を扱うライブラリ

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const APP_ID = 'dj00aiZpPVJxOUZRS0RpQkRHQyZzPWNvbnN1bWVyc2VjcmV0Jng9MWQ-';　// 取得したアプリケーションID

// (1)リクエスト開始
const startRequest = categoryId => ({
    type: 'START_REQUEST',
    payload: { categoryId },
});

// (2)レスポンス受信
const receiveData = categoryId => ({
    type: 'RECIEVE_DATA',
    payload: { categoryId },
});

// (3)リクエスト完了
const finishRequest = categoryId => ({
    type:'FINISH_REQUEST',
    payload: { categoryId },
});

// ランキングを取得する
export const fetchRanking = categoryId => {
    // redux-thunkを使った非同期処理
    return async dispatch => {
        dispatch(startRequest(categoryId));

        const queryString = qs.stringify({　// アプリケーションIDとカテゴリIDをJSON文字列に変換しておく
            appid: APP_ID,
            category_Id:categoryId,
        });

        try {
            const responce = await fetchJsonp(`${API_URL}?${queryString}`);
            const data = await responce.json();
            dispatch(receiveData(categoryId, null, data));
        } catch(err) {
            dispatch(receiveData(categoryId, err));
        }
        dispatch(finishRequest(categoryId));
    };
};