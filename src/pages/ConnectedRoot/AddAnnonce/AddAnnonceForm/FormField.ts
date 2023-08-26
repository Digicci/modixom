import {IAddAnnonceForm} from "../../../../store/reducers/AddAnnonceReducer";


export const FormField:IAddAnnonceForm = {
    titre:{
        name:"titre",
        type:"text",
        label:"titre annonce",
        required:true,
        errorMessage:"Veuillez remplir le titre de votre annonce"

    },
    descriptif:{
        name:"descriptif",
        type:"text",
        label:"descriptif produit",
        required:true,
        errorMessage:"Veuillez remplir le descriptif du produit",
    },
    categorie:{
        name:"categorie",
        type:"select",
        label:"choisir une catégorie",
        required:true,
        errorMessage:"veuillez choisir une catégorie",

    },
    dateHeure:{
        name:"dateHeure",
        type:"datetime-local",
        required:true,
        label:"date et heure de parution",
        errorMessage:"veuillez choisir une date et une heure",

    },
    norme:{
        name:"norme",
        type:"norme",
        label:"Je certifie",
        required:true,
        input:{
            li1:"aux normes ce",
            li2:"identique à celui en magasin",
            li3:"une remise exceptionelle"
        }
    },

    client:{
        type:"client",
        input:{
            particulier:{
                name:"particulier",
                label:"des particuliers",
            },
            professionnels:{
                name:"professionnels",
                label:"des professionnels"
            }
        }

    }



}