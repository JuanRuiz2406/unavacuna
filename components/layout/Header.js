import React, { useContext } from "react";
import Image from 'next/image';
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Search } from "../ui/Search";
import { Navigation } from "./Navigation";
import { Button } from "./../ui/Button";
import { FirebaseContext } from "../../firebase/Index";

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
`;

const Logo = styled.p`
  color: var(--red);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family:font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

export const Header = () => {
  const { user, FirebaseInit } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <ContainerHeader>
        <FlexDiv>
          <Link href="/" passHref={true}>
            <img src="/static/images/logo.png" width={150} height={90}/>
          </Link>
        </FlexDiv>

        <FlexDiv>{user && <Search />}</FlexDiv>

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
                  font-size: 2rem;
                  font-weight: 700;
                `}
              >
                <i className="fas fa-user"></i> {user.displayName}
              </p>
            </FlexDiv>

            <FlexDiv>
              <Button bgColor="true" onClick={() => FirebaseInit.logout()}>
                Cerrar Sesión
              </Button>
              <Link href="/registerAdmin" passHref={true}>
                <Button bgColor="true">
                  <i className="fas fa-users-cog"></i>
                </Button>
              </Link>
            </FlexDiv>
          </>
        ) : (
          <FlexDiv>
            <Link href="/login" passHref={true}>
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
