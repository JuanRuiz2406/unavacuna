import React, { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Layout } from "./../../components/layout/Layout";
import FirebaseContext from "./../../firebase/FirebaseContext";

import WithAuth from "./../../components/unavacuna/WithAuth";

import { Button } from "./../../shared/Button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px;
`;

const Icon = styled.div`
  position: relative;
  width: 110px;
  height: 70px;
  background-color: #fff;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50px;
    width: 50px;
    height: 22px;
    background-color: transparent;
    border-top-right-radius: 50px;
    box-shadow: 15px -15px 0 15px #fff;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -50px;
    width: 50px;
    height: 22px;
    background-color: transparent;
    border-top-left-radius: 50px;
    box-shadow: -15px -15px 0 15px #fff;
  }
`;

const Card = styled.div`
  position: relative;
  width: 260px;
  height: 320px;
  margin: 30px;
  background: rgb(91, 99, 111);
  background: linear-gradient(
    0deg,
    rgba(91, 99, 111, 1) 0%,
    rgba(79, 88, 101, 1) 21%,
    rgba(64, 74, 89, 1) 100%
  );
  border-radius: 20px;
  border-bottom-left-radius: 160px;
  border-bottom-right-radius: 160px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  padding: 20px;
  padding-top: 75px;
  text-align: left;

  & h1 {
    font-size: 1em;
    margin-bottom: 2px;
    color: #fff;
  }
`;

const Information = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  color: #fff;

  &:active {
    display: block;
  }
`;
const Vaccines = () => {
  const [vaccines, setVaccines] = useState([]);

  const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    const getData = () => {
      firestore
        .collection("vaccines")
        .orderBy("registerDate", "desc")
        .onSnapshot(callSnapShot);
    };
    getData();
  }, []);

  function callSnapShot(snapshot) {
    const vaccines = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setVaccines(vaccines);
  }

  return (
    <Layout>
      <h1>Lista de vacunas</h1>
      <Link href="/vaccines/register">
        <Button
          css={css`
            margin-left: 2rem;
          `}
          bgColor="true"
        >
          Agregar
        </Button>
      </Link>
      <Container>
        {vaccines.map((item, i) => {
          return (
            <Card>
              <Icon></Icon>
              <Content>
                <h1>Nombre: {item.name}</h1>
                <h1>Cantidad: {item.quantity}</h1>
                <h1>
                  Fecha:{" "}
                  {new Date(item.registerDate).toLocaleDateString("es-CR")}
                </h1>
                <h1>Descripción: </h1>
                <Information>{item.description}</Information>
              </Content>
            </Card>
          );
        })}
      </Container>
    </Layout>
  );
};
export default WithAuth(Vaccines);
