import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export default class SearchBar extends React.Component {
	static propTypes = {
		getItemData: PropTypes.func.isRequired,
		getPadData: PropTypes.func.isRequired,
		handleFilters: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			pads: [],
			filteredItems: [],
			keywordFilter: '',
			launchPadFilter: '',
			minYearFilter: '',
			maxYearFilter: '',
		};
	}

	_handleSubmit = event => {
		event.preventDefault();
		// Set filter vars
		const keywordFilter = event.target.getElementsByClassName('searchBar-input-keyWord-inner')[0].value;
		const launchPadFilter = event.target.getElementsByClassName('searchBar-input-launchPad-inner')[0].value;
		const minYearFilter = event.target.getElementsByClassName('searchBar-input-minYear-inner')[0].value;
		const maxYearFilter = event.target.getElementsByClassName('searchBar-input-maxYear-inner')[0].value;

		// Save filters
		this.setState({
			keywordFilter,
			launchPadFilter,
			minYearFilter,
			maxYearFilter,
		}, () => this.getFilteredData(),
		);

		// Clear input fields
		event.target.reset();
	}

	getFilteredData = () => {
		// Set vars
		const items = this.state.items;
		const pads = this.state.pads;
		const results = [];
		const keywordFilter = this.state.keywordFilter;
		const launchPadFilter = this.state.launchPadFilter;
		const maxYearFilter = this.state.maxYearFilter;
		const minYearFilter = this.state.minYearFilter;

		if (keywordFilter) { // can't be null
			const flightNumberResults = items.filter(x => x.flight_number.toString().indexOf(keywordFilter) !== -1);
			const rocketNameResults = items.filter(x => x.rocket.rocket_name.indexOf(keywordFilter) !== -1);
			const payloadIdResults = items.filter(x => x.payloads[0].payload_id.indexOf(keywordFilter) !== -1);
			const newArr = results.concat(flightNumberResults).concat(rocketNameResults).concat(payloadIdResults);
			results.push(newArr);
		}

		if (launchPadFilter) {
			const temp = pads.filter(x => x.full_name === launchPadFilter);
			const searchExpr = temp[0].id;
			results.push(items.filter(x => x.launch_site.site_id.indexOf(searchExpr) !== -1));
		}

		if (minYearFilter) {
			for (let i = 0; i < items.length; i++) {
				const date = +items[i].launch_date_local.slice(0, 4);
				if (date >= +minYearFilter) {
					results.push(items[i]);
				}
			}
		}

		if (maxYearFilter) {
			for (let i = 0; i < items.length; i++) {
				const date = +items[i].launch_date_local.slice(0, 4);
				if (date <= +maxYearFilter) {
					results.push(items[i]);
				}
			}
		}

		this.setState({ filteredItems: results.flat()});
		const filteredList =  results.flat();
		this.props.handleFilters({filteredList});
	};

	createLaunchPadDropDown = () => {
		const dropDownItems = [];
		const pads = this.state.pads;

		// Default 'Any'
		dropDownItems.push(<option key="0" value="">Any</option>);

		// Get all launch pad names
		for (let i = 0; i < pads.length; i++) {
			dropDownItems.push(<option key={i + 1}>{pads[i].full_name}</option>);
		}
		return dropDownItems;
	}

	createMinMaxYearDropDowns = () => {
		const dropDownItems = [];
		const items = this.state.items;
		const yearsArr = [];

		// Default 'Any'
		dropDownItems.push(<option key="0" value="">Any</option>);

		// Get all launch years
		for (let i = 0; i < items.length; i++) {
			const year = items[i].launch_date_local.slice(0, 4);
			yearsArr.push(year);
		}

		// Remove duplicate years
		const uniqueYears = [...new Set(yearsArr)];
		console.log(uniqueYears);
		for (let i = 0; i < uniqueYears.length; i++) {
			dropDownItems.push(<option key={i + 1}>{uniqueYears[i]}</option>);
		}

		return dropDownItems;
	}

	componentDidMount() {
		axios.get('http://localhost:8001/launches')
			.then(res => {
				const items = res.data;
				// Send full item list to App
				this.props.getItemData({ items });
				this.setState({ items });
			});

		axios.get('http://localhost:8001/launchpads')
			.then(res => {
				const pads = res.data;
				this.props.getPadData({ pads });
				this.setState({ pads });
			});
	}


	render() {
		return (
			<div className="searchBar-container">
				<form className="searchBar-form" onSubmit={this._handleSubmit}>
					<div className="searchBar-form-keyWord-input-container">
						<h3>Keywords</h3>
						<input className="searchBar-input-keyWord-inner" placeholder="eg. Falcon" onChange={this._handleChangeKeyword} />
					</div>
					<div className="searchBar-form-launchpad-input-container">
						<h3>Launch Pad</h3>
						<select className="searchBar-input-launchPad-inner searchBar-form-launchPad-select" name="Launch pad select" > { this.createLaunchPadDropDown() } </select>
					</div>
					<div className="searchBar-form-minYear-input-container">
						<h3>Min Year</h3>
						<select className="searchBar-input-minYear-inner searchBar-form-minYear-select" name="Min year select" > { this.createMinMaxYearDropDowns() } </select>
					</div>
					<div className="searchBar-form-maxYear-input-container">
						<h3>Max Year</h3>
						<select className="searchBar-input-maxYear-inner searchBar-form-maxYear-select" name="Max year select" > { this.createMinMaxYearDropDowns() } </select>
					</div>
					<div className="searchBar-form-submit-container">
						<input className="searchBar-form-submit-button" type="submit" value="Apply" />
					</div>
				</form>
			</div>
		);
	}
}
