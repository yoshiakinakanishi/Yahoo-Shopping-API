// Routeコンポーネントのprops.pathで/category/:idを設定して、match.params.idでURLに含まれるカテゴリIDが取得できるようにする
// props.componentではなく、props.renderを使うことで、Rankingコンポーネントに最低限必要な値＝カテゴリIDのみを渡すようする

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // Switchを追加
// import Ranking from './components/Ranking';　// 削除
import Ranking from './containers/Ranking'; // 追加
import Nav from './containers/Nav'; // 追加

class App extends Component {
  render() {
    return (
      <div className="App">
		
		{/* 追加 */}
		<Nav />
		
		{/*
		↓↓↓　削除　↓↓↓
		<ul>
			<li><Link to="/all">すべてのカテゴリ</Link></li>
			<li><Link to="/category/2502">パソコン、周辺機器</Link></li>
			<li><Link to="/category/10002">本、雑誌、コミック</Link></li>          
		</ul>
		*/}

		<Switch>
			{/* 総合ランキングのルート */}
			<Route path = "/all" component={Ranking} />

			<Route
				path="/category/1"
				render={
					() => <Redirect to="/all" />
				}
			/>

			{/* 各カテゴリのランキングルート */}
			<Route 
				path = "/category/:id" 
				render={
					({ match }) => <Ranking categoryId={match.params.id} />  
				}
			/>
		</Switch>

      </div>
    );
  }
}

export default App;
