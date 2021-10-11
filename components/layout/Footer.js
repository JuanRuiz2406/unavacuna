import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import logo from "../../public/images/unaLogo.png";

const ContFooter = styled.section`
    background-color: #555555;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
`;

const Logo = styled.div`
     text-align: center;  
`;

const Ul = styled.ul`
    text-align: center;
    padding-bottom: 1%;
`;

const Li = styled.li`
    display: inline-block;
    padding: 0 15px;
`;

const A = styled.a`
    font-size: 20px;
    color: #FDFDFD;
    display: online-black;
    text-align: center;
    margin: 0.8px;
`;

const Copyright = styled.div`
    text-align: center;
    color: #6F6F6F;
    background-color: #333333;
`;

export const Footer = () =>{
    return(
            <ContFooter>
                <Logo> 
                    <Image src={logo} width={145} height={65}/>
                </Logo>
                <Ul>
                    <Li>
                        <A href="" target="_blank">Elvin González González</A>
                    </Li>
                    <Li>
                        <A href="" target="_blank">Juan Ruiz Huertas</A>
                    </Li>
                    <Li>
                        <A href="" target="_blank">Alfredo Garcia Chaves</A>
                    </Li>
                    <Li>
                        <A href="https://github.com/drialler" target="_blank">Adrián Valdelomar Espinoza</A>
                    </Li>
                </Ul>
                <Copyright>
                    UNAVacuna V 2.1.1 @ 2021
                </Copyright>
            </ContFooter>
    );
};