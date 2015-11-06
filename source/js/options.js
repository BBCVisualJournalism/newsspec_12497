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
            hoverListLi: 'facewall_list_item_hover',
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
            activeIndicatorItem: 'filter_indicator_item_active',
            filterTab: 'filter_tab',
            activeFilterTab: 'filter_tab_active',
            filterFieldset: 'filter',
            activeFilterFieldset: 'filter_active',
            filterCheckbox: 'filter_checkbox'
        },
        ids: {
            listLiBase: 'facewall_list_item_',      // #facewall_list_item_[id]
            profileLiBase: 'facewall_',             // #facewall_[id]
            filterFieldsetBase: 'filter_',          // #filter_[filtername]
            filterCheckboxBase: 'filter_checkbox_'  // #filter_checkbox_[filtername]_[filtervalue]
        },
        events: {
            showFace: 'facewall:showface',
            hideFace: 'facewall:hideface',
            showFaceIfFiltered: 'facewall:showface:hover',
            hideFaceIfFiltered: 'facewall:hideface:unhover',
            displayProfile: 'facewall:displayprofile',
            hideProfile: 'facewall:hideprofile',
            updateCounter: 'facewall:updatecounter',
            filterTabClicked: 'filters:tabclicked',
            applyFilter: 'filters:applyfilter',
            backToFacewall: 'stickywidget:backtofacewall',
            showStickyWidget: 'stickywidget:showstickywidget',
            windowScrollTo: 'window:ScrollTo'
        },
        functions: {
            isMobileView: function () {
                return news.$(window).width() <= 600;
            }
        }
    };

    return options;
});