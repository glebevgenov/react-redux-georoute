import React from 'react';
import Route from './Route';
import Map from './Map';
import { YMaps } from 'react-yandex-maps';

const App = () => {
    return (
        <YMaps>
            <div className="App container my-5">
                <div className="row">
                    <div className="col-md-4">
                        <Route />
                    </div>
                    <div className="col-md-8">
                        <Map />
                    </div>
                </div>
            </div>
        </YMaps>
    );
};

export default App;