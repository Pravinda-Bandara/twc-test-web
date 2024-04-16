import React from "react";

type AppState = {
    userInfo?:string
};

const initialState: AppState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : null,

};
type Action =
    | { type: "USER_SIGNIN"; payload: string }
    | { type: "USER_SIGNOUT" }

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "USER_SIGNIN":
            return {...state,userInfo:action.payload}
        case "USER_SIGNOUT":
            return {...state,userInfo:''}
        default:
            return state;
    }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(reducer, initialState);
    return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
