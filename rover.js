class Rover {
    
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
    
  receiveMessage(message) {
        
    let resultsArr = [];
    let data = { message: message.name, results: resultsArr };
    let commandPassed = {completed: true}; //commandValid
    let commandFailed = {completed: false}; // commandInvalid

    for (let i = 0; i < message.commands.length; i++) {
             
    let roverCommand = message.commands[i].commandType;
      let roverCommandValue = message.commands[i].value;

      if (roverCommand === 'MODE_CHANGE') {
        this.mode = roverCommandValue;
        resultsArr.push(commandPassed);

      } else if (roverCommand === 'MOVE' && this.mode === 'NORMAL') {
        this.position = roverCommandValue;
        resultsArr.push(commandPassed);

      } else if (roverCommand === 'MOVE' && this.mode === 'LOW_POWER') {
        resultsArr.push(commandFailed);
                        
      } else if (roverCommand === 'STATUS_CHECK') {
        commandPassed.roverStatus = { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position };
        resultsArr.push(commandPassed);
      }
    }
    return data;
  }
} 
module.exports = Rover