import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const InputText = styled.input`
  border: 1px solid var(--gray3);
  padding: 1rem;
  min-width: 300px;
`;

const ButtonSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-repeat: no-repeat;
  position: absolute;
  right: 0.5rem;
  top: 2.5px;
  background-color: white;
  border: none;
  text-indent: -9999px;
  /* background-image: url("/search.png"); */

  &:hover {
    cursor: pointer;
  }
`;
export const Search = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText type="text" placeholder="Buscar paciente" />
      <ButtonSubmit type="submit"> Buscar </ButtonSubmit>
    </form>
  );
};
