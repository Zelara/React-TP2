import "./Boutons.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import IconButton from "@mui/material/IconButton";

function Boutons({ onPrecedent, onSuivant }) {
  return (
    <div className="Boutons">
      <IconButton className="icone-bouton" onClick={onPrecedent}>
        <FirstPageIcon />
      </IconButton>
      <IconButton className="icone-bouton" onClick={onPrecedent}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton className="icone-bouton" onClick={onSuivant}>
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton className="icone-bouton" onClick={onSuivant}>
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default Boutons;
