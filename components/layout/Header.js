import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Navigation } from "./Navigation";
import { Button } from "./../../shared/Button";
import FirebaseContext from "./../../firebase/FirebaseContext";

export const Header = () => {
  const { user, logout } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <ContainerHeader>
        <FlexDiv>
          <Navigation />
        </FlexDiv>

        {user ? (
          <>
            <FlexDiv>
              <p
                css={css`
                  margin-right: 2rem;
                  color: var(--gray);
                  font-weight: 700;
                `}
              >
                <i className="fas fa-user"></i> {user.name}
              </p>
            </FlexDiv>

            <FlexDiv>
              <Button bgColor="true" onClick={() => logout()}>
                Cerrar Sesión
              </Button>
              <Link href="/signin" passHref={true}>
                <Button bgColor="true">
                  <i className="fas fa-users-cog"></i>
                </Button>
              </Link>
            </FlexDiv>
          </>
        ) : (
          <FlexDiv>
            <Link href="/signin" passHref={true}>
              <Button bgColor="true">Acceder </Button>
            </Link>
            <Button
              href="https://www.escinf.una.ac.cr/index.php/quienes-somos/contactenos"
              target="_blank"
              rel="noreferrer"
            >
              Contacto
            </Button>
          </FlexDiv>
        )}
      </ContainerHeader>
    </header>
  );
};

const ContainerHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  white-space: nowrap;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
`;
