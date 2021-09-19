import React, { useState } from "react";

import { css } from "@emotion/react";
import { Layout } from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";
import { UseValidation } from "../hooks/UseValidation";
import FirebaseInit from "../firebase/Index";
import registerValidate from "../validations/RegisterValidate";
import Router from "next/router";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterAdmin() {
  const [registerError, setRegisterError] = useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, registerValidate, register);

  const { name, email, password } = values;

  async function register() {
    try {
      await FirebaseInit.adminRegister(name, email, password);
      Router.push("/");
    } catch (error) {
      console.log(error);

      setRegisterError(
        "El correo ya esta siendo utilizado por otro/a administrador"
      );
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
            Registrar Administrador
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}

            <Field>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}

            {registerError && <Error>{registerError}</Error>}
            <InputSubmit type="submit" value="Registrar" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
