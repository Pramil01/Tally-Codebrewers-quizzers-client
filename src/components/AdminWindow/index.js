import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "center",
  minHeight: "50vh",
}));

const AdminWindow = () => {
  let navigate = useNavigate();
  return (
    <GridContainer>
      <div className="btn-container">
        <Button
          variant="contained"
          style={{ padding: "10px 15vw", margin: "30px" }}
          onClick={() => navigate("/quizGenerator")}
        >
          Create a new quiz
        </Button>
        <br />
        <Button
          variant="contained"
          style={{ padding: "10px 15vw", margin: "30px" }}
        >
          Check Scores
        </Button>
      </div>
    </GridContainer>
  );
};

export default AdminWindow;
