import { useLoader } from "../../context/LoaderContext";
import { useState, useEffect, useMemo } from "react";
import APIURL from "../../enum/APIURL";
import { Box, Grid2, Typography, Card, CardContent } from "@mui/material";

const Summary = ({ carID }) => {
  const { showLoader, hideLoader } = useLoader();
  const headings = useMemo(() => {
    return {
      overview: "Overview",
      engineAndTransmission: "Engine & Transmission",
      hybridSystem: "Hybrid System",
      performanceAndEfficiency: "Performance & Efficiency",
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
  const [summary, setSummary] = useState({
    overview: [],
    engineAndTransmission: [],
    hybridSystem: [],
    performanceAndEfficiency: [],
    exteriorEquipment: [],
    interiorEquipment: [],
    seatsAndUpholestry: [],
    entertainmentFront: [],
    entertainmentRear: [],
    safetyEquipments: [],
    supsensionBrakesWheelsAndTyres: [],
    dimensionsWeightStorageCapacity: [],
    warrantyAndServicePackage: [],
    exteriorColours: [],
  });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const fetchData = async () => {
    try {
      showLoader();
      const response = await fetch(`${apiBaseUrl}${APIURL.SUMMARY}/${carID}`, {
        method: "GET",
      });

      const result = await response.json();
      setSummary(result.data);
    } catch (error) {
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p={2} sx={{ lineHeight: "1.75rem" }}>
      <Grid2 container spacing={3}>
        {Object.entries(summary).map(([key, value], index) => (
          <Grid2 item xs={12} sm={6} md={4} key={key}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary">
                  {headings[key]}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {value.join(",") === "" ? "-" : value.join(",")}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Summary;
