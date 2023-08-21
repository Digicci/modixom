import React, {useEffect} from "react";
import './connexionForm.scss';
import {useSelector, useDispatch} from "react-redux";
import {useApi} from "../../../../services/ApiService";
import {useIonToast, useIonRouter} from "@ionic/react";
import {storageKeys, IStorageUser} from "../../../../constants";

import Input from "../../../../components/Input";

import {ConnexionFields} from "./FormConfig";
import {connexionSelector} from "../../../../store/selectors/ConnexionSelectors";
import {setConnexionField} from "../../../../store/actions/connexionActions";
import {connectUser} from "../../../../store/actions/userActions";

const ConnexionForm: React.FC = () => {

    const dispatch = useDispatch();
    const data = useSelector(connexionSelector);
    const api = useApi();
    const [present] = useIonToast();
    const {push} = useIonRouter();
    const {userKey} = storageKeys;

    // Check if user is already connected
    useEffect(() => {
        const user: IStorageUser | null = JSON.parse(localStorage.getItem(userKey) as string);
        // if user is not null, it means that he is already connected
        if (user !== null) {
            dispatch(connectUser(user.idUser, user.token, user.isPro));
            push('/home', 'forward', 'replace');
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch(setConnexionField(name, value));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.post('/login', data);
        if (response.user === null) {
            await present({
                message: 'Identifiants incorrects',
                duration: 3000,
                color: 'danger',
                position: 'bottom'
            });
            return;
        }
        await present({
            message: 'Connexion réussie',
            duration: 3000,
            color: 'success',
        });
        const {idUser, token, type} = response.user;
        dispatch(connectUser(idUser, token, type));
        push('/home', 'forward', 'replace')
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