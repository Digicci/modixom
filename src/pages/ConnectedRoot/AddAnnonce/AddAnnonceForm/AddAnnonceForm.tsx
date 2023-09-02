import React, {useEffect} from "react";
import {FormField} from "./FormField";
import {IonActionSheet, IonButton, IonFooter, useIonRouter} from "@ionic/react";
import ContactFormInput from "../../../../components/ContactFormInput";
import {useDispatch, useSelector} from "react-redux";
import {setAddAnnonceError, setAddAnnonceField} from "../../../../store/actions/addAnnonceAction";
import validator from "../../../../utils/tools/validator";
import {getAddAnnonceError, getAddAnnonceValues} from "../../../../store/selectors/AddAnnonceSelectors";
import {getCategoryCollection} from "../../../../store/selectors/CategorySelectors";
import {useApi} from "../../../../services/ApiService";
import {endpoints} from "../../../../constants";
import ICategory from "../../../../models/ICategory";
import {setCategoryCollection} from "../../../../store/actions/categoryActions";
import {useImageService} from "../../../../services/ImageService";
import {getUserToken} from "../../../../store/selectors/UserSelectors";

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
    const {push}=useIonRouter();
    const [imgMessage, setImgMessage] = React.useState<IImgMessage>({
        message: "Aucune image sélectionnée",
        errored: true
    });
    const [showActionSheet, setShowActionSheet] = React.useState(false);
    const api = useApi()
    useEffect(() => {
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res: ICategory[]) => {
            dispatch(setCategoryCollection(res))
        })

    }, [])

    const userToken = useSelector(getUserToken)

    const imgActionSheetButtons = [
        {
            text: 'Ouvrir la galerie',
            handler: () => {
                imgService.pickImage().then((res) => {
                    if(typeof res.dataUrl==="string") {
                        dispatch(setAddAnnonceField("logo", res.dataUrl!))
                        setImgMessage({
                            message: "Image sélectionnée",
                            errored: false
                        })
                    }
                })
            }
        }
    ]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target
        console.log(name, value)
        const fieldValue =
            name === "norme" ?
                checked :
                value
        dispatch(setAddAnnonceField(name, fieldValue))
        validate(name, fieldValue)
    }
    const handleSubmit = () => {
        const errors = validateAll()
        push("/addAnnonce/valider","forward")
        if (errors.length === 0) {
             api.post(endpoints.postAnnonce, data, {token: userToken}).then((res) => {
                 console.log(res)
             })
        }
    }

    useEffect(()=>{
        validateAll()
    }, [data])
    return (
        <>
            <div className={"addAnnonce__container__form"}>
                {

                    Object.keys(FormField).map((item: any, index: number) => {
                        if (item === "categorie") {
                            return (
                                <>
                                    <ContactFormInput
                                        key={index}
                                        //@ts-ignore
                                        {...FormField[item]}
                                        categorie={categoryCollection}
                                        handleChange={handleChange}
                                        errorSelector={getAddAnnonceError}
                                        classPrefix={"addAnnonce__container__form__wrapper"}
                                    />
                                    <div className={'logo__wrapper'}>
                                        <p className={`logo__wrapper__text ${imgMessage.errored ? 'error' : 'success'}`}>{imgMessage.message}</p>
                                        <IonButton onClick={() => setShowActionSheet(true)}>ajouter une photo produit</IonButton>
                                    </div>
                                </>
                            )
                        } else {
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
                        }


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