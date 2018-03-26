// 各カテゴリランキングのRouteコンポーネントのprops.pathは"/category/:id"を設定して、match.params.idでURLに含まれるカテゴリIDが取得できるようにする
// props.componentではなく、props.renderを使うことで、Rankingコンポーネントに最低限必要な値＝カテゴリIDのみを渡すようにしている

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Ranking from './components/Ranking'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li><Link to="/all">すべてのカテゴリ</Link></li>
          <li><Link to="/category/2502">パソコン、周辺機器</Link></li>
          <li><Link to="/category/10002">本、雑誌、コミック</Link></li>          
        </ul>

        {/* 総合ランキングのルート */}
        <Route path = "/all" component={Ranking} />　

        {/* 各カテゴリのランキングルート */}
        <Route 
          path = "/category/:id" 
          render={
            ({match}) => <Ranking categoryId={match.params.id} />  
          }
        />
      </div>
    );
  }
}

export default App;
