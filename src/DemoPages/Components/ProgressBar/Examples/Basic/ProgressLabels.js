import React from 'react';
import { Progress } from 'reactstrap';

const ProgressLabelsExample = props => (
  <div>
    <Progress className="mb-3" value="25">25%</Progress>
    <Progress className="mb-3" value={50}>1/2</Progress>
    <Progress className="mb-3" value={75}>You're almost there!</Progress>
    <Progress className="mb-3" color="success" value="100">You did it!</Progress>
    <Progress multi>
      <Progress bar value="15">Meh</Progress>
      <Progress bar color="success" value="30">Wow!</Progress>
      <Progress bar color="info" value="25">Cool</Progress>
      <Progress bar color="warning" value="20">20%</Progress>
      <Progress bar color="danger" value="5">!!</Progress>
    </Progress>
  </div>
);

export default ProgressLabelsExample;
