import { useReducer } from "react";

const initialState = { user : null};

function userReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_USER':
            return { user : state.user }
        case 'LOGIN_USER':
            function login() {
                
            }
            return login()
        default:
            return { user : null}
    }
};