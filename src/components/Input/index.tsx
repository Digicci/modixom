import React, {FormEventHandler, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setInscriptionFocus} from "../../store/actions/inscriptionActions";
import Proposal from '../Proposal';
import "./input.scss";
import ICityProposal from "../../models/ICityProposal";
import ShowPasswordButton from "./ShowPasswordButton";
import {IonInput} from "@ionic/react";
import {Keyboard} from "@capacitor/keyboard";

interface IInputProps {
    type: string;
    fieldset?: any;
    name: string;
    required?: boolean;
    pattern?: string;
    label?: string;
    value?: any;
    error?: string;
    disabled?: boolean;
    errorSelector?: (state: any) => any;
    handleChange?: FormEventHandler;
    propositionSelector?: (state: any) => any;
    citySetter?: (city: ICityProposal) => { type: string, payload: typeof city };
}

// @ts-ignore
const Input: React.FC = (props: IInputProps) => {
    const error = props.errorSelector ? useSelector(props.errorSelector)[props.name] : null;
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = (): void => {
        setShowPassword(!showPassword)
    }

    const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement | HTMLIonInputElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "Enter") {
            Keyboard.hide().then();
        }
        console.log(e)
    }

    //control la popup de proposition de ville.
    const handleFocus = (e: any) => {
        const {name} = e.target
        dispatch(setInscriptionFocus(name))
    }
    //Si le type est radio, on affiche un fieldset
    if (props.type === 'radio') {
        const fieldset = props.fieldset;
        return (<fieldset className={"fieldSet"} name={props.name}>
                {//On boucle sur les éléments du fieldset
                    fieldset.map((item: any, index: number) => {
                        //On retourne un input radio
                        return (<div key={index} className={"fieldSet__radio"}>
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
                                    {`${item.label}${item.label === "M" ? "." : ""}`
                                        /*Ajout d'un "." à la fin de "M" uniquement*/}
                                </label>
                            </div>)
                    })}
            </fieldset>)
    }

    if (props.type === 'checkbox') {
        return (<div className={'inputGroup'}>
                <div className={"inputGroup__wrapper"}>
                    <input
                        value={props.value}
                        onChange={props.handleChange}
                        checked={props.value}
                        className={"inputGroup__wrapper__input"}
                        autoComplete={'off'}
                        onFocus={handleFocus}
                        disabled={props.disabled || false}
                        {...props}
                    />
                    <label className={"inputGroup__wrapper__label"}>{props.label}</label>
                </div>
                <p className={"inputGroup__error"}>{error && error}</p>
            </div>)
    }

    if (props.type === 'password') {
        return <div className={"inputGroup"}>
            <div className={"inputGroup__wrapper"}>
                <input
                    value={props.value}
                    onChange={props.handleChange}
                    className={"inputGroup__wrapper__input"}
                    onKeyUp={handleInputSubmit}
                    autoComplete={'off'}
                    placeholder={props.label}
                    id={props.name}
                    onFocus={handleFocus}
                    disabled={props.disabled || false}
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                />
                <label className={"inputGroup__wrapper__label"} htmlFor={props.name}>{props.label}</label>
                <ShowPasswordButton show={showPassword} toggleShow={toggleShowPassword}/>
            </div>
            <p className={"inputGroup__error"}>{error && error}</p>
        </div>
    }

    const className = `inputGroup${props.name === 'city' ? ' cityWrapper' : ''}`
    //Sinon, on retourne un input classique
    return (<div className={className}>
            <div className={"inputGroup__wrapper"}>
                <IonInput
                    value={props.value}
                    onInput={props.handleChange}
                    className={"inputGroup__wrapper__input"}
                    onKeyUp={handleInputSubmit}
                    placeholder={props.label}
                    id={props.name}
                    onFocus={handleFocus}
                    disabled={props.disabled || false}
                    label={props.label}
                    labelPlacement={"floating"}
                    {...props}
                />
            </div>
            {// @ts-ignore
                props.name === "city" &&
             <Proposal propositionSelector={props.propositionSelector || null} citySetter={props.citySetter || null}
                       classPrefix={'cityWrapper__container'}/>}

            <p className={"inputGroup__error"}>{error && error}</p>
        </div>)
}

export default Input;