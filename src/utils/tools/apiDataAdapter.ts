import {NewUserState, UserState} from '../../store/reducers/UserReducer';
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

export interface IApiUserToSend extends IApiUserData {
    password: string;
    newPassword?: string | null;
    confirmNewPassword?: string | null;
    cityId?: number | null;
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

export const reverseApiUserDataAdapter = (data: NewUserState) => {
    const dataToSend: NewUserState = {} as NewUserState;
    if (data.address !== '') dataToSend.address = data.address;
    if (data.cityId !== null) dataToSend.cityId = data.cityId;
    if (data.postalCode !== '') dataToSend.postalCode = data.postalCode;
    if (data.phone !== '') dataToSend.phone = data.phone;
    if (data.name !== '') dataToSend.name = data.name;
    if (data.surname !== '') dataToSend.surname = data.surname;
    if (data.password !== '') dataToSend.password = data.password!;
    if (data.newPassword !== '') dataToSend.newPassword = data.newPassword;
    if (data.confirmNewPassword !== '') dataToSend.confirmNewPassword = data.confirmNewPassword;
    if (data.siret !== '') dataToSend.siret = data.siret;
    if (data.socialReason !== '') dataToSend.socialReason = data.socialReason;
    if (data.tva !== '') dataToSend.tva = data.tva;
    if (data.logo !== '') dataToSend.logo = data.logo;

    return dataToSend;
}

