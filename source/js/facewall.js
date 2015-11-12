define(['bootstrap', 'options', 'filters', 'profiles', 'tooltips'], function (news, options, Filters, Profiles, Tooltips) {

    // Function.prototype.bind() polyfill
    // ref: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                FNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof FNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            if (this.prototype) {
                FNOP.prototype = this.prototype;
            }
            fBound.prototype = new FNOP();
            return fBound;
        };
    }

    // Array.prototype.indexOf() polyfill
    // ref: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) { return -1; }
            var n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) { n = 0; }
            if (n >= len) { return -1; }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) { return k; }
                k++;
            }
            return -1;
        };
    }

    var Facewall = function () {
        this.filters = new Filters();
        this.profiles = new Profiles();
        this.tooltips = new Tooltips();
    };

    Facewall.prototype = {
        init: function () {
            var $body = news.$('body');
            $body.removeClass('no-js');
            if (!('ontouchstart' in document.documentElement)) {
                $body.addClass('no-touch');
            }
            this.filters.init();
            this.profiles.init();
            this.tooltips.init();
            this.setEvents();
        },

        setEvents: function () {
            news.pubsub.on(options.events.showFace, this.showFace.bind(this));
            news.pubsub.on(options.events.hideFace, this.hideFace.bind(this));

            var $filterTab = news.$('.' + options.classes.filterTab);
            var $filterCheckbox = news.$('.' + options.classes.filterCheckbox);
            var $thumbnail = news.$('.' + options.classes.thumbnail);
            var $profileWrapper = news.$('.' + options.classes.profileWrapper);
            var $backToFacewallButton = news.$('.' + options.classes.backToFacewallButton);

            $filterTab.on('click', function (e) {
                e.preventDefault();
                news.pubsub.emit(options.events.filterTabClicked, [news.$(this)]);
            });

            $filterCheckbox.on('change', function () {
                news.pubsub.emit(options.events.applyFilter, [news.$(this).val()]);
            });

            $thumbnail.on('click', function (e) {
                e.preventDefault();
                news.pubsub.emit(options.events.showProfile, [news.$(this)]);
            });

            $thumbnail.on('mouseover', function (e) {
                if (news.$('body').hasClass('no-touch')) {
                    var $allThumbnails = news.$('.' + options.classes.thumbnail);
                    news.pubsub.emit(options.events.hideTooltip, [$allThumbnails]);
                    news.pubsub.emit(options.events.showTooltip, [news.$(this)]);
                }
            });

            $thumbnail.on('mouseout', function (e) {
                if (news.$('body').hasClass('no-touch')) {
                    news.pubsub.emit(options.events.hideTooltip, [news.$(this)]);
                }
            });

            $thumbnail.on('focus', function () {
                var $allThumbnails = news.$('.' + options.classes.thumbnail);
                news.pubsub.emit(options.events.hideTooltip, [$allThumbnails]);
                news.pubsub.emit(options.events.showTooltip, [news.$(this)]);
            });

            $thumbnail.on('blur', function () {
                news.pubsub.emit(options.events.hideTooltip, [news.$(this)]);
            });

            $backToFacewallButton.on('click', function () {
                news.pubsub.emit(options.events.hideProfile);
            });
        },

        showFace: function (filterSuffix) {
            var $listItem;
            if (filterSuffix) {
                $listItem = news.$('.' + options.classes.listLiBase + filterSuffix);
            } else {
                $listItem = news.$('.' + options.classes.listLi);
            }
            $listItem.addClass(options.classes.filteredListLi);
        },

        hideFace: function (filterSuffix) {
            var $listItem;
            if (filterSuffix) {
                $listItem = news.$('.' + options.classes.listLiBase + filterSuffix);
            } else {
                $listItem = news.$('.' + options.classes.listLi);
            }
            $listItem.removeClass(options.classes.filteredListLi);
        }
    };

    return Facewall;
});