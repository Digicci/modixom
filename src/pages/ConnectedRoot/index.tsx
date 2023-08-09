import React from "react";
import {IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Home from "./Home";
import Tab2 from "../Tab2";
import Tab3 from "../Tab3";
import {megaphone, at, home, personOutline} from "ionicons/icons";

const ConnectedRoot: React.FC = () => {
    // Todo: se connecter au store user pour savoir si le user est un pro ou un particulier
    // utiliser le store pour afficher les bonnes pages

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home/>
                </Route>
                <Route exact path="/tab2">
                    <Tab2/>
                </Route>
                <Route path="/tab3">
                    <Tab3/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/home">
                    <IonIcon aria-hidden={true} icon={home}/>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon aria-hidden="true" icon={megaphone}/>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon aria-hidden="true" icon={at}/>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon aria-hidden="true" icon={personOutline}/>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default ConnectedRoot;