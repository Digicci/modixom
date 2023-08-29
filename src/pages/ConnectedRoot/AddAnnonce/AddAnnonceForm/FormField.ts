import {IAddAnnonceForm} from "../../../../store/reducers/AddAnnonceReducer";
import {clientTypes} from "../../../../constants";

interface IAddAnnonceFormConfig extends Omit<IAddAnnonceForm, "client"|"quantite"> {
    quantite: Object;
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
        label: "Choisir une catégorie",
        required: true,
        errorMessage: "veuillez choisir une catégorie",

    },
    quantite: {
        name: "quantite",
        type: "number",
        label: "quantité",
        required: true,
        errorMessage: "veuillez choisir une quantité différente de 0",
    },
    dateHeureDebut: {
        name: "dateHeureDebut",
        type: "datetime-local",
        required: true,
        label: "date et heure de parution",
        errorMessage: "veuillez choisir une date et une heure",
    },
    dateHeureFin: {
        name: "dateHeureFin",
        type: "datetime-local",
        required: true,
        label: "date et heure de fin de parution",
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
        label: "je souhaite diffuser mon annonce auprés :",
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