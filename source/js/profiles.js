define(['bootstrap', 'options'], function (news, options) {

    var Profiles = function () {
        this.iframeOffset = { top: 0, left: 0 };
        this.listOffset = { top: 0, left: 0 };
    };

    Profiles.prototype = {
        init: function () {
            var mobileView = options.functions.isMobileView();

            news.pubsub.on(options.events.showProfile, this.showProfile.bind(this));
            news.pubsub.on(options.events.hideProfile, this.hideProfile.bind(this));

            var self = this;
            news.$(window).on('resize', function () {
                self.handleResize();
            });

            if (!mobileView) {
                var $firstThumbnail = news.$('.' + options.classes.thumbnail).first();
                this.showProfile($firstThumbnail);
            }

            this.iframeOffset = this.getIframeOffset();
            this.listOffset = this.getListOffset();

            if (mobileView) {
                this.disableAutomaticRepositioning();
            } else {
                this.enableAutomaticRepositioning();
            }
        },

        showProfile: function ($thumbnail) {
            var $facewall = news.$('.' + options.classes.facewall);
            var $profile = news.$($thumbnail.attr('href'));

            $profile.addClass(options.classes.activeProfileLi)
                .siblings().removeClass(options.classes.activeProfileLi);
            if (options.functions.isMobileView()) {
                $facewall.addClass(options.classes.profileViewFacewall);
                window.parent.scrollTo(0, this.iframeOffset.top);
            }
        },

        hideProfile: function () {
            var $facewall = news.$('.' + options.classes.facewall);
            var $profile = news.$('.' + options.classes.profileLi);

            $profile.removeClass(options.classes.activeProfileLi);
            $facewall.removeClass(options.classes.profileViewFacewall);
        },

        getIframeOffset: function () {
            var newIframeOffset;
            try {
                newIframeOffset = news.$(window.parent.document).find('.responsive-iframe').offset();
            } catch (e) {
                console.log('Couldn\'t find iframe, iframeOffset set to 0,0.');
                newIframeOffset = { top: 0, left: 0 };
            }
            return newIframeOffset;
        },

        getListOffset: function () {
            return news.$('.' + options.classes.list).offset();
        },

        handleResize: function () {
            this.iframeOffset = this.getIframeOffset();
            this.listOffset = this.getListOffset();

            if (options.functions.isMobileView()) {
                this.disableAutomaticRepositioning();
            } else {
                this.enableAutomaticRepositioning();
                this.setProfilePos();
            }
        },

        setProfilePos: function () {
            news.$('.' + options.classes.profileWrapper)
                .css('margin-top', this.calcProfilePos(news.$(window.parent, window.parent.document).scrollTop()) + 'px');
        },

        calcProfilePos: function (myScrollTop) {
            var listHeight = news.$('.' + options.classes.list).outerHeight();
            var profileHeight = news.$('.' + options.classes.profileWrapper).outerHeight();
            var scrollBreakpoint = (listHeight + this.iframeOffset.top + this.listOffset.top) - profileHeight;
            var maxScrollPos = listHeight - profileHeight;
            var optimumScrollPos = myScrollTop;

            if (myScrollTop > this.iframeOffset.top + this.listOffset.top) {
                optimumScrollPos = myScrollTop - (this.iframeOffset.top + this.listOffset.top) + 10;
            } else {
                optimumScrollPos = 0;
            }

            if (listHeight < profileHeight) {
                maxScrollPos = 0;
            }

            if (myScrollTop >= scrollBreakpoint) {
                return maxScrollPos;
            } else {
                return optimumScrollPos;
            }
        },

        enableAutomaticRepositioning: function () {
            var self = this;
            news.$(window.parent.document, window.parent.document).ready(function () {
                news.$(window.parent, window.parent.document).on('scroll', function () {
                    self.setProfilePos();
                });
            });
        },

        disableAutomaticRepositioning: function () {
            news.$('.' + options.classes.profileWrapper).css('margin-top', 0);
            news.$(window.parent, window.parent.document).unbind('scroll');
        }
    };

    return Profiles;
});