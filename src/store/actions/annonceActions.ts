import {IAnnonce} from "../../models/IAnnonce";

export const ADD_ANNONCE = 'ADD_ANNONCE';
export const REMOVE_ANNONCE = 'REMOVE_ANNONCE';
export const SET_ANNONCE = 'SET_ANNONCE';

export const addAnnonce = (annonce: IAnnonce) => {
    return {
        type: ADD_ANNONCE,
        payload: annonce
    }
}

export const removeAnnonce = (annonce: IAnnonce) => {
    return {
        type: REMOVE_ANNONCE,
        payload: annonce
    }
}

export const setAnnonce = (annonces: IAnnonce[]) => {
    return {
        type: SET_ANNONCE,
        payload: annonces
    }
}