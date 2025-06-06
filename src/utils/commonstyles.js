import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  bgrColor: {
    backgroundColor: '#EEEEEE',
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
  font12: {
    fontSize: 12,
  },
  font13: {
    fontSize: 13,
  },
  font14: {
    fontSize: 14,
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
  pHorizontal10: {
    paddingHorizontal: 10,
  },
  mHorizontal10: {
    marginHorizontal: 10,
  },
  pVertical10: {
    paddingVertical: 10,
  },
  pLeft10: {
    paddingLeft: 10,
  },
  pRight10: {
    paddingRight: 10,
  },
  mLeft10: {
    marginLeft: 10,
  },
  mRight10: {
    marginRight: 10,
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
  blurredText: {
    color: '#FFFFCC',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});

export default commonStyles;