angular.module("app", ['firebase'])

    // enter your firebase URL below to activate Real Time data synchronization
    .constant("firebaseRef", new Firebase("<your firebase URL>"))

    .controller("indexController", function ($rootScope, $scope, firebaseRef, $firebaseArray) {

        $scope.date = new Date();

        $scope.checkStatus = function () {
            $scope.details.isPaid = !$scope.payment;
            console.log($scope.details);
        };

        $scope.details = {
            customerName: '',
            itemWeight: 0,
            itemRate: 0,
            itemAmount: 0,
            isPaid: true
        };

        //download the whole Firebase data
        $scope.wholeData = $firebaseArray(firebaseRef);

        $scope.wholeData.$loaded(function () {
            $scope.entries = $scope.wholeData.length;
        });

        // save given FORM values to real time firebase database
        $scope.saveCustomerDetails = function () {
            $scope.details.itemAmount = $scope.details.itemRate * $scope.details.itemWeight;
            $scope.wholeData.$add($scope.details);
            $scope.details = {};
            console.log($scope.wholeData);
            console.log($scope.details);

        };

        // will remove each entry
        $scope.removeEntry = function (arg) {
            $scope.wholeData.$remove(arg);
        };

    });
    