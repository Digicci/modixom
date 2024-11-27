import React, {useEffect, useState} from "react";
import {FormField} from "./FormField";
import {IonActionSheet, IonButton, IonFooter, IonToast, useIonRouter} from "@ionic/react";
import ContactFormInput from "../../../../components/ContactFormInput";
import {useDispatch, useSelector} from "react-redux";
import {resetAddAnnonceForm, setAddAnnonceError, setAddAnnonceField} from "../../../../store/actions/addAnnonceAction";
import validator from "../../../../utils/tools/validator";
import {
    getAddAnnonceError,
    getAddAnnonceValues, isBoosted,
    isSelectedClientCheckbox
} from "../../../../store/selectors/AddAnnonceSelectors";
import {getCategoryCollection} from "../../../../store/selectors/CategorySelectors";
import {useApi} from "../../../../services/ApiService";
import {endpoints} from "../../../../constants";
import ICategory from "../../../../models/ICategory";
import {setCategoryCollection} from "../../../../store/actions/categoryActions";
import {useImageService} from "../../../../services/ImageService";
import {getUserToken} from "../../../../store/selectors/UserSelectors";
import {useIonToast} from "@ionic/react";

interface IImgMessage {
    message: string;
    errored: boolean;
}


const AddAnnonceForm: React.FC = () => {
    const dispatch = useDispatch()
    const {validate, validateAll} = validator(FormField, getAddAnnonceValues, setAddAnnonceError)
    const data = useSelector(getAddAnnonceValues)
    const categoryCollection = useSelector(getCategoryCollection);
    const imgService = useImageService();
    const {push} = useIonRouter();

    // contrôle du toast d'envoi en cours, si true le toast est ouvert et le bouton de soumission est bloqué
    const [isOpenToast, setIsOpenToast] = useState(false)

    const initialImgMessage = {
        message: "Aucune image sélectionnée",
        errored: true
    }
    const imgMessages : {initial: IImgMessage, success: IImgMessage} = {
        initial: initialImgMessage,
        success: {
            message: "Image sélectionnée",
            errored: false
        }
    }
    const [imgMessage, setImgMessage] = React.useState<IImgMessage>(initialImgMessage);
    const [showActionSheet, setShowActionSheet] = React.useState(false);
    const api = useApi()
    const [present] = useIonToast();

    useEffect(() => {
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res: ICategory[]) => {
            dispatch(setCategoryCollection(res))
        })
        return () => {
            dispatch(resetAddAnnonceForm())
        }
    }, [])

    useEffect(() => {
        data.logo ? setImgMessage(imgMessages.success) : setImgMessage(imgMessages.initial)
    }, [data.logo]);

    const userToken = useSelector(getUserToken)

    const imgActionSheetButtons : {
        text: string;
        handler: () => void;
    }[] = [
        {
            text: 'Ouvrir la galerie',
            handler: () : void => {
                imgService.pickImage().then(async (res) : Promise<void> => {
                    if (res) {
                        if (typeof res.dataUrl === "string") {
                            dispatch(setAddAnnonceField("logo", res.dataUrl))
                            setImgMessage({
                                message: "Image sélectionnée",
                                errored: false
                            })
                        }
                    } else {
                        await present({
                            message: "Une erreur est survenue lors du chargement de l'image",
                            duration: 2000,
                            color: "danger",
                        })
                    }
                })
            }
        }
    ]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value, checked} = e.target
        const fieldValue : string | boolean =
            name === "norme" ?
                checked :
                value
        dispatch(setAddAnnonceField(name, fieldValue))
        validate(name, fieldValue)
    }

    useEffect(() => {
        validate("client", data.client)
    }, [data.client]);
    const handleSubmit = () : void => {
        const errors : string[] = validateAll()
        if (errors.length === 0) {
            setIsOpenToast(true)
            api.post(endpoints.postAnnonce, data, {token: userToken}).then(async (res) : Promise<void> => {
                setIsOpenToast(false)
                if (res.message === "Annonce ajoutée") {
                    await present({
                        message: "Annonce ajoutée",
                        duration: 2000,
                        color: "success"
                    })
                    push("/addAnnonce/valider", "forward")
                } else {
                    await present({
                        message: "Une erreur est survenue lors de la création de l'annonce",
                        duration: 2000,
                        color: "danger"
                    })
                }
            })
        }
    }
    return (
        <>
            <div className={"addAnnonce__container__form"}>
                {

                    Object.keys(FormField).map((item: any, index: number) => {
                        if (item === "categorie") {
                            return (
                                <div key={index}>
                                    <ContactFormInput
                                        //@ts-ignore
                                        {...FormField[item]}
                                        categorie={categoryCollection}
                                        handleChange={handleChange}
                                        errorSelector={getAddAnnonceError}
                                        classPrefix={"addAnnonce__container__form__wrapper"}
                                    />
                                    <div className={'logo__wrapper'}>
                                        <p className={`logo__wrapper__text ${imgMessage.errored ? 'error' : 'success'}`}>{imgMessage.message}</p>
                                        <IonButton expand={"block"} onClick={() => setShowActionSheet(true)}>Ajouter une photo du
                                            produit</IonButton>
                                    </div>
                                </div>
                            )
                        }
                        if (item === "client") {
                            return (
                                <ContactFormInput
                                    key={index}
                                    //@ts-ignore
                                    {...FormField[item]}
                                    handleChange={handleChange}
                                    errorSelector={getAddAnnonceError}
                                    classPrefix={"addAnnonce__container__form__wrapper"}
                                    isSelectedCheckbox={isSelectedClientCheckbox}
                                />
                            )
                        }
                        if (item === "booster") {
                            return (
                                <ContactFormInput
                                    key={index}
                                    //@ts-ignore
                                    {...FormField[item]}
                                    handleChange={handleChange}
                                    errorSelector={getAddAnnonceError}
                                    classPrefix={"addAnnonce__container__form__wrapper"}
                                    isSelectedCheckbox={isBoosted}
                                />
                            )
                        }
                        return (
                            <ContactFormInput
                                key={index}
                                //@ts-ignore
                                {...FormField[item]}
                                value={data[item]}
                                handleChange={handleChange}
                                errorSelector={getAddAnnonceError}
                                classPrefix={"addAnnonce__container__form__wrapper"}
                            />
                        )


                    })
                }
            </div>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                header={'Ajouter une photo produit'}
                buttons={imgActionSheetButtons}
            />
            <IonToast
                isOpen={isOpenToast}
                message={"Annonce en cours d'ajout."}
                color={"light"}
            />
            <IonFooter>
                <IonButton className={'validateButton'} disabled={isOpenToast} onClick={handleSubmit}>valider</IonButton>
            </IonFooter>
        </>

    )
}
export default AddAnnonceForm;