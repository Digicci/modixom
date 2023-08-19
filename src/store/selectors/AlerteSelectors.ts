export const getAlerteCategoryCollection = (state: any) => state.alerte.category;
export const isSelectedAlerteCategory = (category: number) => (state: any) => state.alerte.category.includes(category);

export const getAlerteVille = (state: any) => state.alerte.ville;

export const getAlerte = (state: any) => state.alerte;

export const getAlerteRayon = (state: any) => state.alerte.rayon;