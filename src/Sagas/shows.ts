import { call, put } from "redux-saga/effects";
import { fecthShows } from "../Apis/api";
import { AnyAction } from "redux-saga";
import { showLoadedAction } from "../Actions/Shows";

export function* fetchShows(action: AnyAction): Generator<any, any, any> {
  const shows = yield call(fecthShows, action.payload);
  yield put(showLoadedAction(shows));
}
