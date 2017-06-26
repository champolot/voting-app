import { GET_POLL, UPDATE_POLL } from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case GET_POLL:
            return action.payload.data;
        case UPDATE_POLL:
            return action.payload;
    }
    return state;
}
