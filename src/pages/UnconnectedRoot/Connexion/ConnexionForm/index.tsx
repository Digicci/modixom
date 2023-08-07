import React from "react";
import './connexionForm.scss';
import {useSelector, useDispatch} from "react-redux";
import {useApi} from "../../../../services/ApiService";

import Input from "../../../../components/Input";

import {ConnexionFields} from "./FormConfig";
import {connexionSelector} from "../../../../store/selectors/ConnexionSelectors";
import {setConnexionField} from "../../../../store/actions/connexionActions";

const ConnexionForm: React.FC = () => {

    const dispatch = useDispatch();
    const data = useSelector(connexionSelector);
    const api = useApi();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch(setConnexionField(name, value));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.post('/login', data);
        console.log(response);
    }

    return (
        <form className={'connexion'} onSubmit={handleSubmit}>
            {
                Object.keys(ConnexionFields).map((key: string, index: number) => {
                    return (
                        <Input
                            key={index}
                            // @ts-ignore
                            value={data[ConnexionFields[key].name]}
                            handleChange={handleChange}
                            // @ts-ignore
                            {...ConnexionFields[key]}
                        />
                    )
                })
            }
            <div className={'inputGroup connexion__button'}>
                <div className={"inputGroup__wrapper"}>
                    <input
                        type="submit"
                        value={"Se connecter"}
                        className={"inputGroup__wrapper__input"}
                    />
                </div>
            </div>
        </form>
    );
}

export default ConnexionForm;