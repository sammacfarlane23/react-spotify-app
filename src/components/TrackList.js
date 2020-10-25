import React from 'react';
import ItemImage from './ItemImage';

export default ({ topTracks }) => {
  return (
    <div className='d-flex flex-row flex-wrap justify-content-center'>
      {topTracks.map((topTrack, index) => (
        <>
          <ItemImage
            key={topTrack.id}
            item={topTrack}
            index={index}
            src={topTrack.album.images[0].url}
          />
        </>
      ))}
    </div>
  );
};
