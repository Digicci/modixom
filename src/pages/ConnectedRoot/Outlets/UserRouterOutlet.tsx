import React from 'react';
import { Route } from "react-router";
import { IonRouterOutlet } from '@ionic/react';
import animationBuilder from "../../../utils/tools/animationBuilder";
import DeleteAccount from "../DeleteAccount";
import User from "../User";
import Account from "../Account";
import Contact from "../Contact";

const UserRouterOutlet: React.FC = () => {
    return (
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact={true} path={"/user"}>
                <User/>
            </Route>
            <Route exact={true} path={`/user/delete`}>
                <DeleteAccount/>
            </Route>
            <Route exact={true} path={`/user/coordonnes`}>
                <Account/>
            </Route>
            <Route exact={true} path={`/user/contact`}>
                <Contact/>
            </Route>
        </IonRouterOutlet>
    )
}

export default UserRouterOutlet;