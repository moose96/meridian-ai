import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';

import DetailsGroup from '../../../../DetailsGroup';
import Filter from './Filter';
import RawFilter from '../../../../../sound-engine/effects/Equalizer/Filter';
import 'react-vis/dist/style.css';
import './EqualizerView.scss';

const EqualizerView = React.forwardRef(({ data, onChange }, ref) => {
  const filters = data?.filters;
  let chartData = [];

  if (data) {
    for (let i = 0; i < data.frequencies.length; i++) {
      chartData.push({
        x: data?.frequencies[i],
        y: 20 * Math.log10(data?.frequencyResponse[i] / 1.0)
      });
    }
  }

  const handleChange = (id, name, value) => {
    if (ref.current?.filters?.length > 0) {
      RawFilter.set(ref.current.filters[id], name, value);
    }

    onChange();
  }

  const handleAdd = event => {
    event.preventDefault();

    ref.current.createNewFilter();
    onChange();
  }

  return (
    <DetailsGroup title="Equalizer">
      <XYPlot width={800} height={200} yDomain={[-12, 12]} xDomain={[20, 20000]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries color="blue" data={chartData}/>
        <XAxis tickValues={[63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]}/>
        <YAxis tickValues={[-12, -6, 0, 6, 12]} />
      </XYPlot>
      <div className="equalizer-filter-box">
        {filters.map((filter, index) => (
          <Filter key={`eq-filter-${index}`} id={index} {...filter} onChange={handleChange} />
        ))}
        <a href="#" onClick={handleAdd}>Add new</a>
      </div>
    </DetailsGroup>
  );
});

export default EqualizerView;