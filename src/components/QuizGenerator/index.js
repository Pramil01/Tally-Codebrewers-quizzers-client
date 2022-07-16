import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { v4 as uuid } from "uuid";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

//Toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const QuizGenerator = () => {
  let navigate = useNavigate();
  const toastId = React.useRef(null);

  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  const [data, setData] = useState({
    quizName: "",
    startTime: new Date(),
    endTime: new Date(),
    desc: "",
    timeD: 0,
    timeH: 0,
    timeM: 0,
  });

  const [qArrData, setQArrData] = useState([]);
  const [qData, setQData] = useState({
    ques: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
    correctOp: "",
  });

  const [quesArr, setQuesArr] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleQChange = (e) => {
    setQData({ ...qData, [e.target.name]: e.target.value });
  };
  const handleSubmitQ = (e) => {
    for (var key in qData) {
      if (!qData[key]) {
        showToast("please fill all the question fields");
        return;
      }
    }
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
        correctOp={qData.correctOp}
      />,
    ]);
    setQArrData([...qArrData, qData]);
    setQData({
      ques: "",
      optA: "",
      optB: "",
      optC: "",
      optD: "",
      correctOp: "",
    });
  };

  const handleSubmit = () => {
    if (qArrData.length === 0) {
      showToast("Add atleast one question");
      return;
    }
    for (var key in data) {
      if (!data[key]) {
        if (key === "timeD") continue;
        showToast("please fill all the data fields");
        return;
      }
    }
    const totalData = {
      qId: uuid(),
      questions: [data, qArrData],
      admin: localStorage.getItem("Admin"),
    };
    console.log(totalData);
    api
      .post("ques/", totalData)
      .then((res) => {
        navigate("/adminWindow");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 style={{ textAlign: "center" }}> Create a new quiz </h1>
        </Grid>
        <br />
        <Grid item xs={4}>
          <FormControl>
            <ValidationTextField
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
              renderInput={(props) => <ValidationTextField {...props} />}
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
              renderInput={(props) => <ValidationTextField {...props} />}
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
            <ValidationTextField
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
        <Grid item xs={4}>
          <FormControl fullWidth>
            <ValidationTextField
              id="duration"
              label="Quiz duration (days)"
              type="number"
              name="timeD"
              value={data.timeD}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <ValidationTextField
              id="duration"
              label="Quiz duration (hours)"
              type="number"
              name="timeH"
              value={data.timeH}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <ValidationTextField
              id="duration"
              label="Quiz duration (minutes)"
              type="number"
              name="timeM"
              value={data.timeM}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <h1 style={{ textAlign: "center" }}> Add Questions</h1>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <ValidationTextField
              required
              label="Question"
              value={qData.ques}
              name="ques"
              onChange={handleQChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <ValidationTextField
              required
              label="Option A"
              value={qData.optA}
              name="optA"
              onChange={handleQChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <ValidationTextField
              required
              label="Option B"
              value={qData.optB}
              name="optB"
              onChange={handleQChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <ValidationTextField
              required
              label="Option C"
              value={qData.optC}
              name="optC"
              onChange={handleQChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <ValidationTextField
              required
              label="Option D"
              value={qData.optD}
              name="optD"
              onChange={handleQChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel id="correct-ans">Correct Option</FormLabel>
            <RadioGroup
              row
              aria-labelledby="correct-ans"
              name="correctOp"
              value={qData.correctOp}
              onChange={handleQChange}
            >
              <FormControlLabel value="A" control={<Radio />} label="A" />
              <FormControlLabel value="B" control={<Radio />} label="B" />
              <FormControlLabel value="C" control={<Radio />} label="C" />
              <FormControlLabel value="D" control={<Radio />} label="D" />
            </RadioGroup>
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
};

export default QuizGenerator;
