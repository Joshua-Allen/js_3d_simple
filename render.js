var current_canvas
var current_context

var running;
var interval;

var rayCanvas;
var ctx_ray;

var mainCanvas;
var ctx_3d;

var walls = [];

// wait for the html to load
window.onload = function(){
	rayCanvas = document.getElementById("rayCanvas");
	ctx_ray = rayCanvas.getContext("2d");
	
	mainCanvas = document.getElementById("3dCanvas");
	ctx_3d = mainCanvas.getContext("2d");
	
	//rayCanvas.style.cursor = "none";
	
	current_canvas = rayCanvas;
	current_context = ctx_ray;
	
	create_world();
	set_mouseListeners();
	set_keyListeners();
	
	running = true;
	interval = setInterval(render, 1000/30);
}

//
function create_world(){
	new_wall(0,0, 32, 32);
	new_wall(0,32, 32, 32);
	new_wall(0,64, 32, 32);
	new_wall(0,96, 32, 32);
	new_wall(0,128, 32, 32);
	new_wall(0,160, 32, 32);
	new_wall(0,192, 32, 32);
	new_wall(0,224, 32, 32);
	new_wall(0,256, 32, 32);
	new_wall(0,288, 32, 32);
	new_wall(0,320, 32, 32);
	new_wall(0,352, 32, 32);
	new_wall(32,352, 32, 32);
	new_wall(64,352, 32, 32);
	new_wall(96,352, 32, 32);
	new_wall(160,352, 32, 32);
	new_wall(128,352, 32, 32);
	new_wall(192,352, 32, 32);
	new_wall(224,352, 32, 32);
	new_wall(256,352, 32, 32);
	new_wall(288,352, 32, 32);
	new_wall(320,352, 32, 32);
	new_wall(352,352, 32, 32);
	new_wall(352,320, 32, 32);
	new_wall(352,288, 32, 32);
	new_wall(352,256, 32, 32);
	new_wall(352,224, 32, 32);
	new_wall(352,192, 32, 32);
	new_wall(352,160, 32, 32);
	new_wall(352,128, 32, 32);
	new_wall(352,96, 32, 32);
	new_wall(352,64, 32, 32);
	new_wall(352,32, 32, 32);
	new_wall(352,0, 32, 32);
	new_wall(320,0, 32, 32);
	new_wall(288,0, 32, 32);
	new_wall(256,0, 32, 32);
	new_wall(224,0, 32, 32);
	new_wall(192,0, 32, 32);
	new_wall(160,0, 32, 32);
	new_wall(128,0, 32, 32);
	new_wall(96,0, 32, 32);
	new_wall(64,0, 32, 32);
	new_wall(32,0, 32, 32);
	new_wall(160,32, 32, 32);
	new_wall(160,64, 32, 32);
	new_wall(160,96, 32, 32);
	new_wall(128,192, 32, 32);
	new_wall(96,192, 32, 32);
	new_wall(64,192, 32, 32);
	new_wall(224,96, 32, 32);
	new_wall(288,64, 32, 32);
	new_wall(288,96, 32, 32);
	new_wall(288,128, 32, 32);
	new_wall(192,288, 32, 32);
	new_wall(192,256, 32, 32);
	new_wall(224,256, 32, 32);
	new_wall(256,256, 32, 32);
	new_wall(288,256, 32, 32);
	new_wall(160,256, 32, 32);
	new_wall(160,224, 32, 32);
	new_wall(160,192, 32, 32);
	new_wall(224,192, 32, 32);
}

// sim functions
function start() {
	if (!running)
	{
		running = true;
		//interval = setInterval(render, 1000/30);
	}
}
function stop() {
	if (running)
	{
		running = false;
		//clearInterval(interval);
	}
}
function reset(){

}

// main render
function render(){
	current_canvas = mainCanvas;
	current_context = ctx_3d;
	
	draw_clear();	
	
	current_canvas = rayCanvas;
	current_context = ctx_ray;	
	
	draw_clear();
	
	for	(i = 0; i < walls.length; i++) {
		draw_set_color("#000000");
		draw_rect(walls[i].x,walls[i].y,walls[i].width,walls[i].height);
		draw_set_color("#FFFFFF");
		draw_rect(walls[i].x+2,walls[i].y+2,walls[i].width-4,walls[i].height-4);
	}	
	
	debug();
}

