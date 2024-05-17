import "./Aime.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

function Aime() {
  return (
    <div className="Aime">
      <IconButton className="icone-aime">
        <FavoriteIcon />
      </IconButton>
    </div>
  );
}

export default Aime;
