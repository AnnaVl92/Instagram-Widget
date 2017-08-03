$(document).ready(function() {
	window.instagramWidget=function(){
		
		function widgetViewModel(){
			var self = this;

			self.userImages = ko.observableArray();
		}

		var widgetModel = new widgetViewModel();

		return {
			init: function(selector,userId,token,imagesAmount,skipAmount) {
				var element = $(selector);

				$.get('widget_template.html', function(template) {
		       		element.html(template);
		       		ko.applyBindings(widgetModel,element[0])
		    	});

				$.get("https://api.instagram.com/v1/users/"+userId+"/media/recent/?access_token="+token,
					function(data) {
						console.log(data);
						var publicationLink = data.data[0].link;
						var images = data.data[0].carousel_media;
						skipAmount = parseInt(skipAmount);
						imagesAmount = parseInt(imagesAmount);
						images = images.slice(skipAmount,skipAmount+imagesAmount);
						var userImages = [];
						images.forEach(function(item,index) {
							userImages.push({imgLink:item.images.thumbnail.url,commonLink:publicationLink});
						});
						widgetModel.userImages(userImages);
				});
			}
		}
	}();
});