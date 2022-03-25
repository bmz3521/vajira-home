import React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Icon, Text } from '@components';
import styles from './styles';
import PropTypes from 'prop-types';

function SearchHeader(props) {
  const {
    style,
    styleLeft,
    styleCenter,
    styleRight,
    styleRightSecond,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    keyExtractor,
    size,
  } = props;

  const [textFilter, setTextFilter] = React.useState('');
  const [dataFilter, setDataFilter] = React.useState([]);

  const changeText = React.useCallback(
    () => text => {
      if (text == '') {
        setTextFilter(text);
        setDataFilter([]);
      } else {
        setTextFilter(text);
        setDataFilter(props.data.filter(d => props.filter(d, text)));
      }
    },
    [props.data, props.filter],
  );

  const selectSuggest = React.useCallback(
    item => () => {
      changeText()('');
      props.onPress(item);
    },
    [props.onPress],
  );

  StatusBar.setBarStyle('dark-content', true);

  return (
    <View style={[styles.contain, style]}>
      <View style={styles.left}>
        <TouchableOpacity
          style={[styles.contentLeft, styleLeft]}
          onPress={onPressLeft}
        >
          {props.renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        <View style={styles.inputContainer}>
          <Icon style={styles.icon} name="search" size={16} />
          <TextInput
            style={styles.input}
            value={textFilter}
            onChangeText={changeText()}
          />
          <Icon style={styles.icon} name="times" size={16} />
        </View>
        <View style={styles.autocompleteContainer}>
          <FlatList
            data={dataFilter.slice(0, size)}
            keyExtractor={keyExtractor}
            renderItem={data => (
              <TouchableHighlight
                style={[styles.item, style]}
                onPress={selectSuggest(data.item)}
              >
                {props.renderItem(data)}
              </TouchableHighlight>
            )}
          />
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRightSecond]}
          onPress={onPressRightSecond}
        >
          {props.renderRightSecond()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressRight}
        >
          {props.renderRight()}
        </TouchableOpacity>
      </View>
    </View>
  );
}

SearchHeader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};

SearchHeader.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  barStyle: 'dark-content',
  data: [],
  size: 5,
  keyExtractor: (item, index) => item,
  filter: (item, text) => item.toLowerCase().includes(text.toLowerCase()),
  renderItem: item => <Text>{item}</Text>,
  onPress: () => {},
};

export default SearchHeader;
