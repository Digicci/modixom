import React, {useEffect, useState} from "react";
import {IonActionSheet, IonButton, IonContent, IonFooter, IonItem, IonLabel, IonPage} from "@ionic/react";
import Header from "../../../components/Header";
import "./MyAnnonceDetail.scss"
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    getMyAnnonceById,
    getMyAnnoncesDetailErrorState,
    getMyAnnoncesValues
} from "../../../store/selectors/myAnnonceSelectors";

import validator from "../../../utils/tools/validator";
import {setMyAnnonceDetail, setMyAnnonceDetailError} from "../../../store/actions/myAnnonceDetailAction";
import MyAnnoncesUdaptableInput from "../../../components/MyAnnoncesUdaptableInput";
import {FormFieldConfig} from "./FormFieldConfig";
import {useImageService} from "../../../services/ImageService";




const MyAnnonceDetail: React.FC = () => {
    const [modif, setModif] = useState(false)
    const [actionSheet, setActionSheet] = useState<boolean>(false);
    const imgService = useImageService();
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id)
    const annoncefind= useSelector(getMyAnnonceById(id))
    const [annonce,setAnnonce]=useState({})
    const dispatch = useDispatch()
    const annonceDetail=useSelector(getMyAnnoncesValues)
    //@ts-ignore a corriger
    const {validate,validateAll} = validator(FormFieldConfig, getMyAnnoncesValues, setMyAnnonceDetailError)
    useEffect(() => {
        const annonceConstruc={
            titre: annoncefind.titre,
            descriptif: annoncefind.description,
            categorie: "",
            dateHeureDebut: "",
            dateHeureFin: "",
            norme: false,
            client: [],
            quantite: 0,
            logo: annoncefind.images,
            prix: annoncefind.prix,
            pourcent: annoncefind.pourcentRemise
        }
        setAnnonce(annonceConstruc)

    }, []);


    useEffect(() => {
        Object.keys(annonce).map((item:any)=>{
            //@ts-ignore
            dispatch(setMyAnnonceDetail(item,annonce[item]))
        })
    }, [annonce]);

    const toggleModif = () => {
        setModif(!modif)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target
        const fieldValue =
            name === "norme" ?
                checked :
                value
        dispatch(setMyAnnonceDetail(name, fieldValue))
        validate(name, fieldValue)
    }

    const actionSheetButton = {
        text: 'Ouvrir la galerie',
        handler: () => {
            setActionSheet(false);
            imgService.pickImage().then((res) => {
                if (typeof res.dataUrl === "string") {
                    dispatch(setMyAnnonceDetail("logo", res.dataUrl!))
                }
            })
        }
    }
    const handleImgChange = () => {
        setActionSheet(true)
    }

    const handleSubmit=()=>{
       const errors = validateAll()
        if(errors.length===0){
            console.log(annonceDetail)
        }
    }



    return (
        <>
            <IonPage>
                <Header text={"annonces diffusées"} canGoBack={true} defaultHref={"/user/myAnnonces"}/>
                <IonContent className={"myAnnonceDetail"}>
                    <div className={"myAnnonceDetail__container"}>
                        <IonItem detail={false} lines={"none"} onClick={toggleModif}>
                            <IonLabel slot={"end"}>
                                {
                                    modif ? "Annuler" : "Modifier"
                                }
                            </IonLabel>
                        </IonItem>
                        {
                            Object.keys(FormFieldConfig).map((item: any, index: number) => {

                                if(item==="logo"){

                                    return (
                                        //@ts-ignore
                                        <MyAnnoncesUdaptableInput isUpdating={modif} key={index} {...FormFieldConfig[item]}

                                                                  value={annonceDetail[item]}
                                                                  errorSelector={getMyAnnoncesDetailErrorState}
                                            //@ts-ignore
                                                                  actualValue={annonce[item]}
                                                                  imgHandler={handleImgChange}

                                        />
                                    )
                                }

                                return (
                                    // @ts-ignore
                                    <MyAnnoncesUdaptableInput isUpdating={modif} key={index} {...FormFieldConfig[item]}
                                                              handleChange={handleChange}
                                                              value={annonceDetail[item]}
                                                              errorSelector={getMyAnnoncesDetailErrorState}
                                                              //@ts-ignore
                                                              actualValue={annonce[item]}

                                    />
                                )
                            })
                        }
                    </div>
                    <IonActionSheet
                        isOpen={actionSheet}
                        onDidDismiss={() => {
                            setActionSheet(false)
                        }}
                        header={'Changer de logo'}
                        buttons={[actionSheetButton]}
                    />
                    {
                        modif && (
                            <IonFooter className={'validateButtonContainer'}>
                                <IonButton className={'validateButton'} onClick={handleSubmit}>Valider</IonButton>
                            </IonFooter>
                        )
                    }
                </IonContent>
            </IonPage>
        </>
    )
}

export default MyAnnonceDetail