import { Box, Link } from '@material-ui/core';
import { useNavigate } from '@reach/router';
import Slick from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  HeaderWrapper,
  Logotype,
  RowBox,
  LandingContainer,
} from '../../components';
import {
  MainLanding,
  ASMRLanding,
  EffectsLanding,
  NeuronLanding,
  GenerateLanding,
  StartLanding,
} from './components';

const SECTIONS = [
  {
    id: 'main',
    label: 'Główna',
  },
  {
    id: 'asmr',
    label: 'ASMR',
  },
  {
    id: 'effects',
    label: 'Dźwięki',
  },
  {
    id: 'neuron',
    label: 'Sztuczna inteligencja',
  },
  {
    id: 'generate',
    label: 'Tworzenie kompozycji',
  },
  {
    id: 'run',
    label: 'Uruchom aplikację',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRunApp = () => {
    navigate('/browse');
  };

  return (
    <Box>
      <HeaderWrapper
        bgcolor="black"
        style={{ justifyContent: 'space-between' }}
      >
        <Logotype />
        <RowBox alignItems="center">
          {SECTIONS.map(({ id, label }) => (
            <Link
              href={`#${id}`}
              color="textPrimary"
              style={{ marginRight: '0.5rem' }}
            >
              {label}
            </Link>
          ))}
        </RowBox>
      </HeaderWrapper>
      <MainLanding id="main" onRunApp={handleRunApp} />
      <LandingContainer>
        <Slick fade speed={1000} autoplay autoplaySpeed={5000} infinite dots>
          <ASMRLanding id="asmr" />
          <EffectsLanding id="effects" />
        </Slick>
      </LandingContainer>
      <NeuronLanding id="neuron" />
      <GenerateLanding id="generate" />
      <StartLanding id="run" onRunApp={handleRunApp} />
    </Box>
  );
}
