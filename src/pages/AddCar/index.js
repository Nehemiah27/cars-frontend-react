import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Box,
  Grid2,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import APIURL from "../../enum/APIURL";
import { useLoader } from "../../context/LoaderContext";

const AddCar = () => {
  const { showLoader, hideLoader } = useLoader();
  const [formValues, setFormValues] = useState({
    category: "",
    name: "",
    price: "",
    kmsDriven: "",
    fuelType: "",
    regState: "",
    audioFile: null,
    featuredVideo: "",
    videoFile: null,
  });

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [formErrors, setFormErrors] = useState({});
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const {
      category,
      name,
      price,
      kmsDriven,
      fuelType,
      regState,
      audioFile,
      featuredVideo,
      videoFile,
    } = formValues;

    if (!category) errors.category = "Category is required.";
    if (!name) errors.name = "Name is required.";
    if (!price) errors.price = "Price is required.";
    if (!kmsDriven) errors.kmsDriven = "KMS Driven is required.";
    if (!fuelType) errors.fuelType = "Fuel Type is required.";
    if (!regState) errors.regState = "Registration State is required.";

    if (!audioFile) errors.audioFile = "Please upload an audio file.";
    else if (
      !(
        audioFile.name.toLowerCase().endsWith(".mp3") ||
        audioFile.name.toLowerCase().endsWith(".wav")
      )
    )
      errors.audioFile = "Audio file must be .mp3 or .wav.";

    if (!videoFile && !featuredVideo)
      errors.featuredVideo =
        "Please upload a video file or provide a featured video URL.";
    else if (videoFile && !videoFile.name.toLowerCase().endsWith(".mp4"))
      errors.videoFile = "Video file must be .mp4.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const formData = new FormData();
    for (const key in formValues) {
      if (formValues[key]) {
        const keyName =
          key === "audioFile" ? "audio" : key === "videoFile" ? "video" : key;
        formData.append(keyName, formValues[key]);
      }
    }

    try {
      showLoader();
      const response = await fetch(`${apiBaseUrl}${APIURL.ADD_CARS}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setFormValues({
          category: "",
          name: "",
          price: "",
          kmsDriven: "",
          fuelType: "",
          regState: "",
          audioFile: null,
          featuredVideo: "",
          videoFile: null,
        });
        if (audioInputRef.current) audioInputRef.current.value = "";
        if (videoInputRef.current) videoInputRef.current.value = "";
        toast.success(result.message);
      } else {
        toast.error(
          result.message || "adding car is not allowed at the moment"
        );
      }
    } catch (error) {
      toast.error("adding car is not allowed at the moment");
    } finally {
      hideLoader();
    }
  };

  return (
    <Typography
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 6rem)",
        overflowY: "auto",
        padding: "1.25rem 0",
      }}
    >
      <Box
        sx={{
          p: 4,
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2} direction="column">
            <Grid2 item xs={12}>
              <FormControl
                sx={{
                  minWidth: "15.625rem",
                }}
                error={!!formErrors.category}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={formValues.category}
                  onChange={handleInputChange}
                  name="category"
                  label="Category"
                >
                  <MenuItem value="sedan">Sedan</MenuItem>
                  <MenuItem value="hatchback">Hatchback</MenuItem>
                  <MenuItem value="suv">SUV</MenuItem>
                  <MenuItem value="coupe">Coupe</MenuItem>
                </Select>
                {formErrors.category && (
                  <FormHelperText>{formErrors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                sx={{
                  minWidth: "15.625rem",
                }}
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                sx={{
                  minWidth: "15.625rem",
                }}
                label="Price"
                name="price"
                type="number"
                value={formValues.price}
                onChange={handleInputChange}
                error={!!formErrors.price}
                helperText={formErrors.price}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                sx={{
                  minWidth: "15.625rem",
                }}
                label="KMS Driven"
                name="kmsDriven"
                type="number"
                value={formValues.kmsDriven}
                onChange={handleInputChange}
                error={!!formErrors.kmsDriven}
                helperText={formErrors.kmsDriven}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <FormControl
                sx={{
                  minWidth: "15.625rem",
                }}
                error={!!formErrors.fuelType}
              >
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  value={formValues.fuelType}
                  onChange={handleInputChange}
                  name="fuelType"
                  label="Fuel Type"
                >
                  <MenuItem value="petrol">Petrol</MenuItem>
                  <MenuItem value="diesel">Diesel</MenuItem>
                  <MenuItem value="electric">Electric</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
                {formErrors.fuelType && (
                  <FormHelperText>{formErrors.fuelType}</FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                sx={{
                  minWidth: "15.625rem",
                }}
                label="Registration State"
                name="regState"
                value={formValues.regState}
                onChange={handleInputChange}
                error={!!formErrors.regState}
                helperText={formErrors.regState}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <InputLabel>Exhaust Note</InputLabel>
              <OutlinedInput
                fullWidth
                type="file"
                name="audioFile"
                onChange={handleInputChange}
                inputRef={audioInputRef}
              />
              {formErrors.audioFile && (
                <FormHelperText error>{formErrors.audioFile}</FormHelperText>
              )}
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Featured Video URL"
                name="featuredVideo"
                value={formValues.featuredVideo}
                onChange={handleInputChange}
                error={!!formErrors.featuredVideo}
                helperText={formErrors.featuredVideo}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <InputLabel>Featured Video File</InputLabel>
              <OutlinedInput
                fullWidth
                type="file"
                name="videoFile"
                inputRef={videoInputRef}
                onChange={handleInputChange}
              />
              {formErrors.videoFile && (
                <FormHelperText error>{formErrors.videoFile}</FormHelperText>
              )}
            </Grid2>
            <Grid2 item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "6.25rem" }}
              >
                Add Car
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Typography>
  );
};

export default AddCar;
