/***************************/
/*******Helpers*************/
/***************************/

var drewLine = function(a, b){
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

var distance = function(a,b){
  return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));
}

var middle = function(a, b){
  var c ={
    x: Math.round((a.x+b.x)/2),
    y: Math.round((a.y+b.y)/2)
  }
  return c;
}

var angle = function(ab, bc, ac){
  return Math.acos((Math.pow(ac, 2)+Math.pow(bc, 2)-Math.pow(ab, 2)) / (2*ac*bc) );
}

var direction =function(a,b){
  var ang = Math.acos((b.x - a.x) / distance(a, b));
  if (a.y - b.y > 0){
    ang = -ang;
  }
  return (ang + Math.PI * 2) % (Math.PI * 2);
}

var drawAngle = function(point, dirA, dirB){
    dirB += Math.PI;              // revers second direction
    var sweepAng = dirB - dirA;   // angle between lines
    var startAng = dirA;          // angle to start the sweep of the arc
    if(Math.abs(sweepAng) > Math.PI){  // if the angle us greater the 180
        sweepAng = Math.PI * 2 - sweepAng;  // get the smaller angle
        startAng = dirB;          // and change the start angle
    }
    ctx.beginPath();
    if(sweepAng < 0){                  // if the angle is sweeping anticlockwise
        ctx.arc(point.x, point.y, minDist ,startAng + sweepAng , startAng);
    }else{                        // draw clockwise angle
        ctx.arc(point.x, point.y, minDist, startAng, startAng + sweepAng);
    }
    ctx.stroke();                 // all done
}

var drawTriangle = function(a, b, c){
  var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      function drawAngle(point, dirA, dirB){
          dirB += Math.PI;              // revers second direction
          var sweepAng = dirB - dirA;   // angle between lines
          var startAng = dirA;          // angle to start the sweep of the arc
          if(Math.abs(sweepAng) > Math.PI){  // if the angle us greater the 180
              sweepAng = Math.PI * 2 - sweepAng;  // get the smaller angle
              startAng = dirB;          // and change the start angle
          }
          ctx.beginPath();
          if(sweepAng < 0){                  // if the angle is sweeping anticlockwise
              ctx.arc(point.x, point.y, minDist ,startAng + sweepAng , startAng);
          }else{                        // draw clockwise angle
              ctx.arc(point.x, point.y, minDist, startAng, startAng + sweepAng);
          }
          ctx.stroke();                 // all done
      }
      var mid_ab = middle(a,b);
      var mid_bc = middle(b, c);
      var mid_ac = middle(a, c);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.lineTo(a.x, a.y);
      ctx.stroke();
      // now work out the radius of the angle stroke
      var dist1 = distance(a, b);  // get the 3 distance of the lines
      var dist2 = distance(b, c);
      var dist3 = distance(c, a);

      // writing the distanceד  
      ctx.fillText(dist1.toFixed(0), mid_ab.x, mid_ab.y);
      ctx.fillText(dist2.toFixed(0), mid_bc.x, mid_bc.y);
      ctx.fillText(dist3.toFixed(0), mid_ac.x, mid_ac.y);

      var minDist = Math.min(dist1, dist2, dist3); // get the min dist;
      if(minDist === 0){
        return; // there are no angles to draw and exit 
                // to avoid divide by zero in direction function
      }

      minDist /= 5; // get the angle arc radius 1/5th

      var dir1 = direction(a, b);  // get the 3 directions of the lines
      var dir2 = direction(b, c);
      var dir3 = direction(c, a);

      drawAngle(a, dir1, dir3); // draw the angle stoke first corner;
      drawAngle(b, dir2, dir1); // draw the angle stoke second corner;
      drawAngle(c, dir3, dir2); // draw the angle stoke third;

      var angA = angle(dist1, dist2, dist3)*180/Math.PI;
      var angB = angle(dist3, dist1, dist2)*180/Math.PI;
      var angC = angle(dist2, dist3, dist1)*180/Math.PI;
      console.log(angA);
      console.log(angB);
      console.log(angC);

    }
}

var main = function(){

  $('.second-view').hide();

  $('.submit').on('click', function(event){
    event.preventDefault();
    var a = {
      x: parseInt($('#ax').val()),
      y: parseInt($('#ay').val())
    }
    var b = {
      x: parseInt($('#bx').val()),
      y: parseInt($('#by').val())
    }
    var c = {
      x: parseInt($('#cx').val()),
      y: parseInt($('#cy').val())
    }
    // console.log("points are:");
    // console.log('A(' + $('#ax').val() +',' + $('#ay').val() + ')');
    drawTriangle(a, b, c);
    $('.first-view').hide();
    $('.second-view').show();
  });

  $('.back').on('click', function(event){
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('.first-view').show();
    $('.second-view').hide();
  });

}

$(document).ready(main);