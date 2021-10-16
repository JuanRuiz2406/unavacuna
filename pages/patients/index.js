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

import Edit from "@material-ui/icons/Edit";
import UseIsMounted from "../../hooks/UseIsMounted";

const Patients = () => {
  const isMounted = UseIsMounted();

  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const { firestore } = useContext(FirebaseContext);

  const getData = () => {
    firestore
      .collection("patients")
      .orderBy("registerDate", "desc")
      .onSnapshot(callSnapShot);
  };

  function callSnapShot(snapshot) {
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    if (isLoaded) setPatients(data);
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
          Pacientes
        </h1>
        <Link href="/patients/register">
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
              title: "Apellido",
              field: "lastName",
              editable: "never",
            },

            {
              title: "Fecha",
              field: "registerDate",
              editable: "never",
              render: (rowData) => (
                <span className="whitespace-nowrap">
                  {new Date(rowData.registerDate).toLocaleDateString("es-CR")}
                </span>
              ),
            },
          ]}
          data={patients}
          actions={[
            {
              icon: Edit,
              tooltip: "Editar",
              onClick: (event, rowData) => alert("Editar"),
            },
          ]}
          options={TableOptions}
        />
      </Layout>
    )
  );
};
export default WithAuth(Patients);
