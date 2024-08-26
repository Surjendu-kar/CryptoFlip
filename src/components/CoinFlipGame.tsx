import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  styled,
} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#e2e8f0", // Add this line to change the default label color
  },
  "& label.Mui-focused": {
    color: "#e2e8f0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#e2e8f0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e2e8f0",
    },
    "& input": {
      color: "#e2e8f0",
    },
  },
  marginBottom: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e2e8f0", // Add this line to change the default border color
    },
    "&:hover fieldset": {
      borderColor: "#e2e8f0", // Add this line to change the hover border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e2e8f0",
    },
  },
  "& .MuiSelect-select": {
    color: "#e2e8f0",
  },
  "& .MuiInputLabel-root": {
    color: "#e2e8f0", // Add this line to change the label color
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8197ff",
  color: "#e2e8f0",
  "&:hover": {
    backgroundColor: "#a5b4fc",
  },
  "&:disabled": {
    color: "#e2e8f0", // This sets the text color to white when disabled
    opacity: 0.5, // This adds some transparency to indicate it's disabled
    background: "#121725",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: "4px 10px",
  },
}));

const StyledTypography = styled(Typography)({
  color: "#e2e8f0",
  // fontWeight: 550,
});

const StyledCoin = styled("div")(() => ({
  width: "100px",
  height: "100px",
  transformStyle: "preserve-3d",
  cursor: "pointer",
  transition: "transform 0.5s",
  "&.is-flipped": {
    transform: "rotateX(180deg)",
  },
  "&.flipping-1": {
    animation: "2s linear 0s 1 normal flipping",
    transform: "rotateX(0deg)",
  },
  "&.flipping-2": {
    animation: "2s linear 0s 1 normal flipping-2",
    transform: "rotateX(0deg)",
  },
  "&.flipping-3": {
    animation: "2s linear 0s 1 normal flipping-3",
    transform: "rotateX(0deg)",
  },
  "@keyframes flipping": {
    "0%": { transform: "rotateX(0deg) scale(1)" },
    "50%": { transform: "rotateX(360deg) scale(1.5)" },
    "100%": { transform: "rotateX(720deg) scale(1)" },
  },
  "@keyframes flipping-2": {
    "0%": { transform: "rotateX(0deg) scale(1)" },
    "50%": { transform: "rotateX(540deg) scale(1.5)" },
    "100%": { transform: "rotateX(1080deg) scale(1)" },
  },
  "@keyframes flipping-3": {
    "0%": { transform: "rotateX(0deg) scale(1)" },
    "50%": { transform: "rotateX(720deg) scale(1.5)" },
    "100%": { transform: "rotateX(1440deg) scale(1)" },
  },
}));

const CoinFace = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  color: "#fff",
  textAlign: "center",
  fontWeight: 700,
  borderRadius: "50%",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  padding: "12px",
});

const CoinInner = styled("div")({
  width: "100%",
  height: "100%",
  border: "2px dotted #fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  textTransform: "uppercase",
});

const CoinFaceFront = styled(CoinFace)({
  background: "#d31c92",
});

const CoinFaceBack = styled(CoinFace)({
  background: "#000",
  transform: "rotateX(180deg)",
});

interface CoinFlipGameProps {
  address: string;
}

const CoinFlipGame: React.FC<CoinFlipGameProps> = () => {
  const DEFAULT_BALANCE = "10";
  const [gameBalance, setGameBalance] = useState<string>(DEFAULT_BALANCE);
  const [betAmount, setBetAmount] = useState<string>("");
  const [selectedSide, setSelectedSide] = useState<string>("heads");
  const [result, setResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipAnimation, setFlipAnimation] = useState<string>("");

  const handleFlip = () => {
    setIsFlipping(true);
    const randomValue = Math.random();
    const flipResult = randomValue < 0.5 ? "heads" : "tails";
    const randomAnimation = `flipping-${Math.floor(Math.random() * 3) + 1}`;
    setFlipAnimation(randomAnimation);

    setTimeout(() => {
      setResult(flipResult);
      setIsFlipping(false);
      setFlipAnimation("");

      setGameBalance((prevBalance) => {
        if (flipResult === selectedSide) {
          // User wins
          return (
            parseFloat(betAmount) * 2 +
            parseFloat(prevBalance)
          ).toString();
        } else {
          // User loses
          return (parseFloat(prevBalance) - parseFloat(betAmount)).toString();
        }
      });
    }, 2000);
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <StyledTypography variant="h5" gutterBottom>
        Coin Flip Game
      </StyledTypography>
      <Box sx={{ mb: 2 }}>
        <StyledTypography variant="body1">
          Game Balance: {gameBalance} ETH
        </StyledTypography>
        {parseFloat(gameBalance) > 0 && (
          <StyledTypography variant="body2" color="textSecondary">
            (Includes {DEFAULT_BALANCE} ETH free balance)
          </StyledTypography>
        )}
      </Box>
      <StyledTextField
        fullWidth
        label="Bet Amount (ETH)"
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        autoComplete="off"
      />
      <StyledFormControl fullWidth>
        <Select
          value={selectedSide}
          onChange={(e) => setSelectedSide(e.target.value as string)}
        >
          <MenuItem value="heads">Heads</MenuItem>
          <MenuItem value="tails">Tails</MenuItem>
        </Select>
      </StyledFormControl>
      <Box mb={1} sx={{ display: "flex", justifyContent: "center" }}>
        <StyledCoin
          className={`${isFlipping ? flipAnimation : ""} ${
            !isFlipping && result === "tails" ? "is-flipped" : ""
          }`}
        >
          <CoinFaceFront>
            <CoinInner>Heads</CoinInner>
          </CoinFaceFront>
          <CoinFaceBack>
            <CoinInner>Tails</CoinInner>
          </CoinFaceBack>
        </StyledCoin>
      </Box>
      <StyledButton
        variant="contained"
        onClick={handleFlip}
        disabled={
          isFlipping ||
          !gameBalance ||
          betAmount === "" ||
          parseFloat(betAmount) <= 0 ||
          parseFloat(betAmount) > parseFloat(gameBalance)
        }
      >
        Flip Coin
      </StyledButton>
      {/* {result && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Result: {result.charAt(0).toUpperCase() + result.slice(1)}
        </Typography>
      )} */}
    </Box>
  );
};

export default CoinFlipGame;
