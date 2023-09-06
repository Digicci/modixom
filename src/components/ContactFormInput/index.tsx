import React, {FormEventHandler, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {isSelectedClientCheckbox} from "../../store/selectors/AddAnnonceSelectors";
import {IonItem, IonSelect, IonSelectOption} from "@ionic/react";
import {endpoints} from "../../constants";
import ICategory from "../../models/ICategory";
import {setCategoryCollection} from "../../store/actions/categoryActions";
import {useApi} from "../../services/ApiService";
import {getCategoryCollection} from "../../store/selectors/CategorySelectors";

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
    categorie?:Array<object>;
    isSelectedCheckbox?:(state:string)=>any
}

const ContactFormInput: React.FC<IContactFormInputProps> = (props: IContactFormInputProps) => {
    const error = props.errorSelector ? props.type==="client"? useSelector(props.errorSelector)["client"]:useSelector(props.errorSelector)[props.name] : null;

    const dispatch = useDispatch();

    const api = useApi();
    const categoryCollection=useSelector(getCategoryCollection);

    const fetchCategorie=()=>{
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res: ICategory[]) => {
            dispatch(setCategoryCollection(res))
        })
    }
    useEffect(() => {
        fetchCategorie()
    }, []);
    const categorie:Array<Object>=props.categorie||categoryCollection;


    if(props.type==="select"){
        return(
            <>
                <IonItem className={props.classPrefix+" categorie"||""}>
                    {/*@ts-ignore*/}
                    <IonSelect label={props.label} required={props.required} name={"categorie"} onIonChange={props.handleChange}>
                        {

                            Object.keys(categorie).map((item:any,index:number)=>{
                                return(
                                    // @ts-ignore
                                    <IonSelectOption  key={index} value={categorie[index].id}>{categorie[index].libelle}</IonSelectOption>
                                )
                            })
                        }
                    </IonSelect>
                </IonItem>
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
                            const isSelected=useSelector(props.isSelectedCheckbox(props.input[item].value))
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
                        value={props.value}
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
                       name={props.name}
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