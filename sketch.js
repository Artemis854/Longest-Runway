

/*var points = [
    [0, 0],
    [50, 0],
    [50, 50],
    [40, 50],
    [25, 20],
    [10, 50],
    [0, 50]
];*/

var points = [
    [90,0],
    [90,60],
    [80,50],
    [60,60],
    [50,40],
    [40,60],
    [0,0],
    [30,40],
    [50,0],
    [80,40]
]

var n = points.length;
var m;

/*
     * 9,0
     * 9,6
     * 8,5
     * 6,6
     * 5,4
     * 4,6
     * 0,0
     * 3,4
     * 5,0
     * 8,4
     */

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

        if(i >= 1){ //Start adding lines once more than 1 vertex is read
            x1 = points[i-1][0];
            y1 = points[i-1][1];
            x2 = points[i][0];
            y2 = points[i][1];

            //Lines are added as parametric equations allowing for vector manipulation
            //Store as: v = a + tb for (x,y) = (xa, ya) + t(xb, yb)
            lines.push({x : {a : x1, b : x2-x1}, y : {a : y1, b : y2-y1}});
        }
    }

    //Initiate lines counter, used later in CheckIntersection
    m = lines.length;

    //Extra case for last element in vectors array, 
    //need to accomadate for the last and first vectors
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

            //CheckIntersection
            //Find all intersections with current vector created with all vectors of polygon
            for(k=0; k<m; k++){

                //Store (a,b) values for both lines to solve for t
                //    (x1,y1) = tLine, (x2, y2) = lines[k]

                //Only need 3 variables after equating the two parametric equations
                //ex. (x1,y1) = (x1a,y1a) + t(x1b,y1b), and (x2,y2) = (x2a,y2a) + s(x2b,y2b)
                //    (x1 = x2) => 
                //    (x1a + t*x1b = x2a + s*x2b) => 
                //    (t*x1b - s*x2b = x2a - x1a) =>
                //    (px - qx = rx)

                var px = tLine['x']['b'];
                var qx = lines[k]['x']['b'];
                var rx = lines[k]['x']['a'] - tLine['x']['a']; 

                //Same with y
                //    (py - qy = ry)

                var py = tLine['y']['b'];
                var qy = lines[k]['y']['b'];
                var ry = lines[k]['y']['a'] - tLine['y']['a'];


                //t is the value when entered into the respective parametric equation
                //results in the intersection coordinate

            }

            //Store all intersections found, except if it is an endpoint
            //Find the closest intersections
            //Calculate length, compare and assign to maxLine if applicable
        }
    }
}