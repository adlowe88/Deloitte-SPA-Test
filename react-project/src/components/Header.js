import React from 'react';
import PropTypes from 'prop-types';
import chevron from '../assets/down-chevron.svg';


export default class Header extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		subTitle: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			subTitle: '',
		};
	}

	_handleDownChevron = () => {
		console.log('Handled down chevron!');
	}

	render() {
		return (
			<div className="header-container">
				<div className="header-image header-image--darken" alt="Discover Space Missions">
					<div className="header-image-title-outer"><h1>{this.props.title}</h1></div>
					<div className="header-image-subTitle-outer"><h1> {this.props.subTitle} </h1></div>
					<span className="header-chevron-outer" onClick={this._handleDownChevron} role="presentation"><img src={chevron} className="header-chevron-icon" alt="chevron down" /></span>
				</div>
			</div>
		);
	}
}
