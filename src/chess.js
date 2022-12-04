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
    position;
    start;
    check;
    constructor(name, position) {
        super(name);
        this.position = position;
        this.start = true;
        this.check = 0;
    }
    step(i, j, boardWithChess) {
        let map = new Map();  
        this.access(i + 1, j + 1, map, boardWithChess);
        this.access(i - 1, j - 1, map, boardWithChess);
        
        this.access(i - 1, j - 1, map, boardWithChess);
        this.access(i + 1, j + 1, map, boardWithChess);

        this.access(i + 1, j - 1, map, boardWithChess);
        this.access(i - 1, j + 1, map, boardWithChess);
        
        this.access(i - 1, j + 1, map, boardWithChess);
        this.access(i + 1, j - 1, map, boardWithChess);


        this.access(i + 1, j, map, boardWithChess);
        this.access(i - 1, j, map, boardWithChess);
        
        this.access(i - 1, j, map, boardWithChess);
        this.access(i + 1, j, map, boardWithChess);

        this.access(i, j - 1, map, boardWithChess);
        this.access(i, j + 1, map, boardWithChess);
        
        this.access(i, j + 1, map, boardWithChess);
        this.access(i, j - 1, map, boardWithChess);

        return map;
    }

    access(i, j, map, boardWithChess) {
        if (checkAccess(i, j)) {
            if (boardWithChess[i][j] === null) {
                map.set(convertKey(i, j), 'g');
            } else if (boardWithChess[i][j].name.length !== this.name.length) {
                map.set(convertKey(i, j), 'a');
            }
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
        let block = [false, false, false, false, false, false, false, false];
        let map = new Map();
        let step_i = 1
        let step_j = 1
        while (step_i < 8 || step_j < 8) {
            if (block[0] === false) {
                let i_ = i + step_i
                let j_ = j
                block[0] = this.access(i_, j_, map, boardWithChess, block[0])
            }
            if (block[1] === false) {
                let i_ = i - step_i
                let j_ = j
                block[1] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[2] === false) {
                let i_ = i
                let j_ = j - step_j
                block[2] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[3] === false) {
                let i_ = i
                let j_ = j + step_j
                block[3] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[4] === false) {
                let i_ = i + step_i
                let j_ = j + step_j
                block[4] = this.access(i_, j_, map, boardWithChess, block[0])
            }
            if (block[5] === false) {
                let i_ = i - step_i
                let j_ = j - step_j
                block[5] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[6] === false) {
                let i_ = i + step_i
                let j_ = j - step_j
                block[6] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[7] === false) {
                let i_ = i - step_i
                let j_ = j + step_j
                block[7] = this.access(i_, j_, map, boardWithChess, block[1])
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

export class Knight extends Chess {
    step(i, j, boardWithChess) {
        let map = new Map();  
        
        this.access(i + 2, j + 1, map, boardWithChess);
        this.access(i - 2, j - 1, map, boardWithChess);
        
        this.access(i - 2, j + 1, map, boardWithChess);
        this.access(i + 2, j - 1, map, boardWithChess);

        this.access(i + 1, j + 2, map, boardWithChess);
        this.access(i - 1, j - 2, map, boardWithChess);
        
        this.access(i - 1, j + 2, map, boardWithChess);
        this.access(i + 1, j - 2, map, boardWithChess);

        return map;
    }

    access(i, j, map, boardWithChess) {
        if (checkAccess(i, j)) {
            if (boardWithChess[i][j] === null) {
                map.set(convertKey(i, j), 'g');
            } else if (boardWithChess[i][j].name.length !== this.name.length) {
                map.set(convertKey(i, j), 'a');
            }
        } 
    }
}

export class Rook extends Chess {
    position;
    start;
    constructor(name, position) {
        super(name);
        this.position = position;
        this.start = true;
    }

    step(i, j, boardWithChess) {
        let block = [false, false, false, false];
        let map = new Map();
        let step_i = 1
        let step_j = 1

        if (this.start === true) {
            if (this.position === 0 && boardWithChess[0][4] instanceof King && boardWithChess[0][4].start === true) {
                if (j === 7) {
                    if (boardWithChess[0][5] === null && boardWithChess[0][6] === null) {
                        map.set(convertKey(0, 4), 's')
                    }
                }
                if (j === 0) {
                    if (boardWithChess[0][1] === null && boardWithChess[0][2] === null && boardWithChess[0][3] === null) {
                        map.set(convertKey(0, 4), 's')
                    }
                }
            }

            if (this.position === 1 && boardWithChess[7][4] instanceof King && boardWithChess[7][4].start === true) {
                if (j === 7) {
                    if (boardWithChess[7][5] === null && boardWithChess[7][6] === null) {
                        map.set(convertKey(7, 4), 's')
                    }
                }
                if (j === 0) {
                    if (boardWithChess[7][1] === null && boardWithChess[7][2] === null && boardWithChess[7][3] === null) {
                        map.set(convertKey(7, 4), 's')
                    }
                }
            }
        }

        while (step_i < 8 || step_j < 8) {
            if (block[0] === false) {
                let i_ = i + step_i
                let j_ = j
                block[0] = this.access(i_, j_, map, boardWithChess, block[0])
            }
            if (block[1] === false) {
                let i_ = i - step_i
                let j_ = j
                block[1] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[2] === false) {
                let i_ = i
                let j_ = j - step_j
                block[2] = this.access(i_, j_, map, boardWithChess, block[1])
            }
            if (block[3] === false) {
                let i_ = i
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