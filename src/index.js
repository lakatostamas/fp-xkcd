import {
  compose,
  curry,
  prop,
} from 'ramda';
import { task } from 'folktale/concurrency/task';
import axios from 'axios';

const Impure = {
  get: url => task(resolver => axios.get(url)
    .then(resolver.resolve)
    .catch(resolver.reject)).run(),
  setHtml: curry((sel, html) => {
    document.querySelector(sel).innerHTML = html;
  }),
  addEventListener: curry(
    (sel, event, listener) => document.querySelector(sel).addEventListener(event, listener),
  ),
};

const apiUrl = 'https://xkcd.now.sh/';
const buildImageTag = src => `<img src=${src} />`;
const dataToImage = compose(buildImageTag, prop('img'), prop('data'));
const renderImage = compose(Impure.setHtml('.result-container'), dataToImage);
const renderErrorMessage = compose(Impure.setHtml('.result-container'), prop('message'));
const transformTextToUrl = pattern => `${apiUrl}${pattern}`;
const extractPattern = compose(prop('value'), prop('target'));

const renderResult = runContext => runContext.listen({
  onRejected: renderErrorMessage,
  onResolved: renderImage,
});

const getData = compose(
  renderResult,
  Impure.get,
  transformTextToUrl,
  extractPattern,
);
const addListenerToInput = Impure.addEventListener('[name="search-pattern"]');

addListenerToInput('change', getData);
