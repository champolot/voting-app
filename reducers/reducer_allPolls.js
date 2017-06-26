import { GET_ALL_POLLS } from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case GET_ALL_POLLS:
            return action.payload.data;
    }
    return state;
}
