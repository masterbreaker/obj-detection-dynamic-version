img="";
status="";
objects=[];


function setup(){
    canvas=createCanvas(360,360);
    canvas.center();
video=createCapture(VIDEO);
video.size(360,360);
video.hide()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status:detecting objects"
}



function modelloaded(){
console.log("modelloaded");
status=true;
objectDetector.detect(img,gotResult);


}

function gotResult(error,results){
    if(error){
        console.log(error)

    }
    else{
        console.log(results)
        objects=results;
    }



}

function preload(){
    img=loadImage("dog_cat.jpg")

}

function draw(){
    image(video,0,0,360,360);
    
   

    if(status != ""){
        objectDetector.detect(video,gotResult)
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status:objects detected";
            document.getElementById("numbers_of_object").innerHTML="numbers of objects detected are : "+objects.length;
            fill(r,g,b);

            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width ,objects[i].height);
        
        }
    }
}

