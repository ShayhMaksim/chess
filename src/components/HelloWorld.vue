<template>
<div id="Board">
  <div class="grid-container">
      <template v-for='(row, i) in boardOnStart' :key="i + 1">
          <template v-for='(pixel, j) in row' :key="j + 1">
                <div :class="selectBlockColor(i, j, pixel)" @click="change(i, j)">
                    <template v-if="chessImages[i][j] !== null">
                        <img :src="chessImages[i][j]">
                    </template>
                </div>
          </template>
      </template>
  </div>
</div>
</template>

<script>
import {boardWithChess, board, drawImage} from "../board.js"
import {convertKey, King} from "../chess.js"
export default {
  name: 'HelloWorld',
  data() {
    return {
      chessOnStart: boardWithChess,  
      boardOnStart: board,
      chessImages: drawImage(boardWithChess),
      clicker: false,
      container: null,
      futureStep: null,
      kings: [boardWithChess[0][4], boardWithChess[7][4]]
    }
  }, 
  methods:{
    change: function (i, j) {
        if (this.clicker) {
            if ((i !== this.container[0] || j !== this.container[1]) && this.futureStep.has(convertKey(i, j))) {
                
                if (this.chessOnStart[this.container[0]][this.container[1]].start) {
                    this.chessOnStart[this.container[0]][this.container[1]].start = false;
                }

                if (this.futureStep.get(convertKey(i, j)) === 's') {
                    if (this.container[1] === 7) {
                        this.chessOnStart[i][j + 1] = this.chessOnStart[this.container[0]][this.container[1]];
                        this.chessOnStart[i][j + 2] = this.chessOnStart[i][j];
                        this.chessOnStart[i][j] = null;
                        this.chessOnStart[this.container[0]][this.container[1]] = null;
                    }

                    if (this.container[1] === 0) {
                        this.chessOnStart[i][j - 1] = this.chessOnStart[this.container[0]][this.container[1]];
                        this.chessOnStart[i][j - 2] = this.chessOnStart[i][j];
                        this.chessOnStart[i][j] = null;
                        this.chessOnStart[this.container[0]][this.container[1]] = null;
                    }
                } else {
                    this.chessOnStart[i][j] = this.chessOnStart[this.container[0]][this.container[1]];
                    this.chessOnStart[this.container[0]][this.container[1]] = null;
                }
            }
            this.clicker = false;
            this.container = null;
            this.chessImages = drawImage(this.chessOnStart);
            this.futureStep = null;  
        } else {
            if (this.chessOnStart[i][j] !== null) {
                this.clicker = true;
                this.container = [i, j];
                this.futureStep = this.chessOnStart[i][j].step(i, j, this.chessOnStart)
            }
        }
        this.checkAndMate() 
    },
    selectBlockColor: function(i, j, defualt) {
        if (this.chessOnStart[i][j] instanceof King) {
            if (this.chessOnStart[i][j].check === 1) {
                return "grid-item check"
            } 
            if (this.chessOnStart[i][j].check === 2) {
                return "grid-item check_and_mate"
            }
        }

        let res = undefined;
        if (this.futureStep) {
            res = this.futureStep.get(convertKey(i, j))
        }

        if (this.container !== null && this.container[0] === i && this.container[1] === j) {
            return "grid-item step"
        } else if (res !== undefined) {
            if (res === "a") {
                return "grid-item attack"
            } else if (res === "g") {
                return "grid-item next"
            } else if (res === "s") {
                return "grid-item swap"
            }
        } else {
            if (defualt === 'w') {
                return "grid-item color1"
            } else if (defualt === 'b') {
                return "grid-item color2"
            } 
        }
    },
    checkAndMate: function() {
        this.kings.forEach((value) => {
            value.check = 0;
        })

        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                if (this.chessOnStart[i][j] !== null) {
                    const futureStep = this.chessOnStart[i][j].step(i, j, this.chessOnStart)
                    if (futureStep) {
                        futureStep.forEach((key, value) => {
                            let res = value.split("_");
                            if (this.chessOnStart[Number(res[0])][Number(res[1])] instanceof King) {
                                if (key === "a") { 
                                    this.chessOnStart[Number(res[0])][Number(res[1])].check += 1;
                                }
                            }
                        })
                    }
                }
            }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
    border: solid 2px #000;
    display: grid;
    grid-template-columns: repeat(8, 6em);
    grid-template-rows: repeat(8, 6em);
    grid-auto-rows: minmax(100px, auto);
    grid-auto-columns: minmax(100px, auto);
    justify-content: center;
}

.grid-item {
    box-sizing: border-box;
    text-align:center;
    font-size: 1.1em;
    padding: 1.1em;
}

.grid-container img {
    width: 50px; /* you can use % */
    height: 50px;
}

.color1 {background-color: rgb(70, 59, 59); color: white;}
.color2 {background-color: #FFF; color: black;}

.step {
    background-color: aqua;
    border-width: 15px;
    border-radius: 15px;
    border: 2px solid black;
}

.attack {
    background-color: red;
    border-color: black;
    border-width: 15px;
    border-radius: 15px;
    border: 2px solid black;
}

.next {
    background-color: palegreen;
    border-color: black; 	
    border-width: 15px;
    border-radius: 15px;
    border: 2px solid black;
}

.swap {
    background-color: yellowgreen;
    border-color: black; 	
    border-width: 15px;
    border-radius: 15px;
    border: 2px solid black;
}

.check {
    background-color: orange;
    border-color: black; 	
    border-width: 15px;
    border-radius: 15px;
    border: 2px solid black;
}

.check_and_mate {
    background-color: brown;
    border-color: black; 	
    border-width: 15px;
    border-radius: 15px;
    border: 2px solid black;
}

</style>
