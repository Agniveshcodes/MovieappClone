import { AnyAction } from "redux";
import { produce } from "immer";
import { Show } from "../Models/show";
import {
  SHOW_DETAIL_LOADED,
  SHOW_LOADED,
  SHOWS_QUERY_CHANGE,
} from "../Actions/Shows";
import { normalize, schema } from "normalizr";

export type State = {
  query: string;
  shows: { [showId: number]: Show };
};

export const initialState: State = {
  shows: {},
  query: "",
};

function showReducer(State = initialState, action: AnyAction) {
  switch (action.type) {
    case SHOW_LOADED:
      return produce(State, (draft) => {
        const shows = action.payload as Show[];

        const showsSchema = new schema.Entity("shows");

        const normalizedShows = normalize(shows, [showsSchema]);
        draft.shows = normalizedShows.entities.shows || {};
      });
    case SHOWS_QUERY_CHANGE:
      return produce(State, (draft) => {
        draft.query = action.payload as string;
      });
    case SHOW_DETAIL_LOADED:
      return produce(State, (draft) => {
        const show = action.payload;
        const showEntity = new schema.Entity("orders");

        const normalised = normalize(show, [showEntity]);

        draft.shows[show.id] = normalised.entities.orders![show.id];
      });
  }

  return State;
}

export default showReducer;
