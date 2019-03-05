import React from 'react';
import Route from './Route';
import Map from './Map';
import { YMaps } from 'react-yandex-maps';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'

const App = () => {
    return (
        <YMaps>
            <div className="App container my-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-2">
                            <div className="card-body">
                                <div className="card-title">
                                    Гео-маршрут
                                </div>
                                <ul className="small">
                                    <li>
                                        введите название новой точки маршрута и нажмите Enter
                                    </li>
                                    <li>
                                        новая точка появится в центре карты
                                    </li>
                                    <li>
                                        точки могут удаляться и перемещаться по списку
                                    </li>
                                </ul>
                            </div>
                        </div>
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

export default DragDropContext(HTML5Backend)(App);