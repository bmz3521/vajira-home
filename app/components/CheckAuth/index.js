import React, { useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { withNavigation } from '@react-navigation/compat';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';

const Fetch = React.forwardRef(
  (
    {
      fetch = payload => Promise.resolve(payload),
      params,
      children,
      checkAuth,
      navigation,
    },
    ref,
  ) => {
    const state = useAsyncRetry(() => {
      async function fetchData() {
        const res = await fetch(params);
        return res;
      }
      return fetchData();
    }, [params]);
    const auth = useSelector(state => state.auth);

    useImperativeHandle(ref, () => ({
      reload: state.retry,
    }));

    if (checkAuth) {
      if (!auth.isAuthenticated) {
        navigation.navigate('SignIn2');
        return null;
      }
    }

    if (state.loading) {
      return null;
    }

    if (state.error) {
    }

    return children(state.value);
  },
);

export default withNavigation(Fetch);
