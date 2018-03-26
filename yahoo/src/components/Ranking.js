// 総合ランキングページとカテゴリ別のページはほぼ同じ構成
// Rankingコンポーネントで両方を表示できるようにする
// props.categoryIdを受け取って表示するコンポーネントを定義する
// RankingコンポーネントからActionを呼び出す
// ページに遷移したタイミングでデータを取得したいので、RankingコンポーネントのcomponentWillMountにフックしてActionを呼び出す
// componentWillReceivePropsでカテゴリIDに変更があった場合にも、Actionを呼び出すようにする
// 理由は総合ランキングからカテゴリページに遷移する場合、Rankingコンポーネントは表示されたままで、componentWillMountが実行されないため
// componentWillMount時にはprops.onMount、componentWillReceiveProps時にはprops.onUpdateを使用
// ライフサイクルメソッドを利用するのでFunctional ComponentをClass Componentに書き換える

import React from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends React.Component {

    // マウント（＝新たにReactコンポーネントが配置される）に関するライフサイクルメソッド
    componentWillMount() {
        this.props.onMount(this.props.categoryId);
    }

    // データのアップデートに関するライフサイクルメソッド
    // 引数として受け取ったnextPropsと、this.propsを比較して処理が可能
    // props.categoryIdに変化があるので、ページ遷移が発生している
    componentWillReceiveProps(nextProps) {
        if (this.props.categoryId !== nextProps.categoryId) {
            this.props.onUpdate(nextProps.categoryId);
        }
    }

    render() {
        return (
            <div>
                <h2>Rankingコンポーネント</h2>
                <p>カテゴリーID：{this.props.categoryId}</p>
            </div>
        );
    }
}


Ranking.propTypes = {
    categoryId: PropTypes.string,
    onMount: PropTypes.func.isRequired,  // 追加
    onUpdate: PropTypes.func.isRequired　// 追加
};

Ranking.defaultProps = {
    categoryId: '1' // 「categoryId=1」は総合ランキング
};