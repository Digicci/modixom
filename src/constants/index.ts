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
    mail: string;
}

export const endpoints = {
    annonces: 'searchAnnonces',
    annonceDetail: 'annonceDetail',
    categories: 'categories',
    city: 'searchCities',
    profilDetail: 'profil',
    profilUpdate: 'profilUpdate',
    postAnnonce: 'addAnnonce',
    annonceUserDetail:"annoncesProfil",
    deleteProfil: "deleteProfil",
    addNote: "noteProduit",
    notificationTokenUpdate: "token",
    addAlerte: 'addAlertes'
}

export const clientTypes = {
    part: "particulier",
    pro: "proféssionnels"
}