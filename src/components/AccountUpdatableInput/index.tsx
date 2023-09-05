import React, {FormEventHandler} from "react";
import {IonButton, IonImg} from "@ionic/react";
import Input from "../Input";
import ICityProposal from "../../models/ICityProposal";


interface IAccountUpdatableInputProps {
    actualValue?: string;
    newValue?: string | number | null | undefined;
    label: string;
    type: string;
    classPrefix?: string;
    isUpdating: boolean;
    name?: string;
    propositionSelector?: (state: any) => any;
    citySetter?: (city: ICityProposal) => { type: string, payload: typeof city };
    handleChange?: FormEventHandler;
    imgHandler?: () => void;
    errorSelector?: (state: any) => any;
}
const AccountUpdatableInput: React.FC<IAccountUpdatableInputProps> = (props:IAccountUpdatableInputProps) => {

    if (props.type === "img") {
        return (
            <div className={`${props.classPrefix}__logoContainer`} style={{
                transition: "all 0.5s ease-in-out"
            }}>
                {
                    props.isUpdating ? (
                        <IonButton
                            className={`${props.classPrefix}__logoContainer__button`}
                            onClick={props.imgHandler}
                        >Changer le {props.label}</IonButton>
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
                        placeholder={props.actualValue || ''}
                        name={props.name ? props.name : props.label}
                        propositionSelector={props.propositionSelector || null}
                        citySetter={props.citySetter || null}
                        handleChange={props.handleChange || null}
                        value={props.newValue}
                        errorSelector={props.errorSelector || null}
                    />
                ) : (
                    <span>{props.actualValue}</span>
                )
            }
        </div>
    )
}

export default AccountUpdatableInput;