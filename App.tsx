/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Button,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';
import {
  BoardInterface,
  BoardObjectInterface,
  BoardObjectInterfaceInterface,
  DictionaryInterface,
  PointsInterface,
} from './src/_helpers';
import {Utils} from './src/_helpers';
const App = () => {
  const [listBoard] = useState<BoardInterface>(
    Math.floor(Math.random() * (3 - 1) + 1) === 1
      ? (require('./files/test-board-1.json') as BoardInterface)
      : (require('./files/test-board-2.json') as BoardInterface),
  );
  const [dictionary] = useState<DictionaryInterface>(
    require('./files/dictionary.json') as DictionaryInterface,
  );
  const [board] = useState(listBoard.board);
  const [matrixBoard, setMatrixBoard] = useState([]);
  const [word, setWord] = useState<any[]>([]);
  const [wordIsCorrect, setWordIsCorrect] = useState(false);

  useEffect(() => {
    const boardReduce = board.reduce(
      (acc: BoardObjectInterface[], current: string, index: number) => {
        acc[index] = {board: current, selected: false, id: index};
        return acc;
      },
      [],
    );
    setWord(res => []);
    Utils.listToMatrix(boardReduce, 4).then((matrix: any) =>
      setMatrixBoard(matrix),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let element = '';
    for (let index = 0; index < word.length; index++) {
      element = element + '' + word[index].letter;
    }
    const findWord = dictionary.words.find(
      wordDict => wordDict === element.toLowerCase(),
    );
    findWord !== undefined ? setWordIsCorrect(true) : setWordIsCorrect(false);
  }, [dictionary.words, word]);
  const handleCheck = (indexX: number, indexY: number) => {
    setMatrixBoard((prevState: any) =>
      prevState.map((row: BoardObjectInterface[], iX: number) =>
        row.map((col: BoardObjectInterface, iY: number) =>
          isAdjacency(indexX, indexY)
            ? iX === indexX && iY === indexY
              ? pushLetterInWord({...col, selected: true})
              : col
            : col,
        ),
      ),
    );
    // dictionary.words.find(words=>)
  };
  const isAdjacency = (indexX: number, indexY: number) => {
    let result = true;
    const matrixAux = matrixBoard;
    matrixAux.map((row: any, iX: any) =>
      row.map((col: any, iY: any) =>
        col.selected
          ? Utils.nCoordinates(iX, iY).find(
              (coords: PointsInterface) =>
                coords.x === indexX && coords.y === indexY,
            )
            ? (result = true)
            : (result = false)
          : '',
      ),
    );
    return result;
  };
  const handleClearWord = () => {
    setMatrixBoard((prevState: any) =>
      prevState.map((row: any) =>
        row.map((col: any) =>
          col.selected ? {...col, selected: false} : {...col, selected: false},
        ),
      ),
    );
    setWord(res => []);
  };
  const pushLetterInWord = (objectBoard: BoardObjectInterface) => {
    let idCount = 1;
    setWord(result => [
      ...result,
      {
        id: idCount,
        letter: objectBoard.board,
      },
    ]);
    idCount++;

    return objectBoard;
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.desf}>
          <Text style={styles.desfText}>Fullstack Interview - Victor Galvez</Text>
        </View>
        <View style={styles.title}>
          <Button title="Clear Word (X)" onPress={() => handleClearWord()} />
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            {matrixBoard.map(
              (sub: BoardObjectInterfaceInterface[], indexX: number) =>
                sub.map(
                  (_board: BoardObjectInterfaceInterface, indexY: number) => (
                    <TouchableOpacity
                      key={_board.id}
                      style={
                        _board.selected
                          ? styles.selectedButton
                          : styles.noSelectedButton
                      }
                      onPress={() => handleCheck(indexX, indexY)}>
                      <Text key={_board.id} style={styles.boardText}>
                        {_board.board}
                      </Text>
                    </TouchableOpacity>
                  ),
                ),
            )}
          </View>
          <View style={styles.containerInput}>
            {wordIsCorrect ? (
              <Text style={styles.validText}>
                {word.map((_word: any) => (
                  <Text key={_word.id}>{_word.letter}</Text>
                ))}
                {word.length ? <Text>{'                   Valid'}</Text> : ''}
              </Text>
            ) : (
              <Text style={styles.invalidText}>
                {word.map((_word: any) => (
                  <Text key={_word.id}>{_word.letter}</Text>
                ))}
                {word.length ? <Text>{'                   Invalid'}</Text> : ''}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  desf: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    padding: 20,
  },
  desfText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
    padding: 20,
  },
  invalidText: {
    fontWeight: 'bold',
    color: '#A83133',
  },
  validText: {
    fontWeight: 'bold',
    color: '#A1D65B',
  },
  innerText: {
    color: 'red',
  },
  containerInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 50,
    width: '100%',
    borderWidth: 4,
    borderColor: '#A8A8A8',
  },
  input: {
    height: 40,
    width: 100,
    textAlign: 'center',
    letterSpacing: 9,
    fontSize: 20,
    color: '#A1D65B',
    fontWeight: 'bold',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    marginTop: 8,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noSelectedButton: {
    width: '25%',
    backgroundColor: '#F0B364',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D0595D',
  },
  selectedButton: {
    width: '25%',
    backgroundColor: '#7AAE50',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D0595D',
  },
  boardText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default App;
