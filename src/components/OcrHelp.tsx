import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useState } from "react";

export default function OcrHelp() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="OcrHelp">
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
        <HelpOutlineOutlinedIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>
          ※OCR処理はご利用の端末で行われるため、画像がどこかへアップロードされることはありません
        </Typography>
        <Typography sx={{ p: 2 }}>
          ※以下のサンプルのような試験開始前のスクリーンショットを選択することで、自動でステータスが入力されます
        </Typography>
        <Typography sx={{ p: 2 }}>
          ※正しく読み取られない事があります。下部に表示される確認用画像との確認を一応行ってください
        </Typography>

        <Box justifyContent="center" display="flex" padding={"2em"}>
          <img src="/images/ocr-sample.webp" alt="ocr-sample" width="70%" />
        </Box>
      </Popover>
    </div>
  );
}
