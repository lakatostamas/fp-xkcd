import { compose, curry, map, prop } from 'ramda';

const Impure = {
  getJSON: curry((resolve, reject, url) => fetch(url)
    .then(data => data.json())
    .then(resolve)
    .catch(reject)),
  setHtml: curry((sel, html) => document.querySelector(sel).innerHTML = html),
  addEventListener: curry((sel, event, listener) => document.querySelector(sel).addEventListener(event, listener)),
  trace: log => console.log(log),
};

const apiUrl = 'https://xkcd.now.sh/';
const buildImageTag = src => `<img src=${src} />`;
const dataToImage = compose(buildImageTag, prop('img'));
const render = compose(Impure.setHtml('.image-container'), dataToImage);
const renderErrorMessage = Impure.trace;
const transformTextToUrl = number => `${apiUrl}${number}`;

const getData = compose(
  Impure.getJSON(render, renderErrorMessage),
  transformTextToUrl,
  prop('value'),
  prop('target'),
);
const addListenerToInput = Impure.addEventListener('[name="search-pattern"]');

addListenerToInput('change', getData);
