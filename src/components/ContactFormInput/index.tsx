import React, {FormEventHandler} from "react";

interface IContactFormInputProps {
    label: string;
    type: string;
    classPrefix?: string;
    name?: string;
    handleChange?: FormEventHandler;
}

const ContactFormInput: React.FC<IContactFormInputProps> = (props: IContactFormInputProps) => {
    if (props.type === "textarea") {
        return (
            <div className={props.classPrefix || ""}>
                <p>{props.label}</p>
                <textarea
                    name={props.name || props.label}
                    onChange={props.handleChange}
                />
            </div>
        )
    }
    return (
        <div className={props.classPrefix || ""}>
            <p>{props.label}</p>
            <input type={props.type}
                   name={props.name || props.label}
                   onChange={props.handleChange}
            />
        </div>
    )
}
export default ContactFormInput;