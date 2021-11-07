import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
  color: var(--gray4);
  display: online-black;
  text-align: center;
  margin: 0.8px;
`;
export const Footer = () => {
  return (
    <ContFooter>
      <ul
        css={css`
          text-align: center;
          padding: 0.5rem;
        `}
      >
        <Li>
          <A href="https://elvinlab.github.io/profile" target="_blank">
            Elvin González González
          </A>
        </Li>
        <Li>
          <A href="https://github.com/JuanRuiz2406" target="_blank">
            Juan Ruiz Huertas
          </A>
        </Li>
        <Li>
          <A href="https://github.com/E-agle243" target="_blank">
            Alfredo Garcia Chaves
          </A>
        </Li>
        <Li>
          <A href="https://github.com/drialler" target="_blank">
            Adrián Valdelomar Espinoza
          </A>
        </Li>
      </ul>
      <div
        css={css`
          text-align: center;
          color: var(--gray4);
          padding: 0.5rem;
        `}
      >
        UNAVacuna V 4.0.0 @ 2021
      </div>
    </ContFooter>
  );
};
