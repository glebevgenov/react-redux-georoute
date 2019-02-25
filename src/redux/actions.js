export const appendLocation =  () => ({
    type: 'append_location',
});

export const removeLocation = id => ({
    type: 'remove_location',
    id
});

export const updateLocation = location => ({
    type: 'update_location',
    location
});

export const moveLocation = (srcId, targetId) => ({
    type: 'move_location',
    srcId,
    targetId, 
});

export const setNewLocationName = name => ({
    type: 'set_new_location_name',
    name
});

export const setNewLocationPoint = point => ({
    type: 'set_new_location_point',
    point
});
