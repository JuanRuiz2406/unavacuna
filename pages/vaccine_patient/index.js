import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

const Vaccinates = () => {
  return (
    <Layout>
      <h1>Vacunados</h1>
      <Link href="/vaccine_patient/456456456">Agregar</Link>
    </Layout>
  );
};

export default Vaccinates;
