import React, { useState, useContext, useEffect } from "react";
import { Textbox } from "react-inputs-validation";

import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";

import { UseValidation } from "../../hooks/UseValidation";
import WithAuth from "./../../components/unavacuna/WithAuth";
import FirebaseContext from "../../firebase/FirebaseContext";
import patient from "../../validations/Patient";
import { GetAge } from "../../helpers/GetAge";
import { capitalize } from "@material-ui/core";
import UseIsMounted from "../../hooks/UseIsMounted";

const initialState = {
  idCard: "",
  name: "",
  lastName: "",
  birthDate: "",
  address: "",
};
const register = () => {
  const isMounted = UseIsMounted();

  const { user } = useContext(FirebaseContext);

  const [registerError, setRegisterError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, patient, register);

  const { firestore } = useContext(FirebaseContext);

  const { idCard, name, lastName, birthDate, address } = values;
  const router = useRouter();

  async function register() {
    if (GetAge(birthDate) < 8) {
      alert("Edad minima permitida es de 8");
    } else {
      try {
        const patient = {
          idCard,
          name: capitalize(name),
          lastName: capitalize(lastName),
          birthDate,
          age: GetAge(birthDate),
          address,
          createdAt: Date.now(),
          createdBy: user.email,
        };

        firestore
          .collection("patients")
          .doc(idCard)
          .onSnapshot((doc) => {
            if (doc.exists) {
              setRegisterError("Este Paciente ya existe");
            } else {
              firestore.collection("patients").doc(idCard).set(patient);
              setRedirect(true);
            }
          });
      } catch (error) {
        setRegisterError(error.message);
      }
    }
  }

  useEffect(() => {
    if (redirect) return router.push(`/vaccinates/${idCard}`);
  }, [redirect]);

  return (
    isMounted && (
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
            />
          </Field>
          {errors.lastName && <Error>{errors.lastName}</Error>}

          <Field>
            <label htmlFor="birthDate">Fecha de Nacimiento</label>
            <input
              type="date"
              min="1921-12-12"
              max="2013-12-12"
              name="birthDate"
              placeholder="Fecha de Nacimiento"
              value={birthDate}
              onChange={handleChange}
            />
          </Field>
          {errors.birthDate && <Error>{errors.birthDate}</Error>}

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
    )
  );
};

export default WithAuth(register);
