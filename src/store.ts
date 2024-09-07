import { applyMiddleware, combineReducers, createStore } from "redux";
import showReducer from "./Reducers/showReducer";
import createSagaMiddleware from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { SHOWS_QUERY_CHANGE } from "./Actions/Shows";
import { fetchShows } from "./Sagas/shows";
import { composeWithDevTools } from "@redux-devtools/extension";

const reducer = combineReducers({
  shows: showReducer,
});

function* rootSaga() {
  yield takeLatest(SHOWS_QUERY_CHANGE, fetchShows);
}

const sagaMiddleWare = createSagaMiddleware();

export type State = ReturnType<typeof reducer>;

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default store;
