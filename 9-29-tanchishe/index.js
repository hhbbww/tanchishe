/*
* @Author: Thinkpad
* @Date:   2017-09-29 15:31:53
* @Last Modified by:   Thinkpad
* @Last Modified time: 2017-09-29 19:08:57
*/
function Snake(){
	this.snake=document.querySelector('.snake');
	this.arr = ['1_0','2_0','3_0'];
	this.dir =40;
	this.food = '';
	this.flag={'1_0':true,'2_0':true,'3_0':true};
}

Snake.prototype={
	star:function(){
		this.draw();
		this.drawsnake();
		this.move();
		this.key();
		this.Food();
	},
	draw:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.snake.innerHTML+=`<div class='xian' id='${i}_${j}'></div>`
			}
		}
	},
	drawsnake:function(){
		this.arr.forEach(element=>{
			document.getElementById(element).classList.add('hot');
		})
	},
	move:function(){
		let that=this;
		this.t=setInterval(function(){
			let oldh = that.arr[that.arr.length-1];
			let newarr =oldh.split('_');
			let newh ;
			
			
			if(that.dir==37){
				newh=`${newarr[0]*1}_${newarr[1]*1-1}`
			}else if(that.dir==38){
				newh=`${newarr[0]*1-1}_${newarr[1]*1}`
			}else if(that.dir==39){
				newh=`${newarr[0]*1}_${newarr[1]*1+1}`
			}else if(that.dir==40){
				newh=`${newarr[0]*1+1}_${newarr[1]*1}`
			};
			let newt =newh.split('_');
			if(newt[1]<0 || newt[1]>19){
				clearInterval(that.t);
				alert('game over');
			}
			if(newt[0]<0 || newt[0]>19){
				clearInterval(that.t);
				alert('game over');
			}
			that.arr.push(newh);
			that.flag[newh]=true;
			let wei = that.arr.shift();
			document.getElementById(wei).classList.remove('hot');
			delete that.flag[wei];
			that.drawsnake();
		},1000)
	},
	key:function(){
		document.onkeydown = function(e){
			let keycode=e.keyCode;
			this.dir=keycode;
			if(Math.abs(keycode-this.dir)==2){
				return;
			}
		}.bind(this)
	},
	Food:function(){
		let x =Math.floor(Math.random()*20);
		let y =Math.floor(Math.random()*20);
		do{
			x =Math.floor(Math.random()*20);
			y =Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`]);
		this.food=`${x}_${y}`;
		document.getElementById(this.food).style.background='red';


	},
}