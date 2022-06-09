import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import find from "lodash/find";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlaylistMergeForm = ({
  createNewPlaylist,
  items,
  playlistName,
  setPlaylistName,
}) => {
  const [playlists, setPlaylists] = useState([
    { playlist: null },
    { playlist: null },
  ]);

  // @TODO Make number of playlists adjustable
  return (
    <Box
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        await createNewPlaylist(playlists);
      }}
      sx={{ p: 4 }}
    >
      <h1 className="text-center mb-4">Merge Your Playlists</h1>

      <div className="w-100 mb-3 d-flex justify-content-between">
        <label className="text-white font-weight-bold">
          <h3>Playlist name</h3>
        </label>
        <input
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="My new playlist"
          className="px-2 py-1"
        />
      </div>
      {playlists.map((playlist, playlistIndex) => (
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormLabel className="text-white">
            Playlist {playlistIndex + 1}
          </FormLabel>
          <select
            onChange={(e) => {
              const firstPlaylistObj = find(items, {
                id: e.target.value,
              });
              const newArray = [...playlists];
              newArray[playlistIndex] = firstPlaylistObj;
              setPlaylists(newArray);
            }}
            size="lg"
            aria-label="Select playlist for merge"
            className="px-2 py-1 mb-3 w-50"
          >
            {items.map(({ name, id }, index) => (
              <option selected={playlistIndex === index} key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </FormGroup>
      ))}

      <FormGroup className="d-flex justify-content-center mb-3">
        <Button
          sx={{
            borderRadius: "50% !important",
            width: 40,
            height: 40,
          }}
          variant="contained"
          onClick={() => {
            setPlaylists([...playlists, { playlist: null }]);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </FormGroup>
      <Box>
        <Button
          sx={{
            mt: 5,
            maxWidth: 200,
          }}
          variant="contained"
          fullWidth={true}
          href="/"
          className="text-black"
          type="submit"
        >
          Create new playlist
        </Button>
      </Box>
    </Box>
  );
};

export default PlaylistMergeForm;
