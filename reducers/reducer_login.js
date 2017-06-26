import { USER_LOGIN, USER_LOGOUT } from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload.data;
        case USER_LOGOUT:
            return action.payload;
    }
    return state;
}
