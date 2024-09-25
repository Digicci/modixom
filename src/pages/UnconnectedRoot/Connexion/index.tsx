import React from 'react';
import './Connexion.scss';
import {IonPage, IonButton, IonHeader} from "@ionic/react";
import ConnexionForm from "./ConnexionForm";

const Connexion: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className={'header__container'}>
                <h1>CONNEXION / INSCRIPTION</h1>
            </IonHeader>
            <ConnexionForm />
            <div className={'signinButton__wrapper'}>
                    <IonButton className={'signinButton'} routerLink={'/inscription'} expand={'full'}>
                        {"S'inscrire"}
                    </IonButton>
            </div>
        </IonPage>
    );
};

export default Connexion;