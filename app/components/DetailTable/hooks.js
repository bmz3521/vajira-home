import React from 'react';

const useHooks = props => {
  const { data, limit = 3 } = props;

  const [expand, setExpand] = React.useState(false);
  const [availableData, setAvailableData] = React.useState(data.slice(0, limit));

  const onShowData = React.useCallback(isExpand => () => {
    if (isExpand) {
      setAvailableData(data);
    } else {
      setAvailableData(data.slice(0, limit));
    }
    setExpand(isExpand);
  }, [data]);

  return {
    availableData: availableData,
    expand: expand,
    events: {
      onShowData,
    },
  };
};

export { useHooks };
