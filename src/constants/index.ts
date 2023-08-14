interface IStorageKeys {
    userKey: string;
}
// Ensemble des clés de stockage local
export const storageKeys: IStorageKeys = {
    userKey: 'user',
}

//represente un utilisateur en local storage
export interface IStorageUser {
    idUser: string;
    token: string;
    type: string;
}

export const endpoints = {
    annonces: 'searchAnnonces',
    annonceDetail: 'annonceDetail',
}