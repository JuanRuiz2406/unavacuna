import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const Nav = styled.nav`
  margin: 1.5rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: "PT Sans", sans-serif;
    white-space: nowrap;

    &:last-of-type {
      margin-right: 0;
    }
    &:first-of-type {
      margin-left: 0;
    }
  }
`;

export const Navigation = () => {
  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/Patients">Pacientes</Link>
      <Link href="/Vaccine">Vacunas</Link>
      <a
        href="https://www.ccss.sa.cr/web/coronavirus/"
        target="_blank"
        rel="noreferrer"
      >
        COVID-19
      </a>
    </Nav>
  );
};
