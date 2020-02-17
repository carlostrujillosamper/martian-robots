class Robot {
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.lastScent = {
      active : false ,
      x : '',
      y : ''
    }
    this.orientation = orientation;
    this.rotationDic = {
      N: { L: "W", R: "E" },
      E: { L: "N", R: "S" },
      S: { L: "E", R: "W" },
      W: { L: "S", R: "N" }
    };
    this.moveDic = {
      N: { x: 0, y: 1 },
      S: { x: 0, y: -1 },
      E: { x: 1, y: 0 },
      W: { x: -1, y: 0 }
    };
    this.active = true;
    this.lost = false
    this.unknownCommandEntered = false

    
   
  }

  rotate(to) {
    this.orientation = this.rotationDic[this.orientation][to];
  }

  move() {
    this.x = this.x + this.moveDic[this.orientation]['x'];
    this.y = this.y + this.moveDic[this.orientation]['y'];
  }

  



  getFinalPos() {
    if (!this.lost){
    return `${this.x} ${this.y} ${this.orientation}`;
    }else{
      return `${this.x} ${this.y} ${this.orientation} LOST`
    }
  }
}

export default Robot;
