import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import api from "../../service/api";

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "center",
  minHeight: "50vh",
}));
const AdminWindow = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("ques/quizes", { headers: { admin: localStorage.getItem("Admin") } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const setCurrId = (id, name) => {
    localStorage.setItem("currId", id);
    localStorage.setItem("currName", name);
    navigate("/checkScores");
  };

  return (
    <>
      {data.length !== 0 && (
        <>
          <h3>Your Quizes</h3>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Quiz Name</TableCell>
                  <TableCell align="center">Link</TableCell>
                  <TableCell align="center">Scores</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((quiz) => (
                  <TableRow
                    key={quiz.link}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {quiz.quizName}
                    </TableCell>
                    <TableCell align="center">
                      <a href={quiz.link} target="_blank" rel="noreferrer">
                        {quiz.link}
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => setCurrId(quiz.qId, quiz.quizName)}
                      >
                        Check Scores
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <GridContainer>
        <div className="btn-container">
          <Button
            variant="contained"
            style={{ padding: "10px 15vw", margin: "30px" }}
            onClick={() => navigate("/quizGenerator")}
          >
            Create a new quiz
          </Button>
        </div>
      </GridContainer>
    </>
  );
};

export default AdminWindow;
