import {IAddAnnonceForm} from "../../../../store/reducers/AddAnnonceReducer";
import {clientTypes} from "../../../../constants";

interface IAddAnnonceFormConfig extends Omit<IAddAnnonceForm,"client"> {

    client: Object;
}
export const FormField: IAddAnnonceFormConfig = {
    titre: {
        name: "titre",
        type: "text",
        label: "titre annonce",
        required: true,
        errorMessage: "Veuillez remplir le titre de votre annonce"

    },
    descriptif: {
        name: "descriptif",
        type: "text",
        label: "descriptif produit",
        required: true,
        errorMessage: "Veuillez remplir le descriptif du produit",
    },
    categorie: {
        name: "categorie",
        type: "select",
        label: "choisir une catégorie",
        required: true,
        errorMessage: "veuillez choisir une catégorie",

    },
    dateHeure: {
        name: "dateHeure",
        type: "datetime-local",
        required: true,
        label: "date et heure de parution",
        errorMessage: "veuillez choisir une date et une heure",

    },
    norme: {
        name: "norme",
        type: "norme",
        label: "Je certifie que ce que je vend est : ",
        required: true,
        input: {
            li1: "aux normes ce",
            li2: "identique à celui en magasin",
            li3: "une remise exceptionelle"
        }
    },

    client: {
        type: "client",
        errorMessage: "veuillez choisir au moins un type de client",
        input: {
            particulier: {
                name: "client",
                label: "des particuliers",
                value: clientTypes.part
            },
            professionnels: {
                name: "client",
                label: "des professionnels",
                value: clientTypes.pro
            }
        }

    }


}