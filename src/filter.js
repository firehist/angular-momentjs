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
