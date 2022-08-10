import Axios from 'axios';
import { APP_ID } from 'resources/constants/config';
import Authorization from './auth';
import { executeCall } from './utils';

const authCrudder = (domain, resource) => {
  const url = `${domain}/${resource}`;

  const headers = (groupId) => {
    return groupId ? { ...Authorization, groupId } : Authorization;
  };

  return {
    getAll: (groupId) => executeCall(() => Axios.get(url + `/${APP_ID}/${groupId}`, { headers: headers(groupId) })),
  };
};

export default authCrudder;
