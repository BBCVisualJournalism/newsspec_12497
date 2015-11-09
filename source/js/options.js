define(['bootstrap'], function (news) {
    var options = {
        classes: {
            facewall: 'facewall',
            profileViewFacewall: 'facewall_profile_view',
            title: 'facewall_title',
            cta: 'facewall_cta',
            list: 'facewall_list',
            listLi: 'facewall_list_item',
            filteredListLi: 'facewall_list_item_filtered',
            listLiBase: 'facewall_list_item_',      // .facewall_list_item_[filtername]-[filtervalue]
            thumbnail: 'facewall_thumbnail',
            tooltip: 'facewall_tooltip',
            activeTooltip: 'facewall_tooltip_active',
            leftTooltip: 'facewall_tooltip_left',
            rightTooltip: 'facewall_tooltip_right',
            profileWrapper: 'facewall_profile_wrapper',
            profileUl: 'facewall_profile_list',
            profileLi: 'facewall_profile',
            activeProfileLi: 'facewall_profile_active',
            backToFacewallButton: 'back_to_facewall',
            filters: 'facewall_filters',
            indicator: 'filter_indicator',
            indicatorLi: 'filter_indicator_item',
            activeIndicatorLi: 'filter_indicator_item_active',
            filterTab: 'filter_tab',
            activeFilterTab: 'filter_tab_active',
            filterFieldset: 'filter',
            activeFilterFieldset: 'filter_active',
            filterCheckbox: 'filter_checkbox',
            filterCounter: 'filter_counter'
        },
        ids: {
            listLiBase: 'facewall_list_item_',      // #facewall_list_item_[id]
            profileLiBase: 'facewall_',             // #facewall_[id]
            filterFieldsetBase: 'filter_',          // #filter_[filtername]
            filterCheckboxBase: 'filter_checkbox_' // #filter_checkbox_[filtername]-[filtervalue]
        },
        events: {
            showFace: 'facewall:showface',
            hideFace: 'facewall:hideface',
            updateCounter: 'facewall:updatecounter',
            showProfile: 'facewall:showprofile',
            hideProfile: 'facewall:hideprofile',
            faceMouseOver: 'facewall:facemouseover',
            faceMouseOut: 'facewall:facemouseout',
            filterTabClicked: 'filters:tabclicked',
            applyFilter: 'filters:applyfilter',
            backToFacewall: 'stickywidget:backtofacewall',
            showStickyWidget: 'stickywidget:showstickywidget',
            windowScrollTo: 'window:ScrollTo'
        },
        vars: {
            defaultFilter: 'filter'
        },
        functions: {
            isMobileView: function () {
                return news.$(window).width() <= 600;
            }
        }
    };

    return options;
});