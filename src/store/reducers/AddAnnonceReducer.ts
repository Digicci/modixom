import ReduxActionInterface from "../../interface/reduxActionInterface";
import {SET_ADDANNONCE_ERROR, SET_ADDANNONCE_FIELD} from "../actions/addAnnonceAction";

export interface IAddAnnonceForm {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeure: boolean | Object;
    norme: boolean|Object;
    client: string|Object
}

interface AddAnnonceErrorState {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeure: string | Object;
    norme: boolean | Object;
    client: { particulier:string,professionnels:string };
}

interface AddAnnonceState {
    addAnnonce: IAddAnnonceForm;
    addAnnonceErrors: AddAnnonceErrorState;

}

const initialState: AddAnnonceState = {
    addAnnonce:{
        titre: "",
        descriptif: "",
        categorie: "",
        dateHeure: "",
        norme: false,
        client: {
            particulier:false,
            professionnels:false
        },
    },
    addAnnonceErrors:{
        titre: "",
        descriptif:"",
        categorie: "",
        dateHeure: "",
        norme: "",
        client: {
            particulier:"",
            professionnels:"",
        },
    }
}

const AddAnnonceReducer=(state=initialState,action:ReduxActionInterface)=>{
    switch (action.type){
        case SET_ADDANNONCE_FIELD:
            const {name,value}=action.payload;
            const newAnnonce ={
                ...state.addAnnonce,
                [name]:value
            }
            return{
                ...state,
                addAnnonce:newAnnonce
            };

        case SET_ADDANNONCE_ERROR:
            const {name:errorName,error:errorValue}=action.payload;
            const newError={
                ...state.addAnnonceErrors,
                [errorName]:errorValue
            }
            return {
                ...state,
                addAnnonceErrors:newError
            }

             default:
                return initialState;
    }
}
export default AddAnnonceReducer;