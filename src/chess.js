export class Chess {
    name;
    constructor(name) {
        this.name = name;
    }
    name() {
        return this.name;
    }
}

export function convertKey(i, j) {
    return i.toString() + "_"+ j.toString()
}

function checkAccess(i, j) {
    return i < 8 && j < 8 && i > -1 && j > -1
}

export class Pawn extends Chess {
    position;
    start;
    constructor(name, position) {
        super(name);
        this.position = position;
        this.start = true;
    }

    step(i, j, boardWithChess) { // i, j - current pos
      let map = new Map();  
      if (this.position === 0) {
        if (boardWithChess[i + 1][j] === null) {
            map.set(convertKey(i + 1, j), 'g');
            if (boardWithChess[i + 2][j] === null && this.start === true)  {
                map.set(convertKey(i + 2, j), 'g');
            }
        }
        if (checkAccess(i + 1, j + 1) && boardWithChess[i + 1][j + 1] !== null && boardWithChess[i + 1][j + 1].name.length !== this.name.length) {
            map.set(convertKey(i + 1, j + 1), 'a');
        }
        if (checkAccess(i + 1, j - 1) && boardWithChess[i + 1][j - 1] !== null && boardWithChess[i + 1][j - 1].name.length !== this.name.length) {
            map.set(convertKey(i + 1, j - 1), 'a');
        }
      } else {
        if (boardWithChess[i - 1][j] === null) {
            map.set(convertKey(i - 1, j), 'g');
            if (boardWithChess[i - 2][j] === null && this.start === true)  {
                map.set(convertKey(i - 2, j), 'g');
            }
        }
        if (checkAccess(i - 1, j + 1) && boardWithChess[i - 1][j + 1] !== null && boardWithChess[i - 1][j + 1].name.length !== this.name.length) {
            map.set(convertKey(i - 1, j + 1), 'a');
        }
        if (checkAccess(i - 1, j - 1) && boardWithChess[i - 1][j - 1] !== null && boardWithChess[i - 1][j - 1].name.length !== this.name.length) {
            map.set(convertKey(i - 1, j - 1), 'a');
        }
      }
      return map;
    }
}

export class King extends Chess {
    step(i, j, boardWithChess) {
        let map = new Map();  
   
          if (boardWithChess[i + 1][j] === null) {
              map.set([i + 1, j], 'g');
          }
          if (boardWithChess[i + 2][j] === null) {
              map.set([i + 2, j], 'g');
          }
          if (boardWithChess[i + 1][j + 1] !== null) {
              map.set([i + 2, j], 'a');
          }
          if (boardWithChess[i + 1][j - 1] !== null) {
              map.set([i + 2, j], 'a');
          }
        
    }
}

export class Bishop extends Chess {
    step(i, j, boardWithChess) {
        let block = [false, false, false, false];
        let map = new Map();
        let step_i = 1
        let step_j = 1
        while (step_i < 8 || step_j < 8) {
            if (block[0] === false) {
                let i_ = i + step_i
                let j_ = j + step_j
                block[0] = this.access(i_, j_, map, boardWithChess, block[0])
            }
            if (block[1] === false) {
                let i_ = i - step_i
                let j_ = j - step_j
                block[1] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[2] === false) {
                let i_ = i + step_i
                let j_ = j - step_j
                block[2] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[3] === false) {
                let i_ = i - step_i
                let j_ = j + step_j
                block[3] = this.access(i_, j_, map, boardWithChess, block[1])
            }

            step_i++
            step_j++
        }
        return map
    }

    access(i_, j_, map, boardWithChess) {
        let block = false;
        if (checkAccess(i_, j_)) {
            if (boardWithChess[i_][j_] === null) {
                map.set(convertKey(i_, j_), 'g');
            } else if (boardWithChess[i_][j_].name.length !== this.name.length) {
                map.set(convertKey(i_, j_), 'a');
                block = true;
            } else {
                block = true;
            }
        }
        return block;
    }
}

export class Queen extends Chess {
    step(i, j, boardWithChess) {
        let map = new Map();  

          if (boardWithChess[i + 1][j] === null) {
              map.set([i + 1, j], 'g');
          }
          if (boardWithChess[i + 2][j] === null) {
              map.set([i + 2, j], 'g');
          }
          if (boardWithChess[i + 1][j + 1] !== null) {
              map.set([i + 2, j], 'a');
          }
          if (boardWithChess[i + 1][j - 1] !== null) {
              map.set([i + 2, j], 'a');
          }
        
    }
}

export class Knight extends Chess {
    step(i, j, boardWithChess) {
        let map = new Map();  

          if (boardWithChess[i + 1][j] === null) {
              map.set([i + 1, j], 'g');
          }
          if (boardWithChess[i + 2][j] === null) {
              map.set([i + 2, j], 'g');
          }
          if (boardWithChess[i + 1][j + 1] !== null) {
              map.set([i + 2, j], 'a');
          }
          if (boardWithChess[i + 1][j - 1] !== null) {
              map.set([i + 2, j], 'a');
          }
        
    }
}

export class Rook extends Chess {
    step(i, j, boardWithChess) {
        let map = new Map();  

          if (boardWithChess[i + 1][j] === null) {
              map.set([i + 1, j], 'g');
          }

          if (boardWithChess[i + 2][j] === null) {
              map.set([i + 2, j], 'g');
          }
          if (boardWithChess[i + 1][j + 1] !== null) {
              map.set([i + 2, j], 'a');
          }
          if (boardWithChess[i + 1][j - 1] !== null) {
              map.set([i + 2, j], 'a');
          }
        
    }
}