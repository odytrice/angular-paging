// Code goes here
var app = angular.module("app", []);
app.controller("paycontroller", function ($scope, $q, $filter, $http) {

    var paymentsList = {
        Count: function () {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve(50);
            }, 2);
            return deferred.promise;
        },
        Slice: function (skip, take) {
            var deferred = $q.defer();
            var promise = $http.get("https://randomuser.me/api/?results=50");

            promise.then(r => {
                var results = r.data.results;
                var dataset = $filter('filter')(results, function (value, index, array) { return index > skip && index <= Math.floor(skip) + Math.floor(take); });
                deferred.resolve(dataset);
            })

            return deferred.promise;
        }
    };

    $scope.paymentPagedList = new Paging.PagedList(paymentsList);

    function loadPayments() {
        //use payTypeId to filter payment records

        var paymentsList = {
            Count: function () {
                var deferred = $q.defer();
                setTimeout(function () {
                    deferred.resolve(50);
                }, 2);
                return deferred.promise;
            },
            Slice: function (skip, take) {
                var deferred = $q.defer();
                var promise = $http.get("https://randomuser.me/api/?results=50");

                promise.then(r => {
                    var results = r.data.results;
                    var dataset = $filter('filter')(results, function (value, index, array) { return index > skip && index <= Math.floor(skip) + Math.floor(take); });
                    deferred.resolve(dataset);
                })

                return deferred.promise;
            }
        };

        $scope.paymentPagedList.Bind(paymentsList);

    }

    $scope.loadPayments = loadPayments;
    loadPayments();

});
