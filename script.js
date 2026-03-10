let canvas=document.getElementById("game")
let ctx=canvas.getContext("2d")

let player={x:150,y:300,size:30,vy:0}
let gravity=0.9
let obstacles=[]
let speed=6
let score=0
let backgroundX=0
let coins=localStorage.getItem("coins")||0
let highscore=localStorage.getItem("highscore")||0
let skin=localStorage.getItem("skin")||"white"

document.getElementById("coins").innerText=coins
document.getElementById("highscore").innerText=highscore

function startGame(){
document.getElementById("menu").style.display="none"
canvas.style.display="block"
spawnObstacle()
loop()
}

function spawnObstacle(){
let type=Math.floor(Math.random()*3)
if(type==0){obstacles.push({x:canvas.width,y:320,w:30,h:30})}
if(type==1){obstacles.push({x:canvas.width,y:300,w:30,h:50})}
if(type==2){obstacles.push({x:canvas.width,y:330,w:50,h:20})}
setTimeout(spawnObstacle,1100)
}

function drawBackground(){
backgroundX-=speed/3
ctx.fillStyle="#0a0a0a"
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.fillStyle="#111"
for(let i=0;i<50;i++){
ctx.fillRect((i*200+backgroundX)%2000,200,100,200)
}
}

function loop(){
ctx.clearRect(0,0,canvas.width,canvas.height)
drawBackground()
player.vy+=gravity
player.y+=player.vy
if(player.y>300){player.y=300;player.vy=0}
ctx.fillStyle=skin
ctx.fillRect(player.x,player.y,player.size,player.size)

for(let i=0;i<obstacles.length;i++){
let o=obstacles[i]
o.x-=speed
ctx.fillStyle="red"
ctx.fillRect(o.x,o.y,o.w,o.h)
if(player.x<o.x+o.w && player.x+player.size>o.x && player.y<o.y+o.h && player.y+player.size>o.y){gameOver()}
if(o.x<-50){obstacles.splice(i,1);score++;coins++;saveCoins()}
}

speed+=0.002
ctx.fillStyle="white"
ctx.font="18px Arial"
ctx.fillText("Score: "+score,20,30)
requestAnimationFrame(loop)
}

document.addEventListener("click",jump)
function jump(){
player.vy=-14
document.getElementById("jumpSound").play()
}

function gameOver(){
if(score>highscore){highscore=score;localStorage.setItem("highscore",highscore)}
alert("Game Over")
location.reload()
}

function saveCoins(){
localStorage.setItem("coins",coins)
document.getElementById("coins").innerText=coins
}

function openShop(){document.getElementById("shop").style.display="block"}
function closeShop(){document.getElementById("shop").style.display="none"}

function buySkin(color,price){
if(coins>=price){coins-=price;skin=color;localStorage.setItem("skin",skin);saveCoins();alert("Skin Unlocked")}
else{alert("Not enough coins")}
}

function watchAd(){alert("Ad Finished +5 Coins");coins+=5;saveCoins()}