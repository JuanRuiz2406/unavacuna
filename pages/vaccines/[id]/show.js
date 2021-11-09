import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../../components/layout/Layout";
import { Form, Field, InputSubmit } from "../../../shared/Form";
import { useRouter } from "next/router";

import ErrorPage from "../../404";
import UseIsMounted from "../../../hooks/UseIsMounted";
import WithAuth from "../../../components/unavacuna/WithAuth";
import FirebaseContext from "../../../firebase/FirebaseContext";

const Show = () => {
  const isMounted = UseIsMounted();
  const router = useRouter();

  const [vaccine, setVaccine] = useState({});
  const [notExists, setNotExists] = useState(false);
  const { firestore } = useContext(FirebaseContext);
  const [consultBD, setConsultBD] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);

  const {
    query: { id = "" },
  } = router;

  const getVaccine = async () => {
    const query = await firestore.collection("vaccines").doc(id);
    const data = await query.get();

    if (data.exists && isLoaded) {
      setConsultBD(false);
      setVaccine(data.data());
    } else if (isLoaded) {
      setConsultBD(false);
      setNotExists(true);
    }
  };

  useEffect(() => {
    if (id && consultBD) {
      getVaccine();
    }

    return () => {
      setIsLoaded(false);
    };
  }, [id, consultBD]);

  if (!isMounted) {
    <ErrorPage msg={"Problemas al encontrar la pagina"} />;
  }

  if (!Object.keys(vaccine).length && !notExists) return "Cargando...";

  return notExists ? (
    <ErrorPage msg={"No existe la vacuna"} />
  ) : (
    <Layout>
      <Form>
        <h1>Datos de Vacuna</h1>
        <fieldset>
          <legend>Información</legend>
          <Field>
            <label htmlFor="name">Nombre</label>
            <input type="text" value={id} readOnly disabled />
          </Field>

          <Field>
            <label htmlFor="quantity">Cantidad</label>
            <input
              type="number"
              name="quantity"
              value={vaccine.quantity}
              readOnly
              disabled
            />
          </Field>
        </fieldset>
        <fieldset>
          <legend>Acerca de la vacuna</legend>

          <Field>
            <label htmlFor="description">Descripción</label>
            <textarea
              type="text"
              raws="5"
              name="description"
              value={vaccine.description}
              readOnly
              disabled
            />
          </Field>
        </fieldset>

        <InputSubmit
          type="button"
          onClick={() => {
            return router.push("/vaccines");
          }}
          value="Regresar"
        />
      </Form>
    </Layout>
  );
};

export default WithAuth(Show);
