import React, { Component } from 'react';
import './Map.css';
import { Map as YandexMap, Placemark, Polyline } from 'react-yandex-maps';
import { connect } from 'react-redux';
import { updateLocation, setNewLocationPoint } from '../redux/actions';

const ROUTE_COLOR = '#CD5C5C';

class Map extends Component {
    
    getPlacemarks() {
        const { locationList, locationIndex, onPlacemarkMove } = this.props;
        return locationIndex.map(id => {
            const location = locationList[id];
            return <Placemark
                key={id}
                defaultGeometry={[location.lat, location.lng]}
                properties={{
                    balloonContentBody: location.name,
                }}
                options={{
                    iconColor: ROUTE_COLOR,
                    draggable: true,
                }}
                onDrag={(event) => onPlacemarkMove(event, id)}
            />
        });
    }

    getPath() {
        const { locationList, locationIndex } = this.props;
        if (!locationIndex.length) {
            return null;
        }
        const points = locationIndex.map(id => ([locationList[id].lat, locationList[id].lng]));
        return <Polyline
            geometry={points}
            options={{
                balloonCloseButton: false,
                strokeColor: ROUTE_COLOR,
                strokeWidth: 4,
                strokeOpacity: 0.5,
            }}
        />
    }

    render() {
        const { onMapMove, newLocation } = this.props;
        return (
            <div className="Map card">
                <YandexMap 
                    className="p-3 w-100 h-100" 
                    defaultState={{ 
                        center: [newLocation.lat, newLocation.lng], 
                        zoom: 10,
                        controls: ['zoomControl'],
                    }}
                    modules={['control.ZoomControl', 'geoObject.addon.balloon']}
                    onActionEnd={onMapMove}
                >
                    {this.getPlacemarks()}
                    {this.getPath()}
                </YandexMap>
            </div>
        );
    }
}

const mapStateToProps = state => state.route;
const mapDispatchToProps = dispatch => ({
    onPlacemarkMove: (event, id) => {
        const point = event.get('target').geometry.getCoordinates();
        dispatch(updateLocation({ id, lat: point[0], lng: point[1] }));
    },
    onMapMove: (event) => {
        const point = event.get('target').getCenter();
        dispatch(setNewLocationPoint({ lat: point[0], lng: point[1] }));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);