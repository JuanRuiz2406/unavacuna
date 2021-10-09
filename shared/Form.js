import styled from "@emotion/styled";

export const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;

  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  border: none;
  label {
    flex: 0 0 120px;
    font-size: 1.8rem;
  }
  input,
  textarea {
    flex: 1;
    padding: 1rem;
    border: 1px solid var(--gray3);
  }

  textarea {
    height: 250px;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--red);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #de606f;
    color: white;
  }
`;

export const Error = styled.p`
  background-color: var(--red);
  padding: 1rem;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;
