import React, { useContext, useState } from "react";

import Link from "next/link";

import { Layout } from "./../../components/layout/Layout";
import FirebaseContext from "./../../firebase/FirebaseContext";

import WithAuth from "./../../components/unavacuna/WithAuth";

const VaccineList = () => {
  const [vaccines, setVaccines] = useState([]);

  const { user, FirebaseInit } = useContext(FirebaseContext);
  /*
  const vaccinesRef = collection(FirebaseInit.db, "vaccines");

  useEffect(() => {
    const getVaccines = async () => {
      const q = query(vaccinesRef, orderBy("registerDate", "desc"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setVaccines((result) => [...result, doc.data()]);
      });
    };

    getVaccines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/
  return (
    <Layout>
      <h1>Lista de vacunas</h1>
      <Link href="/vaccines/register">Agregar</Link>
    </Layout>
  );
};
export default WithAuth(VaccineList);
