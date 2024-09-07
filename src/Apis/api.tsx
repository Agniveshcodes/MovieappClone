import axios from "axios";
import { Show } from "../Models/show";

export function fecthShows(keyWoard : string) {
  return  axios.get<{show : Show}[]>("https://api.tvmaze.com/search/shows?q=" + keyWoard).then((response) => {
    return response.data.map((items : any) => {
        return items.show
    })
  })
}