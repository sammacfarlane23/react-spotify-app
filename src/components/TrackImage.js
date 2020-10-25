import React, { useState } from 'react';

export default ({ topTrack, index, src }) => {
  const [isArtistNameShown, setIsArtistNameShown] = useState(false);

  const getArtistsList = () => {
    let artistString = '';
    topTrack.artists.forEach((artist, index) => {
      if (index > 0) {
        artistString += `, ${artist.name}`;
      } else {
        artistString += artist.name;
      }
    });
    return artistString;
  };

  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center'
      onMouseEnter={() => setIsArtistNameShown(true)}
      onMouseLeave={() => setIsArtistNameShown(false)}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        width: '150px',
        height: '150px',
      }}
    >
      {isArtistNameShown && (
        <p
          className='text-center py-1 px-2'
          style={{
            background: 'black',
            color: 'white',
            borderRadius: '5px',
            fontSize: '12px',
          }}
        >
          {index + 1}. {topTrack.name} by {getArtistsList()}
        </p>
      )}
    </div>
  );
};
