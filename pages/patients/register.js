import React, { useState, useContext } from "react";

import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";

import { UseValidation } from "../../hooks/UseValidation";
import WithAuth from "./../../components/unavacuna/WithAuth";
import FirebaseContext from "../../firebase/FirebaseContext";
import patient from "../../validations/Patient";

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

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, patient, register);

  const { firestore } = useContext(FirebaseContext);
  const { idCard, name, lastName, birthDate, age, address } = values;
  const router = useRouter();

  async function register() {
    try {
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
            return router.push(`/vaccinates/${idCard}`);
          }
        });
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <h1>Registrar Paciente</h1>
        <Field>
          <label htmlFor="idCard">Cédula</label>
          <input
            type="number"
            name="idCard"
            placeholder="Cédula"
            value={idCard}
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
        </Field>
        {errors.name && <Error>{errors.name}</Error>}

        <Field>
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            name="lastName"
            placeholder="Apellidos"
            value={lastName}
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
        </Field>
        {errors.age && <Error>{errors.age}</Error>}

        <Field>
          <label htmlFor="address">Dirección</label>
          <textarea
            type="text"
            raws="3"
            name="address"
            placeholder="Dirección"
            value={address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Field>
        {errors.address && <Error>{errors.address}</Error>}

        {registerError && <Error>{registerError}</Error>}
        <InputSubmit type="submit" value="Registrar" />
      </Form>
    </Layout>
  );
};

export default WithAuth(register);
