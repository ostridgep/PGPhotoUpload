var images = [];
var $imagesDiv;

document.addEventListener("deviceready", init, false);
function init() {
	
	$("#addPicture").on("touchend", selPic);
	$imagesDiv = $("#images");	
	$("#uploadPictures").on("touchend", uploadPics);
}

function selPic() {
	navigator.camera.getPicture(function(f) {
		var newHtml = "<img src='"+f+"'>";
		$imagesDiv.append(newHtml);
		images.push(f);
		if(images.length === 1) {
			$("#uploadPictures").removeAttr("disabled");
		}
	}, function(e) {
		alert("Error, check console.");
		console.dir(e);
	}, { 
		quality: 50,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		destinationType: Camera.DestinationType.FILE_URI
	});
	
}

function uploadPics() {
	console.log("Ok, going to upload "+images.length+" images.");
	

	images.forEach(function(i) {
		console.log('processing '+i);
		

		function win(r) {
			console.log(r.response);
			
		}

		function fail(error) {
		    console.log("upload error source " + error.source);
		  
		}

		
		
		  var options = new FileUploadOptions();
		   options.fileKey="file";
		   options.fileName=i.substr(i.lastIndexOf('/')+1);
		   //options.mimeType="image/jpeg";

		   
		   options.chunkedMode = false;

		   var ft = new FileTransfer();
		  
		   ft.upload(i, "http://192.168.1.20/FileUpload.php", win, fail, options);
		
	});


}