import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import api from "../service/api";

const Scores = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("scores/allScores", {
        headers: {
          qid: localStorage.getItem("currId"),
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.length !== 0 && (
        <>
          <h3>Scores of {localStorage.getItem("currName")}</h3>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((score) => (
                  <TableRow
                    key={score.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {score.name}
                    </TableCell>
                    <TableCell align="center">{score.email}</TableCell>
                    <TableCell align="center">{score.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {data.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "Center",
            height: "80vh",
            width: "40vw",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "verdena", fontWeight: "lighter" }}>
            No scores to display 🥲
          </h2>
        </div>
      )}
    </div>
  );
};

export default Scores;
