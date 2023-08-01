import {ICityProposal} from '../reducers/InscriptionReducer.ts';

export const SET_INSCRIPTION_FIELD = 'SET_INSCRIPTION_FIELD';
export const setInscriptionField = (name: string, value: string) => ({
    type: SET_INSCRIPTION_FIELD,
    payload: {
        name,
        value
    }
});

export const SET_INSCRIPTION_ERROR = 'SET_INSCRIPTION_ERROR';
export const setInscriptionError = (name: string, value: string) => ({
    type: SET_INSCRIPTION_ERROR,
    payload: {
        name,
        value
    }
})

export const SET_CITY_PROPOSAL = 'SET_CITY_PROPOSAL';
export const setCityProposal = (values: Array<ICityProposal>) => ({
    type: SET_CITY_PROPOSAL,
    payload: {
        cities: values
    }
})

export const SET_INSCRIPTION_FOCUS = 'SET_INSCRIPTION_FOCUS';
export const setInscriptionFocus = (on: string) => ({
    type: SET_INSCRIPTION_FOCUS,
    payload: {
        focus: on
    }
})

export const SET_INSCRIPTION_CITY = 'SET_INSCRIPTION_CITY';
export const setInscriptionCity = (city: ICityProposal) => ({
    type: SET_INSCRIPTION_CITY,
    payload: {
        city
    }
});