import React, {FormEventHandler} from "react";
import ContactFormInput from "../ContactFormInput";
import {IonButton, IonImg} from "@ionic/react";


interface IMyAnnoncesUdaptableInput {
    label: string;
    type: string;
    classPrefix?: string;
    name: string;
    required?: boolean,
    handleChange?: FormEventHandler;
    error?: string;
    errorSelector?: (state: any) => any;
    value?: string;
    actualValue?: string | Array<string>;
    input?: Object;
    categorie?: Array<object>;
    isUpdating: boolean;
    imgHandler?:()=>void;
    isSelectedCheckbox ?:(state:string)=>any;

}

const MyAnnoncesUpdatableInput: React.FC<IMyAnnoncesUdaptableInput> = (props: IMyAnnoncesUdaptableInput) => {


    if (props.type === "img") {
        console.log(props)
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
                        <p className={"label"}>{props.label}</p>
                    )
                }
                <IonImg
                    src={props.value || props.actualValue}
                    className={`${props.classPrefix}__logoContainer__logo`}
                    alt={"img"}
                />
            </div>
        )
    }

    if (props.type === "client") {
        console.log(props)
        return (
            <>
                <div className={props.classPrefix || ""} style={{
                    transition: "all 0.5s ease-in-out"
                }}>

                    {
                        props.isUpdating ? (
                                <ContactFormInput
                                    label={props.label}
                                    type={props.type} name={props.name}
                                    handleChange={props.handleChange}
                                    required={props.required}
                                    errorSelector={props.errorSelector}
                                    value={props.value}
                                    input={props.input || ""}
                                    isSelectedCheckbox={props.isSelectedCheckbox}
                                />
                            ) :
                            (
                                <>
                                    <p className={"label"}>{props.label}</p>
                                    <span>{props.actualValue ? props.actualValue.join(', ') : props.value?.join(', ') }</span>
                                </>
                            )
                    }

                </div>
            </>
        )
    }
    return (
        <>
        <div className={props.classPrefix || ""} style={{
            transition: "all 0.5s ease-in-out"
        }}>

            {
                props.isUpdating ? (
                        <ContactFormInput
                            label={props.label}
                            type={props.type} name={props.name}
                            handleChange={props.handleChange}
                            required={props.required}
                            errorSelector={props.errorSelector}
                            value={props.value || props.actualValue}
                            input={props.input || ""}
                            isSelectedCheckbox={props.isSelectedCheckbox}
                        />
                    ) :
                    (
                        <>
                            <p className={"label"}>{props.label}</p>
                            <span>{props.actualValue}</span>
                        </>
                    )
            }

        </div>
        </>
    )
}
export default MyAnnoncesUpdatableInput