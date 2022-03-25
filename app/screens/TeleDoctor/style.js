import styled from '@emotion/native';
import { StyleSheet } from 'react-native';

import { Image as Images } from '@components';

export const IconTab = styled(Images)`
  width: 24px;
  height: 24px;
`;

export default StyleSheet.create({
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
});
