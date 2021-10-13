import React, { useState, useContext } from "react";

import { css } from "@emotion/react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";

import { UseValidation } from "../../hooks/UseValidation";
import WithAuth from "./../../components/unavacuna/WithAuth";
import FirebaseContext from "../../firebase/FirebaseContext";
import patientValidate from "../../validations/Patient";
//import registerPatient from "../../validations/RegisterPatient";

const initialState = {
  idCard: "",
  name: "",
  lastName: "",
  birthDate: "",
  age: "",
  address: "",
};
const register = () => {
  const [registerError, setRegisterError] = useState(null);
  //const [vaccines, setVaccines] = useState([]);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, patientValidate, register);

  const { firestore } = useContext(FirebaseContext);
  const { idCard, name, lastName, birthDate, age, address } = values;
  const router = useRouter();

  async function register() {
    try {
      //const newQuantity = Number(quantity);

      const patient = {
        idCard,
        name,
        lastName,
        birthDate,
        age,
        address,
        registerDate: Date.now(),
      };

      firestore
        .collection("patients")
        .doc(idCard)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setRegisterError("Este Paciente ya existe");
          } else {
            firestore.collection("patients").doc(idCard).set(patient);
            return router.push("/vaccinates/" + idCard);
          }
        });
    } catch (error) {
      setRegisterError(error.message);
    }
  }
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
          <Form onSubmit={handleSubmit}>
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
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={lastName}
                onChange={handleChange}
              />
            </Field>
            {errors.lastName && <Error>{errors.lastName}</Error>}

            <Field>
              <label htmlFor="birthDate">Fecha de Nacimiento</label>
              <input
                type="date"
                min="1921-12-12"
                max="2016-12-12"
                name="birthDate"
                placeholder="Fecha de Nacimiento"
                value={birthDate}
                onChange={handleChange}
              />
            </Field>
            {errors.birthDate && <Error>{errors.birthDate}</Error>}

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

            {registerError && <Error>{registerError}</Error>}
            <InputSubmit type="submit" value="Registrar" />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default WithAuth(register);
