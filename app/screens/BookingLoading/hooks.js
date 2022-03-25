import React from 'react';
import { addBookingId } from '@utils/asyncStorage';

const useHooks = props => {
  const { actions, booking, navigation } = props;
  const { clinic, quotation, patient } = navigation.state.params;
  const [ready, setReady] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(0.2);
    actions.createBooking({ clinic, quotation, patient });
    setReady(true);
    setProgress(0.38);
  }, []);

  React.useEffect(() => {
    if (ready && !!booking.data) {
      setProgress(0.76);
      const addBooking = async () => {
        await addBookingId(booking.data.id);
      };

      addBooking();
      setProgress(1);
      navigation.popToTop();
      navigation.navigate('MyBookingDetail', { id: booking.data.id });
    }
  }, [booking.data]);

  return {
    clinic,
    progress,
  };
};

export { useHooks };
