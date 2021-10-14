import React, { useState, useContext } from "react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";
import UseIsMounted from "../../hooks/UseIsMounted";

import { UseValidation } from "../../hooks/UseValidation";
import WithAuth from "../../components/unavacuna/WithAuth";
import FirebaseContext from "../../firebase/FirebaseContext";
import VaccinatePatient from "../../validations/VaccinatePatient";

const initialState = {
  idCard_Patient: "",
  vaccine_Name: "",
  dose: "",
  vaccinationPlace: "",
  vaccinationDate: "",
};
const register = () => {
  const isMounted = UseIsMounted();
  const router = useRouter();
  const idCard = router.query.idCard;

  const [registerError, setRegisterError] = useState(null);
  //const [vaccines, setVaccines] = useState([]);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    UseValidation(initialState, VaccinatePatient, register);

  const { firestore } = useContext(FirebaseContext);
  const { vaccine_Name, dose, vaccinationPlace } = values;

  async function register() {
    console.log(firestore);
    try {
      const vaccinate = {
        idCard_Patient: idCard,
        vaccine_Name: "",
        dose: "",
        vaccinationPlace: "",
        vaccinationDate: Date.now(),
      };
      firestore.collection("vaccine_patient").set(vaccinate);
      return router.push("/vaccine_patient");
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <h1>Vamos a vacunar al paciente: * Consultar Ced {idCard} *</h1>
      <Form onSubmit={handleSubmit}>
        <h1>Registrar Vacunado</h1>
        <Field>
          <label htmlFor="idCard_Patient">Cédula</label>
          <input
            type="number"
            name="idCard_Patient"
            value={idCard}
            onChange={handleChange}
            disabled
          />
        </Field>
        {errors.idCard_Patient && <Error>{errors.idCard_Patient}</Error>}

        <Field>
          <label htmlFor="vaccine_Name">Nombre</label>
          <input
            type="text"
            name="vaccine_Name"
            placeholder="Nombre"
            value={vaccine_Name}
            onChange={handleChange}
          />
        </Field>
        {errors.vaccine_Name && <Error>{errors.vaccine_Name}</Error>}

        <Field>
          <label htmlFor="dose">Dosis</label>
          <input
            type="text"
            name="dose"
            placeholder="Dosis"
            value={dose}
            onChange={handleChange}
          />
        </Field>
        {errors.dose && <Error>{errors.dose}</Error>}

        <Field>
          <label htmlFor="vaccinationPlace">Lugar de Vacunación</label>
          <input
            type="text"
            name="vaccinationPlace"
            placeholder="Lugar de Vacunación"
            value={vaccinationPlace}
            onChange={handleChange}
          />
        </Field>
        {errors.vaccinationPlace && <Error>{errors.vaccinationPlace}</Error>}

        {registerError && <Error>{registerError}</Error>}
        <InputSubmit type="submit" onClick={register} value="Registrar" />
      </Form>
    </Layout>
  );
};

export default WithAuth(register);
