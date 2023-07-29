import ReduxActionInterface from "../../interface/reduxActionInterface";
import {CONNECT_USER, DISCONNECT_USER, SET_USER } from "../actions/UserActions";

interface UserState {
    name: string;
    surname: string;
    gender: string;
    mail: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface UserReducerInterface {
    connected: boolean;
    user: UserState;
    isPro: boolean;
}

const initialState: UserReducerInterface = {
    connected: false,
    user: {
        name: '',
        surname: '',
        gender: '',
        mail: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    },
    isPro: false
}

const userReducer = (state = initialState, action: ReduxActionInterface) => {
    switch (action.type) {

        case CONNECT_USER:
            return {
                ...state,
                connected: true
            };

        case DISCONNECT_USER:
            return {
                ...state,
                connected: false
            };

        case SET_USER:
            return state;

        default:
            return state;
    }
}

export default userReducer;