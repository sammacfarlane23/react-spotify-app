import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

const ItemImage = ({ item, index, src }) => {
  const [isArtistNameShown, setIsArtistNameShown] = useState(false);

  const getArtistsList = () => {
    let artistString = '';
    item.artists.forEach((artist, index) => {
      if (index > 0) {
        artistString += `, ${artist.name}`;
      } else {
        artistString += artist.name;
      }
    });
    return artistString;
  };

  return (
    <div>
      <div
        className='item-image'
        onMouseEnter={() => {
          if (!isMobile) {
            setIsArtistNameShown(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsArtistNameShown(false);
          }
        }}
        style={{ backgroundImage: `url(${src})` }}
      >
        {isArtistNameShown && (
          <p className='item-image__text'>
            {index + 1}. {item.name} {item.artists && `by ${getArtistsList()}`}
          </p>
        )}
      </div>
      <p className='item-image__text--mobile'>
        {index + 1}. {item.name} {item.artists && `by ${getArtistsList()}`}
      </p>
    </div>
  );
};

export default ItemImage;
