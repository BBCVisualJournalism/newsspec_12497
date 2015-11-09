define(['bootstrap', 'options'], function (news, options) {

    var Tooltips = function () {};

    Tooltips.prototype = {
        init: function () {
            news.pubsub.on(options.events.showTooltip, this.showTooltip.bind(this));
            news.pubsub.on(options.events.hideTooltip, this.hideTooltip.bind(this));
        },

        showTooltip: function ($thumbnail) {
            var $tooltip = $thumbnail.parent().find('.' + options.classes.tooltip);
            $tooltip.addClass(options.classes.activeTooltip);
            this.repositionTooltip($tooltip);
        },

        hideTooltip: function ($thumbnail) {
            $thumbnail.parent().find('.' + options.classes.tooltip)
                .removeClass(options.classes.activeTooltip)
                .removeClass(options.classes.leftTooltip)
                .removeClass(options.classes.rightTooltip);
        },

        repositionTooltip: function ($tooltip) {
            if (this.rightAlignTooltip($tooltip)) {
                $tooltip.addClass(options.classes.rightTooltip);
            } else {
                $tooltip.addClass(options.classes.leftTooltip);
            }
        },

        rightAlignTooltip: function ($tooltip) {
            var $list = news.$('.' + options.classes.list);
            return ($list.width() - ($tooltip.offset().left - $list.offset().left)) < ($tooltip.width() - parseFloat($tooltip.parent().css('margin-right')));
        }
    };

    return Tooltips;
});