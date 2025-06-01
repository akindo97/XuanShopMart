import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  bgrColor: {
    backgroundColor: '#DDDDDD',
  },
  textColor: {
    color: '#00CC66',
  },
  flex1: {
    flex: 1,
  },
  bgrWhite: {
    backgroundColor: '#FFFFFF',
  },
  priceColor: {
    fontSize: 16,
    color: 'red',
  },
  oldPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: '#666',
    paddingBottom: 2,
  },
  fwblob: {
    fontWeight: 'bold',
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  pLeft10: {
    paddingLeft: 10,
  },
  fStart: {
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  fEnd: {
    textAlign: 'left',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  buttonColor: {
    backgroundColor: '#00CC66',
    color: '#FFFFFF',
  },
  blurColor: {
    backgroundColor: '#00CC6650',
  },
  disableCss: {
    opacity: 0.3,
    pointerEvents: 'none',
  },
  pRelative: {
    position: 'relative',
  },
});

export default commonStyles;