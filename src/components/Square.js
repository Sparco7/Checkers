import React from 'react';
import './checkers.css';

class Square extends React.Component {

			state = {
				tried_color: ''
			}
			
			selected = () => {
				console.log(this.props.setPose)
				this.props.setPose([this.props.rows,this.props.i], this.props.square);	
				// console.log('this.props.square: ', this.props.square)
			}


		
			render() {

				let redPiece = null;
				let bluePiece = null;
				let color = 'cell';
				
				// Creating 2Colored Board
				if ((!(this.props.rows % 2) && !(this.props.i % 2 )) || (this.props.rows % 2) && (this.props.i % 2 )) {
					color += ' green-square';
				} else {
					color += ' white-square';
				}
				switch (this.props.board[this.props.rows][this.props.i]) {
					case 'BL': 
						bluePiece = true
						break;
					case 'RD':
						redPiece = true
						break;
					case null:
						break;	
					default:
						return;			 
				}

				
				return (
					<div>
						{  !(this.props.rows) &&
							<div className="col-numbers">{this.props.rows + this.props.i}</div>
						}
						
						<div className={color}  onClick={() => {this.selected()}}>
							<div className={this.state.tried_color}>
							{ 
								redPiece ? <div className="red-piece">
									<div className="red-circle"></div>
								</div> : ""
							}
							{
								bluePiece ? <div className="blue-piece">
									<div className="blue-circle"></div>
								</div> : ""
							}
							</div>
						</div>	
					</div>
				);
			}
		
}

export default Square;