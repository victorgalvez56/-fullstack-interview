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
  StyleSheet,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';
import {
  BoardInterface,
  BoardObjectInterface,
  PointsInterface,
} from './src/_helpers';

const App = () => {
  const [listBoard] = useState<BoardInterface>(
    Math.floor(Math.random() * (3 - 1) + 1) === 1
      ? (require('./files/test-board-1.json') as BoardInterface)
      : (require('./files/test-board-2.json') as BoardInterface),
  );
  const [board] = useState(listBoard.board);
  const [matrixBoard, setMatrixBoard] = useState([]);

  useEffect(() => {
    const boardReduce = board.reduce(
      (acc: BoardObjectInterface[], current: string, index: number) => {
        acc[index] = {board: current, selected: false};
        return acc;
      },
      [],
    );
    listToMatrix(boardReduce, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheck = (indexX: number, indexY: number) => {
    setMatrixBoard((prevState: any) =>
      prevState.map((row: any, iX: any) =>
        row.map((col: any, iY: any) =>
          iX === indexX && iY === indexY ? {...col, selected: true} : col,
        ),
      ),
    );
  };

  const isAdjacency = (indexX: number, indexY: number) => {
    nCoordinates(indexX, indexY, adjacencyOffsets).then(
      (result: PointsInterface[]) => {
        setMatrixBoard((prevState: any) =>
          prevState.map((row: any, iX: any) =>
            row.map(
              (col: any, iY: any) =>
                col.selected
                  ? result.find(
                      resultAd => resultAd.x === iX && resultAd.y === iY,
                    )
                  : console.log('raa'),
              // col.selected ? {...col, selected: true} : col,
            ),
          ),
        );
      },
    );
  };
  const listToMatrix = (list: any, elementsPerSubArray = 4) => {
    var matrix: any = [],
      i,
      k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    setMatrixBoard(matrix);
    return matrix;
  };

  let manhattanAdjacencyOffsets = (dist: number) => {
    let ret = [];
    for (let x = -dist; x <= dist; x++) {
      for (let y = -dist; y <= dist; y++) {
        if (x === 0 && y === 0) continue; // Don't include the 0,0 point
        ret.push({x, y});
      }
    }
    return ret;
  };

  let nCoordinates = (x0: number, y0: number, adjacencyOffsets: any) => {
    return adjacencyOffsets.map(({x, y}: any) => ({x: x + x0, y: y + y0}));
  };
  let adjacencyOffsets = manhattanAdjacencyOffsets(1);
  let neighbours = nCoordinates(1, 1, adjacencyOffsets);
  console.warn(neighbours);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />

        <View style={{padding: 5, flex: 1}}>
          <View style={styles.row}>
            {matrixBoard.map((sub: any, indexX: any) =>
              sub.map((_board: any, indexY: any) => (
                <TouchableOpacity
                  style={
                    _board.selected
                      ? styles.selectedButton
                      : styles.noSelectedButton
                  }
                  onPress={() => handleCheck(indexX, indexY)}>
                  <Text style={styles.boardText}>{_board.board}</Text>
                </TouchableOpacity>
              )),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D0595D',
  },
  boardText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default App;
