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
                window.parent.scrollTo(0, 0);
            }
        },

        hideProfile: function () {
            var $facewall = news.$('.' + options.classes.facewall);
            var $profile = news.$('.' + options.classes.profileLi);

            $profile.removeClass(options.classes.activeProfileLi);
            $facewall.removeClass(options.classes.profileViewFacewall);
        },

        getIframeOffset: function () {},

        getListOffset: function () {},

        handleResize: function () {},

        setProfilePos: function () {},

        calcProfilePos: function () {},

        enableAutomaticRepositioning: function () {},

        disableAutomaticRepositioning: function () {}
    };

    return Profiles;
});