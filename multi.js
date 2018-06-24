define((require, factory) => {
  'use strict';

  const sum = require('./sum')
  sum(1, 2)
  return function(a, b) {
    return a * b;
  }
});