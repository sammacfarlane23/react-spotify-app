import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const HeaderButtons = ({
  getTopTracks,
  getTopArtists,
  isTopTracks,
  timeFrame,
  closeModal,
}) => {
  const [isHeaderTopTracks, setIsHeaderTopTracks] = useState(isTopTracks);
  const [headerTimeFrame, setHeaderTimeFrame] = useState(timeFrame);
  return (
    <>
      <Row className='justify-content-center'>
        <Button
          className={`btn mr-1 mb-2 ${
            isHeaderTopTracks ? 'active-button' : ''
          }`}
          onClick={() => {
            setIsHeaderTopTracks(true);
            getTopTracks(headerTimeFrame);
          }}
        >
          Top Tracks
        </Button>
        <Button
          className={`btn ml-1 mb-2 ${
            isHeaderTopTracks ? '' : 'active-button'
          }`}
          onClick={() => {
            setIsHeaderTopTracks(false);
            getTopArtists(headerTimeFrame);
          }}
        >
          Top Artists
        </Button>
      </Row>
      <Row className='justify-content-center align-items-space-between my-3'>
        <Button
          className={`btn mx-1 mb-2 ${
            timeFrame === 'long_term' ? 'active-button' : ''
          }`}
          onClick={() => {
            setHeaderTimeFrame('long_term');
            isTopTracks
              ? getTopTracks('long_term')
              : getTopArtists('long_term');
            closeModal();
          }}
        >
          All Time
        </Button>
        <Button
          className={`btn mx-1 mb-2 ${
            timeFrame === 'medium_term' ? 'active-button' : ''
          }`}
          onClick={() => {
            setHeaderTimeFrame('medium_term');
            isTopTracks
              ? getTopTracks('medium_term')
              : getTopArtists('medium_term');
            closeModal();
          }}
        >
          Last Six Months
        </Button>
        <Button
          className={`btn mx-1 mb-2 ${
            timeFrame === 'short_term' ? 'active-button' : ''
          }`}
          onClick={() => {
            setHeaderTimeFrame('short_term');
            isTopTracks
              ? getTopTracks('short_term')
              : getTopArtists('short_term');
            closeModal();
          }}
        >
          Last Four Weeks
        </Button>
      </Row>
    </>
  );
};

export default HeaderButtons;
