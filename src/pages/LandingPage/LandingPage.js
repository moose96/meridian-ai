import { Box } from '@material-ui/core';
import { useNavigate } from '@reach/router';

import {
  MainLanding,
  ASMRLanding,
  EffectsLanding,
  NeuronLanding,
  GenerateLanding,
  StartLanding,
  Header,
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
    <Box style={{ position: 'relative' }}>
      <Header navItems={SECTIONS} />
      <MainLanding id="main" onRunApp={handleRunApp} />
      <ASMRLanding id="asmr" />
      <EffectsLanding id="effects" />
      <NeuronLanding id="neuron" />
      <GenerateLanding id="generate" />
      <StartLanding id="run" onRunApp={handleRunApp} />
    </Box>
  );
}
