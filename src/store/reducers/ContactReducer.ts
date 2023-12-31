import ReduxActionInterface from "../../interface/reduxActionInterface";
import {SET_CONTACTFORM_ERROR, SET_CONTACTFORM_FIELD} from "../actions/contactAction";
import {SET_INSCRIPTION_ERROR} from "../actions/inscriptionActions";


export interface IContactForm {
    name: string | Object;
    surname: string | Object;
    mail: string | Object;
    phone: string | Object;
    motif: string | Object;
    description: string | Object;
}

interface ContactFormErrorState {
    name: string | Object;
    surname: string | Object;
    mail: string | Object;
    phone: string | Object;
    motif: string | Object;
    description: string | Object;
}

interface ContactFormState {
    contact: IContactForm;
    errors: ContactFormErrorState;
}

const initialState: ContactFormState = {
    contact: {
        name: "",
        surname: "",
        mail: "",
        phone: "",
        motif: "",
        description: ""
    },
    errors: {
        name: "",
        surname: "",
        mail: "",
        phone: "",
        motif: "",
        description: "",
    }
}

const ContactFormReducer=(state=initialState,action:ReduxActionInterface)=>{
    switch (action.type){
        case SET_CONTACTFORM_FIELD:
            const {name,value}=action.payload;
            const newContact={
                ...state.contact,
                [name]:value
            }
            return{
                ...state,
                contact:newContact
            };

        case SET_CONTACTFORM_ERROR:
            const {name: errorName, error: errorValue} = action.payload;

            const newErrors = {
                ...state.errors,
                [errorName]: errorValue
            }
            return {
                ...state,
                errors: newErrors
            }
        default:
            return state
    }

}

export default ContactFormReducer;
