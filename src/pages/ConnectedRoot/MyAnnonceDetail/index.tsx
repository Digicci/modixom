import React, {useState} from "react";
import {IonContent, IonItem, IonLabel, IonPage} from "@ionic/react";
import Header from "../../../components/Header";
import "./MyAnnonceDetail.scss"
import AccountUpdatableInput from "../../../components/AccountUpdatableInput";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getMyAnnonceById} from "../../../store/selectors/myAnnonceSelectors";
import {FormField} from "../AddAnnonce/AddAnnonceForm/FormField";


const MyAnnonceDetail: React.FC = () => {
const [modif,setModif] =useState(false)
const params = useParams<{id:string}>();
const id =parseInt(params.id,10)
console.log(params)
    const toggleModif =()=>{
    setModif(!modif)
    }
    const handleChange=()=>{

    }

const test = useSelector(getMyAnnonceById(id))
    console.log(test)
    //get annoncesProfil parametre token:token
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
                            Object.keys(FormField).map((item:any,index:number)=>{
                                console.log(item)
                                return(
                                    <div key={index} className={"myAnnonceDetail__container__infoWrapper"}>
                                        <AccountUpdatableInput
                                            actualValue={test[item]}
                                            //@ts-ignore
                                            {...FormField[item]}
                                            classPrefix={"myAnnonceDetail__container__infoWrapper__name"}
                                            isUpdating={modif}
                                            handleChange={handleChange}
                                            newValue={""}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default MyAnnonceDetail