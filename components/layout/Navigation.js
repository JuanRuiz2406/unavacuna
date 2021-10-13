import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Image from "next/image";

import logo from "../../public/images/logo.png";

export const Navigation = () => {
  return (
    <Nav>
      <Link href="/patients">Pacientes</Link>
      <Link href="/vaccines">Vacunas</Link>
      <Image src={logo} width={150} height={90} />
      <Link href="/vaccinates">Vacunados</Link>
    </Nav>
  );
};

const Nav = styled.nav`
  margin: 1.5rem;

  a {
    font-size: px;
    margin-left: 2rem;
    color: var(--gray);
    font-family: "PT Sans", sans-serif;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 10%;
  }

  a:hover {
    color: var(--red);
  }
`;
