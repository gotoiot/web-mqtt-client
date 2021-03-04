/* MIT License

Copyright (c) 2021 Agustin Bassi (github.com/agustinBassi)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

//=======[ Data definitions ]==================================================

const LogLevel = {
	ERROR: "error",
	WARN: "warn",
	INFO: "info",
	DEBUG: "debug",
}

//=======[ Settings & Data ]===================================================

const DEFAULT_LOG_LINES = 50;

//=======[ Utils ]=============================================================

function View_ShowHelp(){
    // Get the modal
    var modal = document.getElementById("help_modal");
    // Get the button that opens the modal
    var btn = document.getElementById("help_link");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function View_ShowLogData(log_level, data) {
    if (!View_IsLogFreeze()){
        var json_response = JSON.parse(data);
        log_text = Utils_GetLogTextPrefix(log_level) + data;
        document.getElementById("logs_textarea").innerHTML = log_text;
        View_AdjustLogArea();
    }
}


function View_AppendLogData(log_level, data) {
    if (!View_IsLogFreeze()){
        let log_lines = Utils_GetElementValue("log_lines");
        if (Utils_IsInvalidValue(log_lines)){
            log_lines = DEFAULT_LOG_LINES;
        }
        current_value = document.getElementById("logs_textarea").value; 
        if (current_value.split("\n").length-1 >= log_lines){
            View_ClearLogData();
            current_value = "";
        } 
        log_text = Utils_GetLogTextPrefix(log_level) + data;
        document.getElementById("logs_textarea").innerHTML = log_text + "\n" + current_value;
        View_AdjustLogArea();
    }
}


function View_ClearLogData(){
    console.log("Clearing view data")
    document.getElementById("logs_textarea").innerHTML = "";
    View_AdjustLogArea();
}


function View_AdjustLogArea() {
    element = document.getElementById("logs_textarea");
    element.style.height = "15px";
    element.style.height = (element.scrollHeight)+"px";
}


function View_IsLogFreeze(){
    return document.getElementById("log_freeze").checked;
}


function Utils_GetLogTextPrefix(log_level){
    var now = new Date();
    var log_text = (now.getHours() < 10? "0" + now.getHours(): now.getHours()) + ":";
    log_text += (now.getMinutes() < 10? "0" + now.getMinutes(): now.getMinutes()) + ":";
    log_text += (now.getSeconds() < 10? "0" + now.getSeconds(): now.getSeconds()) + " ";
    switch (log_level) {
        case LogLevel.ERROR:
            log_text += "[ERROR]"
            break;
        case LogLevel.WARN:
            log_text += "[WARN ]"
            break;
        case LogLevel.INFO:
            log_text += "[INFO ]"
            break;
        case LogLevel.DEBUG:
            log_text += "[DEBUG]"
            break;
        default:
            log_text += "[INFO ]"
    }
    log_text += " - "
    return log_text
}


function Utils_GetElementValue(element_to_get){
    // TODO: Evaluate other element types like checkbox, dropdown, etc.
    return document.getElementById(element_to_get).value;
}


function Utils_IsInvalidValue(value){
    if (value == null || value == "" || value == "undefined"){
        return true;
    }
    return false;
}

//=======[ End of file ]=======================================================
