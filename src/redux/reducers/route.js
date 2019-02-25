import produce from 'immer';

let gId = 1000;

export default (state = null, action) => {
    return produce(state, draft => {
        let id;
        switch (action.type) {
            case 'append_location':
                id = gId++;
                draft.locationIndexes.push(id);
                draft.locationList[id] = {
                    ...draft.newLocation,
                    id,
                };
                draft.newLocation.name = '';
                break;
            case 'remove_location':
                draft.locationIndexes.splice(draft.locationIndexes.indexOf(action.id), 1);
                delete draft.locationList[action.id];
                break;
            case 'update_location':
                id = action.location.id;
                draft.locationList[id] = {
                    ...draft.locationList[id],
                    ...action.location,
                }
                break;
            case 'move_location':
                const { srcId, targetId } = action;
                let oldIndex = state.locationIndexes.indexOf(srcId);
                let newIndex = state.locationIndexes.indexOf(targetId);
                draft.locationIndexes.splice(oldIndex, 1);
                draft.locationIndexes.splice(newIndex, 0, srcId);
                break;
            case 'set_new_location_name':
                draft.newLocation.name = action.name;
                break;
            case 'set_new_location_point':
                draft.newLocation = {
                    ...draft.newLocation,
                    ...action.point,
                };
                break;
            default:
                return state;
        }
    });
}