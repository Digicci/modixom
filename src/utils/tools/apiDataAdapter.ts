import { UserState } from '../../store/reducers/UserReducer';
import User from "../../pages/ConnectedRoot/User";
import {clientTypes} from "../../constants";

export interface IApiUserData {
    adresse: string;
    civilite: string;
    codePostal: string;
    credit?: number;
    email: string;
    id: number;
    logo?: string;
    nom: string;
    prenom: string;
    raisonSociale?: string | null;
    siret?: string | null;
    telephone: string;
    tva?: string | null;
    type: string;
    ville: string;
}

export const apiUserDataAdapter = (data: IApiUserData): UserState => {
    const isPro: boolean = data.type === clientTypes.pro;
    const storeUser: UserState = {
        name: data.nom,
        surname: data.prenom,
        mail: data.email,
        phone: data.telephone,
        address: data.adresse,
        city: data.ville,
        postalCode: data.codePostal,
        country: 'France',
        id: data.id,
        isPro,
        gender: data.civilite,
    }
    if (isPro) {
        storeUser.credit = data.credit;
        storeUser.logo = data.logo;
        storeUser.socialReason = data.raisonSociale;
        storeUser.siret = data.siret;
        storeUser.tva = data.tva;
    }

    return storeUser;
}

