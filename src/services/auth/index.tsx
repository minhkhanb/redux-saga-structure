import apiClient from '../../utils/api';

export const getGithubRepos = async () => {
  return apiClient.get('/repositories');
}