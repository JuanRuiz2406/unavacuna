import React, { useState, useContext } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { css } from "@emotion/react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../components/ui/Form";
import { UseValidation } from "../../hooks/UseValidation";
import { FirebaseContext } from "../../firebase/Index";
import { useRouter } from "next/router";
import registerVaccineValidate from "../../validations/Vaccine";
import Login from "../Login";

const initialState = {
  name: "",
  description: "",
  quantity: "",
};
export default function Register() {
  const [registerError, setRegisterError] = useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, registerVaccineValidate, registerVaccine);

  const { name, description, quantity } = values;

  const router = useRouter();

  const { user, FirebaseInit } = useContext(FirebaseContext);

  const vaccinesRef = collection(FirebaseInit.db, "vaccines");

  async function registerVaccine() {
    try {
      if (!user) {
        return router.push("/Login");
      }
      const docRef = doc(FirebaseInit.db, "vaccines", name);
      const docSnap = await getDoc(docRef);

      const newQuantity = Number(quantity);

      const vaccine = {
        name,
        quantity: newQuantity,
        description,
        registerDate: Date.now(),
      };

      if (docSnap.exists()) {
        setRegisterError("Vacuna ya existe en la base de datos");
      } else {
        await setDoc(doc(vaccinesRef, name), vaccine);
        return router.push("/vaccines");
      }
    } catch (error) {
      console.log(error);

      setRegisterError(error.message);
    }
  }

  return !user ? (
    <Login />
  ) : (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Registro de Vacuna
        </h1>
        <Form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Proporcionar información</legend>
            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre de vacuna"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.name && <Error>{errors.name}</Error>}

            <Field>
              <label htmlFor="quantity">Cantidad</label>
              <input
                type="number"
                name="quantity"
                placeholder="Candidad de vacunas"
                value={quantity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.quantity && <Error>{errors.quantity}</Error>}
          </fieldset>
          <fieldset>
            <legend>Acerca de la vacuna</legend>

            <Field>
              <label htmlFor="description">Descripcíon</label>
              <textarea
                type="text"
                raws="5"
                name="description"
                placeholder="Descripcíon de la vacuna"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.description && <Error>{errors.description}</Error>}
          </fieldset>
          {registerError && <Error>{registerError}</Error>}
          <InputSubmit type="submit" value="Guardar" />
        </Form>
      </>
    </Layout>
  );
}
