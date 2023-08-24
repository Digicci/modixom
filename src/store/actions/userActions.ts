import {UserState} from "../reducers/UserReducer";
import {clientTypes} from "../../constants";
import ICityProposal from "../../models/ICityProposal";

export const CONNECT_USER: string = 'CONNECT_USER';
export const connectUser = (id: number | string, token: string, type: string | boolean) => {
    const isPro: boolean = typeof type === 'string' ? type === clientTypes.pro : type;
    return {
        type: CONNECT_USER,
        payload: {
            id: typeof id === 'string' ? parseInt(id) : id,
            token,
            isPro
        }
    }
}
export const DISCONNECT_USER: string = 'DISCONNECT_USER';
export const disconnectUser = () => {
    return {
        type: DISCONNECT_USER
    }
}
export const SET_USER: string = 'SET_USER';

export const setUser = (user: UserState) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const SET_NEW_USER_CITY: string = 'SET_NEW_USER_CITY';
export const setNewUserCity = (cities: ICityProposal) => {
    return {
        type: SET_NEW_USER_CITY,
        payload: cities
    }
}

export const SET_NEW_USER_FIELD: string = 'SET_NEW_USER_FIELD';
export const setNewUserField = (name: string, value: any) => {
    return {
        type: SET_NEW_USER_FIELD,
        payload: {
            name,
            value
        }
    }
}

export const SET_NEW_USER_CITIES: string = 'SET_NEW_USER_CITIES';
export const setNewUserCities = (cities: Array<ICityProposal>) => {
    return {
        type: SET_NEW_USER_CITIES,
        payload: cities
    }
}

export const SET_NEW_USER_ERROR: string = 'SET_NEW_USER_ERROR';
export const setNewUserError = (name: string, value: string) => {
    return {
        type: SET_NEW_USER_ERROR,
        payload: {
            name,
            value
        }
    }
}

export const RESET_NEW_USER: string = 'RESET_NEW_USER';
export const resetNewUser = () => {
    return {
        type: RESET_NEW_USER
    }
}