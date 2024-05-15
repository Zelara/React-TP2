import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const Comic = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("jse-images/jse-16.png");

      imageRef.getDownloadURL().then((url) => {
        setImageUrl(url);
      });
    };

    fetchImage();
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="Comic" />}</div>;
};

export default Comic;
