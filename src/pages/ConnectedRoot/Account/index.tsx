import React, {useEffect} from "react";
import Header from "../../../components/Header";
import {IonContent, IonImg, IonItem, IonLabel, IonPage} from "@ionic/react";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";
import {isUserPro} from "../../../store/selectors/UserSelectors";

import "./account.scss";


// store import
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";

const Account: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);

    const api = useApi();
    const token = useSelector(getUserToken);

    useEffect(() => {
        api.get(endpoints.profilDetail).then((res) => {
            console.log(res);
        })
    }, []);

    return (
        <IonPage className={"account"}>
            <Header text={'mes coordonnées'} canGoBack={true} defaultHref={'/user'}/>
            <IonContent>
                <div className={"account__container"}>
                    <IonItem detail={false} routerLink={"/user/coordonnes/modifier"}
                             routerDirection={"forward"}>
                        <IonLabel slot={"end"}>Modifier</IonLabel>
                    </IonItem>
                    {isPro && <div className={"account__container__containerPro"}>
                        <div className={"account__container__containerPro__infoWrapperPro"}>
                            <p>n°siret</p>
                            <span>xxxxxxx</span>
                        </div>
                        <div>
                            <p>raison sociale</p>
                            <span>xxxxxxxx</span>
                        </div>
                        <div className={"account__container__containerPro__infoWrapperPro__logoContainer"}>
                            <p>logo actuel</p>
                            <IonImg src={""} alt={"logo de la société"}></IonImg>
                        </div>
                    </div>
                    }
                    <div className={"account__container__infoWrapper"}>
                        <div className={"account__container__infoWrapper__name"}>
                            <p>nom</p>
                            <span>xxxxx</span>
                        </div>
                        <div className={"account__container__infoWrapper__name"}>
                            <p>prénom</p>
                            <span>xxxxxxx</span>
                        </div>
                    </div>

                    <div className={"account__container__infoWrapper"}>
                        <p>adresse mail : </p>
                        <span>xxxxxx@xxxx.com</span>
                    </div>

                    <div className={"account__container__infoWrapper"}>
                        <p>numéro de téléphone : </p>
                        <span>xxxxxxxxxx</span>
                    </div>

                    <div className={"account__container__infoWrapperAdresse"}>
                        <p>adresse postale :</p>
                        <span>xxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </div>

                    <div className={"account__container__infoWrapper"}>
                        <div className={"account__container__infoWrapper__name"}>
                            <p>code postal : </p>
                            <span>xxxxxxxxxxx</span>
                        </div>
                        <div className={"account__container__infoWrapper__name"}>
                            <p>ville: </p>
                            <span>xxxxxxx</span>
                        </div>
                        <div className={"account__container__infoWrapper__name"}>
                            <p>pays : </p>
                            <span>xxxxxxxxxxxx</span>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Account;