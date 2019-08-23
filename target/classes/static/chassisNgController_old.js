				/**
				*initialication of variables
				*/
				var i;
				//var j=0;
				var canvasmyCanvas1;
			    var ctxmyCanvas1 ;
			    
			    var canvas_rectangle1 ;
			    var context_rectangle1;
			    var canvas_rectangle2;
			    var context_rectangle2;
			    var canvas_rectangle3 ;
			    var context_rectangle3;
			    var canvas_rectangle4;
			    var context_rectangle4;
			    
			    var canvas_rectMPN ;
			    var ctx_rectMPN;
			    var canvas_rectOLP ;
			    var ctx_rectOLP ;
			    var canvas_rectMPC;
			    var ctx_rectMPC ;
			    var canvas_rect_PABA;
			    var ctx_rectPABA ;
			    var canvas_rectWSS;
			    var ctx_rectWSS ; 
			    var canvas_rectSUPY;
			    var ctx_rectSUPY ;
			    var canvas_rectCSCC;
			    var ctx_rectCSCC ;
			    var canvas_rectMCS;
			    var ctx_rectMCS ;
			    var canvas_rect_;
			    var ctx_rect_ ;
			    /**
			    *@dividing rectangle in to 14 columns
			    **/
				var column=14;
				var cardWidth=rectangle1.width / column;
				//var x = xIndex * cardWidth;
				
				var cards = new Array();
				var cards=[];
				
				/**Global Card Properties*/
				var card_Text = ["M", "P","N" ];
				var card_Color =["yellow","blue","yellow","pink","#87CEEB","#6B8E23","#808080","#32CD32","'#8B4513"];
				var x;
				
				var cardX, cardY;
				
				
				/**
				 * Basic Frame Canvas and Context Init
				 */
				canvasAndContextInit=function($scope){
					
					canvasmyCanvas1 = document.getElementById('myCanvas1');
				    ctxmyCanvas1 = canvasmyCanvas1.getContext('2d'); 
				    
				    /*canvas_rectangle1 = document.getElementById('rectangle1');
				    context_rectangle1 = canvas_rectangle1.getContext('2d');
				    canvas_rectangle2 = document.getElementById('rectangle2');
				    context_rectangle2 = canvas_rectangle2.getContext('2d');
				    canvas_rectangle3 = document.getElementById('rectangle3');
				    context_rectangle3 = canvas_rectangle3.getContext('2d');
				    canvas_rectangle4 = document.getElementById('rectangle4');
				    context_rectangle4 = canvas_rectangle4.getContext('2d');
				    
				    canvas_rectMPN = document.getElementById('rectMPN');
				    ctx_rectMPN = canvas_rectMPN.getContext('2d');
				    canvas_rectOLP = document.getElementById('rectOLP');
				    ctx_rectOLP = canvas_rectOLP.getContext('2d');
				    canvas_rectMPC = document.getElementById('rectMPC');
				    ctx_rectMPC = canvas_rectMPC.getContext('2d');
				    canvas_rectPABA = document.getElementById('rectPABA');
				    ctx_rectPABA = canvas_rectPABA.getContext('2d');
				    canvas_rectWSS = document.getElementById('rectWSS');
				    ctx_rectWSS = canvas_rectWSS.getContext('2d'); 
				    canvas_rectSUPY = document.getElementById('rectSUPY');
				    ctx_rectSUPY = canvas_rectSUPY.getContext('2d');
				    canvas_rectCSCC = document.getElementById('rectCSCC');
				    ctx_rectCSCC = canvas_rectCSCC.getContext('2d');
				    canvas_rectMCS = document.getElementById('rectMCS');
				    ctx_rectMCS = canvas_rectMCS.getContext('2d');
				    canvas_rect_ = document.getElementById('rect_');
				    ctx_rect_ = canvas_rect_.getContext('2d');*/
				}
				
				
				
				/**
				 * Initialization of Chassis View from here
				 * @returns
				 */
				init=function($scope)
				{
					//console.log("init: with scope "+$scope.chassisViewDbData.ChassisViewDbData[0].WaveLength) ;
					
					canvasAndContextInit($scope);
				    drawAll();
				}
				function drawAll()
				{
					console.log("draw all");
					//drawBack();
					//drawRect();
					//drawCards();
					console.log("draw all done");
				}
				function drawBack()
				{
					console.log("draw back");
					 ctxmyCanvas1.fillStyle ='#FAF7F8';
					 ctxmyCanvas1.beginPath();
					 ctxmyCanvas1.rect(5,5,670,610);
					 ctxmyCanvas1.closePath();
					 ctxmyCanvas1.shadowBlur=10;
					 ctxmyCanvas1.shadowColor="black";
					 ctxmyCanvas1.fill();
					 ctxmyCanvas1.lineWidth=2;
					 ctxmyCanvas1.strokeStyle = 'black';
					 ctxmyCanvas1.stroke();
				}
				 function drawRect()
				    {
					    console.log("draw rect");
				    	subRectangle1();
				    	subRectangle2();
				    	subRectangle3();
				    	subRectangle4();
				    	console.log("draw rect done");
				    }
				
				 
				 function subRectangle1()
				 {
					 
					 	console.log("draw subrectangle1");
					 	//context_rectangle1.clearRect(5,10,650,150);
					 	context_rectangle1.fillStyle='white';
				    	context_rectangle1.beginPath();
				    	context_rectangle1.rect(0,0,300,150);
				    	context_rectangle1.closePath();
				    	context_rectangle1.shadowBlur=20;
				    	context_rectangle1.shadowColor="black";
				    	context_rectangle1.fill();
				    	context_rectangle1.lineWidth=2;
				    	context_rectangle1.strokeStyle='black';
				    	context_rectangle1.stroke(); 
				    	//context_rectangle1.onclick="function1()"; 
				    	context_rectangle1.onclick ="rect()";
				    	console.log("draw subrectangle1 done");
				    	drawCards();

				 }
				 function rect2()
				 {
					// Console.log("hello..on click");
					alert("rectangle 2");
					    
				}
				 function rect1()
				 {
					// Console.log("hello..on click");
					alert("rectangle 1");
					    
				}
				 
			
				 function subRectangle3()
				 {
					 
					 	console.log("draw subrectangle3");
					 	//context_rectangle1.clearRect(5,10,650,150);
					 	context_rectangle3.fillStyle='white';
				    	context_rectangle3.beginPath();
				    	context_rectangle3.rect(0,0,300,150);
				    	context_rectangle3.closePath();
				    	context_rectangle3.shadowBlur=20;
				    	context_rectangle3.shadowColor="black";
				    	context_rectangle3.fill();
				    	context_rectangle3.lineWidth=2;
				    	context_rectangle3.strokeStyle='black';
				    	context_rectangle3.stroke(); 
				    	console.log("draw subrectangle3 done");
				    	var Count=0;
				    	var j=0;

				    	for( i=0;i<0;i++)
				    	{
				    		//var j=i;
				    	
				    		//System.out.println("for loop");
				    		
				    		//console.log("i :- "+i + " And Count :- "+ Count);
				    		//console.log("Width :- "+ canvas_rectangle2.width);

					    	//console.log("Width/14 :- "+canvas_rectangle2.width/14);
					    	
					    	//console.log("Width/14 + i :- "+(canvas_rectangle2.width/14)+Count);

					    	//console.log("card_Color[j] :- "+card_Color[j] + " j :-" + j);
					    		
				    		drawRectangle(context_rectangle3,/* (canvas_rectangle2.width/14)*/10, 30,15,110, card_Color[j],"bold 15px Arial", "","","","");
				    		Count=Count+20;
				    		j=j+1;
				    		//console.log("J :- "+ j);
				    	    if(j >= 8){
				    	    	
				    	    	j = 0;// REset to Zero
				    	    }
				   
				    		//console.log("Final J :- "+ j);
				    					    		
				    		//drawRectangle(context_rectangle2, 10, 10, "bold 32px Arial", "1", cards);
				    	}	
				    	
				    	
					 }
				 function subRectangle4()
				 {
					 	console.log("draw subrectangle4");
					 	//context_rectangle1.clearRect(5,10,650,150);
					 	context_rectangle4.fillStyle='white';
				    	context_rectangle4.beginPath();
				    	context_rectangle4.rect(0,0,300,150);
				    	context_rectangle4.closePath();
				    	context_rectangle4.shadowBlur=20;
				    	context_rectangle4.shadowColor="black";
				    	context_rectangle4.fill();
				    	context_rectangle4.lineWidth=2;
				    	context_rectangle4.strokeStyle='black';
				    	context_rectangle4.stroke(); 
				    	console.log("draw subrectangle4 done");
				 }
				 
				 function drawCards()
				 {
				
					// for( var i=1;i<=14;i++)
				/*	 drawMPN_card();
					 drawOLP_card(105);
					 drawMPC_card(145);
					 drawPABA_card(185);
					 drawWSS_card(225);
					 drawSUPY_card(265);
					 drawCSCC_card(305);
					 drawMCS_card(345);
					 draw_card(425);*/
					 drawMPN_card(10,10,250,150);
					 //drawMPN_card(300,30,250,150);
					/* drawMPN_card(10,10,250,150);
					 drawMPN_card(10,10,250,150);
					 drawMPN_card(10,10,250,150);*/

				 }

				function drawMPN_card(a,b,c,d )
				{
					console.log("MPN card");
					context_rectangle1.left=25;
					context_rectangle1.fillStyle='yellow';
					context_rectangle1.beginPath();
					context_rectangle1.rect(a,b,c,d);
					context_rectangle1.closePath();
					context_rectangle1.fill();
					context_rectangle1.lineWidth=2;
					context_rectangle1.strokeStyle='black';
					context_rectangle1.stroke();
					context_rectangle1.font="bold 32px Arial";
					context_rectangle1.fillStyle='white';
					context_rectangle1.textAlign = 'center';
					context_rectangle1.strokeText('M',60,50);
					context_rectangle1.strokeText('P',60,100);
					context_rectangle1.strokeText('N',60,150);
					//ctx_rectMPN.strokeText("C!", 5, 130);

				}
				
				function drawOLP_card(x)
				{
					console.log("OLP card")
					//ctx_rectOLP.left=105;
					//ctx_rectOLP.paddingLeft=x
					//ctx_rectOLP.scale(1, -1);
					ctx_rectOLP.fillStyle='yellow';
					ctx_rectOLP.beginPath();
					ctx_rectOLP.rect(10,10,250,150);
					ctx_rectOLP.closePath();
					ctx_rectOLP.fill();
					ctx_rectOLP.lineWidth=2;
					ctx_rectOLP.strokeStyle='black';
					ctx_rectOLP.stroke();
					ctx_rectOLP.font='italic 30pt Verdana';
					ctx_rectOLP.fillStyle='black';
					ctx_rectOLP.strokeText('O',60,50);
					ctx_rectOLP.strokeText('L',60,100);
					ctx_rectOLP.strokeText('P',60,150);
					cardWidth=cardWidth+40;
				}
				function drawMPC_card(x)
				{
					console.log("MPC card")
					//ctx_rectMPC.scale(2, -2);;
					ctx_rectMPC.fillStyle='yellow';
					ctx_rectMPC.beginPath();
					ctx_rectMPC.rect(10,10,250,150);
					ctx_rectMPC.closePath();
					ctx_rectMPC.fill();
					ctx_rectMPC.lineWidth=2;
					ctx_rectMPC.strokeStyle='black';
					ctx_rectMPC.stroke();
					ctx_rectMPC.font='italic 30pt Verdana';
					ctx_rectMPC.fillStyle='black';
					ctx_rectMPC.strokeText('M',60,50);
					ctx_rectMPC.strokeText('P',60,100);
					ctx_rectMPC.strokeText('C',60,150);

					cardWidth=cardWidth+40;

				}
				function drawPABA_card(x)
				{
					console.log("PABA card")
					ctx_rectPABA.left=x;
					ctx_rectPABA.fillStyle='yellow';
					ctx_rectPABA.beginPath();
					ctx_rectPABA.rect(10,10,250,150);
					ctx_rectPABA.closePath();
					ctx_rectPABA.fill();
					ctx_rectPABA.lineWidth=2;
					ctx_rectPABA.strokeStyle='black';
					ctx_rectPABA.stroke();
					ctx_rectPABA.font='italic 30pt Verdana';
					ctx_rectPABA.fillStyle='black';
					ctx_rectPABA.strokeText('P',60,50);
					ctx_rectPABA.strokeText('A',60,100);
					ctx_rectPABA.strokeText('B',60,150);
					ctx_rectPABA.strokeText('A',60,200);


				}
				function drawWSS_card( x)
				{
					console.log("WSS card")
					ctx_rectWSS.left=x;
					ctx_rectWSS.fillStyle='yellow';
					ctx_rectWSS.beginPath();
					ctx_rectWSS.rect(10,10,250,150);
					ctx_rectWSS.closePath();
					ctx_rectWSS.fill();
					ctx_rectWSS.lineWidth=2;
					ctx_rectWSS.strokeStyle='black';
					ctx_rectWSS.stroke();
					ctx_rectWSS.font='italic 30pt Verdana';
					ctx_rectWSS.fillStyle='black';
					ctx_rectWSS.strokeText('W',60,50);
					ctx_rectWSS.strokeText('S',60,100);
					ctx_rectWSS.strokeText('S',60,150);


				}
				function drawSUPY_card()
				{
					console.log("SUPY card")
					ctx_rectSUPY.fillStyle='yellow';
					ctx_rectSUPY.beginPath();
					ctx_rectSUPY.rect(10,10,250,150);
					ctx_rectSUPY.closePath();
					ctx_rectSUPY.fill();
					ctx_rectSUPY.lineWidth=2;
					ctx_rectSUPY.strokeStyle='black';
					ctx_rectSUPY.stroke();
					ctx_rectSUPY.font='italic 30pt Verdana';
					ctx_rectSUPY.fillStyle='black';
					ctx_rectSUPY.strokeText('S',60,50);
					ctx_rectSUPY.strokeText('U',60,100);
					ctx_rectSUPY.strokeText('P',60,150);
					ctx_rectSUPY.strokeText('Y',60,200);



				}
				function drawCSCC_card()
				{
					console.log("CSCC card")
					ctx_rectCSCC.fillStyle='green';
					ctx_rectCSCC.beginPath();
					ctx_rectCSCC.rect(10,10,250,150);
					ctx_rectCSCC.closePath();
					ctx_rectCSCC.fill();
					ctx_rectCSCC.lineWidth=2;
					ctx_rectCSCC.strokeStyle='black';
					ctx_rectCSCC.stroke();
					ctx_rectCSCC.font='italic 30pt Verdana';
					ctx_rectCSCC.fillStyle='black';
					ctx_rectCSCC.strokeText('C',60,50);
					ctx_rectCSCC.strokeText('S',60,100);
					ctx_rectCSCC.strokeText('C',60,150);
					ctx_rectCSCC.strokeText('C',60,200);


				}
				function draw_card()
				{
					console.log(" card")
					ctx_rect_.fillStyle='yellow';
					ctx_rect_.beginPath();
					ctx_rect_.rect(10,10,250,150);
					ctx_rect_.closePath();
					ctx_rect_.fill();
					ctx_rect_.lineWidth=2;
					ctx_rect_.strokeStyle='black';
					ctx_rect_.stroke();
				}
				function drawMCS_card()
				{
					//for( var int i=0;i<2;i++)
					//{
						console.log("MCS card")
						ctx_rectMCS.fillStyle='yellow';
						ctx_rectMCS.beginPath();
						ctx_rectMCS.rect(10,10,250,150);
						ctx_rectMCS.closePath();
						ctx_rectMCS.fill();
						ctx_rectMCS.lineWidth=2;
						ctx_rectMCS.strokeStyle='black';
						ctx_rectMCS.stroke();
						ctx_rectMCS.font='italic 30pt Verdana';
						ctx_rectMCS.fillStyle='black';
						ctx_rectMCS.strokeText('M',60,50);
						ctx_rectMCS.strokeText('C',60,100);
						ctx_rectMCS.strokeText('S',60,150);

					//}	
				}
				
				
				 function subRectangle2()
				 {
					 	console.log("draw subrectangle2");
					 	//context_rectangle1.clearRect(5,10,650,150);
					 	context_rectangle2.fillStyle='white';
				    	context_rectangle2.beginPath();
				    	context_rectangle2.rect(0,0,300,150);
				    	context_rectangle2.closePath();
				    	context_rectangle2.shadowBlur=20;
				    	context_rectangle2.shadowColor="black";
				    	context_rectangle2.fill();
				    	context_rectangle2.lineWidth=2;
				    	context_rectangle2.strokeStyle='black';
				    	context_rectangle2.stroke(); 				    	
				    	console.log("draw subrectangle2 done");
				    	var Count=0;
				    	
				    	var j=0;
				    	  
				    	var rect = canvas_rectangle2.getBoundingClientRect();	
				    	console.log("subrect2 : left : "+ rect.left  +" , and top : "+ rect.top +", right :- "+rect.right);
				    	for( i=0;i<0;i++)
				    	{
				    		//var j=i;
				    	
				    		//System.out.println("for loop");
				    		
				    		console.log("i :- "+i + " And Count :- "+ Count);
				    		console.log("Width :- "+ canvas_rectangle2.width);

					    	console.log("Width/14 :- "+canvas_rectangle2.width/14);
					    	
					    	console.log("Width/14 + i :- "+(canvas_rectangle2.width/14)+Count);

					    	console.log("card_Color[j] :- "+card_Color[j] + " j :-" + j);
					    	
					    	
				    		drawRectangle(context_rectangle2, Count, 25,(canvas_rectangle2.width/14),110, card_Color[j],"bold 15px Arial", "","","","");
				    		Count=Count+22;
				    		
				    		j=j+1;
				    		console.log("J :- "+ j);
				    	    if(j >= 9){
				    	    	
				    	    	j = 0;// Reset to Zero
				    	    }
				   
				    		console.log("Final J :- "+ j);
				    					    		
				    		//drawRectangle(context_rectangle2, 10, 10, "bold 32px Arial", "1", cards);
				    	}	
				    	
				    	
				    	
				 }
				
				 function draw (context, x, y,width,height,card_Color/*fillStyle*/, fonttype, filltext1,filltext2,filltext3,filltext4)
					{
					    context.beginPath();
					    //context.arc(x, y, radius, 0, 2 * Math.PI, false);
					    context.rect(x,y,width,height);
					    context.fillStyle = card_Color/*fillStyle*/;
					    context.fill();
					    context.lineWidth =1;
					    context.strokeStyle = 'black';
					    context.stroke();
					    
					    context.fillStyle = 'white';
					    context.textAlign = 'center';
					    context.font = fonttype;
					    context.fillText(filltext1, x+5, y+20);
					    context.fillText(filltext2, x+5, y+40);
					    context.fillText(filltext3, x+5, y+60); 
					    context.fillText(filltext4, x+5, y+80);
					    console.log("Completed Draw");
					}
				
				var  Rectangle= function(x, y,width,height) 
				 {
				    
					this.left = x;
				    this.top = y;
				    this.right = x + width;
				    this.bottom = y + height;
				    console.log("x=" + x + "y=" + y + "width=" + width + "height=" + height)
				 };
				
				 function drawRectangle(context, x, y,width,height,card_Color/*fillStyle*/, fonttype, filltext1,filltext2,filltext3,filltext4)
				{
						console.log("draw rectangle");
				    	draw(context, x, y,width,height, card_Color/*fillStyle*/, fonttype ,filltext1,filltext2,filltext3,filltext4);
				  		console.log("x= " + x +"y="+y);
				    	var rectangle = new Rectangle(x, y,width, height);///15,110);
				  		/* x=x+20; */
				  		console.log("Rect Obj :- "+"rectangle.left" + rectangle.left + "rectangle.top" + rectangle.top + "rectangle.right" + rectangle.right + "rectangle.bottom" +rectangle.bottom  )
				   	    cards.push(rectangle); 
				  		console.log(cards)
				 
				}
				
				 // drawrectangle(context_rectangle2,30, 20, "bold 32px Arial", "1", cards);
				  // drawrectangle(context_rectangle2,30,20, "bold 32px Arial", "2",cards);
			/**@ ON Click event Function *****/
				$('#rectangle2').click(function (e)
				{
						//alert("click function");
						 console.log("e.pageX : " + e.pageX +"  this.offsetLeft  "+ this.offsetLeft);
				   		 var clickedX = e.pageX - this.offsetLeft;
				   		console.log("clickedX: " + clickedX);
				   		
				   		var rect2Bound  = canvas_rectangle2.getBoundingClientRect();
				   		console.log("e.clientX : " + e.clientX +",   this.offsetLeft  "+ this.offsetLeft + ",  and  rect2Bound.left  :- " +  rect2Bound.left +",   rect2Bound.top :- "+ 
				   			 rect2Bound.top);
				   		var clickedClientX = e.clientX - this.offsetLeft/*  - rect2Bound.left */;
				   		console.log("clickedClientX: " + clickedClientX);
				   		
				   		var clickedClientY = e.clientY - this.offsetTop - rect2Bound.top;
				   		console.log("clickedClientY:  " + clickedClientY);
				   		 
				   	 	var clickedY = e.pageY - this.offsetTop;
				   	 	/* console.log("e.pageY : "  + e.pageY + "   and  offset top := " + this.offsetTop);
				   	 	console.log("clickedY : "  + clickedY) */
				   	 	//console.log( " e.clientX : " +e.clientX +" and  e.clientY : "+ e.clientY)
				   	 	//console.log( " e.pageX : " + e.pageX +" and  e.pageY : "+ e.pageY)
				        console.log("card length : " + cards.length)
				    	//console.log("clickedX : " + e.clickedX +", clickedY : " + e.clickedY)
				   	 for (var i = 0; i < cards.length; i++) 
				    	{
				     	   //console.log("for loop :- "+ i);
				     	  console.log(cards[i]+ "cards[i].left : " + cards[i].left + ",  cards[i].right:  " + cards[i].right + ",  cards[i].top: " + cards[i].top + ",  cards[i].bottom:  " +cards[i].bottom )
				   	 	 	if (clickedClientX < cards[i].right && clickedClientX > cards[i].left )// && clickedY > cards[i].top && clickedY < cards[i].bottom)
				      	  {
				        	//console.log("clickedX" + clickedX +"clickedY" + clickedY)
				        	//console.log(cards[i]+ "cards[i].right" + cards[i].right + "cards[i].left " + cards[i].left + "cards[i].top" + cards[i].top + "cards[i].bottom " +cards[i].bottom )
				           // alert('clicked number' + (i + 1));
				        	 alert('clicked number' + (i + 1));
				   		   } 
					 	}
				});
				
			
			/**Card Click Events*/
			function q1(){
				
				alert('Card 1 Clicked !');
			}
			function q2(){
				alert('Card 2 Clicked !');
			}
			function q3(){
				alert('Card 3 Clicked !');
			}
			function q4(){
				alert('Card 4 Clicked !');
			}
			function q5(){
				alert('Card 5 Clicked !');
			}
			function q6(){
				alert('Card 6 Clicked !');
			}
			function q7(){
				alert('Card 7 Clicked !');
			}
			function q8(){
				alert('Card 8 Clicked !');
			}
			function q9(){
				alert('Card 9 Clicked !');
			}
			function q10(){
				alert('Card 10 Clicked !');
			}
			function q11(){
				alert('Card 11 Clicked !');
			}
			function q12(){
				alert('Card 12 Clicked !');
			}
			function q13(){
				alert('Card 13 Clicked !');
			}
			function q14(){
				alert('Card 14 Clicked !');
			}
			
			
			
			
			
			//init();
		
		