function debug(){
	player_update();
	
	var x_from = player.x;
	var y_from = player.y;
	
	var view_rez = .1;
	var max_view_dist = 500;
	
	var ray_dist = [];
	
	//
	current_canvas = rayCanvas;
	current_context = ctx_ray;
	// cast a ray in all directions of the view
	var fov = 90;
	var view_angle;
	for (view_angle = -(fov/2); view_angle<=fov/2; view_angle+=view_rez) {
		var x_to = x_from + lengthdir_x(max_view_dist, player.direction+view_angle);
		var y_to = y_from + lengthdir_y(max_view_dist, player.direction+view_angle);
		
		var hitpoint = collision_line_point(x_from, y_from, x_to, y_to);
		var dist = -1;
		
		if (hitpoint == 0) {
			draw_set_color("#0000FF");
			draw_line(x_from, y_from, x_to, y_to);
		} else {
			if (hitpoint.hit)
			{
				draw_set_color("#FF0000");
				draw_circle(hitpoint.x, hitpoint.y, 5);
				dist = hitpoint.distance;
			}
			
			draw_line(x_from, y_from, x_to, y_to);
		}
		
		
		
		dist *= Math.cos( toRadians(view_angle) );
		
		ray_dist.push({distnce:dist, side:hitpoint.side});
	}
	
	//
	current_canvas = mainCanvas;
	current_context = ctx_3d;
	// draw a bar for each dist
	var bar_width = current_canvas.width/ray_dist.length
	var i;	
	for (i = 0; i<ray_dist.length; i+=1){
		var ray_distance = ray_dist[i].distnce;
		var ray_side = ray_dist[i].side;
		
		var bar_height = current_canvas.height;
		if (ray_distance == -1) {
			draw_set_color("#000000");
		} else {
			var color = color_new(0,0,0,1);;
			if (ray_side == 0) color = color_new(255,0,0,1);
			if (ray_side == 1) color = color_new(0,255,0,1);
			if (ray_side == 2) color = color_new(0,0,255,1);
			if (ray_side == 3) color = color_new(255,255,0,1);
			
			var dist = clamp(ray_distance/max_view_dist,0,1);
			
			var new_color = merge_color(color_new(0,0,0,1), color, 1-dist)
			
			draw_set_color(color_getJScolor(new_color));	

			bar_height = current_canvas.height - current_canvas.height*dist;
		}
		
		
		var top = current_canvas.height/2-(bar_height/2);
		var bottom = bar_height;

		draw_rect(current_canvas.width-(bar_width)-(i*bar_width), top, bar_width+1, bottom);

		draw_set_color("#000000");
		//
		var off_height = (current_canvas.height-bar_height)/2;
		draw_rect(current_canvas.width-(bar_width)-(i*bar_width), 0, bar_width+1, off_height);
		draw_rect(current_canvas.width-(bar_width)-(i*bar_width), current_canvas.height-off_height, bar_width+1, off_height);
	}
}





// objects
function new_wall(x, y, width, height){
	var wall = {
		x: x,
		y: y,
		width: width,
		height: height
	};

	walls.push(wall);
}

//
function collision_line_point(x1, y1, x2, y2){
	var angle = point_direction(x1, y1, x2, y2);

	var bestPoint = 0;
	var i;
	for	(i = 0; i < walls.length; i++) {
		var hitpoint = line_getIntersection_rect(
				{x1:x1, y1:y1, x2:x2, y2:y2}, 
				{x1:walls[i].x, y1:walls[i].y, 
				x2:walls[i].x+walls[i].width, y2:walls[i].y+walls[i].height});
		
		if (hitpoint.hit) {
			if (bestPoint == 0) {
				bestPoint = hitpoint;
			} else {
				if (bestPoint.distance > hitpoint.distance){
					bestPoint = hitpoint;
				}
			}
		}
	}
	
	return bestPoint;
}

