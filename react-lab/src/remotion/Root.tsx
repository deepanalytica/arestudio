import {Composition} from 'remotion';
import {StudioIntro} from './StudioIntro';

export const RemotionRoot=()=>(
  <Composition
    id="ARStudioIntro"
    component={StudioIntro}
    durationInFrames={120}
    fps={30}
    width={1280}
    height={720}
  />
);
