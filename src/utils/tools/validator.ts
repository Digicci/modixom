import {useSelector, useDispatch} from "react-redux";


export const validateNewPassword = (
    password: string,
    passwordConfirmation: string,
    errorSetter: (name: string, value: string) => {
        type: string,
        payload: { name: typeof name, value: typeof value }
    }) => {
    const dispatch = useDispatch();

    if (password !== passwordConfirmation) {
        dispatch(errorSetter('passwordConfirmation', 'Les mots de passe ne correspondent pas'));
        return false;

    }
    return true;
}

export const validator = (
    formConfig: any,
    selector: (state: any) => any,
    setAction:
        (name: string, error: string) => {
            type: string,
            payload: {
                name: typeof name,
                error: typeof error
            }
        }
) => {

    const dispatch = useDispatch();
    const values = useSelector(selector);

    const validate = (name: string, value: any) => {
        const field = formConfig[name];
        let error = '';
        if (field.required && (!value || value === '' || value === false)) {
            error = 'Ce champ est requis';
        }

        if (name === "description" && (value.length < 5)) {
            error = field.errorMessage
        }
        if (value !== '' && !new RegExp(field.pattern).test(value)) {
            error = field.errorMessage || 'Ce champ est invalide';
        }

        if (name === 'mailConfirmation' && value !== values.mail) {
            error = 'Les adresses mail ne correspondent pas';
        }
        if (name === 'passwordConfirmation' && value !== values.password) {
            error = 'Les mots de passe ne correspondent pas';
        }

        dispatch(setAction(name, error));
        return error;
    }
    const validateAll = () => {
        const errors: Array<string> = []
        Object.keys(formConfig).forEach((name: string) => {
            const error = validate(name, values[name]);
            if (error !== '') errors.push(error);
        });
        return errors;
    }
    return {
        validate,
        validateAll
    }
}

export default validator;