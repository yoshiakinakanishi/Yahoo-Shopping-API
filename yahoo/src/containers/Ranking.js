import { connect } from 'react-redux';
import Ranking from '../components/Ranking';
import * as actions from '../actions/Ranking'; // actionsでexportしているfetchRankingをインポート

// Reducersを定義するまでの仮実装
const mapStateToProps = (state, ownProps) => ({
    categoryId: ownProps.categoryId,

    // カテゴリ情報（IDと名前）とラインキング情報をRankingコンポーネントに渡す
    category: state.Ranking.category,
    ranking: state.Ranking.ranking,
    error: state.Ranking.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onMountとonUpdateをfetchRankingに接続
    onMount (categoryId) {
        dispatch(actions.fetchRanking(categoryId));
    },
    onUpdate (categoryId) {
        dispatch(actions.fetchRanking(categoryId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);