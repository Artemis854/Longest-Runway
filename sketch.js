var n = 7;

var points = [
    [0, 0],
    [50, 0],
    [50, 50],
    [40, 50],
    [25, 20],
    [10, 50],
    [0, 50]
];

var lines = [];
var maxLine = 0;

function setup(){
    createCanvas(640, 480);
    noLoop();
}

function draw(){

    fill('#ccc'); //Add background color to polygon
    beginShape(); //Begin polygon shape
    for(i=0; i<n; i++){ //Add vertices to shape from points array
        vertex(points[i][0], points[i][1]);

        if(i >= 1){
            x1 = points[i-1][0];
            y1 = points[i-1][1];
            x2 = points[i][0];
            y2 = points[i][1];

            lines.push({x : {a : x1, b : x2-x1}, y : {a : y1, b : y2-y1}});
        }
    }

    x1 = points[n-1][0];
    y1 = points[n-1][1];
    x2 = points[0][0];
    y2 = points[0][1];

    lines.push({x : {a : x1, b : x2-x1}, y : {a : y1, b : y2-y1}});

    translate(width/2, height/2);
    scale(3.0);
    endShape(CLOSE); //End polygon and close last line
    console.log(lines); //Checking lines array

    //Check all lines for max length using the points array
    //Initiate a new line and cross reference with the lines array for intersections
    for(i=0; i<n-1; i++){
        //Initialize the first vertex coordinates
        x1 = points[i][0];
        y1 = points[i][1];

        for(j=i+1; j<n; j++){
            //Initialize the second vertex coordinates
            x2 = points[j][0];
            y2 = points[j][1];

            //Create temporary line object for current set of vertices
            tLine = {x : {a : x1, b : x2-x1}, y : {a : y1, b : y2-y1}};
        }
    }
}