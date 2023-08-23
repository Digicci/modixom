import {UserState} from "../reducers/UserReducer";
import {clientTypes} from "../../constants";

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

export const setUer = (user: UserState) => {
    return {
        type: SET_USER,
        payload: user
    }
}