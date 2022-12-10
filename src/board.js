import { Rook, Knight, Bishop, King, Queen, Pawn } from "./chess.js";

export function initializer() {
  let choise = Math.floor(Math.random() * 2) ;

  if (choise === 0) {
    return [[new Rook("r2", 0), new Knight("h2"), new Bishop("b2"), new Queen("q2"), new King("k2", 0), new Bishop("b2"), new Knight("h2"), new Rook("r2", 0)],
            [new Pawn("p2", 0),new Pawn("p2", 0),new Pawn("p2", 0),new Pawn("p2", 0), new Pawn("p2", 0), new Pawn("p2", 0), new Pawn("p2", 0), new Pawn("p2", 0)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn("p", 1), new Pawn("p", 1), new Pawn("p", 1), new Pawn("p", 1), new Pawn("p", 1), new Pawn("p", 1), new Pawn("p", 1), new Pawn("p", 1)],
            [new Rook("r", 1), new Knight("h"), new Bishop("b"), new Queen("q"), new King("k", 1), new Bishop("b"), new Knight("h"), new Rook("r", 1)]];
  } else {
    return [[new Rook("r", 0), new Knight("h"), new Bishop("b"), new Queen("q"), new King("k", 0), new Bishop("b"), new Knight("h"), new Rook("r", 0)],
            [new Pawn("p", 0),new Pawn("p", 0),new Pawn("p", 0), new Pawn("p", 0), new Pawn("p", 0), new Pawn("p", 0), new Pawn("p", 0),new Pawn("p", 0)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn("p2", 1), new Pawn("p2", 1), new Pawn("p2", 1), new Pawn("p2", 1), new Pawn("p2", 1), new Pawn("p2", 1), new Pawn("p2", 1), new Pawn("p2", 1)],
            [new Rook("r2", 1), new Knight("h2"), new Bishop("b2"), new Queen("q2"), new King("k2", 1), new Bishop("b2"), new Knight("h2"), new Rook("r2", 1)]];
  }
}

export var boardWithChess = initializer()

export var board = [["w","b","w","b","w","b","w","b"],
              ["b","w","b","w","b","w","b","w"],
              ["w","b","w","b","w","b","w","b"],
              ["b","w","b","w","b","w","b","w"],
              ["w","b","w","b","w","b","w","b"],
              ["b","w","b","w","b","w","b","w"],
              ["w","b","w","b","w","b","w","b"],
              ["b","w","b","w","b","w","b","w"]];
              
function getChessImg(symbolName) {
  if (symbolName !== null) {
    switch (symbolName.name) {
      case "r":
        return `img/white/rook.png`
      case "q":
        return `img/white/queen.png`
      case "k":
        return `img/white/king.png`
      case "p":
        return `img/white/pawn.png`
      case "h":
        return `img/white/knight.png`
      case "b":
        return `img/white/bishop.png`
      case "r2":
        return `img/black/rook.png`
      case "q2":
        return `img/black/queen.png`
      case "k2":
        return `img/black/king.png`
      case "p2":
        return `img/black/pawn.png`
      case "h2":
        return `img/black/knight.png`
      case "b2":
        return `img/black/bishop.png`
    }
  }
  return null
}
 

export function drawImage(chessOnStart) {
  let res = []
  for (let i = 0; i < 8; ++i) {
    let res2 = []
    for (let j = 0; j < 8; ++j) {
        res2.push(getChessImg(chessOnStart[i][j]))
    }
    res.push(res2)
  }
  return res
}

export function checkToSwap(role, choose) {
  if (choose == "white") {
      switch(role) {
          case "h":
              return new Knight("h")
          case "q":
              return new Queen("q")
      }
  } else {
      switch(role) {
          case "h":
              return new Knight("h2")
          case "q":
              return new Queen("q2")
      }
  }
}

export function swapPawn(i, j, chessOnStart) {
  if ((i == 7 && chessOnStart[i][j].position == 0) || (i == 0 && chessOnStart[i][j].position == 1)) {
      if (chessOnStart[i][j].name.length == 2) {
          return "black"
      } else {
          return "white"
      }
  }
  return null
}