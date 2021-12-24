var status_obj="";
song="";
objects=[];
function preload(){
song=loadSound("alert.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function draw(){
    image(video,0,0,380,380);
    if(status_obj!=""){
        r=Math.floor(random(255));
        g=Math.floor(random(255));
        b=Math.floor(random(255));
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: objects detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            textSize(18);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="baby found";
                song.stop();
            }
            else{
                song.play();
                document.getElementById("number_of_objects").innerHTML="baby not found";
            }
        }
        if(objects.length==0){
            song.play();
            document.getElementById("number_of_objects").innerHTML="baby not found";
        }
    }
}
function modelLoaded(){
    console.log("modelLoaded");
    status_obj=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}