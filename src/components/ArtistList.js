import React from 'react';
import ItemImage from './ItemImage';

const ArtistList = ({ topArtists }) => {
  return (
    <div className='d-flex flex-row flex-wrap justify-content-center'>
      {topArtists.map((topArtist, index) => (
        <>
          <ItemImage
            key={topArtist.id}
            item={topArtist}
            index={index}
            src={topArtist.images[0].url}
          />
        </>
      ))}
    </div>
  );
};

export default ArtistList;
