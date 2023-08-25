import {useSelector, useDispatch} from "react-redux";


export const validateNewPassword = (
    password: string,
    passwordConfirmation: string,
    errorSetter: (name: string, value: string) => {
        type: string,
        payload: { name: typeof name, value: typeof value }
    }) => {
    const dispatch = useDispatch();

    const validate = () => {
        if (password !== passwordConfirmation && passwordConfirmation !== "") {
            dispatch(errorSetter('confirmNewPassword', 'Les mots de passe ne correspondent pas'));
            return false;
        } else {
            dispatch(errorSetter('confirmNewPassword', ''));
        }
        if(password?.length < 8 && password !== ""){
            dispatch(errorSetter('newPassword', 'Le mot de passe doit contenir au moins 8 caractères'));
            return false;
        } else {
            dispatch(errorSetter('newPassword', ''));
        }
        return true;
    }

    return {
        validate
    }
}

export const validator = (
    formConfig: any,
    selector: (state: any) => any,
    //j'ai changer le typage en fonction car au moment ou on initialise le validator on a pas encore le name
    // et la value a lui donner on les que au moment ou on utilise la methode validate
    setAction:Function
        // (name: string, error: string) => {
        //     type: string,
        //     payload: {
        //         name: typeof name,
        //         error: typeof error
        //     }
        // }
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