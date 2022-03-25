import React from "react";

const useHooks = (props) => {
    const { actions, booking, navigation } = props;
    const { bookingId } = navigation.state.params;
    
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        actions.getBooking({ 
            id: bookingId,
            filter: {
              include: [
                'clinic',
                'patient',
                'inquiry',
              ],
            },
        });
    }, []);

    React.useEffect(() => {
        if (booking.loading || !booking.data) return;
        setReady(true);
    }, [booking]);

    return {
        ready,
    }
}

export { useHooks }