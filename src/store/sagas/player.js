import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import TrackPlayer from "react-native-track-player";
import PlayerActions from "~/src/store/ducks/player";

function* trackChanged() {
    const channel = eventChannel(emitter => {
        const onTrackChange = TrackPlayer.addEventListener(
            "playback-track-changed",
            emitter
        );
        return () => onTrackChange.remove();
    });

    try {
        while (true) {
            //a execução para e aguarda o yield take channel
            const nextTrack = yield take(channel);
            console.tron.log("WHILE", nextTrack);
        }
    } finally {
        channel.close();
    }
}

export function* init() {
    yield call(TrackPlayer.setupPlayer);

    TrackPlayer.updateOptions({
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_STOP
        ],
        notificationCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_STOP
        ],
        compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE
        ]
    });
    TrackPlayer.addEventListener("playback-state", () => {});
}

export function* setPodcast({ podcast, episodeId }) {
    const currentPodcast = yield select(state => state.player.podcast);
    if (!currentPodcast || episodeId != currentPodcast.id) {
        yield call(TrackPlayer.stop);
        yield call(TrackPlayer.reset);
        yield call(TrackPlayer.add, [...podcast.tracks]);
        yield put(PlayerActions.setPodcastSuccess(podcast));
    }
    if (episodeId && typeof episodeId != "object") {
        yield call(TrackPlayer.skip, episodeId);
        yield put(PlayerActions.setCurrent(episodeId));
    }

    yield put(PlayerActions.play());
    yield call(trackChanged);
}

export function* play() {
    yield call(TrackPlayer.play);
}
export function* pause() {
    yield call(TrackPlayer.pause);
}
export function* prev() {
    const player = yield select(state => state.player);
    const currentIndex = player.podcast.tracks.findIndex(
        episode => episode.id === player.current
    );
    if (player.podcast.tracks[currentIndex - 1]) {
        yield call(TrackPlayer.skipToPrevious);
        yield call(TrackPlayer.play);
        yield put(
            PlayerActions.setCurrent(player.podcast.tracks[currentIndex - 1].id)
        );
    }
}
export function* next() {
    const player = yield select(state => state.player);
    const currentIndex = player.podcast.tracks.findIndex(
        episode => episode.id === player.current
    );
    if (player.podcast.tracks[currentIndex + 1]) {
        yield call(TrackPlayer.skipToNext);
        yield call(TrackPlayer.play);
        yield put(
            PlayerActions.setCurrent(player.podcast.tracks[currentIndex + 1].id)
        );
    }
}

export function* reset() {
    yield call(TrackPlayer.stop);
    yield call(TrackPlayer.reset);
}
