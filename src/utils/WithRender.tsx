import { ReactElement } from 'react';

const WithRender = ({
  render,
}: {
  render: () => ReactElement | null;
}): ReactElement | null => render();

export default WithRender;
