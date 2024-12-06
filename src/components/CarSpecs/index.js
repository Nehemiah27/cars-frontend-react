import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
import { useLoader } from "../../context/LoaderContext";
import APIURL from "../../enum/APIURL";
import { toast } from "react-toastify";

const Specs = ({ carData, carID, fetchCarData }) => {
  const { showLoader, hideLoader } = useLoader();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const headings = useMemo(() => {
    return {
      overview: "Overview",
      engineAndTransmission: "Engine & Transmission",
      hybridSystem: "Hybrid System",
      hybridSystem: "Performance & Efficiency",
      exteriorEquipment: "Exterior Equipment",
      interiorEquipment: "Interior Equipment",
      seatsAndUpholestry: "Seats & Upholestry",
      entertainmentFront: "Entertainment Front",
      entertainmentRear: "Entertainment Rear",
      safetyEquipments: "Safety Equipments",
      supsensionBrakesWheelsAndTyres: "Suspension, Brakes, Wheels & Tyres",
      dimensionsWeightStorageCapacity: "Dimensions, Weight & Storage Capacity",
      warrantyAndServicePackage: "Warranty & Service Package",
      exteriorColours: "Exterior Colours",
    };
  }, []);
  const fieldHeadings = useMemo(() => {
    return {
      engineDisplacement: "Engine Displacement",
      powerFigure: "Power Figure",
      torqueFigure: "Torque Figure",
      driveTrain: "Drive Train",
      transmission: "Transmission",
    };
  }, []);
  const [open, setOpen] = useState(false);
  const [featuresData, setFeaturesData] = useState({
    engineDisplacement: {
      value: "",
      feature: false,
    },
    powerFigure: {
      value: "",
      feature: false,
    },
    torqueFigure: {
      value: "",
      feature: false,
    },
    driveTrain: {
      value: "",
      feature: false,
    },
    transmission: {
      value: "",
      feature: false,
    },
  });
  const [selectedFeature, setSelectedFeature] = useState("");
  const handleCardClick = (feature) => {
    setFeaturesData((prevValue) => ({
      ...prevValue,
      ...carData.specifications[feature],
    }));
    setSelectedFeature(feature);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFeatureChange = (item, key, value) => {
    const updatedData = { ...featuresData };
    updatedData[item][key] = value;
    setFeaturesData(updatedData);
  };

  const handleUpdate = async () => {
    try {
      showLoader();
      const response = await fetch(`${apiBaseUrl}${APIURL.SPECS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carID,
          specifications: { [selectedFeature]: featuresData },
        }),
      });
      const respData = await response.json();
      if (respData.success) {
        toast.success(respData.message);
        await fetchCarData();
      }
    } catch (error) {
      toast.error("Update is not allowed at the moment");
    } finally {
      hideLoader();
    }
    handleClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid2 container spacing={2}>
        {Object.keys(carData.specifications).map((feature, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: "0 0 10px rgba(0,0,0,0.3)" },
              }}
              onClick={() => handleCardClick(feature)}
            >
              <CardContent>
                <Typography variant="h6">{headings[feature]}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Feature Details</DialogTitle>
        <DialogContent>
          <Box sx={{ overflowY: "auto", maxHeight: "25rem" }}>
            {Object.keys(featuresData).map((item, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2, p: 1, borderBottom: "1px solid #ddd" }}
              >
                <Typography sx={{ flex: 1 }}>{fieldHeadings[item]}</Typography>
                <Checkbox
                  checked={featuresData[item].feature}
                  onChange={(e) =>
                    handleFeatureChange(item, "feature", e.target.checked)
                  }
                />
                <TextField
                  value={featuresData[item].value}
                  onChange={(e) =>
                    handleFeatureChange(item, "value", e.target.value)
                  }
                  placeholder="Enter value"
                  size="small"
                  sx={{ flex: 2, ml: 2 }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Specs;
