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
    value?: string;
    input?: Object;
}

const ContactFormInput: React.FC<IContactFormInputProps> = (props: IContactFormInputProps) => {
    const error = props.errorSelector ? useSelector(props.errorSelector)[props.name] : null;
    if (props.type === "norme") {
        return (
            <>
                <div className={props.classPrefix || ""}>
                    <input required={props.required} type={"checkbox"} name={props.name} onChange={props.handleChange}/>
                    <label form={props.name}>{props.label}</label>
                    <ul>
                        {

                            //@ts-ignore
                            Object.keys(props.input).map((item: any, index: number) => {
                                console.log(item)
                                return (
                                    //@ts-ignore
                                    <li key={index}>{props.input[item]}</li>
                                )
                            })
                        }

                    </ul>
                </div>
            </>
        )
    }
    if (props.type === "client") {
        console.log(props.input)
        return (
            <>
                <div className={props.classPrefix || ""}>
                    {
                        //@ts-ignore
                        Object.keys(props.input).map((item: any, index: number) => {
                            return (
                                <div className={"checkbox__wrapper"} key={index}>
                                    <input type={"checkbox"} name={props.name} onChange={props.handleChange}/>
                                    {/*@ts-ignore*/}
                                    <label form={props.name}>{props.input[item].label}</label>
                                </div>
                        )
                        })
                    }

                </div>
            </>
        )
    }
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
                       value={props.value}
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