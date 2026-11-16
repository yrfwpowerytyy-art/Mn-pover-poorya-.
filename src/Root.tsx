import React from 'react';
import {Composition} from 'remotion';
import {ColdEarth} from './ColdEarth';
import {PopulationRanking} from './PopulationRanking';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ColdEarth" component={ColdEarth} durationInFrames={2044} fps={30} width={1920} height={1080} />
    <Composition id="PopulationRanking" component={PopulationRanking} durationInFrames={3861} fps={30} width={720} height={1280} />
  </>
);
