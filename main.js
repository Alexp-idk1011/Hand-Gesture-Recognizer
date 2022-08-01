Webcam.set({
    width: 350, height: 300, image_format: 'png', png_quality: 90
});

Camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">'
    })
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/upk5z078A/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded")
}

function check() {
    img = document.getElementById("capture_image");

    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);

        document.getElementById("result_emotion1").innerHTML = results[0].label;
        gesture = results[0].label;
        toSpeak = "";

        if(gesture == "OK") {
            toSpeak = "This is looking like you are putting up the OK Gesture."
            document.getElementById("update_emoji1").innerHTML = "&#128076"
        }
        else if(gesture == "Peace") {
            toSpeak = "This is looking like you are showing the Peace Symbol."
            document.getElementById("update_emoji1").innerHTML = "&#9996"
        }
        else if(gesture == "Crossed Fingers") {
            toSpeak = "This is looking like you are Crossing your Fingers."
            document.getElementById("update_emoji1").innerHTML = "&#129310"
        }
        else if(gesture == "Pointing Up") {
            toSpeak = "This is looking like you're Pointing Up."
            document.getElementById("update_emoji1").innerHTML = "&#9757"
        }
        else if(gesture == "Thumbs Up/Down") {
            toSpeak = "This is looking like you're showing a thumbs up or down."
            document.getElementById("update_emoji1").innerHTML = "&#128078"
        }
        else if(gesture == "Waves") {
            toSpeak = "This is looking like you're Waving."
            document.getElementById("update_emoji1").innerHTML = "&#9995"
        }
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}