import React, {FormEventHandler} from "react";
import {useSelector} from "react-redux";
import {isSelectedClientCheckbox} from "../../store/selectors/AddAnnonceSelectors";

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
    categorie?:Array<object>
}

const ContactFormInput: React.FC<IContactFormInputProps> = (props: IContactFormInputProps) => {
    const error = props.errorSelector ? props.type==="client"? useSelector(props.errorSelector)["client"]:useSelector(props.errorSelector)[props.name] : null;
    const categorie:Array<Object>=props.categorie||[]


    if(props.type==="select"){
        return(
            <>
                <div className={props.classPrefix+" categorie"||""}>
                    <select required={props.required} name={"categorie"} onChange={props.handleChange}>
                        <option value={""}>{props.label}</option>
                        {
                            Object.keys(categorie).map((item:any,index:number)=>{
                                return(
                                    // @ts-ignore
                                    <option  key={index} value={categorie[index].id}>{categorie[index].libelle}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <p className={"inputGroup__error"}>{
                    error && error
                }</p>
            </>
        )
    }

    if (props.type === "norme") {
        return (
            <>
                <div className={props.classPrefix + " norme" || ""}>
                    <input className={'checkbox'} required={props.required} type={"checkbox"} name={props.name} onChange={props.handleChange}/>
                    <label form={props.name}>{props.label}</label>
                    <ul>
                        {

                            //@ts-ignore
                            Object.keys(props.input).map((item: any, index: number) => {
                                return (
                                    //@ts-ignore
                                    <li key={index}>{props.input[item]}</li>
                                )
                            })
                        }

                    </ul>
                </div>
                <p className={"inputGroup__error"}>{
                    error && error
                }</p>
            </>
        )
    }
    if (props.type === "client") {
        return (
            <>
                <div className={props.classPrefix || ""}>

                        <p>{props.label}</p>
                    {
                        //@ts-ignore
                        Object.keys(props.input).map((item: any, index: number) => {
                            //@ts-ignore
                            const isSelected=useSelector(isSelectedClientCheckbox(props.input[item].value))
                            return (
                                <div className={"checkbox__wrapper"} key={index}>
                                    {/*//@ts-ignore*/}
                                    <input type={"checkbox"} className={"checkbox"} checked={isSelected} name={props.input[item].name} value={props.input[item].value} onChange={props.handleChange}/>
                                    {/*@ts-ignore*/}
                                    <label form={props.input[item].name}>{props.input[item].label}</label>
                                </div>
                        )
                        })

                    }
                </div>
                <p className={"inputGroup__error"}>{
                    error && error
                }</p>
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