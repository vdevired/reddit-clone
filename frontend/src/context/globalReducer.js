export const SHOW_SIGN_UP = "SHOW_SIGN_UP";
export const HIDE_SIGN_UP = "HIDE_SIGN_UP";
export const SHOW_LOGIN = "SHOW_LOGIN";
export const HIDE_LOGIN = "HIDE_LOGIN";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const globalReducer = (state, action) => {
    switch (action.type) {
        case SHOW_SIGN_UP:
            return { ...state, showSignUp: true };
        case HIDE_SIGN_UP:
            return { ...state, showSignUp: false };
        case SHOW_LOGIN:
            return { ...state, showLogin: true };
        case HIDE_LOGIN:
            return { ...state, showLogin: false };
        case LOGIN:
            return { ...state, authUser: action.user, checkedAuth: true };
        case LOGOUT:
            return { ...state, authUser: null, checkedAuth: true };
        default:
            return state;
    }
};
