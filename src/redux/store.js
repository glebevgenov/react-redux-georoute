import { createStore } from 'redux';
import reducers from './reducers';
import { batchedSubscribe } from 'redux-batched-subscribe';

const initialState = {
    route: {
        locationList: {},
        locationIndex: [],
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