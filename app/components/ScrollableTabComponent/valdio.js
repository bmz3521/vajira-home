import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import {
    Card,
    Button,
    ClinicPackageItem,
    ClinicItem,
    Tag,
    Icon
} from "@components";
import { Images, BaseColor } from "@config";
import {ScrollableTabView, DefaultTabBar} from '@valdio/react-native-scrollable-tabview';
import { ClinicPackageData } from "@data";

export default class ScrollableTabComponent extends Component {

    constructor(props) {

        super(props);

        this.state = {enableFlatListScrollViewScroll: false};

    }

    handleScroll = () => {
        console.log("test work");
        // Need to check to prevent null exception. 
        this.props.handleScroll(); // Same as this.props.onPress && this.props.onPress();
      }

      enableFlatlistScroll = () => {
        console.log("test work");

        this.setState({ enableFlatListScrollViewScroll: true });

        // Need to check to prevent null exception. 
         // Same as this.props.onPress && this.props.onPress();
      }

      disableFlatlistScroll = () => {
        console.log("test work");

        this.setState({ enableFlatListScrollViewScroll: false });

        // Need to check to prevent null exception. 
      }


  handleTabChange = (index, tabName) => {
      console.log("handle change tab")
      console.log(index.i);
    // if (index.i == 0) {this.props.changeTab(index);}
    // if (index.i == 1) {console.log("working"); this.props.changeTab(index);}
    // if (index.i == 2) this.props.changeTab(index);
    // if (index.i == 3) this.props.changeTab(index);

    if (index.i == 0) this.props.changeTabTrigger('clinicPackages', index.i);
    if (index.i == 1) this.props.changeTabTrigger('clinic', index.i);
    if (index.i == 2) this.props.changeTabTrigger('doctor', index.i);
    if (index.i == 3) this.props.changeTabTrigger('diary', index.i);
  }

//   componentDidUpdate = () => {
//       let activePageId = this.props.activePage;
//       this.onChangeTabChild(activePageId);
//   }

  onChangeTabChild = (tabId) => {
    console.log("tabSelected");
    console.log("tabSelected child");

    console.log("tabId" + tabId);
    console.log("tabSelected child");

  this.tabView.goToPage(tabId);

  }

    render() {
        const {changeTabTrigger, style, title, location, time, image, onPress, clinicPackage, clinicData, scrollable, onScroll, activeTabBar, clinics, doctors } = this.props;
       
        console.log("clinicPackage");

        console.log(this.props.myScroll);

        console.log("clinicPackage");

        console.log(this.state.enableFlatListScrollViewScroll);

        const collapsableComponent = (
            <View style={{height: 300, backgroundColor: 'yellow', width: '100%'}}>
            </View>
          )
        return (
            <ScrollableTabView
            pullToRefresh={this._onRefresh}
            collapsableBar={collapsableComponent}
            tabBarBackgroundColor="white"
            renderTabBar={() => <DefaultTabBar/>}
            onChangeTab={this.handleTabChange}
          >
              
        <ScrollView tabLabel='Package'
          tabView={this.tabView}
                    contentContainerStyle={{ backgroundColor: 'white', paddingHorizontal: 5, paddingTop: 10}}
                    onChangeTab={({i, ref}) => {this.handleTabChange(i, ref.props.tabLabel)}}
                  
                    >
                      <View style={styles.contentList}>
                           <Text
                                    style={{ marginLeft: 20}}
                                    outline={false}
                                    onPress={() =>
                                        this.onSelectFacilities(item)
                                    }
                                >
                            {/* <Icon name="chevron" size={20} style={{ marginRight: 10 }} /> */}
                                   Select Location
                                </Text>
                                <Text
                                    style={{ marginLeft: 20}}
                                    outline={true}
                                    onPress={() =>
                                        this.onSelectFacilities(item)
                                    }
                                >
                                   Filter
                                </Text>
     </View>
     <View>
        <FlatList
            onPress={this.handlePress}
            columnWrapperStyle={{ marginBottom: 0, marginHorizontal: 0 }}
            scrollEnabled={scrollable}
            // onScroll={onScroll}
            // onEndReachedThreshold={8}
            // onEndReached={() => {
            //     console.log(" On End Reached");
            //     this.handleScroll();
            //     }}
            numColumns={2}
            data={clinicPackage}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <ClinicPackageItem
                    grid
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginHo: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        />
        </View>
    </ScrollView>

    <View tabLabel='Clinic'
                    scrollEnabled={false}

                        >
        <View contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
        maxHeight={5000}
        scrollEnabled={true}
            numColumns={1}
            data={clinics}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <ClinicItem
                renderList
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginHo: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        />
        {/* <FlatList
            columnWrapperStyle={{ marginBottom: 0, marginHorizontal: 0 }}
            scrollEnabled={scrollable}
            numColumns={2}
            data={clinicData}
            keyExtractor={(item, index) => item.id}
            onEndReached={this.handleScroll}
            onEndThreshold={0}
            renderItem={({ item, index }) => (
                <ClinicPackageItem
                    grid
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginLeft: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        /> */}
        </View>
    </View>    
    
    <ScrollView tabLabel='Doctor'
        style={{ backgroundColor: 'white', paddingHorizontal: 5, paddingTop: 60 }}
        onChangeTab={({i, ref}) => {this.handleTabChange(i, ref.props.tabLabel)}}
                    tabView={this.tabView}
                    // scrollEnabled={true}
                 
                    >
              
                      <View style={styles.contentList}>
                           <Text
                                    style={{ marginLeft: 20}}
                                    outline={false}
                                    onPress={() =>
                                        this.onSelectFacilities(item)
                                    }
                                >
                            {/* <Icon name="chevron" size={20} style={{ marginRight: 10 }} /> */}
                                   Select Location
                                </Text>
                                <Text
                                    style={{ marginLeft: 20}}
                                    outline={true}
                                    onPress={() =>
                                        this.onSelectFacilities(item)
                                    }
                                >
                                   Filter
                                </Text>
                </View>
         
        
        <FlatList
            // style={{paddingTop: 500, marginTop: -500}}
            // onPress={this.handlePress}
            // maxHeight={10000}
            // scrollEnabled={this.state.enableFlatListScrollViewScroll}

            // scrollEnabled={this.state.enableFlatListScrollViewScroll}
            // scrollEnabled={false}
            // onScroll={onScroll}
            // onEndReachedThreshold={8}
            // onEndReached={() => {
            //     console.log(" On End Reached");
            //     this.handleScroll();
            //     }}d
            scrollEnabled={false}
            numColumns={1}
            data={doctors}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <ClinicItem
                renderList
                    image={item.featureImageM}
                    name={item.firstName + ' ' + item.lastName}
                    // location={item.address}
                    city={item.lastName}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginHo: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        />
        </ScrollView>

    
  </ScrollableTabView>
        );
    }
}

ScrollableTabComponent.propTypes = {
    image: PropTypes.node.isRequired,
    title: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func
};

ScrollableTabComponent.defaultProps = {
    image: Images.profile2,
    title: "BBC Music Introducing",
    time: "Thu, Oct 31, 9:00am",
    location: "Tobacco Dock, London",
    style: {},
    onPress: () => {}
};
