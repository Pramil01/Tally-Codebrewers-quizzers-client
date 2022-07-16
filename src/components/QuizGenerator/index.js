import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import FormHelperText from "@mui/material/FormHelperText";
// import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { v4 as uuid } from "uuid";
import Question from "./Question";
import api from "../../service/api";

const QuizGenerator = () => {
  const [data, setData] = useState({
    quizName: "",
    startTime: new Date(),
    endTime: new Date(),
    desc: "",
  });

  const [qArrData, setQArrData] = useState([]);
  const [qData, setQData] = useState({
    ques: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
  });

  const [quesArr, setQuesArr] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleQChange = (e) => {
    setQData({ ...qData, [e.target.name]: e.target.value });
  };
  const handleSubmitQ = (e) => {
    setQuesArr([
      ...quesArr,
      <Question
        key={quesArr.length + 1}
        id={quesArr.length + 1}
        Ques={qData.ques}
        optA={qData.optA}
        optB={qData.optB}
        optC={qData.optC}
        optD={qData.optD}
      />,
    ]);
    setQArrData([...qArrData, qData]);
    setQData({ ques: "", optA: "", optB: "", optC: "", optD: "" });
  };

  const handleSubmit = () => {
    const totalData = {
      qId: uuid(),
      questions: [data, qArrData],
    };
    console.log(totalData);
    api
      .post("ques/", totalData)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1 style={{ textAlign: "center" }}> Create a new quiz </h1>
      </Grid>
      <br />
      <Grid item xs={4}>
        <FormControl>
          <TextField
            required
            label="Quiz Name"
            name="quizName"
            value={data.quizName}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Time*"
            value={data.startTime}
            onChange={(value) => {
              setData({ ...data, startTime: value });
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End Time*"
            value={data.endTime}
            onChange={(value) => {
              setData({ ...data, endTime: value });
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={10}>
        <FormControl fullWidth>
          <TextField
            id="description"
            label="Quiz Description"
            multiline
            rows={4}
            defaultValue="Default Value"
            value={data.desc}
            name="desc"
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h1 style={{ textAlign: "center" }}> Add Questions</h1>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Question</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Question"
            value={qData.ques}
            name="ques"
            onChange={handleQChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Option A</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Option A"
            value={qData.optA}
            name="optA"
            onChange={handleQChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Option B</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Option B"
            value={qData.optB}
            name="optB"
            onChange={handleQChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Option C</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Option C"
            value={qData.optC}
            name="optC"
            onChange={handleQChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Option D</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Option D"
            value={qData.optD}
            name="optD"
            onChange={handleQChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmitQ}>
          Submit
        </Button>
      </Grid>
      {quesArr}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Generate Quiz Link
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuizGenerator;
