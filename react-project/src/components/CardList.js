import React from 'react';
import PropTypes from 'prop-types';
import MissionCard from './MissionCard';

export default class CardList extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		pads: PropTypes.array.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false, // TODO: add loader
			currentPage: 1,
			itemsPerPage: 5,
		};
	}

	render() {
		// Assign vars
		const { currentPage, itemsPerPage } = this.state;
		const items = this.props.items;
		const pads = this.props.pads;

		// For pagination of results
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

		// Render Cards
		const renderItems = currentItems.map((item, index) => {
			// Account for items that have no launch/land success
			const launchStatus = 	(item.launch_success) ? item.launch_success : false;
			const landStatus = 	(item.land_status) ? item.launch_success : false;
			const itemSiteId = item.launch_site.site_id;
			const launchPad = pads.find(item => item.id === itemSiteId);

			return (
				<MissionCard
					key={item.flight_number}
					name={item.rocket.rocket_name}
					image={item.links.mission_patch}
					payloadId={item.payloads[0].payload_id}
					launchSiteName={launchPad.full_name}
					launchDate={item.launch_date_local}
					launchStatus={launchStatus}
					landStatus={landStatus}
					flightNumber={item.flight_number}
					links={item.links}
				/>
			);
		});

		return (
			<div className="cardList-container">
				<header className="cardList-header">
					Showing {currentItems.length} Missions
				</header>
				<div className="cardList-items">
					{renderItems}
					<hr />
				</div>
				{ currentItems.length === 0 &&
				<h1 className="cardList-error-loading">No listing data to display...</h1>
				}
			</div>
		);
	}
}
