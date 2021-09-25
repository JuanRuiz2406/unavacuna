import React, { useState } from "react";

import { css } from "@emotion/react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../components/ui/Form";
import { UseValidation } from "../../hooks/UseValidation";
// import FirebaseInit from "../../firebase/Index";
import registerPatient from "../../validations/RegisterPatient";
//import Router from "next/router";

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

  async function patientRegister() {
    try {
      await FirebaseInit.patientRegister(
        idCard,
        name,
        lastLame,
        age,
        address,
        vaccinationPlace,
        dose,
        vaccine
      );
      Router.push("/patients");
    } catch (error) {
      console.log(error);

      setRegisterError("Este paciente ya existe");
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
          <Form onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="lastLame">Apellido</label>
              <input
                type="text"
                name="lastLame"
                placeholder="Apellido"
                value={lastLame}
                onChange={handleChange}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
              />
            </Field>
            {errors.vaccinationPlace && (
              <Error>{errors.vaccinationPlace}</Error>
            )}

            <Field>
              <label htmlFor="dose">Dosis</label>
              <select id="dose" name="dose">
                <option value="Dosis 1">Dosis 1</option>
                <option value="Dosis 2">Dosis 2</option>
                <option value="Dosis 3">Dosis 3</option>
              </select>
            </Field>
            {errors.dose && <Error>{errors.dose}</Error>}

            <Field>
              <label htmlFor="vaccine">*Relación* Vacuna</label>
              <select id="vaccine" name="vaccine">
                <option value="Vac 1">Vac 1</option>
                <option value="Vac 2">Vac 2</option>
              </select>
            </Field>
            {errors.vaccine && <Error>{errors.vaccine}</Error>}

            {registerError && <Error>{registerError}</Error>}
            <InputSubmit type="submit" value="Registrar *AUN NO XD*" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
