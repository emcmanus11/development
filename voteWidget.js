
	// the widget definition, where "development" is the namespace,
    // "vote" the widget name
    $.widget( "development.vote", $development.chartwidget, {
    	// default options
    	options: {
    		// number of upvotes
    		data_upvote: 0,
    		// number of downvotes
    		data_downvote: 0,

    		callback: null
	    },
	    
		// the constructor
		_create: function() {
			this.downvoted = false,
			this.upvoted = false,

			this._super();
			// number of upvotes
			// this.data_upvote = 0,
    		
    		// number of downvotes
			// this.data_downvote = 0
		},

		_setOption: function( key, value ) {
	        this._super( key, value );
	    },
	    _setOptions: function( options ) {
	        this._super( options );
	        this.refresh();
	    },

		// onclick event -- adds one to counter
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
				}
			}
			this.update_chart();	
			this._trigger( "callback" );
		}, 

		update_chart: function(){
			this._super();
		},

		// events bound via _on are removed automatically
		// revert other modifications here
		_destroy: function() {
			// remove generated elements
			this.upvoted.remove();
			this.downvoted.remove();
			this._super();
		},
  	});