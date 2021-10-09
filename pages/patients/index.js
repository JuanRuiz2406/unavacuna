import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

import { Search } from "../../shared/Search";
import WithAuth from "./../../components/unavacuna/WithAuth";

const Patients = () => {
  return (
    <div>
      <Layout>
        <Search />
        <h1>Estadisticas de Pacientes</h1>
        <Link href="/patients/register">Agregar</Link>
      </Layout>
    </div>
  );
};

export default WithAuth(Patients);
