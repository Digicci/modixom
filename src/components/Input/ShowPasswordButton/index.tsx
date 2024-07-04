// path : src/components/Input/showPasswordButton/index.tsx
import "./style.scss";
import React from 'react'
import {IonButton, IonIcon} from "@ionic/react";
import {eye, eyeOff} from "ionicons/icons";

interface IshowPasswordButton {
    show: boolean;
    toggleShow: () => void;
}

const ShowPasswordButton: React.FC<IshowPasswordButton> = ({show, toggleShow}) => {

    return <IonButton className={"showPasswordButton"} fill={"clear"} slot={"end"} aria-label={"show/hide"} onClick={toggleShow}>
        <IonIcon className={"showPasswordButton__icon"} slot={"icon-only"} icon={show ? eyeOff: eye}></IonIcon>
    </IonButton>
}

export default ShowPasswordButton