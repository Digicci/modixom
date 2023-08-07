import React from 'react';
import './Connexion.scss';
import {IonPage, IonButton, IonHeader, IonFooter} from "@ionic/react";
import ConnexionForm from "./ConnexionForm";

const Connexion: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className={'header__container'}>
                <h1>Connexion</h1>
            </IonHeader>
            <ConnexionForm />
            <IonFooter className={'signinButton__wrapper'}>
                    <IonButton className={'signinButton'} routerLink={'/inscription'} expand={'full'}>
                        {"S'inscrire"}
                    </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Connexion;