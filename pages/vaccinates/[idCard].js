import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";
import { UseForm } from "./../../hooks/UseForm";

import WithAuth from "../../components/unavacuna/WithAuth";
import ErrorPage from "./../404";
import vaccinate from "../../validations/Vaccinate";
import UseIsMounted from "../../hooks/UseIsMounted";
import FirebaseContext from "../../firebase/FirebaseContext";

const initialState = {
  namePatient: "",
  vaccineName: "",
  dose: "",
  vaccinationPlace: "",
};
const Vaccinate = () => {
  const isMounted = UseIsMounted();
  const router = useRouter();

  const {
    query: { idCard },
  } = router;

  const [registerError, setRegisterError] = useState(null);
  const [notExists, setNotExists] = useState(false);
  const [consultBD, setConsultBD] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [vaccines, setVaccines] = useState([]);
  const [patient, setPatient] = useState([]);
  const [errors, setErrors] = useState({});

  const [formValues, handleInputChange] = UseForm(initialState);

  const { firestore } = useContext(FirebaseContext);

  const { vaccineName, dose, vaccinationPlace } = formValues;

  const handleBlur = () => {
    const validationErrors = vaccinate(formValues);
    setErrors(validationErrors.errors);
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (vaccinate(formValues).formIsValid) {
      try {
        const vaccinate = {
          idCardPatient: idCard,
          namePatient: `${patient.name} ${patient.lastName}`,
          vaccineName,
          dose,
          vaccinationPlace,
          vaccinationDate: Date.now(),
        };
        firestore.collection("vaccinates").add(vaccinate);
      } catch (error) {
        setRegisterError(error.message);
      }
    } else {
      const validationErrors = vaccinate(formValues);
      setErrors(validationErrors.errors);
    }
  }

  const getDataVaccines = () => {
    firestore
      .collection("vaccines")
      .orderBy("registerDate", "desc")
      .onSnapshot(callSnapShot);
  };

  function callSnapShot(snapshot) {
    const vacine = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setVaccines(vacine);
  }

  const getPatient = async () => {
    const query = await firestore.collection("patients").doc(idCard);
    const patient = await query.get();

    if (patient.exists && isLoaded) {
      setConsultBD(false);
      setPatient(patient.data());
      getDataVaccines();
    } else if (isLoaded) {
      setConsultBD(false);
      setNotExists(true);
    }
  };

  useEffect(() => {
    if (idCard && consultBD) {
      getPatient();
    }

    return () => {
      setIsLoaded(false);
    };
  }, [idCard, consultBD]);

  if (!isMounted) {
    <ErrorPage msg={"Problemas al encontrar la pagina"} />;
  }

  if (!Object.keys(patient).length && !notExists) return "Cargando...";

  return notExists ? (
    <ErrorPage msg={"No existe el paciente"} />
  ) : (
    <Layout>
      <Form onSubmit={handleRegister}>
        <h1>Registrar Vacunado</h1>
        <Field>
          <label htmlFor="idCardPatient">Cédula</label>
          <input
            type="number"
            name="idCardPatient"
            value={patient.idCard}
            readOnly
            disabled
          />
        </Field>
        {errors.idCardPatient && <Error>{errors.idCardPatient}</Error>}

        <Field>
          <label htmlFor="namePatient">Nombre de Paciente</label>
          <input
            type="text"
            name="namePatient"
            value={`${patient.name} ${patient.lastName}`}
            readOnly
            disabled
          />
        </Field>

        <Field>
          <label htmlFor="vaccineName">Vacuna</label>
          <select
            id="vaccineName"
            name="vaccineName"
            value={vaccineName}
            onChange={handleInputChange}
          >
            <option value="">Seleccione ▼</option>;
            {vaccines.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </Field>
        {errors.vaccineName && <Error>{errors.vaccineName}</Error>}

        <Field>
          <label htmlFor="dose">Dosis</label>
          <select
            id="dose"
            name="dose"
            value={dose}
            onChange={handleInputChange}
          >
            <option value="">Seleccione ▼</option>;
            <option value="Dosis 1">Dosis 1</option>;
            <option value="Dosis 2">Dosis 2</option>;
            <option value="Dosis 3">Dosis 3</option>;
            <option value="Refuerzo">Refuerzo</option>;
          </select>
        </Field>
        {errors.dose && <Error>{errors.dose}</Error>}

        <Field>
          <label htmlFor="vaccinationPlace">Lugar de Vacunación</label>
          <input
            type="text"
            name="vaccinationPlace"
            placeholder="Lugar de Vacunación"
            value={vaccinationPlace}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </Field>
        {errors.vaccinationPlace && <Error>{errors.vaccinationPlace}</Error>}

        {registerError && <Error>{registerError}</Error>}

        <InputSubmit type="submit" value="Registrar" />
      </Form>
    </Layout>
  );
};

export default WithAuth(Vaccinate);
