import React from 'react';
import {IonContent, IonHeader, IonPage} from "@ionic/react";
import InscriptionForm from "./InscriptionForm";
import {generateHeaderClassName} from "../../../utils/tools/classNameGenerator";

interface InscriptionProps {
    type: string
}

const Inscription: React.FC<InscriptionProps> = (props: InscriptionProps) => {
    const isPro: boolean = props.type === 'professionnel';
    const headerClass: string = generateHeaderClassName(isPro);

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