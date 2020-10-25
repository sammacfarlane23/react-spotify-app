import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export default ({ getTopTracks, getTopArtists }) => {
  const [isTopTracks, setIsTopTracks] = useState(false);
  const [timeFrame, setTimeFrame] = useState('short_term');
  return (
    <>
      <Row className='justify-content-center'>
        <Button
          className={`btn mr-2 mb-2 ${isTopTracks ? 'active-button' : ''}`}
          onClick={() => {
            setIsTopTracks(true);
            getTopTracks(timeFrame);
          }}
        >
          Top Tracks
        </Button>
        <Button
          className={`btn mr-2 mb-2 ${isTopTracks ? '' : 'active-button'}`}
          onClick={() => {
            setIsTopTracks(false);
            getTopArtists(timeFrame);
          }}
        >
          Top Artists
        </Button>
      </Row>
      <Row className='justify-content-center align-items-space-between'>
        <Button
          className={`btn mr-2 mb-2 ${
            timeFrame === 'long_term' ? 'active-button' : ''
          }`}
          onClick={() => {
            setTimeFrame('long_term');
            isTopTracks
              ? getTopTracks('long_term')
              : getTopArtists('long_term');
          }}
        >
          All Time
        </Button>
        <Button
          className={`btn mr-2 mb-2 ${
            timeFrame === 'medium_term' ? 'active-button' : ''
          }`}
          onClick={() => {
            setTimeFrame('medium_term');
            isTopTracks
              ? getTopTracks('medium_term')
              : getTopArtists('medium_term');
          }}
        >
          Last Six Months
        </Button>
        <Button
          className={`btn mr-2 mb-2 ${
            timeFrame === 'short_term' ? 'active-button' : ''
          }`}
          onClick={() => {
            setTimeFrame('short_term');
            isTopTracks
              ? getTopTracks('short_term')
              : getTopArtists('short_term');
          }}
        >
          Last Four Weeks
        </Button>
      </Row>
    </>
  );
};
