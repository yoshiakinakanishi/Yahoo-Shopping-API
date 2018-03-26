// ページルーティングの導入
// react-router-dom & history & react-router-redux@next
// @nextを入れないと最新バージョンがインストールできないので注意
// react-router-reduxを導入すると、ReduxのStoreを生成する処理が複雑になるので切り出しておく

import {
    // 名前が被るため別名(reduxCreateStore)にしてインポートする
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; // 追加
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            ...reducers,
            // react-router-reduxのReducer
            // combineReducersにrouterReducerを追加すると、ルーティングの状態をReduxに同期できる
            router: routerReducer,
        }),
        applyMiddleware(
            logger,
            thunk, // 追加
            // react-router-reduxのRedux Middleware
            // routerMiddlewareをReduxのapplyMiddlewareに追加すると、ReduxのActionとしてページルーティングの制御ができる    
            routerMiddleware(history),
        )
    );
}