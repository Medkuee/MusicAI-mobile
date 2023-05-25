import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Text,
} from 'react-native';

import range from 'just-range';

import Key from './Key';

import MidiNumbers from './MidiNumbers';

class Piano extends Component {
  state = {
    noteRange: {
      first: MidiNumbers.fromNote('c4'),
      last: MidiNumbers.fromNote('e5'),
    },
  };

  static propTypes = {
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {noteRange} = this.props;

    this.setState({
      ...this.state,
      noteRange: {
        first: MidiNumbers.fromNote(noteRange.first),
        last: MidiNumbers.fromNote(noteRange.last),
      },
    });
  }

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter(number => {
      const {isAccidental} = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  getNaturalKeys() {
    return this.getMidiNumbers().filter(number => {
      const {isAccidental} = MidiNumbers.getAttributes(number);
      return !isAccidental;
    });
  }

  getAccidentalKeys() {
    return this.getMidiNumbers().filter(number => {
      const {isAccidental} = MidiNumbers.getAttributes(number);
      return isAccidental;
    });
  }

  getMidiNumbers() {
    return range(this.state.noteRange.first, this.state.noteRange.last + 1);
  }

  getNaturalKeyWidth() {
    return 0.1;
  }

  render() {
    const naturalKeyWidth = this.getNaturalKeyWidth();
    return (
      <>
        {/* <View style={styles.topContainer}></View> */}
        <View style={styles.botContainer}>
          {this.getMidiNumbers().map(midiNumber => {
            const {isAccidental} = MidiNumbers.getAttributes(midiNumber);
            return (
              <Key
                naturalKeyWidth={naturalKeyWidth}
                midiNumber={midiNumber}
                noteRange={this.state.noteRange}
                accidental={isAccidental}
                onPlayNoteInput={this.props.onPlayNoteInput}
                onStopNoteInput={this.props.onStopNoteInput}
                useTouchEvents={true}
                key={`midiNumbers${midiNumber}`}/>
                
            );
          })}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  botContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'red',
    borderTopColor: 'red',
    borderTopWidth: 1,
  },
  topContainer: {
    height: 30,
    backgroundColor: 'black',
    width: '100%',
    elevation: 20,
    zIndex: 20,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: 'green',
  //   width: '100%',
  //   // height: 200,
  // },
});

export default Piano;
