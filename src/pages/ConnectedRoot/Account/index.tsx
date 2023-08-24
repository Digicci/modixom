import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import {IonButton, IonContent, IonFooter, IonItem, IonLabel, IonPage, IonActionSheet, useIonToast} from "@ionic/react";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";
import {useImageService} from "../../../services/ImageService";

import "./account.scss";


// store import
import {useSelector, useDispatch} from "react-redux";
import {
    getUserToken,
    getUser,
    isUserPro,
    getCitiesProposal,
    getNewUser,
    getNewUserError
} from "../../../store/selectors/UserSelectors";
import {apiUserDataAdapter, reverseApiUserDataAdapter} from "../../../utils/tools/apiDataAdapter";
import {UserState, NewUserState} from "../../../store/reducers/UserReducer";
import {
    setUser,
    setNewUserCity,
    setNewUserField,
    setNewUserCities,
    setNewUserError,
    resetNewUser
} from "../../../store/actions/userActions";
import Loader from "../../../components/Loader";


// component import
import AccountUpdatableInput from "../../../components/AccountUpdatableInput";
import {validateNewPassword} from "../../../utils/tools/validator";

const Account: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modif, setModif] = useState<boolean>(false);
    const [actionSheet, setActionSheet] = useState<boolean>(false);
    const [present] = useIonToast();

    const api = useApi();
    const token: string = useSelector(getUserToken);
    const user: UserState = useSelector(getUser);
    const newUser: NewUserState = useSelector(getNewUser);
    const imgService = useImageService();
    const {validate} = validateNewPassword(newUser.newPassword!, newUser.confirmNewPassword!, setNewUserError)

    const fetchUser = () =>{
        setIsLoading(true);
        api.get(endpoints.profilDetail, {token}).then((res) => {
            console.log(res);
            const apiUser: UserState = apiUserDataAdapter(res);
            dispatch(setUser(apiUser));
            dispatch(setNewUserField("id", apiUser.id!));
            dispatch(setNewUserField('isPro', apiUser.isPro!));
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchUser();

        return () => {
            dispatch(resetNewUser());
            setModif(false);
        }
    }, []);

    useEffect(() => {
        validate()
    }, [newUser.confirmNewPassword, newUser.newPassword])


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
        dispatch(resetNewUser());
        setModif(!modif);
    }

    const handleImgChange = () => {
        setActionSheet(true)
    }

    const actionSheetButton = {
        text: 'Ouvrir la galerie',
        handler: () => {
            setActionSheet(false);
            imgService.pickImage().then((res) => {
                if (typeof res.dataUrl === "string") {
                    dispatch(setNewUserField("logo", res.dataUrl!))
                }
            })
        }
    }

    const handleSubmit = () => {
        if (validate() && newUser.password) {
            api.post(endpoints.profilUpdate, reverseApiUserDataAdapter(newUser), {token: user.token}).then((res) => {
                present({
                    message: "Vos informations ont bien été modifiées",
                    duration: 1500,
                    color: "success"
                }).then(() => {
                    setModif(false);
                    fetchUser();
                })
            })
        }
        if (!newUser.password) {
            present({
                message: "Veuillez renseigner votre mot de passe",
                duration: 1500,
                color: "danger"
            })
        }
    }

    return (
        <IonPage className={"account"}>
            <Header text={modif ? 'modifier mes coordonnées' : 'mes coordonnées'} canGoBack={true}
                    defaultHref={'/user'}/>
            <IonContent>
                {
                    isLoading ? <Loader/> : (
                        <div className={"account__container"}>
                            <IonItem detail={false} lines={"none"} onClick={toggleModif}>
                                <IonLabel slot={"end"}>
                                    {
                                        modif ? "Annuler" : "Modifier"
                                    }
                                </IonLabel>
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
                                <AccountUpdatableInput
                                    actualValue={newUser.logo || user.logo!}
                                    label={"logo actuel"}
                                    type={'img'}
                                    classPrefix={'account__container__containerPro__infoWrapperPro'}
                                    isUpdating={modif}
                                    imgHandler={handleImgChange}
                                />
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
                                isUpdating={false}
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
                            {
                                modif && (
                                    <>

                                        <AccountUpdatableInput
                                            label={'nouveau mot de passe :'}
                                            name={'newPassword'}
                                            type={'password'}
                                            isUpdating={true}
                                            classPrefix={"account__container__infoWrapper__name"}
                                            handleChange={handleChange}
                                            errorSelector={getNewUserError}
                                            newValue={newUser.newPassword}
                                        />
                                        <AccountUpdatableInput
                                            label={'confirmez nouveau mot de passe :'}
                                            name={'confirmNewPassword'}
                                            type={'password'}
                                            isUpdating={true}
                                            classPrefix={"account__container__infoWrapper__name"}
                                            handleChange={handleChange}
                                            errorSelector={getNewUserError}
                                            newValue={newUser.confirmNewPassword}
                                        />
                                        <AccountUpdatableInput
                                            label={'mot de passe :'}
                                            name={'password'}
                                            type={'password'}
                                            isUpdating={true}
                                            classPrefix={"account__container__infoWrapper__name"}
                                            handleChange={handleChange}
                                            newValue={newUser.password}
                                        />
                                    </>
                                )
                            }
                        </div>
                    )
                }
                <IonActionSheet
                    isOpen={actionSheet}
                    onDidDismiss={() => {
                        setActionSheet(false)
                    }}
                    header={'Changer de logo'}
                    buttons={[actionSheetButton]}
                />
                {
                    modif && (
                        <IonFooter className={'validateButtonContainer'}>
                            <IonButton className={'validateButton'} onClick={handleSubmit}>Valider</IonButton>
                        </IonFooter>
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default Account;