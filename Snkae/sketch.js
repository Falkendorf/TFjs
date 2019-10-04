let x=[];  //x position
let y=[];  //y position
let v=[];  //direction
let gridx = 100;
let gridy = 100;
let scaleFactor = 10;
let start = false;
let selectedDirection=0;
let drawSteps = 10;
let curDrawStep = 0;


function setup(){
	createCanvas(gridx*scaleFactor,gridy*scaleFactor);
	background(200);
	pLabel = createP('');
	startGame();
}

function startGame(){
	//init in at mid
	x.clear();
	y.clear();
	v.clear();
	x.push(gridx/2);
	y.push(gridy/2);
	v.push(0);
	//start game...
	start = true;
	
}

function draw(){
	//Game Loop
	if (start){
		updatePosition();
		drawAll();
	}
}

function updateByIndex(var index){
	if (v[index]=0){
		y[index]--;
	}else if (v[index]=1){
		x[index]++;
	}else if (v[index]=2){
		y[index]++;
	}else if (v[index]=3){
		x[index]--;
	}else{
		
	} 
}

function updatePosition(){
	//compute next point
	for (var i = x.length-1;i>=0;i--){
		
	}
	
	//update collision
	if (curDrawStep==drawSteps){
		//update vectors
		
		//collision
		
	}
	//draw next
	
}

function drawAll(){
	
}

function keyPressed(){
    if (keyCode === LEFT_ARROW) {
      selectedDirection = 3; //3 is x--
    } else if (keyCode === RIGHT_ARROW) {
      selectedDirection = 1; //1 is x++
    } else if (keyCode === UP_ARROW) {
      selectedDirection = 0; //0 is y--
    } else if (keyCode === DOWN_ARROW) {
      selectedDirection = 2; //2 is y++
    } else if (keyCode === ENTER){
      //resetGame();
      console.log('reset');	
    }
}










var direction;
var newdir;
let scale=10;
let game;
let run;
let stop;
let mvSpeed=5;//2,5,10,10*x
var pLabel;
let npX;
let npY;
let points;
let wwidth =60;
let hheight=60;

function setup() {
  createCanvas(600, 600);
  background(200);
  pLabel = createP('');
  resetGame();
}
function breitensuche(){	
	
	
	var nx=x[0];
	var ny=y[0];
	var pnt=[3];
	switch (newdir){
      case 0:ny-=10; break;
      case 1:nx+=10; break;
      case 2:ny+=10; break;
      case 3:nx-=10; break;
      default: break;
    }
	pnt[0]=nx;
	pnt[1]=ny;
	pnt[2]=-1;
	let sstack=[];
	let posses=[];
	for (let i=0;i<x.length;i++){
		pnt[0]=x[i];
		pnt[1]=y[i];
		posses.push(pnt);
	}
	
	sstack.push(pnt);
	let kill=0;
	while (sstack.length>0){
		kill++;
		if (kill==500){
			break;
		}
		pnt = sstack.pop();
		var llist=getNext(pnt[0],pnt[1]);
		for (let i=0;i<llist.length;i++){
			nxt=llist[i];
			if (nxt[0]==npX&&nxt[1]==npY){
				console.log('root: '+nxt[2]);
				return nxt[2];
			}
			var notIn=true;
			for (var v in posses){
				if (v[0]==nxt[0]&&v[1]==nxt[1]){
					notIn=false;
					break;
				}
			}
			if (notIn){
				//console.log('add');
				var newP=[3];
				newP[0]=nxt[0];
				newP[1]=nxt[1];
				if (pnt[2]==-1){
					newP[2]=nxt[2];
				}else{
					newP[2]=pnt[2];
				}
				sstack.push(newP);
				//console.log('s.-'+sstack.length);
				//console.log('## '+newP);
				//console.log('++: '+nxt);
				//console.log('--,: '+sstack[0]);
				posses.push(newP);
				//console.log('p.-'+posses.length);
			}
		}
		//console.log(sstack[0][0]);
		//console.log(sstack[0][1]);
		//console.log(sstack[1][0]);
		//console.log(sstack[1][1]);
		//console.log(sstack[2][0]);
		//console.log(sstack[2][1]);
		//noLoop();
		//console.log('len '+sstack.length);
	}
	return newdir;
}

