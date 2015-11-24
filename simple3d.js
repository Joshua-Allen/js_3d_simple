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
	interval = setInterval(interval, 1000/30);
}
function interval(){
	world_update();
	world_draw();
}

// world
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
function world_update() {
	player_update();
	cam_update();
}
function world_draw() {
	// clear
	draw_clear_ext(ctx_3d, mainCanvas);
	draw_clear_ext(ctx_ray, rayCanvas);
	
	// 
	current_canvas = rayCanvas;
	current_context = ctx_ray;
	
	// draw all walls
	for	(i = 0; i < walls.length; i++) {
		draw_set_color("#000000");
		draw_rect(walls[i].x,walls[i].y,walls[i].width,walls[i].height);
		draw_set_color("#FFFFFF");
		draw_rect(walls[i].x+2,walls[i].y+2,walls[i].width-4,walls[i].height-4);
	}	
	
	cam_draw_debug();
	
	// 
	current_canvas = mainCanvas;
	current_context = ctx_3d;
	
	screen_render();
	//render();
}

// player
var player = {
	x: 45,
	y: 54,
	direction:0
};
function player_update() {
	if (Key.isDown(Key.W)) player_move(3,player.direction);
	if (Key.isDown(Key.A)) player_move(3,player.direction+90);
	if (Key.isDown(Key.S)) player_move(3,player.direction+180);
	if (Key.isDown(Key.D)) player_move(3,player.direction-90);
	
	if (player.direction < 0) player.direction+=360;
	if (player.direction > 360) player.direction-=360;
}
function player_move(dis, dir){

	var next_x = player.x + lengthdir_x(dis,dir);
	var next_y = player.y + lengthdir_y(dis,dir);
	
	var hit_point = collision_circle_point(next_x, next_y, 10);
	if (hit_point.hit){
		next_x += lengthdir_x(10-hit_point.distance, hit_point.dir+180);
		next_y += lengthdir_y(10-hit_point.distance, hit_point.dir+180);
		console.log(hit_point);
	}
	
	player.x = next_x;
	player.y = next_y;
}

// camera
var camera = {
	x: 45,
	y: 54,
	z: 32,
	direction: 0,
	up_angle: 100,
	fov: 60,
	rays: [],
	distortion_fix: [],
	pPlane_dis: 32
};
function cam_update() {
	camera.x = player.x;
	camera.y = player.y;
	camera.direction = player.direction;
	if (mouse.locked){
		mouse.y = clamp(mouse.y, -360, 360);
		camera.up_angle = (mouse.y*2)*-1;
		player.direction = (mouse.x/4)*-1;
	}
	// dimension of the projection plane
	var pPlane_width = mainCanvas.width;
	var pPlane_height = mainCanvas.height;
	
	// Center of the Projection Plane
	var pPlane_center_x = pPlane_width/2;
	var pPlane_center_y = pPlane_height/2;
	
	// angle between subsequent rays
	var ray_angle_dif = camera.fov/pPlane_width;
	
	// distance between the player and the projection plane
	camera.pPlane_dis = pPlane_width / tan(camera.fov/2);
	
	var column;
	for(column = 0; column<pPlane_width; column++) {
		var ray_angle = -(camera.fov/2) + column * ray_angle_dif;
		
		// find where the ray will go when at max
		var x_ray_max = camera.x + lengthdir_x(1000, camera.direction + ray_angle);
		var y_ray_max = camera.y + lengthdir_y(1000, camera.direction + ray_angle);
		
		// find the ray hit point
		var hitpoint = collision_line_point(camera.x, camera.y, x_ray_max, y_ray_max);
		
		// updates the ray array with the distance and what side
		if (hitpoint.hit) {
			camera.rays[column] = {distance: hitpoint.distance, side:hitpoint.side, angle:(camera.direction + ray_angle)};
		} else {
			camera.rays[column] = {distance: 1000, side:hitpoint.side};
		}
		
		// only need to do the fix math once
		if (typeof(camera.distortion_fix[column]) == 'undefined') {
			camera.distortion_fix[column] = cos(ray_angle);
		}
	}
}
function cam_draw_debug() {
	draw_set_color("#000000");
	
	var column;
	for (column = 0; column<camera.rays.length; column+=1){
		draw_line(camera.x, camera.y, 
				camera.x+lengthdir_x(camera.rays[column].distance, camera.rays[column].angle),
				camera.y+lengthdir_y(camera.rays[column].distance, camera.rays[column].angle));
	}
}

//
function screen_render() {
	
	// dimension of the projection plane
	var pPlane_width = mainCanvas.width;
	var pPlane_height = mainCanvas.height;
	
	// Center of the Projection Plane
	var pPlane_center_x = pPlane_width/2;
	var pPlane_center_y = pPlane_height/2 + camera.up_angle;
	
	var column;
	for (column = 0; column<camera.rays.length; column+=1){
		
		//
		var ray_distance = camera.rays[column].distance;
		var ray_side = camera.rays[column].side;
		
		//
		var color = color_new(0,0,0,1);;
		if (ray_side == 0) color = color_new(255,0,0,1);
		if (ray_side == 1) color = color_new(0,255,0,1);
		if (ray_side == 2) color = color_new(0,0,255,1);
		if (ray_side == 3) color = color_new(255,255,0,1);
		
		var color_fad = clamp(ray_distance/(500),0,1);
		var new_color = merge_color(color_new(0,0,0,1), color, 1-color_fad);
		draw_set_color(color_getJScolor(new_color));
		
		//pPlane_height*32
		var height = (32 / (ray_distance * camera.distortion_fix[column])) * camera.pPlane_dis;

		//
		var column_x = pPlane_width-column;
		draw_line(column_x, pPlane_center_y-height/2 ,column_x, pPlane_center_y+height/2);
	}
}

