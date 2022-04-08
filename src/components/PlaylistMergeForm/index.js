import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createNewPlaylist(playlists);
      }}
      className="p-4"
    >
      <h1 className="text-center mb-4">Merge Your Playlists</h1>

      {/* <Form.Group
        className="mb-3 d-flex justify-content-between"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label className="text-white my-3">Playlist name</Form.Label>
        <Form.Control
          size="sm"
          //   className="form-control-sm"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="My new playlist"
        />
      </Form.Group> */}
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
        <Form.Group className="d-flex justify-content-between">
          <Form.Label className="text-white">
            Playlist {playlistIndex + 1}
          </Form.Label>
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
        </Form.Group>
      ))}

      <Form.Group className="d-flex justify-content-center mb-3">
        <Button
          className="rounded-circle"
          onClick={() => {
            setPlaylists([...playlists, { playlist: null }]);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Form.Group>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="text-black" type="submit">
            Create new playlist
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PlaylistMergeForm;
