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

//=======[ Settings & Data ]===================================================

// DEFAULT SETTINGS IN CASE USER DONT SELECT THEM
const DEFAULT_MQTT_HOST       = "localhost";
const DEFAULT_MQTT_PORT       = 9001;
const DEFAULT_MQTT_PATH       = "/mqtt";
const DEFAULT_MQTT_CLIENT     = "web-mqtt-client-" + parseInt(Math.random() * 100, 10);
const DEFAULT_MQTT_TOPIC_SUB  = "#";
const DEFAULT_MQTT_TOPIC_PUB  = "status";
const DEFAULT_MQTT_PAYLOAD    = "{'status': 'running'}";
// UNIQUE SETTINGS OF APPLICATION
const MQTT_TIMEOUT            = 3;
const MQTT_TLS_FLAG           = false
const MQTT_CLEAN_SESSION_FLAG = true;
const MQTT_RECONNECT_TIMEOUT  = 2000;
const MQTT_USERNAME           = null;
const MQTT_PASSWOD            = null;

// The object where Paho MQTT instance is
var MqttClientObj;


//=======[ MQTT Management ]===================================================

function Mqtt_LogSettings(mqttHost, mqttPort, mqttClient){
    View_AppendLogData(LogLevel.INFO, 
        "Trying connection to: " + 
        mqttHost + ":" + 
        mqttPort + "/" +
        mqttClient
        );
}

function Mqtt_OnSuccess(){
    View_AppendLogData(LogLevel.INFO, "Connected to MQTT Broker correctly");
}

function Mqtt_OnFailure(message) {
    View_AppendLogData(LogLevel.ERROR, "Connection failed: " + message.errorMessage + ". Retrying...");
    setTimeout(App_ConnectToMqttBroker, MQTT_RECONNECT_TIMEOUT);
}

function Mqtt_OnConnectionLost(message) {
    setTimeout(App_ConnectToMqttBroker, MQTT_RECONNECT_TIMEOUT);
    View_AppendLogData(LogLevel.ERROR, "Connection lost: " + message.errorMessage + ". Reconnecting...");
};

function Mqtt_OnMessageArrived(message) {
    var topic = message.destinationName;
    var payload = message.payloadString;
    View_AppendLogData(LogLevel.INFO, "Received message: '" + topic + "' -> " + payload)
};

//=======[ Module main code ]==================================================

function App_SubscribeMqttTopic(){
    // get topic value from UI or set default one
    let topic = Utils_GetElementValue("mqtt_topic_subscription");
    if (Utils_IsInvalidValue(topic)){
        topic = DEFAULT_MQTT_TOPIC_SUB;
    }
    // Try subscription to topic
    MqttClientObj.subscribe(topic, {qos: 0});
    // log action done
    View_AppendLogData(LogLevel.INFO, "Subscribed to topic: '" + topic + "'");
}

function App_PublishMqttTopic(){
    // get topic value from UI or set default one
    let topic = Utils_GetElementValue("mqtt_topic_publish");
    if (Utils_IsInvalidValue(topic)){
        topic = DEFAULT_MQTT_TOPIC_PUB;
    }
    // get payload value from UI or set default one
    let payload = Utils_GetElementValue("mqtt_payload_publish");
    if (Utils_IsInvalidValue(payload)){
        payload = DEFAULT_MQTT_PAYLOAD;
    }
    // Send the message to broker
    let message = new Paho.MQTT.Message(payload);
    message.destinationName = topic;
    MqttClientObj.send(message); 
    // log action done
    View_AppendLogData(LogLevel.INFO, "Publishing topic: '" + topic + "' -> '" + payload + "'");
}

function App_ConnectToMqttBroker(){
    // obtain the HTML elements in a friendly way (assign default if needed)
    let mqttHost   = Utils_GetElementValue("mqtt_host");
    if (Utils_IsInvalidValue(mqttHost)){
        mqttHost = DEFAULT_MQTT_HOST;
    }
    let mqttPort   = Utils_GetElementValue("mqtt_port");
    if (Utils_IsInvalidValue(mqttPort)){
        mqttPort = DEFAULT_MQTT_PORT;
    } else {
        mqttPort = parseInt(mqttPort);
    }
    let mqttClient = Utils_GetElementValue("mqtt_client"); 
    if (Utils_IsInvalidValue(mqttClient)){
        mqttClient = DEFAULT_MQTT_CLIENT;
    }
    // Show current settings
    Mqtt_LogSettings(mqttHost, mqttPort, mqttClient);
    // connection option settings
    let timeout      = MQTT_TIMEOUT;
    let useTLS       = MQTT_TLS_FLAG;
    let cleanSession = MQTT_CLEAN_SESSION_FLAG;
    // authentication settings
    let username     = MQTT_USERNAME;
    let password     = MQTT_PASSWOD;
    // Create the client object from user settings
    MqttClientObj = new Paho.MQTT.Client(mqttHost, mqttPort, mqttClient);
    // Set connection config options
    var mqttOptions = {
        timeout      : timeout,
        useSSL       : useTLS,
        cleanSession : cleanSession,
        onSuccess    : Mqtt_OnSuccess,
        onFailure    : Mqtt_OnFailure
    };
    // Add authentication option if needed
    if (username != null) {
        mqttOptions.userName = username;
        mqttOptions.password = password;
    }
    // Set event callbacks
    MqttClientObj.onConnectionLost = Mqtt_OnConnectionLost;
    MqttClientObj.onMessageArrived = Mqtt_OnMessageArrived;
    // TODO: maybe here a good place to log current configuration
    MqttClientObj.connect(mqttOptions);
}

//=======[ End of file ]=======================================================
