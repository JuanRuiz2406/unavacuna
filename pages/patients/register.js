import React, { useState, useContext, useEffect } from "react";

import { css } from "@emotion/react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { UseForm } from "../../hooks/UseForm";
import registerPatient from "../../validations/RegisterPatient";
import { useRouter } from "next/router";
import {SavePatient}  from "../../components/firestore/SavePatient";
import WithAuth from "./../../components/unavacuna/WithAuth";

const initialState = {
  idCard: "",
  name: "",
  lastLame: "",
  age: "",
  address: "",
  vaccinationPlace: "",
  dose: "",
  vaccine: "",
};

const register = () => {
  const [registerError, setRegisterError] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const { values, handleInputChange} =
    UseForm(initialState);

  const {
    idCard,
    name,
    lastLame,
    age,
    address,
    vaccinationPlace,
    dose,
    vaccine,
  } = values;

  const router = useRouter();
  /*
  const { user, FirebaseInit } = useContext(FirebaseContext);

  const patientsRef = collection(FirebaseInit.db, "patients");

  useEffect(() => {
    getVaccines();
  }, [vaccines]);

  const getVaccines = async () => {
    const getVaccinesFromFirebase = [];

    const querySnapshot = await getDocs(
      collection(FirebaseInit.db, "vaccines")
    );

    querySnapshot.forEach((doc) => {
      getVaccinesFromFirebase.push({ ...doc.data(), key: doc.id });
    });
    setVaccines(getVaccinesFromFirebase);
  };

  async function patientRegister() {
    try {
      if (!user) {
        return router.push("/Login");
      }
      const docRef = doc(FirebaseInit.db, "patients", idCard);
      const docSnap = await getDoc(docRef);

      const patient = {
        idCard,
        name,
        lastLame,
        age,
        address,
        vaccinationPlace,
        dose,
        vaccine,
        registerDate: Date.now(),
      };

      if (docSnap.exists()) {
        setRegisterError("Paciente ya existe en la base de datos");
      } else {
        await setDoc(doc(patientsRef, idCard), patient);
        return router.push("/patients");
      }
    } catch (error) {
      console.log(error);

      setRegisterError(error.message);
    }
  }
*/
  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Registrar Paciente
          </h1>
          <Form noValidate>
            <Field>
              <label htmlFor="idCard">Cédula</label>
              <input
                type="number"
                name="idCard"
                placeholder="Cédula"
                value={idCard}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
            </Field>
           

            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
            </Field>
         
            <Field>
              <label htmlFor="lastLame">Apellido</label>
              <input
                type="text"
                name="lastLame"
                placeholder="Apellido"
                value={lastLame}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
            </Field>
          
            <Field>
              <label htmlFor="age">Edad</label>
              <input
                type="number"
                name="age"
                placeholder="Edad"
                value={age}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
            </Field>
           
            <Field>
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={address}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
            </Field>
         

            <Field>
              <label htmlFor="vaccinationPlace">Lugar de Vacunación</label>
              <input
                type="text"
                name="vaccinationPlace"
                placeholder="Lugar de Vacunación"
                value={vaccinationPlace}
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
            </Field>
            

            <Field>
              <label htmlFor="dose">Dosis</label>
              <select
                id="dose"
                name="dose"
                value={dose}
                onChange={handleInputChange}
              >
                <option value="Dosis 1">Dosis 1</option>;
                <option value="Dosis 2">Dosis 2</option>;
              </select>
            </Field>
         
            <Field>
              <label htmlFor="vaccine">Vacuna</label>
              <select
                id="vaccine"
                name="vaccine"
                value={vaccine}
                onChange={handleInputChange}
              >
                {vaccines.map((item, i) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
            </Field>
           

            {registerError && <Error>{registerError}</Error>}
            {/*<InputSubmit type="submit" value="Registrar" />*/}
            <SavePatient patient={values} />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default WithAuth(register);
