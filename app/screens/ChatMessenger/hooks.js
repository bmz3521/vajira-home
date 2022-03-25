import React from 'react';

const useHooks = props => {
  const { actions } = props;
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
    const filter = {
      filter: {
        where: {
          status: {
            neq: 'PATIENT_FINISH_QUOTATION',
          },
        },
        include: [
          {
            relation: 'patient',
          },
          {
            relation: 'inquiry',
          },
          {
            relation: 'clinic',
            scope: {
              fields: {
                slug: true,
                name: true,
                featureImageM: true,
              },
            },
          },
        ],
      },
    };

    if (hasIds && ids.length > 0) {
      filter.where.or = ids.map(id => ({ id }));
    }

    actions.getBookings(filter);
    setReady(true);
  }, [hasIds, ids]);

  return {
    ready,
    events: {},
  };
};

export { useHooks };
