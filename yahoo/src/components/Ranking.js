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

        const { category, ranking, error } = this.props; // 追加

        return (
            <div>
                {/* 
                ↓↓↓　削除　↓↓↓
                <h2>Rankingコンポーネント</h2>
                <p>カテゴリーID：{this.props.categoryId}</p> 
            　　*/}

                {/* ランキングのタイトル　＊2の機能 */}
                <h2>{
                    typeof category !== 'undefined'
                    ? `${category.name}のランキング`
                    : ''
                }</h2>

                {(() => {
                    if (error) {
                    
                        // エラー表示
                        return <p>エラーが表示されました。リロードしてください。</p>;
                    
                    } else if (typeof ranking === 'undefined') {
                    
                        // リクエスト完了前
                        return <p>読み込み中...</p>;
                    
                    } else {
                    
                        // ランキングの表示　＊3の機能
                        return (
                            <ol>
                                {ranking.map(item => (
                                    <li key={`ranking-item-${item.code}`}>
                                        <img alt={item.name} src={item.imageUrl} />
                                        <a href={item.url} target="_blank">{item.name}</a>
                                    </li>
                                ))}
                            </ol>
                        );
                    }    
                })()}
            </div>
        );
    }
}


Ranking.propTypes = {
    categoryId: PropTypes.string.isRequired,
    onMount: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  
    // category, ranking, errorの型を追加
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    ranking: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ),
    error: PropTypes.bool.isRequired
  };
  Ranking.defaultProps = {
      categoryId: '1'
  };