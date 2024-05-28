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
    // calc ratio
    const resize_base_width = 400;
    let resize_ratio = image.width / resize_base_width;
    if (image.width < resize_base_width) {
      resize_ratio = 1;
      console.log("image is small");
    }

    // make image for ocr
    const binary_img = image
      .grey()
      .mask({ threshold: 0.99 })
      .invert()
      .resize({ width: resize_base_width * resize_ratio });

    // ocr definition
    const ocr_infos = [
      {
        x: 100 * resize_ratio,
        y: 380 * resize_ratio,
        width: 40 * resize_ratio,
        height: 15 * resize_ratio,
        setValue: setVocal,
        id: "ocr-vocal",
      },
      {
        x: 100 * resize_ratio,
        y: 413 * resize_ratio,
        width: 40 * resize_ratio,
        height: 15 * resize_ratio,
        setValue: setDance,
        id: "ocr-dance",
      },
      {
        x: 100 * resize_ratio,
        y: 445 * resize_ratio,
        width: 40 * resize_ratio,
        height: 15 * resize_ratio,
        setValue: setVisual,
        id: "ocr-visual",
      },
    ];

    // execute ocr
    ocr_infos.forEach((ocr_info) => {
      const cropped = binary_img.crop({
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
