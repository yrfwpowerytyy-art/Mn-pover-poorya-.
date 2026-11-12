import React from 'react';
import {Composition} from 'remotion';
import {ColdEarth} from './ColdEarth';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ColdEarth"
    component={ColdEarth}
    durationInFrames={2044}
    fps={30}
    width={1920}
    height={1080}
  />
);
