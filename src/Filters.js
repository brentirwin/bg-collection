import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { defaults } from './defaults.js';

const style = {
	width: 300,
	maxWidth: '80%',
	marginLeft: 10,
	marginRight: 10
};

export class Filters extends React.Component {
	render() {
		const numPlayersStr = (this.props.numPlayers === 10)
												? '10+' : this.props.numPlayers.toString();
		const playTimeStr = this.props.playTime.map(num => {
			return (num === 0) ? '<15'
					 : (num === 120) ? '120+'
					 : num.toString();
		});
		const complexity = this.props.complexity.map(num => num.toString());

		return (
			<div className="filters">
				<FilterSlider
					name="# of players"
					id="numPlayers"
					currentValue={numPlayersStr}
					min={1}
					max={10}
					defaultValue={defaults.numPlayers}
					step={1}
					handleChange={this.props.handleNumPlayersChange}
					handleCheck={this.props.handleCheck}
					filter={this.props.filter}
				/>
				<FilterRange
					name="Playtime (min)"
					id="playTime"
					currentValue={playTimeStr}
					min={0}
					max={120}
					defaultValue={defaults.playTime}
					step={15}
					handleChange={this.props.handlePlayTimeChange}
					handleCheck={this.props.handleCheck}
					filter={this.props.filter}
				/>
			<FilterRange
					name="Complexity"
					id="complexity"
					currentValue={complexity}
					min={0}
					max={5}
					defaultValue={defaults.complexity}
					step={0.5}
					handleChange={this.props.handleComplexityChange}
					handleCheck={this.props.handleCheck}
					filter={this.props.filter}
				/>
			</div>
		);
	}
}

const FilterSlider = props => {
	return (
		<div style={style}>
			<div className="filter-label">
				<input
					name={props.id}
					type="checkbox"
					checked={props.filter[props.id]}
					onChange={(e) => props.handleCheck(e)}
				/>
				{props.name}: {props.currentValue}
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

const FilterRange = props => {
	return (
		<div style={style}>
			<div className="filter-label">
				<input
					name={props.id}
					type="checkbox"
					checked={props.filter[props.id]}
					onChange={(e) => props.handleCheck(e)}
				/>
				{props.name}: {props.currentValue[0]} - {props.currentValue[1]}
			</div>
			<Range
				min={props.min}
				max={props.max}
				defaultValue={props.defaultValue}
				step={props.step}
				allowCross={false}
				onChange={props.handleChange}
			/>
		</div>
	);
}