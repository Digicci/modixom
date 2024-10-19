export const TOGGLE_ALERTE_CATEGORY: string = 'TOGGLE_ALERTE_CATEGORY';

export const SET_ALERTE_VILLE: string = 'SET_ALERTE_VILLE';

export const SET_ALERTE_FIELDS: string = 'SET_ALERTE_FIELDS';

export const RESET_ALERTE_FIELDS: string = "RESET_ALERTE_FIELDS";

export const toggleAlerteCategory = (category: number) => ({
    type: TOGGLE_ALERTE_CATEGORY,
    payload: category
});

export const setAlerteVille = (ville: number) => ({
    type: SET_ALERTE_VILLE,
    payload: ville
});

export const setAlerteFields = (fields: any) => ({
    type: SET_ALERTE_FIELDS,
    payload: fields
});

export const resetAlerteFields = () => ({
    type: RESET_ALERTE_FIELDS,
})