import * as defaults from '../defaultData';

const CUSTOM_STATE_KEY = "SONGWRITING_INSPIRATIONATOR_CUSTOM_STATE";
var currentInstruments;
var currentSongAttributes;
var waysToStartASong;
var instrumentsByFrequency;
var basslineConfig;

export function init() {
  if (notInitialized()) {
    if (CUSTOM_STATE_KEY in localStorage) {
      initFromLocalStorage();
    } else {
      initFromDefaults();
    }
  }
}

function notInitialized() {
  return (!currentInstruments) || (!currentSongAttributes) || (!waysToStartASong) || (!instrumentsByFrequency) || (!basslineConfig);
}

function initFromDefaults() {
  currentInstruments = defaults.instruments;
  currentSongAttributes = defaults.songAttributes;
  waysToStartASong = defaults.waysToStartASong;
  instrumentsByFrequency = defaults.instrumentsByFrequency;
  basslineConfig = defaults.basslineConfig;
}

function initFromLocalStorage() {
  // will load partially from localstorage, partially from defaults in case of an update
  // DOES NOT currently support modifying the existing data model, only 
  // adding new top-level variables (such as defaults.instruments).
  var customState = JSON.parse( localStorage.getItem(CUSTOM_STATE_KEY) );
  currentInstruments = customState.instruments ? customState.instruments : defaults.instruments;
  currentSongAttributes = customState.songAttributes ? customState.songAttributes : defaults.songAttributes;
  waysToStartASong = customState.waysToStartASong ? customState.waysToStartASong : defaults.waysToStartASong;
  instrumentsByFrequency = customState.instrumentsByFrequency ? customState.instrumentsByFrequency : defaults.instrumentsByFrequency
  basslineConfig = customState.basslineConfig ? customState.basslineConfig : defaults.basslineConfig
}

export function getInstruments() {
  return currentInstruments;
}

export function getSongAttributes() {
  return currentSongAttributes;
}

export function getWaysToStartASong() {
  return waysToStartASong;
}

