import React from 'react';
import {IonContent, IonHeader, IonPage} from "@ionic/react";
import InscriptionForm from "./InscriptionForm";

function Inscription() {
    return (
        <IonPage>
            <IonHeader className={'header__container'}>
                <h1>Inscription</h1>
            </IonHeader>
            <IonContent>
                <InscriptionForm />
            </IonContent>
        </IonPage>
    );
}

export default Inscription;