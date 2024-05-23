import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import jseImage from "/admin/jse-3.png";
import "./Comic.scss";
import Aime from "./Aime";
import formatDate from "../code/formatDate";

function Comic() {
  const [dpub, setDpub] = useState("");

  useEffect(() => {
    const fetchDpub = async () => {
      const db = getFirestore();
      const docRef = doc(db, "jse-bandes", "1qtIk4BrxKk1qTYYkctf"); // Remplacez "ID" par l'identifiant approprié
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rawDpub = docSnap.data().dpub;
        setDpub(formatDate(rawDpub));
      } else {
        console.log("Pas le document!");
      }
    };

    fetchDpub();
  }, []);

  return (
    <div className="Comic">
      <p>{dpub}</p>
      <div>
        <img className="comic" src={jseImage} alt="JSE 3" />
        <Aime />
      </div>
    </div>
  );
}

export default Comic;
