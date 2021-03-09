export const SHOW_SIGN_UP = "SHOW_SIGN_UP";
export const HIDE_SIGN_UP = "HIDE_SIGN_UP";

export const globalReducer = (state, action) => {
    switch (action.type) {
        case SHOW_SIGN_UP:
            return { ...state, showSignUp: true };
        case HIDE_SIGN_UP:
            return { ...state, showSignUp: false };
        default:
            return state;
    }
};
