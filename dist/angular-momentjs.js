/**
 * angular-momentjs - v0.0.1 - 2013-11-27
 * https://github.com/firehist/angular-momentjs
 *
 * Copyright (c) 2013 Benjamin Longearet
 */
angular.module('blongearet.momentjs', [])

  .run(function () {
    if (angular.isUndefined(moment)) {
      throw new Error('MomentJS is required for blongearet.momentjs module');
    }
  });
angular.module('blongearet.momentjs')

  /**
   * @requires momentjs
   * @description
   * MomentJS format wrapper
   * http://momentjs.com/docs/#/displaying/format/
   */
  .filter('momentjs', [function () {
    return function (dateIn, method, params) {
      if (angular.isUndefined(moment()[method])) {
        throw new Error('[blongearet.momentjs] moment().' + method + ' doesn\'t exist');
      }
      if (angular.isDefined(params) && !angular.isArray(params)) {
        throw new Error('[blongearet.momentjs] filter params must be an array');
      }
      var MDate = window['moment'](dateIn);
      return MDate[method].apply(MDate, params);
    };
  }]);
