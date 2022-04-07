import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import find from "lodash/find";

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
      <h1>Merge Your Playlists</h1>
      {playlists.map((playlist, playlistIndex) => (
        <Form.Group className="d-flex justify-content-between">
          <Form.Label className="text-white">
            Playlist {playlistIndex + 1}:
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
            aria-label="Select first playlist for merge"
            className="p-1 mb-3"
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
          +
        </Button>
      </Form.Group>

      <Form.Group
        className="mb-3 d-flex justify-content-between"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label className="text-white my-3">Playlist name</Form.Label>
        <Form.Control
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="My new playlist"
        />
      </Form.Group>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button type="submit">Create new playlist</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PlaylistMergeForm;
