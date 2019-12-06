import React, { Component } from "react";
import { Provider } from "react-redux";
import Routes from "~/src/routes";
import "~/src/config/reactotron";
import store from "~/src/store";

import Player from "~/src/components/Player";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
                <Player />
            </Provider>
        );
    }
}
