import React from 'react';
import { Route } from "react-router";
import { IonRouterOutlet } from '@ionic/react';
import animationBuilder from "../../../utils/tools/animationBuilder";
import DeleteAccount from "../DeleteAccount";
import User from "../User";
import Account from "../Account";
import ContactClient from "../ContactClient";



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
                <ContactClient/>
            </Route>
        </IonRouterOutlet>
    )
}

export default UserRouterOutlet;