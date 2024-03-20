import React, {useEffect} from "react";
import {IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonToast} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import {megaphone, at, home, personOutline} from "ionicons/icons";
import Alerte from "./Alerte";
import ContactPro from "./ContactPro";
import UserRouterOutlet from "./Outlets/UserRouterOutlet";
import HomeRouterOutlet from "./Outlets/HomeRouterOutlet";
import {useSelector} from "react-redux";
import {isUserPro} from "../../store/selectors/UserSelectors";
import AddAnnonce from "./AddAnnonce";
import AnnonceRouterOutlet from "./Outlets/AnnonceRouterOutlet";
import {
    PushNotificationSchema,
    PushNotifications,
    Token,
    ActionPerformed,
    PermissionStatus, RegistrationError
} from '@capacitor/push-notifications';


const ConnectedRoot: React.FC = () => {
    // Todo: se connecter au store user pour savoir si le user est un pro ou un particulier
    // utiliser le store pour afficher les bonnes pages

    const isPro = useSelector(isUserPro);
    const [present] = useIonToast()


    //Push notifications : verification des permissions et enregistrement du token
    useEffect(() => {
        PushNotifications.checkPermissions().then((res: PermissionStatus) => {
            if (res.receive !== 'granted') {
                if (res.receive === "prompt") {
                    PushNotifications.requestPermissions().then(async (res: PermissionStatus) => {
                        if (res.receive !== 'granted') {
                            await present({
                                message: "Les notifications ont été désactivée.",
                                duration: 3000,
                                color: 'warning'
                            })
                        } else {
                            register()
                        }
                    })
                }
            } else if (res.receive === 'granted') {
                subscribe();
            }
        })
    }, []);

    const register = () => {
        PushNotifications.register().then(() => {
            saveToken();
        })
    }

    const saveToken = () => {
        PushNotifications.addListener('registration', (token: Token) => {
            //TODO: send token to api for registration in user table
            alert(`Registration success, token is : ${token.value}`);
            subscribe();
        })
        PushNotifications.addListener("registrationError", (reason: RegistrationError) => {
            alert(`Registration failed, the reason was : ${reason.error}`);
        })
    }

    const subscribe = () => {
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
            //FIXME : only for dev, remove before publishing on stores
            alert(`Notification received in foreground with title: ${notification.title} and body: ${notification.body}`)
        })

        PushNotifications.addListener("pushNotificationActionPerformed", (notification: ActionPerformed) => {
            //TODO : implement navigation to proposal page
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
            <IonRouterOutlet>
                <Route path={'/home'}>
                   <HomeRouterOutlet />
                </Route>
                <Route exact path="/alerte">
                    {/* <Alerte/> */}
                    <Redirect to={"/home"} />
                </Route>
                {
                    isPro ? (
                        <Route path={'/addAnnonce'}>
                            <AnnonceRouterOutlet/>
                        </Route>
                    ) : (
                        <Route path="/contact">
                            {/* <ContactPro/> */}
                            <Redirect to={"/home"} />
                        </Route>
                    )
                }
                <Route path={'/user'} render={() => <UserRouterOutlet />}/>
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