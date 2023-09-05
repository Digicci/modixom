import React, {FormEventHandler} from "react";
import ContactFormInput from "../ContactFormInput";


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
    actualValue?: string;
    input?: Object;
    categorie?: Array<object>;
    isUpdating: boolean;

}

const MyAnnoncesUpdatableInput: React.FC<IMyAnnoncesUdaptableInput> = (props: IMyAnnoncesUdaptableInput) => {


    return (
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
                        />
                    ) :
                    (
                        <>
                            <p>{props.label}</p>
                            <span>{props.actualValue}</span>
                        </>
                    )
            }

        </div>
    )
}
export default MyAnnoncesUpdatableInput