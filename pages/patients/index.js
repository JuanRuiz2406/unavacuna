import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Search } from "../../shared/Search";
import WithAuth from "./../../components/unavacuna/WithAuth";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../firebase/FirebaseContext";

const Card = styled.div`
  background-color: var(--gray4);
  float: left;
  margin: 0 10px 10px 0;
  width: 250px;
  padding: 30px;
  text-align: center;
`;

const Patients = () => {
  const [patients, setPatients] = useState([]);

  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    const getData = () => {
      firestore
        .collection("vaccines")
        .orderBy("registerDate", "desc")
        .onSnapshot(callSnapShot);
    };
    getData();
  }, []);

  function callSnapShot(snapshot) {
    const patients = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPatients(patients);
  }

  return (
    <div>
      <Layout>
        <Search />
        <h1>Estadisticas de Pacientes</h1>
        <Link href="/patients/register">Agregar</Link>
      </Layout>

      <Card>
        <image />
        <br />
        <p>nombre</p>
        <p>apellido</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <button>Modificar</button>
      </Card>
    </div>
  );
};

export default WithAuth(Patients);
