import styled from "@emotion/styled";

export const Button = styled.a`
  border-radius: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  background-color: ${(props) => (props.bgColor ? "#a31e32" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: #de606f;
    color: white;
  }
`;
