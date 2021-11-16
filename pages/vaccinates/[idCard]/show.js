import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../../components/layout/Layout";
import { Form, Field, ButtonSubmit } from "../../../shared/Form";
import { useRouter } from "next/router";

import WithAuth from "../../../components/unavacuna/WithAuth";
import ErrorPage from "../../404";
import UseIsMounted from "../../../hooks/UseIsMounted";
import FirebaseContext from "../../../firebase/FirebaseContext";

import { PrepareDateFormat } from "../../../helpers/PrepareDateFormat";

const Show = () => {
  const isMounted = UseIsMounted();
  const router = useRouter();

  const [vaccinate, setVaccinate] = useState({});
  const [vaccinates, setVaccinates] = useState([]);
  const [notExists, setNotExists] = useState(false);
  const { firestore } = useContext(FirebaseContext);
  const [consultBD, setConsultBD] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);

  const {
    query: { idCard },
  } = router;

  const getDataVaccinate = async () => {
    firestore
      .collection("vaccinates")
      .where("idCardPatient", "==", idCard)
      .orderBy("dose")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.idCardPatient,
            ...doc.data(),
          };
        });
        const dataWithCorrectDate = PrepareDateFormat(data);

        setVaccinates(dataWithCorrectDate);
      });
  };

  const getVaccinate = async () => {
    const query = await firestore.collection("patients").doc(idCard);
    const vaccinateData = await query.get();

    if (vaccinateData.exists && isLoaded) {
      setConsultBD(false);
      setVaccinate(vaccinateData.data());
      getDataVaccinate();
    } else if (isLoaded) {
      setConsultBD(false);
      setNotExists(true);
    }
  };

  useEffect(() => {
    if (idCard && consultBD) {
      getVaccinate();
    }

    return () => {
      setIsLoaded(false);
    };
  }, [idCard, consultBD]);

  if (!isMounted) {
    <ErrorPage msg={"Problemas al encontrar la pagina"} />;
  }

  if (!Object.keys(vaccinate).length && !notExists) return "Cargando...";

  return notExists ? (
    <ErrorPage msg={"No existe el paciente"} />
  ) : (
    <Layout>
      <Form>
        <h1>Datos de Paciente Vacunado</h1>
        <fieldset>
          <legend>Información del Paciente</legend>
          <Field>
            <label htmlFor="idCard">Cédula</label>
            <input
              type="number"
              name="idCard"
              value={idCard}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="namePatient">Nombre completo</label>
            <input
              type="text"
              name="namePatient"
              value={`${vaccinate.name} ${vaccinate.lastName}`}
              readOnly
              disabled
            />
          </Field>
        </fieldset>

        {vaccinates.map((item, index) => {
          return (
            <fieldset key={index} value={item.idCardPatient}>
              <legend>Datos de Vacuna de {item.dose}</legend>
              <Field>
                <label htmlFor="vaccineName">Vacuna</label>
                <input
                  type="text"
                  name="vaccineName"
                  value={item.vaccineName}
                  readOnly
                  disabled
                />
              </Field>
              <Field>
                <label htmlFor="vaccinationPlace">Lugar de Vacunación</label>
                <input
                  type="text"
                  name="vaccinationPlace"
                  value={item.vaccinationPlace}
                  readOnly
                  disabled
                />
              </Field>
              <Field>
                <label htmlFor="vaccinationDate">Fecha de Vacunación</label>
                <input
                  type="text"
                  name="vaccinationDate"
                  value={new Date(item.vaccinationDate).toLocaleDateString(
                    "es-CR"
                  )}
                  readOnly
                  disabled
                />
              </Field>
            </fieldset>
          );
        })}

        <ButtonSubmit
          type="button"
          onClick={() => {
            return router.push("/vaccinates");
          }}>
            <i class="fas fa-arrow-alt-circle-left"></i> Regresar
          </ButtonSubmit>
      </Form>
    </Layout>
  );
};

export default WithAuth(Show);
