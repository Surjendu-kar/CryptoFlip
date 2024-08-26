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
  Tooltip,
} from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Heading = styled(StyledTypography)({
  fontWeight: "bold",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: theme.palette.text.primary,
  },
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "& input": {
      color: theme.palette.text.primary,
    },
  },
  marginBottom: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.text.primary,
    },
  },
  "& .MuiSelect-select": {
    color: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8197ff",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "#a5b4fc",
  },
  "&:disabled": {
    color: theme.palette.text.primary,
    opacity: 0.5,
    background: "#121725",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: "4px 10px",
  },
}));

const StyledCoin = styled("div")(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
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

const CoinFace = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  color: "#fff",
  textAlign: "center",
  fontWeight: 700,
  borderRadius: "50%",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  padding: theme.spacing(1.2),
}));

const CoinInner = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "2px dotted #fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: theme.spacing(2),
  textTransform: "uppercase",
}));

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
      setBetAmount("");

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
      <Heading variant="h5" gutterBottom>
        Coin Flip Game
      </Heading>
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

      <Tooltip
        title={
          isFlipping
            ? "Waiting for the current flip to complete"
            : !gameBalance
            ? "No balance available"
            : betAmount === "" || parseFloat(betAmount) <= 0
            ? "Enter a valid bet amount"
            : parseFloat(betAmount) > parseFloat(gameBalance) &&
              "Bet amount exceeds available balance"
        }
        disableHoverListener={
          !isFlipping &&
          !!gameBalance &&
          betAmount !== "" &&
          parseFloat(betAmount) > 0 &&
          parseFloat(betAmount) <= parseFloat(gameBalance)
        }
      >
        <span>
          <StyledButton
            variant="contained"
            onClick={handleFlip}
            disableElevation
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
        </span>
      </Tooltip>
    </Box>
  );
};

export default CoinFlipGame;
