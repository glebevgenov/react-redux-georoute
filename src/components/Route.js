import React from 'react';
import LocationName from './LocationName';
import LocationList from './LocationList';

const Route = () => {
    return (
        <div className="card">
            <div className="card-header">
                Маршрут
            </div>
            <div className="card-body p-3">
                <LocationName />
                <LocationList />
            </div>
        </div>
    );
};

export default Route;
