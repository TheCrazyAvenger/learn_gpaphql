import {useMutation} from '@apollo/client';
import {LOGIN, SIGNUP} from '../graphql';

export const useLoginMutation = () => {
  const [doLogin, {data, error, loading, client}] = useMutation(LOGIN, {
    onError() {},
  });
  return {doLogin, data, error, loading, client};
};

export const useSignUp = () => {
  const [doSignUp, {error, client, data, loading}] = useMutation(SIGNUP, {
    onError() {},
  });

  return {doSignUp, data, error, loading};
};
