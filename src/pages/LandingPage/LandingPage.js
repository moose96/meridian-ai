import { Box, useTheme } from '@material-ui/core';
import { useNavigate } from '@reach/router';
import { scroller } from 'react-scroll';

import {
  MainLanding,
  ASMRLanding,
  EffectsLanding,
  NeuronLanding,
  GenerateLanding,
  StartLanding,
  Header,
} from './components';
import scrollSettings from './constants/scrollSettings';

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
  const theme = useTheme();

  const handleRunApp = () => {
    navigate('/browse');
  };

  const handleGoNext = () => {
    const settings = scrollSettings(theme);
    scroller.scrollTo('asmr', settings);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Header navItems={SECTIONS} />
      <MainLanding id="main" onRunApp={handleRunApp} onGoNext={handleGoNext} />
      <ASMRLanding id="asmr" />
      <EffectsLanding id="effects" />
      <NeuronLanding id="neuron" />
      <GenerateLanding id="generate" />
      <StartLanding id="run" onRunApp={handleRunApp} />
    </Box>
  );
}
