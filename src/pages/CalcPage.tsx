import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ForwardCalc from "../components/ForwardCalc";
import ReverseCalc from "../components/ReverseCalc";
import StatusInputOcr from "../components/StatusInputOcr";

export default function CalcPage() {
  const initial_status = 0;
  const [vocal, setVocal] = useState(initial_status);
  const [dance, setDance] = useState(initial_status);
  const [visual, setVisual] = useState(initial_status);

  const available_ranks = [1, 2, 3, 6];
  const default_rank = available_ranks[0];
  const [rank, setRank] = useState(default_rank);

  const default_before_exam = true;
  const [before_exam, setBeforeExam] = useState(true);
  const toggleBeforeExamSwitch = () => {
    setBeforeExam(!before_exam);
  };

  const default_is_reverse = true;
  const [is_reverse, setIsReverse] = useState(default_is_reverse);
  const toggleReverseSwitch = () => {
    setIsReverse(!is_reverse);
  };

  const initial_exam_point = 0;
  const [exam_point, setExamPoint] = useState(initial_exam_point);

  function reset_status() {
    setVocal(0);
    setDance(initial_status);
    setVisual(initial_status);
    setRank(default_rank);
    setExamPoint(initial_exam_point);
    setBeforeExam(default_before_exam);
    ["ocr-base", "ocr-vocal", "ocr-dance", "ocr-visual"].forEach((id) => {
      const img_element = document.getElementById(id) as HTMLImageElement;
      img_element.src = "";
      img_element.hidden = true;
    });
  }

  return (
    <div className="CalcPage">
      <div className="CalcInput">
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={500} maxWidth={"100%"}>
            <Grid container>
              <Grid item sm={6} xs={12} key={"input-reverse"}>
                <Box sx={{ width: 180 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={is_reverse}
                          onChange={toggleReverseSwitch}
                        />
                      }
                      label="正引き／逆引き"
                    />
                  </FormGroup>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12} key={"input-before_exam"}>
                <Box sx={{ width: 180 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!before_exam}
                          onChange={toggleBeforeExamSwitch}
                        />
                      }
                      label="最終試験前／後"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>

            <Grid container rowSpacing={2} mt={0} ml={0}>
              <Grid item sm={4} xs={12}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: "90%", maxWidth: 150 }}>
                    <TextField
                      id="input-vocal"
                      label="Vocal"
                      type="number"
                      inputProps={{ inputMode: "numeric" }}
                      value={get_input_value(vocal)}
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
                      id="input-dance"
                      label="Dance"
                      type="number"
                      inputProps={{ inputMode: "numeric" }}
                      value={get_input_value(dance)}
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
                      id="input-visual"
                      label="Visual"
                      type="number"
                      inputProps={{ inputMode: "numeric" }}
                      value={get_input_value(visual)}
                      onChange={(e) => setVisual(Number(e.target.value))}
                      variant="outlined"
                      focused
                      color="warning"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: "90%", maxWidth: 150 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        最終試験順位
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rank.toString()}
                        label="最終試験順位"
                        onChange={(e): void => {
                          setRank(Number(e.target.value));
                        }}
                      >
                        {available_ranks.map((e) => (
                          <MenuItem value={e} key={e}>
                            {e}位
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {is_reverse ? (
                <></>
              ) : (
                <Grid item sm={4} xs={12}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Box sx={{ width: "90%", maxWidth: 150 }}>
                      <TextField
                        id="input-exam_point"
                        label="最終試験点数"
                        type="number"
                        inputProps={{ inputMode: "numeric" }}
                        value={get_input_value(exam_point)}
                        onChange={(e) => setExamPoint(Number(e.target.value))}
                        variant="outlined"
                        focused={false}
                      />
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <Button onClick={reset_status}>Reset</Button>
        <StatusInputOcr
          setVocal={setVocal}
          setDance={setDance}
          setVisual={setVisual}
        />
      </div>
      <Divider sx={{ paddingTop: "2em" }} />
      {is_reverse ? (
        <ReverseCalc
          vocal={vocal}
          dance={dance}
          visual={visual}
          rank={rank}
          before_exam={before_exam}
        />
      ) : (
        <ForwardCalc
          vocal={vocal}
          dance={dance}
          visual={visual}
          rank={rank}
          before_exam={before_exam}
          exam_point={exam_point}
        />
      )}
    </div>
  );
}

function get_input_value(value: number) {
  if (value <= 0) {
    return "";
  }
  return value.toString();
}
