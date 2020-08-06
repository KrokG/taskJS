let countFilesAll = 0;

function getFiles(setFiles = 0){
	//
	let img = document.getElementsByClassName('picture-box__img');
	let name = document.getElementsByClassName('picture-box__name');
	//
	let progressBar = document.getElementById("progressBar");
	let barText = document.getElementById("barText");
	//
	//console.log(img.length);
	//
	let files
	if(setFiles === 0){
		files = document.querySelector('input[type=file]').files;
	}
	else{
		files = setFiles;
	}
	//
	let reader =  new FileReader();
	//console.log(files[0])
	iteration = 0;
	countFiles = files.length;
	//console.log("get files = " + countFiles)
	reader.readAsDataURL(files[iteration]);
	reader.onloadend = function(event){
		//create preview picture
		if(countFilesAll < img.length){
			img[countFilesAll].src = reader.result;
			img[countFilesAll].style.opacity = "1";
			name[countFilesAll].innerHTML = files[iteration].name;
			name[countFilesAll].style.opacity = "1";
		} else {
			//console.log("er");
			// mesage about " don't have place "
		}
		//
		//console.log("прочтено!!!" + countFiles);
		countFilesAll++;
		iteration++;
		if(iteration < countFiles){
			reader.readAsDataURL(files[iteration]);
		}
	}

	reader.onprogress = function(event){
		let progress = event.loaded/event.total*100;
		barText.innerHTML = Math.round(progress) + " %";
		progressBar.value = progress;
	}
}

let dropArea = document.getElementsByClassName('select-files')[0];
['dragenter', 'dragover'].forEach(eventName => {dropArea.addEventListener(eventName, fileInBox, false)
})
function fileInBox (event) {
	event.preventDefault()
	dropArea.style.borderColor = "#722";
}

dropArea.addEventListener('dragleave', fileOutBox, false);
function fileOutBox(event){
	event.preventDefault()
	dropArea.style.borderColor = "#555";
}

dropArea.addEventListener('drop', handleDrop, false)
function handleDrop(event) {
	event.preventDefault()

	let dt = event.dataTransfer;
	let files = dt.files;
	//handleFiles(files);
	dropArea.style.borderColor = "#555";
	getFiles(files);
}



let pictureBox = document.getElementsByClassName("picture page__picture")[0];
let firstFile,secondFile;

pictureBox.onmousedown = function(event){
	let element = event.target.closest('div');
	if(element.className === "picture-box picture__container"){
		if(element.firstChild.nextElementSibling.currentSrc){
			this.ondragstart = function() {
				return false;
			}
			firstFile= element
		}
	}
}

pictureBox.onmouseup = function(event){
	let element = event.target.closest('div');
	if(element.className === "picture-box picture__container"){
		if(element.firstChild.nextElementSibling.currentSrc){
			secondFile = element;
			//console.log(element);
			let c = firstFile.cloneNode(true)
			c = secondFile.parentNode.replaceChild(c, secondFile);
			firstFile.parentNode.replaceChild(c, firstFile);
		}
	}
}