function getNext(x1,y1){
	var vars=[];
	if (x1>10){
		var pnt=[3];
		pnt[0]=x1-10;
		pnt[1]=y1;
		pnt[2]=1;//0
		vars.push(pnt);
	}
	if (x1<600){
		var pnt=[3];
		pnt[0]=x1+10;
		pnt[1]=y1;
		pnt[2]=3;//2
		vars.push(pnt);
	}
	if (y1>10){
		var pnt=[3];
		pnt[0]=x1;
		pnt[1]=y1-10;
		pnt[2]=0;//3
		vars.push(pnt);
	}
	if (y1<600){
		var pnt=[3];
		pnt[0]=x1;
		pnt[1]=y1+10;
		pnt[2]=2;//1
		vars.push(pnt);
	}
	return vars;
}


function resetGame(){
  x=[];
  y=[];
  v=[];
  game=false;
  run=false;
  stop=false;
  direction=0;
  newdir=0;
  nextPoint();
  x.push(300);
  y.push(300);
  v.push(direction);
  points=0;
}

function range(size, startAt = 0,step) {
    return [...Array(size).keys()].map(i => (i*step) + startAt);
}

function nextPoint(){
  npX=floor(random(range((600-scale)/scale,scale,scale)));
  npY=floor(random(range((600-scale)/scale,scale,scale)));
}

function move(){
    updatePos();
    drawSnake();
}

function drawSnake(){
  background(200);
  for (let i=0;i<x.length;i++){
    stroke(34, 139, 34);
    if (i==0){
      stroke(34, 34, 139);
    }
    strokeWeight(scale-1);
    point(x[i],y[i]);
  }
  stroke(139, 34, 34);
  strokeWeight(scale-1);
  point(npX,npY);
}

function intersect(){
  for (let i=0;i<x.length;i++){
    for (let j=0;j<y.length;j++){
      if (i!=j){
        if (x[i]==x[j]&&y[i]==y[j]){
		  return true;
        }
      }
    }
    if (x[i]<=0||x[i]>600){
      return true;
    }
    if (y[i]<=0||y[i]>600){
      return true;
    }
  }
  if (x[0]==npX&&y[0]==npY){
    nextPoint();
    let len = x.length-1;
    let a = x[len];
    let b = y[len];
    x.push(a);
    y.push(b);
    v.push(4);
    points++;
  }
  return false;
}

function updatePos(){	
  if (x[0]%scale==0&&y[0]%scale==0){
    //newdir =breitensuche();
	stop = intersect();
    direction = newdir;
    v[0]= direction;
    for (let i=1;i<x.length;i++){
      if (x[i]==x[i-1]&&y[i]==y[i-1]){
          v[i]=4;
      }else if (x[i-1]==x[i]){
        if (y[i-1]>y[i]){
          v[i]=2;
        }else{
          v[i]=0;
        }
      }else{
        if (x[i-1]>x[i]){
          v[i]=1;
        }else{
          v[i]=3;
        }
      }
    }
  }
  for (let i=0;i<v.length;i++){
    switch (v[i]){
      case 0:y[i]-=mvSpeed; break;
      case 1:x[i]+=mvSpeed; break;
      case 2:y[i]+=mvSpeed; break;
      case 3:x[i]-=mvSpeed; break;
      default: break;
    }
  }
  
}

function keyPressed(){
    if (keyCode === LEFT_ARROW) {
      newdir = 3;
      game = true;
    } else if (keyCode === RIGHT_ARROW) {
      newdir = 1;
      game = true;
    } else if (keyCode === UP_ARROW) {
      newdir = 0;
      game = true;
    } else if (keyCode === DOWN_ARROW) {
      newdir = 2;
      game = true;
    } else if (keyCode === ENTER){
      resetGame();
      console.log('reset');	
    }
}

function drawPoint() {
  stroke(34, 139, 34);
  strokeWeight(1);
  var px = map(x, -2.1820, 2.6558, 0, width);
  var py = map(y, 0, 9.9983, height, 0);
  point(px, py);
}

function draw() {
  if (game&&!run){
    run=true;
    game = true;
  }
  if (game&&run&&!stop){
    move();
  }
  if (stop){
    pLabel.html('You Lost! Your points were: '+points);
  }
}
