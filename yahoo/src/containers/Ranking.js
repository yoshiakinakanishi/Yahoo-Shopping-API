import { connect } from 'react-redux';
import Ranking from '../components/Ranking';
import * as actions from '../actions/Ranking'; // actionsでexportしているfetchRankingをインポート

// Reducersを定義するまでの仮実装
const mapStateToProps = (state, ownProps) => ({
    categoryId: ownProps.categoryId
})

const mapDispatchToProps = dispatch => ({
    // onMountとonUpdateをfetchRankingに接続
    onMount (categoryId) {
        dispatch(actions.fetchRanking(categoryId));
    },
    onUpdate (categoryId) {
        dispatch(actions.fetchRanking(categoryId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);