import React from 'react';
import { Container } from 'react-bootstrap';
import ItemImage from './ItemImage';

const ItemList = ({ topList }) => {
  return (
    <div className='d-flex'>
      <div className='item-list'>
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
    </div>
  );
};

export default ItemList;
