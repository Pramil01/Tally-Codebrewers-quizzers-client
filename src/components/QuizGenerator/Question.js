import React from "react";
import Grid from "@mui/material/Grid";

const Question = ({ Ques, correctOp, optA, optB, optC, optD, id }) => {
  return (
    <>
      <Grid item xs={12}>
        Q{id}. {Ques}
      </Grid>
      <Grid item xs={6}>
        A. {optA}
      </Grid>
      <Grid item xs={6}>
        B. {optB}
      </Grid>
      <Grid item xs={6}>
        C. {optC}
      </Grid>
      <Grid item xs={6}>
        D. {optD}
      </Grid>
      <Grid item xs={6}>
        Correct Option: {correctOp}
      </Grid>
    </>
  );
};

export default Question;
