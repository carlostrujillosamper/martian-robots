
const expect = require('chai').expect;
const Mission = require('../dist/mission-control').default;

describe('Martian Robots',()=>{
  it('should correctly set Martian Grid',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')

    expect(
      mission.marsGrid
    ).to.eql({maxX : 5, maxY : 3})
  })

  it('should correctly initialize robot',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('1 1 E')

    expect(
      mission.robots[0].getFinalPos()
    ).to.eql(
      "1 1 E"
    )

  })

  it('should correctly initialize multiple robots',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('2 2 E')
    mission.initRobot('0 3 N')

    expect(
      mission.robots[0].getFinalPos()
    ).to.eql(
      "2 2 E"
    )
    expect(
      mission.robots[1].getFinalPos()
    ).to.eql(
      "0 3 N"
    )


  })

  it('should correctly move robot based on given commands ',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('1 1 E')
    mission.moveRobots('RFRFRFRF')

    expect(
      mission.robots[0].getFinalPos()
    ).to.eql(
      "1 1 E"
    )

  })

  it('should return LOST after last known position inside grid if robot goes beyond grid',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('3 2 N')
    mission.moveRobots('FRRFLLFFRRFLL')

    expect(
      mission.robots[0].getFinalPos()
    ).to.eql(
      "3 3 N LOST"
    )


  })

  it('should leave scent on last known position inside grid if lost',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('3 2 N')
    mission.moveRobots('FRRFLLFFRRFLL')

    expect(
      mission.robots[0].lastScent
    ).to.eql(
      {
        active: true,
        x : 3,
        y : 3
      }
    )

  })

  it('should skip move command if last scent detected on resulting coordinates',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('3 2 N')
    mission.moveRobots('FRRFLLFFRRFLL')
    mission.initRobot('0 3 W')
    mission.moveRobots('LLFFFLFLFL')

    expect(
      mission.robots[1].getFinalPos()
    ).to.eql(
      '2 3 S'
    )

  })

  it('should skip command if unknown command was included in input',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('1 1 E')
    mission.moveRobots('JJJJJJ')

    expect(
      mission.robots[0].unknownCommandEntered
    ).to.eql(
      true
    )
  })

  it('should correctly move multiple robots based on commands',()=>{
    const mission = new Mission()
    mission.setMarsGrid('5 3')
    mission.initRobot('1 1 E')
    mission.moveRobots('RFRFRFRF')
    mission.initRobot('3 2 N')
    mission.moveRobots('FRRFLLFFRRFLL')
    mission.initRobot('0 3 W')
    mission.moveRobots('LLFFFLFLFL')

    expect(
      mission.robots[0].getFinalPos()
    ).to.eql(
      '1 1 E'
    )

    expect(
      mission.robots[1].getFinalPos()
    ).to.eql(
      '3 3 N LOST'
    )

    expect(
      mission.robots[2].getFinalPos()
    ).to.eql(
      '2 3 S'
    )

  })
})










  

  