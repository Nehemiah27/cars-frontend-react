import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import APIURL from "../../enum/APIURL";
import { useLoader } from "../../context/LoaderContext";
import Details from "../../components/CarDetails";
import Specs from "../../components/CarSpecs";
import Summary from "../../components/CarSummary";
import Info from "../../components/CarInfo";

const CarData = () => {
  const [searchParams] = useSearchParams();
  const carID = searchParams.get("carID");
  const [carData, setCarData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { showLoader, hideLoader } = useLoader();
  const fetchCarData = async () => {
    try {
      showLoader();
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${APIURL.CAR_DATA}/${carID}`
      );
      const result = await response.json();
      setCarData(result.data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    } finally {
      hideLoader();
    }
  };
  useEffect(() => {
    if (!carID) return;

    fetchCarData();
  }, [carID]);

  const tabComponents = [
    { label: "Details", component: <Details carData={carData} /> },
    {
      label: "Specs",
      component: (
        <Specs carData={carData} carID={carID} fetchCarData={fetchCarData} />
      ),
    },
    { label: "Summary", component: <Summary carID={carID} /> },
    {
      label: "Info",
      component: (
        <Info carData={carData} carID={carID} fetchCarData={fetchCarData} />
      ),
    },
  ];

  return (
    <>
      {carData === null ? (
        <Typography sx={{ padding: "1.25rem" }}>
          No Data available for the arrived link
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
            >
              {tabComponents.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>
          </Box>
          <Box
            sx={{
              maxHeight: "calc(100% - 2rem)",
              overflowY: "auto",
            }}
          >
            {carData ? (
              tabComponents[activeTab].component
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default CarData;
