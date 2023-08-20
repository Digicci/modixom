interface IStorageKeys {
    [key: string]: string;
}
// Ensemble des clés de stockage local
export const storageKeys: IStorageKeys = {
    userKey: 'user',
    filterVille: 'filterVille',
    alerteVille: 'alerteVille',
}

//represente un utilisateur en local storage
export interface IStorageUser {
    idUser: string;
    token: string;
    isPro: boolean;
}

export const endpoints = {
    annonces: 'searchAnnonces',
    annonceDetail: 'annonceDetail',
    categories: 'categories',
    city: 'searchCities'
}