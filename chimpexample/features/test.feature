Feature: search the web

	As a human
	I want to search the web
	So I can find information

	@watch
	Scenario: Search for "gmail.com"
	Given I have visited Google
	When I search for "gmail.com"
	Then I see "gmail.com"