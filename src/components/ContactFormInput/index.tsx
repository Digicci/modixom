import React, {FormEventHandler} from "react";
import {useSelector} from "react-redux";

interface IContactFormInputProps {
    label: string;
    type: string;
    classPrefix?: string;
    name: string;
    required?: boolean,
    handleChange?: FormEventHandler;
    error?: string;
    errorSelector?: (state: any) => any;
}

const ContactFormInput: React.FC<IContactFormInputProps> = (props: IContactFormInputProps) => {
    const error = props.errorSelector ? useSelector(props.errorSelector)[props.name] : null;
    if (props.type === "textarea") {
        return (
            <>
                <div className={props.classPrefix || ""}>
                    <p>{props.label}</p>
                    <textarea
                        name={props.name || props.label}
                        onChange={props.handleChange}
                    />
                </div>
                <p className={"inputGroup__error"}>{
                    error && error
                }</p>
            </>
        )
    }
    return (
        <>
            <div className={props.classPrefix || ""}>
                <p>{props.label}</p>
                <input type={props.type}
                       name={props.name || props.label}
                       onChange={props.handleChange}
                       required={props.required}
                />
            </div>
            <div>
                <p className={"inputGroup__error"}>{
                    error && error
                }</p>
            </div>
        </>

    )
}
export default ContactFormInput;