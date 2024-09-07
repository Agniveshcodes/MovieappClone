import { FC, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { fecthShows } from "../Apis/api";
import { Show } from "../Models/show";
import { showLoadedAction, showsQueryAction } from "../Actions/Shows";
import { connect } from "react-redux";
import { State } from "../store";
import { showsQuerySelector, showsSelector } from "../Selectors/shows";

type ShowListPageProps = {
  showsQuery: (query : string) => void
  shows: Show[];
  query: string;
};

const ShowListPage: FC<ShowListPageProps> = ({  shows, query , showsQuery }) => {
  

  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQuery(event.target.value)
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.map((items) => {
          return <ShowCard key={items.id} show={items} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    shows: showsSelector(state),
    query: showsQuerySelector(state),
  };
};

const mapDispatchToProps = {
  showsQuery : showsQueryAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
