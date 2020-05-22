export const GLOBALS = {
	addClass: function(element:HTMLElement, classname:string):void{
		if(!this.hasClass(element,classname)){
			let classes = element.className;
			element.className = classes+" "+classname;
		}
	},

	removeClass: function(element:HTMLElement,classname:string):void{
		let newClassName = "";
		let i;
		let classes = element.className.split(" ");
		for(i = 0; i < classes.length; i++) {
			if(classes[i] !== classname) {
				newClassName += classes[i] + " ";
			}
		}
		element.className = newClassName;
	},

	hasClass: function(element:HTMLElement,classname:string){
		let flag = false;
		let i;
		let classes = element.className.split(" ");
		for(i = 0; i < classes.length; i++) {
			if(classes[i] === classname) {
				flag = true;
			}
		}
		return flag;
	},

	AJAXCALL: function(url:string, method:string, formData:FormData, callbackFunc:Function, debugMode:boolean, params:any,callbackFuncError:Function, paramsError:any, flag_template:number):void{
		let request = new XMLHttpRequest();
		
		request.onload = function (data:any) {
			if(debugMode){
				console.info("DEBUG AJAX",data.currentTarget.responseText);
			}
			if(flag_template == 1){
				if(callbackFunc){
					callbackFunc(data.currentTarget.responseText,params);
				}
			}
			else{
				let response;
				try {
					response = JSON.parse(data.currentTarget.responseText); 
				} catch (error) {
					console.info("DEbug", error);
					console.info("DEbug", data.currentTarget.responseText);
					response = {"response": "error"};
				}
				if (response.response == "ok") {
					if(callbackFunc){
						callbackFunc(response,params);
					}
				}
				else{
					if(callbackFuncError){
						callbackFuncError(response,paramsError)
					}
				}
			}
		};
		request.addEventListener("loadstart", function (data) {
			
		});

		request.addEventListener("loadend", function (data) {
			
		});

		request.open(method, url, true);
		/* request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); */
		if(formData)
			request.send(formData);
		else	
			request.send();
	},

	validateEmail: function(email:string):boolean {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},

	msToTime: function(duration:number):Array<string> {
		let milliseconds =  ((( duration %1000)/10)).toString();
		let seconds =  (((duration/1000)%60)).toString();
		let minutes = ((duration/(1000*60))%60).toString();

		milliseconds = (parseInt(milliseconds) < 10) ? "0" + milliseconds : milliseconds;
		minutes = (parseInt(minutes) < 10) ? "0" + minutes : minutes;
		seconds = (parseInt(seconds) < 10) ? "0" + seconds : seconds;
		var array_time = [];
		array_time[0] = minutes;
		array_time[1] = seconds;
		array_time[2] = milliseconds;
		return array_time;
	},

	pad: function(pad:string, str:string, padLeft:boolean) {
		if (typeof str === 'undefined') 
			return pad;
		if (padLeft) {
			return (pad + str).slice(-pad.length);
		} else {
			return (str + pad).substring(0, pad.length);
		}
	},

	chunkSubstr: function(str:string, size:number):Array<string> {
		const numChunks = Math.ceil(str.length / size);
		const chunks = new Array(numChunks);
	
		for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
			chunks[i] = str.substr(o, size);
		}
	
		return chunks;
	}
}