import React, { useState, useContext, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { css } from "@emotion/react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../components/ui/Form";
import { UseValidation } from "../../hooks/UseValidation";
import { FirebaseContext } from "../../firebase/Index";
import registerPatient from "../../validations/RegisterPatient";
import { useRouter } from "next/router";
import Login from "../Login";
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

export default function RegisterAdmin() {
  const [registerError, setRegisterError] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, registerPatient, patientRegister);

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

  return !user ? (
    <Login />
  ) : (
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
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="idCard">Cédula</label>
              <input
                type="number"
                name="idCard"
                placeholder="Cédula"
                value={idCard}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Field>
            {errors.idCard && <Error>{errors.idCard}</Error>}

            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Field>
            {errors.name && <Error>{errors.name}</Error>}

            <Field>
              <label htmlFor="lastLame">Apellido</label>
              <input
                type="text"
                name="lastLame"
                placeholder="Apellido"
                value={lastLame}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Field>
            {errors.lastLame && <Error>{errors.lastLame}</Error>}

            <Field>
              <label htmlFor="age">Edad</label>
              <input
                type="number"
                name="age"
                placeholder="Edad"
                value={age}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Field>
            {errors.age && <Error>{errors.age}</Error>}

            <Field>
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={address}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Field>
            {errors.address && <Error>{errors.address}</Error>}

            <Field>
              <label htmlFor="vaccinationPlace">Lugar de Vacunación</label>
              <input
                type="text"
                name="vaccinationPlace"
                placeholder="Lugar de Vacunación"
                value={vaccinationPlace}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Field>
            {errors.vaccinationPlace && (
              <Error>{errors.vaccinationPlace}</Error>
            )}

            <Field>
              <label htmlFor="dose">Dosis</label>
              <select
                id="dose"
                name="dose"
                value={dose}
                onChange={handleChange}
              >
                <option value="Dosis 1">Dosis 1</option>;
                <option value="Dosis 2">Dosis 2</option>;
              </select>
            </Field>
            {errors.dose && <Error>{errors.dose}</Error>}

            <Field>
              <label htmlFor="vaccine">Vacuna</label>
              <select
                id="vaccine"
                name="vaccine"
                value={vaccine}
                onChange={handleChange}
              >
                {vaccines.map((item, i) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
            </Field>
            {errors.vaccine && <Error>{errors.vaccine}</Error>}

            {registerError && <Error>{registerError}</Error>}
            <InputSubmit type="submit" value="Registrar" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
