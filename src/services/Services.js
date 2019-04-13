import * as defaults from './defaultData';

const CUSTOM_STATE_KEY = "SONGWRITING_INSPIRATIONATOR_CUSTOM_STATE";
var currentInstruments;
var currentSongAttributes;

export function init() {
  if (CUSTOM_STATE_KEY in localStorage) {
    initFromLocalStorage();
  } else {
    initFromDefaults();
  }
}

function initFromDefaults() {
  currentInstruments = defaults.instruments;
  currentSongAttributes = defaults.songAttributes;
}

function initFromLocalStorage() {
  var customState = JSON.parse( localStorage.getItem(CUSTOM_STATE_KEY) );
  currentInstruments = customState.instruments;
  currentSongAttributes = customState.songAttributes;
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
  flushCustomizationsToLocalStorage();
}

export function enabledOrDisableValueForAttribute(attrName, value, valueIsEnabled) {
  currentSongAttributes.forEach(attribute => {
    if (attribute.name === attrName) {
      if (valueIsEnabled && attribute.disabledValues.includes(value)) {
        attribute.disabledValues.splice(attribute.disabledValues.indexOf(value), 1);
      
      } else if (!valueIsEnabled && !attribute.disabledValues.includes(value)) {
        attribute.disabledValues.push(value);
      }
    }
  });
  flushCustomizationsToLocalStorage();
}

export function setMinForAttribute(attrName, min) {
  currentSongAttributes.forEach(attribute => {
    if (attribute.name === attrName) {
      attribute.min = min;
    }
  });
  flushCustomizationsToLocalStorage();
}

export function setMaxForAttribute(attrName, max) {
  currentSongAttributes.forEach(attribute => {
    if (attribute.name === attrName) {
      attribute.max = max;
    }
  });
  flushCustomizationsToLocalStorage();
}

export function addNewInstrument(name, type) {
  currentInstruments.push({
    name: name,
    type: type
  })
  flushCustomizationsToLocalStorage();
}

export function deleteInstrumentByName(name) {
  for (var i = 0; i < currentInstruments.length; i++) {
    if (currentInstruments[i].name === name) {
      currentInstruments.splice(i, 1);
      break;
    }
  }
  flushCustomizationsToLocalStorage();
}

export function addValueToAttributeByName(newValue, attrName) {
  currentSongAttributes.forEach(attribute => {
    if (attribute.name === attrName && "values" in attribute) {
      attribute.values.push(newValue);
      flushCustomizationsToLocalStorage();
      return;
    }
  });
}

export function deleteValueFromAttribute(attrName, valueToDelete) {
  currentSongAttributes.forEach(attribute => {
    if (attribute.name === attrName && "values" in attribute) {
      for (var i = 0; i < attribute.values.length; i++) {
        if (attribute.values[i] === valueToDelete) {
          attribute.values.splice(i, 1);
          flushCustomizationsToLocalStorage();
          return;
        }
      }
    }
  });
}

export function addNewSelectsFromInstrumentsAttribute(attrName) {
  currentSongAttributes.push(
    {
      name: attrName,
      enabled: true,
      selectsFromInstruments: true
    }
  );
  flushCustomizationsToLocalStorage();
}

export function addNewListOfValuesAttribute(attrName) {
  currentSongAttributes.push(
    {
      name: attrName,
      enabled: true,
      values: [],
      disabledValues: []
    }
  );
  console.log("after adding list of values attribute, currentSongAttributes variable is: ");
  console.log(currentSongAttributes);
  flushCustomizationsToLocalStorage();
}

export function deleteAttributeByName(attrName) {
  for (var i = 0; i < currentSongAttributes.length; i++) {
    if (currentSongAttributes[i].name === attrName) {
      currentSongAttributes.splice(i, 1);
      break;
    }
  }
  flushCustomizationsToLocalStorage();
}

