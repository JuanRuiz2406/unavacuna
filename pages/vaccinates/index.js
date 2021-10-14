import { Layout } from "../../components/layout/Layout";
import Link from "next/link";

const Vaccinates = () => {
  const idCard = "456456456";

  return (
    <Layout>
      <h1>Vacunados</h1>
      <Link href={`/vaccinates/${idCard}`}>Agregar</Link>
    </Layout>
  );
};

export default Vaccinates;
