import ReduxActionInterface from "../../interface/reduxActionInterface";
import {SET_ADDANNONCE_ERROR, SET_ADDANNONCE_FIELD} from "../actions/addAnnonceAction";

export interface IAddAnnonceForm {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeure: boolean | Object;
    norme: boolean|Object;
    client: Array<string> ;
}

interface AddAnnonceErrorState {
    titre: string | Object;
    descriptif: string | Object;
    categorie: string | Object;
    dateHeure: string | Object;
    norme: boolean | Object;
    client: string ;
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
        client: [],
    },
    addAnnonceErrors:{
        titre: "",
        descriptif:"",
        categorie: "",
        dateHeure: "",
        norme: "",
        client: "",
    }
}
const addOrRemove =(array:Array<string>,value:string)=>{
    return array.includes(value)?array.filter((item:string)=>item!==value) :  array.concat([value])

}
const AddAnnonceReducer=(state=initialState,action:ReduxActionInterface)=>{
    switch (action.type){
        case SET_ADDANNONCE_FIELD:
            const {name,value}=action.payload;
            return{
                ...state,
                addAnnonce:{
                    ...state.addAnnonce,
                    [name]:name==="client"?
                        addOrRemove(state.addAnnonce.client,value):value,
                }
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