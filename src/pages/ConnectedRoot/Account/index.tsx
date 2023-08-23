import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import {IonContent, IonImg, IonItem, IonLabel, IonPage} from "@ionic/react";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";
import {getUser, isUserPro} from "../../../store/selectors/UserSelectors";

import "./account.scss";


// store import
import {useSelector, useDispatch} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";
import {apiUserDataAdapter} from "../../../utils/tools/apiDataAdapter";
import {UserState} from "../../../store/reducers/UserReducer";
import {setUer} from "../../../store/actions/userActions";
import Loader from "../../../components/Loader";

const Account: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    return (
        <IonPage className={"account"}>
            <Header text={'mes coordonnées'} canGoBack={true} defaultHref={'/user'}/>
            <IonContent>
                {
                    isLoading ? <Loader /> : (
                        <div className={"account__container"}>
                            <IonItem detail={false} routerLink={"/user/coordonnes/modifier"}
                                     routerDirection={"forward"}>
                                <IonLabel slot={"end"}>Modifier</IonLabel>
                            </IonItem>
                            {isPro && <div className={"account__container__containerPro"}>
                                <div className={"account__container__containerPro__infoWrapperPro"}>
                                    <p>n°siret</p>
                                    <span>{user.siret}</span>
                                </div>
                                <div>
                                    <p>raison sociale</p>
                                    <span>{user.socialReason}</span>
                                </div>
                                <div className={"account__container__containerPro__infoWrapperPro__logoContainer"}>
                                    <p>logo actuel</p>
                                    <IonImg
                                        src={user.logo}
                                        className={'account__container__containerPro__infoWrapperPro__logoContainer__logo'}
                                        alt={"logo de la société"}
                                    ></IonImg>
                                </div>
                            </div>
                            }
                            <div className={"account__container__infoWrapper"}>
                                <div className={"account__container__infoWrapper__name"}>
                                    <p>nom</p>
                                    <span>{user.name}</span>
                                </div>
                                <div className={"account__container__infoWrapper__name"}>
                                    <p>prénom</p>
                                    <span>{user.surname}</span>
                                </div>
                            </div>

                            <div className={"account__container__infoWrapper"}>
                                <p>adresse mail : </p>
                                <span>{user.mail}</span>
                            </div>

                            <div className={"account__container__infoWrapper"}>
                                <p>numéro de téléphone : </p>
                                <span>{user.phone}</span>
                            </div>

                            <div className={"account__container__infoWrapperAdresse"}>
                                <p>adresse postale :</p>
                                <span>{user.address}</span>
                            </div>

                            <div className={"account__container__infoWrapper"}>
                                <div className={"account__container__infoWrapper__name"}>
                                    <p>code postal : </p>
                                    <span>{user.postalCode}</span>
                                </div>
                                <div className={"account__container__infoWrapper__name"}>
                                    <p>ville: </p>
                                    <span>{user.city}</span>
                                </div>
                                <div className={"account__container__infoWrapper__name"}>
                                    <p>pays : </p>
                                    <span>{user.country}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default Account;