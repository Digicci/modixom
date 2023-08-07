export const getInscriptionValue = (state: any, name: string) => state.inscription[name];
export const getInscriptionValues = (state: any) => state.inscription.user;
export const getInscriptionError = (state: any) => state.inscription.errors;
export const getCitiesProposal = (state: any) => state.inscription.cities;
export const getInputFocus = (state: any) => state.inscription.focus;