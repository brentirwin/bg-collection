import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const style = {
	width: 400,
	maxWidth: '80%',
	marginLeft: 10,
	marginRight: 10
};

export class Filters extends React.Component {
	render() {
		return (
			<div className="filters">
				<Filter
					name="# of players"
					id="numPlayers"
					currentValue={this.props.numPlayers}
					min={1}
					max={10}
					defaultValue={5}
					step={1}
					handleChange={this.props.handleNumPlayersChange}
					handleCheck={this.props.handleCheck}
					filter={this.props.filter}
				/>
				<Filter
					name="Playtime (min)"
					id="playTime"
					currentValue={this.props.playTime}
					min={0}
					max={120}
					defaultValue={30}
					step={15}
					handleChange={this.props.handlePlayTimeChange}
					handleCheck={this.props.handleCheck}
					filter={this.props.filter}
				/>
			</div>
		);
	}
}

const Filter = props => {
	return (
		<div style={style}>
			<div className="filter-label">
				<input
					name={props.id}
					type="checkbox"
					checked={props.filter[props.id]}
					onChange={(e) => props.handleCheck(e)}
				/>
				{props.name}: {props.currentValue.string}
			</div>
			<Slider
				min={props.min}
				max={props.max}
				defaultValue={props.defaultValue}
				step={props.step}
				onChange={props.handleChange}
			/>
		</div>
	);
}