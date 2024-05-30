import { Box, Button, Grid } from "@mui/material";
import Image from "image-js";
import Tesseract from "tesseract.js";
import {
  dance_color,
  equal_color,
  near_color,
  visual_color,
  vocal_color,
} from "../util/color";

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
  Image.load(img_url).then(async (image) => {
    const position = await get_position(image);
    console.log(position);

    // make image for ocr
    const binary_img = image.grey().mask({ threshold: 0.99 }).invert();

    // ocr definition
    const crop_width = Math.floor(image.width * 0.17);
    const shift_x = Math.floor(image.width * 0.015);
    const crop_height = Math.floor((position.visual.y - position.dance.y) / 2);
    const plus_y = Math.min(20, Math.floor(image.height * 0.01));
    const ocr_infos = [
      {
        x: position.vocal.x + shift_x,
        y: position.vocal.y - crop_height,
        width: crop_width,
        height: crop_height + plus_y,
        setValue: setVocal,
        id: "ocr-vocal",
      },
      {
        x: position.dance.x + shift_x,
        y: position.dance.y - crop_height,
        width: crop_width,
        height: crop_height + plus_y,
        setValue: setDance,
        id: "ocr-dance",
      },
      {
        x: position.visual.x + shift_x,
        y: position.visual.y - crop_height,
        width: crop_width,
        height: crop_height + plus_y,
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
      ocr_status(img_url, ocr_info.setValue);

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

function ocr_status(
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

function loadImage(image: Image) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = image.toDataURL();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

async function get_position(image: Image) {
  const img_image = (await loadImage(image)) as HTMLImageElement;
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d")?.drawImage(img_image, 0, 0);
  const image_data =
    canvas.getContext("2d")?.getImageData(0, 0, canvas.width, canvas.height) ??
    new ImageData(0, 0);

  // from lower-left to upper-right
  const lower_left_vocal = { x: 0, y: image_data.height };
  const lower_left_dance = { x: 0, y: image_data.height };
  const lower_left_visual = { x: 0, y: image_data.height };
  let break_vocal = false;
  let break_dance = false;
  let break_visual = false;

  // find color
  index_for: for (
    let y = image_data.height;
    y >= image_data.height * 0.5;
    y--
  ) {
    for (let x = 0; x < Math.floor(image_data.width * 0.5); x++) {
      if (break_vocal && break_dance && break_visual) {
        break index_for;
      }
      const index = (y * image_data.width + x) * 4;
      const index_color = {
        r: image_data.data[index],
        g: image_data.data[index + 1],
        b: image_data.data[index + 2],
      };
      if (!break_vocal && equal_color(index_color, vocal_color)) {
        lower_left_vocal.x = x;
        lower_left_vocal.y = y;
        break_vocal = true;
      }
      if (!break_dance && equal_color(index_color, dance_color)) {
        lower_left_dance.x = x;
        lower_left_dance.y = y;
        break_dance = true;
      }
      if (!break_visual && equal_color(index_color, visual_color)) {
        lower_left_visual.x = x;
        lower_left_visual.y = y;
        break_visual = true;
      }
    }
  }

  // if not found, find nearest color
  index_for: for (
    let y = image_data.height;
    y >= image_data.height * 0.5;
    y--
  ) {
    for (let x = 0; x < Math.floor(image_data.width * 0.5); x++) {
      if (break_vocal && break_dance && break_visual) {
        break index_for;
      }
      const index = (y * image_data.width + x) * 4;
      const index_color = {
        r: image_data.data[index],
        g: image_data.data[index + 1],
        b: image_data.data[index + 2],
      };
      if (!break_vocal && near_color(index_color, vocal_color)) {
        lower_left_vocal.x = x;
        lower_left_vocal.y = y;
        break_vocal = true;
      }
      if (!break_dance && near_color(index_color, dance_color)) {
        lower_left_dance.x = x;
        lower_left_dance.y = y;
        break_dance = true;
      }
      if (!break_visual && near_color(index_color, visual_color)) {
        lower_left_visual.x = x;
        lower_left_visual.y = y;
        break_visual = true;
      }
    }
  }

  return {
    vocal: lower_left_vocal,
    dance: lower_left_dance,
    visual: lower_left_visual,
  };
}
