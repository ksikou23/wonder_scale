import { Button } from "@mui/material";
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
      <br />
      <img
        src=""
        alt=""
        id="screenshot"
        width={150}
        style={{ paddingTop: "1em", margin: "0-100%" }}
      />
    </div>
  );
}

function ocr_screenshot(
  setVocal: React.Dispatch<React.SetStateAction<number>>,
  setDance: React.Dispatch<React.SetStateAction<number>>,
  setVisual: React.Dispatch<React.SetStateAction<number>>,
  event: React.ChangeEvent<HTMLInputElement>
) {
  console.log("read screenshot");
  console.log(event);

  // get screenshot image
  if (event.target.files === null || event.target.files?.length === 0) {
    console.log("no file selected");
    return;
  }
  const file = event.target.files[0];
  // TODO file-format validation

  // render
  const img_element = document.getElementById("screenshot") as HTMLImageElement;
  const img_url = URL.createObjectURL(file);
  img_element.src = img_url;

  // load image
  Image.load(img_url).then((image) => {
    // resize and crop
    const resized = image.resize({ width: 400 });
    const preview = resized.crop({ x: 80, y: 378, width: 65, height: 85 });
    const img_element = document.getElementById(
      "screenshot"
    ) as HTMLImageElement;
    img_element.src = preview.toDataURL();
    const ocr_infos = [
      {
        x: 100,
        y: 380,
        width: 40,
        height: 15,
        setValue: setVocal,
      },
      {
        x: 100,
        y: 413,
        width: 40,
        height: 15,
        setValue: setDance,
      },
      {
        x: 100,
        y: 445,
        width: 40,
        height: 15,
        setValue: setVisual,
      },
    ];
    ocr_infos.forEach((ocr_info) => {
      const cropped = resized.crop({
        x: ocr_info.x,
        y: ocr_info.y,
        width: ocr_info.width,
        height: ocr_info.height,
      });
      const img_url = cropped.toDataURL();
      ocr_screenshot1(img_url, ocr_info.setValue);
    });
  });
}

function ocr_screenshot1(
  img_url: string,
  setValue: React.Dispatch<React.SetStateAction<number>>
) {
  Tesseract.recognize(img_url, "eng").then((e) => {
    // exit if no text data
    if (e.data.text.length === 0) {
      setValue(0);
      return;
    }
    const value = e.data.words[0]?.text.replace("pt", "").replace(",", "");
    // exit if not number
    if (isNaN(Number(value))) {
      setValue(0);
      return;
    }
    setValue(Number(value));
  });
}
