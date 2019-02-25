import React, { Component } from 'react';
import { connect } from 'react-redux';
import Location from './Location';

class LocationList extends Component {
    render() {
        const { locationIndex } = this.props;
        return (
            <ul className="list-group">
                {locationIndex.map((id) => {
                    return <Location key={id} id={id}/>;
                })}
            </ul>
        );
    }
}

const mapStateToProps = state => state.route;
const mapDispatchToProps = null;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationList);