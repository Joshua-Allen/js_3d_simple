var current_canvas
var current_context

var running;
var interval;

var rayCanvas;
var ctx_ray;

var mainCanvas;
var ctx_3d;

var walls = [];
var wall_sprite = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()]
wall_sprite[0].src = 'wall_0.png';
wall_sprite[1].src = 'wall_1.png';
wall_sprite[2].src = 'wall_2.png';
wall_sprite[3].src = 'wall_3.png';
wall_sprite[4].src = 'wall_4.png';
wall_sprite[5].src = 'wall_5.png';



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
	interval = setInterval(interval_2, 1000/30);
	//requestAnimationFrame(interval_1); 
}
function interval_1(){
	//requestAnimationFrame(interval_2);
	world_update();
}
function interval_2(){
	requestAnimationFrame(interval_1);
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
	new_wall(0,384, 32, 32);
	new_wall(0,416, 32, 32);
	new_wall(0,448, 32, 32);
	new_wall(0,480, 32, 32);
	new_wall(0,512, 32, 32);
	new_wall(0,544, 32, 32);
	new_wall(0,576, 32, 32);
	new_wall(0,608, 32, 32);
	new_wall(0,640, 32, 32);
	new_wall(0,672, 32, 32);
	new_wall(0,704, 32, 32);
	new_wall(0,736, 32, 32);
	new_wall(0,768, 32, 32);
	new_wall(0,800, 32, 32);
	new_wall(0,832, 32, 32);
	new_wall(0,864, 32, 32);
	new_wall(0,896, 32, 32);
	new_wall(0,928, 32, 32);
	new_wall(0,960, 32, 32);
	new_wall(32,960, 32, 32);
	new_wall(64,960, 32, 32);
	new_wall(96,960, 32, 32);
	new_wall(128,960, 32, 32);
	new_wall(160,960, 32, 32);
	new_wall(192,960, 32, 32);
	new_wall(224,960, 32, 32);
	new_wall(256,960, 32, 32);
	new_wall(288,960, 32, 32);
	new_wall(320,960, 32, 32);
	new_wall(352,960, 32, 32);
	new_wall(384,960, 32, 32);
	new_wall(416,960, 32, 32);
	new_wall(448,960, 32, 32);
	new_wall(480,960, 32, 32);
	new_wall(512,960, 32, 32);
	new_wall(544,960, 32, 32);
	new_wall(576,960, 32, 32);
	new_wall(608,960, 32, 32);
	new_wall(640,960, 32, 32);
	new_wall(672,960, 32, 32);
	new_wall(704,960, 32, 32);
	new_wall(736,960, 32, 32);
	new_wall(768,960, 32, 32);
	new_wall(800,960, 32, 32);
	new_wall(832,960, 32, 32);
	new_wall(864,960, 32, 32);
	new_wall(896,960, 32, 32);
	new_wall(928,960, 32, 32);
	new_wall(960,960, 32, 32);
	new_wall(960,832, 32, 32);
	new_wall(960,800, 32, 32);
	new_wall(960,768, 32, 32);
	new_wall(960,736, 32, 32);
	new_wall(960,704, 32, 32);
	new_wall(960,672, 32, 32);
	new_wall(960,640, 32, 32);
	new_wall(960,608, 32, 32);
	new_wall(960,576, 32, 32);
	new_wall(960,544, 32, 32);
	new_wall(960,512, 32, 32);
	new_wall(960,480, 32, 32);
	new_wall(960,448, 32, 32);
	new_wall(960,416, 32, 32);
	new_wall(960,384, 32, 32);
	new_wall(960,352, 32, 32);
	new_wall(960,320, 32, 32);
	new_wall(960,288, 32, 32);
	new_wall(960,256, 32, 32);
	new_wall(960,224, 32, 32);
	new_wall(960,192, 32, 32);
	new_wall(960,160, 32, 32);
	new_wall(960,128, 32, 32);
	new_wall(960,96, 32, 32);
	new_wall(960,64, 32, 32);
	new_wall(960,32, 32, 32);
	new_wall(960,0, 32, 32);
	new_wall(928,0, 32, 32);
	new_wall(896,0, 32, 32);
	new_wall(864,0, 32, 32);
	new_wall(832,0, 32, 32);
	new_wall(800,0, 32, 32);
	new_wall(768,0, 32, 32);
	new_wall(736,0, 32, 32);
	new_wall(704,0, 32, 32);
	new_wall(672,0, 32, 32);
	new_wall(640,0, 32, 32);
	new_wall(608,0, 32, 32);
	new_wall(576,0, 32, 32);
	new_wall(544,0, 32, 32);
	new_wall(512,0, 32, 32);
	new_wall(480,0, 32, 32);
	new_wall(448,0, 32, 32);
	new_wall(416,0, 32, 32);
	new_wall(384,0, 32, 32);
	new_wall(480,128, 32, 32);
	new_wall(480,160, 32, 32);
	new_wall(480,192, 32, 32);
	new_wall(480,224, 32, 32);
	new_wall(480,256, 32, 32);
	new_wall(480,288, 32, 32);
	new_wall(480,320, 32, 32);
	new_wall(448,192, 32, 32);
	new_wall(416,192, 32, 32);
	new_wall(384,192, 32, 32);
	new_wall(352,192, 32, 32);
	new_wall(320,192, 32, 32);
	new_wall(288,192, 32, 32);
	new_wall(256,192, 32, 32);
	new_wall(224,192, 32, 32);
	new_wall(192,192, 32, 32);
	new_wall(160,192, 32, 32);
	new_wall(96,192, 32, 32);
	new_wall(128,160, 32, 32);
	new_wall(128,128, 32, 32);
	new_wall(128,96, 32, 32);
	new_wall(256,96, 32, 32);
	new_wall(288,96, 32, 32);
	new_wall(384,160, 32, 32);
	new_wall(384,32, 32, 32);
	new_wall(480,96, 32, 32);
	new_wall(480,64, 32, 32);
	new_wall(512,64, 32, 32);
	new_wall(544,64, 32, 32);
	new_wall(576,64, 32, 32);
	new_wall(608,64, 32, 32);
	new_wall(672,64, 32, 32);
	new_wall(704,64, 32, 32);
	new_wall(768,64, 32, 32);
	new_wall(800,64, 32, 32);
	new_wall(864,64, 32, 32);
	new_wall(896,64, 32, 32);
	new_wall(928,64, 32, 32);
	new_wall(736,64, 32, 32);
	new_wall(736,96, 32, 32);
	new_wall(736,128, 32, 32);
	new_wall(736,160, 32, 32);
	new_wall(512,224, 32, 32);
	new_wall(544,224, 32, 32);
	new_wall(576,224, 32, 32);
	new_wall(608,224, 32, 32);
	new_wall(640,224, 32, 32);
	new_wall(672,224, 32, 32);
	new_wall(704,224, 32, 32);
	new_wall(768,224, 32, 32);
	new_wall(800,224, 32, 32);
	new_wall(832,224, 32, 32);
	new_wall(864,224, 32, 32);
	new_wall(896,224, 32, 32);
	new_wall(928,224, 32, 32);
	new_wall(544,160, 32, 32);
	new_wall(704,288, 32, 32);
	new_wall(736,288, 32, 32);
	new_wall(768,288, 32, 32);
	new_wall(704,320, 32, 32);
	new_wall(704,352, 32, 32);
	new_wall(768,320, 32, 32);
	new_wall(768,352, 32, 32);
	new_wall(736,352, 32, 32);
	new_wall(576,320, 32, 32);
	new_wall(576,352, 32, 32);
	new_wall(576,384, 32, 32);
	new_wall(576,416, 32, 32);
	new_wall(544,416, 32, 32);
	new_wall(544,448, 32, 32);
	new_wall(768,512, 32, 32);
	new_wall(736,512, 32, 32);
	new_wall(736,544, 32, 32);
	new_wall(704,544, 32, 32);
	new_wall(704,576, 32, 32);
	new_wall(672,576, 32, 32);
	new_wall(640,576, 32, 32);
	new_wall(608,576, 32, 32);
	new_wall(576,576, 32, 32);
	new_wall(544,576, 32, 32);
	new_wall(512,576, 32, 32);
	new_wall(512,544, 32, 32);
	new_wall(480,544, 32, 32);
	new_wall(480,512, 32, 32);
	new_wall(480,480, 32, 32);
	new_wall(480,448, 32, 32);
	new_wall(448,416, 32, 32);
	new_wall(448,384, 32, 32);
	new_wall(416,384, 32, 32);
	new_wall(416,352, 32, 32);
	new_wall(384,352, 32, 32);
	new_wall(352,352, 32, 32);
	new_wall(320,352, 32, 32);
	new_wall(288,352, 32, 32);
	new_wall(256,352, 32, 32);
	new_wall(160,416, 32, 32);
	new_wall(160,448, 32, 32);
	new_wall(160,480, 32, 32);
	new_wall(160,512, 32, 32);
	new_wall(128,544, 32, 32);
	new_wall(128,576, 32, 32);
	new_wall(128,608, 32, 32);
	new_wall(128,640, 32, 32);
	new_wall(160,640, 32, 32);
	new_wall(160,672, 32, 32);
	new_wall(160,704, 32, 32);
	new_wall(320,736, 32, 32);
	new_wall(320,704, 32, 32);
	new_wall(352,704, 32, 32);
	new_wall(352,672, 32, 32);
	new_wall(352,640, 32, 32);
	new_wall(352,608, 32, 32);
	new_wall(320,608, 32, 32);
	new_wall(320,576, 32, 32);
	new_wall(320,544, 32, 32);
	new_wall(288,512, 32, 32);
	new_wall(192,320, 32, 32);
	new_wall(192,288, 32, 32);
	new_wall(160,288, 32, 32);
	new_wall(128,288, 32, 32);
	new_wall(64,736, 32, 32);
	new_wall(64,768, 32, 32);
	new_wall(64,800, 32, 32);
	new_wall(64,832, 32, 32);
	new_wall(64,864, 32, 32);
	new_wall(64,896, 32, 32);
	new_wall(64,928, 32, 32);
	new_wall(32,928, 32, 32);
	new_wall(64,512, 32, 32);
	new_wall(32,480, 32, 32);
	new_wall(32,448, 32, 32);
	new_wall(32,416, 32, 32);
	new_wall(32,384, 32, 32);
	new_wall(0,384, 32, 32);
	new_wall(0,352, 32, 32);
	new_wall(384,800, 32, 32);
	new_wall(416,832, 32, 32);
	new_wall(448,832, 32, 32);
	new_wall(480,864, 32, 32);
	new_wall(512,864, 32, 32);
	new_wall(544,864, 32, 32);
	new_wall(576,864, 32, 32);
	new_wall(576,896, 32, 32);
	new_wall(608,896, 32, 32);
	new_wall(640,896, 32, 32);
	new_wall(672,896, 32, 32);
	new_wall(704,896, 32, 32);
	new_wall(704,928, 32, 32);
	new_wall(736,928, 32, 32);
	new_wall(736,960, 32, 32);
	new_wall(608,768, 32, 32);
	new_wall(640,768, 32, 32);
	new_wall(672,768, 32, 32);
	new_wall(704,768, 32, 32);
	new_wall(736,768, 32, 32);
	new_wall(768,768, 32, 32);
	new_wall(800,768, 32, 32);
	new_wall(832,768, 32, 32);
	new_wall(832,736, 32, 32);
	new_wall(864,736, 32, 32);
	new_wall(896,736, 32, 32);
	new_wall(896,704, 32, 32);
	new_wall(928,704, 32, 32);
	new_wall(928,672, 32, 32);
	new_wall(960,672, 32, 32);
	new_wall(832,896, 32, 32);
	new_wall(832,928, 32, 32);
	new_wall(832,960, 32, 32);
	new_wall(736,832, 32, 32);
	new_wall(736,800, 32, 32);
	new_wall(736,768, 32, 32);
	new_wall(736,736, 32, 32);
	new_wall(736,704, 32, 32);
	new_wall(736,672, 32, 32);
	new_wall(768,672, 32, 32);
	new_wall(768,640, 32, 32);
	new_wall(768,608, 32, 32);
	new_wall(800,608, 32, 32);
	new_wall(832,608, 32, 32);
	new_wall(832,576, 32, 32);
	new_wall(864,576, 32, 32);
	new_wall(896,576, 32, 32);
	new_wall(800,448, 32, 32);
	new_wall(832,448, 32, 32);
	new_wall(832,416, 32, 32);
	new_wall(864,416, 32, 32);
	new_wall(864,384, 32, 32);
	new_wall(864,352, 32, 32);
	new_wall(896,352, 32, 32);
	new_wall(864,352, 32, 32);
	new_wall(864,320, 32, 32);
	new_wall(832,320, 32, 32);
	new_wall(800,320, 32, 32);
	new_wall(704,384, 32, 32);
	new_wall(672,384, 32, 32);
	new_wall(448,672, 32, 32);
	new_wall(448,704, 32, 32);
	new_wall(480,704, 32, 32);
	new_wall(512,704, 32, 32);
	new_wall(544,704, 32, 32);
	new_wall(576,704, 32, 32);
	new_wall(608,704, 32, 32);
	new_wall(608,672, 32, 32);
	new_wall(608,640, 32, 32);
	new_wall(576,640, 32, 32);
	new_wall(576,608, 32, 32);
	new_wall(320,416, 32, 32);
	new_wall(352,448, 32, 32);
	new_wall(384,448, 32, 32);
	new_wall(384,416, 32, 32);
	new_wall(416,416, 32, 32);
	new_wall(288,608, 32, 32);
	new_wall(256,608, 32, 32);
	new_wall(224,608, 32, 32);
	new_wall(224,640, 32, 32);
	new_wall(224,672, 32, 32);
	new_wall(192,672, 32, 32);
	new_wall(192,704, 32, 32);
	new_wall(160,704, 32, 32);
	new_wall(192,896, 32, 32);
	new_wall(224,896, 32, 32);
	new_wall(256,864, 32, 32);
	new_wall(224,864, 32, 32);
	new_wall(224,832, 32, 32);
	new_wall(192,832, 32, 32);
	new_wall(192,800, 32, 32);
	new_wall(192,768, 32, 32);
	new_wall(160,768, 32, 32);
	new_wall(160,736, 32, 32);
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
	
	draw_dif_x = camera.x - rayCanvas.width/2;
	draw_dif_y = camera.y - rayCanvas.height/2;
	
	// draw all walls
	for	(i = 0; i < walls.length; i++) {
		var x = walls[i].x - draw_dif_x;
		var y = walls[i].y - draw_dif_y;
		draw_set_color("#000000");
		draw_rect(x, y, walls[i].width, walls[i].height);
		draw_set_color("#FFFFFF");
		draw_rect(x+2, y+2, walls[i].width-4, walls[i].height-4);
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
	z: 32,
	zSpeed: 0,
	onGround: true,
	direction:-45
};
function player_update() {
	
	//
	player.zSpeed -= 5;
	player.z += player.zSpeed;
	
	if (player.z<=32){
		player.zSpeed = 0;
		player.z=32;
		player.onGround = true;
	}
	
	//
	if (Key.isDown(Key.W)) player_move(3,player.direction);
	if (Key.isDown(Key.A)) player_move(3,player.direction+90);
	if (Key.isDown(Key.S)) player_move(3,player.direction+180);
	if (Key.isDown(Key.D)) player_move(3,player.direction-90);
	if (Key.isDown(Key.SPACE)) {
		if (player.onGround == true) {
			player.zSpeed = 100;
			player.onGround = false;
		}
	}
	
	if (player.direction < 0) player.direction+=360;
	if (player.direction > 360) player.direction-=360;
}
function player_move(dis, dir){

	var next_x = player.x + lengthdir_x(dis,dir);
	var next_y = player.y + lengthdir_y(dis,dir);
	
	var hit_left =  collision_line_point(player.x, player.y, player.x-10, player.y);
	var hit_up =    collision_line_point(player.x, player.y, player.x, player.y+10);
	var hit_right = collision_line_point(player.x, player.y, player.x+10, player.y);
	var hit_down =  collision_line_point(player.x, player.y, player.x, player.y-10);
	
	if (hit_left.hit)  next_x += 10-hit_left.distance;
	if (hit_up.hit)    next_y -= 10-hit_up.distance;
	if (hit_right.hit) next_x -= 10-hit_right.distance;
	if (hit_down.hit)  next_y += 10-hit_down.distance;
	
	player.x = next_x;
	player.y = next_y;
}

// camera
var camera = {
	x: 45,
	y: 54,
	z: 32,
	direction: 0,
	up_angle: 0,
	fov: 60,
	rays: [],
	distortion_fix: [],
	pPlane_dis: 32
};
function cam_update() {
	camera.x = player.x;
	camera.y = player.y;
	camera.z = player.z;
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
	var ray_angle_dif = (camera.fov/pPlane_width);
	
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
			camera.rays[column] = {distance: hitpoint.distance, side:hitpoint.side, offset:hitpoint.offset, angle:(camera.direction + ray_angle)};
		} else {
			camera.rays[column] = {distance: 1000, side:hitpoint.side, offset:hitpoint.offset};
		}
		
		// only need to do the fix math once
		if (typeof(camera.distortion_fix[column]) == 'undefined') {
			camera.distortion_fix[column] = cos(ray_angle);
		}
	}
}
function cam_draw_debug() {
	draw_set_color("#000000");
	
	var x = rayCanvas.width/2;
	var y = rayCanvas.height/2;
	
	var column;
	for (column = 0; column<camera.rays.length; column+=1){
		draw_line(x, y, 
				x+lengthdir_x(camera.rays[column].distance, camera.rays[column].angle),
				y+lengthdir_y(camera.rays[column].distance, camera.rays[column].angle));
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

		var height = (16 / (ray_distance * camera.distortion_fix[column])) * camera.pPlane_dis;

		//
		var column_x = pPlane_width-column;
		var column_y = pPlane_center_y + camera.z/ray_distance*10;

		//
		//
		var cur_image = wall_sprite[5];
		var cur_image_size = 32;
		
		if (ray_distance < 500) {
			cur_image = wall_sprite[4]; cur_image_size = 64; }
		if (ray_distance < 400) {
			cur_image = wall_sprite[3]; cur_image_size = 128; }
		if (ray_distance < 300) {
			cur_image = wall_sprite[2]; cur_image_size = 256; }
		if (ray_distance < 200) {
			cur_image = wall_sprite[1]; cur_image_size = 512; }
		if (ray_distance < 100) {
			cur_image = wall_sprite[0]; cur_image_size = 1024; }
		
		//
		draw_image(cur_image, 
				(camera.rays[column].offset/33)*cur_image_size, 0, 1, cur_image_size,
				column_x, column_y-height/2 , 1, height);
				
		
		
		// overlay
		current_context.globalAlpha = ray_distance/500; 
		draw_line(column_x, column_y-height/2 ,column_x, column_y+height/2);
		draw_line(column_x, column_y-height/2 ,column_x, column_y+height/2);
		draw_line(column_x, column_y-height/2 ,column_x, column_y+height/2);
		draw_line(column_x, column_y-height/2 ,column_x, column_y+height/2);
		draw_line(column_x, column_y-height/2 ,column_x, column_y+height/2);
		current_context.globalAlpha = 1; 
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
		offset: 0,
		distance: 10000000,
		wallIndex: 0
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
				bestPoint.wallIndex = i;
				if (bestPoint.side == 0 || bestPoint.side == 2) {
					bestPoint.offset = bestPoint.x - walls[i].x;
				} else {
					bestPoint.offset = bestPoint.y - walls[i].y;
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
}

// circle 
function collision_circle_point(x, y, r){
	
	var bestPoint = {hit:false, x:0, y:0, distance: r, dir:0}
	/*
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
		
	}*/
	
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
  
  SPACE: 32,
  
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
function draw_image(image, sx,sy,sw,sh, dx,dy,dw,dh) {
	current_context.drawImage( 
		image,        // the image of the sprite sheet 
		sx,sy,sw,sh, // source coordinates      (x,y,w,h) 
		dx,dy,dw,dh  // destination coordinates (x,y,w,h) 
		); 
}






















