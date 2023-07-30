import {IUserState} from "../../../../store/reducers/InscriptionReducer";

export const defaultGender = "male"

export const FormFields: IUserState = {
    gender: {
        type: 'radio',
        name: 'gender',
        fieldset: [
            {
                value: defaultGender,
                label: 'Mr'
            },
            {
                value: 'female',
                label: 'Mme'
            }
        ],
        required: true
    },
    name: {
        type: 'text',
        label: 'Nom',
        name: 'name',
        required: true,
        pattern: '^[a-zA-Z]+$',
        errorMessage: 'Seul les lettres sont autorisée'
    },
    surname: {
        type: 'text',
        label: 'Prénom',
        name: 'surname',
        required: true,
        pattern: '^[a-zA-Z]+$',
        errorMessage: 'Seul les lettres sont autorisée'
    },
    address: {
        type: 'text',
        label: 'Adresse',
        name: 'address',
        required: true,
        pattern: '^[a-zA-Z0-9]+$'
    },
    postalCode: {
        type: 'text',
        label: 'Code postal',
        name: 'postalCode',
        required: true,
        pattern: '^[0-9]{5}$',
        errorMessage: 'Doit contenir 5 chiffres'
    },
    city: {
        type: 'text',
        label: 'Ville',
        name: 'city',
        required: true,
        pattern: '^[a-zA-Z-]+$'
    },
    country: {
        type: 'text',
        label: 'Pays',
        name: 'country',
        required: true,
        pattern: '^[a-zA-Z-]+$',
        errorMessage: 'Format invalide'
    },
    phone: {
        type: 'text',
        label: 'Téléphone',
        name: 'phone',
        required: true,
        pattern: '^[0-9]{10}$',
        errorMessage: 'Numéro invalide'
    },
    mail: {
        type: 'email',
        label: 'adresse email',
        name: 'mail',
        required: true,
        pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}.[a-z]{2,4}$',
        errorMessage: 'Email invalide'
    },
    mailConfirmation: {
        type: 'email',
        label: 'confirmation adresse email',
        name: 'mailConfirmation',
        required: true,
        pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}.[a-z]{2,4}$',
        errorMessage: 'Email invalide'
    },
    password: {
        type: 'password',
        label: 'Mot de passe',
        name: 'password',
        required: true,
        pattern: '^[a-zA-Z0-9._-]{8,}$',
        errorMessage: 'Le mot de passe doit contenir 8 caractères minimum'
    },
    passwordConfirmation: {
        type: 'password',
        label: 'confirmation mot de passe',
        name: 'passwordConfirmation',
        required: true,
        pattern: '^[a-zA-Z0-9._-]{8,}$'
    },
    cgu: {
        type: 'checkbox',
        label: 'J\'accepte les conditions générales d\'utilisation',
        name: 'cgu',
        errorMessage: 'Merci d\'accepter les conditions générales d\'utilisation'
    }
}