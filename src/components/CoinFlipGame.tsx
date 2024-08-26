import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "black",
    fontWeight: 550,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
    "& input": {
      fontWeight: 550,
    },
  },
  marginBottom: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiSelect-select": {
    fontWeight: 550,
  },
  "& .MuiInputLabel-root": {
    fontWeight: 550,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8D493A",
  color: "white",
  fontWeight: 550,
  "&:hover": {
    backgroundColor: "#753d31",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: "4px 10px",
  },
}));

const StyledTypography = styled(Typography)({
  fontWeight: 550,
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

  const handleFlip = () => {
    setIsFlipping(true);
    const randomValue = Math.random();
    const flipResult = randomValue < 0.5 ? "heads" : "tails";

    setTimeout(() => {
      setResult(flipResult);
      setIsFlipping(false);

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
      />
      <StyledFormControl fullWidth>
        <InputLabel>Side</InputLabel>
        <Select
          value={selectedSide}
          onChange={(e) => setSelectedSide(e.target.value as string)}
        >
          <MenuItem value="heads">Heads</MenuItem>
          <MenuItem value="tails">Tails</MenuItem>
        </Select>
      </StyledFormControl>
      <Box mb={1}>
        <div className={`coin ${isFlipping ? "flip" : ""}`} id="coin">
          <img
            src={
              result === "tails"
                ? "https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png"
                : "https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png"
            }
            alt={result || "Coin"}
          />
        </div>
      </Box>
      <StyledButton
        variant="contained"
        onClick={handleFlip}
        disabled={
          isFlipping ||
          !gameBalance ||
          parseFloat(betAmount) <= 0 ||
          parseFloat(betAmount) > parseFloat(gameBalance)
        }
      >
        Flip Coin
      </StyledButton>
      {result && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Result: {result.charAt(0).toUpperCase() + result.slice(1)}
        </Typography>
      )}
    </Box>
  );
};

export default CoinFlipGame;
