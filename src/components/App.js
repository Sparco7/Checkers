import React from 'react';
import Board from './Board';
import './checkers.css';

class App extends React.Component {
	render() {
		return (
			<div className="container col-sm-12  col-md-12">
				<div className="row">
					<div>
						<h1>Checkers</h1>
					</div>
				</div>
					<div>
						<Board />
					</div>
			</div>
		)
	}

}

export default App;