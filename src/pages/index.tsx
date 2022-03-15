import * as React from 'react';
import { dispatch } from '@src/store';
import * as actionCreators from '@src/store/actionCreators/auth';
import Layout from '@src/components/Layout';
import { RouteComponentProps } from '@reach/router';

const IndexPage: React.FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  React.useEffect(() => {
    dispatch(actionCreators.fetchGithubReposRequested());
  }, []);

  return (
    <Layout location={location}>
      <div>Dashboard</div>
    </Layout>
  );
};

export default IndexPage;
