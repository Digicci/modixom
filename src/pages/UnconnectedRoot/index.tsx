import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import Connexion from "./Connexion";
import Inscription from "./Inscription";

const UnconnectedRoot: React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route exact path="/connexion">
                <Connexion />
            </Route>
            <Route exact path="/inscription">
                <Inscription />
            </Route>
            <Route>
                <Redirect to="/connexion" />
            </Route>
        </IonRouterOutlet>
    );
}

export default UnconnectedRoot;