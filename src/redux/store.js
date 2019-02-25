import { createStore } from 'redux';
import reducers from './reducers';
import { batchedSubscribe } from 'redux-batched-subscribe';

const initialState = {
    route: {
        locationList: {
            1: {
                "id": 1,
                "name": "Красная площадь, 1",
                "lat": 55.755006,
                "lng": 37.618217,
            },
            2: {
                "id": 2,
                "name": "улица Вавилова, 4",
                "lat": 55.708706,
                "lng": 37.590305,
            },
            3: {
                "id": 3,
                "name": "улица Земляной Вал, 33",
                "lat": 55.757240,
                "lng": 37.658408,
            },
            4: {
                "id": 4,
                "name": "шоссе Энтузиастов, 42с1",
                "lat": 55.756377,
                "lng": 37.743723,
            },
        },
        locationIndexes: [1, 2, 3, 4],
        newLocation: {
            name: '',
            lat: 55.755814,
            lng: 37.617635,
        },
    },
};

const scheduleUpdate = (notify) => {
    requestAnimationFrame(() => { notify() });
}

export default createStore(reducers, initialState, batchedSubscribe(scheduleUpdate));