function line_getIntersection_rect(line, rect) {

	// left
	if (line.x1 < rect.x1) {
		var hitPoint = line_getIntersection_line(line, 
				{x1:rect.x1, y1:rect.y1, x2:rect.x1, y2:rect.y2})
		if (hitPoint.hit) 
			return {
				x: hitPoint.x,
				y: hitPoint.y,
				hit: hitPoint.hit,
				side: 3,
				distance: point_distance(line.x1, line.y1, hitPoint.x, hitPoint.y)
				};
	}
	
	// right
	if (line.x1 > rect.x2) {
		var hitPoint = line_getIntersection_line(line, 
				{x1:rect.x2, y1:rect.y1, x2:rect.x2, y2:rect.y2})
		if (hitPoint.hit) 
			return {
				x: hitPoint.x,
				y: hitPoint.y,
				hit: hitPoint.hit,
				side: 1,
				distance: point_distance(line.x1, line.y1, hitPoint.x, hitPoint.y)
				};
	}
	
	// up
	if (line.y1 < rect.y1) {
		var hitPoint = line_getIntersection_line(line, 
				{x1:rect.x1, y1:rect.y1, x2:rect.x2, y2:rect.y1})
		if (hitPoint.hit) 
			return {
				x: hitPoint.x,
				y: hitPoint.y,
				hit: hitPoint.hit,
				side: 0,
				distance: point_distance(line.x1, line.y1, hitPoint.x, hitPoint.y)
				};
	}
	
	// down
	if (line.y1 > rect.y2) {
		var hitPoint = line_getIntersection_line(line, 
				{x1:rect.x1, y1:rect.y2, x2:rect.x2, y2:rect.y2})
		if (hitPoint.hit) 
			return {
				x: hitPoint.x,
				y: hitPoint.y,
				hit: hitPoint.hit,
				side: 2,
				distance: point_distance(line.x1, line.y1, hitPoint.x, hitPoint.y)
				};
	}
	
	return {
		x: 0,
		y: 0,
		hit: false,
		side: 0,
		distance: 0
	};
}
function line_getIntersection_line(line1, line2) {
	var result = {
		x:0,
		y:0,
		hit:false
	};
	
	var Ax = line1.x1;
	var Ay = line1.y1;
	var Bx = line1.x2;
	var By = line1.y2;
	var Cx = line2.x1;
	var Cy = line2.y1;
	var Dx = line2.x2;
	var Dy = line2.y2;


	var d = ((Bx-Ax)*(Dy-Cy)-(By-Ay)*(Dx-Cx));
	if (d == 0) d = 0.00001; 
	var r = ((Ay-Cy)*(Dx-Cx)-(Ax-Cx)*(Dy-Cy)) / d;

	d = ((Bx-Ax)*(Dy-Cy)-(By-Ay)*(Dx-Cx));
	if (d == 0) d = 0.00001; 
	var s = ((Ay-Cy)*(Bx-Ax)-(Ax-Cx)*(By-Ay)) / d;


	//The intersection coordinate, if any:
	var Px = Ax + r*(Bx-Ax);
	var Py = Ay + r*(By-Ay);

	if ((0<=r) && (r<=1) && (0<=s) && (s<=1)) {  
		result.hit = true;
		result.x = Px;
		result.y = Py;
	}
	return result;
	///////////////////////////////////////////////////////
	/*
	var Adx = line1.x2-line1.x1;
	var Ady = line1.y2-line1.y1;

	var Bdx = line2.x2-line2.x1;
	var Bdy = line2.y2-line2.y1;
	
	var determinator=Bdy*Adx-Bdx*Ady;
	
	if (determinator == 0) {
		return result;
		
	} else {
		var dx = line1.x1-line2.x1;
		var dy = line1.y1-line2.y1;
		
		var Aposition = (Bdx*dy-Bdy*dx)/determinator;	 
		var Bposition = (Adx*dy-Ady*dx)/determinator;
		
		Aposition = clamp(Aposition, 0, 1);
		Bposition = clamp(Bposition, 0, 1);
		
		//point on line A
		//var Apx = line1.x1+Aposition*Adx;
		//var Apy = line1.y1+Aposition*Ady;
		
		//point on line B
		var Bpx = line2.x1+Bposition*Bdx;
		var Bpy = line2.y1+Bposition*Bdy;
		
		result.hit = true;
		result.x = Bpx;
		result.y = Bpy;
	}
	
	return result;
	
	*/
	////////////////////////////////////////////////////////
	/*
	var a1,a2,b1,b2,c1,c2,o1,o2,o3,o4,t;

	a1 = line1.y2 - line1.y1;
	b1 = -(line1.x2 - line1.x1);
	c1 = -a1*line1.x1 - b1*line1.y1;

	a2 = line2.y2 - line2.y1;
	b2 = -(line2.x2 - line2.x1);
	c2 = -a2*line2.x1 - b2*line2.y1;

	//Testing
	o1 = a1*line2.x1 + b1*line2.y1 + c1;
	o2 = a1*line2.x2 + b1*line2.y2 + c1;
	o3 = a2*line1.x1 + b2*line1.y1 + c2;
	o4 = a2*line1.x2 + b2*line1.y2 + c2;

	if (((o3 < 0 && o4 < 0) || (o3 > 0 && o4 > 0)) || ((o1 < 0 && o2 < 0) || (o1 > 0 && o2 > 0)))
		return result;

	t = a1*b2 - a2*b1;
	if (t == 0)
		return result;

	result.hit = true;
	result.x = (b1*c2 - b2*c1)/t;
	result.y = (b1*c2 - b2*c1)/t;

	draw_set_color("#FF0000");
	draw_circle(result.x, result.y, 5);
	
	return result;*/
}



