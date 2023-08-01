import React, {FormEventHandler} from "react";
<<<<<<< HEAD:src/pages/UnconnectedRoot/Inscription/InscriptionForm/Input/index.tsx
import {useSelector, useDispatch} from "react-redux";
import {getInscriptionError} from "../../../../../store/selectors/InscriptionSelectors";
import {setInscriptionFocus} from "../../../../../store/actions/inscriptionActions";
import Proposal from '../Proposal';
=======
import {useSelector} from "react-redux";
>>>>>>> 20737768ba54140c1d99cdb6df888e957ded7b3d:src/components/Input/index.tsx
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

<<<<<<< HEAD:src/pages/UnconnectedRoot/Inscription/InscriptionForm/Input/index.tsx
    const error = useSelector(getInscriptionError)[props.name];
    const dispatch = useDispatch()


    //controle la popup de proposition de ville.
    const handleFocus = (e) => {
        const {name} = e.target
        dispatch(setInscriptionFocus(name))
    }

=======
    const error = useSelector(props.errorSelector)[props.name];
>>>>>>> 20737768ba54140c1d99cdb6df888e957ded7b3d:src/components/Input/index.tsx

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

    const className = `inputGroup ${props.name === 'city' && 'cityWrapper'}`

    //Sinon on retourne un input classique
    return (
        <div className={'inputGroup'}>
            <div className={"inputGroup__wrapper"} style={{
                position: props.name === 'city' && 'relative'
            }}>
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    required={props.required}
                    onChange={props.handleChange}
                    className={"inputGroup__wrapper__input"}
                    autoComplete={'off'}
                    onFocus={handleFocus}
                    disabled={props.disabled || false}
                />
                <label className={"inputGroup__wrapper__label"}>{props.label}</label>
            </div>
            {
                (props.name === 'city') && <Proposal class={'cityWrapper__container'}/>
            }

            <p className={"inputGroup__error"}>{
                error && error
            }</p>
        </div>
    )
}

export default Input;