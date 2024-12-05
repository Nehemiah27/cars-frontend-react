import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Visibility as VisibilityIcon,
// } from "@mui/icons-material";
// import WebURL from "../../enum/WebURL";

const ViewCarsPage = () => {
  // const navigate = useNavigate();
  // const cars = [
  //   { id: "1", name: "Toyota Corolla", carID: "adfafdf92384u284" },
  //   { id: "2", name: "Honda Civic", carID: "adfafdf92384u285" },
  // ];

  return (
    <div className="view-cars-page">
      {/* <div className="header">
        <h1>View Cars</h1>
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
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car, index) => (
              <TableRow key={car.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{car.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/view-car?carID=${car.carID}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
    </div>
  );
};

export default ViewCarsPage;
