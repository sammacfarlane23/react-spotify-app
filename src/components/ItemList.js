import Box from "@mui/material/Box";

import ItemImage from "./ItemImage";

const ItemList = ({ topList }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
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
    </Box>
  );
};

export default ItemList;
