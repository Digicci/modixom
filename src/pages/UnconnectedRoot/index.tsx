import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import Connexion from "./Connexion";
import Inscription from "./Inscription";
import ChooseType from "./ChooseType";


const UnconnectedRoot: React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route exact path="/connexion">
                <Connexion />
            </Route>
            <Route exact path={'/inscription/professionnel'}>
                <Inscription type={'professionnel'} />
            </Route>
            <Route exact path={'/inscription/particulier'}>
                <Inscription type={'particulier'} />
            </Route>
            <Route exact path={'/inscription'}>
                <ChooseType />
            </Route>
            <Route>
                <Redirect to="/connexion" />
            </Route>
        </IonRouterOutlet>
    );
}

export default UnconnectedRoot;