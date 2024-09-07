import { FC, useEffect } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { connect } from "react-redux";
import { State } from "../store";
import { Show } from "../Models/show";
import { showDetailLoadedAction } from "../Actions/Shows";
import { showsMapSelector } from "../Selectors/shows";
import axios from "axios";

type ShowDetailPageProps = {
  show: Show;
  showDetail: (show: Show) => void;
  showId: number;
} & WithRouterProps;

const placeholderImage =
  "https://images.unsplash.com/photo-1556888335-23631cd2801a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGxhY2Vob2xkZXJ8ZW58MHx8MHx8fDA%3D";

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  showDetail,
  showId,
}) => {
  console.log(params);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/shows/" + showId).then((res) => {
      return showDetail(res.data);
    });
  }, [showId]);

  return (
    <div className="mt-2">
      <Link to={"/"} className="text-xl w-10 font-semibold">
        {" "}
        <IoMdArrowRoundBack />{" "}
      </Link>
      <h2 className="text-4xl font-semibold tracking-wide"> {show.name} </h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show.genres.map((items) => {
          return <GenrePill name={items} />;
        })}
      </div>
      <div className="mt-2 flex">
        <img
          src={show.image?.medium || show.image?.original || placeholderImage}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p>{show.summary}</p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:{" "}
            <span className="text-gray-700"> {show.rating.average} </span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: ShowDetailPageProps) => {
  const showId = ownProps.params.showId;

  return {
    show: showsMapSelector(state)[+showId],
  };
};

const mapDispatchToProps = {
  showDetail: showDetailLoadedAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowDetailPage)
);
