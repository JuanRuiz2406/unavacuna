import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

const Vaccinates = () => {
  return (
    <Layout>
      <h1>Vacunados</h1>
      <Link href="/vaccinates/1">Agregar</Link>
    </Layout>
  );
};

export default Vaccinates;
