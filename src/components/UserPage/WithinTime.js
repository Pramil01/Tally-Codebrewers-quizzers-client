import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Thanks from "./Thanks";

//Toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../service/api";

const H1 = styled("h1")(() => ({
  fontWeight: "lighter",
  textAlign: "center",
}));

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "#c4c4c4",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "#c4c4c4",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 2,
    padding: "4px !important", // override inline-style
  },
});

export default function WithinTime({ data, qId }) {
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [thanks, setThanks] = useState(false);

  const toastId = useRef(null);

  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  const [options, setOptions] = useState({});
  const ref = useRef();
  const handleStart = () => {
    if (!name || !email) {
      ref.current.innerText = "Please fill all the fields first !!!";
      return;
    }
    if (!check) {
      ref.current.innerText = "Please check the box first !!!";
      return;
    }
    data[1].forEach((element, ind) => {
      setOptions({ ...options, [`opt${ind + 1}`]: "" });
    });
    api
      .post("scores/", { name, email, qId })
      .then((res) => {
        setSubmitted(true);
      })
      .catch((err) => {
        showToast(err.response.data.msg);
      });
  };

  const handleChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const Questions = () => {
    const questions = data[1].map((question, ind) => {
      return (
        <Grid item xs={12} key={ind} style={{ margin: "20px" }}>
          <h3>
            {`Q${ind + 1}.`}
            {question.ques}
          </h3>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="correct-ans"
              name={`opt${ind + 1}`}
              value={options[`opt${ind + 1}`]}
              onChange={handleChange}
            >
              <FormControlLabel
                value="A"
                control={<Radio />}
                label={`A.${question.optA}`}
              />
              <FormControlLabel
                value="B"
                control={<Radio />}
                label={`B.${question.optC}`}
              />
              <FormControlLabel
                value="C"
                control={<Radio />}
                label={`C.${question.optB}`}
              />
              <FormControlLabel
                value="D"
                control={<Radio />}
                label={`D.${question.optD}`}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    });
    return questions;
  };

  const handleSubmit = () => {
    let i = 0,
      score = 0;
    for (var option in options) {
      if (options[option] === data[1][i].correctOp) score++;
    }
    api
      .put("scores/", { email, score })
      .then((res) => {
        setThanks(true);
      })
      .catch((err) => {
        showToast(
          "Some error occured while submitting the quiz, please contact the admin."
        );
      });
  };

  return (
    <>
      {!thanks && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H1>{data[0].quizName}</H1>
            </Grid>
            {!submitted && (
              <>
                <Grid item xs={12}>
                  <h2>Details:</h2>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <ValidationTextField
                      required
                      size="small"
                      label="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <span style={{ padding: "10px", color: "white" }}>gap</span>
                  <FormControl>
                    <ValidationTextField
                      required
                      size="small"
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      Description :
                    </div>{" "}
                    <p style={{ fontSize: "larger", fontWeight: "light" }}>
                      {data[0].desc}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ fontSize: "large", fontWeight: "bolder" }}>
                    Total Time :{" "}
                    {parseInt(data[0].timeD) !== 0
                      ? `${data[0].timeD} days `
                      : ""}{" "}
                    {parseInt(data[0].timeH) !== 0
                      ? `${data[0].timeH} hours `
                      : ""}{" "}
                    {parseInt(data[0].timeM) !== 0
                      ? `${data[0].timeM} minutes`
                      : ""}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I agree to all the terms and conditions."
                    checked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                  />
                  <div ref={ref} style={{ color: "red" }}></div>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" onClick={handleStart}>
                    Start Test
                  </Button>
                </Grid>
              </>
            )}
            {submitted && Questions()}
            {submitted && (
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ marginLeft: "20px" }}
              >
                Submit Test
              </Button>
            )}
          </Grid>
        </Box>
      )}
      {thanks && <Thanks />}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
}
