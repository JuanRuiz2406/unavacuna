import { Layout } from "./../../components/layout/Layout";
import Link from "next/link";

import WithAuth from "./../../components/unavacuna/WithAuth";
import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "./../../firebase/FirebaseContext";
import MaterialTable from "material-table";
import { Button } from "./../../shared/Button";
import {
  TableIcons,
  TableLocalization,
  TableOptions,
} from "../../helpers/TableInit";
import { css } from "@emotion/react";

import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import UseIsMounted from "../../hooks/UseIsMounted";
import { PrepareDateFormat } from "../../helpers/PrepareDateFormat";
import { useRouter } from "next/router";

const Vaccines = () => {
  const isMounted = UseIsMounted();

  const router = useRouter();

  const [vaccines, setVaccines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const { firestore } = useContext(FirebaseContext);

  const getData = () => {
    firestore
      .collection("vaccines")
      .orderBy("createdAt", "desc")
      .onSnapshot(callSnapShot);
  };

  function callSnapShot(snapshot) {
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const newData = PrepareDateFormat(data);

    if (isLoaded) {
      setVaccines(newData);
    }
  }

  useEffect(() => {
    getData();
    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    isMounted && (
      <Layout>
        <h1
          css={css`
            text-align: center;
          `}
        >
          Vacunas
        </h1>
        <Link href="/vaccines/register">
          <Button
            css={css`
              margin-left: 2rem;
            `}
            bgColor="true"
          >
            Agregar
          </Button>
        </Link>

        <MaterialTable
          style={{ margin: "2rem", padding: "1rem" }}
          title={`reporte_vacunas-${new Date().toLocaleDateString("es-CR")}`}
          icons={TableIcons}
          localization={TableLocalization}
          columns={[
            {
              title: "Nombre",
              field: "name",
              editable: "never",
            },
            { title: "Cantidad", field: "quantity", editable: "never" },
            {
              title: "Registrado",
              field: "createdAt",
              editable: "never",
            },
          ]}
          data={vaccines}
          actions={[
            {
              icon: Visibility,
              tooltip: "Ver Datos",
              onClick: (event, rowData) =>
                router.push(`vaccines/${rowData.id}/show`),
            },
            {
              icon: Edit,
              tooltip: "Editar",
              onClick: (event, rowData) =>
                router.push(`vaccines/${rowData.id}`),
            },
          ]}
          options={TableOptions}
        />
      </Layout>
    )
  );
};
export default WithAuth(Vaccines);
