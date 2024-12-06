import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WebURL from "../../enum/WebURL";
import APIURL from "../../enum/APIURL";
import { useLoader } from "../../context/LoaderContext";

const ViewCarsPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const fetchData = async () => {
    try {
      showLoader();
      const response = await fetch(`${apiBaseUrl}${APIURL.VIEW_CARS}`, {
        method: "GET",
      });

      const result = await response.json();
      setCars(result.data);
    } catch (error) {
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="view-cars-page">
      <div className="view-car-header">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate(WebURL.ADD_CARS)}
          className="add-car-button"
        >
          Add Car
        </Button>
      </div>

      <div className="table-container">
        {cars.length ? (
          <>
            {" "}
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "1.5rem" }}>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell sx={{ width: "3.125rem" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car, index) => (
                  <TableRow key={car.carID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{car.name}</TableCell>
                    <TableCell>
                      <Tooltip title="View Car data">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(`${WebURL.CAR_DATA}?carID=${car.carID}`)
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          "No Cars available to show"
        )}
      </div>
    </div>
  );
};

export default ViewCarsPage;
