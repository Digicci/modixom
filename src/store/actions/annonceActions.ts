import {IAnnonce} from "../../models/IAnnonce";

export const ADD_ANNONCE = 'ADD_ANNONCE';
export const REMOVE_ANNONCE = 'REMOVE_ANNONCE';
export const SET_ANNONCE = 'SET_ANNONCE';

export const IS_LOADING = 'IS_LOADING';

export const SET_WHERE = 'SET_WHERE';

export const RESET_WHERE = "RESET_WHERE";

export const TOGGLE_CATEGORY_FILTER = "TOGGLE_CATEGORY_FILTER";
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

export const setIsLoadingAnnonces = (isLoading: boolean) => {
    return {
        type: IS_LOADING,
        payload: isLoading
    }
}

export const setWhere = (where: any) => {
    return {
        type: SET_WHERE,
        payload: where
    }
}

export const resetWhere = () => {
    return {
        type: RESET_WHERE
    }
}

export const toggleCategoryFilter = (category: number) => {
    return {
        type: TOGGLE_CATEGORY_FILTER,
        payload: category
    }
}