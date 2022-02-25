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

export const Utils = {
  nCoordinates,
};
