import {useSelector, useDispatch} from "react-redux";
import {getInscriptionValues} from "../../store/selectors/InscriptionSelectors";
import {setInscriptionError} from "../../store/actions/inscriptionActions";

export const validator = (formConfig: any) => {
    const dispatch = useDispatch();
    const inscriptionValues = useSelector(getInscriptionValues);

    const validate = (name: string, value: string) => {
        const field = formConfig[name];
        let error = '';
        if (field.required && !value || value === '') {
            error = 'Ce champ est requis';
        }
        if (field.pattern !== '' && !new RegExp(field.pattern).test(value)) {
            error = 'Ce champ est invalide';
        }

        if(name === 'mailConfirmation' && value !== inscriptionValues.mail){
            error = 'Les adresses mail ne correspondent pas';
        }
        if(name === 'passwordConfirmation' && value !== inscriptionValues.password){
            error = 'Les mots de passe ne correspondent pas';
        }

        dispatch(setInscriptionError(name, error));
        return error;
    }
    const validateAll = () => {
        const errors: Array<string> = []
        Object.keys(formConfig).forEach((name: string) => {
            errors.push(validate(name, inscriptionValues[name]));
        });
        return errors;
    }
    return {
        validate,
        validateAll
    }
}

export default validator;