export function getInstrumentsByFrequency() {
  return instrumentsByFrequency;
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

export function setInstrumentEnabledByName(instName, enabled) {
  currentInstruments.forEach(instrument => {
    if (instrument.name === instName) {
      instrument.enabled = enabled
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
    type: type,
    enabled: true
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
      possibilities *= (enabledInstrumentsCount() - numberOfInstrumentsChosenSoFar);
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
        var instrumentsOfType = getEnabledInstrumentsOfType(attr.countsInstrumentType);
        if (instrumentsOfType.length <= 0) return;
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

  if (enabledInstruments().length > 0) {
    currentSongAttributes.forEach(attr => {
      if (attr.enabled) {
        if (attr.name === "Minimum Instruments Count") {
          while (instrumentsInSongTemplate.length < attr.min) {
            var randomInstrument = getRandomElementFromArray(enabledInstruments());
  
            // dedupe
            while (instrumentOfNameExitsInArray(instrumentsInSongTemplate, randomInstrument.name)) {
              randomInstrument = getRandomElementFromArray(enabledInstruments());
            }
  
            instrumentsInSongTemplate.push(randomInstrument);
          }
        }
      }
    });
  }

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

function getEnabledInstrumentsOfType(type) {
  var instrumentsOfType = [];
  currentInstruments.forEach(instrument => {
    if (instrument.type === type && instrument.enabled) {
      instrumentsOfType.push(instrument);
    }
  });

  return instrumentsOfType;
}

export function getBase64EncodedState() {
  var state = {
    instruments: currentInstruments,
    attributes: currentSongAttributes,
    waysToStartASong: waysToStartASong,
    instrumentsByFrequency: instrumentsByFrequency,
    basslineConfig: basslineConfig
  }

  return btoa( JSON.stringify(state) );
}

export function setStateFromFileContents(importedStateString) {
  if (typeof importedStateString !== "string") {
    return "incorrect type of file content";
  }

  var obj = JSON.parse(importedStateString);

  if (!("instruments" in obj)) {
    console.log("configuration doesn't contain instruments");
  }

  if (!("attributes" in obj)) {
    console.log("configuration doesn't contain attributes");
  }

  if (!("waysToStartASong" in obj)) {
    console.log("configuration doesn't contain waysToStartASong");
  }

  if (!("instrumentsByFrequency" in obj)) {
    console.log("configuration doesn't contain instrumentsByFrequency");
  }

  if (!("basslineConfig" in obj)) {
    console.log("configuration doesn't contain basslineConfig");
  }

  currentInstruments = obj.instruments;
  currentSongAttributes = obj.attributes;
  waysToStartASong = obj.waysToStartASong;
  instrumentsByFrequency = obj.instrumentsByFrequency;
  basslineConfig = obj.basslineConfig;
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
    songAttributes: currentSongAttributes,
    waysToStartASong: waysToStartASong,
    instrumentsByFrequency: instrumentsByFrequency,
    basslineConfig: basslineConfig
  };
  localStorage.setItem(CUSTOM_STATE_KEY, JSON.stringify(customState));
}

function enabledInstruments() {
  var enabledInstruments = [];

  currentInstruments.forEach(instrument => {
    if (instrument.enabled) {
      enabledInstruments.push(instrument);
    }
  });

  return enabledInstruments;
}

function enabledInstrumentsCount() {
  var count = 0;
  currentInstruments.forEach(instrument => {
    if (instrument.enabled) {
      count += 1;
    }
  });

  return count;
}

export function addWayToStartASong(wayToStartASong) {
  waysToStartASong.push(wayToStartASong);
  flushCustomizationsToLocalStorage();
}

export function removeWayToStartASong(elementContainingTextHtmlString) {
  waysToStartASong = waysToStartASong.filter(x => !elementContainingTextHtmlString.includes(x));
  flushCustomizationsToLocalStorage();
}

export function pickRandomWayToStartASong() {
  return waysToStartASong[Math.floor(Math.random()*waysToStartASong.length)];
}

export function addInstrumentsByFrequencyCategory(category) {
  instrumentsByFrequency.push({
    'category': category, 'instruments': []
  });
  flushCustomizationsToLocalStorage();
}

export function addInstrumentByFrequency(instrument, htmlContainingCategory) {
  for (var obj of instrumentsByFrequency) {
    if (htmlContainingCategory.includes(obj.category)) {
      obj.instruments.push(instrument);
    }
  }
  flushCustomizationsToLocalStorage();
}

export function deleteInstrumentByFrequencyCategory(htmlContainingCategory) {
  instrumentsByFrequency = instrumentsByFrequency.filter(obj => !htmlContainingCategory.includes(obj.category));
  flushCustomizationsToLocalStorage();
}

export function deleteInstrumentByFrequency(htmlContainingInstrument, htmlContainingCategory) {
  for (var obj of instrumentsByFrequency) {
    if (htmlContainingCategory.includes(obj.category)) {
      obj.instruments = obj.instruments.filter(inst => !htmlContainingInstrument.includes(inst));
    }
  }
  flushCustomizationsToLocalStorage();
}

export function getRandomBasslineAsArray() {
  // returns an array.  Each element will be a string, which represents 
  // one guitar string's tablature in order: EADGBe
  // EX:
  // ['----------------4', '----------------', '---------6-------9', '---------3-------', '-------------------', '-2-----------------']
  // The actual notes are spaced correctly based on the order they were randomly generated, and ready to be packed into divs and styled accordingly.
  var chosenNotes = [];
  
  while (chosenNotes.length < basslineConfig.numberOfNotesToGenerate) {
    var chosenNote = getRandomElementFromArray(basslineConfig.notes);
    if (chosenNotes.length > 0) {
      while (chosenNote === chosenNotes[chosenNotes.length - 1]) {
        chosenNote = getRandomElementFromArray(basslineConfig.notes); // don't allow same 3 notes in a row
      }
    }
    chosenNotes.push(chosenNote);
  }

  // once have enough, transform chosen notes into guitar tab (array of strings, no pun intended) and return it

  var tablatureAsArray = [ // 30 dashes per string
    "------------------------------",
    "------------------------------",
    "------------------------------",
    "------------------------------"
  ];

  var leadingBlankDashes = 5;
  var maxDashesBetweenNotes = 10;
  // magic number 40, below: 30 dashes per string + 5 leading padding dashes + 
  // ~5 trailing padding dashes depending (yeah I know, it's a personal project OK???)
  var dashesBetweenNotes = ((40/getNotesPerBassline()) - 2);
  if (dashesBetweenNotes > maxDashesBetweenNotes) {
    dashesBetweenNotes = maxDashesBetweenNotes;
  }

  for (var noteIndex = 0; noteIndex < chosenNotes.length; noteIndex++) {
    var indexOfString;
    
    switch(chosenNotes[noteIndex][0]) { // first character of note, which represents the bass string e a d or g
      case "E":
        indexOfString = 3;
        break;
      case "A":
        indexOfString = 2;
        break;
      case "D":
        indexOfString = 1;
        break;
      case "G":
        indexOfString = 0;
        break;
      default:
        alert("Found an unexpected value in notes available for bassline generation. This is very bad- almost " +
        "as bad as the GOP selling out American democracy to the highest bidder over the last few decades, culminating in " +
        "the worst possible nightmare scenario of an authoritarian regime led by a disgusting ignorant orange baby con-man narcissist criminal " +
        "cheered on by droves of uneducated mouth-breathing dipshits who have voted against their own interests " +
        "in every election they've been elligible for in service of fear that the demonic Democrats are devoted to murdering babies and communism.");
    }

    var indexToPlaceFretNumber = leadingBlankDashes + (noteIndex * dashesBetweenNotes);

    // set fret number in correct position in bass string
    tablatureAsArray[indexOfString] = 
      tablatureAsArray[indexOfString].substring(0, indexToPlaceFretNumber) + 
      chosenNotes[noteIndex].substring(1) + 
      tablatureAsArray[indexOfString].substring(indexToPlaceFretNumber);
  }

  return evenUpEndDashes(tablatureAsArray);
}

function evenUpEndDashes(tablatureAsArray) {
  var maxLength = 0;

  for (var s of tablatureAsArray) {
    if (s.length > maxLength) {
      maxLength = s.length;
    }
  }

  for (var i = 0; i < tablatureAsArray.length; i++) {
    if (tablatureAsArray[i].length < maxLength) {
      while (tablatureAsArray[i].length < maxLength) {
        tablatureAsArray[i] += "-";
      }
    }
  }

  return tablatureAsArray;
}

export function getNotesPerBassline() {
  return basslineConfig.numberOfNotesToGenerate;
}

export function changeNotesPerBassline(newNumber) {
  basslineConfig.numberOfNotesToGenerate = newNumber;
  flushCustomizationsToLocalStorage();
}