function collision_line(x1, y1, x2, y2){
	var i, wall, hit1, hit2, hit3, hit4, w, h, x4, y4;
	for	(i = 0; i < walls.length; i++) {
		wall = walls[i];
		
		w = wall.x + wall.width;
		h = wall.y + wall.height;
		
		hit1 = lines_intersect(x1,y1,x2,y2, 
					wall.x, wall.y, w, wall.y, true);
		hit2 = lines_intersect(x1,y1,x2,y2,
					wall.x, h, w, h,true);
		hit3 = lines_intersect(x1,y1,x2,y2,
					wall.x, wall.y,wall.x,h,true);
		hit4 = lines_intersect(x1,y1,x2,y2,
					w,wall.y,w,h,true);
		
		if (hit1 || hit2 || hit3 || hit4)
		{
			return true;
		}
	}
	return false;
}
function collision_point(x,y){
	var i;
	for	(i = 0; i < walls.length; i++) {
		if (x>walls[i].x && x<walls[i].x+walls[i].width &&
			y>walls[i].y && y<walls[i].y+walls[i].height)
		{
			return true;
		}
	}
	return false;
}

//
function lines_intersect(x1,y1,x2,y2,x3,y3,x4,y4,segment) {
    var ua, ub, ud, ux, uy, vx, vy, wx, wy;
    ua = 0;
    ux = x2 - x1;
    uy = y2 - y1;
    vx = x4 - x3;
    vy = y4 - y3;
    wx = x1 - x3;
    wy = y1 - y3;
    ud = vy * ux - vx * uy;
	
    if (ud != 0) 
    {
        ua = (vx * wy - vy * wx) / ud;
        if (segment) 
        {
            ub = (ux * wy - uy * wx) / ud;
            if (ua < 0 || ua > 1 || ub < 0 || ub > 1) ua = 0;
        }
    }
	
	if (ua > 0 && ua <= 1)
		return true;
	else
		return false;
}


// player
var player = {
	x: 45,
	y: 54,
	direction:0
};
var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
function player_update() {
	if (Key.isDown(Key.UP)) {
		player.x += lengthdir_x(3,player.direction);
		player.y += lengthdir_y(3,player.direction);
	}
	if (Key.isDown(Key.LEFT)) {
		player.direction += 2;
	}
	if (Key.isDown(Key.DOWN)) {
		player.x -= lengthdir_x(3,player.direction);
		player.y -= lengthdir_y(3,player.direction);
	}
	if (Key.isDown(Key.RIGHT)) {
		player.direction -= 2;
	}
	
	if (player.direction < 0) player.direction+=360;
	if (player.direction > 360) player.direction-=360;
}

function set_keyListeners(){
	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

	
	/*
	window.addEventListener('keydown', function(event) {
	  switch (event.keyCode) {
		case 37: // Left
		  //Game.player.moveLeft();
		break;

		case 38: // Up
			player.x += lengthdir_x(3,player.direction);
			player.y += lengthdir_y(3,player.direction);
		  //Game.player.moveUp();
		break;

		case 39: // Right
		  //Game.player.moveRight();
		break;

		case 40: // Down
			player.x -= lengthdir_x(3,player.direction);
			player.y -= lengthdir_y(3,player.direction);
		  //Game.player.moveDown();
		break;
	  }
	}, false);*/
}


