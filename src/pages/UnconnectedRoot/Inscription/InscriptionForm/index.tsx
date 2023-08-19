import React from "react";
import './inscriptionForm.scss';
import {useIonToast, useIonRouter, IonButton, IonActionSheet} from "@ionic/react";
import Input from "../../../../components/Input";
import {FormFields} from "./FormConfig";
import {useSelector, useDispatch} from "react-redux";
import {getInscriptionValues} from "../../../../store/selectors/InscriptionSelectors";
import {endpoints} from "../../../../constants";

import {
    setInscriptionField,
    setCityProposal,
    resetInscriptionFields
} from "../../../../store/actions/inscriptionActions";

import {getInscriptionError} from "../../../../store/selectors/InscriptionSelectors";

import validator from "../../../../utils/tools/validator";
import {useApi} from "../../../../services/ApiService";
import {useImageService} from "../../../../services/ImageService";

interface InscriptionFormProps {
    type: string
}

const InscriptionForm: React.FC<InscriptionFormProps> = (props: InscriptionFormProps) => {
    const api = useApi();
    const [present] = useIonToast();
    const [showActionSheet, setShowActionSheet] = React.useState(false);
    const imgService = useImageService();
    // La methode "push" permet de naviguer vers une autre page,
    // elle s'attend à recevoir un string qui correspond au chemin de la page en premier paramètre
    // un second string qui correspond au sens de navigation (forward, back, root)
    // une troisième string qui correspond à l'action à effectuer au niveau de l'historique (replace, push (default))
    // deux autres paramètres optionnels qui correspondent aux options de navigation et à une transition personnalisée

    const {push} = useIonRouter();

    const {validate, validateAll} = validator(FormFields, getInscriptionValues)

    const dispatch = useDispatch();
    const data = useSelector(getInscriptionValues);
    const cityError = useSelector(getInscriptionError).noCityId;

    //On handle le changement de valeur d'un input
    // eslint-disable-next-line no-undef
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        //dispatch de l'action
        dispatch(setInscriptionField(name, value));
        //validation des données
        validate(name, value);
        //Si le champ modifier s'appelle city on execute la fonction handleCityChange
        if (name === 'city') {
            handleCityChange(value);
        }
    }

    const handleCityChange = async (value: string) => {
        if (value.length > 2) {
            const response = await api.get(endpoints.city, {q: value});
            dispatch(setCityProposal(response));
        } else {
            dispatch(setCityProposal([]))
        }
        dispatch(setInscriptionField("postalCode", ''))
    }
    const imgActionSheetButtons = [
        {
            text: 'Ouvrir la galerie',
            handler: () => {
                imgService.pickImage().then((res) => {
                    console.log(res);
                })
            }
        }
    ]

    // eslint-disable-next-line no-undef
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errors = validateAll();
        if (Object.keys(errors).length === 0) {
            // eslint-disable-next-line no-unused-vars
            const {passwordConfirmation, mailConfirmation, city, ...rest} = data;
            api.post('/inscription', {...rest, type: props.type}).then((res) => {
                //@ts-ignore
                present({
                    message: res.message,
                    duration: 3000,
                    color: "success",
                    position: "bottom"
                }).then(() => {
                    push('/connexion', 'root', 'replace');
                })
            }).catch((err) => {
                //@ts-ignore
                present({
                    message: err.message,
                    duration: 3000,
                    color: "danger",
                    position: "bottom"
                }).then(() => {
                    if (err.message.includes('L\'email existe déjà')) {
                        dispatch(resetInscriptionFields());
                        push('/connexion', 'root', 'replace');
                    }
                })
            })
        } else {
            // Ligne suivante ignorée par typescript car le type de present est inconnu
            //@ts-ignore
            present({
                message: "Les champs ne sont pas correctement remplis.",
                duration: 3000,
                color: "danger",
                position: "bottom"
            });
        }
    }

    if (props.type === 'professionnel') {
        FormFields.siret = {
            name: 'siret',
            label: 'Siret',
            type: 'text',
            placeholder: 'Siret',
            required: true,
            errorMessages: 'Le siret est obligatoire',
            pattern: "^[0-9]{14}$"
        }

        FormFields.socialReason = {
            name: 'socialReason',
            label: 'Raison sociale',
            type: 'text',
            placeholder: 'Raison sociale',
            required: true,
            errorMessages: 'La raison sociale est obligatoire',
            pattern: "^[a-zA-Z0-9]{2,}$"
        }
    } else {
        delete FormFields.siret;
        delete FormFields.socialReason;
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                props.type === 'professionnel' && (
                    <>
                        <div className={'inscriptionPro__container'}>
                            <Input
                                handleChange={handleChange}
                                // @ts-ignore
                                value={data.siret}
                                // @ts-ignore
                                {...FormFields.siret}
                                // @ts-ignore
                                errorSelector={getInscriptionError}
                            />
                            <Input
                                handleChange={handleChange}
                                // @ts-ignore
                                value={data.socialReason}
                                // @ts-ignore
                                {...FormFields.socialReason}
                                // @ts-ignore
                                errorSelector={getInscriptionError}
                            />
                        </div>
                        <div className={'logo__wrapper'}>
                            <label htmlFor="logo">Logo</label>
                            <IonButton onClick={() => setShowActionSheet(true)}>importer un logo</IonButton>
                        </div>
                    </>
                )
            }
            <div className={'form__wrapper'}>
                {
                    Object.keys(FormFields).map((item: string, index: number) => {
                        if (item === 'siret' || item === 'socialReason') {
                            return null;
                        }
                        return (
                            <Input
                                key={index}
                                handleChange={handleChange}
                                // @ts-ignore
                                value={data[FormFields[item].name]}
                                // @ts-ignore
                                {...FormFields[item]}
                                errorSelector={getInscriptionError}
                            />
                        )
                    })
                }
                <div className={'inputGroup'}>
                    <div className={"inputGroup__wrapper"}>
                        <input
                            type="submit"
                            value={"Je valide"}
                            className={"inputGroup__wrapper__input"}
                        />
                    </div>
                </div>
                {
                    cityError &&
                    <p className={'city__error'}>Merci de sélectionner une ville dans la liste des propositions.</p>
                }
            </div>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                header={'Ajouter un logo'}
                buttons={imgActionSheetButtons}
            />
        </form>
    );
}

export default InscriptionForm;