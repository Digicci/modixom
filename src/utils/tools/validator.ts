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
        if (password?.length < 8 && password !== "") {
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
        let error = '';

        if (name === "client") {
            if (values.client.length===0) {
                dispatch(setAction("client", "Veuillez choisir au moins un type de client."));
                error="Veuillez choisir au moins un type de client."
                return error ;
            } else {
                dispatch(setAction("client", ""));
                return error
            }
        }

        const field = formConfig[name];

        if (field.required && (!value || value === '' || value === false)) {
            error = 'Ce champ est requis';
        }

        if (name === 'quantite' && value == 0) {
            error = 'La quantité doit être différente de 0';
        }

        // if (name === "description" && (value.length < 5)) {
        //     error = field.errorMessage
        // }
        if (value !== '' && !new RegExp(field.pattern).test(value)) {
            error = field.errorMessage || 'Ce champ est invalide';
        }

        if (name === 'mailConfirmation' && value !== values.mail) {
            error = 'Les adresses mail ne correspondent pas';
        }
        if (name === 'passwordConfirmation' && value !== values.password) {
            error = 'Les mots de passe ne correspondent pas';
        }

        const config = formConfig[name]
        const rules = config.rules ?? {};

        if (rules.required && !value) {
            error = config.errorMessage ?? `Le champ ${config.label} est obligatoire.`
        }

        if (rules.minLength &&  value.length < rules.minLength ) {
            error = `Le champ ${config.label} doit être composé d'au moins ${rules.minLength} caractères.`;
        }

        if (rules.maxLength &&  value.length > rules.maxLength) {
            error = `Le champ ${config.label} ne peut pas contenir plus de ${rules.maxLength} caractères.`;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            error = config.errorMessage ?? `Le champs ${config.label} ne respecte pas le format attendu.`;
        }

        if (rules.email) {
            const pattern = /^[a-zA-Z0-9\\.\\_\\-]+@[a-zA-Z0-9\\.\\_\\-]{2,}.[a-z]{2,4}$/;
            if (!pattern.test(value)) {
                error = config.errorMessage ?? "L'adresse email n'est pas valide."
            }
        }

        if (rules.emailConfirm) {
            if (value !== values.mail) {
                error = config.errorMessage ?? "Les emails ne correspondent pas.";
            }
        }

        if (rules.password) {
            const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]{12,}$/;
            if (!pattern.test(value)) {
                error = config.errorMessage ?? 'Le mot de passe doit contenir au moins \n\r12 caractères, \n\rune majuscule, \n\rune minuscule \n\r un chiffre et un caractère spécial'
            }
        }

        if (rules.passwordConfirm) {
            if (value !== values.password) {
                error = config.errorMessage ?? "Les mots de passe ne correspondent pas.";
            }
        }

        if(rules.quantite && value===0){
            error = config.errorMessage?? 'La quantité doit être différente de 0';
        }
        dispatch(setAction(name, error));
        return error;
    }
    const validateAll = () => {
        const errors: Array<string> = []
        Object.keys(formConfig).forEach((name: string) => {
                const error = validate(name, values[name]);
                console.log(name,values[name])
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