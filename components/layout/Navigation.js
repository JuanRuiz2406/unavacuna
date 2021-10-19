import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

export const Navigation = () => {
  return (
    <Nav>
      <FlexDiv>
        <Link href="/patients">Pacientes</Link>
      </FlexDiv>

      <FlexDiv>
        <Link href="/vaccines">Vacunas</Link>
      </FlexDiv>

      <FlexDiv>
        <Link href="/vaccinates">Vacunados</Link>
      </FlexDiv>
    </Nav>
  );
};

const FlexDiv = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Nav = styled.nav`
  margin: 1.5rem;
  a {
    font-size: 1.2rem;
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

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
