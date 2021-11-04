import React, { useContext, useEffect, useState } from "react";
import { Bar, Radar } from 'react-chartjs-2';
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
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const options2 = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
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

const Home = () => {
  const [vaccineColor, setVaccineColor] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [vaccines, setVaccines] = useState([]);
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

    if (isLoaded) {
      getCountByVaccine(data);
      setVaccines(data);

    }
  }

  const getCountByVaccine = (dataVaccines) => {

    dataVaccines.forEach(element => {
      firestore
        .collection("vaccinates")
        .where("vaccineName", "==", element)
        .get()
        .then((querySnapshot) => {
          setDataChart((e) => [...e, querySnapshot.docs.length]);
          setVaccineColor((e) => [...e, "#" + ((1 << 24) * Math.random() | 0).toString(16)]);
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
    labels: vaccines,
    datasets: [
      {
        data: dataChart,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>

      <DIV>
        <h1>En linea Cantidad de pacientes por vacuna</h1>
        <Bar data={data} options={options} />
        <br />
        <br />
        <h1>Radar Cantidad de pacientes por vacuna</h1>
        <Radar data={data2} options={options2} />
      </DIV>


    </Layout>
  );
};

export default Home;

const DIV = styled.div`
  width: 50%;
  margin: 5rem auto 0 auto;
  padding: 0rem 5rem;
  text-align: center;
  color: var(--red);
`;