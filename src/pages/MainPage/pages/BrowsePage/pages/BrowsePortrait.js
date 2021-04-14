import React, { useState } from 'react';
import { Collapse } from '@material-ui/core';

import {
  ColumnBox,
  SoundCategoriesList,
  Loading,
  SoundListHeader,
} from '../../../../../components';
import SoundList from '../components/SoundList';

export default function BrowsePortrait({ loading, sounds }) {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <ColumnBox>
      {loading ? (
        <Loading />
      ) : (
        <SoundList
          data={sounds}
          header={
            <SoundListHeader
              onCategoriesVisibilityChange={() =>
                setShowCategories(!showCategories)
              }
            />
          }
          content={
            <Collapse in={showCategories}>
              <SoundCategoriesList />
            </Collapse>
          }
        />
      )}
    </ColumnBox>
  );
}