// objects
function new_wall(x, y, width, height){
	var wall = {
		x: x,
		y: y,
		width: width,
		height: height,
		zHeight: 48
	};

	walls.push(wall);
}

//////////////////////////////////////////////////////////////////////
// collisions
//////////////////////////////////////////////////////////////////////
// line
function collision_line_point(x1, y1, x2, y2){
	var angle = point_direction(x1, y1, x2, y2);

	var bestPoint = {
		x: 0,
		y: 0,
		hit: false,
		side: 0,
		distance: 10000000
	};
	
	var i;
	for	(i = 0; i < walls.length; i++) {
		var hitpoint = line_getIntersection_rect(
				{x1:x1, y1:y1, x2:x2, y2:y2}, 
				{x1:walls[i].x, y1:walls[i].y, 
				x2:walls[i].x+walls[i].width, y2:walls[i].y+walls[i].height});
		
		if (hitpoint.hit) {
			if (bestPoint.distance > hitpoint.distance){
				bestPoint = hitpoint;
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

// circle 
function collision_circle_point(x, y, r){
	var bestPoint = {hit:false, x:0, y:0, distance: r, dir:0}
	
	var circle = {x:x, y:y, r:r};
	var circle_bb = AABB_from_circle(circle);
	
	var i;
	for	(i = 0; i < walls.length; i++) {
		var wall_bb = AABB_from_wall(walls[i]);
		
		if (collision_AABB(circle_bb, wall_bb))
		{
			var hit_rez = 5;
			var dir;
			for(dir = 0; dir<360; dir+=hit_rez){
				var hitpoint = line_getIntersection_rect(
					{x1:x, y1:y, x2:x+lengthdir_x(r,dir), y2:y+lengthdir_y(r,dir)}, 
					wall_bb);
					
				if (hitpoint.hit) {
					if (bestPoint.distance > hitpoint.distance){
						bestPoint.x = hitpoint.x;
						bestPoint.y = hitpoint.y;
						bestPoint.distance = hitpoint.distance;
						bestPoint.hit = hitpoint.hit;
						bestPoint.dir = dir;
					}
				}
			}
		}
		
	}
	
	return bestPoint;
}

// AABB
function collision_AABB(AABB_1, AABB_2){
	return  AABB_1.x1 <= AABB_2.x2 &&
			AABB_2.x1 <= AABB_1.x2 &&
			AABB_1.y1 <= AABB_2.y2 &&
			AABB_2.y1 <= AABB_1.y2;
}

function AABB_from_circle(circle){
	return {
		x1: circle.x-circle.r,
		y1: circle.y-circle.r,
		x2: circle.x+circle.r,
		y2: circle.y+circle.r
	};
}
function AABB_from_wall(wall){
	return {
		x1: wall.x,
		y1: wall.y,
		x2: wall.x+wall.width,
		y2: wall.y+wall.height
	}
}

// point
function collision_point(x,y){
	var i;
	for	(i = 0; i < walls.length; i++) {
		if (x>=walls[i].x && y>=walls[i].y && x<=walls[i].x+walls[i].width && y<=walls[i].y+walls[i].height) {
			return true;
		}
	}
	return false;
}


//////////////////////////////////////////////////////////////////////
// keyboard
//////////////////////////////////////////////////////////////////////
var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
	//console.log(event.keyCode);
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
function set_keyListeners(){
	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
}

//////////////////////////////////////////////////////////////////////
// mouse
//////////////////////////////////////////////////////////////////////
var mouse = {
	x: 0,
	y: 0,
	over:false,
	down:false,
	locked: false
};
function set_mouseListeners(){
	document.addEventListener('mousemove', function(evt) {
		if (mouse.locked == false) {
			var rect = mainCanvas.getBoundingClientRect();
			var mx = Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*mainCanvas.width);
			var my = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*mainCanvas.height);
			if (mx >=0 && my>=0 && mx<=mainCanvas.width && my<=mainCanvas.height){
				mouse.x = mx;
				mouse.y = my;
			}
		} else {
			var mx = evt.movementX ||
					evt.mozMovementX ||
					evt.webkitMovementX ||
					0;
	 
			var my = evt.movementY ||
					evt.mozMovementY ||
					evt.webkitMovementY ||
					0;
					
			mouse.x+=mx;
			mouse.y+=my;
		}
	}, false);
	
	mainCanvas.addEventListener('mousedown', function(evt) {mouse.down = true; }, false);
	mainCanvas.addEventListener('mouseup', function(evt) {mouse.down = false;}, false);
	
	mainCanvas.addEventListener('mouseover', function(evt) { mouse.over = true;}, false);
	mainCanvas.addEventListener('mouseout', function(evt) { mouse.over = false;}, false);
	
	//
	mainCanvas.addEventListener("click", function(evt) {
		mainCanvas.requestPointerLock = mainCanvas.requestPointerLock ||
                    mainCanvas.mozRequestPointerLock ||
                    mainCanvas.webkitRequestPointerLock;
		mainCanvas.requestPointerLock();
	}, false);
}

document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);    

function changeCallback(e) {
	mouse.locked = !mouse.locked;
	
	if (mouse.locked == true){
		//mouse.x = mainCanvas.width/2;
		mouse.y = mainCanvas.height/2;
	}
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
function sin(deg) {
	return Math.sin(toRadians(deg));
}
function cos(deg) {
	return Math.cos(toRadians(deg));
}
function tan(deg) {
	return Math.tan(toRadians(deg));
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
function draw_clear_ext(ctx, can){
	ctx.clearRect(0, 0, can.width, can.height);
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






















