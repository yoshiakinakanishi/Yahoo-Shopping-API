// 総合ランキングページとカテゴリ別のページは、ほぼ同じ構成のページなので、どちらのページもRankingコンポーネントを表示するようにする
// props.categoryIdを受け取って表示するコンポーネントを定義する

import React from 'react';
import PropTypes from 'prop-types';

export default function Ranking({ categoryId }) {
    return (
        <div>
            <h2>Rankingコンポーネント</h2>
            <p>カテゴリーID：{categoryId}</p>
        </div>
    )
}

Ranking.propTypes = {
    categoryId: PropTypes.string
};

Ranking.defaultProps = {
    categoryId: '1' // 「categoryId=1」は総合ランキング
};