import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../../shared/Form";
import { useRouter } from "next/router";

import ErrorPage from "./../404";
import UseIsMounted from "../../hooks/UseIsMounted";
import WithAuth from "../../components/unavacuna/WithAuth";
import FirebaseContext from "../../firebase/FirebaseContext";

const EditVaccine = () => {
  const { user } = useContext(FirebaseContext);

  const isMounted = UseIsMounted();
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const [formValues, setFormValues] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [consultBD, setConsultBD] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const { firestore } = useContext(FirebaseContext);

  const { description, quantity } = formValues;

  async function handleEdit(e) {
    e.preventDefault();
    try {
      const newQuantity = Number(quantity);

      const vaccineObj = {
        quantity: newQuantity,
        description,
        updatedAt: Date.now(),
        updatedBy: user.email,
      };
      firestore.collection("vaccines").doc(id).update(vaccineObj);
      setRedirect(true);
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  const getVaccine = async () => {
    const query = await firestore.collection("vaccines").doc(id);
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
      getVaccine();
    }

    return () => {
      setIsLoaded(false);
    };
  }, [id, consultBD]);

  useEffect(() => {
    if (redirect) return router.push("/vaccines");
  }, [redirect]);

  if (!isMounted) {
    <ErrorPage msg={"Problemas al encontrar la pagina"} />;
  }

  return (
    <Layout>
      <Form onSubmit={handleEdit}>
        <h1>Editar de Vacuna</h1>
        <fieldset>
          <legend>Proporcionar información</legend>
          <Field>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              value={id}
              readOnly
              disabled
            />
          </Field>

          <Field>
            <label htmlFor="quantity">Cantidad</label>
            <input
              type="number"
              name="quantity"
              placeholder="Candidad de vacunas"
              value={quantity}
              onChange={handleInputChange}
              required
            />
          </Field>
        </fieldset>
        <fieldset>
          <legend>Acerca de la vacuna</legend>

          <Field>
            <label htmlFor="description">Descripcíon</label>
            <textarea
              type="text"
              raws="5"
              name="description"
              placeholder="Descripcíon de la vacuna"
              value={description}
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

export default WithAuth(EditVaccine);
