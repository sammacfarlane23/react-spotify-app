import React from 'react';
import ItemImage from './ItemImage';

const ItemList = ({ topList }) => {
  return (
    <div className='d-flex flex-row flex-wrap justify-content-center align-items-space-between mb-3'>
      {topList.map((topItem, index) => (
        <ItemImage
          key={topItem.id}
          item={topItem}
          index={index}
          // If a list item contains artists that means it is a track not an artist
          src={
            topItem.artists
              ? topItem.album.images[0].url
              : topItem.images[0].url
          }
        />
      ))}
    </div>
  );
};

export default ItemList;
