import Container from '../../UI/container/Container';
import { B2bBuisnesPlatform } from '../../components/b2bComponents/b2bBuisnesPlatform/B2bBuisnesPlatform';
import { HowItWorksBlock } from '../../components/b2bComponents/howItWorksBlock/HowItWorksBlock';
import { HowDoesThisHappen } from './../../components/b2bComponents/HowDoesThisHappen/HowDoesThisHappen';
import { SearchBlock } from '../../components/b2bComponents/searchBlock/Search';
import { B2BBlock } from '../../components/mainComponents/B2BBlock/B2BBlock';
import styles from './B2b.module.scss';
import { SecureConclusion } from '../../components/b2bComponents/secureConclusion/SecureConclusion';

export const B2b = () => {
  return (
    <div className={styles.b2b}>
      <Container>
        <B2bBuisnesPlatform />
        <B2BBlock />
        <SecureConclusion/>
        <SearchBlock />
        <HowDoesThisHappen/>
        <HowItWorksBlock /> 
      </Container>
    </div>
  );
};
