export const SET_CONNEXION_FIELD = 'SET_CONNEXION_FIELD';
export const setConnexionField = (field: string, value: string) => ({
    type: SET_CONNEXION_FIELD,
    payload: {
        field,
        value
    }
});

export const RESET_CONNEXION_FORM = 'RESET_CONNEXION_FORM';
export const resetConnexionForm = () => ({
    type: RESET_CONNEXION_FORM
});