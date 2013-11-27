angular.module('blongearet.momentjs', [])

  .run(function () {
    if (angular.isUndefined(moment)) {
      throw new Error('MomentJS is required for blongearet.momentjs module');
    }
  });