import React from 'react';
import ArtistImage from './ArtistImage';

export default ({ topArtists }) => {
  return (
    <div className='d-flex flex-row flex-wrap justify-content-center'>
      {topArtists.map((topArtist, index) => (
        <>
          <ArtistImage
            key={topArtist.id}
            topArtist={topArtist}
            index={index}
            src={topArtist.images[0].url}
          />
        </>
      ))}
    </div>
  );
};
