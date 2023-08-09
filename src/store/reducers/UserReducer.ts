import ReduxActionInterface from "../../interface/reduxActionInterface";
import {CONNECT_USER, DISCONNECT_USER, SET_USER } from "../actions/userActions";

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
    id?: number | null;
    token: string;
}

interface UserReducerInterface {
    connected: boolean;
    user: UserState;
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
        country: '',
        id: null,
        token: ''
    }
}

const userReducer = (state: UserReducerInterface = initialState, action: ReduxActionInterface): UserReducerInterface => {
    switch (action.type) {

        case CONNECT_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
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