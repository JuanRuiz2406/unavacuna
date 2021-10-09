import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

import { Search } from "../../components/ui/Search";

export default function Patients() {

  return (
    <div>
      <Layout>
        <Search />
        <h1>Estadisticas de Pacientes</h1>
        <Link href="/patients/register">Agregar</Link>
      </Layout>
    </div>
  );
}