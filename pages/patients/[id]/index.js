import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../../shared/Form";
import { useRouter } from "next/router";

import WithAuth from "../../../components/unavacuna/WithAuth";
import ErrorPage from "../../404";
import UseIsMounted from "../../../hooks/UseIsMounted";
import FirebaseContext from "../../../firebase/FirebaseContext";
import { GetAge } from "../../../helpers/GetAge";

const EditPatient = () => {
  const { user } = useContext(FirebaseContext);

  const isMounted = UseIsMounted();
  const router = useRouter();

  const {
    query: { id = "" },
  } = router;

  const [formValues, setFormValues] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [consultBD, setConsultBD] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const { firestore } = useContext(FirebaseContext);

  const { name, lastName, birthDate, address } = formValues;

  async function handleEdit(e) {
    if (GetAge(birthDate) < 8) {
      alert("Edad minima permitida es de 8");
    } else {
      e.preventDefault();
      try {
        const patient = {
          name,
          lastName,
          birthDate,
          age: GetAge(birthDate),
          address,
          updateAt: Date.now(),
          updateBy: user.email,
        };
        firestore.collection("patients").doc(id).update(patient);
        setRedirect(true);
      } catch (error) {
        setRegisterError(error.message);
      }
    }
  }

  const getPatient = async () => {
    const query = await firestore.collection("patients").doc(id);
    const data = await query.get();

    if (data.exists && isLoaded) {
      setConsultBD(false);
      setFormValues(data.data());
    } else if (isLoaded) {
      setConsultBD(false);
    }
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (id && consultBD) {
      getPatient();
    }
    return () => {
      setIsLoaded(false);
    };
  }, [id, consultBD]);

  useEffect(() => {
    if (redirect) return router.push(`/patients`);
  }, [redirect]);

  if (!isMounted) {
    <ErrorPage msg={"Problemas al encontrar la pagina"} />;
  }

  return (
    <Layout>
      <Form onSubmit={handleEdit}>
        <h1>Editar Paciente</h1>
        <fieldset>
          <legend>Proporcionar información</legend>
          <Field>
            <label htmlFor="idCard">Cédula</label>
            <input
              type="number"
              name="idCard"
              placeholder="Cédula"
              value={id}
              onChange={handleInputChange}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field>
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              name="lastName"
              placeholder="Apellidos"
              value={lastName}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field>
            <label htmlFor="birthDate">Fecha de Nacimiento</label>
            <input
              type="date"
              min="1921-12-12"
              max="2013-12-12"
              name="birthDate"
              placeholder="Fecha de Nacimiento"
              value={birthDate}
              onChange={handleInputChange}
            />
          </Field>

          <Field>
            <label htmlFor="address">Dirección</label>
            <textarea
              type="text"
              raws="3"
              name="address"
              placeholder="Dirección"
              value={address}
              onChange={handleInputChange}
              required
            />
          </Field>
        </fieldset>
        {registerError && <Error>{registerError}</Error>}
        <InputSubmit type="submit" value="Guardar" />
      </Form>
    </Layout>
  );
};

export default WithAuth(EditPatient);
