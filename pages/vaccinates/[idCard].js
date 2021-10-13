import { Layout } from "../../components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import UseIsMounted from "../../hooks/UseIsMounted";

const registerVaccinated = () => {
  const isMounted = UseIsMounted();
  const router = useRouter();
  const idCard = router.query.idCard;

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <div>
        <h1>Vamos a vacunar al paciente: * Consultar Ced {idCard} *</h1>
      </div>
    </Layout>
  );
};

export default registerVaccinated;
