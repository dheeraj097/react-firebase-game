import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: "#1983ed" }}>
      <Container>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            component="label"
          >
            <CasinoRoundedIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DICE GAME
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" color="inherit">
              Play
            </Button>
            <Button component={Link} to="/rules" color="inherit">
              Rules
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
