import { Box, Divider, Grid, TextField } from "@mui/material";
import { useState } from "react";
import ReverseCalc from "../components/ReverseCalc";

export default function ReverseCalcPage() {
  const initial_status = null as unknown as number;
  const [vocal, setVocal] = useState(initial_status);
  const [dance, setDance] = useState(initial_status);
  const [visual, setVisual] = useState(initial_status);
  const rank = 1;
  const before_exam = true;

  return (
    <div className="ReverseCalcPage">
      <div className="ReverseCalcInput">
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={500} maxWidth={"100%"}>
            <Grid container rowSpacing={2} mt={0} ml={0}>
              <Grid item sm={4} xs={12}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: "90%", maxWidth: 150 }}>
                    <TextField
                      id="outlined-number"
                      label="Vocal"
                      type="number"
                      inputMode="numeric"
                      defaultValue={vocal}
                      onChange={(e) => setVocal(Number(e.target.value))}
                      variant="outlined"
                      focused
                      color="error"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: "90%", maxWidth: 150 }}>
                    <TextField
                      id="outlined-number"
                      label="Dance"
                      type="number"
                      inputMode="numeric"
                      defaultValue={dance}
                      onChange={(e) => setDance(Number(e.target.value))}
                      variant="outlined"
                      focused
                      color="info"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: "90%", maxWidth: 150 }}>
                    <TextField
                      id="outlined-number"
                      label="Visual"
                      type="number"
                      inputMode="numeric"
                      defaultValue={visual}
                      onChange={(e) => setVisual(Number(e.target.value))}
                      variant="outlined"
                      focused
                      color="warning"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
      <Divider sx={{ paddingTop: "2em" }} />
      <ReverseCalc
        vocal={vocal}
        dance={dance}
        visual={visual}
        rank={rank}
        before_exam={before_exam}
      />
    </div>
  );
}
