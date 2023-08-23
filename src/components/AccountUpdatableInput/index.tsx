import React from "react";
import {IonButton, IonImg} from "@ionic/react";
import Input from "../Input";


interface IAccountUpdatableInputProps {
    actualValue: string;
    label: string;
    type: string;
    classPrefix?: string;
    isUpdating: boolean;
    name?: string;
}
const AccountUpdatableInput: React.FC<IAccountUpdatableInputProps> = (props:IAccountUpdatableInputProps) => {

    if (props.type === "img") {
        return (
            <div className={`${props.classPrefix}__logoContainer`} style={{
                transition: "all 0.5s ease-in-out"
            }}>
                {
                    props.isUpdating ? (
                        <IonButton className={`${props.classPrefix}__logoContainer__button`}>Changer le {props.label}</IonButton>
                    ) : (
                        <p>{props.label}</p>
                    )
                }
                <IonImg
                    src={props.actualValue}
                    className={`${props.classPrefix}__logoContainer__logo`}
                    alt={"img"}
                />
            </div>
        )
    }

    return (
        <div className={props.classPrefix || ''} style={{
            transition: "all 0.5s ease-in-out"
        }}>
            <p>{props.label}</p>
            {
                props.isUpdating ? (
                    <Input
                        // @ts-ignore
                        type={props.type}
                        placeholder={props.actualValue}
                        name={props.name ? props.name : props.label}
                    />
                ) : (
                    <span>{props.actualValue}</span>
                )
            }
        </div>
    )
}

export default AccountUpdatableInput;