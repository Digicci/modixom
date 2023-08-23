import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import {IonButton, IonContent, IonFooter, IonItem, IonLabel, IonPage} from "@ionic/react";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";

import "./account.scss";


// store import
import {useSelector, useDispatch} from "react-redux";
import {getUserToken, getUser, isUserPro, getCitiesProposal, getNewUser} from "../../../store/selectors/UserSelectors";
import {apiUserDataAdapter} from "../../../utils/tools/apiDataAdapter";
import {UserState, NewUserState} from "../../../store/reducers/UserReducer";
import {setUer, setNewUserCity, setNewUserField, setNewUserCities} from "../../../store/actions/userActions";
import Loader from "../../../components/Loader";


// component import
import AccountUpdatableInput from "../../../components/AccountUpdatableInput";

const Account: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modif, setModif] = useState<boolean>(false);

    const api = useApi();
    const token: string = useSelector(getUserToken);
    const user: UserState = useSelector(getUser);
    const newUser: NewUserState = useSelector(getNewUser);

    useEffect(() => {
        if (user.name === "") {
            setIsLoading(true);
            api.get(endpoints.profilDetail,{token}).then((res) => {
                console.log(res);
                const apiUser: UserState = apiUserDataAdapter(res);
                console.log(apiUser);
                dispatch(setUer(apiUser));
                setIsLoading(false);
            })
        }
    }, []);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch(setNewUserField(name, value));

        if (name === "city") {
            if (value.length > 2) {
                const response = await api.get(endpoints.city, {q: value});
                dispatch(setNewUserCities(response));
            } else {
                dispatch(setNewUserCities([]))
            }
        }
    }

    const toggleModif = () => {
        setModif(!modif);
    }

    return (
        <IonPage className={"account"}>
            <Header text={ modif ? 'modifier mes coordonnées' : 'mes coordonnées'} canGoBack={true} defaultHref={'/user'}/>
            <IonContent>
                {
                    isLoading ? <Loader /> : (
                        <div className={"account__container"}>
                            <IonItem detail={false} onClick={toggleModif}>
                                <IonLabel slot={"end"}>Modifier</IonLabel>
                            </IonItem>
                            {isPro && <div className={"account__container__containerPro"}>
                                <AccountUpdatableInput
                                    actualValue={user.siret!}
                                    label={'n°siret'}
                                    name={'siret'}
                                    type={'text'}
                                    classPrefix={"account__container__containerPro__infoWrapperPro"}
                                    isUpdating={modif}
                                    handleChange={handleChange}
                                    newValue={newUser.siret}
                                />
                                <AccountUpdatableInput
                                    actualValue={user.socialReason || ""}
                                    label={'raison sociale'}
                                    name={'socialReason'}
                                    type={'text'}
                                    isUpdating={modif}
                                    handleChange={handleChange}
                                    newValue={newUser.socialReason}
                                />
                                <AccountUpdatableInput actualValue={user.logo!} label={"logo actuel"} type={'img'} classPrefix={'account__container__containerPro__infoWrapperPro'} isUpdating={modif} />
                            </div>
                            }
                            <div className={"account__container__infoWrapper"}>
                                <AccountUpdatableInput
                                    actualValue={user.name}
                                    label={'nom'}
                                    type={'text'}
                                    name={'name'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
                                    handleChange={handleChange}
                                    newValue={newUser.name}
                                />
                                <AccountUpdatableInput
                                    actualValue={user.surname}
                                    label={'prénom'}
                                    type={'text'}
                                    isUpdating={modif}
                                    name={'surname'}
                                    classPrefix={"account__container__infoWrapper__name"}
                                    handleChange={handleChange}
                                    newValue={newUser.surname}
                                />
                            </div>
                            <AccountUpdatableInput
                                actualValue={user.mail}
                                label={'adresse mail :'}
                                type={'email'}
                                name={'mail'}
                                isUpdating={modif}
                                classPrefix={"account__container__infoWrapper"}
                                handleChange={handleChange}
                                newValue={newUser.mail}
                            />
                            <AccountUpdatableInput
                                actualValue={user.phone}
                                label={'numéro de téléphone :'}
                                type={'text'}
                                name={'phone'}
                                isUpdating={modif}
                                classPrefix={"account__container__infoWrapper"}
                                handleChange={handleChange}
                                newValue={newUser.phone}
                            />

                            <div className={"account__container__infoWrapper"}>
                                <AccountUpdatableInput
                                    actualValue={user.postalCode}
                                    label={'code postal :'}
                                    type={'text'}
                                    isUpdating={modif}
                                    name={'postalCode'}
                                    classPrefix={"account__container__infoWrapper__name"}
                                    handleChange={handleChange}
                                    newValue={newUser.postalCode}
                                />
                                {
                                    //Todo: refactor or create a Input component to handle the particularity of the city input
                                }
                                <AccountUpdatableInput
                                    actualValue={user.city}
                                    name={'city'}
                                    label={'ville :'}
                                    type={'text'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
                                    propositionSelector={getCitiesProposal}
                                    citySetter={setNewUserCity}
                                    handleChange={handleChange}
                                    newValue={newUser.city}
                                />
                                <AccountUpdatableInput
                                    name={'country'}
                                    actualValue={user.country}
                                    label={'pays :'}
                                    type={'text'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
                                    handleChange={handleChange}
                                    newValue={newUser.country}
                                />
                            </div>
                            <AccountUpdatableInput
                                actualValue={user.address}
                                label={'adresse postale :'}
                                type={'text'}
                                name={'address'}
                                isUpdating={modif}
                                classPrefix={"account__container__infoWrapperAdresse"}
                                handleChange={handleChange}
                                newValue={newUser.address}
                            />
                        </div>
                    )
                }
                <IonFooter className={'validateButtonContainer'}>
                    <IonButton className={'validateButton'}>Valider</IonButton>
                </IonFooter>
            </IonContent>
        </IonPage>
    )
}

export default Account;