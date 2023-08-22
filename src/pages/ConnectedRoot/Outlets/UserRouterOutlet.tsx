import React from 'react';
import { Route } from "react-router";
import { IonRouterOutlet } from '@ionic/react';
import animationBuilder from "../../../utils/tools/animationBuilder";
import DeleteAccount from "../DeleteAccount";
import User from "../User";
import Account from "../Account";

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
        </IonRouterOutlet>
    )
}

export default UserRouterOutlet;