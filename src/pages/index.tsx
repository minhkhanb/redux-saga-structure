import * as React from 'react';
import { dispatch } from '@src/store';
import * as actionCreators from '@src/store/actionCreators/auth';
import Layout from '@src/components/Layout';

const IndexPage = () => {
  React.useEffect(() => {
    dispatch(actionCreators.fetchGithubReposRequested());
  }, []);

  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  );
};

export default IndexPage;