export function getTotalNumberOfPossibilities() {

  var numberOfInstrumentsChosenSoFar = 0;
  var possibilities = 1;

  currentSongAttributes.forEach(attr => {
    if (!attr.enabled) {
      return;
    }

    if (attr.disabledValues && attr.disabledValues.length === attr.values.length) {
      return; // because all values are disabled
    }

    if ("values" in attr) {
      var numberOfEnabledValues = attr.values.length - attr.disabledValues.length;
      possibilities *= numberOfEnabledValues;
    } else if ("selectsFromInstruments" in attr && attr.selectsFromInstruments) {
      possibilities *= (currentInstruments.length - numberOfInstrumentsChosenSoFar);
      numberOfInstrumentsChosenSoFar += 1;
    } else if ("min" in attr && "max" in attr) {
      if (attr.max - attr.min > 0) {
        possibilities *= (attr.max - attr.min);
      }
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
        var numberToChoose = randFromRange(parseInt(attr.min), parseInt(attr.max));

        for (var i = 0; i < numberToChoose; i++) {
          var randInstrumentOfType = getRandomElementFromArray(instrumentsOfType);
          var iters = 0;

          // dedupe set of chosen instruments, with iteration limit in case number to choose is more than number to choose from
          while (instrumentOfNameExitsInArray(instrumentsInSongTemplate, randInstrumentOfType.name)) {
            if (iters > 250) break; 
            randInstrumentOfType = getRandomElementFromArray(instrumentsOfType);
            iters += 1;
          }
        
          instrumentsInSongTemplate.push(randInstrumentOfType);
          
        }
      }
    }
  });

  currentSongAttributes.forEach(attr => {
    if (attr.enabled) {
      if (attr.name === "Minimum Instruments Count") {
        while (instrumentsInSongTemplate.length < attr.min) {
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
        if (attr.values.length === attr.disabledValues.length) {
          return; // this attr is functionally disabled
        }
        var valuesWithDisabledRemoved = attr.values.slice();
        attr.disabledValues.forEach(disabledValue => {
          if (valuesWithDisabledRemoved.includes(disabledValue)) {
            valuesWithDisabledRemoved.splice(valuesWithDisabledRemoved.indexOf(disabledValue), 1);
          }
        });

        templateSongAttributes.push({
          name: attr.name,
          value: getRandomElementFromArray(valuesWithDisabledRemoved)
        });

      } else if ("selectsFromInstruments" in attr && attr.selectsFromInstruments) {
        var chosenInstrument = getRandomElementFromArray(instrumentsInSongTemplate);
        // don't let inst to record second duplicate first, and so on
        if (attr.name.includes("Part to Write") && attr.name !== "Part to Write First") {
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

export function getBase64EncodedState() {
  var state = {
    instruments: currentInstruments,
    attributes: currentSongAttributes
  }

  return btoa( JSON.stringify(state) );
}

export function setStateFromFileContents(importedStateString) {
  if (typeof importedStateString !== "string") {
    return "incorrect type of file content";
  }

  var obj = JSON.parse(importedStateString);
  console.log(obj);

  if (!("instruments" in obj)) {
    return "configuration doesn't contain instruments";
  }

  if (!("attributes" in obj)) {
    return "configuration doesn't contain attributes";
  }

  currentInstruments = obj.instruments;
  currentSongAttributes = obj.attributes;
  flushCustomizationsToLocalStorage();
  return "ok";
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
  var instrToRecordXthAttrs = chosenAttributes.filter(attr => attr.name.includes("Part to Write"));
  if (instrToRecordXthAttrs.find(attr => {return attr.value === chosenInstrument.name})) {
    return true;
  }
  return false;
}

function flushCustomizationsToLocalStorage() {
  var customState = {
    instruments: currentInstruments,
    songAttributes: currentSongAttributes
  };
  localStorage.setItem(CUSTOM_STATE_KEY, JSON.stringify(customState));
}
