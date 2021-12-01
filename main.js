//prediction variables
var prediction1 ="";
var prediction2 ="";
//making the webcam
Webcam.set({width:300,height:300,image_format:"png",png_quality:90});
//webcam and snapshot divs being stored in variables
var webcam_div = document.getElementById("webcam");
var snapshot_div = document.getElementById("snapshot");
//attatching the webcam to the webcam div
Webcam.attach(webcam_div);
//define function takesnapshot
function takesnapshot(){
    Webcam.snap(function(img_name)
    {document.getElementById("snapshot").innerHTML="<img id='image' src='"+img_name+"'>"}
    )
};
//linking model
var model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5enltO7i3/model.json",model_loaded);
//function call to confirm the model is loaded
function model_loaded(){
    console.log("Console: Teachable Machine Loaded")
}
//define function analyzesnapshot
function analyzesnapshot(){
    var image = document.getElementById("image");
    model.classify(image,get_results)
}
//define function get_results
function get_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log("Results: "+results)
        prediction1=results[0].label;
        prediction2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction1;
        document.getElementById("result_emotion_name2").innerHTML=prediction2;
        if(prediction1=="&#128522"){
            pred1code="smile"
        }
        if(prediction1=="&#128544"){
            pred1code="angry"
        }
        if(prediction1=="&#128563"){
            pred1code="surprised"
        }
        if(prediction1=="&#128567"){
            pred1code="mask"
        }
        if(prediction1=="&#128561"){
            pred1code="scared"
        }
        
        if(prediction2=="&#128522"){
            pred2code="smile"
        }
        if(prediction2=="&#128544"){
            pred2code="angry"
        }
        if(prediction2=="&#128563"){
            pred2code="surprised"
        }
        if(prediction2=="&#128567"){
            pred2code="mask"
        }
        if(prediction2=="&#128561"){
            pred2code="scared"
        }
        speak()
    }
}
//storing emoji decimal codes
pred1code="";
pred2code="";
//define function speak
function speak(){
    var Synth=window.speechSynthesis;
    var speakdata1="The emoji you matched with the most is "+pred1code;
    var speakdata2="The emoji you matched with the second best is "+pred2code;
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    Synth.speak(utterthis);
}