interface IField {
    type: string;
    label: string;
    name: string;
    required: boolean;
    pattern?: string;
}

interface IConnexionFields {
    email: IField;
    password: IField;
}

export const ConnexionFields: IConnexionFields = {
    email: {
        type: 'email',
        label: 'Email',
        name: 'mail',
        required: true,
        // pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}.[a-z]{2,4}$'
    },
    password: {
        type: 'password',
        label: 'Mot de passe',
        name: 'password',
        required: true
    }
}