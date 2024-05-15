import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";

function Comic() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("jse-images/jse-3.png"); // Changez le chemin de l'image ici

      imageRef.getDownloadURL().then((url) => {
        setImageUrl(url);
      });
    };

    fetchImage();
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="Comic" />}</div>;
}

export default Comic;
