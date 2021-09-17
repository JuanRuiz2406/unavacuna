import React from "react";

import { css } from "@emotion/react";
import { Layout } from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "./../components/ui/Form";
import { UseValidation } from "./../hooks/UseValidation";
import registerValidate from "./validations/RegisterValidate";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, registerValidate, register);

  const { name, email, password } = values;

  function register() {
    console.log("Creando cuenta");
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
            Registrar Nuevo Administrador
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

            <InputSubmit type="submit" value="Registrar" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
