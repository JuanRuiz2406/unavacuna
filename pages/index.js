import Head from 'next/head'
import Link from "next/link";

export default function Home() {
  return (
    <div>

      <h1>Rutas Públicas</h1>
      <Link href="/login">Login</Link>

      <h1>Rutas Privadas</h1>
      <Link href="/vaccine">Vacunas</Link>

    </div>
  )
}
