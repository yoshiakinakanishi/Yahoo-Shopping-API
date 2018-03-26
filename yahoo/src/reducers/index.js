// 何もしないReducer
// stateを受け取ってstateを返す
// export const noop = (state = {}) => state;

// 2つのReducerへの参照
// これでStoreの状態にデータが溜まる
export { default as shopping } from './shopping';
export { default as Ranking } from './Ranking';
