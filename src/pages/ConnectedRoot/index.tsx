import React, {useEffect} from "react";
import {IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonToast} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import {megaphone, at, home, personOutline} from "ionicons/icons";
import Alerte from "./Alerte";
import ContactPro from "./ContactPro";
import UserRouterOutlet from "./Outlets/UserRouterOutlet";
import HomeRouterOutlet from "./Outlets/HomeRouterOutlet";
import {useSelector} from "react-redux";
import {getUser, isUserPro} from "../../store/selectors/UserSelectors";
import AddAnnonce from "./AddAnnonce";
import AnnonceRouterOutlet from "./Outlets/AnnonceRouterOutlet";
import {
    PushNotificationSchema,
    PushNotifications,
    Token,
    ActionPerformed,
    PermissionStatus, RegistrationError
} from '@capacitor/push-notifications';
import {useApi} from "../../services/ApiService";
import {endpoints} from "../../constants";
import {UserState} from "../../store/reducers/UserReducer";


const ConnectedRoot: React.FC = () => {

    const isPro = useSelector(isUserPro);
    const [present] = useIonToast()
    const api = useApi()
    const user: UserState = useSelector(getUser)



    //Push notifications : verification des permissions et enregistrement du token
    useEffect(() => {
        //On commence par vérifier l'état des permissions concernant les notifications

        PushNotifications.checkPermissions().then((res: PermissionStatus) => {
            if (res.receive !== 'granted') {
                //Si l'utilisateur n'a pas déjà autorisé les notifications et qu'on ne le lui a jamais demandé, on lui demande
                if (res.receive === "prompt") {
                    PushNotifications.requestPermissions().then(async (res: PermissionStatus) => {
                        // S'il refuse les notifications, on lui précise simplement les conséquences de sont refus
                        // (Impossible de lui envoyer de notifications)
                        if (res.receive !== 'granted') {
                            await present({
                                message: "Les notifications ont été désactivée. Sans accord de votre part Modixom ne pourra pas vous envoyer de notifications.",
                                duration: 3000,
                                color: 'warning'
                            })
                        } else {
                            // S'il accepte les notifications, on tente de s'enregistrer au sérvice et de récupérer un token
                            register()
                        }
                    })
                }
            } else if (res.receive === 'granted') {
                // Si les notifications ont déjà étè autorisées au préalable alors,
                // on souscrit simplement au système de notifications
                subscribe();
            }
        })
    }, []);

    const register = () => {
        // register() envoi une demande au service de notifications push,
        // ce dérnier renverra un token d'identifications si l'enregistrement se passe sans problème,
        // dans le cas contraire le service renverra une erreur
        PushNotifications.register().then(() => {
            saveToken();
        })
    }

    const saveToken = () => {
        // On place un listener sur l'événement "registration" déclencher lorsque l'inscription au service se passe sans problème.
        // Lorsque l'évènement est déclenché notre fonction de rappel est déclenchée
        PushNotifications.addListener('registration', async (token: Token) => {
            console.log(token, 'token retrieved')
            try {
                const apiRes = await api.post(endpoints.notificationTokenUpdate, {
                    token: token.value,
                    mail: user.mail
                })
                console.log('apiResponse', apiRes)
                subscribe()
            } catch(e) {
                console.log('api catch block')
                await present({
                    message: 'Une erreur s\'est produite lors de l\'inscription au sérvice de notifications. Merci de réessayer plus tard.',
                    color: 'danger',
                    duration: 5000,
                })
                console.log(e)
            }
        })
        PushNotifications.addListener("registrationError", (reason: RegistrationError) => {
            present({
                message: 'Une erreur s\'est produite lors de l\'inscription au sérvice de notifications. Merci de réessayer plus tard. '+ reason.error +'',
                color: 'danger',
                duration: 5000,
            })
            console.log(reason)
        })
    }

    const subscribe = () => {
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
            //FIXME : only for dev, remove before publishing on stores
            alert(`Notification received in foreground with title: ${notification.title} and body: ${notification.body}`)
        })

        PushNotifications.addListener("pushNotificationActionPerformed", (notification: ActionPerformed) => {
            //FIXME : implement navigation to proposal page
            //  remove alert, only for development
            alert(`You clicked on a notification, she's containing title: ${notification.notification.title} and body: ${notification.notification.body}`)
        })
    }
    //End push notifications

    return (
        <IonTabs>

            {
                // Router outlet with all pages as tabs
            }
            {/*@ts-ignore*/}
            <IonRouterOutlet>
                <Route path={'/home'}>
                    <HomeRouterOutlet/>
                </Route>
                <Route exact path="/alerte">
                    {/* <Alerte/> */}
                    <Redirect to={"/home"}/>
                </Route>
                {
                    isPro ? (
                        <Route path={'/addAnnonce'}>
                            <AnnonceRouterOutlet/>
                        </Route>
                    ) : (
                        <Route path="/contact">
                            {/* <ContactPro/> */}
                            <Redirect to={"/home"}/>
                        </Route>
                    )
                }
                <Route path={'/user'} render={() => <UserRouterOutlet/>}/>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
                <Route>
                    <Redirect to="/home"/>
                </Route>
            </IonRouterOutlet>

            {
                // End of router outlet /////////////////////////////////////////////////////
                // Bottom tab bar navigation
            }
            <IonTabBar slot="bottom" style={{paddingBottom: '40px'}}>
                <IonTabButton tab="home" href="/home">
                    <IonIcon aria-hidden={true} icon={home}/>
                </IonTabButton>
                <IonTabButton tab="alerte" href="/alerte">
                    <IonIcon aria-hidden="true" icon={megaphone}/>
                </IonTabButton>
                {
                    isPro ? (
                        <IonTabButton tab="addAnnonce" href="/addAnnonce">
                            déposer une annonce
                        </IonTabButton>
                    ) : (
                        <IonTabButton tab="contact" href="/contact">
                            <IonIcon aria-hidden="true" icon={at}/>
                        </IonTabButton>
                    )
                }
                <IonTabButton tab="user" href="/user">
                    <IonIcon aria-hidden="true" icon={personOutline}/>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default ConnectedRoot;