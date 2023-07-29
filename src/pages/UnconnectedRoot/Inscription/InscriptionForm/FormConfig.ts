export const defaultGender = "male"

export const FormFields = {
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
        pattern: '^[a-zA-Z]+$'
    },
    surname: {
        type: 'text',
        label: 'Prénom',
        name: 'surname',
        required: true,
        pattern: '^[a-zA-Z]+$'
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
        pattern: '^[0-9]{5}$'
    },
    city: {
        type: 'text',
        label: 'Ville',
        name: 'city',
        required: true,
        pattern: '^[a-zA-Z-]+$'
    },
    town: {
        type: 'text',
        label: 'Pays',
        name: 'town',
        required: true,
        pattern: '^[a-zA-Z-]+$'
    },
    phone: {
        type: 'text',
        label: 'Téléphone',
        name: 'phone',
        required: true,
        pattern: '^[0-9]{10}$'
    },
    mail: {
        type: 'email',
        label: 'adresse email',
        name: 'mail',
        required: true,
        pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}.[a-z]{2,4}$'
    },
    mailConfirmation: {
        type: 'email',
        label: 'confirmation adresse email',
        name: 'mailConfirmation',
        required: true,
        pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}.[a-z]{2,4}$'
    },
    password: {
        type: 'password',
        label: 'Mot de passe',
        name: 'password',
        required: true,
        pattern: '^[a-zA-Z0-9._-]{8,}$'
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
        required: true
    }
}