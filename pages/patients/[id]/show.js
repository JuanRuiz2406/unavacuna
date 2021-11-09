import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../../components/layout/Layout";
import { Form, Field, InputSubmit } from "../../../shared/Form";
import { useRouter } from "next/router";

import WithAuth from "../../../components/unavacuna/WithAuth";
import ErrorPage from "../../404";
import UseIsMounted from "../../../hooks/UseIsMounted";
import FirebaseContext from "../../../firebase/FirebaseContext";

const Show = () => {
  const isMounted = UseIsMounted();
  const router = useRouter();

  const [patient, setPatient] = useState({});
  const [notExists, setNotExists] = useState(false);
  const { firestore } = useContext(FirebaseContext);
  const [consultBD, setConsultBD] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);

  const {
    query: { id = "" },
  } = router;

  const getPatient = async () => {
    const query = await firestore.collection("patients").doc(id);
    const data = await query.get();

    if (data.exists && isLoaded) {
      setConsultBD(false);
      setPatient(data.data());
    } else if (isLoaded) {
      setConsultBD(false);
      setNotExists(true);
    }
  };

  useEffect(() => {
    if (id && consultBD) {
      getPatient();
    }
    return () => {
      setIsLoaded(false);
    };
  }, [id, consultBD]);

  if (!isMounted) {
    <ErrorPage msg={"Problemas al encontrar la pagina"} />;
  }

  if (!Object.keys(patient).length && !notExists) return "Cargando...";

  return notExists ? (
    <ErrorPage msg={"No existe el paciente"} />
  ) : (
    <Layout>
      <Form>
        <h1>Datos de Paciente</h1>
        <fieldset>
          <legend>Información</legend>
          <Field>
            <label htmlFor="idCard">Cédula</label>
            <input
              type="number"
              name="idCard"
              value={id}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={patient.name}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              name="lastName"
              value={patient.lastName}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="birthDate">Fecha de Nacimiento</label>
            <input
              type="text"
              name="birthDate"
              value={new Date(patient.birthDate).toLocaleDateString("es-CR")}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="address">Dirección</label>
            <textarea
              type="text"
              raws="3"
              name="address"
              value={patient.address}
              readOnly
              disabled
            />
          </Field>
        </fieldset>

        <InputSubmit
          type="button"
          onClick={() => {
            return router.push("/patients");
          }}
          value="Regresar"
        />
      </Form>
    </Layout>
  );
};

export default WithAuth(Show);
