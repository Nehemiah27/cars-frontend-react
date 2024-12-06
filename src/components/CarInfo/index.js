import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import APIURL from "../../enum/APIURL";
import { toast } from "react-toastify";

const Info = ({ carData, carID, fetchCarData }) => {
  const [info, setInfo] = useState(carData.info);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { showLoader, hideLoader } = useLoader();

  const handleChange = (event) => {
    setInfo(event.target.value);
  };

  const handleSave = async () => {
    try {
      showLoader();
      const response = await fetch(`${apiBaseUrl}${APIURL.INFO}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carID, info }),
        }),
        respData = await response.json();
      if (respData.success) {
        toast.success(respData.message);
        await fetchCarData();
      }
    } catch (error) {
      toast.error("Service not available at the moment");
    } finally {
      hideLoader();
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        label="Information"
        value={info}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ alignSelf: "flex-end" }}
      >
        Save
      </Button>
    </Box>
  );
};

export default Info;
