var Paging;
(function (Paging) {
    var PagedList = (function () {
        function PagedList(list, itemsPerPage) {
            if (itemsPerPage === void 0) { itemsPerPage = 3; }
            this.page = 1;
            this.itemsPerPage = itemsPerPage;
            this.Bind(list);
        }
        PagedList.prototype.Bind = function (list) {
            var _this = this;
            this.list = list;
            this.list.Count().then(function (i) {
                _this.count = i;
                _this.numOfPages = Math.floor(i / _this.itemsPerPage);
                if (i % _this.itemsPerPage > 0)
                    _this.numOfPages++;
            });
            this.Fetch();
        };
        PagedList.prototype.NextPage = function () {
            if (this.page < this.numOfPages) {
                this.page++;
                this.Fetch();
            }
        };
        PagedList.prototype.CurrentPage = function () {
            return this.page;
        };
        PagedList.prototype.previousPage = function () {
            if (this.page > 1) {
                this.page--;
                this.Fetch();
            }
        };
        PagedList.prototype.Goto = function (page) {
            if (page > 0 && page <= this.numOfPages) {
                this.page = page;
                this.Fetch();
            }
        };
        PagedList.prototype.Count = function () {
            return this.count;
        };
        PagedList.prototype.Pages = function () {
            return this.numOfPages;
        };
        PagedList.prototype.Items = function () {
            return this.items;
        };
        PagedList.prototype.ItemsPerPage = function () {
            return this.itemsPerPage;
        };
        PagedList.prototype.PageLowerBoundary = function () {
            return ((this.page - 1) * this.itemsPerPage) + 1;
        };
        PagedList.prototype.PageUpperBoundary = function () {
            var upperBoundary = ((this.page - 1) * this.itemsPerPage) + this.itemsPerPage;
            return (upperBoundary < this.count) ? upperBoundary : this.count;
        };
        PagedList.prototype.Fetch = function () {
            var _this = this;
            this.list.Slice((this.page - 1) * this.itemsPerPage, this.itemsPerPage).then(function (result) {
                return _this.items = result;
            });
        };
        return PagedList;
    })();
    Paging.PagedList = PagedList;
})(Paging || (Paging = {}));
var Paging;
(function (Paging) {
    var Directives;
    (function (Directives) {
        var PageCtrl = (function () {
            function PageCtrl($scope) {
                this.page = $scope.page;
                //console.log(this.page)
            }
            PageCtrl.prototype.next = function () {
                this.page.NextPage();
            };
            PageCtrl.prototype.prev = function () {
                this.page.previousPage();
            };
            PageCtrl.prototype.goto = function (index) {
                this.page.Goto(index + 1);
            };
            PageCtrl.prototype.isCurrentPage = function (item) {
                return this.page.CurrentPage() == item + 1;
            };
            PageCtrl.prototype.links = function () {
                var page = this.page;
                //console.log(page)
                var arr = [];
                if (page && page.Pages() > 0) {
                    var curr = page.CurrentPage();
                    var count = page.Pages();
                    var k = 4;
                    //Get Index Bounds
                    var kl = curr - k;
                    var kr = curr + k;
                    //Handle Left Overflow
                    if (kl < 0) {
                        kr = kr + (kl * -1);
                        kl = 0;
                    }
                    //Handle Right Overflow
                    if (kr > count) {
                        kl = kl - (kr - count);
                        kr = count;
                    }
                    //Handle Recursive Left Overflow
                    if (kl < 0) {
                        kl = 0;
                    }
                    //Plot Range
                    for (var x = kl; x < kr; x++) {
                        arr.push(x);
                    }
                }
                return arr;
            };
            PageCtrl.$inject = ["$scope"];
            return PageCtrl;
        })();
        var Pager = function ($compile) {
            return {
                restrict: "EA",
                templateUrl: "pager.html",
                scope: {
                    page: "="
                },
                link: function (scope, element, attrs) {
                    scope.$watch('page', function (newPage, oldPage, scope) {
                        //console.log('changed');
                        var html = '<ul class="pagination ng-cloak" g-show="pager.links().length > 1" style="margin-top:0px">' +
                            '<li><a style="cursor:pointer" ng- click="pager.prev()" >&laquo; </a></li>' +
                            '<li ng-class="{active:pager.isCurrentPage(item)}" ng-repeat="item in pager.links()"> <a style="cursor:pointer" ng-click="pager.goto(item)">{{item + 1}}</a></li>' +
                            '<li><a style="cursor:pointer" ng-click="pager.next()">&raquo;</a></li></ul>';
                        element.html(html);
                        //console.log(element);
                        //$compile(element.contents())(scope);
                        $compile(element.contents())(scope);
                    });
                },
                controller: PageCtrl,
                controllerAs: "pager"
            };
        };
        app.directive("pager", Pager);
    })(Directives = Paging.Directives || (Paging.Directives = {}));
})(Paging || (Paging = {}));
