export const getAddAnnonceValues = (state: any) => state.addAnnonce.addAnnonce;
export const getAddAnnonceError = (state: any) => state.addAnnonce.addAnnonceErrors;
export const isSelectedClientCheckbox = (name: string) => (state: any) =>
    state.addAnnonce.addAnnonce.client.includes(name)

export const isBoosted = (name: string) => (state: any) =>
    state.addAnnonce.addAnnonce.booster