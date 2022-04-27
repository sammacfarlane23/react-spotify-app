import {
  Audiotrack,
  FeaturedPlayList,
  TheaterComedy,
} from "@mui/icons-material";

const navConfig = [
  {
    href: "/",
    title: "Top Artists",
    value: "artists",
    icon: <TheaterComedy />,
  },
  {
    href: "/tracks",
    title: "Top Tracks",
    value: "tracks",
    icon: <Audiotrack />,
  },
  {
    href: "/playlists",
    // title: "Playlist Merger™",
    title: "Playlists",
    value: "playlists",
    icon: <FeaturedPlayList />,
  },
];

export default navConfig;
