import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Text} from 'react-native';
import Sound from 'react-native-sound';

import MidiNumbers from './MidiNumbers';

class Key extends Component {
  state = {
    touched: false,
    sound: null,
  };

  static propTypes = {
    midiNumber: PropTypes.number.isRequired,
    naturalKeyWidth: PropTypes.number.isRequired, // Width as a ratio between 0 and 1
    useTouchEvents: PropTypes.bool.isRequired,
    accidental: PropTypes.bool.isRequired,
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired,
    accidentalWidthRatio: PropTypes.number.isRequired,
    pitchPositions: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    accidentalWidthRatio: 0.65,
    pitchPositions: {
      C: 0,
      Db: 0.55,
      D: 1,
      Eb: 1.8,
      E: 2,
      F: 3,
      Gb: 3.5,
      G: 4,
      Ab: 4.7,
      A: 5,
      Bb: 5.85,
      B: 6,
    },
  };

  onPlayNoteInput = () => {
    this.setState({
      ...this.state,
      touched: true,
    });

    this.props.onPlayNoteInput(
      this.props.midiNumber - 21,
      this.props.midiNumber,
    );
  };

  onStopNoteInput = () => {
    this.setState({
      ...this.state,
      touched: false,
    });

    this.props.onStopNoteInput(
      this.props.midiNumber -21,
      this.props.midiNumber,
    );
  };

  // Key position is represented by the number of natural key widths from the left
  getAbsoluteKeyPosition(midiNumber) {
    const OCTAVE_WIDTH = 7;
    const {octave, pitchName} = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = this.props.pitchPositions[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  }

  getRelativeKeyPosition(midiNumber) {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    );
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      useTouchEvents,
      accidental,
      children,
    } = this.props;

    const {touched} = this.state;

    return (
      <View
        style={[
          styles.ReactPiano__Key,
          accidental
            ? styles.ReactPiano__Key__accidental
            : styles.ReactPiano__Key__natural,
          {
            left: ratioToPercentage(
              this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth,
            ),
            width: ratioToPercentage(
              accidental
                ? accidentalWidthRatio * naturalKeyWidth
                : naturalKeyWidth,
            ),
          },
          touched && styles.ReactPiano__Key__active,
        ]}
        onTouchStart={useTouchEvents ? this.onPlayNoteInput : null}
        onTouchCancel={useTouchEvents ? this.onStopNoteInput : null}
        onTouchEnd={useTouchEvents ? this.onStopNoteInput : null}>
        <View style={styles.ReactPiano__NoteLabelContainer}>
          <Text
            style={{
              position: 'absolute',
              bottom: 0,
              left: -20,
              zIndex: 100,
              elevation: 100,
              fontWeight: '500',
              color: accidental ? '#fff' : 'black',
            }}>
            {MidiNumbers.midiToNoteName(midiNumber)}
          </Text>
        </View>
      </View>
    );
  }
}

function ratioToPercentage(ratio) {
  return `${ratio * 100}%`;
}

const styles = StyleSheet.create({
  ReactPiano__Key: {
    position: 'absolute',
    height: 140,
    // width: 50,
  },
  ReactPiano__Key__natural: {
    backgroundColor: '#f6f5f3',
    borderColor: '#888',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    // width: 50,
  },
  ReactPiano__Key__accidental: {
    height: 100,
    backgroundColor: '#555',
    borderColor: 'transparent',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 1,
    // width: 25,
  },
  ReactPiano__Key__active: {
    backgroundColor: '#3ac8da',
  },
  ReactPiano__NoteLabelContainer: {
    flex: 1,
    /* Align children .ReactPiano__NoteLabel to the bottom of the key */
    alignSelf: 'flex-end',
    position: 'relative',
  },
});

export default Key;
