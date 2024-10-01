import {IAddAnnonceForm} from "../../../store/reducers/AddAnnonceReducer";
import {clientTypes} from "../../../constants";


interface IAddAnnonceFormConfig extends Omit<IAddAnnonceForm, "client"|"quantite"|"logo"|"norme"|"booster"> {
    quantite: Object;
    client: Object;
    logo:Object;
}

export const FormFieldConfig: IAddAnnonceFormConfig = {
    titre: {
        name: "titre",
        type: "text",
        label: "titre annonce :",
        rules:{
            required:true,
            minLength:5,
            maxLength:50,
        }

    },
    logo:{
      name:"image",
      type:"img",
      label:"image produit :"
    },
    descriptif: {
        name: "descriptif",
        type: "textarea",
        label: "descriptif produit :",
        rules:{
            required:true,
            minLength:5,
        }

    },
    categorie: {
        name: "categorie",
        type: "select",
        label: "Catégorie :",
        errorMessage: "Veuillez choisir une catégorie",
        rules:{
            required:true,
        }

    },
    quantite: {
        name: "quantite",
        type: "number",
        label: "quantité :",
        rules:{
            required:true,
            quantite:true,
        }
    },
    dateHeureDebut: {
        name: "dateHeureDebut",
        type: "datetime-local",
        label: "date et heure de parution :",
        errorMessage: "Veuillez choisir une date et une heure",
        rules:{
            required:true,
        }
    },
    dateHeureFin: {
        name: "dateHeureFin",
        type: "datetime-local",
        label: "date et heure de fin de parution :",
        errorMessage: "Veuillez choisir une date et une heure",
        rules:{
            required:true,
        }
    },
    prix:{
        name:"prix",
        type:"number",
        label:'Prix :',
        rules:{
            required:true,
            quantite:true,
        }
    },
    pourcent:{
        name:"pourcent",
        type:"number",
        label:"pourcentage de réduction :",
        rules:{
            required:true,
            quantite:true,
        },
    },


    client: {
        type: "client",
        errorMessage: "veuillez choisir au moins un type de client",
        label: "je souhaite diffuser mon annonce auprès dès :",
        input: {
            particulier: {
                name: "client",
                label: "des particuliers :",
                value: clientTypes.part
            },
            professionnels: {
                name: "client",
                label: "des professionnels : ",
                value: clientTypes.pro
            }
        },
        rules: {
            required: true,
        }
    }
}