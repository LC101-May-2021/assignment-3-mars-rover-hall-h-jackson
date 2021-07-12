const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.

// However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

// Test 07

    it("constructor sets position and default values for mode and generatorWatts",
    function() {
        let rover = new Rover(918470894);
        expect(rover.position).toEqual(918470894);
        expect(rover.mode).toEqual('NORMAL');
        expect(rover.generatorWatts).toEqual(110);
    });

// Test 08
    it("response returned by receieveMessage contains name of Message",
    function() {
        let message = new Message('New message!');
        expect(message.name).toEqual('New message!');
    });

// Test 09
    it("response returned by receiveMessage includes two results if two commands are sent in the message",
    function() {
        let message = new Message('New message!', ['MOVE']);
        expect(message.name).toEqual('New message!');
        expect(message.commands).toEqual(['MOVE']);
    });

// Test 10
    it("responds correctly to status check command",
    function() {
        let rover = new Rover(918470894);
        let commands = [new Command('STATUS_CHECK')];
        let message = new Message('Test message!', commands);
        let response = rover.receiveMessage(message);
        expect(response.results[0]).toEqual({ completed: true, roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 918470894 }});  
    });

// Test 11
  it("responds correctly to mode change command",
  function() {
    let rover = new Rover(43467);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test 11 - Change to low power status', commands);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
  });

// Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode",
  function() {
    let rover = new Rover(43467);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 67)];
    let message = new Message('Cannot be moved in LOW_POWER Mode', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
  });

// Test 13
    it("responds with position for move command",
    function() {
      let rover = new Rover(43467);
      let commands = [new Command('MOVE', 43467)];
      let message = new Message('Rover likes to move it move it', commands);
      let response = rover.receiveMessage(message);
      expect(rover.position).toEqual(43467);

     })

});