import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import {ProvideApi} from "./services/ApiService";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ProvideApi>
        <Provider store={store}>
            <App />
        </Provider>
    </ProvideApi>
  </React.StrictMode>
);