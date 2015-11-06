define(['bootstrap', 'options'], function (news, options) {

    var Filters = function () {
        this.activeFilter = options.vars.defaultFilter;
        this.filterList = {};
        this.totalProfiles = 0;
    };

    Filters.prototype = {
        init: function () {
            news.pubsub.on(options.events.filterTabClicked, this.showFilter.bind(this));
            news.pubsub.on(options.events.applyFilter, this.applyFilter.bind(this));
            this.setActiveFilter(this.activeFilter);
            this.setupFilterCounter();
        },

        showFilter: function ($filterTab) {
            $filterTab.addClass(options.classes.activeFilterTab)
                .siblings().removeClass(options.classes.activeFilterTab);

            this.setActiveFilter($filterTab.attr('data-filter-name'));

            news.pubsub.emit(options.events.hideFace);

            if (this.filterList.hasOwnProperty(this.activeFilter) && this.filterList[this.activeFilter].length > 0) {
                for (var i in this.filterList[this.activeFilter]) {
                    news.pubsub.emit(options.events.showFace, [this.filterList[this.activeFilter[i]]]);
                }
            } else {
                news.pubsub.emit(options.events.showFace);
            }

            this.updateCounter();
        },

        setActiveFilter: function (filterName) {
            this.activeFilter = filterName;
            if (!this.filterList.hasOwnProperty(filterName)) {
                this.filterList[filterName] = [];
            }

            var $filter = news.$('#' + options.ids.filterFieldsetBase + filterName);
            $filter.addClass(options.classes.activeFilterFieldset)
                .siblings().removeClass(options.classes.activeFilterFieldset);
        },

        applyFilter: function (filterValue) {
            $checkbox = news.$('#' + options.ids.filterCheckboxBase + filterValue);
            if ($checkbox.is(':checked')) {
                this.addToFilterList(filterValue);
            } else {
                this.removeFromFilterList(filterValue);
            }
            this.updateCounter();
            this.rearrangeList();
        },

        addToFilterList: function (filterValue) {
            this.filterList[this.activeFilter].push(filterValue);
            if (this.filterList[this.activeFilter].length === 1) {
                news.pubsub.emit(options.events.hideFace);
            }
            news.pubsub.emit(options.events.showFace, [filterValue]);
        },

        removeFromFilterList: function (filterValue) {
            this.filterList[this.activeFilter].splice(this.filterList[this.activeFilter].indexOf(filterValue), 1);

            if (this.filterList[this.activeFilter].length === 0) {
                news.pubsub.emit(options.events.showFace);
            } else {
                news.pubsub.emit(options.events.hideFace, [filterValue]);
            }
        },

        setupFilterCounter: function () {
            var $list = news.$('.' + options.classes.listLi);
            var $indicator = news.$('.' + options.classes.indicator);

            var totalProfilesArray = new Array($list.length + 1);
            this.totalProfiles = totalProfilesArray.length - 1;
            $indicator.prepend(totalProfilesArray.join('<li class="' + options.classes.indicatorLi + ' ' + options.classes.activeIndicatorLi + '"></li>'));
        },

        updateCounter: function () {
            var $listItems = news.$('.' + options.classes.listLi);
            var $filteredListItems = news.$('.' + options.classes.filteredListLi);
            var $indicatorItems = news.$('.' + options.classes.indicatorLi);
            var $counter = news.$('.' + options.classes.filterCounter);

            var filteredCount = $filteredListItems.length;

            if (filteredCount === 0 && this.filterList.hasOwnProperty(this.activeFilter) && this.filterList[this.activeFilter].length === 0) {
                filteredCount = $listItems.length;
            }
            $indicatorItems.removeClass(options.classes.activeIndicatorLi)
                .slice(0, filteredCount).addClass(options.classes.activeIndicatorLi);
            $counter.text(filteredCount + '/' + this.totalProfiles + ' women');
        },

        rearrangeList: function () {
            if (!options.functions.isMobileView()) {
                var $list = news.$('.' + options.classes.list);
                var $listItems = news.$('.' + options.classes.listLi);
                var $filteredListItems = news.$('.' + options.classes.filteredListLi);
                var $unfilteredListItems = $listItems.not('.' + options.classes.filteredListLi);

                var sortCallback = function (a, b) {
                    var a_idnum = a.id.match(/\d+$/)[0];
                    var b_idnum = b.id.match(/\d+$/)[0];
                    return a_idnum - b_idnum;
                };

                if ($filteredListItems.length === $listItems.length) {
                    $listItems.detach().sort(sortCallback).appendTo($list);
                } else {
                    $filteredListItems.detach().sort(sortCallback).prependTo($list);
                    $unfilteredListItems.detach().sort(sortCallback).appendTo($list);
                }
            }
        }
    };

    return Filters;
});