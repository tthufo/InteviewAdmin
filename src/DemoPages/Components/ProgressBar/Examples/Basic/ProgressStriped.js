import React from 'react';
import { Progress } from 'reactstrap';

const ProgressStripedExample = props => (
  <div>
    <Progress className="mb-3" striped value={2 * 5} />
    <Progress className="mb-3" striped color="success" value="25" />
    <Progress className="mb-3" striped color="info" value={50} />
    <Progress className="mb-3" striped color="warning" value={75} />
    <Progress className="mb-3" striped color="danger" value="100" />
    <Progress multi>
      <Progress striped bar value="10" />
      <Progress striped bar color="success" value="30" />
      <Progress striped bar color="warning" value="20" />
      <Progress striped bar color="danger" value="20" />
    </Progress>
  </div>
);

export default ProgressStripedExample;
