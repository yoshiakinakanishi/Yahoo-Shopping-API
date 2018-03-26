// App.jsの各ランキングページへのリンクをNavコンポーネントに切り出す

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Nav ({ categories }) {
    
    // 遷移先パスの生成
    // カテゴリIDが1の場合は/all
    // それ以外は/category/カテゴリID
    const to = category => (
        category.id === '1'
        ? '/all'
        : `/category/${ category.id }`
    );

    /*
    props.categoriesからリンク一覧を生成
    <ul>
        <li><Link to="/all">すべてのカテゴリ</Link></li>
        <li><Link to="/category/2502">パソコン、周辺機器</Link></li>
        <li><Link to="/category/10002">本、雑誌、コミック</Link></li>          
    </ul>
    */
    return (
        <ul>
            {categories.map(category => (
                <li key={`nav-item-${category.id}`}>
                    <Link to={to(category)}>
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

Nav.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};
