import ReduxActionInterface from "../../interface/reduxActionInterface";
import {SET_MY_ANNONCE_DETAIL, SET_MY_ANNONCE_DETAIL_ERROR, SET_MY_ANNONCES} from "../actions/myAnnonceDetailAction";


export interface IMyannonceDetail {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeureDebut: boolean | Object;
    dateHeureFin: boolean | Object;
    norme: boolean | Object;
    client: Array<string>;
    quantite: number;
    logo: string;
    prix: string | Object;
    pourcent: number | Object;
}

interface MyAnnonceDetailErrorState {
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

interface MyAnnonceDetailState {
    myAnnonces: Array<object> | null;
    myAnnonceDetail: IMyannonceDetail;
    myAnnonceDetailErrorState: MyAnnonceDetailErrorState;
}

const initialState: MyAnnonceDetailState = {
    myAnnonces: null,
    myAnnonceDetail: {
        titre: "",
        descriptif: "",
        categorie: "",
        dateHeureDebut: "",
        dateHeureFin: "",
        norme: false,
        client: [],
        quantite: 0,
        logo: "",
        prix: "",
        pourcent: 0
    },
    myAnnonceDetailErrorState: {
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
const MyAnnonceReducer = (state = initialState, action: ReduxActionInterface) => {
    switch (action.type) {
        //ToDo : dissocier la fonction de modification de la fonction de création.
            //le but est de définir les valeur du tableau client lors de la création et de les modifier grace à "addOrRemove()" lors du changement
        case SET_MY_ANNONCE_DETAIL:
            const {name, value } = action.payload
            const client = ['particuliers']
            name === 'visiblePro' && value === true && client.push('proféssionnels')
            console.log(name, value)
            return {
                ...state,
                myAnnonceDetail: {
                    ...state.myAnnonceDetail,
                    client: client
                }
            };
        case SET_MY_ANNONCE_DETAIL_ERROR:
            const {name: errorName, value: error} = action.payload

            const newError = {
                ...state.myAnnonceDetailErrorState,
                [errorName]: error
            }
            return {
                ...state,
                myAnnonceDetailErrorState: newError
            };
        case SET_MY_ANNONCES:
            const values = action.payload
            return {
                ...state,
                myAnnonces: values.values
            }
        default:
            return initialState
    }
}

export default MyAnnonceReducer