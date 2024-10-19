import React, {ReactNode} from 'react';

//Style & DomElement import
import './user.scss';
import {IonButton, IonContent, IonFooter, IonItem, IonLabel, IonList, IonPage} from "@ionic/react";

//Store import
import {useSelector, useDispatch} from "react-redux";
import {getUser, isUserPro} from "../../../store/selectors/UserSelectors";
import {disconnectUser} from "../../../store/actions/userActions";


//utils import
import {Dispatch} from "redux";
import Header from "../../../components/Header";

interface IUserRoute {
    route: string;
    label: string;
    color?: string;
    disabled?: boolean;
}
const User: React.FC = () => {
    //On cherche à savoir si l'utilisateur est un pro
    const isPro: boolean = useSelector(isUserPro);

    const user = useSelector(getUser);

    const dispatch: Dispatch = useDispatch()

    const disconnect: () => void = (): void => {
        dispatch(disconnectUser())
    }


    //On crée la liste des routes communes aux particulier et pro
    const availableRoutes: IUserRoute[] = [
        {
            route: "/user/coordonnes",
            label: "mes coordonnées"
        },
        {
            route: "https://modixom.fr/protection-des-donnees",
            label: "politique de confidentialité",
        },
        {
            route: "/user/alertes",
            label: "Mes alertes"
        },
        {
            route: "/user/favoris",
            label: "Mes favoris"
        }
    ];
    // On ajoute les routes dont seuls les pro peuvent avoir access
    if(isPro) {
        availableRoutes.push(
            {
                route: '/user/facture',
                label: "factures",
            },
            {
                route: `https://modixom.fr/achatCredit?token=${user.token}`,
                label: "acheter du crédit",
            },
            {
                route: '/user/myAnnonces',
                label: "annonces diffusées",
            },
            {
                route: '/user/contact',
                label: "nous contacter",
                disabled: true
            }
        )
    }

    availableRoutes.push(
        {
            route: "/user/delete",
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
                                    {user.credit}
                                </IonItem>
                            </IonItem>
                        }
                        {
                            availableRoutes.map((item: IUserRoute, index: number): ReactNode => (
                                item.route.startsWith('http') ?
                                    <IonItem
                                        key={index}
                                        className={'list__item'}
                                        routerDirection={"forward"}
                                        style={
                                            item.color ? {color: item.color} : {}
                                        }
                                        disabled={item.disabled}
                                    >
                                        <a href={item.route} style={{
                                            textDecoration: "none",
                                            color: "inherit"
                                        }} className={'list__item__label'}>
                                            {item.label.toUpperCase()}
                                        </a>
                                    </IonItem>
                                    :
                                    <IonItem
                                    key={index}
                                    className={'list__item'}
                                    style={
                                        item.color ? {color: item.color} : {}
                                    }
                                    routerLink={`${item.route}`}
                                    routerDirection={"forward"}
                                    disabled={item.disabled}
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