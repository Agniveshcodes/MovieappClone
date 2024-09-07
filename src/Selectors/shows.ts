import { createSelector } from "reselect";
import { State } from "../store";

export function showsStateSelector(state: State) {
  return state.shows;
}

export const showsQuerySelector = createSelector(
  showsStateSelector,
  function (showState) {
    return showState.query;
  }
);

export const showsMapSelector = createSelector(showsStateSelector, function (showState) {
  return showState.shows;
});

export const showsSelector = createSelector(showsMapSelector , function(showsMap) {
  return Object.keys(showsMap).map((showId) => {
    return showsMap[+showId]
  })
})
