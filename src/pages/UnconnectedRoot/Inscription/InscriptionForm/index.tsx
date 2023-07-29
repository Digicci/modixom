import React from "react";
import Input from "./Input";
import { FormFields } from "./FormConfig";
import {useSelector, useDispatch} from "react-redux";
import {getInscriptionValues} from "../../../../store/selectors/InscriptionSelectors";
import {setInscriptionField} from "../../../../store/actions/inscriptionActions";
import validator from "../../../../utils/tools/validator";

const InscriptionForm: React.FC = () => {

    const {validate, validateAll} = validator(FormFields)

    const dispatch = useDispatch();
    const data = useSelector(getInscriptionValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setInscriptionField(name, value));
        validate(name, value);
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