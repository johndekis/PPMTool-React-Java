import { SET_CURRENT_USER } from '../actions/types'

const initialState = {
    user: {},
    validToken: false
};

//const boolPayload = (payload) => {
    // if(payload) {
    //     return true
    // } else {
    //     return false
    // }
    //return payload ? true : false;
//}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: (action.payload ? true : false),
                user: action.payload
            };
        default:
        return state;
    }
}