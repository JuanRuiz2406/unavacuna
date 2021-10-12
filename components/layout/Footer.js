import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import logo from "../../public/images/unaLogo.png";

const ContFooter = styled.section`
  left: 0;
  bottom: 0;
  margin-top: 2rem;
  width: 100%;
  text-align: center;
`;

const Li = styled.li`
  display: inline-block;
  padding: 0 15px;
`;

const A = styled.a`
  font-size: 20px;
  color: var(--gray4);
  display: online-black;
  text-align: center;
  margin: 0.8px;
`;
export const Footer = () => {
  return (
    <ContFooter>
      <div
        css={css`
          text-align: center;
        `}
      >
        {/* <Image src={logo} width={145} height={65} /> */}
      </div>
      <ul
        css={css`
        text-align: center;
        padding: 0.5rem;
      `}>
        <Li>
          <A href="" target="_blank">
            Elvin González González
          </A>
        </Li>
        <Li>
          <A href="" target="_blank">
            Juan Ruiz Huertas
          </A>
        </Li>
        <Li>
          <A href="" target="_blank">
            Alfredo Garcia Chaves
          </A>
        </Li>
        <Li>
          <A href="https://github.com/drialler" target="_blank">
            Adrián Valdelomar Espinoza
          </A>
        </Li>
      </ul>
      <div css={css`
          text-align: center;
          color: var(--gray4);
          padding: 0.5rem;
        `}>
            UNAVacuna V 2.1.1 @ 2021
      </div>
    </ContFooter>
  );
};
