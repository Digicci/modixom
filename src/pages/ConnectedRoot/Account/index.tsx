import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import {IonContent, IonImg, IonItem, IonLabel, IonPage} from "@ionic/react";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";

import "./account.scss";


// store import
import {useSelector, useDispatch} from "react-redux";
import {getUserToken, getUser, isUserPro} from "../../../store/selectors/UserSelectors";
import {apiUserDataAdapter} from "../../../utils/tools/apiDataAdapter";
import {UserState} from "../../../store/reducers/UserReducer";
import {setUer} from "../../../store/actions/userActions";
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
                                    type={'text'}
                                    classPrefix={"account__container__containerPro__infoWrapperPro"}
                                    isUpdating={modif}
                                />
                                <AccountUpdatableInput
                                    actualValue={user.socialReason || ""}
                                    label={'raison sociale'}
                                    type={'text'}
                                    isUpdating={modif}
                                />
                                <AccountUpdatableInput actualValue={user.logo!} label={"logo actuel"} type={'img'} classPrefix={'account__container__containerPro__infoWrapperPro'} isUpdating={modif} />
                            </div>
                            }
                            <div className={"account__container__infoWrapper"}>
                                <AccountUpdatableInput
                                    actualValue={user.name}
                                    label={'nom'}
                                    type={'text'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
                                />
                                <AccountUpdatableInput
                                    actualValue={user.surname}
                                    label={'prénom'}
                                    type={'text'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
                                />
                            </div>
                            <AccountUpdatableInput
                                actualValue={user.mail}
                                label={'adresse mail :'}
                                type={'email'}
                                isUpdating={modif}
                                classPrefix={"account__container__infoWrapper"}
                            />
                            <AccountUpdatableInput
                                actualValue={user.phone}
                                label={'numéro de téléphone :'}
                                type={'text'}
                                isUpdating={modif}
                                classPrefix={"account__container__infoWrapper"}
                            />
                            <AccountUpdatableInput
                                actualValue={user.address}
                                label={'adresse postale :'}
                                type={'text'}
                                isUpdating={modif}
                                classPrefix={"account__container__infoWrapperAdresse"}
                            />

                            <div className={"account__container__infoWrapper"}>
                                <AccountUpdatableInput
                                    actualValue={user.postalCode}
                                    label={'code postal :'}
                                    type={'text'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
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
                                />
                                <AccountUpdatableInput
                                    actualValue={user.country}
                                    label={'pays :'}
                                    type={'text'}
                                    isUpdating={modif}
                                    classPrefix={"account__container__infoWrapper__name"}
                                />
                            </div>
                        </div>
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default Account;