import ReduxActionInterface from "../../interface/reduxActionInterface";
import {CONNECT_USER, DISCONNECT_USER, SET_USER } from "../actions/userActions";

export interface UserState {
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
    token?: string;
    isPro: boolean;
    credit?: number;
    logo?: string;
    socialReason?: string | null;
    siret?: string | null;
    tva?: string | null;
}

interface UserReducerInterface {
    connected: boolean;
    user: UserState;
}

const initialUser: UserState = {
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
    token: '',
    isPro: false
}

const initialState: UserReducerInterface = {
    connected: false,
    user: initialUser
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
                user: initialUser,
                connected: false
            };

        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };

        default:
            return state;
    }
}

export default userReducer;