import React, {ReactNode} from 'react';

//Style & DomElement import
import './user.scss';
import {IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage} from "@ionic/react";

//Store import
import {useSelector, useDispatch} from "react-redux";
import {isUserPro} from "../../../store/selectors/UserSelectors";
import {disconnectUser} from "../../../store/actions/userActions";

import {chevronForwardOutline} from "ionicons/icons";

//utils import
import {generateHeaderClassName} from "../../../utils/tools/classNameGenerator";
import {AnyAction, Dispatch} from "redux";

interface IUserRoute {
    route: string;
    label: string;
}
const User: React.FC = () => {
    //On cherche à savoir si l'utilisateur est un pro
    const isPro: boolean = useSelector(isUserPro);
    //On génère la class du header en fonction
    const classN: string = generateHeaderClassName(isPro);

    const dispatch: Dispatch = useDispatch()

    const disconnect: () => void = (): void => {
        dispatch(disconnectUser())
    }


    //On crée la liste des routes communes aux particulier et pro
    const availableRoutes: IUserRoute[] = [
        {
            route: "coordonees",
            label: "mes coordonnées"
        },
        {
            route: "confidentialite",
            label: "politique de confidentialité"
        },
        {
            route: "delete",
            label: "supprimer mon compte"
        }
    ];
    // On ajoute les routes dont seuls les pro peuvent avoir access
    if(isPro) {
        //Todo : Ajouter toutes les routes pour la partie pro
        availableRoutes.push(
            {
                route: 'facture',
                label: "mes factures"
            }
        )
    }

    return (
        <IonPage className={'user'}>
            <IonHeader className={classN}>
                <h1>Mon compte</h1>
            </IonHeader>
            <IonContent>
                <div className={'list__container'}>
                    <IonList inset={false} lines={'none'} className={'list'}>
                        {
                            availableRoutes.map((item: IUserRoute, index: number): ReactNode => (
                                <IonItem key={index} className={'list__item'}>
                                    <IonLabel className={'list__item__label'}>
                                        {item.label.toUpperCase()}
                                    </IonLabel>
                                    <IonIcon slot={'end'} icon={chevronForwardOutline}/>
                                </IonItem>
                            ))
                        }
                    </IonList>
                </div>
            </IonContent>
            <IonFooter className={'user__footer'}>
                <IonButton onClick={disconnect} expand={'full'} className={'disconnect'}>
                    se déconnecter
                </IonButton>
            </IonFooter>
        </IonPage>
    );
}

export default User;