import React from 'react';
import {IonContent, IonPage} from "@ionic/react";
import InscriptionForm from "./InscriptionForm";
import {clientTypes} from "../../../constants";
import Header from "../../../components/Header";

interface InscriptionProps {
    type: string
}

const Inscription: React.FC<InscriptionProps> = (props: InscriptionProps) => {
    const isPro: boolean = props.type === clientTypes.pro;

    return (
        <IonPage>
            <Header text={'Inscription'} canGoBack={true} pro={isPro} />
            <IonContent>
                <InscriptionForm type={props.type} />
            </IonContent>
        </IonPage>
    );
}

export default Inscription;