import {defaultGender} from "../../pages/UnconnectedRoot/Inscription/InscriptionForm/FormConfig";
import ReduxActionInterface from "../../interface/reduxActionInterface";
import ICityProposal from "../../models/ICityProposal";
import {
    SET_INSCRIPTION_ERROR,
    SET_INSCRIPTION_FIELD,
    SET_CITY_PROPOSAL,
    SET_INSCRIPTION_FOCUS,
    SET_INSCRIPTION_CITY
} from "../actions/inscriptionActions";

export interface IUserState {
    logo?: string;
    name: string | Object;
    surname: string| Object;
    gender: string| Object;
    mail: string| Object;
    mailConfirmation: string| Object;
    phone: string| Object;
    password: string| Object;
    passwordConfirmation: string| Object;
    address: string| Object;
    city: string| Object;
    postalCode: string| Object;
    country: string| Object;
    cgu: boolean| Object;
    cityId?: string | number | null;
    siret?: string | number | null | Object;
    socialReason?: string | null | Object;
}

interface InscriptionErrorState {
    name: string;
    surname: string;
    mail: string;
    mailConfirmation: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    cgu: string;
    noCityId: boolean;
}


interface InscriptionState {
    user: IUserState;
    errors: InscriptionErrorState;
    cities: Array<ICityProposal>;
    focus: string | null;
}


//La valeur par défaut pour "gender" se trouve dans le fichier src\pages\UnconnectedRoot\Inscription\InscriptionForm\FormConfig.ts
//Il est donc inutile de la définir ici


const initialState: InscriptionState = {
    user: {
        name: '',
        surname: '',
        gender: defaultGender,
        mail: '',
        mailConfirmation: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        password: '',
        passwordConfirmation: '',
        cgu: false,
        cityId: null,
        siret: "",
        socialReason: ''
    },
    errors: {
        name: '',
        surname: '',
        mail: '',
        mailConfirmation: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        password: '',
        passwordConfirmation: '',
        cgu: '',
        noCityId: true
    },
    cities: [],
    focus: null
}

const inscriptionReducer = (state = initialState, action: ReduxActionInterface) => {
    switch (action.type) {

        case SET_INSCRIPTION_FIELD:
            const {name, value} = action.payload;
            const newUser = {
                ...state.user,
                [name]: value
            }
            return {
                ...state,
                user: newUser
            };

        case SET_INSCRIPTION_ERROR:
            const {name: errorName, value: errorValue} = action.payload;
            const newErrors = {
                ...state.errors,
                [errorName]: errorValue
            }
            return {
                ...state,
                errors: newErrors
            }

        case SET_CITY_PROPOSAL:
            return {
                ...state,
                cities: action.payload.cities,
                errors: {
                    ...state.errors,
                    noCityId: true
                }
            }

        case SET_INSCRIPTION_FOCUS:
            return {
                ...state,
                focus: action.payload.focus
            }

        case SET_INSCRIPTION_CITY:
            return {
                ...state,
                user: {
                    ...state.user,
                    city: action.payload.city.nom,
                    postalCode: action.payload.city.cp,
                    cityId: action.payload.city.id
                },
                errors: {
                    ...state.errors,
                    noCityId: false
                }
           }

        default:
            return state;
    }
}

export default inscriptionReducer;