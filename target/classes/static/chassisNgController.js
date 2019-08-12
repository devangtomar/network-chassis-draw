
/**
	 * Init Function: First Entry Point of Angular
	 */
init= function($scope){
	    console.log("init")
		$scope.mainCanvas = $('#chassisFrontCanvas');
		$scope.ctx = $scope.mainCanvas.get(0).getContext("2d");
		
		console.log(window.innerWidth + " and "+ window.innerHeight + " and json "+ $scope.dwdmDetails.chassis)
		
		
		/**
		 * validate card physical status 
		 */	    
	    $scope.validateCardStatus = function(cardStatus){
	        switch(cardStatus){
	            case "Present":
	            case "Ready":
	            case "Provisioned":
	                return true;
	            default:
	                return false;
	        }
	    };

		
		/**
		 * validate cscc secondary status. false=>card not drawn;
		 */	     
	    $scope.validateCsccStatus = function(csccSecondaryStatus){        
	        switch(csccSecondaryStatus){
	            case "1"://Active
	                return true;
	            default:
	                return false;
	        }
	    }

	
		/**
		 * 
		 */
		$scope.getCardSlotCount = function(selectedSubRack,slotId){
	        for(var i=0;i<selectedSubRack.cardList.length;i++){            
	            if(selectedSubRack.cardList[i].slotId == slotId){
	                return parseInt(selectedSubRack.cardList[i].maxSlotPerCard);
	            }
	        }
	        return 1;
	    };
	
	    /**
	     * 
	     */
	    $scope.CreateOrderedArrayList = function(arrayList,tag){         
	        arrayList = arrayList
	        .sort(function(a,b){
	            return a[tag]-b[tag]
	        });                
	    }; 
	    
	    /**
	     * 
	     */
	    $scope.CreateReverseOrderedArrayList = function(arrayList,tag){         
	        arrayList = arrayList
	        .sort(function(a,b){
	            return b[tag]-a[tag]
	        });                
	    };
	    
	    /**
	     * reorder chassis details in-order to rackId,subRackId,slotId,portId 
	     */    
	    $scope.reOrderChassisDetails = function(){
	        var i,j,k;
	        //port sort
	        for(i=0;i<$scope.dwdmDetails.chassisDetails.chassis.specs.rackList.length;i++){
	            for(j=0;j<$scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList.length;j++){
	                for(k=0;k<$scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList.length;k++){
	                    ///$scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList[k].portList,"portId");                                        
	                }
	                $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList,"slotId");                
	            }            
	            $scope.CreateReverseOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList,"subRackId");            
	        }
	        $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList,"rackId");                
	    };
	    
	
		/**
		 * 
		 */
		$scope.initNgChassisViewController = function(){
			console.log("initNgChassisViewController");
			
			/**Initialize Ng Params from Canvas*/
			$scope.initNgChassisParamsFromCanvas();
			/**Reorder JSON based on the params*/
		    $scope.reOrderChassisDetails();			
			/**Initialize Ng Params from JSON*/
			$scope.initNgChassisParamsFromJSON();			
			/**Generate All Views from the JSON*/	
			$scope.generateNgChassisViewFromJson();
			/**Feed to View for Sequential Views*/		
		}
		
			
		
		
		/**
		 * 
		 */
		$scope.initNgChassisParamsFromCanvas=function(){
		    console.log("initNgChassisParamsFromCanvas ");//+ $scope.dwdmDetails./*chassisDetails.*/chassis.specs.maxRackPerChassis)
			/**Initialize to zero*/
			$scope.dwdmDetails={};
			$scope.dwdmDetails.selectedMo = {};
		    $scope.dwdmDetails.canvasDetails = {};
		    $scope.dwdmDetails.canvasDetails.racks = [];
		    $scope.dwdmDetails.selectedMo.selectedRack = 1;
		    $scope.dwdmDetails.chassisDetails = $scope.chassisViewNonDbData;		    
		    
		    
		    /**Iterate through Maximum number to fill the $scope*/
		    for(var i=0;i<$scope.chassisViewNonDbData.chassis.specs.maxRackPerChassis;i++){
		    	console.log("initNgChassisParamsFromCanvas "+ i)
		        $scope.dwdmDetails.canvasDetails.racks[i] = {};
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace={};       
		        
		        /**Front face: 1-D*/
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas = $('#chassisFrontCanvas');///$('#rackFace2canvas'+(i+1));             
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx = $scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.get(0).getContext("2d");
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.globalCompositeOperation='source-over';
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.font = (/*$scope.dwdmDetails.selectedMo.fontSize*/10/2)+"px Arial";
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.lineJoin = "round";            
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.width = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.css('width'));
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.height = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.css('height'));
		        $scope.dwdmDetails.canvasDetails.racks[i].frontFace.fixedBorder = 1.5*($scope.dwdmDetails.canvasDetails.racks[i].frontFace.height)/100;
		
		        /**back face: DBG => Not taking into account as of now*//*
		        $scope.dwdmDetails.canvasDetails.racks[i].backFace={};*/	        
		        
		    }                
		
		}
		
		
		/**
		 * 
		 */
		$scope.initNgChassisParamsFromJSON=function(){
			
				var xStart=0,yStart,i,j,k;
		        var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace;
		        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
		        var selectedCard;
		        var drawWidth;        
		        
		        selectedRackChassisDetail.slotHeight = selectedRackFrontCanvas.width/selectedRackChassisDetail.maxSubRackPerRack;
		        selectedRackChassisDetail.topTray = {};
		        selectedRackChassisDetail.topTray.x = 0;
		        selectedRackChassisDetail.topTray.y = 0;
		        selectedRackChassisDetail.topTray.thickness = selectedRackFrontCanvas.width;  	     
		        selectedRackChassisDetail.topTray.height = Math.floor(selectedRackFrontCanvas.height*8/100);/**8% of total height for Fan Tray*/
		        
		        		               
		        
		        yStart = selectedRackChassisDetail.topTray.height;/**Height of Fantray or Upper panel*/

		        /**Each slot height: canas_height - tray height - */
		        selectedRackChassisDetail.slotHeight = (selectedRackFrontCanvas.height-(2*selectedRackChassisDetail.topTray.height)-
		        		(selectedRackChassisDetail.maxSubRackPerRack-1)*(selectedRackFrontCanvas.fixedBorder))/selectedRackChassisDetail.maxSubRackPerRack;        
		        
		        console.log("selectedRackChassisDetail.slotHeight : " + selectedRackChassisDetail.slotHeight);
		        xStart = selectedRackFrontCanvas.fixedBorder;
		        console.log("xStart : "+ xStart)
		        drawWidth = selectedRackFrontCanvas.width-2*xStart;/**Total Available Width: Minus the border from two sides*/
		        console.log("drawWidth : "+ drawWidth)
		        
		        /**set card coordinates*/
		        for(i=0;i<selectedRackChassisDetail.subRackList.length;i++){/**subrack times loop*/            
		            selectedRackChassisDetail.subRackList[i].slotThickness = drawWidth/selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;
		            console.log("I in Set "+ i );
		            
		            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;j++){/**no of cards per each subrack times loop*/
		                console.log("J in Set "+ j );
		            	selectedCard = selectedRackChassisDetail.subRackList[i].cardList[j]; 
		            	console.log("selectedCard.slotId : "+selectedCard.slotId);
		                selectedCard.x = xStart + Math.floor(parseInt(selectedCard.slotId-1)%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)
		                				*(selectedRackChassisDetail.subRackList[i].slotThickness);/**Take width upto the previous card and calc x*/
		                selectedCard.y = yStart + i*selectedRackChassisDetail.slotHeight;  
		                selectedCard.thickness = selectedCard.maxSlotPerCard*selectedRackChassisDetail.subRackList[i].slotThickness;/** no of slots occupied per card * each slot thickness*/
		                selectedCard.height = selectedRackChassisDetail.slotHeight;                                 
		                selectedCard.textColor = '#838383';
		                
		                console.log("selectedCard.x "+selectedCard.x + " and selectedCard.y: "+ selectedCard.y );
		            }
		            yStart += selectedRackFrontCanvas.fixedBorder;
		            
		        }		
		}
		
		/**
		 * 
		 */
		$scope.drawFace2Panel = function(){
			console.log("drawFace2Panel");///+$scope.chassisViewDbData.chassis.specs.gneId);

			
			var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace;			
	        var ctxmyCanvas1 = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.ctx;                     
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
	    
	        /* selectedRackChassisDetail.slotHeight = selectedRackFrontCanvas.width/selectedRackChassisDetail.maxSubRackPerRack;
	        selectedRackChassisDetail.topTray = {};
	        selectedRackChassisDetail.topTray.x = 0;
	        selectedRackChassisDetail.topTray.y = 0;
	        selectedRackChassisDetail.topTray.thickness = selectedRackFrontCanvas.width;  	     
	        selectedRackChassisDetail.topTray.height = Math.floor(selectedRackFrontCanvas.height*8/100);*//**8% of total height for Fan Tray*/
		    
	        var xStart,yStart,x,y,y1,slotThickness,slotHeight,slotCount;/**All Vars*/
	        
	        /**Draw Top FanTray*/	        
	        xStart = selectedRackFrontCanvas.fixedBorder;
	        yStart = selectedRackChassisDetail.topTray.height;
	        
	        console.log("x and y Start"+xStart +", "+ yStart);	        
	        
	        selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;  
	        selectedRackFrontCanvas.ctx.beginPath();
	        selectedRackFrontCanvas.ctx.moveTo(selectedRackChassisDetail.topTray.x, 
	        		selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2);
	        selectedRackFrontCanvas.ctx.lineTo(selectedRackChassisDetail.topTray.x+selectedRackChassisDetail.topTray.thickness, 
	        		selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2);
	        selectedRackFrontCanvas.ctx.stroke();        

	        selectedRackFrontCanvas.ctx.save();   //to save the last operation
	        
	        selectedRackFrontCanvas.ctx.translate(selectedRackChassisDetail.topTray.thickness/4+30, 
	        		selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-17);
	        selectedRackFrontCanvas.ctx.font =  "60px Verdana"; 
            selectedRackFrontCanvas.ctx.fillStyle = "Green";
            selectedRackFrontCanvas.ctx.fillText("ROADM",0,0);/*selectedRackChassisDetail.topTray.x/2,selectedRackChassisDetail.topTray.y/2);*/
            selectedRackFrontCanvas.ctx.restore();
	        
	        /**Draw Subracks and Slots along with cards*/	               
	        for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++){
	        	 	console.log("for i : "+i);
	        		
	        	 	/**contex init*/
	        		selectedRackFrontCanvas.ctx.strokeStyle = "black";/**fill top by*/            
		            selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;

		            y1 = selectedRackChassisDetail.topTray.height+(i+1)*selectedRackChassisDetail.slotHeight+(2*i+1)*(selectedRackFrontCanvas.fixedBorder/2);
		            
		            
		            console.log("y1 : "+y1 + " and selectedRackChassisDetail.slotHeight "+selectedRackChassisDetail.slotHeight
		            		+" and selectedRackFrontCanvas.width "+ selectedRackFrontCanvas.width);
		            selectedRackFrontCanvas.ctx.beginPath();
		            selectedRackFrontCanvas.ctx.moveTo(0,y1);
		            selectedRackFrontCanvas.ctx.lineTo(selectedRackFrontCanvas.width,y1);
		            selectedRackFrontCanvas.ctx.stroke();
		            
		            /**label subrack*/
		            selectedRackFrontCanvas.ctx.save();
		            selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.fixedBorder-5, y1-selectedRackChassisDetail.slotHeight/2);            
		            selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
		            selectedRackFrontCanvas.ctx.textAlign = "right";
		            selectedRackFrontCanvas.ctx.font = "bold " + (/*$scope.dwdmDetails.selectedMo.fontSize*/10) + "px Arial"; 
		            selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
		            selectedRackFrontCanvas.ctx.fillText("Subrack "+(selectedRackChassisDetail.maxSubRackPerRack-i),0,0);
		            
		            
		            selectedRackFrontCanvas.ctx.restore();
		            
		            
		            var maxSlotPerSubRack = selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;
		            
		            /**Per Subrack Common Operations*/
		            for(j=0;j<maxSlotPerSubRack;){
		            console.log("Per Subrack Common Operations");	
	            	   
	            	   
		            	/**fill each slot by default params*/
		                selectedRackFrontCanvas.ctx.strokeStyle = "grey";//#838383
		                selectedRackFrontCanvas.ctx.lineWidth = 2;
		                x = xStart + Math.floor(j%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)*
		                (selectedRackChassisDetail.subRackList[i].slotThickness);
		                y = yStart + i*selectedRackChassisDetail.slotHeight;                  
		                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i],j+1);                
		                slotThickness = slotCount*selectedRackChassisDetail.subRackList[i].slotThickness;
		                slotHeight = selectedRackChassisDetail.slotHeight;                
		                selectedRackFrontCanvas.ctx.strokeRect(x,y,slotThickness,slotHeight);   
		                
	            	   	
		            	/**label slots*/
		                selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
		                selectedRackFrontCanvas.ctx.textAlign = "center";
		                selectedRackFrontCanvas.ctx.font = "bold " + (/*$scope.dwdmDetails.selectedMo.fontSize*/10) + "px Arial";   
		                selectedRackFrontCanvas.ctx.fillText((j+1),x+slotThickness/2,y-selectedRackFrontCanvas.fixedBorder/4);/**slot numbering*/
		                
		                
		                /**label subrack:left*/
		                selectedRackFrontCanvas.ctx.save();
		                selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.fixedBorder-2, y1-selectedRackChassisDetail.slotHeight/2-30);      		                
		                selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
		                selectedRackFrontCanvas.ctx.textAlign = "right";
		                selectedRackFrontCanvas.ctx.font = /*"bold " + */(/*$scope.dwdmDetails.selectedMo.fontSize*/14) + "px Arial"; 
		                selectedRackFrontCanvas.ctx.fillStyle = "black";
		                selectedRackFrontCanvas.ctx.fillText("Subrack "+(selectedRackChassisDetail.maxSubRackPerRack-i),0,0);
		                selectedRackFrontCanvas.ctx.restore();
		                /**label subrack:right*/
		                selectedRackFrontCanvas.ctx.save();		                            
		                selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.width-10, y1-selectedRackChassisDetail.slotHeight/3);
		                selectedRackFrontCanvas.ctx.rotate(Math.PI/2); 
		                selectedRackFrontCanvas.ctx.textAlign = "right";
		                selectedRackFrontCanvas.ctx.font = /*"bold " + */(/*$scope.dwdmDetails.selectedMo.fontSize*/14) + "px Arial"; 
		                selectedRackFrontCanvas.ctx.fillStyle = "black";
		                selectedRackFrontCanvas.ctx.fillText("Subrack "+(selectedRackChassisDetail.maxSubRackPerRack-i),0,0);
		                selectedRackFrontCanvas.ctx.restore();
		                
		                
		                j+=slotCount;
		                   
		           		                
		            }
		            	            		            
		            
		            
		            /**slot drawing*/		           
		            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;){
		            	
		                        	
		            	console.log("j : "+j);
		                selectedRackFrontCanvas.ctx.strokeStyle = "green";//#838383
		                selectedRackFrontCanvas.ctx.lineWidth = 2;
		                x = xStart + Math.floor(j%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)*
		                (/*selectedRackChassisDetail.subRackList[i].slotThickness*/selectedRackFrontCanvas.width/14)-10;
		                y = yStart + i*selectedRackChassisDetail.slotHeight;                  
		                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i],j+1);		                
		                slotThickness = /*slotCount *  (selectedRackFrontCanvas.width/16);*/slotCount*selectedRackChassisDetail.subRackList[i].slotThickness;
		                slotHeight = selectedRackChassisDetail.slotHeight;                
		               //selectedRackFrontCanvas.ctx.strokeRect(x,y,slotThickness,slotHeight);   
		                
		                
		                /**white background=> card present, gray=> card absent*/
		              /*  if($scope.validateCardStatus(selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus)){
		                    selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
		                    selectedRackFrontCanvas.ctx.fillRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,
		                    		selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].
		                    		thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
		                    selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,
		                    		selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,
		                    		selectedRackChassisDetail.subRackList[i].cardList[j].height);
		                    selectedRackChassisDetail.subRackList[i].cardList[j].textColor='black';
		                }
		                */
		                selectedRackFrontCanvas.ctx.fillStyle = "grey";
	                    selectedRackFrontCanvas.ctx.fillRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
	                    selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,
	                    		selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,
	                    		selectedRackChassisDetail.subRackList[i].cardList[j].height);
	                    selectedRackChassisDetail.subRackList[i].cardList[j].textColor='black';
		                
		                
		                console.log("slotCount: "+slotCount);
		                console.log("slotThickness: "+slotThickness);
		                console.log("slotHeight: "+slotHeight);
		         
		                	                
		                
		                /**label card*/
		                selectedRackFrontCanvas.ctx.save();
		                selectedRackFrontCanvas.ctx.translate(selectedRackChassisDetail.subRackList[i].cardList[j].x+selectedRackChassisDetail.subRackList[i].
		                		slotThickness/2, selectedRackChassisDetail.subRackList[i].cardList[j].y+selectedRackChassisDetail.slotHeight/2);
		                selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
		                selectedRackFrontCanvas.ctx.textAlign = "center";
		                selectedRackFrontCanvas.ctx.font = /*$scope.dwdmDetails.selectedMo.fontSize*/15+"px Arial bold"; 
		                selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].textColor;
		                
		                if(selectedRackChassisDetail.subRackList[i].cardList[j].type == "3"){
		                    /**CSCC Card*/
		                    if($scope.validateCsccStatus(selectedRackChassisDetail.subRackList[i].cardList[j].secondaryStatus)){
		                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Active)",0,0);
		                    } else {
		                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Passive)",0,0);
		                    }                    
		                } else {
		                    selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName 
		                       /* + " (" + selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus + ") "*/,0,0);
		                }
		                
		                selectedRackFrontCanvas.ctx.restore();
		              
		                /**Card Draws Using Rect*/

		                console.log("x and y "+ x + " and "+y);		                                
		                
		                
		                   
		                
		                
		                
		                
		                j = j + 1/*slotCount*/;
		                
		            }
		            console.log("yStart before =======================> "+yStart);
		            console.log("selectedRackFrontCanvas.fixedBorder  "+selectedRackFrontCanvas.fixedBorder);
		            yStart += selectedRackFrontCanvas.fixedBorder;
		            console.log("yStart after =======================> "+yStart);
		        }
		            
	        }
	        
	         /*ctxmyCanvas1.fillStyle ='red';
			 ctxmyCanvas1.beginPath();
			 ctxmyCanvas1.rect(0,0,679,618);
			 ctxmyCanvas1.closePath();
			 ctxmyCanvas1.shadowBlur=5;
			 ctxmyCanvas1.shadowColor="black";
			 ctxmyCanvas1.fill();
			 ctxmyCanvas1.lineWidth=2;
			 ctxmyCanvas1.strokeStyle = 'black';
			 ctxmyCanvas1.stroke();*/
	        
	        
	        /*selectedRackFrontCanvas.ctx.fillRect(0, 0, selectedRackFrontCanvas.width, selectedRackFrontCanvas.height);*/
			
			/*	
			        *//**draw cards*//*
			        var i,j,k,l;        
			        var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace;
			        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];                     
			        
			        selectedRackFrontCanvas.ctx.fillStyle='#4d4d4d';//ddd
			        selectedRackFrontCanvas.ctx.fillRect(0, 0, selectedRackFrontCanvas.width, selectedRackFrontCanvas.height); 
			                
			        *//**draw rack*//*
			        selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#838383
			        selectedRackFrontCanvas.ctx.lineWidth = 2*selectedRackFrontCanvas.fixedBorder;
			        selectedRackFrontCanvas.ctx.strokeRect(0, 0, selectedRackFrontCanvas.width, selectedRackFrontCanvas.height);         

			        *//**draw top tray*//*
			        selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;  
			        selectedRackFrontCanvas.ctx.beginPath();
			        selectedRackFrontCanvas.ctx.moveTo(selectedRackChassisDetail.topTray.x, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2);
			        selectedRackFrontCanvas.ctx.lineTo(selectedRackChassisDetail.topTray.x+selectedRackChassisDetail.topTray.thickness, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2);
			        selectedRackFrontCanvas.ctx.stroke();        

			        *//**draw subracks*//*  
			        var xStart,yStart,x,y,y1,slotThickness,slotHeight,slotCount;
			        xStart = selectedRackFrontCanvas.fixedBorder;
			        yStart = selectedRackChassisDetail.topTray.height;

			        *//**draw slots*//*        
			        for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++){
			            selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#838383            
			            selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;
			            y1 = selectedRackChassisDetail.topTray.height+(i+1)*selectedRackChassisDetail.slotHeight+(2*i+1)*(selectedRackFrontCanvas.fixedBorder/2);
			            selectedRackFrontCanvas.ctx.beginPath();
			            selectedRackFrontCanvas.ctx.moveTo(0,y1);
			            selectedRackFrontCanvas.ctx.lineTo(selectedRackFrontCanvas.width,y1);
			            selectedRackFrontCanvas.ctx.stroke();
			            
			            *//**label subrack*//*
			            selectedRackFrontCanvas.ctx.save();
			            selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.fixedBorder-5, y1-selectedRackChassisDetail.slotHeight/2);            
			            selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
			            selectedRackFrontCanvas.ctx.textAlign = "right";
			            selectedRackFrontCanvas.ctx.font = "bold " + ($scope.dwdmDetails.selectedMo.fontSize) + "px Arial"; 
			            selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
			            selectedRackFrontCanvas.ctx.fillText("Subrack "+(selectedRackChassisDetail.maxSubRackPerRack-i),0,0);
			            selectedRackFrontCanvas.ctx.restore();            
			            
			            for(j=0;j<selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;){
			                selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#838383
			                selectedRackFrontCanvas.ctx.lineWidth = 2;
			                x = xStart + Math.floor(j%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)*
			                (selectedRackChassisDetail.subRackList[i].slotThickness);
			                y = yStart + i*selectedRackChassisDetail.slotHeight;                  
			                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i],j+1);                
			                slotThickness = slotCount*selectedRackChassisDetail.subRackList[i].slotThickness;
			                slotHeight = selectedRackChassisDetail.slotHeight;                
			                selectedRackFrontCanvas.ctx.strokeRect(x,y,slotThickness,slotHeight);   
			                
			                *//**label slots*//*
			                selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
			                selectedRackFrontCanvas.ctx.textAlign = "center";
			                selectedRackFrontCanvas.ctx.font = "bold " + ($scope.dwdmDetails.selectedMo.fontSize/2) + "px Arial";   
			                selectedRackFrontCanvas.ctx.fillText((j+1),x+slotThickness/2,y-selectedRackFrontCanvas.fixedBorder/4);
			                
			                j = j + slotCount;
			            }
			            yStart += selectedRackFrontCanvas.fixedBorder;
			        }
			        //draw bottom tray
//			        selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;  
//			        selectedRackFrontCanvas.ctx.strokeStyle = "#838383";        
//			        selectedRackFrontCanvas.ctx.beginPath();
//			        selectedRackFrontCanvas.ctx.moveTo(selectedRackChassisDetail.bottomTray.x, selectedRackChassisDetail.bottomTray.y+selectedRackFrontCanvas.fixedBorder/2);
//			        selectedRackFrontCanvas.ctx.lineTo(selectedRackChassisDetail.bottomTray.width, selectedRackChassisDetail.bottomTray.y+selectedRackFrontCanvas.fixedBorder/2);
			        //draw cards & ports
//			        var gradient;        
			        for(i=0;i<selectedRackChassisDetail.subRackList.length;i++){
			            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;j++){
//			                gradient = selectedRackFrontCanvas.ctx.createLinearGradient(
//			                    selectedRackChassisDetail.subRackList[i].cardList[j].x,
//			                    selectedRackChassisDetail.subRackList[i].cardList[j].y,
//			                    selectedRackChassisDetail.subRackList[i].cardList[j].x+selectedRackChassisDetail.subRackList[i].cardList[j].thickness,
//			                    selectedRackChassisDetail.subRackList[i].cardList[j].y+selectedRackChassisDetail.subRackList[i].cardList[j].height);
//			                
//			                gradient.addColorStop("0","#838383");
//			                gradient.addColorStop("0.5","#ddd");
//			                gradient.addColorStop("1.0","gray");
//			                selectedRackFrontCanvas.ctx.strokeStyle = gradient;
			                selectedRackFrontCanvas.ctx.lineWidth = 4;
			                selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#ddd   
			                //white background=> card present, gray=> card absent
			                if($scope.validateCardStatus(selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus)){
			                    selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
			                    selectedRackFrontCanvas.ctx.fillRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
			                    selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
			                    selectedRackChassisDetail.subRackList[i].cardList[j].textColor='black';
			                }                
			                //draw ports for MPN card
			                if(selectedRackChassisDetail.subRackList[i].cardList[j].type=="1"){
			                    for(k=0;k<selectedRackChassisDetail.subRackList[i].cardList[j].maxPortPerCard;k++){
			                        //circular ports
//			                        selectedRackFrontCanvas.ctx.beginPath();
//			                        selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].radius, 0, 2*Math.PI, false);
//			                        selectedRackFrontCanvas.ctx.stroke();
//			                        selectedRackFrontCanvas.ctx.beginPath();
//			                        selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].radius/2, 0, 2*Math.PI, false);
//			                        selectedRackFrontCanvas.ctx.stroke();
			                        if(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].portType == "1"){
			                            selectedRackFrontCanvas.ctx.drawImage($scope.chassisViewDetails.chassisImages['clientPort'],selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height);                            
			                        } else if(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].portType == "0"){
			                            selectedRackFrontCanvas.ctx.drawImage($scope.chassisViewDetails.chassisImages['linePort'],selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height);
			                        }
			                        selectedRackFrontCanvas.ctx.lineWidth = 2;
			                        selectedRackFrontCanvas.ctx.strokeStyle = selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[0].color;
			                        selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height);
			                        //label ports
			                        selectedRackFrontCanvas.ctx.fillStyle = "#000000";
			                        selectedRackFrontCanvas.ctx.textAlign = "center";
			                        selectedRackFrontCanvas.ctx.font = "bold " + ($scope.dwdmDetails.selectedMo.fontSize/2) + "px Arial";   
			                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].portId,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x+5*selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width/4,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y+selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height/2);                        
			                        //draw buttons for each port
			                        for(l=0;l<selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button.length;l++){
			                            selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].color;
			                            selectedRackFrontCanvas.ctx.beginPath();
			                            selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].x,
			                                selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].y,
			                                selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].radius,0,2*Math.PI,false
			                            );
			                            selectedRackFrontCanvas.ctx.fill();
			                        }
			                    }                    
			                }                 
			                //label card
			                selectedRackFrontCanvas.ctx.save();
			                selectedRackFrontCanvas.ctx.translate(selectedRackChassisDetail.subRackList[i].cardList[j].x+selectedRackChassisDetail.subRackList[i].slotThickness/2, selectedRackChassisDetail.subRackList[i].cardList[j].y+selectedRackChassisDetail.slotHeight/2);
			                selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
			                selectedRackFrontCanvas.ctx.textAlign = "center";
			                selectedRackFrontCanvas.ctx.font = $scope.dwdmDetails.selectedMo.fontSize+"px Arial"; 
			                selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].textColor;
			                
			                if(selectedRackChassisDetail.subRackList[i].cardList[j].type == "3"){
			                    //CSCC Card
			                    if($scope.validateCsccStatus(selectedRackChassisDetail.subRackList[i].cardList[j].secondaryStatus)){
			                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Active)",0,0);
			                    } else {
			                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Passive)",0,0);
			                    }                    
			                } else {
			                    selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName 
			                        + " (" + selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus + ") ",0,0);
			                }
			                selectedRackFrontCanvas.ctx.restore();
			            }
			        }			
	    };*/
	    
		
		
		
		/**
		 * 
		 */
	    $scope.generateNgChassisViewFromJson = function(){
			console.log("generateNgChassisViewFromJson");			
	        			
			setTimeout(function(){
	            $scope.$apply(function(){
//	                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.ctx.clearRect(0, 0, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.width, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.height);
///	                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.ctx.clearRect(0, 0, 680,1428);
	                $scope.drawFace2Panel();
	            });
	        }, 100);
		}

		$scope.initNgChassisViewController();/**DBG=> Temp selectedNeNode set as 1*/
}

