interface IStorageKeys {
    userKey: string;
}

export const storageKeys: IStorageKeys = {
    userKey: 'user',
}



export interface IStorageUser {
    idUser: string;
    token: string;
    type: string;
}