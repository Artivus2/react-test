import React from "react";
import styles from './Main.module.scss'
import MainTopBlock from '../../components/mainComponents/mainTopBlock/MainTopBlock';
import Container from '../../UI/container/Container';
import { GeneralBlock } from '../../components/mainComponents/GeneralBlock/GeneralBlock';
import { B2BBlock } from '../../components/mainComponents/B2BBlock/B2BBlock';
import { WorksBlock } from '../../components/mainComponents/WorksBlock/WorksBlock';
import { RefBlock } from '../../components/mainComponents/RefBlock/RefBlock';
import { AskBlock } from '../../components/mainComponents/AskBlock/AskBlock';
import { FifthBlock } from '../../components/mainComponents/fifthBlock/FifthBlock';
import { SixthBlock } from '../../components/mainComponents/sixthBlock/SixthBlock';
import { EighthBlock } from '../../components/mainComponents/eighthBlock/EighthBlock';
import { NinthBlock } from '../../components/mainComponents/ninthBlock/NinthBlock';
import { TenthBlock } from '../../components/mainComponents/tenthBlock/TenthBlock';


const Main = () => {

  return (
    <div className={styles.main}>
      <MainTopBlock />
      <Container className={styles.container}>
        <AskBlock />
        <GeneralBlock />
        <B2BBlock />
        <WorksBlock />
        <FifthBlock />
        <SixthBlock />
        <RefBlock />
        <EighthBlock />
        <NinthBlock />
        <TenthBlock />
      </Container>
    </div>
  );
};

export default Main;
