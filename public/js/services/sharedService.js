function sharedService($rootScope) {
	var obj = {};
	sharedService.obj = {};
	sharedService.getDetails = function(objItem) {
		this.obj = objItem;
		this.broadcastItem();
	};
	sharedService.broadcastItem = function() {
		$rootScope.$broadcast('handleBroadcast');
	};
	return sharedService;
}

angular
    .module('efasal')
    .factory('sharedService', sharedService)