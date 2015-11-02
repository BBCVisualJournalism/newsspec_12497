Feature: 100 Women Facewall

  English only. No custom sharing URLs.

  Release: Wednesday 18 November
  Promote: Thursday 19 November

  Scenario: Landing page - universal elements (all devices)
    When I first land on the page
    Then I should see a title
    And I should see a call to action
    And I should see a series of filters
    And I should see a filter counter

  Scenario: Landing page - Mobile
    When I first land on the page
    Given I am on a mobile device
    Then I should just see the list of thumbnails

  Scenario: Landing page - Desktop
    When I first land on the page
    Given I am on a tablet or wider device
    Then I should see the list of thumbnails
    And I should see the first person's bio pre-loaded on the right

  Scenario: Selecting a thumbnail - Mobile
    Given I am on a mobile device
    When I select a thumbnail
    Then I should be taken to the bio of my selected person
    And I should be able to scroll up and down to view other bios
    And I should see a button that can take me back to the facewall

  Scenario: Getting out of 'selected thumbnail' view - Mobile
    Given I am on a mobile device
    And I have selected a thumbnail
    When I press the button that offers to take me back to the facewall
    Then the bio should disappear
    And I should see the previous state of the facewall
    And any previously selected filters should be retained

  Scenario: Selecting a thumbnail - Desktop
    When I select a thumbnail
    Then the bio on the right should be replaced with that of my selected person

  Scenario: Hovering over a face on desktop
    Given I am on desktop
    When I hover over a face
    Then I should see a label underneath the thumbnail

  Scenario: Selecting a filter - universal
    When I select a filter
    Then the thumbnails that apply to the filter appear at the top

  Scenario: Selecting a filter - mobile
    Given I am on a mobile device
    And I have selected a filter
    Then I should only see the thumbnails that apply to the filter
    # Because we want to keep the mobile page short

  Scenario: Selecting a filter - desktop
    Given I am on a tablet or wider device
    And I have selected a filter
    And the filtered thumbnails should retain their ordering
    And all of the thumbnails that don't apply to the filter drop to the bottom
    And they retain their ordering within the unfiltered faces
    And they should be faded slightly