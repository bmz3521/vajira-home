import React from 'react';
import { getBookingIds } from '@utils/asyncStorage';

const useHooks = props => {
  const { actions } = props;
  const [index, setIndex] = React.useState(0);
  const [ids, setIds] = React.useState([]);
  const [hasIds, setHasIds] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const getIds = async () => {
      const ids = await getBookingIds();
      setIds(ids || []);
      setHasIds(true);
    };
    getIds();
  }, []);

  React.useEffect(() => {
    if (hasIds) {
      if (ids.length > 0) {
        actions.getBookings({
          filter: {
            where: { or: ids.map(id => ({ id })) },
            include: ['clinic'],
          },
        });
      }
      setReady(true);
    }
  }, [hasIds, ids]);

  const setIndexCallback = React.useCallback(
    () => index => setIndex(index),
    [],
  );

  return {
    index,
    ready,
    events: {
      setIndex: setIndexCallback,
    },
  };
};

export { useHooks };
