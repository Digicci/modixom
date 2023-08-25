import {IContactForm} from "../../../store/reducers/ContactReducer";

export const FormFields:IContactForm ={
    name:{
        name:"name",
        type:"text",
        label:"nom",
        required:true,
        classPrefix:"contact__container__infoWrapper"
    },
    surname:{
        name:"surname",
        type:"text",
        label:"prénom",
        required:true,
        classPrefix:"contact__container__infoWrapper"
    },
    mail:{
        name:"mail",
        type:"email",
        label:"adresse mail",
        required:true,
        classPrefix:"contact__container__infoWrapper"
    },
    phone:{
        name:"phone",
        type:"tel",
        label:"téléphone",
        required:true,
        classPrefix:"contact__container__infoWrapper"
    },
    motif:{
        name:"motif",
        type:"text",
        label:"motif de contact",
        required:true,
        classPrefix:"contact__container__infoWrapper"
    },
    description:{
        name:"description",
        type:"textarea",
        label:"description",
        required:true,
        errorMessage:"Votre message est trop court",
        classPrefix:"contact__container__infoWrapper"
    },
}