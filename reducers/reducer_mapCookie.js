import { MAP_LOCAL_STORE } from '../actions/index';

export default function(state = {}, action) {
    switch (action.type) {
        case MAP_LOCAL_STORE:
            return action.payload;
    }
    return state;
}
