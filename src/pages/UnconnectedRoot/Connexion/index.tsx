import React from 'react';
import './Connexion.css';
import {IonPage, IonButton, IonRouterLink, IonHeader} from "@ionic/react";

const Connexion: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className={'header__container'}>
                <h1>Connexion</h1>
            </IonHeader>
            <IonRouterLink href={'/inscription'} className={'signinButton__wrapper'}>
                <IonButton className={'signinButton'} expand={'full'}>
                    {"S'inscrire"}
                </IonButton>
            </IonRouterLink>
        </IonPage>
    );
};

export default Connexion;