(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('DateOnly', function() {
  "use strict";

  function DateOnly(date) {
    var val = null;

    if (date instanceof String || typeof date === 'string') date = new Date(date);
    if (date instanceof Number || typeof date === 'number') date = numberToDate(date);

    if (date instanceof Date) val = date;

    this.saveDateOnly(val || new Date());
  }

  DateOnly.prototype.saveDateOnly = function(date) {
    this.date = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  };

  DateOnly.prototype.getDate = function() {
    return this.date;
  };

  DateOnly.prototype.setDate = function(date) {
    this.date = date;
  };

  DateOnly.prototype.getMonth = function() {
    return this.month;
  };

  DateOnly.prototype.setMonth = function(month) {
    this.month = month;
  };

  DateOnly.prototype.getFullYear = function() {
    return this.year;
  };

  DateOnly.prototype.setFullYear = function(year) {
    this.year = year;
  };

  DateOnly.prototype.toDate = function() {
    return partsToDate(this.year, this.month, this.date);
  };

  DateOnly.prototype.valueOf = function() {
    return parseInt(pad(this.year, 4) + pad(this.month, 2) + pad(this.date, 2), 10);
  };

  DateOnly.prototype.toString = function() {
    return this.toDate().toDateString();
  };

  DateOnly.prototype.toJSON = function() {
    return this.valueOf();
  };

  function pad(num, length) {
    num = num.toString();
    while (num.length < length) {
      num = '0' + num;
    }

    return num;
  }

  function numberToDate(n) {
    var s = n.toString();

    if (s.length !== 8 && s.length !== 13) throw new Error('Unable to cast ' + n + ' to a DateOnly');

    if (s.length === 13) {
      return new Date(n);
    } else {
      var year = s.slice(0, 4);
      var month = s.slice(4, 6);
      var day = s.slice(6, 8);

      return partsToDate(year, month, day);
    }
  }

  function partsToDate(year, month, day) {
    var date = new Date();
    date.setYear(year);
    date.setMonth(month);
    date.setDate(day);
    date.setHours(0, 0, 0, 0);

    return date;
  }

  return DateOnly;
}));