export const getInscriptionValue = (state, name) => state.inscription[name];
export const getInscriptionValues = (state) => state.inscription.user;
export const getInscriptionError = (state) => state.inscription.errors;
export const getCitiesProposal = (state) => state.inscription.cities;
export const getInputFocus = (state) => state.inscription.focus;