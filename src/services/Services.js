import * as defaults from './defaultData';

var currentInstruments;
var currentSongAttributes;

export function initFromDefaults() {
  currentInstruments = defaults.instruments;
  currentSongAttributes = defaults.songAttributes;
}

export function getInstruments() {
  return currentInstruments;
}

export function getSongAttributes() {
  return currentSongAttributes;
}

export function setAttributeEnabled(attrName, enabled) {
  for (var i = 0; i < currentSongAttributes.length; i++) {
    if (currentSongAttributes[i].name === attrName) {
      currentSongAttributes[i].enabled = enabled;
    }
  }
}

export function getTotalNumberOfPossibilities() {

  var numberOfInstrumentsChosenSoFar = 0;
  var possibilities = 1;

  currentSongAttributes.forEach(attr => {
    if (!attr.enabled) {
      return;
    }

    if ("values" in attr) {
      possibilities *= attr.values.length;
    } else if ("selectsFromInstruments" in attr && attr.selectsFromInstruments) {
      possibilities *= (currentInstruments.length - numberOfInstrumentsChosenSoFar);
      numberOfInstrumentsChosenSoFar += 1;
    } else if ("min" in attr && "max" in attr) {
      possibilities *= (attr.max - attr.min);
    }
  });

  return possibilities;
}

export function generateTemplate() {
  var instrumentsInSongTemplate = [];
  var templateSongAttributes = [];

  currentSongAttributes.forEach(attr => {
    if ("countsInstrumentType" in attr) {
      if (attr.enabled) {
        var instrumentsOfType = getInstrumentsOfType(attr.countsInstrumentType);
        var numberToChoose = randFromRange(attr.min, attr.max);

        for (var i = 0; i < numberToChoose; i++) {
          var randInstrumentOfType = getRandomElementFromArray(instrumentsOfType);

          // dedupe set of chosen instruments
          while (instrumentOfNameExitsInArray(instrumentsInSongTemplate, randInstrumentOfType.name)) {
            randInstrumentOfType = getRandomElementFromArray(instrumentsOfType);
          }
        
          instrumentsInSongTemplate.push(randInstrumentOfType);
          
        }
      }
    }
  });

  currentSongAttributes.forEach(attr => {
    if (attr.enabled) {
      if (attr.name === "Minimum Instruments Count") {
        while (instrumentsInSongTemplate.length < attr.value) {
          var randomInstrument = getRandomElementFromArray(currentInstruments);

          // dedupe
          while (instrumentOfNameExitsInArray(instrumentsInSongTemplate, randomInstrument.name)) {
            randomInstrument = getRandomElementFromArray(currentInstruments);
          }

          instrumentsInSongTemplate.push(randomInstrument);
        }
      }
    }
  });

  currentSongAttributes.forEach(attr => {
    if (attr.enabled) {
      if ("values" in attr) {
        templateSongAttributes.push({
          name: attr.name,
          value: getRandomElementFromArray(attr.values)
        });

      } else if ("selectsFromInstruments" in attr && attr.selectsFromInstruments) {
        var chosenInstrument = getRandomElementFromArray(instrumentsInSongTemplate);
        // don't let inst to record second duplicate first, and so on
        if (attr.name.includes("Instrument to Record") && attr.name !== "Instrument to Record First") {
          // is possible that enabled attributes are such that there aren't enough instruments
          var timesThroughWhileLoop = 0;
          while (instrumentToRecordXthValueNotValid(templateSongAttributes, chosenInstrument)) {
            if (timesThroughWhileLoop > 200) break;
            chosenInstrument = getRandomElementFromArray(instrumentsInSongTemplate);
            timesThroughWhileLoop += 1;
          }
        }

        if (chosenInstrument) {
          templateSongAttributes.push({
            name: attr.name,
            value: chosenInstrument.name
          });
        }

      }
    }
  });

  return {
    instruments: instrumentsInSongTemplate,
    attributes: templateSongAttributes
  };
  
}

function getInstrumentsOfType(type) {
  var instrumentsOfType = [];
  currentInstruments.forEach(instrument => {
    if (instrument.type === type) {
      instrumentsOfType.push(instrument);
    }
  });

  return instrumentsOfType;
}

function getRandomElementFromArray(arr) {
  return arr[randFromRange(0, arr.length-1)];
}

function randFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function instrumentOfNameExitsInArray(arr, name) {
  if (arr.find(instrument => { return instrument.name === name})) {
    return true;
  }
  return false;
}

function instrumentToRecordXthValueNotValid(chosenAttributes, chosenInstrument) {
  var instrToRecordXthAttrs = chosenAttributes.filter(attr => attr.name.includes("Instrument to Record"));
  if (instrToRecordXthAttrs.find(attr => {return attr.value === chosenInstrument.name})) {
    return true;
  }
  return false;
}
