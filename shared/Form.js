import styled from "@emotion/styled";

export const Form = styled.form`
  background-color: white;
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
  padding: 0rem 5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
  font-family: var(--body-font);
  font-size: var(--normal-font-size);

  h1 {
    padding-top: 2rem;
    text-align: center;
  }

  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border: none;
  label {
    flex: 0 0 120px;
    font-size: 1.8rem;
  }
  input,
  select,
  textarea {
    flex: 1;
    padding: 1rem;
    border: 1px solid var(--gray3);
    border-radius: 1rem;
  }

  textarea {
    height: 250px;
    resize: none;
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
  margin-bottom: 3rem;
  border-radius: 1rem;

  &:hover {
    cursor: pointer;
    background-color: #de606f;
    color: white;
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.15);
  }
`;

export const Error = styled.p`
  color: #de606f;
  text-align: center;
  text-transform: uppercase;
  font-family: "PT Sans", sans-serif;
  margin-bottom: 2.5rem;
`;
