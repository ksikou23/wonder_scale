import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ReverseCalc from "../components/ReverseCalc";
import StatusInputOcr from "../components/StatusInputOcr";

export default function ReverseCalcPage() {
  const initial_status = 0;
  const [vocal, setVocal] = useState(initial_status);
  const [dance, setDance] = useState(initial_status);
  const [visual, setVisual] = useState(initial_status);
  const available_ranks = [1, 2, 3, 6];
  const default_rank = available_ranks[0];
  const [rank, setRank] = useState(default_rank);
  const before_exam = true;

  function reset_status() {
    setVocal(0);
    setDance(initial_status);
    setVisual(initial_status);
    setRank(default_rank);
    ["ocr-base", "ocr-vocal", "ocr-dance", "ocr-visual"].forEach((id) => {
      const img_element = document.getElementById(id) as HTMLImageElement;
      img_element.src = "";
      img_element.hidden = true;
    });
  }

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
                      id="input-vocal"
                      label="Vocal"
                      type="number"
                      inputProps={{ inputMode: "numeric" }}
                      value={(vocal || vocal === 0) ?? ""}
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
                      value={(dance || dance === 0) ?? ""}
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
                      value={(visual || visual === 0) ?? ""}
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
