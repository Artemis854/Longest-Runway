var points = [
    /*[0, 20],
    [40, 0],
    [40, 20],
    [70, 50],
    [50, 70],
    [30, 50],
    [0, 50],*/
];

var lines = [];

function setup(){
    createCanvas(640, 480);
    frameRate(1/2);
}

function draw(){
    clear();
    n = 13;
    maxLength = 0;
    maxLine = [0, 0, 0, 0];
    for(i=0;i<n;i++){
        
        //Create point and push into array
        var v = [int(random(20, 600)), int(random(20, 440))];
        points.push(v);
        
        //Need at least two points to obtain a linear function
        if(points.length >= 2){
            //Retrieve points
            var x1 = points[i-1][0];
            var y1 = points[i-1][1];
            var x2 = v[0];
            var y2 = v[1];

            //Calculate slope(m) and y-intercept(b)
            var m = (y2 - y1)/(x2 - x1);
            var b = y1 - (m * x1)

            lines.push([m, b]);
        }
    }

    fill('#c0c0c0');
    stroke('#303030');
    beginShape();

    for(i=0;i<points.length;i++){
        v = points[i];
        vertex(v[0], v[1]);
    }

    endShape(CLOSE);

    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            if(j != i){
                x1 = points[i][0];
                x2 = points[j][0];
                y1 = points[i][1];
                y2 = points[j][1];
                
                var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                
                if(dist > maxLength){
                    maxLength = dist;
                    maxLine = [x1, y1, x2, y2];
                }
            }
        }
    }

    stroke('red');
    line(maxLine[0], maxLine[1], maxLine[2], maxLine[3]);
    console.log('Length: ' + maxLength);
    points = [];
}