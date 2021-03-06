import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

import WithAuth from "./../../components/unavacuna/WithAuth";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../firebase/FirebaseContext";
import MaterialTable from "material-table";
import { Button } from "./../../shared/Button";
import {
  TableIcons,
  TableLocalization,
  TableOptions,
} from "../../helpers/TableInit";
import { css } from "@emotion/react";

import Visibility from "@material-ui/icons/Visibility";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";

import UseIsMounted from "../../hooks/UseIsMounted";
import { PrepareDateFormat } from "../../helpers/PrepareDateFormat";

import { useRouter } from "next/router";

const Patients = () => {
  const isMounted = UseIsMounted();

  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const { firestore } = useContext(FirebaseContext);
  const router = useRouter();

  const getData = () => {
    firestore
      .collection("patients")
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
      setPatients(newData);
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
            color: var(--red);
          `}
        >
          Pacientes
        </h1>
        <Link href="/patients/register">
          <Button
            css={css`
              margin-left: 2rem;
            `}
            bgColor="true"
          >
            <i className="fas fa-user-plus"></i> Agregar
          </Button>
        </Link>

        <MaterialTable
          style={{ margin: "2rem", padding: "1rem" }}
          title={`reporte_pacientes-${new Date().toLocaleDateString("es-CR")}`}
          icons={TableIcons}
          localization={TableLocalization}
          columns={[
            {
              title: "Cedula",
              field: "idCard",
              editable: "never",
            },
            { title: "Nombre", field: "name", editable: "never" },
            {
              title: "Apellidos",
              field: "lastName",
              editable: "never",
            },
            {
              title: "Edad",
              field: "age",
              editable: "never",
            },
            {
              title: "Registrado",
              field: "createdAt",
              editable: "never",
            },
          ]}
          data={patients}
          actions={[
            {
              icon: Visibility,
              tooltip: "Ver Datos",
              onClick: (event, rowData) =>
                router.push(`patients/${rowData.id}/show`),
            },
            {
              icon: Edit,
              tooltip: "Editar",
              onClick: (event, rowData) => {
                return router.push(`/patients/${rowData.idCard}`);
              },
            },
            {
              icon: Add,
              tooltip: "Vacunar",
              onClick: (event, rowData) => {
                return router.push(`/vaccinates/${rowData.idCard}`);
              },
            },
          ]}
          options={TableOptions}
          onRowClick={(event, rowData) =>
            router.push(`patients/${rowData.id}/show`)
          }
        />
      </Layout>
    )
  );
};
export default WithAuth(Patients);
