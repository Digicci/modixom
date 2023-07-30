import React, {FormEventHandler} from "react";
import {useSelector} from "react-redux";
import "./input.scss";

interface IInputProps {
    type: string;
    fieldset?: any;
    name: string;
    required?: boolean;
    pattern?: string;
    label?: string;
    value?: any;
    error?: string;
    errorSelector: (state: any) => any;
    handleChange: FormEventHandler;
}

const Input: React.FC = (props: IInputProps) => {

    const error = useSelector(props.errorSelector)[props.name];

    //Si le type est radio, on affiche un fieldset
    if (props.type === 'radio') {
        const fieldset = props.fieldset;
        return (
            <fieldset className={"fieldSet"} name={props.name}>
                {
                    //On boucle sur les éléments du fieldset
                    fieldset.map((item: any, index: number) => {
                        //On retourne un input radio
                        return (
                            <div key={index} className={"fieldSet__radio"}>
                                <input
                                    type="radio"
                                    name={props.name}
                                    value={item.value}
                                    required={props.required}
                                    checked={props.value === item.value}
                                    onChange={props.handleChange}
                                    className={"fieldSet__radio__input"}
                                />
                                <label
                                    className={"fieldSet__radio__label"}
                                >
                                    {item.label}
                                </label>
                            </div>
                        )
                    })
                }
            </fieldset>
        )
    }

    //Sinon on retourne un input classique
    return (
        <div className={'inputGroup'}>
            <div className={"inputGroup__wrapper"}>
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    required={props.required}
                    onChange={props.handleChange}
                    className={"inputGroup__wrapper__input"}
                />
                <label className={"inputGroup__wrapper__label"}>{props.label}</label>
            </div>
            <p className={"inputGroup__error"}>{
                error && error
            }</p>
        </div>
    )
}

export default Input;