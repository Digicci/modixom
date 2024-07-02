import {IUserState} from "../../../../store/reducers/InscriptionReducer";

export const defaultGender = "M"

export const FormFields: IUserState = {
    gender: {
        type: 'radio',
        name: 'gender',
        fieldset: [
            {
                value: defaultGender,
                label: 'M'
            },
            {
                value: 'F',
                label: 'Mme'
            }
        ],
        required: true
    },
    name: {
        type: 'text',
        label: 'Nom',
        name: 'name',
        errorMessage: 'Seul les lettres sont autorisée',
        rules: {
            minLength: 2,
            maxLength: 40,
            required: true,
            pattern: /^[a-zA-Z\\ ]+$/
        }
    },
    surname: {
        type: 'text',
        label: 'Prénom',
        name: 'surname',
        errorMessage: 'Seul les lettres sont autorisée',
        rules: {
            minLength: 2,
            maxLength: 40,
            required: true,
            pattern: /^[a-zA-Z\\ ]+$/
        }
    },
    address: {
        type: 'text',
        label: 'Adresse',
        name: 'address',
        rules: {
            minLength: 5,
            required: true,
            pattern: /^[a-zA-Z0-9\\é\\è\\ê\\à\\â\\ù\\-\\ô\\ ]+$/
        }
    },
    postalCode: {
        type: 'text',
        label: 'Code postal',
        name: 'postalCode',
        disabled: true,
        rules: {
            minLength: 5,
            maxLength: 5,
            pattern: /^[0-9]{5}$/
        }
    },
    city: {
        type: 'text',
        label: 'Ville',
        name: 'city',
        rules: {
            minLength: 3,
            maxLength: 50,
            required: true,
            pattern: /^[a-zA-Z-\\é\\è\\ê\\à\\â\\ù\\ ]+$/
        }
    },
    country: {
        type: 'text',
        label: 'Pays',
        name: 'country',
        rules: {
            minLength: 3,
            maxLength: 15,
            required: true,
            pattern: /^[a-zA-Z\\-]+$/
        }
    },
    phone: {
        type: 'text',
        label: 'Numéro de téléphone',
        name: 'phone',
        rules: {
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]*$/,
            required: true
        }
    },
    mail: {
        type: 'email',
        label: 'Adresse e-mail',
        name: 'mail',
        rules: {
            required: true,
            email: true
        }
    },
    mailConfirmation: {
        type: 'email',
        label: 'Confirmation adresse e-mail',
        name: 'mailConfirmation',
        rules: {
            required: true,
            emailConfirm: true
        }
    },
    password: {
        type: 'password',
        label: 'Mot de passe',
        name: 'password',
        rules: {
            required: true,
            password: true
        }
    },
    passwordConfirmation: {
        type: 'password',
        label: 'Confirmation mot de passe',
        name: 'passwordConfirmation',
        rules: {
            required: true,
            passwordConfirm: true
        }
    },
    cgu: {
        type: 'checkbox',
        label: 'J\'accepte les conditions générales d\'utilisation',
        name: 'cgu',
        errorMessage: 'Merci d\'accepter les conditions générales d\'utilisation',
        rules: {
            required: true
        }
    }
}