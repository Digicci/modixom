import ReduxActionInterface from "../../interface/reduxActionInterface";
import {SET_ADDANNONCE_ERROR, SET_ADDANNONCE_FIELD, RESET_ADD_ANNONCE_FORM} from "../actions/addAnnonceAction";

export interface IAddAnnonceForm {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeureDebut: boolean | Object;
    dateHeureFin: boolean | Object;
    norme: boolean | Object;
    client: Array<string>;
    quantite: string;
    logo: string;
    prix: string | Object;
    pourcent: number | Object;
    booster: boolean | Object;
}

interface AddAnnonceErrorState {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeureDebut: string | Object;
    dateHeureFin: string | Object;
    norme: boolean | Object;
    client: string;
    quantite: string;
    logo: string;
    prix: string;
    pourcent: string;
}

interface AddAnnonceState {
    addAnnonce: IAddAnnonceForm;
    addAnnonceErrors: AddAnnonceErrorState;

}

const initialState: AddAnnonceState = {
    addAnnonce: {
        titre: "",
        descriptif: "",
        categorie: "",
        dateHeureDebut: "",
        dateHeureFin: "",
        norme: false,
        client: [],
        quantite: "",
        logo: "",
        prix: "",
        pourcent: "",
        booster: false
    },
    addAnnonceErrors: {
        titre: "",
        descriptif: "",
        categorie: "",
        dateHeureDebut: "",
        dateHeureFin: "",
        norme: "",
        client: "",
        quantite: "",
        logo: "",
        prix: "",
        pourcent: ""
    }
}
const addOrRemove = (array: Array<string>, value: string) => {
    return array.includes(value) ? array.filter((item: string) => item !== value) : array.concat([value])

}

const toggleBoolean = (value: boolean | Object) => !value
const AddAnnonceReducer = (state = initialState, action: ReduxActionInterface) => {
    switch (action.type) {
        case SET_ADDANNONCE_FIELD:
            const {name, value} = action.payload;
            return {
                ...state,
                addAnnonce: {
                    ...state.addAnnonce,
                    [name]: name === "client" ?
                        addOrRemove(state.addAnnonce.client, value) :
                        name === "booster" ? toggleBoolean(state.addAnnonce.booster) : value,
                }
            };

        case SET_ADDANNONCE_ERROR:
            const {name: errorName, error: errorValue} = action.payload;
            const newError = {
                ...state.addAnnonceErrors,
                [errorName]: errorValue
            }
            return {
                ...state,
                addAnnonceErrors: newError
            }

        case RESET_ADD_ANNONCE_FORM:
            return initialState;

        default:
            return initialState;
    }
}
export default AddAnnonceReducer;