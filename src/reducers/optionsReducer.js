export default function optionsReducer(
  state = { timeFrame: "short_term", topItems: "artists" },
  action
) {
  switch (action.type) {
    case "setShortTerm":
      return { ...state, timeFrame: "short_term" };
    case "setMediumTerm":
      return { ...state, timeFrame: "medium_term" };
    case "setLongTerm":
      return { ...state, timeFrame: "long_term" };
    case "setTopTracks":
      return { ...state, topItems: "tracks" };
    case "setTopArtists":
      return { ...state, topItems: "artists" };
    default:
      return state;
  }
}
