import ICityProposal from '../../models/ICityProposal';

export const SET_INSCRIPTION_FIELD = 'SET_INSCRIPTION_FIELD';
export const setInscriptionField = (name: string, value: string) => ({
    type: SET_INSCRIPTION_FIELD,
    payload: {
        name,
        value
    }
});

export const RESET_INSCRIPTION_FIELDS = 'RESET_INSCRIPTION_FIELDS';
export const resetInscriptionFields = () => ({
    type: RESET_INSCRIPTION_FIELDS
});

export const SET_INSCRIPTION_ERROR = 'SET_INSCRIPTION_ERROR';
export const setInscriptionError = (name: string, error: string) => ({
    type: SET_INSCRIPTION_ERROR,
    payload: {
        name,
        error
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
export const setInscriptionFocus = (on: string | null) => ({
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