import React from 'react';
import {IonContent, IonHeader, IonPage} from "@ionic/react";
import InscriptionForm from "./InscriptionForm";

interface InscriptionProps {
    type: string
}

const Inscription: React.FC<InscriptionProps> = (props: InscriptionProps) => {
    const headerClass: string = props.type === 'professionnel' ?
        'header__container blue' : 'header__container';

    return (
        <IonPage>
            <IonHeader className={headerClass}>
                <h1>Inscription</h1>
            </IonHeader>
            <IonContent>
                <InscriptionForm type={props.type} />
            </IonContent>
        </IonPage>
    );
}

export default Inscription;