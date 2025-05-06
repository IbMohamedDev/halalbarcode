import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';


export default function Overlay({ children }: { children: React.ReactNode }) {
    const { width } = Dimensions.get('window');
  const boxWidth = width * 0.7;
  const boxHeight = width * 0.4;

  return (
    <View style={{ flex: 1 }}>

      {children}


      <View style={styles.overlay}>
        <View style={{ width: boxWidth, height: boxHeight }}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>
    </View>
  );
}

const cornerSize = 30;
const cornerThickness = 4;
const cornerColor = '#00FF00';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: cornerSize,
    height: cornerSize,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: cornerThickness,
    borderLeftWidth: cornerThickness,
    borderColor: cornerColor,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: cornerThickness,
    borderRightWidth: cornerThickness,
    borderColor: cornerColor,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: cornerThickness,
    borderLeftWidth: cornerThickness,
    borderColor: cornerColor,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: cornerThickness,
    borderRightWidth: cornerThickness,
    borderColor: cornerColor,
  },
});
