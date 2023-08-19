export const getAnnonces = (state: any) => state.annonces.items;
export const isLoadingAnnonces = (state: any) => state.annonces.isLoading;

export const getWhereClause = (state: any) => state.annonces.where;
export const getRayon = (state: any) => state.annonces.where.rayon;

export const isSelectedCategory = (category: number) => {
    return (state: any) => {
        return state.annonces.where.categories.includes(category);
    }
}

export const getWhereOrder = (state: any) => state.annonces.where.tri;

export const getWherePro = (state: any) => state.annonces.where.pro;