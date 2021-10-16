import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

export const Navigation = () => {
  return (
    <Nav>
      <Link href="/patients">Pacientes</Link>
      <Link href="/vaccines">Vacunas</Link>
      <Link href="/vaccinates">Vacunados</Link>
    </Nav>
  );
};

const Nav = styled.nav`
  margin: 1.5rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray);
    font-family: "PT Sans", sans-serif;
    white-space: nowrap;

    &:hover {
      color: var(--red);
    }
    &:last-of-type {
      margin-right: 0;
    }
    &:first-of-type {
      margin-left: 0;
    }
  }
`;
