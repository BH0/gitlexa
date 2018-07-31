/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('alexa-cookbook.js');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = 'Gitlexa';  
const GET_RESPONSE_MESSAGE = 'Here\'s your answer: ';
const HELP_MESSAGE = 'You can tell me a version control fact or ask me about version control';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'Sorry, perhaps in my next update I will be able to understand that';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

function randRange(lowest, highest) { 
  return Math.floor(Math.random() * highest) + lowest; 
} 

// may become a "piled" array: "array = [array, array, array]" (an array of arrays) 
const data = [
  'git is indeed a version control tool', 
  'git is the most popular version control tool', 
  'github is a place for storing git repositories', 

  'a commit message helps you know what a commit was for, you can set one inside quotes using the dash M flag', 

  'companies using git include Amazon, Microsoft, Rackspace, Accenture, Intuit and many more', 
  'git is used by many companies because it is simple and well known and supported'
]; 

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const WhatIsGitHandler = {  
  /* Testing: 
  * "tell me something about git", 
  * "what version control tool should I use", 
  * "what is git" 
  */ 
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'WhatIsGitIntent');
  },
  handle(handlerInput) {
    const speechOutput = GET_RESPONSE_MESSAGE + data[randRange(0, 2)]; 
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .getResponse(); 
  },
};

const GetCommitMessageHandler = {
  /* Testing: 
  * "what is a commit message for"
  * "how do I know what a commit was for"
  */ 
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetCommitMessageIntent');
  },
  handle(handlerInput) {
    const speechOutput = GET_RESPONSE_MESSAGE + data[3]; 

    return handlerInput.responseBuilder
    .speak(speechOutput)
    .getResponse(); 
  },
};

const GetCompaniesUsingGitHandler = {
  /* Testing: 
  * "who uses git" 
  * "what companies use git"
  * "what companies are using git" 
  * "do they use git"
  */ 

  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetCompaniesUsingGItIntent');
  },
  handle(handlerInput) {
    const speechOutput = GET_RESPONSE_MESSAGE + data[randRange(4, 4)]; 
    return handlerInput.responseBuilder
    .speak(speechOutput)
    .getResponse(); 
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error has occurred.')
      .reprompt('Sorry, an error has occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    WhatIsGitHandler,
    GetCommitMessageHandler, 
    GetCompaniesUsingGitHandler, 
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
