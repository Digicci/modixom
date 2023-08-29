export const getAddAnnonceValues = (state: any) => state.addAnnonce.addAnnonce;
export const getAddAnnonceError = (state: any) => state.addAnnonce.addAnnonceErrors;
export const isSelectedClientCheckbox = (name: string) => (state: any) =>
    state.addAnnonce.addAnnonce.client.includes(name)