import React from "react";
import {IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
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


const ConnectedRoot: React.FC = () => {
    // Todo: se connecter au store user pour savoir si le user est un pro ou un particulier
    // utiliser le store pour afficher les bonnes pages

    const isPro = useSelector(isUserPro)

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