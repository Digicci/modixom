import React, {useState} from "react";
import "./deleteAccount.scss"
import {IonBackButton, IonButton, IonContent, IonFooter, IonHeader, IonPage} from "@ionic/react";
import {useSelector} from "react-redux";
import {isUserPro} from "../../../store/selectors/UserSelectors";
import {generateHeaderClassName} from "../../../utils/tools/classNameGenerator";

const DeleteAccount: React.FC = () => {

    const isPro:boolean = useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro);
    const [checked,setChecked]=useState<boolean>(false);
    const [error,setError]=useState<boolean>(false);

    const handleChange = ():void=>{
        setChecked(!checked);
    }
    const deleteUser:()=>void = ():void =>{
        if(checked !=true){
            setError(true);
        }else{
            setError(false);
            //TODO ajouter la requete vers l'api pour supprimer l'utilisateur
            console.log("ok")
        }

    }
    return (
        <IonPage className={"deleteAccount"}>
            <IonHeader className={headerClass}>
                <IonBackButton defaultHref={'/user'} className={'header__back__button'}/>
                <h1>SUPPRIMER MON COMPTE</h1>
            </IonHeader>
            <IonContent>
                <div className={"deleteAccount__container"}>
                    <div className={"deleteAccount__container__textContainer"}>
                        <h2>VOUS ALLEZ COMMENCER LE PROCESSUS DE SUPPRESSION DE VOTRE COMPTE</h2>
                        <p>
                            Vous êtes sur le point de nous demander de fermer de maniére définitive
                            votre compte est de supprimer vos données. Une fois votre compte fermé,
                            tous les services auxquels vous accédez par le biais de votre compte
                            ne seront plus disponibles.
                        </p>
                        <div className={"deleteAccount__container__textContainer__checkbox"}>
                            <input type={"checkbox"} id={"deleteAccountButton"} onChange={handleChange}/>
                            <label htmlFor={"deleteAccountButton"}>OUI,JE SOUHAITE FERMER DEFINITEVEMENT MON COMPTE ET SUPPRIMER MES DONNÉES</label>
                            {error && <p>* Veuillez cocher la case</p>}
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonFooter className={'deleteAccount__footer'}>
                <IonButton expand={'full'} className={'deleteAccount__footer__button'} onClick={deleteUser}>
                    FERMER MON COMPTE
                </IonButton>
            </IonFooter>
        </IonPage>
    )
}
export default DeleteAccount;