import Robot from "./robot";
import MarsGrid from "./mars";

class Mission {
  constructor() {
    this.robots = [];
    this.marsGrid = {}
  }
  setMarsGrid(setGridInput) {
    let maxGridX = setGridInput.split("")[0];
    let maxGridY = setGridInput.split("")[2];
    this.marsGrid = new MarsGrid(maxGridX, maxGridY);
  }

  initRobot(settings) {
    let initX = settings.split("")[0];
    let initY = settings.split("")[2];
    let initOrientation = settings.split("")[4];
    this.addRobot(+initX,+initY, initOrientation);
  }

  addRobot(x, y, orientation) {
    let newRobot = new Robot(x, y, orientation);
    this.robots.push(newRobot);
  }

  
  

  moveRobots(inputMovement) {
    let activeRobot = this.robots.find(robot => robot.active === true);
    if(inputMovement.split('').some(command=>command!=="L" && command!=="R" && command!=="F")){
      activeRobot.unknownCommandEntered = true
    }
    inputMovement.split('').forEach(command => {
      if (activeRobot.lost === true) {
        if(activeRobot.x > this.marsGrid.maxX)activeRobot.x -= 1
        if(activeRobot.x<0)activeRobot.x += 1
        if(activeRobot.y>this.marsGrid.maxY)activeRobot.y -= 1
        if(activeRobot.y<0)activeRobot.y += 1
        activeRobot.lastScent.active = true
        activeRobot.lastScent.x = activeRobot.x
        activeRobot.lastScent.y = activeRobot.y

        return;
      }
      if (command === "L" || command === "R") {
        activeRobot.rotate(command);
      }
      else if (command === "F") {
        activeRobot.move();
        this.robots.forEach(robot=>{
          if(robot.lastScent.active){
            if(activeRobot.x>robot.lastScent.x)activeRobot.x-=1
            if(activeRobot.y>robot.lastScent.y)activeRobot.y-=1
          }
        })
        if (
          activeRobot.x > this.marsGrid.maxX ||
          activeRobot.x < 0 ||
          activeRobot.y > this.marsGrid.maxY ||
          activeRobot.y < 0
        ) {
          return (activeRobot.lost = true);
        }
      }
      
      
      activeRobot.active = false;
      if(this.unknownCommandEntered){
        return `Unknown command skipped. ${activeRobot.getFinalPos()}`;
      }else{
        return activeRobot.getFinalPos()
      }
    });
  }
}


export default Mission;
