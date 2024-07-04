import React from "react";
import {IonButton, IonContent, IonHeader, IonPage} from "@ionic/react";
import './chooseType.scss';


const ChooseType: React.FC = () => {

    const pages: string[] = [
        'particulier',
        'professionnel'
    ];

    return (
        <IonPage className={'chooseType'}>
            <div className={'chooseType__container'}>
                <IonHeader className={'chooseType__container__title'}>
                    <h1>modixom</h1>
                </IonHeader>
                <IonContent>
                    <div className={'chooseType__container__buttons'}>
                        {
                            pages.map((page: string, index: number) => {
                                return (
                                    <div key={index} className={'chooseType__container__buttons__button'}>
                                        <IonButton
                                            routerLink={`/inscription/${page}`}
                                            routerDirection={"forward"}
                                        >
                                            {page}
                                        </IonButton>
                                    </div>
                                )
                            })
                        }
                    </div>
                </IonContent>
                <div className={"signinButton__wrapper"}>
                    <IonButton routerLink={'/connexion'} className={"signinButton"} routerDirection={"forward"}>Se connecter</IonButton>
                </div>
            </div>
        </IonPage>
    )
}

export default ChooseType;