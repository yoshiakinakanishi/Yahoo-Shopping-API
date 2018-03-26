import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'; // 追加
import createBrowserHistory from 'history/createBrowserHistory'; // 追加
import App from './App';
// import * as reducers from './reducers';
import createStore from './createStore'; // 追加


// historyのインスタンス生成
const history = createBrowserHistory();

// Storeの生成
const store = createStore(history);

// ConnectedRouterコンポーネントでAppコンポーネントを覆う
ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history = {history}>      
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);