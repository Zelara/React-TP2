import "./Boutons.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import IconButton from "@mui/material/IconButton";

function Boutons({ onPrecedent, onSuivant, onPremierePage, onDernierePage, desactiverPrecedent, desactiverSuivant }) {
  return (
    <div className="Boutons">
      <IconButton className="icone-bouton" onClick={onPremierePage} disabled={desactiverPrecedent}>
        <FirstPageIcon />
      </IconButton>
      <IconButton className="icone-bouton" onClick={onPrecedent} disabled={desactiverPrecedent}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton className="icone-bouton" onClick={onSuivant} disabled={desactiverSuivant}>
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton className="icone-bouton" onClick={onDernierePage} disabled={desactiverSuivant}>
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default Boutons;
