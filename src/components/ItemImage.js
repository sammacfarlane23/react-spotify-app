import { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import listify from "listify";

const ItemImage = ({ item, index, src }) => {
  const [isArtistNameShown, setIsArtistNameShown] = useState(false);

  const artistNames = item.artists?.map(({ name }) => name);
  const artists = item.artists ? `by ${listify(artistNames)}` : "";
  const description = `${index + 1}. ${item.name} ${artists}`;

  return (
    <Link
      href={item.external_urls.spotify}
      style={{ background: "transparent" }}
      sx={{ color: "#fff", textDecoration: "none" }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 130,
            height: 130,
            backgroundSize: "cover",
            m: { xs: "0 0.3rem", md: 0 },
          }}
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
            <Typography
              paragraph={true}
              sx={{
                background: "black",
                wordWrap: "wrap",
                borderRadius: 5,
                px: 0.5,
                py: 1,
                textAlign: "center",
                display: {
                  xs: "none",
                  md: "block",
                },
                zIndex: 10000,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Typography
          paragraph={true}
          sx={{
            p: 1,
            m: 0,
            maxWidth: 130,
            textAlign: "center",
            display: { md: "none" },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Link>
  );
};

export default ItemImage;