// mouse
var mouse = {
	x: 0,
	y: 0,
	over:false,
	down:false
};
function set_mouseListeners(){
	rayCanvas.addEventListener('mousemove', function(evt) {
		var rect = rayCanvas.getBoundingClientRect();
		mouse.x = Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*rayCanvas.width);
		mouse.y = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*rayCanvas.height);
	}, false);
	
	rayCanvas.addEventListener('mousedown', function(evt) {mouse.down = true;}, false);
	rayCanvas.addEventListener('mouseup', function(evt) {mouse.down = false;}, false);
	
	rayCanvas.addEventListener('mouseover', function(evt) { mouse.over = true;}, false);
	rayCanvas.addEventListener('mouseout', function(evt) { mouse.over = false;}, false);
}


//////////////////////////////////////////////////////////////////////
//js_math
//////////////////////////////////////////////////////////////////////
function point_distance(x1,y1,x2,y2){
	return Math.sqrt(((x1-x2)*(x1-x2)) + ((y2-y1)*(y2-y1)));
}
function point_direction(x1,y1,x2,y2) {

    //return ((Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI)-180)*-1;
	return ((Math.atan2(y2 - y1, x2 - x1)));//*-1;
	
}
function clamp(val, min, max){
	return Math.min(Math.max(val, min), max);
}
function toRadians(degree){
	return degree*(Math.PI/180);
}
function lengthdir_x(length, direction){
	return Math.cos(toRadians(direction))*length;
}
function lengthdir_y(length, direction){
	return -Math.sin(toRadians(direction))*length;
}

	
	
//////////////////////////////////////////////////////////////////////
//js_draw
//////////////////////////////////////////////////////////////////////
// color
function color_new(r,g,b,a){
	return {
		r: Math.round(r),
		g: Math.round(g),
		b: Math.round(b),
		a: a
	};
}
function color_getJScolor(color){
	return "rgb("+Math.round(color.r)+", "+Math.round(color.g)+", "+Math.round(color.b)+")";
}
function merge_color(color1, color2, amount){
	var min_red = Math.min(color1.r, color2.r);
	var max_red = Math.max(color1.r, color2.r);
	
	var min_green = Math.min(color1.g, color2.g);
	var max_green = Math.max(color1.g, color2.g);
	
	var min_blue = Math.min(color1.b, color2.b);
	var max_blue = Math.max(color1.b, color2.b);

	return color_new(
		Math.round(min_red + (max_red - min_red) * amount),
		Math.round(min_green + (max_green - min_green) * amount),
		Math.round(min_blue + (max_blue - min_blue) * amount),
		color1.a + (color2.a - color1.a) * amount
		);
}
function color_add(color1, color2){
	return color_new(
		Math.round(Math.max(Math.min(color1.r + color2.r, 255),0)),
		Math.round(Math.max(Math.min(color1.g + color2.g, 255),0)),
		Math.round(Math.max(Math.min(color1.b + color2.b, 255),0)),
		Math.max(Math.min(color1.a + color2.a, 1),0)
		);
}
function color_multiply(color1, color2){
	return color_new(
		Math.round(Math.max(Math.min(color1.r * color2.r, 255),0)),
		Math.round(Math.max(Math.min(color1.g * color2.g, 255),0)),
		Math.round(Math.max(Math.min(color1.b * color2.b, 255),0)),
		Math.max(Math.min(color1.a * color2.a, 1),0)
		);
}
function blend(color1, color2) {
	var totalAlpha = color1.a + color2.a;
	var weight0 = color1.a / totalAlpha;
	var weight1 = color2.a / totalAlpha;

	var r = weight0 * color1.r + weight1 * color2.r;
	var g = weight0 * color1.g + weight1 * color2.g;
	var b = weight0 * color1.b + weight1 * color2.b;
	var a = Math.max(color1.a, color2.a);
	return color_new(r,g,b,a);
}

// draw helper functions
function draw_set_color(color){
	current_context.fillStyle = color;
	current_context.strokeStyle = color;
}
function draw_clear(){
	current_context.clearRect(0, 0, current_canvas.width, current_canvas.height);
}
function draw_line(x1, y1, x2, y2) {
	current_context.beginPath();
	current_context.moveTo(x1,y1);
	current_context.lineTo(x2,y2);
	current_context.stroke();
}
function draw_circle(x, y, r) {
	current_context.beginPath();
	current_context.arc(x,y,r,0,2*Math.PI);
	current_context.stroke();
}
function draw_rect(x,y,width,height) {
	current_context.fillRect(x,y,width,height);
}
function draw_point(x,y) {
	current_context.fillRect(x,y,1,1);
}






















