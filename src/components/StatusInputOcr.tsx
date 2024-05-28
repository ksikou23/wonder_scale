import { Box, Button, Grid } from "@mui/material";
import Image from "image-js";
import Tesseract from "tesseract.js";

export default function StatusInputOcr(props: {
  setVocal: React.Dispatch<React.SetStateAction<number>>;
  setDance: React.Dispatch<React.SetStateAction<number>>;
  setVisual: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div style={{ paddingTop: "1em" }}>
      <Button variant="contained" component="label">
        画像から自動入力
        <input
          type="file"
          accept="image/*"
          name="status-screenshot"
          id="status-screenshot"
          onChange={(e) => {
            ocr_screenshot(props.setVocal, props.setDance, props.setVisual, e);
          }}
          hidden
        />
      </Button>
      <div className="ocr-debug" style={{ paddingTop: "1em" }}>
        <img id="ocr-base" width="400" hidden />
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={500} maxWidth={"100%"}>
            <Grid container>
              <Grid item key={"ocr-vocal"} sm={4} xs={12}>
                <img src="" alt="" id="ocr-vocal" width={100} hidden />
              </Grid>
              <Grid item key={"ocr-dance"} sm={4} xs={12}>
                <img src="" alt="" id="ocr-dance" width={100} hidden />
              </Grid>
              <Grid item key={"ocr-visual"} sm={4} xs={12}>
                <img src="" alt="" id="ocr-visual" width={100} hidden />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

function ocr_screenshot(
  setVocal: React.Dispatch<React.SetStateAction<number>>,
  setDance: React.Dispatch<React.SetStateAction<number>>,
  setVisual: React.Dispatch<React.SetStateAction<number>>,
  event: React.ChangeEvent<HTMLInputElement>
) {
  // get screenshot image
  if (event.target.files === null || event.target.files?.length === 0) {
    console.log("no file selected");
    return;
  }
  const file = event.target.files[0];
  // TODO file-format validation

  // load image
  const img_url = URL.createObjectURL(file);
  Image.load(img_url).then((image) => {
    // make image for ocr
    const binary_img = image.grey().mask({ threshold: 0.99 }).invert();

    // crop status area
    let ocr_img = null;
    const aspect_ratio = binary_img.height / binary_img.width;
    const aspect_ratio_threshold = 1.6; // TODO
    if (aspect_ratio >= aspect_ratio_threshold) {
      // for mobile phone
      ocr_img = binary_img.clone().crop({
        x: binary_img.width * 0.15,
        y: binary_img.height * 0.71,
        width: binary_img.width * 0.2,
        height: binary_img.height * 0.17,
      });
    } else {
      // for tablet
      ocr_img = binary_img.clone().crop({
        x: binary_img.width * 0.24,
        y: binary_img.height * 0.71,
        width: binary_img.width * 0.18,
        height: binary_img.height * 0.17,
      });
    }
    const img_element = document.getElementById("ocr-base") as HTMLImageElement;
    img_element.src = ocr_img.toDataURL();
    img_element.hidden = true;

    // ocr definition
    const ocr_infos = [
      {
        x: 0,
        y: 0,
        width: ocr_img.width,
        height: ocr_img.height / 3,
        setValue: setVocal,
        id: "ocr-vocal",
      },
      {
        x: 0,
        y: ocr_img.height / 3,
        width: ocr_img.width,
        height: ocr_img.height / 3,
        setValue: setDance,
        id: "ocr-dance",
      },
      {
        x: 0,
        y: (ocr_img.height / 3) * 2,
        width: ocr_img.width,
        height: ocr_img.height / 3,
        setValue: setVisual,
        id: "ocr-visual",
      },
    ];

    // execute ocr
    ocr_infos.forEach((ocr_info) => {
      const cropped = ocr_img.crop({
        x: ocr_info.x,
        y: ocr_info.y,
        width: ocr_info.width,
        height: ocr_info.height,
      });
      const img_url = cropped.toDataURL();
      ocr_screenshot1(img_url, ocr_info.setValue);

      // for debug
      const img_element = document.getElementById(
        ocr_info.id
      ) as HTMLImageElement;
      img_element.src = img_url;
      // set false to show image
      img_element.hidden = false;
    });
  });
}

function ocr_screenshot1(
  img_url: string,
  setValue: React.Dispatch<React.SetStateAction<number>>
) {
  Tesseract.createWorker("eng+jpn").then((worker) => {
    worker.setParameters({
      tessedit_char_whitelist: "0123456789",
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_LINE,
    });
    worker.recognize(img_url).then((result) => {
      if (isNaN(Number(result.data.text))) {
        setValue(0);
      } else {
        setValue(Number(result.data.text));
      }
    });
  });
}
