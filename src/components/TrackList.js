import React from 'react';
import TrackImage from './TrackImage';

export default ({ topTracks }) => {
  return (
    <div className='d-flex flex-row flex-wrap justify-content-center'>
      {topTracks.map((topTrack, index) => (
        <>
          <TrackImage
            key={topTrack.id}
            topTrack={topTrack}
            index={index}
            src={topTrack.album.images[0].url}
          />
        </>
      ))}
    </div>
  );
};