function initChassisViewController($scope,$http,$document,selectedNeNode){
	console.log("initChassisViewController")
	
    $scope.initNeViewProperties = function(){
        $scope.dwdmDetails = {};                        //selected DWDM details
        $scope.dwdmDetails.chassisDetails = {};                     //chassis details from secure/home/chassisDetails (global)
        $scope.dwdmDetails.selectedMo = {};                         //selected MO
        //    $scope.dwdmDetails.selectedMo.selectedRack = 0;           //selected Rack Id :  1 to chassisDetails.chassis.specs.maxRackPerChassis (private)
        $scope.dwdmDetails.selectedRackDetails = {};                //selected rack details (global)    
        $scope.dwdmDetails.selectedRackParameters = {};             //3D Rack params
    
        $scope.dwdmDetails.selectedMo.selectedGne = selectedNeNode.gneId;
        $scope.dwdmDetails.selectedMo.selectedChild = selectedNeNode.neId;
        $scope.dwdmDetails.selectedMo.selectedRack = 1;   
        $scope.dwdmDetails.selectedMo.chassisSize = 3;
        //reset timer for face refresh        
        clearTimeout($scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimer);
        //refresh chassis view every 2 minutes   
        clearTimeout($scope.periodicTaskList.chassisTasks.chassisRefreshTask.refreshTimer);
        $scope.periodicTaskList.chassisTasks.chassisRefreshTask.refreshTimerCount = 0;
        $scope.periodicTaskList.chassisTasks.chassisRefreshTask.refreshTimer = setInterval($scope.refreshChassisView,2000*60);                        
//        $scope.containerDetails.Width = 0;
//        $scope.slotDetails.Height = 120;
//        $scope.slotDetails.Perspective = 240;
//        $scope.slotDetails.faceWidth = 30;
    };
        
    $scope.neChangeHandler = function(){
        selectedNeNode = $scope.chassisViewDetails.allNeSelectCb;
        $scope.initNeAction();
    };    
    
    $scope.initNeAction = function(){
        $scope.resizeChassisView(3);
        $scope.initNeViewProperties();        
        $scope.getChassisDetails($scope.initChassisMetrics);
    };
    
    
    $scope.fetchAllNeDetails = function($scope){          
        console.log("fetchAllNeDetails")    
    	$scope.chassisViewDetails.neNodeList = response;
                   
    	if(selectedNeNode != undefined && selectedNeNode != null){                         
    		$scope.chassisViewDetails.allNeSelectCb = 
    			$scope.chassisViewDetails.neNodeList.mo[$scope.getIndexOfArray($scope.chassisViewDetails.neNodeList.mo,selectedNeNode.neId,'neId')];                        
    		$scope.initNeAction();  
    	} else if($scope.chassisViewDetails.allNeSelectCb !== undefined){
    		//selectedNeNode=undefined && $scope.chassisViewDetails.allNeSelectCb != undefined when tab navigation from X view to Chassis View, after chassis view was already loaded.
    		$scope.chassisViewDetails.allNeSelectCb = $scope.chassisViewDetails.neNodeList.mo[$scope.getIndexOfArray($scope.chassisViewDetails.neNodeList.mo,$scope.chassisViewDetails.allNeSelectCb.neId,'neId')];                                                                        
    		$scope.neChangeHandler();      
    	}                 
    
    };        
    
    $scope.initChassisSupportProperties = function(){        
        if($scope.chassisViewDetails.chassisImages == undefined){
            $scope.chassisViewDetails.chassisImages = {};
            $scope.chassisViewDetails.chassisImageSources = {                                                         //image Array source
//                muxCard:'resources/js/networkView/chassisView/muxCard.png',
                clientPort:'resources/js/networkView/chassisView/clientPort.png',
                linePort:'resources/js/networkView/chassisView/linePort.png'
//                teMainRack:'resources/js/networkView/teMainRackTest.png',
//                teMuxponRack:'resources/js/networkView/teMuxponRackTest.png',
//                ilaRack:'resources/js/networkView/ilaRackTest.png'
            };
        }        
        
        var loadedImages = 0;
        var numImages = 2;
        
        for(var src in $scope.chassisViewDetails.chassisImageSources) {
            $scope.chassisViewDetails.chassisImages[src] = new Image();
            $scope.chassisViewDetails.chassisImages[src].onload = function() {                                    
                if(++loadedImages >= numImages) {                     
                    try{
//                        $scope.drawRackFrontPanel();
                    } catch(exc){}
                }
            };
            $scope.chassisViewDetails.chassisImages[src].src = $scope.chassisViewDetails.chassisImageSources[src];
        }
    }; 
    
    //================================CHASSIS=======================================    
    
    $scope.triggerRackScrollEvent = function(){
        $.event.trigger({
            type: "rackScroll"
        });  
    };
           
    $scope.scrollRackHandler = function(e){           
        $('#chassisContainer').animate({
            scrollLeft: ($scope.dwdmDetails.selectedMo.selectedRack-1)*(parseFloat($('#chassisContainer ul li:nth-child(1)').css('width')))
        }, 1000);
    };        
    //mouse select chassis
    $scope.selectRackHandler = function(index){        
        $scope.dwdmDetails.selectedMo.selectedRack = index;
        $scope.dwdmDetails.selectedMo.fontSize = $scope.getFontSize();
        $scope.fetchSelectedRackDetails($scope.dwdmDetails.selectedMo.selectedRack);
        $scope.triggerRackScrollEvent();
    };        
    
    $scope.getFontSize = function(){
        switch($scope.dwdmDetails.selectedMo.chassisSize){
            case 1:
                return 10;
            case 2:
                return 15;
            case 3:
                return 20;
        }
    };
    
    $scope.initChassisMetrics = function(){
        //rackScroll evt listener
        $(document).on('rackScroll', $scope.scrollRackHandler);   
        $scope.selectRackHandler($scope.dwdmDetails.selectedMo.selectedRack);          
        
        initRackMouseHandler($scope, $http, $document, selectedNeNode);    
    };        
    
    $scope.getChassisDetails = function(callback){        
        $scope.showProcessingIcon();

        $http({
            method: "post",
            url: "secure/networkView/chassisView/getChassisDetails.jsp",
            data: $scope.dwdmDetails.selectedMo.selectedGne+'#'+$scope.dwdmDetails.selectedMo.selectedChild
        })
        .success(function(response){        
            setTimeout(function(){
                $scope.$apply(function () {
                    $scope.dwdmDetails.chassisDetails = response;                    
                    $scope.reOrderChassisDetails();                                          
                    callback();
                });            
            },100);
            $scope.hideProcessingIcon();
        }).error(function(error){
            $scope.hideProcessingIcon();
            alert("HttpError!!\n" + error);
        });
    }; 
    //reorder chassis details in-order to rackId,subRackId,slotId,portId
    $scope.reOrderChassisDetails = function(){
        var i,j,k;
        //port sort
        for(i=0;i<$scope.dwdmDetails.chassisDetails.chassis.specs.rackList.length;i++){
            for(j=0;j<$scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList.length;j++){
                for(k=0;k<$scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList.length;k++){
                    $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList[k].portList,"portId");                                        
                }
                $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList,"slotId");                
            }            
            $scope.CreateReverseOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList,"subRackId");            
        }
        $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList,"rackId");                
    };
    
