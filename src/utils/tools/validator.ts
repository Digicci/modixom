import {useSelector, useDispatch} from "react-redux";
import {getInscriptionValues} from "../../store/selectors/InscriptionSelectors";
import {setInscriptionError} from "../../store/actions/inscriptionActions";

export const validator = (formConfig: any, selector: (state:any) => any) => {
    const dispatch = useDispatch();
    const values = useSelector(selector);

    const validate = (name: string, value: any) => {
        const field = formConfig[name];
        let error = '';
        if (field.required && (!value || value === '' || value === false)) {
            error = 'Ce champ est requis';
        }
        if (value !== ''  && !new RegExp(field.pattern).test(value)) {
            error = field.errorMessage || 'Ce champ est invalide';
        }

        if(name === 'mailConfirmation' && value !== values.mail){
            error = 'Les adresses mail ne correspondent pas';
        }
        if(name === 'passwordConfirmation' && value !== values.password){
            error = 'Les mots de passe ne correspondent pas';
        }

        dispatch(setInscriptionError(name, error));
        return error;
    }
    const validateAll = () => {
        const errors: Array<string> = []
        Object.keys(formConfig).forEach((name: string) => {
            errors.push(validate(name, values[name]));
        });
        return errors;
    }
    return {
        validate,
        validateAll
    }
}

export default validator;