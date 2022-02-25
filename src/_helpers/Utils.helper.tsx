const Adjacency = (dist: number) => {
  let ret = [];
  for (let x = -dist; x <= dist; x++) {
    for (let y = -dist; y <= dist; y++) {
      if (x === 0 && y === 0) continue; // Don't include the 0,0 point
      ret.push({x, y});
    }
  }
  return ret;
};
const nCoordinates = (x0: number, y0: number) => {
  let adjacencyOffsets = Adjacency(1);
  return adjacencyOffsets.map(({x, y}: any) => ({x: x + x0, y: y + y0}));
};

const listToMatrix = async (
  list: any,
  elementsPerSubArray = 4,
): Promise<any> => {
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
  return matrix;
};
export const Utils = {
  nCoordinates,
  listToMatrix,
};
