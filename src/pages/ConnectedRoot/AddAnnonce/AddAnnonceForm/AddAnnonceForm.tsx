import React, {useEffect} from "react";
import {FormField} from "./FormField";
import {IonActionSheet, IonButton, IonFooter, useIonRouter} from "@ionic/react";
import ContactFormInput from "../../../../components/ContactFormInput";
import {useDispatch, useSelector} from "react-redux";
import {setAddAnnonceError, setAddAnnonceField} from "../../../../store/actions/addAnnonceAction";
import validator from "../../../../utils/tools/validator";
import {
    getAddAnnonceError,
    getAddAnnonceValues,
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
    const [imgMessage, setImgMessage] = React.useState<IImgMessage>({
        message: "Aucune image sélectionnée",
        errored: true
    });
    const [showActionSheet, setShowActionSheet] = React.useState(false);
    const api = useApi()
    const [present] = useIonToast();

    useEffect(() => {
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res: ICategory[]) => {
            dispatch(setCategoryCollection(res))
        })

    }, [])

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
                            color: "danger"
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
    const handleSubmit = () : void => {
        const errors : string[] = validateAll()
        if (errors.length === 0) {
            api.post(endpoints.postAnnonce, data, {token: userToken}).then(async (res) : Promise<void> => {
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

    useEffect(() : void => {
        validateAll()
    }, [data])
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
                                        <IonButton onClick={() => setShowActionSheet(true)}>ajouter une photo
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
                        return (
                            <ContactFormInput
                                key={index}
                                //@ts-ignore
                                {...FormField[item]}
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
            <IonFooter>
                <IonButton className={'validateButton'} onClick={handleSubmit}>valider</IonButton>
            </IonFooter>
        </>

    )
}
export default AddAnnonceForm;