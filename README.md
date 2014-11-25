development
===========
CS1300 Project

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

TODO
===========
Add options to change color and size

Known Bugs
===========
None