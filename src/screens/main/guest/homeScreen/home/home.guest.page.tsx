/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  RefreshControl,
} from 'react-native';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {images} from '../../../../../theme/variables';
import Piano from '../../../../../components/piano/Piano';
import Sound from 'react-native-sound';
import MidiNumbers from '../../../../../components/piano/MidiNumbers';
import axios from 'axios';
import {BACKEND_PYTHON, BACKEND_URL} from '@env';
import showToast from '../../../../../utils/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const list = [
  {
    firstLetter: 'L',
    name: 'Liszt',
    prof: 'composer',
    date: '1811',
    image: images.liszt,
  },
  {
    firstLetter: 'B',
    name: 'Beethoven',
    prof: 'composer',
    date: '1770',
    image: images.beethoven,
  },
  {
    firstLetter: 'C',
    name: 'Chopin',
    prof: 'composer',
    date: '1810',
    image: images.chopin,
  },
  {
    firstLetter: 'M',
    name: 'Mozart',
    prof: 'composer',
    date: '1756',
    image: images.mozart,
  },

  {
    firstLetter: 'R',
    name: 'Rachmaninoff',
    prof: 'composer',
    date: '1873',
    image: images.rach,
  },
];

export const HomeGuestPage = ({navigation}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(4);
  const [startTime, setStartTime] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleButtonClick = (note: any) => {
    if (isPlaying) {
      if (startTime) {
        const endTime = new Date().getTime();
        const clickDuration = endTime - startTime;
        if (notesList.length >= 9) {
          console.log('FINISHED');
          setIsPlaying(false);
        }
        setNotesList([
          ...notesList,
          {
            duration: clickDuration / 1000,
            note,
            noteValue: MidiNumbers.midiToNoteName(note + 21),
            startTime: startTime - duration,
          },
        ]);

        setStartTime(null);
      } else {
        const _startTime = new Date().getTime();
        setStartTime(_startTime);
        if (notesList.length === 0) {
          setDuration(_startTime);
        }
      }
    }
  };
  console.log('notesList', notesList);
  const playSound = (note: any) => {
    const sound = new Sound(`mp3/${note}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }
      sound.play(success => {
        if (!success) {
          console.log('Playback failed');
        }
        sound.release();
      });
    });
  };
  useEffect(() => {
    if (notesList.length >= 10) {
      try {
        console.log('REQ');
        setLoading(true);
        playFunc();
        musicCreateFunction();
      } catch (error) {
        console.log('USEFFECT ERROR', error);
      }
    }
  }, [notesList]);

  const musicCreateFunction = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const musicCreate = await axios.post(
        `${BACKEND_URL}/createMusic`,
        {data: notesList},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('musicCreate', musicCreate.data);
      axios
        .post(`${BACKEND_PYTHON}/create-music`, {
          notes: notesList,
          name: `${musicCreate.data.id || 0}`,
        })
        .then(async response => {
          console.log(response.data);
          setNotesList([]);
          setLoading(false);
          showToast('Success', '#25AE60');
          navigation.navigate('PreviewPage', {name: `${musicCreate.data.id}`});
        })
        .catch(error => {
          showToast('Error with creating music', 'red');
          setNotesList([]);
          setLoading(false);
          console.log('ERROR LOL', error);
        });
    } catch (error) {
      console.log('MUSIC CREATE ERROR', error);
      setNotesList([]);
      setLoading(false);
    }
  };

  const playFunc = () => {
    try {
      const _timer = setTimeout(() => {
        notesList.map((note: any) => {
          const timer = setTimeout(() => {
            if (loading) {
              playSound(note.note);
            }
          }, note.startTime);

          return () => {
            clearTimeout(timer);
          };
        });
      }, 2000);

      return () => {
        clearTimeout(_timer);
      };
    } catch (error) {
      console.log('PLAYING SOUND ERROR', error);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      bounces={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            padding: 30,
            paddingBottom: 15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#132A6B',
                fontWeight: '600',
                fontSize: 25,
                lineHeight: 40,
                marginBottom: 10,
              }}>
              My Home
            </Text>
            <TouchableOpacity>
              <Icon name="notifications-none" size={30} color={'#6e6e6e'} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflow: 'scroll',
                flexWrap: 'nowrap',
                columnGap: 15,
              }}>
              {list.map((e: any) => (
                <View
                  key={e.name}
                  style={{
                    width: 170,
                    height: 200,
                    position: 'relative',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                    source={e.image}
                  />
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 7,
                      backgroundColor: 'rgba(194, 198, 211, 0.5)',
                      borderRadius: 7,
                      position: 'absolute',
                      right: 15,
                      top: 15,
                    }}>
                    <Text style={{fontSize: 16, color: '#fff'}}>{e.date}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      position: 'absolute',
                      left: 15,
                      bottom: 50,
                      fontWeight: '600',
                    }}>
                    {e.name}
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 15,
                      left: 15,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#5A67F3',
                        borderRadius: 50,
                        marginRight: 5,
                        width: 30,
                        height: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {e.firstLetter}
                      </Text>
                    </View>
                    <Text style={{fontSize: 14, color: '#fff'}}>{e.prof}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 30,
              marginBottom: 15,
            }}>
            <Text
              style={{
                color: '#132A6B',
                fontWeight: '500',
                fontSize: 20,
              }}>
              Piano
            </Text>
            <TouchableOpacity
              onPress={() => {
                setNotesList([]);
                setIsPlaying(!isPlaying);
              }}
              style={{
                padding: 5,
                width: 60,
                borderRadius: 5,
                borderWidth: 2,
                backgroundColor: isPlaying ? 'red' : '#fff',
                borderColor: !isPlaying ? 'black' : '#fff',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: !isPlaying ? 'black' : '#fff',
                }}>
                {isPlaying ? 'Reset' : 'Play'}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setCount(count - 1)}
                disabled={count <= 1}>
                <Icon
                  name="keyboard-arrow-left"
                  size={30}
                  color={count <= 1 ? '#6e6e6e' : '#132A6B'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCount(count + 1)}
                disabled={count > 5}>
                <Icon
                  name="keyboard-arrow-right"
                  size={30}
                  color={count > 5 ? '#6e6e6e' : '#132A6B'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: 10}}>
          {count === 1 && (
            <Piano
              noteRange={{first: 'a0', last: 'd2'}}
              onPlayNoteInput={(midiNumber: any) => {
                playSound(midiNumber);
                handleButtonClick(midiNumber);
              }}
              onStopNoteInput={(midiNumber: any) => {
                handleButtonClick(midiNumber);
              }}
            />
          )}
          {count === 2 && (
            <Piano
              noteRange={{first: 'd1', last: 'g2'}}
              onPlayNoteInput={(midiNumber: any) => {
                playSound(midiNumber);
                handleButtonClick(midiNumber);
              }}
              onStopNoteInput={(midiNumber: any) => {
                handleButtonClick(midiNumber);
              }}
            />
          )}
          {count === 3 && (
            <Piano
              noteRange={{first: 'g2', last: 'b3'}}
              onPlayNoteInput={(midiNumber: any) => {
                playSound(midiNumber);
                handleButtonClick(midiNumber);
              }}
              onStopNoteInput={(midiNumber: any) => {
                handleButtonClick(midiNumber);
              }}
            />
          )}
          {count === 4 && (
            <Piano
              noteRange={{first: 'c4', last: 'e5'}}
              onPlayNoteInput={(midiNumber: any) => {
                playSound(midiNumber);
                handleButtonClick(midiNumber);
              }}
              onStopNoteInput={(midiNumber: any) => {
                handleButtonClick(midiNumber);
              }}
            />
          )}
          {count === 5 && (
            <Piano
              noteRange={{first: 'f5', last: 'a6'}}
              onPlayNoteInput={(midiNumber: any) => {
                playSound(midiNumber);
                handleButtonClick(midiNumber);
              }}
              onStopNoteInput={(midiNumber: any) => {
                handleButtonClick(midiNumber);
              }}
            />
          )}
          {count === 6 && (
            <Piano
              noteRange={{first: 'a6', last: 'c8'}}
              onPlayNoteInput={(midiNumber: any) => {
                playSound(midiNumber);
                handleButtonClick(midiNumber);
              }}
              onStopNoteInput={(midiNumber: any) => {
                handleButtonClick(midiNumber);
              }}
            />
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={loading}
          onRequestClose={() => {
            setLoading(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                Creating Music...
              </Text>
              <View style={{width: 200, height: 150}}>
                <Image
                  source={images.playingPiano}
                  style={{width: '100%', height: '100%', borderRadius: 15}}
                />
              </View>
            </View>
            {/* <Button
              onPress={() => {
                setNotesList([]);
                setLoading(false);
              }}>
              t
            </Button> */}
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};
