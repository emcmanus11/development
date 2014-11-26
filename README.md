development
===========
CS1300 Project

NOTE: ONLY TESTED ON CHROME. 
IT PROBABLY WON'T WORK FOR IE < 9. 
IT WILL QUESTIONABLY WORK ON SAFARI OR FIREFOX

I created a widget that replaces the upvote / downvote bar with a pie chart to display the results in a different, more readable way than the existing percentage bar. Every site that I've seen uses a bar to show the percentages of upvotes and downvotes for a given submission (ex reddit, imgur, etc.). I find the pie chart more intuitive, and the upvote / downvote buttons are on top of / below each other, respectively, instead of next to each other, making the upvoting / downvoting more intuitive since one is "up" and the other is "down". 


How to Use
===========
In your html, include the following scripts:
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script type="text/javascript" src="chartwidget.js"></script>

this style sheet: 
<link rel="stylesheet" href="chartwidget.css"></link>

and any identifiable div, say
<div id="chart"></div>

Lastly, call pieChart() on your identifiable div
$("#chart").pieChart();
	options you can add: 
		data_upvote --> Number of upvotes a chart should display
		data_downvote --> Number of downvotes a chart should display
		normalchart --> boolean indicating whether the chart should act as 
			an upvote/downvote chart or a normal pie chart
		callback --> called after an end user has upvoted or downvoted on 
			a chart. 

TODO
===========
Add options to change color and size

Known Bugs
===========
None