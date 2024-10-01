import React, {useEffect} from "react";
import "./addAnnonceValidate.scss";
import {IonButton, IonContent, IonPage, useIonRouter} from "@ionic/react";
import Header from "../../../components/Header";
import {useDispatch, useSelector} from "react-redux";
import {getAddAnnonceValues} from "../../../store/selectors/AddAnnonceSelectors";
import {resetAddAnnonceForm} from "../../../store/actions/addAnnonceAction";


const AddAnnonceValidate: React.FC=()=>{
    const {push} =useIonRouter()
    const addAnnonce= useSelector(getAddAnnonceValues)
    const dateHeureDebut = addAnnonce.dateHeureDebut.split("T");
    dateHeureDebut[0]= new Date(dateHeureDebut[0]).toLocaleDateString("fr")
    dateHeureDebut[1]= dateHeureDebut[1].replace(":","H")
    const  dateHeureFin = addAnnonce.dateHeureFin.split('T');
    dateHeureFin[0]= new Date(dateHeureFin[0]).toLocaleDateString("fr")
    dateHeureFin[1] =dateHeureFin[1].replace(":","H")
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(resetAddAnnonceForm())
        }
    }, []);




    return(
        <IonPage className={"addAnnonceValide"}>
            <Header text={"annonce validée"}/>
            <IonContent >
                <div className={"addAnnonceValide__container"}>
                    <h2>Merci pour votre confiance</h2>
                    <p>Votre annonce a bien été prise en compte et sera diffusée à partir du
                        <span>{` ${dateHeureDebut[0]} à ${dateHeureDebut[1]} `}</span>
                         jusqu&apos;au
                        <span>{` ${dateHeureFin[0]} à ${dateHeureFin[1]} `}</span>
                        .
                    </p>
                    <IonButton onClick={()=>{push("/addAnnonce","back")}}>Passer une nouvelle annonces</IonButton>

                    <p>crédit restant : <span>........</span></p>
                    <IonButton>charger mon crédit</IonButton>

                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddAnnonceValidate;