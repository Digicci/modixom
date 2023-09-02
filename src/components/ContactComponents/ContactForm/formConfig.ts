import {IContactForm} from "../../../store/reducers/ContactReducer";

export const FormFields: IContactForm = {
    name: {
        name: "name",
        type: "text",
        label: "nom",
        classPrefix: "contact__container__infoWrapper",
        rules: {
            minLength: 2,
            maxLength: 50,
            required: true,
        }
    },
    surname: {
        name: "surname",
        type: "text",
        label: "prénom",
        classPrefix: "contact__container__infoWrapper",
        rules: {
            minLength: 2,
            maxLength: 50,
            required: true,
        }
    },
    mail: {
        name: "mail",
        type: "email",
        label: "adresse mail",
        classPrefix: "contact__container__infoWrapper",
        rules: {
            required: true,
            email: true,
        }

    },
    phone: {
        name: "phone",
        type: "tel",
        label: "téléphone",
        classPrefix: "contact__container__infoWrapper",
        rules: {
            minLength: 10,
            maxLength: 10,
            required: true,
            pattern: /^[0-9]*$/
        }
    },
    motif: {
        name: "motif",
        type: "text",
        label: "motif de contact",
        classPrefix: "contact__container__infoWrapper",
        rules: {
            minLength: 5,
            maxLength: 50,
            required: true,
        }
    },
    description: {
        name: "description",
        type: "textarea",
        label: "description",
        errorMessage: "Votre message est trop court",
        classPrefix: "contact__container__infoWrapper",
        rules: {
            minLength: 5,
            required: true,
        }
    }
}