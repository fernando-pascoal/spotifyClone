import { call, put } from "redux-saga/effects";
import api from "~/src/services/api";

import PodcastsActions from "~/src/store/ducks/podcasts";

export function* load() {
    try {
        const response = yield call(api.get, "podcasts");
        yield put(PodcastsActions.loadSuccess(response.data));
    } catch (error) {
        yield put(PodcastsActions.loadFailure());
    }
}
