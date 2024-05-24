import React, { useEffect, useState } from "react";
import "./Aime.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { bd, collBandes } from "../code/init";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";


function Aime({ utilisateur, bandeId }) {
  const [aime, setAime] = useState(false);
  const [nbAimes, setNbAimes] = useState(0);

  useEffect(() => {
    const fetchAimes = async () => {
      const docRef = doc(bd, collBandes, bandeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNbAimes(data.aime?.length || 0);
        setAime(data.aime?.includes(utilisateur.uid) || false);
      }
    };

    fetchAimes();
  }, [bandeId, utilisateur]);

  const handleAimeToggle = async () => {
    const docRef = doc(bd, collBandes, bandeId);

    if (aime) {
      await updateDoc(docRef, {
        aime: arrayRemove(utilisateur.uid)
      });
      setNbAimes((prev) => prev - 1);
    } else {
      await updateDoc(docRef, {
        aime: arrayUnion(utilisateur.uid)
      });
      setNbAimes((prev) => prev + 1);
    }

    setAime(!aime);
  };

  return (
    <div className="Aime">
      <IconButton className="icone-aime" onClick={handleAimeToggle}>
        <FavoriteIcon color={aime ? "error" : "inherit"} />
      </IconButton>
      <span className="nombre-aime">{nbAimes}</span>
    </div>
  );
}

export default Aime;
