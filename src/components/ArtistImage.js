import React, { useState } from 'react';

export default ({ topArtist, index, src }) => {
  const [isArtistNameShown, setIsArtistNameShown] = useState(false);

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
          style={{ background: 'black', color: 'white', borderRadius: '5px' }}
        >
          {index + 1}. {topArtist.name}
        </p>
      )}
    </div>
  );
};
