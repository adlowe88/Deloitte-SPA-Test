import React from 'react';
import '../css/index.scss';
import Header from './Header';
import SearchBar from './SearchBar';
import CardList from './CardList';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			pads: [],
			filters: {},
		};
	}

	handleFilteredData = value => {
		this.setState({ items: value.filteredList});
	}

	getItemData = value => {
		this.setState({ items: value.items });
	}

	getPadData = value => {
		this.setState({ pads: value.pads });
	}

	render() {
		return (
			<div className="App">
				<Header
					title="Discover Space Missions"
					subTitle="Space Savvy"
				/>
				<SearchBar
					handleFilters={this.handleFilteredData}
					getItemData={this.getItemData}
					getPadData={this.getPadData}
				/>
				<div className="app-card-container">
					<CardList
						items={this.state.items}
						pads={this.state.pads}
					/>
				</div>
			</div>
		);
	}
}

export default App;

