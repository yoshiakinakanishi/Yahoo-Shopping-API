// src/actions/Ranking.js
import fetchJsonp from 'fetch-jsonp'; // XMLHttpRequestの後継のfetch関数と同じJSONPのAPIと通信できるライブラリ
import qs from 'qs';　// クエリ文字列を扱うライブラリ
import { replace } from 'react-router-redux'; // 追加

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const APP_ID = 'dj00aiZpPVJxOUZRS0RpQkRHQyZzPWNvbnN1bWVyc2VjcmV0Jng9MWQ-';　// 取得したアプリケーションID

// categoryをpayloadに含むように修正
const startRequest = category => ({
  type: 'START_REQUEST',
  payload: { category },
});
const receiveData = (category, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { category, error, response },
});
const finishRequest = category => ({
  type: 'FINISH_REQUEST',
  payload: { category },
});

// ランキングを取得する
export const fetchRanking = categoryId => {
  // getState関数でstate.shopping.categoriesにアクセスする
  return async (dispatch, getState) => {
    // カテゴリIDに対応するstate.shopping.categoriesの要素を取得
    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));
    // 対応するデータがない場合はトップページへリダイレクト
    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(category)); // categoryIdからcategoryに変更

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });
    try {
      const responce = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await responce.json();
      dispatch(receiveData(category, null, data)); // categoryIdからcategoryに変更
    } catch (err) {
      dispatch(receiveData(category, err)); // categoryIdからcategoryに変更
    }
    // categoryIdからcategoryに変更
    dispatch(finishRequest(category));
  };
};
