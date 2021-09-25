import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

export default function Patients() {
  return (
    <div>
      <Layout>
        <h1>Estadisticas de Pacientes</h1>
        <Link href="/Patients/Register">Agregar</Link>
      </Layout>
    </div>
  );
}