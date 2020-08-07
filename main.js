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
	let onLoadedFiles = 0;
	//
	let files
	if(setFiles === 0){
		files = document.querySelector('input[type=file]').files;
	}
	else{
		files = setFiles;
	}
	//
	let filesSize = 0;
	for (let i = 0; files.length > i; i++) {
		filesSize += files[i].size;
	}
	console.log(filesSize + " - size files");
	//
	let reader =  new FileReader();
	//console.log(files[0])
	iteration = 0;
	countFiles = files.length;
	//console.log("get files = " + countFiles)
	reader.readAsDataURL(files[iteration]);
	reader.onloadend = function(event){
		onLoadedFiles += files[iteration].size;
		console.log("size file = " + onLoadedFiles)
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
		console.log(event.total);

		let progress = (onLoadedFiles + event.total)/filesSize*100;
		barText.innerHTML = Math.round(progress) + " %";
		progressBar.value = progress;
	}
}

let dropArea = document.getElementsByClassName('select-files')[0];
['dragenter', 'dragover'].forEach(eventName => {dropArea.addEventListener(eventName, fileInBox, false)
})
function fileInBox (event) {
	event.preventDefault()
	dropArea.style.borderColor = "#68a";
	dropArea.style.backgroundColor = "#d1d1d1"
}

dropArea.addEventListener('dragleave', fileOutBox, false);
function fileOutBox(event){
	event.preventDefault()
	dropArea.style.borderColor = "#555";
	dropArea.style.backgroundColor = "#f1f1f1"
}

dropArea.addEventListener('drop', handleDrop, false)
function handleDrop(event) {
	event.preventDefault()

	let dt = event.dataTransfer;
	let files = dt.files;
	//handleFiles(files);
	dropArea.style.borderColor = "#555";
	dropArea.style.backgroundColor = "#f1f1f1"
	getFiles(files);
}


/*
let pictureBox = document.getElementsByClassName("picture page__picture")[0];
let firstFile,secondFile;

pictureBox.onmousedown = function(event){
	let element = event.target.closest('div');
	if(element.className === "picture-box picture__container"){
		if(element.firstChild.nextElementSibling.currentSrc){
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
}*/

let pictureBox = document.getElementsByClassName("picture page__picture")[0];
let firstFile,secondFile;
let flag = true;
pictureBox.addEventListener('dragstart', dragEl, false)
function dragEl(event){
	let element = event.target.closest('div');
	if(element.className === "picture-box picture__container"){
		if(element.firstChild.nextElementSibling.currentSrc){
			firstFile= element;
		}
	}
}

pictureBox.addEventListener('dragover', dragoverEl, false)
function dragoverEl(event){
	event.preventDefault();
	event.stopPropagation();
	let element = event.target.closest('div');
	if(element.className === "picture-box picture__container"){
		if(element.firstChild.nextElementSibling.currentSrc){
			if(firstFile == element){
				flag = false;
			} else{
				secondFile = element;
				flag = true;
			}
		}
	}
}


pictureBox.addEventListener('dragleave', dragleaveEl, false)
function dragleaveEl(event){
	event.preventDefault()
	let element = event.target.closest('div');
	if(element.className === "picture-box picture__container")
		if(element.firstChild.nextElementSibling.currentSrc)
			flag = false;
}

pictureBox.addEventListener('drop', dropEl, false)
function dropEl(event){
	if(flag){
		let buffer = firstFile.cloneNode(true)
		buffer = secondFile.parentNode.replaceChild(buffer, secondFile);
		firstFile.parentNode.replaceChild(buffer, firstFile);
		flag = false;
	}
}

