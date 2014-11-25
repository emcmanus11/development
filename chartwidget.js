
	// the widget definition, where "development" is the namespace,
    // "pieChart" the widget name
    $.widget( "development.pieChart", {
    	// default options
    	options: {
    		upvote_color: "green",
    		downvote_color: "red"
	    },
	    
		// the constructor
		_create: function() {
			// number of upvotes
			this.data_upvote = 0,
    		
    		// number of downvotes
			this.data_downvote = 0

			this.element.addClass("container");
			
			// pie chart and button container
			this.pie_container = $( "<div>", {
				"class": "pie_container"
			})
			.appendTo( this.element );

			// upvote portion of pie
			this.pie_upvotes = $( "<div>", {
				"data-votes": "0",
				"class": "pie_circle pie_upvotes"
			})
			.appendTo( this.pie_container );
			
			// downvote portion of pie
			this.pie_downvotes = $( "<div>", {
				"data-votes": "0",
				"class": "pie_circle pie_downvotes"
			})
			.appendTo( this.pie_container );
			
			// upvote button
			this.upvote_button = $( "<div>", {
				text: "+",
				"data-name": ".pie_upvotes",
				"class": "button upvote_button"
			})
			.appendTo( this.element );

			// downvote button
			this.downvote_button = $( "<div>", {
				text: "-",
				"data-name": ".pie_downvotes",
				"class": "button downvote_button"
			})
			.appendTo( this.element );

			// bind click events on the upvote button to update_data
			this._on( this.upvote_button, {
				click: "update_data"
			});

			// bind click events on the downvote button to update_data
			this._on( this.downvote_button, {
				click: "update_data"
			});
		},

		// onclick event -- adds one to counter
		update_data: function(e) {
			var isDownVote = e.currentTarget.classList.contains("downvote_button");
			if (isDownVote) {
				this.data_downvote += 1;
			} else {
				this.data_upvote += 1;
			}
			this.update_chart();	
		}, 

		update_chart: function(){
			var up_num = this.data_upvote,
			down_num = this.data_downvote,
			down_child = this.pie_downvotes,
			total = up_num + down_num,
			percent_up = up_num / total,
			percent_down = down_num / total;

			// Removes default gray color
			down_child.addClass("clip")

			// Calculates percentage to show of each color
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
		},

		// events bound via _on are removed automatically
		// revert other modifications here
		_destroy: function() {
			// remove generated elements
			this.pie_container.remove();
			this.pie_upvotes.remove();
			this.pie_downvotes.remove();
			this.upvote_button.remove();
			this.downvote_button.remove();

			this.element
				.removeClass( "container" )
				.css( "background-color", "transparent" );
		},
  	});