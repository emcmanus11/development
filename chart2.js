$(document).ready(function () {
	$(".container").on("click", ".upvote_button, .downvote_button", function () {
		var container = $(this).siblings(".pie_container"),
		curr = container.find($(this).attr("data-name")), 
		curr_votes = $(curr).attr("data-votes");
		if (curr_votes === undefined) {
			$(curr).attr("data-votes", 1);
		} else {
			curr_votes = parseInt(curr_votes);
			$(curr).attr("data-votes", 1 + curr_votes);
		}
		update_chart($(this).siblings(".pie_container"));
	});
});

function update_chart (arg) {
	var up_child = arg.find(".pie_upvotes"),
	down_child = arg.find(".pie_downvotes"),
	up_num = $(up_child).attr("data-votes"),
	down_num = $(down_child).attr("data-votes"),
	total,
	percent_up,
	percent_down, 
	trans_deg;
	
	// Get numbers for percentages
	if (up_num === undefined) {
		up_num = 0;
	} else {
		up_num = parseInt(up_num);
	}
	if (down_num === undefined) {
		down_num = 0;
	} else {
		down_num = parseInt(down_num);
	}

	total = up_num + down_num;
	percent_up = up_num / total;
	percent_down = down_num / total;
	
	// Hides inital background color 
	down_child.addClass("clip");

	// Change color percentages of pie chart
	if (up_num > down_num) {
		trans_deg = 180-(360 * percent_up);
		if (trans_deg < 180) {
			trans_deg = -trans_deg;
		}
		down_child.css({
			"background-color": "green",
			"transform": "rotate("+trans_deg+"deg)"
		});
	} else {
		trans_deg = -360 * percent_down;
		down_child.css({
			"background-color": "red",
			"transform": "rotate("+trans_deg+"deg)"
		});
	}

}