//===========================RACK===================================================       
    //fetch selected rack's details from chassisDetails
    $scope.fetchSelectedRackDetails = function(){
        if($scope.dwdmDetails.selectedMo.selectedRack != undefined || $scope.dwdmDetails.selectedMo.selectedRack != null){
            setTimeout(function(){
                $scope.$apply(function () {
                    $scope.dwdmDetails.selectedRackDetails = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
                    $scope.initRackViewParameters();
                });            
            },100);
            
            setTimeout(function(){
                $scope.$apply(function(){
                    $scope.createRackInThreeD();
                });
            }, 500);
        }
    };
    
    $scope.initRackViewParameters = function(){
        $scope.dwdmDetails.selectedRackParameters.rackView = {};
        $scope.dwdmDetails.selectedRackParameters.rackView.component = $('#rackView'+$scope.dwdmDetails.selectedMo.selectedRack);//+$scope.dwdmDetails.selectedMo.selectedRack);
        $scope.dwdmDetails.selectedRackParameters.rackView.faceList = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' .face');
        $scope.dwdmDetails.selectedRackParameters.rackView.canvasList = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' .face canvas');        
        $scope.dwdmDetails.selectedRackParameters.specs = {};        
        $scope.dwdmDetails.selectedRackParameters.specs.width = 85*parseFloat($scope.dwdmDetails.selectedRackParameters.rackView.component.css('width'))/100;
        $scope.dwdmDetails.selectedRackParameters.specs.height = 85*parseFloat($scope.dwdmDetails.selectedRackParameters.rackView.component.css('height'))/100;        
    };
    
    $scope.createRackInThreeD = function(){        
        $scope.transformRackToThreeD();
        $scope.initMouseRightClickHandlers();
        $scope.initRackPanels();
        $scope.initRackFrontPanel();
        $scope.initRackBackPanel();
        
        $scope.drawRackFrontPanel();
        $scope.drawRackBackPanel();
        
        $scope.initFrontPanelRefresh();
    };
    //selectedRack -> 3D
    $scope.transformRackToThreeD = function(){
        $scope.dwdmDetails.selectedRackParameters.rackView.component.css({
            '-webkit-perspective':7*$scope.dwdmDetails.selectedRackParameters.specs.height+'px',
            'perspective':7*$scope.dwdmDetails.selectedRackParameters.specs.height+'px',
            'perspective-origin':$scope.dwdmDetails.selectedRackParameters.specs.height+'px -20%',//h/4px 0%
            '-webkit-perspective-origin':$scope.dwdmDetails.selectedRackParameters.specs.height+'px -20%'//h/4px 0%
        });
                        
        var comp = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' > div:first-child');                    
        comp.css({
            'height':$scope.dwdmDetails.selectedRackParameters.specs.width/2,
            'width' : $scope.dwdmDetails.selectedRackParameters.specs.width,
            'transform': 'rotateX(90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.width/4)+'px)',
            'WebkitTransform': 'rotateX(90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.width/4)+'px)'
        });        

        comp = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' > div:nth-child(2)');                    
        comp.css({
            'height':$scope.dwdmDetails.selectedRackParameters.specs.height,
            'width' : $scope.dwdmDetails.selectedRackParameters.specs.width,
            'transform': 'translateZ(' + $scope.dwdmDetails.selectedRackParameters.specs.width/4+'px)',
            'WebkitTransform': 'translateZ(' + $scope.dwdmDetails.selectedRackParameters.specs.width/4+'px)'
        });                        
        
        comp = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' > div:nth-child(3)'); 
        comp.css(            
        {    
            'width':$scope.dwdmDetails.selectedRackParameters.specs.width/2,            
            'height' : $scope.dwdmDetails.selectedRackParameters.specs.height,
            'transform': 'rotateY(90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.width - $scope.dwdmDetails.selectedRackParameters.specs.width/4) +'px)',
            'WebkitTransform': 'rotateY(90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.width-$scope.dwdmDetails.selectedRackParameters.specs.width/4) +'px)'
        });
                    
        comp = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' > div:nth-child(4)');    
        comp.css({
            'height':$scope.dwdmDetails.selectedRackParameters.specs.height,
            'width' : $scope.dwdmDetails.selectedRackParameters.specs.width,
            'transform': 'rotateY(180deg) translateZ(' + $scope.dwdmDetails.selectedRackParameters.specs.width/4+'px)',
            'WebkitTransform': 'rotateY(180deg) translateZ(' + $scope.dwdmDetails.selectedRackParameters.specs.width/4+'px)'
        });

        comp = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' > div:nth-child(5)');    
        comp.css({
            'width' : $scope.dwdmDetails.selectedRackParameters.specs.width,
            'height':$scope.dwdmDetails.selectedRackParameters.specs.width/2,
            'transform': 'rotateX(-90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.height-$scope.dwdmDetails.selectedRackParameters.specs.width/4) +'px)',
            'WebkitTransform': 'rotateX(-90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.height-$scope.dwdmDetails.selectedRackParameters.specs.width/4) +'px)'
        });

        comp = $('#rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack+' > div:nth-child(6)');            
        comp.css({  
            'width':$scope.dwdmDetails.selectedRackParameters.specs.width/2,            
            'height' : $scope.dwdmDetails.selectedRackParameters.specs.height,
            'transform': 'rotateY(-90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.width/4) + 'px)',
            'WebkitTransform': 'rotateY(-90deg) translateZ(' + ($scope.dwdmDetails.selectedRackParameters.specs.width/4) + 'px)'
        });
    };        
    
    $scope.flipRack = function($event){
        $.event.trigger({
            type: "keydown",
            keyCode: 37
        });
    };
    
    $scope.rotateCube = function(ax,ay){
        //rotate cube to xAngle,yAngle        
        var tempId = 'rackInThreeD'+$scope.dwdmDetails.selectedMo.selectedRack;
                    
        setTimeout(function(){
            $scope.$apply(function(){
                $('#'+tempId).css({
                    webkitTransform: "rotateX("+ax+"deg) rotateY("+ay+"deg)"
                });
                $('#'+tempId).css({
                    MozTransform: "rotateX("+ax+"deg) rotateY("+ay+"deg)"
                });
                $('#'+tempId).css({
                    transform: "rotateX("+ax+"deg) rotateY("+ay+"deg)"
                });                
            });
        },100)      
    };
    
    $scope.initMouseRightClickHandlers = function(){
        $scope.dwdmDetails.selectedRackParameters.specs.yAngle = 0;
        $scope.dwdmDetails.selectedRackParameters.specs.selectedFace = 2;
        
        $(document).on('keydown', function(e) {
            e.preventDefault();

            if(e.keyCode == 37){                  
                $scope.dwdmDetails.selectedRackParameters.specs.selectedFace = $scope.dwdmDetails.selectedRackParameters.specs.selectedFace==2?4:2;                
//                $scope.dwdmDetails.selectedRackParameters.specs.yAngle -= 180;//for single direction rotation
                //counterclock-wise for face2->4, clock-wise for face4->2
                if($scope.dwdmDetails.selectedRackParameters.specs.selectedFace==4){
                    $scope.dwdmDetails.selectedRackParameters.specs.yAngle = -180;
                } else {
                    $scope.dwdmDetails.selectedRackParameters.specs.yAngle = 0;
                }
                $scope.rotateCube(0,$scope.dwdmDetails.selectedRackParameters.specs.yAngle);                
            }            
        });    
    };
    //face2,face4
    $scope.initRackPanels = function(){        
        $scope.dwdmDetails.canvasDetails = {};
        $scope.dwdmDetails.canvasDetails.racks = [];
        
        for(var i=0;i<$scope.dwdmDetails.chassisDetails.chassis.specs.maxRackPerChassis;i++){
            $scope.dwdmDetails.canvasDetails.racks[i] = {};
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace={};
            $scope.dwdmDetails.canvasDetails.racks[i].backFace={};
            //front face
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas = $('#rackFace2canvas'+(i+1));             
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx = $scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.get(0).getContext("2d");
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.globalCompositeOperation='source-over';
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.font = ($scope.dwdmDetails.selectedMo.fontSize/2)+"px Arial";
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.lineJoin = "round";            
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.width = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.css('width'));
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.height = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.css('height'));
            $scope.dwdmDetails.canvasDetails.racks[i].frontFace.fixedBorder = 1.5*($scope.dwdmDetails.canvasDetails.racks[i].frontFace.height)/100;
            //back face
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.canvas = $('#rackFace4canvas'+(i+1));                    
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.ctx = $scope.dwdmDetails.canvasDetails.racks[i].backFace.canvas.get(0).getContext("2d");
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.ctx.globalCompositeOperation='source-over';
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.ctx.font = ($scope.dwdmDetails.selectedMo.fontSize/2)+"px Arial";
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.ctx.lineJoin = "round";
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.ctx.lineWidth = "2";
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.width = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].backFace.canvas.css('width'));
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.height = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].backFace.canvas.css('height'));            
            $scope.dwdmDetails.canvasDetails.racks[i].backFace.fixedBorder = 1.5*($scope.dwdmDetails.canvasDetails.racks[i].frontFace.height)/100;
        }                
    };    
    //face2
    $scope.initRackFrontPanel = function(){          
        var xStart=0,yStart,i,j,k;
        var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace;
        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
        var selectedCard;
        var drawWidth;        
        //topTray == PSU subrack
        selectedRackChassisDetail.topTray = {};
        selectedRackChassisDetail.topTray.x = 0;
        selectedRackChassisDetail.topTray.y = 0;
        selectedRackChassisDetail.topTray.thickness = selectedRackFrontCanvas.width;        
        //8% of total height
        selectedRackChassisDetail.topTray.height = Math.floor(selectedRackFrontCanvas.height*8/100);        
        //set card coordinates
        yStart = selectedRackChassisDetail.topTray.height;
//        selectedRackChassisDetail.slotHeightOld = (selectedRackFrontCanvas.height-(2*selectedRackChassisDetail.topTray.height))/selectedRackChassisDetail.maxSubRackPerRack;        
        //H(available) = H(face)-h(topTray)-h(bottomTray)-(SR-1)h(SR.border)
        selectedRackChassisDetail.slotHeight = (selectedRackFrontCanvas.height-(2*selectedRackChassisDetail.topTray.height)-(selectedRackChassisDetail.maxSubRackPerRack-1)*(selectedRackFrontCanvas.fixedBorder))/selectedRackChassisDetail.maxSubRackPerRack;        
        
        xStart = selectedRackFrontCanvas.fixedBorder;
        drawWidth = selectedRackFrontCanvas.width-2*xStart;
                
        for(i=0;i<selectedRackChassisDetail.subRackList.length;i++){            
            selectedRackChassisDetail.subRackList[i].slotThickness = drawWidth/selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;
            
            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;j++){
                selectedCard = selectedRackChassisDetail.subRackList[i].cardList[j];                
                selectedCard.x = xStart + Math.floor(parseInt(selectedCard.slotId-1)%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)*(selectedRackChassisDetail.subRackList[i].slotThickness);
                selectedCard.y = yStart + i*selectedRackChassisDetail.slotHeight;  
                selectedCard.thickness = selectedCard.maxSlotPerCard*selectedRackChassisDetail.subRackList[i].slotThickness;
                selectedCard.height = selectedRackChassisDetail.slotHeight;                                 
                selectedCard.textColor = '#838383';
                //set port coordinates; ports are only present for MPN cards (11 ports)
                if(selectedCard.type=="1"){                    
                    for(k=0;k<selectedCard.maxPortPerCard;k++){
                        //circular ports
//                        selectedCard.portList[k].radius = (selectedCard.height/(2*selectedCard.maxPortPerCard));                        
//                        selectedCard.portList[k].x = selectedCard.x+selectedCard.thickness/2;
//                        selectedCard.portList[k].y = selectedCard.y+(selectedCard.portList[k].radius*(2*k+1));
//                        //reduce radius for spacing
//                        selectedCard.portList[k].radius = (selectedCard.height/(2*selectedCard.maxPortPerCard))*3/4;
                        //square ports
                        selectedCard.portList[k].x = selectedCard.x+selectedCard.thickness/4;
                        selectedCard.portList[k].y = selectedCard.y+(selectedCard.height/11)/8+(k*selectedCard.height)/11;                                                
                        selectedCard.portList[k].width = (selectedCard.thickness)/2;
                        selectedCard.portList[k].height = (selectedCard.height/11)*3/4;
                        
                        //port btn properties
                        selectedCard.portList[k].button = [];
                        var btn1 = {};
                        btn1.x = selectedCard.x+5*selectedCard.thickness/16;
                        btn1.y = selectedCard.y+3*(selectedCard.height/11)/4+(k*selectedCard.height)/11;
                        btn1.radius = (selectedCard.height/11)/16;
                        btn1.color = $scope.getAlarmSeverityColor(selectedCard.rackId,selectedCard.subRackId,selectedCard.slotId,selectedCard.portList[k].portId);
                        selectedCard.portList[k].button.push(btn1);
                        
                        var btn2 = {};
                        btn2.x = selectedCard.x+11*selectedCard.thickness/16;
                        btn2.y = selectedCard.y+3*(selectedCard.height/11)/4+(k*selectedCard.height)/11;
                        btn2.radius = (selectedCard.height/11)/16;
                        btn2.color = btn1.color;
                        selectedCard.portList[k].button.push(btn2);                        
                    }
                }                
            }
            yStart += selectedRackFrontCanvas.fixedBorder;
        }        
        //bottomTray == mux/dmux subrack        
        selectedRackChassisDetail.bottomTray = {};        
        selectedRackChassisDetail.bottomTray.thickness = selectedRackFrontCanvas.width;
        //8% of total height
        selectedRackChassisDetail.bottomTray.height = Math.floor(selectedRackFrontCanvas.height*8/100);
        selectedRackChassisDetail.bottomTray.x = 0;
        selectedRackChassisDetail.bottomTray.y = selectedRackFrontCanvas.height-Math.floor(selectedRackFrontCanvas.height*8/100);
    };
    //#ff0000, #ff6600, #d8af95
    $scope.getAlarmSeverityColor = function(rackId,subRackId,slotId,portId){
        if(portId == "101" || portId == "41"){
            portId = "0";
        }
        
        var severity = $scope.getAlarmSeverityOnPort(rackId,subRackId,slotId,portId);
        switch(severity){
            case 3:                
                return "#ff0000";
            case 2:                
                return "#ff6600";
            case 1:
                return "#d8af95";
            default:
                return "#838383";
        }       
    };
    
    $scope.getAlarmSeverityOnPort = function(rackId,subRackId,slotId,portId){
        var severity = 0;
        var tempSev;
        
        for(var i=0;i<selectedNeNode.alarmDataList.length;i++){
            if(selectedNeNode.alarmDataList[i].rackId == rackId
                && selectedNeNode.alarmDataList[i].subRackId == subRackId
                && selectedNeNode.alarmDataList[i].slotId == slotId
                && selectedNeNode.alarmDataList[i].clientInterface == portId
            ){
                tempSev = parseInt(selectedNeNode.alarmDataList[i].severityId);
                severity = tempSev>severity?tempSev:severity;
            }
        }        
        return severity;
    };
    
    $scope.drawRackFrontPanel = function(){          
        setTimeout(function(){
            $scope.$apply(function(){
//                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.ctx.clearRect(0, 0, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.width, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.height);
                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.ctx.clearRect(0, 0, 680,1428);
                $scope.drawFace2Panel();
            });
        }, 100); 
    };
    
    $scope.drawRackBackPanel = function(){
        setTimeout(function(){
            $scope.$apply(function(){
//                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].backFace.ctx.clearRect(0, 0, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].backFace.width, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].backFace.height);
                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].backFace.ctx.clearRect(0, 0, 680,1428);
                $scope.drawFace4Panel();
            });
        }, 100); 
    };
    //face4
    $scope.initRackBackPanel = function(){
        
    };
        
    $scope.drawFace2PanelOld = function(){};
    
    $scope.drawFace2Panel = function(){  
        //draw cards
        var i,j,k,l;        
        var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace;
        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];                     
        
        selectedRackFrontCanvas.ctx.fillStyle='#4d4d4d';//ddd
        selectedRackFrontCanvas.ctx.fillRect(0, 0, selectedRackFrontCanvas.width, selectedRackFrontCanvas.height); 
                
        //draw rack
        selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#838383
        selectedRackFrontCanvas.ctx.lineWidth = 2*selectedRackFrontCanvas.fixedBorder;
        selectedRackFrontCanvas.ctx.strokeRect(0, 0, selectedRackFrontCanvas.width, selectedRackFrontCanvas.height);         
        //draw top tray
        selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;  
        selectedRackFrontCanvas.ctx.beginPath();
        selectedRackFrontCanvas.ctx.moveTo(selectedRackChassisDetail.topTray.x, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2);
        selectedRackFrontCanvas.ctx.lineTo(selectedRackChassisDetail.topTray.x+selectedRackChassisDetail.topTray.thickness, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2);
        selectedRackFrontCanvas.ctx.stroke();        
        //draw subracks  
        var xStart,yStart,x,y,y1,slotThickness,slotHeight,slotCount;
        xStart = selectedRackFrontCanvas.fixedBorder;
        yStart = selectedRackChassisDetail.topTray.height;
        //draw slots        
        for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++){
            selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#838383            
            selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;
            y1 = selectedRackChassisDetail.topTray.height+(i+1)*selectedRackChassisDetail.slotHeight+(2*i+1)*(selectedRackFrontCanvas.fixedBorder/2);
            selectedRackFrontCanvas.ctx.beginPath();
            selectedRackFrontCanvas.ctx.moveTo(0,y1);
            selectedRackFrontCanvas.ctx.lineTo(selectedRackFrontCanvas.width,y1);
            selectedRackFrontCanvas.ctx.stroke();
            //label subrack
            selectedRackFrontCanvas.ctx.save();
            selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.fixedBorder-5, y1-selectedRackChassisDetail.slotHeight/2);            
            selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
            selectedRackFrontCanvas.ctx.textAlign = "right";
            selectedRackFrontCanvas.ctx.font = "bold " + ($scope.dwdmDetails.selectedMo.fontSize) + "px Arial"; 
            selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
            selectedRackFrontCanvas.ctx.fillText("Subrack "+(selectedRackChassisDetail.maxSubRackPerRack-i),0,0);
            selectedRackFrontCanvas.ctx.restore();            
            
            for(j=0;j<selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;){
                selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#838383
                selectedRackFrontCanvas.ctx.lineWidth = 2;
                x = xStart + Math.floor(j%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)*(selectedRackChassisDetail.subRackList[i].slotThickness);
                y = yStart + i*selectedRackChassisDetail.slotHeight;                  
                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i],j+1);                
                slotThickness = slotCount*selectedRackChassisDetail.subRackList[i].slotThickness;
                slotHeight = selectedRackChassisDetail.slotHeight;                
                selectedRackFrontCanvas.ctx.strokeRect(x,y,slotThickness,slotHeight);   
                //label slots
                selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
                selectedRackFrontCanvas.ctx.textAlign = "center";
                selectedRackFrontCanvas.ctx.font = "bold " + ($scope.dwdmDetails.selectedMo.fontSize/2) + "px Arial";   
                selectedRackFrontCanvas.ctx.fillText((j+1),x+slotThickness/2,y-selectedRackFrontCanvas.fixedBorder/4);
                
                j = j + slotCount;
            }
            yStart += selectedRackFrontCanvas.fixedBorder;
        }
        //draw bottom tray
