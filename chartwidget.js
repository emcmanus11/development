
	// the widget definition, where "development" is the namespace,
    // "pieChart" the widget name
    $.widget( "development.pieChart", {
    	// default options
    	options: {
    		upvote_color: "green",
    		downvote_color: "red",
    		data_upvote: 0,
    		data_downvote: 0,
    		normalchart: false,
    		callback: null
	    },
	    
		// the constructor
		_create: function() {
			// number of upvotes
			this.data_upvote = this.options.data_upvote,//0,
    		
    		// number of downvotes
			this.data_downvote = this.options.data_downvote

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

			this.upvote_button_label = $( "<span>", {
				text: this.data_upvote,
				"class": "upvote_label"
			})
			.appendTo(this.element);

			// downvote button
			this.downvote_button = $( "<div>", {
				text: "-",
				"data-name": ".pie_downvotes",
				"class": "button downvote_button"
			})
			.appendTo( this.element );

			this.downvote_button_label = $( "<span>", {
				text: this.data_downvote,
				"class": "downvote_label"
			})
			.appendTo(this.element);


			// bind click events on the upvote button to update_data
			this._on( this.upvote_button, {
				click: "delegate_task"
			});

			// bind click events on the downvote button to update_data
			this._on( this.downvote_button, {
				click: "delegate_task"
			});
			this.update_chart();
		},
		_setOption: function( key, value ) {
	        this._super( key, value );
	    },

	    _setOptions: function( options ) {
	        this._super( options );
	        this.update_data_chart();
	    },

	    delegate_task: function(e) {
	    	if (this.options.normalchart) {
	    		this.update_data_chart(e);
	    		this.update_label();
	    	} else {
	    		this.update_data(e);
	    	}
	    },

	    update_data: function(e) {
			var isDownVote = e.currentTarget.classList.contains("downvote_button");
			if (isDownVote) {
				if (this.upvoted) {
					this.data_downvote += 1;
					this.data_upvote -= 1;	
					this.upvoted = false;
					this.downvoted = true;

				} else if (!this.downvoted) {
					this.data_downvote += 1;
					this.downvoted = true;
				} else {
					this.data_downvote -= 1;
					this.downvoted = false;
				}
			} else {
				if (this.downvoted) {
					this.data_downvote -= 1;
					this.data_upvote += 1;	
					this.upvoted = true;
					this.downvoted = false;
				} else if (!this.upvoted) {
					this.data_upvote += 1;
					this.upvoted = true;
				} else {
					this.data_upvote -= 1;
					this.upvoted = false;
				}
			}
			this.update_label();
			this.update_buttons();
			this.update_chart();	
			this._trigger( "callback" );
		}, 

		update_buttons: function() {
			if (this.upvoted) {
				this.upvote_button.css('opacity', '1');
			} else {
				this.upvote_button.css('opacity', '0.5');
			}

			if (this.downvoted) {
				this.downvote_button.css('opacity', '1');
			} else {
				this.downvote_button.css('opacity', '0.5');
			}
		},

		update_label: function() {
			console.log("HIHI");
			this.upvote_button_label.text(this.data_upvote);
			this.downvote_button_label.text(this.data_downvote);
		},

		// onclick event -- adds one to counter
		update_data_chart: function(e) {
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
			if (total > 0) {
				down_child.addClass("clip");
			} else {
				down_child.removeClass("clip");
				down_child.css({
					"background-color": "gray"
				});
			}

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
				if (total > 0) {
					trans_deg = -360 * percent_down;
					down_child.css({
						"background-color": "red",
						"transform": "rotate("+trans_deg+"deg)"
					});
				}
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
			this.upvote_button_label.remove();
			this.downvote_button_label.remove();

			this.element
				.removeClass( "container" )
				.css( "background-color", "transparent" );
		},
  	});

