import React from 'react';
import { Route, RouteComponentProps} from "react-router";
import { IonRouterOutlet } from '@ionic/react';
import animationBuilder from "../../../utils/tools/animationBuilder";
import DeleteAccount from "../DeleteAccount";
import User from "../User";

const UserRouterOutlet: React.FC = () => {
    return (
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact={true} path={"/user"}>
                <User/>
            </Route>
            <Route exact={true} path={`/user/delete`}>
                <DeleteAccount/>
            </Route>
        </IonRouterOutlet>
    )
}

export default UserRouterOutlet;