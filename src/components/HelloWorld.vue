<template>
<div id="Board">
  <div class="grid-container">
      <template v-for='(row, i) in boardOnStart' :key="i + 1">
          <template v-for='(pixel, j) in row' :key="j + 1">
              <template v-if="pixel == 'w'">
                  <div class="grid-item color1" @click="change(i, j)">
                      <template v-if="chessImages[i][j] !== null">
                          <img :src="chessImages[i][j]">
                      </template>
                  </div>
              </template>
              <template v-if="pixel == 'b'">
                  <div class="grid-item color2" @click="change(i, j)">
                      <template v-if="chessImages[i][j] !== null">
                          <img :src="chessImages[i][j]">
                      </template>
                  </div>
              </template>
          </template>
      </template>
  </div>
</div>
</template>

<script>
import {boardWithChess, board, drawImage} from "../board.js"
export default {
  name: 'HelloWorld',
  data() {
    return {
      chessOnStart: boardWithChess,  
      boardOnStart: board,
      chessImages: drawImage(boardWithChess),
      clicker: false,
      container: null
    }
  }, 
  methods:{
    change: function (i, j) {
        if (this.clicker) {
            if (i !== this.container[0] || j !== this.container[1]) {
                this.chessOnStart[i][j] = this.chessOnStart[this.container[0]][this.container[1]];
                this.chessOnStart[this.container[0]][this.container[1]] = null;
            }
            this.clicker = false;
            this.container = null;
            this.chessImages = drawImage(this.chessOnStart);
        } else {
            if (this.chessOnStart[i][j] !== null) {
                this.clicker = true;
                this.container = [i, j];
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
    padding: 1.5em;
}

.grid-container img {
    width: 50px; /* you can use % */
    height: 50px;
}

.color1 {background-color: rgb(70, 59, 59); color: white;}
.color2 {background-color: #FFF; color: black;}
</style>
