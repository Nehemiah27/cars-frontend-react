import React from "react";
import { Box, Button } from "@mui/material";

const Details = ({ carData }) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  return (
    <Box p={2} sx={{ lineHeight: "3rem" }}>
      <div>
        <strong>Category</strong>: {carData.category}
      </div>
      <div>
        <strong>Name</strong>: {carData.name}
      </div>
      <div>
        <strong>Price</strong>: {carData.price}
      </div>
      <div>
        <strong>KMS Driven</strong>: {carData.kmsDriven}
      </div>
      <div>
        <strong>Fuel Type</strong>: {carData.fuelType}
      </div>
      <div>
        <strong>Registration State</strong>: {carData.regState}
      </div>
      <div>
        <strong>Exhaust Note</strong>:{" "}
        {
          <Button href={`${apiBaseUrl}${carData.exhaustNote}`} target="_blank">
            Play Audio
          </Button>
        }
      </div>
      <div>
        <strong>Featured Video</strong>:{" "}
        {
          <Button
            href={
              carData.featuredVideo.includes("https://")
                ? carData.featuredVideo
                : `${apiBaseUrl}${carData.featuredVideo}`
            }
            target="_blank"
          >
            Play Video
          </Button>
        }{" "}
      </div>
    </Box>
  );
};

export default Details;
