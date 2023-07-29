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