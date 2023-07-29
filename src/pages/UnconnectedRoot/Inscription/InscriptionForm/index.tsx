import React from "react";
import Input from "./Input";
import { FormFields } from "./FormConfig";
import {useSelector, useDispatch} from "react-redux";
import {getInscriptionValues} from "../../../../store/selectors/InscriptionSelectors";
import {setInscriptionField} from "../../../../store/actions/inscriptionActions";
import validator from "../../../../utils/tools/validator";
import {useApi} from "../../../../services/ApiService";

const InscriptionForm: React.FC = () => {
    const api = useApi();

    const {validate, validateAll} = validator(FormFields)

    const dispatch = useDispatch();
    const data = useSelector(getInscriptionValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setInscriptionField(name, value));
        validate(name, value);
        if(name === 'city') {
            handleCityChange(value);
        }
    }

    //Todo: créer une div qui contient les villes et qui s'affiche en dessous de l'input
    const handleCityChange = async (value: string) => {
        const name = 'city';
        if (value.length > 2) {
            const response = await api.get('/searchCities', {q: value});
            console.log(response);
        }
    }

    return (
        <form className={'form__wrapper'}>
            {
                Object.keys(FormFields).map((item, index) => {
                    return (
                        <Input key={index} handleChange={handleChange} value={data[FormFields[item].name]} {...FormFields[item]} />
                    )
                })
            }
            <div className={'inputGroup'}>
                <div className={"inputGroup__wrapper"}>
                    <input
                        type="submit"
                        value={"Je valide"}
                        className={"inputGroup__wrapper__input"}
                    />
                </div>
            </div>
        </form>
    );
}

export default InscriptionForm;