//        selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;  
//        selectedRackFrontCanvas.ctx.strokeStyle = "#838383";        
//        selectedRackFrontCanvas.ctx.beginPath();
//        selectedRackFrontCanvas.ctx.moveTo(selectedRackChassisDetail.bottomTray.x, selectedRackChassisDetail.bottomTray.y+selectedRackFrontCanvas.fixedBorder/2);
//        selectedRackFrontCanvas.ctx.lineTo(selectedRackChassisDetail.bottomTray.width, selectedRackChassisDetail.bottomTray.y+selectedRackFrontCanvas.fixedBorder/2);
        //draw cards & ports
//        var gradient;        
        for(i=0;i<selectedRackChassisDetail.subRackList.length;i++){
            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;j++){
//                gradient = selectedRackFrontCanvas.ctx.createLinearGradient(
//                    selectedRackChassisDetail.subRackList[i].cardList[j].x,
//                    selectedRackChassisDetail.subRackList[i].cardList[j].y,
//                    selectedRackChassisDetail.subRackList[i].cardList[j].x+selectedRackChassisDetail.subRackList[i].cardList[j].thickness,
//                    selectedRackChassisDetail.subRackList[i].cardList[j].y+selectedRackChassisDetail.subRackList[i].cardList[j].height);
//                
//                gradient.addColorStop("0","#838383");
//                gradient.addColorStop("0.5","#ddd");
//                gradient.addColorStop("1.0","gray");
//                selectedRackFrontCanvas.ctx.strokeStyle = gradient;
                selectedRackFrontCanvas.ctx.lineWidth = 4;
                selectedRackFrontCanvas.ctx.strokeStyle = "#000";//#ddd   
                //white background=> card present, gray=> card absent
                if($scope.validateCardStatus(selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus)){
                    selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
                    selectedRackFrontCanvas.ctx.fillRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,
                    		selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,
                    		selectedRackChassisDetail.subRackList[i].cardList[j].height);
                    selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
                    selectedRackChassisDetail.subRackList[i].cardList[j].textColor='black';
                }                
                //draw ports for MPN card
                if(selectedRackChassisDetail.subRackList[i].cardList[j].type=="1"){
                    for(k=0;k<selectedRackChassisDetail.subRackList[i].cardList[j].maxPortPerCard;k++){
                        //circular ports
//                        selectedRackFrontCanvas.ctx.beginPath();
//                        selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].radius, 0, 2*Math.PI, false);
//                        selectedRackFrontCanvas.ctx.stroke();
//                        selectedRackFrontCanvas.ctx.beginPath();
//                        selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y, selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].radius/2, 0, 2*Math.PI, false);
//                        selectedRackFrontCanvas.ctx.stroke();
                        if(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].portType == "1"){
                            selectedRackFrontCanvas.ctx.drawImage($scope.chassisViewDetails.chassisImages['clientPort'],selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height);                            
                        } else if(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].portType == "0"){
                            selectedRackFrontCanvas.ctx.drawImage($scope.chassisViewDetails.chassisImages['linePort'],selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height);
                        }
                        selectedRackFrontCanvas.ctx.lineWidth = 2;
                        selectedRackFrontCanvas.ctx.strokeStyle = selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[0].color;
                        selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height);
                        //label ports
                        selectedRackFrontCanvas.ctx.fillStyle = "#000000";
                        selectedRackFrontCanvas.ctx.textAlign = "center";
                        selectedRackFrontCanvas.ctx.font = "bold " + ($scope.dwdmDetails.selectedMo.fontSize/2) + "px Arial";   
                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].portId,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].x+5*selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].width/4,selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].y+selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].height/2);                        
                        //draw buttons for each port
                        for(l=0;l<selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button.length;l++){
                            selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].color;
                            selectedRackFrontCanvas.ctx.beginPath();
                            selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].x,
                                selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].y,
                                selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].radius,0,2*Math.PI,false
                            );
                            selectedRackFrontCanvas.ctx.fill();
                        }
                    }                    
                }                 
                //label card
                selectedRackFrontCanvas.ctx.save();
                selectedRackFrontCanvas.ctx.translate(selectedRackChassisDetail.subRackList[i].cardList[j].x+selectedRackChassisDetail.subRackList[i].slotThickness/2, selectedRackChassisDetail.subRackList[i].cardList[j].y+selectedRackChassisDetail.slotHeight/2);
                selectedRackFrontCanvas.ctx.rotate(-Math.PI/2); 
                selectedRackFrontCanvas.ctx.textAlign = "center";
                selectedRackFrontCanvas.ctx.font = $scope.dwdmDetails.selectedMo.fontSize+"px Arial"; 
                selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].textColor;
                
                if(selectedRackChassisDetail.subRackList[i].cardList[j].type == "3"){
                    //CSCC Card
                    if($scope.validateCsccStatus(selectedRackChassisDetail.subRackList[i].cardList[j].secondaryStatus)){
                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Active)",0,0);
                    } else {
                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Passive)",0,0);
                    }                    
                } else {
                    selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName 
                        + " (" + selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus + ") ",0,0);
                }
                selectedRackFrontCanvas.ctx.restore();
            }
        }                
    };
    //validate cscc secondary status. false=>card not drawn; 
    $scope.validateCsccStatus = function(csccSecondaryStatus){        
        switch(csccSecondaryStatus){
            case "1"://Active
                return true;
            default:
                return false;
        }
    }
    //validate card physical status
    $scope.validateCardStatus = function(cardStatus){
        switch(cardStatus){
            case "Present":
            case "Ready":
            case "Provisioned":
                return true;
            default:
                return false;
        }
    };
    
    $scope.initFrontPanelRefresh = function(){           
        clearTimeout($scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimer);
        $scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimerCount = 0; 
        $scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimer = setInterval($scope.refreshFrontFacePort,2000);
    };      
    
    $scope.refreshFrontFacePort = function(){
        if($scope.selectedNetworkView != 3){
            clearTimeout($scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimer);
            return;
        }

        if($scope.dwdmDetails.canvasDetails !== undefined){
            $scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimerCount++;
            $scope.drawRefreshedFrontFacePort();
        }        
    };
    
    $scope.drawRefreshedFrontFacePort = function(){
        var i,j,k,l;        
        var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace;
        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
        
        for(i=0;i<selectedRackChassisDetail.subRackList.length;i++){
            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;j++){                
                //draw ports for MPN card
                if(selectedRackChassisDetail.subRackList[i].cardList[j].type=="1"){
                    for(k=0;k<selectedRackChassisDetail.subRackList[i].cardList[j].maxPortPerCard;k++){                        
                        //draw buttons for each port
                        for(l=0;l<selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button.length;l++){
                            if($scope.periodicTaskList.chassisTasks.faceRefreshTask.refreshTimerCount%2 == 0){
                                selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].color;
                            } else {
                                selectedRackFrontCanvas.ctx.fillStyle = 'gray';
                            }
                            selectedRackFrontCanvas.ctx.beginPath();
                            selectedRackFrontCanvas.ctx.arc(selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].x,
                                selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].y,
                                selectedRackChassisDetail.subRackList[i].cardList[j].portList[k].button[l].radius,0,2*Math.PI,false
                            );
                            selectedRackFrontCanvas.ctx.fill();
                        }
                    }
                }
            }
        }   
    };
    
    $scope.getCardSlotCount = function(selectedSubRack,slotId){
        for(var i=0;i<selectedSubRack.cardList.length;i++){            
            if(selectedSubRack.cardList[i].slotId == slotId){
                return parseInt(selectedSubRack.cardList[i].maxSlotPerCard);
            }
        }
        return 1;
    };
    
    $scope.drawFace4Panel = function(){
        var i,j;        
        var selectedRackBackCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].backFace;        
        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
        
        selectedRackBackCanvas.ctx.fillStyle='#4d4d4d';//ddd
        selectedRackBackCanvas.ctx.fillRect(0, 0, selectedRackBackCanvas.width, selectedRackBackCanvas.height);                 
        //draw rack
        selectedRackBackCanvas.ctx.strokeStyle = "#000";//#838383
        selectedRackBackCanvas.ctx.lineWidth = 2*selectedRackBackCanvas.fixedBorder;
        selectedRackBackCanvas.ctx.strokeRect(0, 0, selectedRackBackCanvas.width, selectedRackBackCanvas.height);         
        //draw top tray
        selectedRackBackCanvas.ctx.lineWidth = selectedRackBackCanvas.fixedBorder;
        selectedRackBackCanvas.ctx.beginPath();
        selectedRackBackCanvas.ctx.moveTo(selectedRackChassisDetail.topTray.x, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackBackCanvas.fixedBorder/2);
        selectedRackBackCanvas.ctx.lineTo(selectedRackChassisDetail.topTray.thickness, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackBackCanvas.fixedBorder/2);
        selectedRackBackCanvas.ctx.stroke();        
        //draw subracks  
        var xStart,yStart,x,y,y1,slotThickness,slotHeight,slotCount;
        xStart = selectedRackBackCanvas.fixedBorder;
        yStart = selectedRackChassisDetail.topTray.height;        
        //draw slots        
        for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++){            
            selectedRackBackCanvas.ctx.strokeStyle = "#000";//#838383            
            selectedRackBackCanvas.ctx.lineWidth = selectedRackBackCanvas.fixedBorder;
            y1 = selectedRackChassisDetail.topTray.height+(i+1)*selectedRackChassisDetail.slotHeight+(2*i+1)*(selectedRackBackCanvas.fixedBorder/2);
            selectedRackBackCanvas.ctx.beginPath();
            selectedRackBackCanvas.ctx.moveTo(0,y1);
            selectedRackBackCanvas.ctx.lineTo(selectedRackBackCanvas.width,y1);
            selectedRackBackCanvas.ctx.stroke();
            
            for(j=0;j<selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;){               
                selectedRackBackCanvas.ctx.strokeStyle = "#000";//#838383
                selectedRackBackCanvas.ctx.lineWidth = 2;
                x = xStart + Math.floor(j%selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack)*(selectedRackChassisDetail.subRackList[i].slotThickness);
                y = yStart + i*selectedRackChassisDetail.slotHeight;                  
                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i],j+1);                
                slotThickness = slotCount*selectedRackChassisDetail.subRackList[i].slotThickness;
                slotHeight = selectedRackChassisDetail.slotHeight;                
                selectedRackBackCanvas.ctx.strokeRect(x,y,slotThickness,slotHeight);   
                
                
                j = j + slotCount;
            }
            yStart += selectedRackBackCanvas.fixedBorder;
        }    
        //draw cards
        selectedRackBackCanvas.ctx.lineWidth = 4;  
        selectedRackBackCanvas.ctx.strokeStyle = "#000";//#000
        selectedRackBackCanvas.ctx.fillStyle = "#ffffff";

        for(i=0;i<selectedRackChassisDetail.subRackList.length;i++){
            for(j=0;j<selectedRackChassisDetail.subRackList[i].cardList.length;j++){                               
                selectedRackBackCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
                selectedRackBackCanvas.ctx.fillRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y,selectedRackChassisDetail.subRackList[i].cardList[j].thickness,selectedRackChassisDetail.subRackList[i].cardList[j].height);
            }
        }      
    };
    
    $scope.getMaxChassis = function(neType){
        if(neType == "1"){
            //TerminalEquipment
            return 5;
        } else if(neType == "2"){
            //In Line Amplifier
            return 1;
        } else if(neType == "4"){
            //SUTEEVRA
            return 1;
        } else if(neType == "5"){
            //FOADM
            return 1;
        } else if(neType == "6"){
            //ROADM
            return 1;
        } else if(neType == "7"){
            //HUB
            return 1;
        } else {
            //none
            return "NA";
        }
    };
    
    $scope.getCardType = function(cardType){
        if(cardType == "1"){
            return "MPN";
        } else if(cardType == "2"){
            return "TPC";
        } else if(cardType == "3"){
            return "CSCC";
        } else if(cardType == "4"){
            return "Amplifier";
        } else if(cardType == "5"){
            return "ILA";
        } else if(cardType == "6"){
            return "Protection";
        } else if(cardType == "7"){
            return "OCM";
        } else if(cardType == "8"){
            return "WSS 1X2";
        } else if(cardType == "9"){
            return "WSS 1X9";
        } else if(cardType == "10"){
            return "WSS 1X2X9";
        } else if(cardType == "11"){
            return "MCS";
        } else if(cardType == "12"){
            return "OSC";
        } else {
            //none
            return "NA";
        }
    };
    
    $scope.refreshChassisView = function(){        
        if($scope.selectedNetworkView != 3){            
            clearTimeout($scope.periodicTaskList.chassisTasks.chassisRefreshTask.refreshTimer);            
            return;
        }        
        
        $scope.periodicTaskList.chassisTasks.chassisRefreshTask.refreshTimerCount++;                
        $scope.getChassisDetails($scope.initChassisMetrics);
    };
    
    //$scope.initChassisSupportProperties();
    $scope.fetchAllNeDetails();    
}

