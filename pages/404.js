import errorImage from "../public/images/img1.svg";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
const ErrorPage = () => {


  return (
    <Body>
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
        <Image
          css={css`
            width: 50%;
          `}
          src={errorImage}
        />
        <H1>
          <h1
            css={css`
              color: rgb(233, 238, 245);
              font-size: 20px;
              padding: 20px;
            `}
          >
            La página que ha solicitado no se encuentra disponible
          </h1>
        </H1>
        <div>
        
        </div>
      </div>
    </Body>
  );
};

const Body = styled.body`
  background: rgb(8, 28, 34);
  height: 100vh;
  font-family: "Open Sans", sans-serif;
`;

const H1 = styled.h1`
  @media screen and (max-width: 630px) {
    h1 {
      font-size: 16px;
    }
  }
`;
export default ErrorPage;
