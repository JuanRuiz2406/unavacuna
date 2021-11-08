import React, { useState, useContext } from "react";

import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";

import { UseValidation } from "../../hooks/UseValidation";
import WithAuth from "./../../components/unavacuna/WithAuth";
import FirebaseContext from "../../firebase/FirebaseContext";
import vaccine from "../../validations/Vaccine";

const initialState = {
  name: "",
  description: "",
  quantity: "",
};
const register = () => {
  const { user } = useContext(FirebaseContext);

  const [registerError, setRegisterError] = useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, vaccine, register);

  const { firestore } = useContext(FirebaseContext);
  const { name, description, quantity } = values;
  const router = useRouter();

  async function register() {
    try {
      const newQuantity = Number(quantity);

      const vaccine = {
        name,
        quantity: newQuantity,
        description,
        createdAt: Date.now(),
        createdBy: user.email,
      };

      firestore
        .collection("vaccines")
        .doc(name)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setRegisterError("Esta Vacuna ya existe");
          } else {
            firestore.collection("vaccines").doc(name).set(vaccine);
            return router.push("/vaccines");
          }
        });
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <Layout>
      <>
        <Form onSubmit={handleSubmit}>
          <h1>Registro de Vacuna</h1>
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
              />
            </Field>
            {errors.quantity && <Error>{errors.quantity}</Error>}
          </fieldset>
          <fieldset>
            <legend>Acerca de la vacuna</legend>

            <Field>
              <label htmlFor="description">Descripción</label>
              <textarea
                type="text"
                raws="5"
                name="description"
                placeholder="Descripción de la vacuna"
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
};

export default WithAuth(register);
