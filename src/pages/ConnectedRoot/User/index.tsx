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
import {Dispatch} from "redux";
import Header from "../../../components/Header";

interface IUserRoute {
    route: string;
    label: string;
    color?: string;
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
            route: "coordonnes",
            label: "mes coordonnées"
        },
        {
          route:"contact",
          label:"nous contacter"
        },
        {
            route: "confidentialite",
            label: "politique de confidentialité"
        }
    ];
    // On ajoute les routes dont seuls les pro peuvent avoir access
    if(isPro) {
        //Todo : Ajouter toutes les routes pour la partie pro
        availableRoutes.push(
            {
                route: 'facture',
                label: "factures"
            },
            {
                route: 'buyCredit',
                label: "acheter du crédit"
            },
            {
                route: 'myAnnonces',
                label: "annonces diffusées"
            },
            {
                route: 'contactus',
                label: "nous contacter"
            }
        )
    }

    availableRoutes.push(
        {
            route: "delete",
            label: "supprimer mon compte",
            color: "red"
        }
    );

    return (
        <IonPage className={'user'}>
            <Header text={'mon compte'} />
            <IonContent>
                <div className={'list__container'}>
                    <IonList inset={false} lines={'none'} className={'list'}>
                        {
                            // On affiche le crédit seulement si l'utilisateur est un pro
                            isPro &&
                            <IonItem className={'list__item'}>
                                <IonLabel className={'list__item__label'}>
                                    {'Mon crédit'.toUpperCase()}
                                </IonLabel>
                                <IonItem slot={'end'} className={'list__item__label__credit'}>
                                    000
                                </IonItem>
                            </IonItem>
                        }
                        {
                            availableRoutes.map((item: IUserRoute, index: number): ReactNode => (
                                <IonItem
                                    key={index}
                                    className={'list__item'}
                                    style={
                                        item.color ? {color: item.color} : {}
                                    }
                                    routerLink={`/user/${item.route}`}
                                    routerDirection={"forward"}
                                >
                                    <IonLabel className={'list__item__label'}>
                                        {item.label.toUpperCase()}
                                    </IonLabel>

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