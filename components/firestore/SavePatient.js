import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/FirebaseContext";

export const SavePatient = ({ patient }) => {
  //const { user } = useContext(FirebaseContext);
  const sendData = () => {
    try {
      firebase
        .collection("patients")
        .doc(patient.idCard)
        .set(patient)
        .then(console.log("Operacion exitosa"));
    } catch (error) {
      console.log(error);
    }
  };

  return<div>
      <button onClick={sendData}>Guardar</button>
  </div>;
};
