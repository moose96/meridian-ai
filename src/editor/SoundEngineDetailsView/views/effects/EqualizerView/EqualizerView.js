import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';

import DetailsGroup from '../../../../DetailsGroup';
import Filter from './Filter';
import RawFilter from '../../../../../sound-engine/effects/Equalizer/Filter';
import 'react-vis/dist/style.css';

const EqualizerView = React.forwardRef(({ data, onChange }, ref) => {
  const filters = data?.filters;
  let chartData = [];

  if (data) {
    for (let i = 0; i < data.frequencies.length; i++) {
      chartData.push({
        x: data?.frequencies[i],
        y: data?.frequencyResponse[i]
      });
    }
  }

  const handleChange = (id, name, value) => {
    if (ref.current?.filters?.length > 0) {
      RawFilter.set(ref.current.filters[id], name, value);
    }

    onChange();
  }

  return (
    <DetailsGroup title="Equalizer">
      <XYPlot width={800} height={200} yDomain={[0.5, 1.5]} xType="log">
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries color="blue" data={chartData}/>
        <XAxis tickValues={[63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]}/>
        <YAxis tickValues={[0.5, 1.0, 1.5]} />
      </XYPlot>
      {filters.map((filter, index) => <Filter key={`eq-filter-${index}`} id={index} {...filter} onChange={handleChange} />)}
      <a href="#">Add new</a>
    </DetailsGroup>
  );
});

export default EqualizerView;