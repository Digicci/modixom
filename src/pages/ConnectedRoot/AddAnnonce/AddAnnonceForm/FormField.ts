import {IAddAnnonceForm} from "../../../../store/reducers/AddAnnonceReducer";
import {clientTypes} from "../../../../constants";

interface IAddAnnonceFormConfig extends Omit<IAddAnnonceForm, "client"|"quantite"|"logo"|"norme"> {
    quantite: Object;
    client: Object;
    booster: Object;
}

export const FormField: IAddAnnonceFormConfig = {
    titre: {
        name: "titre",
        type: "text",
        label: "titre annonce",
        rules:{
            required:true,
        }

    },
    descriptif: {
        name: "descriptif",
        type: "text",
        label: "descriptif produit",
        rules:{
            required:true,
        }

    },
    categorie: {
        name: "categorie",
        type: "select",
        label: "Choisir une catégorie",
        errorMessage: "veuillez choisir une catégorie",
        rules:{
            required:true,
        }

    },
    quantite: {
        name: "quantite",
        type: "number",
        label: "quantité",
        rules:{
            required:true,
            quantite:true,
        }
    },
    dateHeureDebut: {
        name: "dateHeureDebut",
        type: "datetime-local",
        label: "date et heure de parution",
        errorMessage: "veuillez choisir une date et une heure de parution",
        rules:{
            required:true,
        }
    },
    dateHeureFin: {
        name: "dateHeureFin",
        type: "datetime-local",
        label: "date et heure de fin de parution",
        errorMessage: "veuillez choisir une date et une heure de parution",
        rules:{
            required:true,
        }
    },
    prix:{
        name:"prix",
        type:"number",
        label:'Prix avant réduction (en €)',
        rules:{
            required:true,
            quantite:true,
        }
    },
    pourcent:{
        name:"pourcent",
        type:"number",
        label:"pourcentage de réduction",
        rules:{
            required:true,
            quantite:true,
        },
    },
    // norme: {
    //     name: "norme",
    //     type: "norme",
    //     label: "Je certifie que ce que je vend est : ",
    //     errorMessage: "veuillez confirmer que vous respecter les régles",
    //     input: {
    //         li1: "aux normes CE",
    //         li2: "identique à celui en magasin",
    //         li3: "une remise exceptionelle"
    //     },
    //     rules:{
    //         required:true,
    //     }
    // },

    client: {
        name: "client",
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
        },
        rules: {
            required: true,
        }
    },
    booster: {
        type: "client",
        errorMessage: "",
        label: "booster mon annonce ?",
        input: {
            booster: {
                name: "booster",
                label: "",
                value: true
            }
        }
    }
}