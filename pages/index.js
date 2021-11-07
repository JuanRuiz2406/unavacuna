import React, { useContext, useEffect, useState } from "react";
import { Bar, PolarArea, Pie } from 'react-chartjs-2';
import styled from "@emotion/styled";

import { Layout } from "./../components/layout/Layout";
import FirebaseContext from './../firebase/FirebaseContext';

const options = {
  indexAxis: 'y',

  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
};

const options2 = {
  plugins: {
    title: {
      display: false,
    },
  },
  elements: {

    bar: {
      borderWidth: 2,
    },
  },
  scale: {
    ticks: { beginAtZero: true },
  },
};

const doses = ['Dosis 1', 'Dosis 2', 'Dosis 3', 'Refuerzo'];

const Home = () => {
  const [vaccines, setVaccines] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);
  const [dataChart3, setDataChart3] = useState([]);
  const [vaccineColor, setVaccineColor] = useState([]);
  const [vaccineColor2, setVaccineColor2] = useState([]);

  const [isLoaded, setIsLoaded] = useState(true);

  const { firestore } = useContext(FirebaseContext);

  const getData = () => {
    firestore
      .collection("vaccines")
      .onSnapshot(callSnapShot);
  };

  function callSnapShot(snapshot) {
    const data = snapshot.docs.map((doc) => {
      return doc.data().name;
    });

    const quantity = snapshot.docs.map((doc) => {
      return doc.data().quantity;
    });

    if (isLoaded) {
      getCountByVaccine(data);
      setDataChart3(quantity);
      setVaccines(data);
    }
  }

  function getColor() {
    return "hsl(" + 360 * Math.random() + ',' +
      (25 + 70 * Math.random()) + '%,' +
      75 + '%)'
  }
  const getCountByVaccine = (dataVaccines) => {

    dataVaccines.forEach(element => {
      firestore
        .collection("vaccinates")
        .where("vaccineName", "==", element)
        .get()
        .then((querySnapshot) => {
          setDataChart((e) => [...e, querySnapshot.docs.length]);
          setVaccineColor((e) => [...e, getColor()]);
          setVaccineColor2((e) => [...e, getColor()]);
        });
    });

    doses.forEach(element => {
      firestore
        .collection("vaccinates")
        .where("dose", "==", element)
        .get()
        .then((querySnapshot) => {
          setDataChart2((e) => [...e, querySnapshot.docs.length]);
        });
    });
  }

  useEffect(() => {
    getData();
    return () => {
      setIsLoaded(false);
    };
  }, []);

  const data = {
    labels: vaccines,
    datasets: [
      {
        data: dataChart,
        backgroundColor: vaccineColor,
        borderColor: vaccineColor,
      },
    ],
  };

  const data2 = {
    labels: doses,
    datasets: [
      {
        data: dataChart2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: vaccines,
    datasets: [
      {
        label: '# of Votes',
        data: dataChart3,
        backgroundColor: vaccineColor2,
        borderColor: ['white'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Layout>

      <DIV data-loader="lazy">
        <h3>Grafico #1 Cantidad de pacientes por vacuna</h3>
        <Bar data={data} options={options} />
        <br />
        <hr />
        <br />
        <h3>Grafico #2 Cantidad de pacientes por dosis</h3>
        <PolarArea data={data2} options={options2} />
        <br />
        <hr />
        <br />
        <h3>Grafico #3 Cantidad de vacunas disponibles</h3>
        <Pie data={data3} />
      </DIV>

    </Layout>
  );
};

export default Home;

const DIV = styled.div`
  width: 60%;
  margin: 5rem auto 0 auto;
  padding: 0rem 5rem;
  text-align: center;
  color: var(--red);
  @media (max-width: 768px) {
    width: 100%;
  }
`;