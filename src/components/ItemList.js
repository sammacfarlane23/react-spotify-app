import ItemImage from "./ItemImage";

const ItemList = ({ topList, imageSrc }) => {
  return (
    <div className="d-flex">
      <div className="item-list">
        {topList.map((topItem, index) => {
          const imageSrc = topItem.artists
            ? topItem.album.images[0].url
            : topItem.images[0]?.url;
          return (
            <ItemImage
              key={topItem.id}
              item={topItem}
              index={index}
              // If a list item contains artists that means it is a track not an artist
              src={imageSrc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
