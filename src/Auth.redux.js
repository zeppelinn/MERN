const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const auth = (state={isAuth:false, user:'lijun'}, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth:true}
        case LOGOUT:
        return {...state, isAuth:false}
        default:
            return state;
    }
}

export const login = () => {
    return {type:LOGIN}
}

export const logout = () => {
    return {type:LOGOUT}
}