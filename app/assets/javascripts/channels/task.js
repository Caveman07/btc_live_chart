//= require cable
//= require three_hour_chart
//= require_self
//= require_tree .


(function() {
    // Subscrive to the class name of the channel
    App.tasks = App.cable.subscriptions.create('PriceChannel', {
        /**
         * Whenever this channel pushes content, it is received here
         */

         connected: function() {
            // Called when the subscription is ready for use on the server
            console.log("connected")
          },

          disconnected: function() {
            // Called when the subscription has been terminated by the server
            console.log("disconnected")
          },

        received: function(data) {


              console.log(data['data'].slice(-1)[0])
              var newChart = new Chart(data['data'])

        }
    });
}).call(this);
