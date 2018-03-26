// ページルーティングの導入
// react-router-dom & history & react-router-redux@next
// @nextを入れないと最新バージョンがインストールできないので注意
// react-router-reduxを導入すると、ReduxのStoreを生成する処理が複雑になるので切り出しておく

import {
    // 名前が被るので別名でインポート
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            ...reducers,
            // react-router-reduxのReducer
            router: routerReducer,　//combineReducersにrouterReducerを追加すると、ルーティングの状態をReduxに同期できる
        }),
        applyMiddleware(
            logger,
            // react-router-reduxのRedux Middleware
            routerMiddleware(history)　//routerMiddlewareをRedux Middlewareに追加すると、ReduxのActionとしてページルーティングの制御ができる
        )
    );
}