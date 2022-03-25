import React from "react";
import { View, FlatList, Text, SectionList } from "react-native";
import { BookingTabPatientHistoryCard } from "@components";
import styles from "./styles";
import { BaseStyle, BaseColor, Images } from "@config";

function BookingTabPatientHistory(props) {
    const { navigation, bookings, bookingsUpcoming } = props;

    console.log('BookingTabPatientHistory');

    console.log(bookings);

    return (
        <>
            <View style={[styles.content]}>
                <Text style={{fontSize: 16, fontWeight: '500', paddingLeft: 10, paddingTop: 30, marginBottom: 30}}>Recent</Text>
            <View style={styles.autocompleteContainer}>
                {bookings && bookings.map(booking => 
                        <BookingTabPatientHistoryCard
                            booking={booking}
                            navigation={navigation}
                        />
                )}
            </View>
        </View>
     
        </>
    )
}

export default BookingTabPatientHistory;