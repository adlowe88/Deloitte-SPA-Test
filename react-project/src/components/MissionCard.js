import React from 'react';
import PropTypes from 'prop-types';

export default class MissionCard extends React.Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		payloadId: PropTypes.string.isRequired,
		launchSiteName: PropTypes.string.isRequired,
		launchDate: PropTypes.string.isRequired,
		launchStatus: PropTypes.bool.isRequired,
		landStatus: PropTypes.bool.isRequired,
		flightNumber: PropTypes.number.isRequired,
		links: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			image: this.props.image,
			payloadId: this.props.payloadId,
			launchSiteName: this.props.launchSiteName,
			launchDate: this.props.launchDate,
			launchStatus: this.props.launchStatus,
			landStatus: this.props.landStatus,
			flightNumber: this.props.flightNumber,
			links: this.props.links,
			toggleLaunchPadDropdown: false,
			toggleMinYearDropdown: false,
			toggleMaxYearDropdown: false,
		};
	}

	render() {
		// Get full date string
		const dateFormatted = new Date(this.state.launchDate);
		const date = new Date(this.state.launchDate), options = { month: 'long', day: 'numeric', year: 'numeric' };
		const localeDate = date.toLocaleString('en-AU', options);
		const fullDateString = `${localeDate} at ${dateFormatted.getHours()}:${dateFormatted.getMinutes()}`;
		return (
			<div className="missionCard-container-outer">
				<div className="missionCard-container-inner">
					<div className="missionCard-image-container">
						<img className="missionCard-image" src={this.state.image} alt="rocket" />
					</div>
					<div className="missionCard-info-container">
						<div className="missionCard-info-heading-container">
							<span className="missionCard-info-heading-failed-span"><h3 className="missionCard-info-heading">{this.state.name} - {this.state.payloadId}</h3></span>
							{ !this.state.launchStatus && !this.state.landStatus &&
								<div className="missionCard-info-heading-failed-container">
									<span className="missionCard-info-heading-failed-span">- </span>
									<span className="missionCard-info-heading-failed-span">
										<h3 className="missionCard-info-heading-failed">Failed Mission</h3>
									</span>
								</div>
							}
						</div>
						<p className="missionCard-info-launch-date">
							<span className="missionCard-info-launch-date-span">Launched {fullDateString} </span><span className="missionCard-info-launch-date-span">from {this.state.launchSiteName}</span>
						</p>
						<div className="missionCard-buttons-container">
							<span className="missionCard-buttons-span">
								{ this.state.links.reddit_campaign &&
									<button className="missionCard-button" type="button">Reddit Campaign</button>
								}
								{ this.state.links.reddit_launch &&
									<button className="missionCard-button" type="button">Reddit Launch</button>
								}
							</span>
							<span className="missionCard-buttons-span">
								{ this.state.links.reddit_campaign &&
									<button className="missionCard-button" type="button">Article</button>
								}
								{ this.state.links.reddit_media &&
									<button className="missionCard-button" type="button">Reddit Media</button>
								}
							</span>
							<span className="missionCard-buttons-span">
								{ this.state.links.presskit &&
									<button className="missionCard-button" type="button">Press</button>
								}
								{ this.state.links.reddit_recovery &&
									<button className="missionCard-button" type="button">Reddit Recovery</button>
								}
								{ this.state.links.video_link &&
									<button type="button">Watch Video</button>
								}
							</span>
						</div>
					</div>

					<div className="missionCard-flightNumber-container">
						<h1 className="missionCard-flightNumber">#{this.state.flightNumber}</h1>
						<p className="missionCard-flightNumber-p"><span className="missionCard-flightNumber-span">Flight </span><span className="missionCard-flightNumber-span">Number</span></p>
					</div>
				</div>
				<hr className="missionCard-hr" />
			</div>
		);
	}
}
