export const SET_ADDANNONCE_FIELD = "SET_ADDANNONCE_FIELD";
export const setAddAnnonceField = (name: string, value: string| boolean) => ({
    type: SET_ADDANNONCE_FIELD,
    payload: {
        name,
        value
    }
})

export const SET_ADDANNONCE_ERROR = "SET_ADDANNONCE_ERROR";
export const setAddAnnonceError = (name: string, error: string) => ({
    type: SET_ADDANNONCE_ERROR,
    payload: {
        name,
        error
    }
})

export const RESET_ADD_ANNONCE_FORM = "RESET_ADD_ANNONCE_FORM";
export const resetAddAnnonceForm = () => ({
    type: RESET_ADD_ANNONCE_FORM
})