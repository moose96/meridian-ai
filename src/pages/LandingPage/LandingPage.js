import { Box } from '@material-ui/core';
import { useNavigate } from '@reach/router';

import { HeaderWrapper, Logotype } from '../../components';
import {
  MainLanding,
  ASMRLanding,
  EffectsLanding,
  NeuronLanding,
  GenerateLanding,
  StartLanding,
} from './components';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRunApp = () => {
    navigate('/browse');
  };

  return (
    <Box>
      <HeaderWrapper>
        <Logotype />
      </HeaderWrapper>
      <MainLanding id="main" onRunApp={handleRunApp} />
      <ASMRLanding id="asmr" />
      <EffectsLanding id="effects" />
      <NeuronLanding id="neuron" />
      <GenerateLanding id="generate" />
      <StartLanding id="run" onRunApp={handleRunApp} />
    </Box>
  );
}
