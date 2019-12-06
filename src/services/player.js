import Trackplayer from "react-native-track-player";
import store from "~/src/store";

import PlayerActions from "~/src/store/ducks/player";

export default async () => {
    Trackplayer.addEventListener("remote-play", () => {
        console.tron.log("PLAY REMOTE");
        return store.dispatch(PlayerActions.play());
    });
    Trackplayer.addEventListener("remote-pause", () => {
        console.tron.log("PAUSE REMOTE");
        return store.dispatch(PlayerActions.pause());
    });
    Trackplayer.addEventListener("remote-next", () => {
        console.tron.log("NEXT REMOTE");
        return store.dispatch(PlayerActions.next());
    });
    Trackplayer.addEventListener("remote-previous", () => {
        console.tron.log("PREVIOUS REMOTE");
        return store.dispatch(PlayerActions.prev());
    });
    Trackplayer.addEventListener("remote-stop", () => {
        console.tron.log("STOP REMOTE");
        return store.dispatch(PlayerActions.reset());
    });
};
