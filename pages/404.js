import styled from "@emotion/styled";
import { css } from "@emotion/react";
const ErrorPage = ({ msg }) => {
  return (
    <Container>
      <div
        css={css`
          height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
          justify-content: center;
        `}
      >
        <img
          css={css`
            width: 50%;
          `}
          src="https://i.imgur.com/BIN7xIN.png"
        />
        <H1>
          {msg ? msg : "La página que ha solicitado no se encuentra disponible"}
        </H1>
        <div></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  font-family: "Open Sans", sans-serif;
`;

const H1 = styled.h1`
  color: var(gray);
  font-size: 20px;

  @media screen and (max-width: 630px) {
    font-size: 16px;
  }
`;
export default ErrorPage;
