import "./Boutons.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import IconButton from "@mui/material/IconButton";

function Boutons() {
  return (
    <div className="Boutons">
      <IconButton className="icone-bouton">
        <FirstPageIcon />
      </IconButton>
      <IconButton className="icone-bouton">
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton className="icone-bouton">
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton className="icone-bouton">
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default Boutons;
