	/**
	 * Init Function: First Entry Point of Angular
	 */
	init = function($scope) {
	
		console.log("init")
		
		/**
		 * Now first of 
		 */
		
		
		
	    /**
	     * List of functions to call for Chassis View
	     */
	    $scope.initNgChassisViewController = function() {
	       
	    	console.log("initNgChassisViewController");

	        /**Initialize Ng Params from Canvas*/
	        $scope.initNgChassisParamsFromCanvas();
	        
	        
	        /**Reorder JSON based on the params*/
	        $scope.reOrderChassisDetails();
	        
	        
	        /**Initialize Ng Params from JSON*/
	        $scope.initNgChassisParamsFromJSON();
	        
	        
	        
	        /**Generate All Views from the JSON*/
	        $scope.generateNgChassisViewFromJson();
	        
	        
	        

			/**
			 * Now calling the function that will show the detailing of the Chassis elements using the JSON 
			 */
	     //  $scope.canvasEventGenerator();
	        
	        
	        
	    }

	    
	   /**
	    * Call-1 : Basic param set for canvas 
	    */
	   $scope.initNgChassisParamsFromCanvas = function() {
		   
	       console.log("initNgChassisParamsFromCanvas "); 				
	
	       $scope.resetParamBasedOnNeSelection();/**Reset Call*/
	
	       /** Iterate through Maximum number to fill the $scope */
	       for (var i = 0; i < $scope.chassisViewDbData.chassis.specs.maxRackPerChassis; i++) {
	    	   
	    	   console.log("initNgChassisParamsFromCanvas " + i)
	    	   
	    	   /**Array reset 
	    	    * 
	    	    * here Array, variables are reset so to initialize them whenever the application is restarted again 
	    	    * 
	    	    * */
	           $scope.dwdmDetails.canvasDetails.racks[i] = {};
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace = {};
	
	           /** Front face: 1-D */
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas = $('#chassisFrontCanvas');/**set canvas with its id chassisFrontCanvas */ 
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx = $scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.get(0).getContext("2d");
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.globalCompositeOperation = 'source-over';
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.font = ( /* $scope.dwdmDetails.selectedMo.fontSize */ 5) + "px Arial";/**DBG => Can go for multiple font sizes in case of different size view*/
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.ctx.lineJoin = "round";
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.width = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.css('width'));
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.height = parseFloat($scope.dwdmDetails.canvasDetails.racks[i].frontFace.canvas.css('height'));
	           $scope.dwdmDetails.canvasDetails.racks[i].frontFace.fixedBorder = 1.5 * ($scope.dwdmDetails.canvasDetails.racks[i].frontFace.height) / 100;
	
	           /** back face: DBG => Not taking into account as of now */	          
	       }
	   }
	   
	 
	   /**
	    * Resetting basic $scope to form the fresh view every time it gets loaded
	    */
	   $scope.resetParamBasedOnNeSelection = function() {
	    
	    		/**Initialize to zero or empty array*/
	            $scope.dwdmDetails = {};
	            $scope.dwdmDetails.selectedMo = {};
	            $scope.dwdmDetails.canvasDetails = {};
	            $scope.dwdmDetails.canvasDetails.racks = [];
	            $scope.dwdmDetails.selectedMo.selectedRack = $scope.rackViewIndex;
	            $scope.dwdmDetails.chassisDetails = $scope.chassisViewDbData;
	   }

	   
	   /**
	    *  CAll 2: reorder chassis details in-order to rackId,subRackId,slotId,portId
	    */
	    $scope.reOrderChassisDetails = function() {
	        
	    	var i, j, k;/**Local Vars*/

	        for (i = 0; i < $scope.dwdmDetails.chassisDetails.chassis.specs.rackList.length; i++) {
	            for (j = 0; j < $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList.length; j++) {
	                for (k = 0; k < $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList.length; k++) {
	                	/**DBG => Port sorting yet to be done*/
	                	///$scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList[k].portList,"portId");
	                }
	                $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList[j].cardList, "slotId");
	            }
	            $scope.CreateReverseOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList[i].subRackList, "subRackId");
	        }
	        $scope.CreateOrderedArrayList($scope.dwdmDetails.chassisDetails.chassis.specs.rackList, "rackId");
	    };

	    /**
		 * Sorting of ArrayList  
		 */
	    $scope.CreateOrderedArrayList = function(arrayList, tag) {
	        arrayList = arrayList
	            .sort(function(a, b) {
	                return a[tag] - b[tag]
	            });
	    };

	    /**
		 * Reversing of ArrayList [in case of subrack only] for Showing SubRack Bottom[1] to Top[3]
		 */
	    $scope.CreateReverseOrderedArrayList = function(arrayList, tag) {
	        arrayList = arrayList
	            .sort(function(a, b) {
	                return b[tag] - a[tag]
	            });
	    };


	    
	    /**
	     * CAll 3: Set Position[(x,y) coordinates] of each element of Chassis from JSON Data in order to use it directly later 
	     */
	    $scope.initNgChassisParamsFromJSON = function() {

	    	/**Local Var init*/
	        var xStart = 0,yStart=0, i, j, k,selectedCard;/*selected Y-cable Tray,*/
	        var drawWidth;
	        
	        var selectedRackFrontCanvas   = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;	        
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        
	        /**Top tray params*/
	        selectedRackChassisDetail.topTray = {};
	        selectedRackChassisDetail.topTray.x = 0;
	        selectedRackChassisDetail.topTray.y = 0;	        
	        
	        /**y-Cable tray params*/
	        selectedRackChassisDetail.yCableTray = {};
	        selectedRackChassisDetail.yCableTray.x = 0;
	        selectedRackChassisDetail.yCableTray.y = 0;
	        
	        
	        /** 8% of total height for Fan Tray*/
	        selectedRackChassisDetail.topTray.height = Math.floor(selectedRackFrontCanvas.height * 5 / 100);
	        /** 7% of total height for Y-Cable Tray*/
	        selectedRackChassisDetail.yCableTray.height = Math.floor(selectedRackFrontCanvas.height * 5/ 100);	        

	        selectedRackChassisDetail.topTray.thickness = selectedRackFrontCanvas.width;
	    
	        
	        /** Height of Fantray or Upper panel */
	        yStart = selectedRackChassisDetail.topTray.height; 

	        /** Each slot height: canvas_height - top tray height - [(maxSubRackPerRack * fixedborder)/ maxSubRackPerRack */
	        /*selectedRackChassisDetail.slotHeight = ((selectedRackFrontCanvas.height - (2 * selectedRackChassisDetail.topTray.height) -
	        									   (selectedRackChassisDetail.maxSubRackPerRack - 1) * (selectedRackFrontCanvas.fixedBorder))/ selectedRackChassisDetail.maxSubRackPerRack)- 
	        									   (selectedRackChassisDetail.yCableTray.height);
	        */
	        /**New height formula as per the requirement : In case of any new component add please change the following formula accordingly*/
	        var heightOffset= 10;
	        selectedRackChassisDetail.slotHeight = ((selectedRackFrontCanvas.height - (selectedRackChassisDetail.topTray.height) -
	        										(5*selectedRackChassisDetail.yCableTray.height))/selectedRackChassisDetail.maxSubRackPerRack)
	        										-heightOffset;
		        	

	        ///console.log("selectedRackChassisDetail.slotHeight : " + selectedRackChassisDetail.slotHeight);
	        xStart = selectedRackFrontCanvas.fixedBorder;
	        ///console.log("xStart : " + xStart)
	        /** Total Available Width: Minus the border from two sides */
	        drawWidth = selectedRackFrontCanvas.width - 2 * xStart; 
	        ///console.log("drawWidth : " + drawWidth)

	        /** set card coordinates */
	        for (i = 0; i < selectedRackChassisDetail.subRackList.length; i++) { /** subrack times loop */
	        	
	            selectedRackChassisDetail.subRackList[i].slotThickness = drawWidth / selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;
	            console.log("I in Set " + i);

	            /** no of cards per each subrack times loop : coordinates(x,y) filling of the cards */
	            for (j = 0; j < selectedRackChassisDetail.subRackList[i].cardList.length; j++) { 
	                ///console.log("J in Set " + j);
	                selectedCard = selectedRackChassisDetail.subRackList[i].cardList[j];
	                ///console.log("selectedCard.slotId : " + selectedCard.slotId);
	                
	                /** Take width upto the previous card and calc x*/
	                selectedCard.y = yStart + i * selectedRackChassisDetail.slotHeight;
	                selectedCard.x = xStart + Math.floor(parseInt(selectedCard.slotId - 1) % 
	                		selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack) *
	                		(selectedRackChassisDetail.subRackList[i].slotThickness); 
	                
	                /** no of slots occupied per card each slot thickness */
	                selectedCard.thickness = selectedCard.maxSlotPerCard * selectedRackChassisDetail.subRackList[i].slotThickness; 
	                selectedCard.height = selectedRackChassisDetail.slotHeight;
	                selectedCard.textColor = '#838383';

	                ///console.log("selectedCard.x " + selectedCard.x + " and selectedCard.y: " + selectedCard.y);
	            }
	            
	            yStart = yStart+selectedRackFrontCanvas.fixedBorder+selectedRackChassisDetail.yCableTray.height;
	            
	            
	            
	            /** no of y-cable tray per each subrack times loop : coordinates(x,y) filling of the tray ports */
/*	            for (j = 0; j < selectedRackChassisDetail.subRackList[i].yCableList.length; j++) { 
	                console.log("J in Set " + j);
	                selectedYcableTray = selectedRackChassisDetail.subRackList[i].yCableList[j];
	                console.log("selectedYcableTray : " + selectedYcableTray);
	                
	                *//** Take width upto the previous card and calc x*//*
	                selectedCard.y = yStart + i * selectedRackChassisDetail.slotHeight;
	                selectedCard.x = xStart + Math.floor(parseInt(selectedCard.slotId - 1) % 
	                		selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack) *
	                		(selectedRackChassisDetail.subRackList[i].slotThickness); 
	                
	                *//** no of slots occupied per card each slot thickness *//*
	                selectedCard.thickness = selectedCard.maxSlotPerCard * selectedRackChassisDetail.subRackList[i].slotThickness; 
	                selectedCard.height = selectedRackChassisDetail.slotHeight;
	                selectedCard.textColor = '#838383';

	                console.log("selectedCard.x " + selectedCard.x + " and selectedCard.y: " + selectedCard.y);
	            }
	            
	            yStart = yStart+selectedRackFrontCanvas.fixedBorder+selectedRackChassisDetail.yCableTray.height;*/


	        }
	    }



	    /**
	     *
	     */
	    $scope.fetchSelectedRackDetails = function() {
	        $scope.dwdmDetails.selectedRackDetails = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        $scope.initNgChassisViewController();
	        /*	        if($scope.dwdmDetails.selectedMo.selectedRack != undefined || $scope.dwdmDetails.selectedMo.selectedRack != null){
	        	            setTimeout(function(){
	        	                $scope.$apply(function () {	        
	        	                	$scope.dwdmDetails.selectedRackDetails = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack-1];
	        	                    //$scope.initRackViewParameters();
	        	                });            
	        	            },100);
	        	            
	        	            setTimeout(function(){
	        	                $scope.$apply(function(){
	        	                	$("#chassisFrontCanvas").effect("highlight", {color: '#5cb888'}, 100);
	        	                    $scope.initNgChassisViewController();	                	
	        	                });
	        	            }, 500);
	        	        }
	        */
	    };


	    /**
	     *
	     */
	    $scope.selectRackHandler = function(index) {
	        console.log("Inside selectRackHandler for rack  " + index)
	        console.log("Max Rack per node: " + $scope.chassisViewDbData.chassis.specs.maxRackPerChassis)
	        var currentSelecedRack = $scope.trackVar.selectedRack;
	        switch (index) {

	            case 1:
	                /**Left Button Clicked*/
	                console.log("case 1");
	                if (currentSelecedRack > 1 && currentSelecedRack <= $scope.chassisViewDbData.chassis.specs.maxRackPerChassis) { /**Right button already clicked before*/
	                    currentSelecedRack -= 1;
	                } else {
	                    bootbox.alert("No More Rack Found on the Left!");
	                }

	                break;

	            case 2:
	                /**Right Button Clicked*/
	                console.log("case 2");
	                if (currentSelecedRack >= 1 && currentSelecedRack < $scope.chassisViewDbData.chassis.specs.maxRackPerChassis) { /**Right button already clicked before*/
	                    currentSelecedRack += 1;
	                } else {
	                    bootbox.alert("No More Rack Found on the Right!");
	                }

	                break;

	        }

	        $scope.dwdmDetails.selectedMo.selectedRack = currentSelecedRack; /**Finally update the MO rack*/
	        console.log("Final set for SelectedRack :- " + $scope.dwdmDetails.selectedMo.selectedRack)



	        ///$scope.rackViewIndex=index;
	        $scope.rackViewIndex = currentSelecedRack;
	        ///$scope.dwdmDetails.selectedMo.fontSize = $scope.getFontSize();
	        $scope.trackVar.selectedRack = currentSelecedRack;
	        $scope.fetchSelectedRackDetails($scope.dwdmDetails.selectedMo.selectedRack);
	    };


	    /**
	     * validate card physical status
	     */
	    $scope.validateCardStatus = function(cardStatus) {
	        switch (cardStatus) {
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
	    $scope.validateCsccStatus = function(csccSecondaryStatus) {
	        switch (csccSecondaryStatus) {
	            case "1": //Active
	                return true;
	            default:
	                return false;
	        }
	    }


	    /**
	     *
	     */
	    $scope.getCardSlotCount = function(selectedSubRack, slotId) {
	        for (var i = 0; i < selectedSubRack.cardList.length; i++) {
	            if (selectedSubRack.cardList[i].slotId == slotId) {
	                return parseInt(selectedSubRack.cardList[i].maxSlotPerCard);
	            }
	        }
	        return 1;
	    };



	    /**
	     * Actual Drawing for the Chassis Front Panel based on the scope parameters 
	     */
	    $scope.drawFace2Panel = function() {
	       
	    	
	    	console.log("drawFace2Panel"); 

	        var xStart, yStart, x, y, y1,slotThickness, slotHeight, slotCount, slotNumberThickness, yCableTrayHeight, yCableBlockHeight; /**All Vars*/
	        var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;        
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];

	        /**Draw Top FanTray*/
	        xStart = selectedRackFrontCanvas.fixedBorder;
	        yStart = selectedRackChassisDetail.topTray.height;
	        yCableBlockHeight = yStart;
	        //console.log("x and y Start"+xStart +", "+ yStart);

	        selectedRackFrontCanvas.ctx.save();
	        //selectedRackFrontCanvas.ctx.beginPath();
	        selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.width/2, (selectedRackChassisDetail.topTray.y + (selectedRackChassisDetail.topTray.height/2)));
	        selectedRackFrontCanvas.ctx.strokeStyle = "#c4c4c4";
	        selectedRackFrontCanvas.ctx.font = "25px Verdana";
	        selectedRackFrontCanvas.ctx.fillStyle = "Green";
	        ///selectedRackFrontCanvas.ctx.fillText( /*"ROADM"*/ "Node-" + $scope.selectedNode + "  Rack-" + $scope.rackViewIndex + "  BAYTOP", 0, 0); /** DRAW : Baytop Heading*/
	        selectedRackFrontCanvas.ctx.restore();
	        //selectedRackFrontCanvas.ctx.stroke();

	        selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;
	        selectedRackFrontCanvas.ctx.beginPath();
	        selectedRackFrontCanvas.ctx.strokeStyle = "grey"; /**fill top by*/
	        selectedRackFrontCanvas.ctx.moveTo(selectedRackChassisDetail.topTray.x,
	            selectedRackChassisDetail.topTray.y + selectedRackChassisDetail.topTray.height - selectedRackFrontCanvas.fixedBorder / 2);
	        selectedRackFrontCanvas.ctx.lineTo(selectedRackChassisDetail.topTray.x + selectedRackChassisDetail.topTray.thickness,
	            selectedRackChassisDetail.topTray.y + selectedRackChassisDetail.topTray.height - selectedRackFrontCanvas.fixedBorder / 2);
	        selectedRackFrontCanvas.ctx.stroke();/**DRAW :Top Tray*/

	        
	        
	        /**Draw Subracks and Slots along with cards*/
	        for (i = 0; i < selectedRackChassisDetail.maxSubRackPerRack; i++) {/**loop through max subrack times i.e. 3 times*/
	            console.log("for i : " + i);

	            /**contex init*/
	            selectedRackFrontCanvas.ctx.strokeStyle = "grey"; /**fill top by*/
	            selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;

	            y1 = (i + 1) * selectedRackChassisDetail.yCableTray.height+ selectedRackChassisDetail.topTray.height +
	            			(i + 1) * selectedRackChassisDetail.slotHeight + (2 * i + 1) * (selectedRackFrontCanvas.fixedBorder / 2);
             

	            console.log("=====================Y1=======================  "+y1)
	            selectedRackFrontCanvas.ctx.beginPath();
	            selectedRackFrontCanvas.ctx.moveTo(0, y1);
	            selectedRackFrontCanvas.ctx.lineTo(selectedRackFrontCanvas.width, y1);
	            
	            if(i<selectedRackChassisDetail.maxSubRackPerRack-1)
	            	selectedRackFrontCanvas.ctx.stroke();/**DRAW :Slot numbering background*/

	            /**label subrack*/
	           /* selectedRackFrontCanvas.ctx.save();
	            selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.fixedBorder - 5, y1 - (selectedRackChassisDetail.slotHeight / 2));
	            selectedRackFrontCanvas.ctx.rotate(-Math.PI / 2);
	            selectedRackFrontCanvas.ctx.textAlign = "right";
	            selectedRackFrontCanvas.ctx.font = "bold " + ( $scope.dwdmDetails.selectedMo.fontSize 10) + "px Arial";
	            selectedRackFrontCanvas.ctx.fillStyle = "#ffffff";
	            selectedRackFrontCanvas.ctx.fillText("Subrack " + (selectedRackChassisDetail.maxSubRackPerRack - i), 0, 0);
	            selectedRackFrontCanvas.ctx.restore();*/

	            /*console.log("xStart : per subrack "+xStart)
	            console.log("yStart : per subrack "+yStart)*/
	            
	            var yCableFlag = selectedRackChassisDetail.subRackList[i].yCableFlag;
	            var maxSlotPerSubRack = selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack;
	            
	            /**Decision : Normal Subrack or Y-Cable Block?*/
	            if(yCableFlag == 0 ){    	
	           
	          
		            /**Per Subrack Common Operations*/
		            for (j = 0; j < maxSlotPerSubRack; j++) {/**loop through max slots per subrack times i.e. 14 times*/
		                console.log("Per Subrack Common Operations");
	
	
		                /**fill each slot by default params*/
		                selectedRackFrontCanvas.ctx.beginPath();
		                selectedRackFrontCanvas.ctx.strokeStyle = "#c4c4c4"; //#838383
		                selectedRackFrontCanvas.ctx.lineWidth = 2;
		                x = xStart + Math.floor(j % selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack) *
		                    (selectedRackChassisDetail.subRackList[i].slotThickness);
		                y = yStart + i * selectedRackChassisDetail.slotHeight;
		                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i], j + 1);
		                slotThickness = slotCount * selectedRackChassisDetail.subRackList[i].slotThickness;
		                slotNumberThickness= selectedRackChassisDetail.subRackList[i].slotThickness;
		                slotHeight = selectedRackChassisDetail.slotHeight;
		                //selectedRackFrontCanvas.ctx.strokeRect(x, y, slotThickness, slotHeight);/**DRAW : angles*/
	
	
		                /**label slots*/
		                selectedRackFrontCanvas.ctx.beginPath();
		                selectedRackFrontCanvas.ctx.fillStyle = "black";///#ffffff";
		                selectedRackFrontCanvas.ctx.textAlign = "center";
		                selectedRackFrontCanvas.ctx.font = "bold " + ( /*$scope.dwdmDetails.selectedMo.fontSize*/ 10) + "px Arial";	                
	
		                selectedRackFrontCanvas.ctx.fillText((j + 1), x + slotNumberThickness / 2, 
		                		y - selectedRackFrontCanvas.fixedBorder / 4 
		                /*,selectedRackFrontCanvas.width-(2*selectedRackFrontCanvas.fixedBorder)*/ ); /**DRAW :slot numbering*/	
		                
		                
	
	
		                /**label subrack:left*/
		                selectedRackFrontCanvas.ctx.save();
		                selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.fixedBorder - 2, y1 - (selectedRackChassisDetail.slotHeight) );
		                selectedRackFrontCanvas.ctx.rotate(-Math.PI / 2);
		                selectedRackFrontCanvas.ctx.textAlign = "right";
		                selectedRackFrontCanvas.ctx.font = /*"bold " + */ ( /*$scope.dwdmDetails.selectedMo.fontSize*/ 14) + "px Arial";
		                selectedRackFrontCanvas.ctx.fillStyle = "black";
		                selectedRackFrontCanvas.ctx.fillText("Subrack " + (selectedRackChassisDetail.maxSubRackPerRack - i), 0, 0);/**DRAW :Subrack labels*/
		                selectedRackFrontCanvas.ctx.restore();
		                
		                /**label subrack:right*/
		                selectedRackFrontCanvas.ctx.save();
		                selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.width - 10, y1 - selectedRackChassisDetail.slotHeight / 3);
		                selectedRackFrontCanvas.ctx.rotate(Math.PI / 2);
		                selectedRackFrontCanvas.ctx.textAlign = "right";
		                selectedRackFrontCanvas.ctx.font = /*"bold " + */ ( /*$scope.dwdmDetails.selectedMo.fontSize*/ 14) + "px Arial";
		                selectedRackFrontCanvas.ctx.fillStyle = "black";
		                //selectedRackFrontCanvas.ctx.fillText("Subrack "+(selectedRackChassisDetail.maxSubRackPerRack-i),0,0);
		                selectedRackFrontCanvas.ctx.restore();
		                ///j+=slotCount;
	
		            }
	            
	           
	         

	            
		            /**slot drawing inside the subrack structure*/
		            for (j = 0; j < selectedRackChassisDetail.subRackList[i].cardList.length;) {/**loop through card list times i.e. occupied card times*/
	
	
		                console.log("j : " + j);
		                selectedRackFrontCanvas.ctx.strokeStyle = "green"; //#838383
		                selectedRackFrontCanvas.ctx.lineWidth = 2;
		                x = xStart + Math.floor(j % selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack) *
		                    ( /*selectedRackChassisDetail.subRackList[i].slotThickness*/ selectedRackFrontCanvas.width / 14) - 10;
		                y = yStart + i * selectedRackChassisDetail.slotHeight;
		                slotCount = $scope.getCardSlotCount(selectedRackChassisDetail.subRackList[i], j + 1);
		                slotThickness = /*slotCount *  (selectedRackFrontCanvas.width/16);*/ slotCount * selectedRackChassisDetail.subRackList[i].slotThickness;
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
		                /**DRAW : Cards*/
		                selectedRackFrontCanvas.ctx.fillStyle = "#C0C0C0";
		                selectedRackFrontCanvas.ctx.fillRect(selectedRackChassisDetail.subRackList[i].cardList[j].x, selectedRackChassisDetail.subRackList[i].cardList[j].y, selectedRackChassisDetail.subRackList[i].cardList[j].thickness, selectedRackChassisDetail.subRackList[i].cardList[j].height);
		                selectedRackFrontCanvas.ctx.strokeRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,
		                    selectedRackChassisDetail.subRackList[i].cardList[j].y, selectedRackChassisDetail.subRackList[i].cardList[j].thickness,
		                    selectedRackChassisDetail.subRackList[i].cardList[j].height);
		                selectedRackChassisDetail.subRackList[i].cardList[j].textColor = 'black';
		                
	
	
		                /*console.log("slotCount: " + slotCount);
		                console.log("slotThickness: " + slotThickness);
		                console.log("slotHeight: " + slotHeight);*/
	
	
	
		                /**label card*/
		                selectedRackFrontCanvas.ctx.save();
		                selectedRackFrontCanvas.ctx.translate(selectedRackChassisDetail.subRackList[i].cardList[j].x + selectedRackChassisDetail.subRackList[i].slotThickness / 2, selectedRackChassisDetail.subRackList[i].cardList[j].y + selectedRackChassisDetail.slotHeight / 2);
		                selectedRackFrontCanvas.ctx.rotate(-Math.PI / 2);
		                selectedRackFrontCanvas.ctx.textAlign = "center";
		                selectedRackFrontCanvas.ctx.font = "bold " + /* $scope.dwdmDetails.selectedMo.fontSize */ 15 + "px Arial bold";
		                selectedRackFrontCanvas.ctx.fillStyle = selectedRackChassisDetail.subRackList[i].cardList[j].textColor;
	
		                if (selectedRackChassisDetail.subRackList[i].cardList[j].type == "3") {
		                    /**CSCC Card*/
		                    if ($scope.validateCsccStatus(selectedRackChassisDetail.subRackList[i].cardList[j].secondaryStatus)) {
		                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Active)", 0, 0);
		                    } else {
		                        selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " (Passive)", 0, 0);
		                    }
		                } else {
	
		                    console.log("selectedRackChassisDetail.subRackList[i].cardList[j].typeName : ------" + selectedRackChassisDetail.subRackList[i].cardList[j].typeName);
		                    /**DRAW : labels*/
		                    selectedRackFrontCanvas.ctx.fillText(selectedRackChassisDetail.subRackList[i].cardList[j].typeName
		                        /* + " (" + selectedRackChassisDetail.subRackList[i].cardList[j].primaryStatus + ") "*/
		                        , 0, 0);
		                }
	
		                selectedRackFrontCanvas.ctx.restore();
	
		                /**Card Draws Using Rect*/
	
		                /*console.log("x and y " + x + " and " + y);*/
	
	
	
	
		                j = j + 1 /*slotCount*/ ;
	
		            }
		            
		                 
		            console.log("yStart before =======================> " + yStart);
		            console.log("selectedRackFrontCanvas.fixedBorder  " + selectedRackFrontCanvas.fixedBorder);
		            yStart = yStart+selectedRackFrontCanvas.fixedBorder+selectedRackChassisDetail.yCableTray.height;
		            console.log("yStart after =======================> " + yStart);
		            
	            }
	            else if(yCableFlag==1){/**DBG => Can be changed latter*/	            
	            	
	            	/**Y-Cable Tray Drawing*/	            	
	            	
	            	$scope.drawYCableBlock(yCableBlockHeight);
	            	
	            	
	            	yCableBlockHeight=yCableBlockHeight+selectedRackChassisDetail.slotHeight+selectedRackChassisDetail.topTray.height+selectedRackFrontCanvas.fixedBorder;
	            }
	            
	            /**Y-Cable Tray Drawing*/
	            $scope.drawYCableTray();
	         
                
                
            	/**Fill Y-Cable Tray*/
/*            	var cnt;
            	for(cnt=0; cnt<2; cnt++){
            		
            		selectedRackFrontCanvas.ctx.beginPath();
                	selectedRackFrontCanvas.ctx.arc(cnt+10, yCableTrayHeight+10, 4, 0, 2 * Math.PI, false);
                	selectedRackFrontCanvas.ctx.fillStyle = 'green';
                	selectedRackFrontCanvas.ctx.fill();
                	selectedRackFrontCanvas.ctx.lineWidth = 5;
                	selectedRackFrontCanvas.ctx.strokeStyle = 'black';
                	selectedRackFrontCanvas.ctx.stroke();	
            	}
            	
*/
            	
	        }          
	    }

	    /**
	     * 
	     */
	    $scope.drawYCableBlock = function(yCableBlockHeight){


	    	var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        
	        
	    	selectedRackFrontCanvas.ctx.beginPath();/**Very important for canvas, use it before every stroke*/
	    	selectedRackFrontCanvas.ctx.lineWidth=1;
	    	selectedRackFrontCanvas.ctx.strokeStyle="grey";		            
	        	
	    	/*yCableBlockTrayHeight = selectedRackChassisDetail.slotHeight+
	    						selectedRackChassisDetail.yCableTray.height+selectedRackFrontCanvas.fixedBorder;	            	
	    	*/    	
	    	
	    	$scope.canvasDrawYCableBlock(9,yCableBlockHeight);/**DBG => Latter convert to the constant*/
	    	
	    }
	    
	    
	    
	    
	    //Shifting the $scope.canvasDrawYCableTray function into the following function
	    
	   
	    
	    $scope.drawYCableDetailing = function(times)
	    {
	    	    	
	    	var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        selectedRackFrontCanvas.ctx.save();
	        var xYCableStart =0;
	        var yYCableStart = yCableTrayHeight+10;  //+10 for shifting the rectangles a further down 
	    	
	        //here goes the canvasDrawCableTray function()
	        
	        	
	        
	        for(var count=0;count<times;count++)
	        {
	    		//alert("yCableTrayHeight "+yCableTrayHeight)
		    /*	if(count==1){
		    			selectedRackFrontCanvas.ctx.fillStyle= "red";
		    			yCableTrayHeight=+10;
		    	}
		    	else
		    		selectedRackFrontCanvas.ctx.fillStyle= "white";*/
	    		//alert("inside yCableTrayHeight "+yCableTrayHeight)
		    	selectedRackFrontCanvas.ctx.rect(0,yCableTrayHeight,selectedRackFrontCanvas.width,selectedRackChassisDetail.yCableTray.height);
	           	selectedRackFrontCanvas.ctx.stroke();/**DRAW : y-cable tray*/
	           	
	           	selectedRackFrontCanvas.ctx.save();
	           //	selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.width/2, (yCableTrayHeight+selectedRackChassisDetail.yCableTray.height-12));
	           	/*selectedRackFrontCanvas.ctx.rotate(-Math.PI / 2);*/
	           	selectedRackFrontCanvas.ctx.textAlign = "center";
	           	selectedRackFrontCanvas.ctx.font = /*"bold " + $scope.dwdmDetails.selectedMo.fontSize*/ 25 + "px Arial bold";
	           	selectedRackFrontCanvas.ctx.fillStyle = "grey";
	
	         //  	selectedRackFrontCanvas.ctx.fillText("Y-Cable Tray",0,0);/**DRAW : Y-Cable Tray Label*/
	           	//selectedRackFrontCanvas.ctx.restore();
	           	
	           						for (var countOfRectRow=0; countOfRectRow<2;countOfRectRow++)
	           							{
	           								for(var countofRectColumn=0;countofRectColumn < 2 ;countofRectColumn ++ )
		           				
	           									{	
	           										for(var countofRectColumnChange=0 ;countofRectColumnChange<20 ;countofRectColumnChange++  )
	           											{
	           												selectedRackFrontCanvas.ctx.fillStyle = "Yellow";
	           												selectedRackFrontCanvas.ctx.fillRect(xYCableStart,yYCableStart,6,7);      //fillRect(xstart,ystart , width , height);
	           												xYCableStart+=13; // for space b/w two rectangles
	           											} xYCableStart+=15;	  // for space b/w the 2 pack of rectangles
	           									}
	           								xYCableStart=0; 		// to change the row 
	           								yYCableStart+=10;		// initialize the y axis for further loop
	           								
	           								
	           							}	

	           			           	selectedRackFrontCanvas.ctx.save();
	           					
	           					if(times>1){/**DBG => Latter convert to the constant*/
           		yCableTrayHeight+=(selectedRackChassisDetail.yCableTray.height);
           		//alert("inside yCableTrayHeight "+yCableTrayHeight)
	    				}
	           	if(times==3)
	           		{
	           			
	           				for (var countOfRectRow=0; countOfRectRow<2;countOfRectRow++)
   							{
   								yYCableStart=yCableTrayHeight+10;
	           					for(var countofRectColumn=0;countofRectColumn < 2 ;countofRectColumn ++ )
       				
   									{	
   										for(var countofRectColumnChange=0 ;countofRectColumnChange<20 ;countofRectColumnChange++  )
   											{
   												selectedRackFrontCanvas.ctx.fillStyle = "Yellow";
   												selectedRackFrontCanvas.ctx.fillRect(xYCableStart,yYCableStart,6,7);      //fillRect(xstart,ystart , width , height);
   												xYCableStart+=13; // for space b/w two rectangles
   											} xYCableStart+=15;	  // for space b/w the 2 pack of rectangles
   									}
   								xYCableStart=0; 		// to change the row 
   								yYCableStart=yCableTrayHeight+10;		// initialize the y axis for further loop
   								
   								
   							}	
   		

       						selectedRackFrontCanvas.ctx.restore();
       						//alert("inside yCableTrayHeight "+yCableTrayHeight)
       		       					
	           		}
	 
	        	}
	    }
	    	

	    $scope.canvasEventGenerator = function()
		{		console.log("inside the event generator");
	    		var canvas = document.getElementById("chassisFrontCanvas");
	    		
	    		canvas.addEventListener("onmouseover", $scope.canvasOnMouseHover(event), true);
	    		//$scope.canvasOnMouseHover();
	    		canvas.addEventListener("onmouseout",$scope.canvasOnMouseOut(event), true	);
	    		/*if($scope.topologyViewDetails.hovered == true)
	    			{
	    					//setting the title of the tooltip to the text
	    					document.getElementById("chassisFrontCanvas").setAttribute("title","hdhjshdjsh");
	    			}
	    		*/
	    		//document.getElementById('chassisFrontCanvas').setAttribute('title', );
	    		console.log("outside the event generator");
	    		
		}
	    		
			    	
	    	
	    /**
	     * 
	     */
	    	    
	    
	    /**
	     * 
	     */
	    
	    //    |---------- This function is important
	    //    |
	    //    V
	    
	    
	    
	/*    $scope.canvasDrawYCableTray=function( times){
	    	
	    	var selectedRackFrontCanvas   = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails..selectedRack - 1].frontFace;
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        
	    	for(var count=0;count<times;count++){
	    		//alert("yCableTrayHeight "+yCableTrayHeight)
		    /*	if(count==1){
		    			selectedRackFrontCanvas.ctx.fillStyle= "red";
		    			yCableTrayHeight=+10;
		    	}
		    	else
		    		selectedRackFrontCanvas.ctx.fillStyle= "white";*/
	    		//alert("inside yCableTrayHeight "+yCableTrayHeight)
		/*    	selectedRackFrontCanvas.ctx.rect(0,yCableTrayHeight,selectedRackFrontCanvas.width,selectedRackChassisDetail.yCableTray.height);
	           	selectedRackFrontCanvas.ctx.stroke();/**DRAW : y-cable tray*/
	           	
	    /*       	selectedRackFrontCanvas.ctx.save();
	           	selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.width/2, (yCableTrayHeight+selectedRackChassisDetail.yCableTray.height-12));
	           	/*selectedRackFrontCanvas.ctx.rotate(-Math.PI / 2);*/
	    /*      	selectedRackFrontCanvas.ctx.textAlign = "center";
	           	selectedRackFrontCanvas.ctx.font = /*"bold " + $scope.dwdmDetails.selectedMo.fontSize*/ 25 + "px Arial bold";
	           	/*     	selectedRackFrontCanvas.ctx.fillStyle = "grey";
	
	           	
	           	//as now we dont need to print the y-cable tray************************************
	           	
	           	//selectedRackFrontCanvas.ctx.fillText("Y-Cable Tray",0,0);
	           	/**DRAW : Y-Cable Tray Label*/
	           	
	           	
	           	
	           	/*   	selectedRackFrontCanvas.ctx.restore();
	           	
	           	//alert("inside yCableTrayHeight "+yCableTrayHeight)
	           	}
	           		
	           	if(times>1){/**DBG => Latter convert to the constant*/
	           	/*      		yCableTrayHeight+=(selectedRackChassisDetail.yCableTray.height);
	           		
	    	}
	    }
	    
	    /**
	     * 
	     */
	    $scope.drawYCableTray = function(){

	    	var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        
	        
	    	selectedRackFrontCanvas.ctx.beginPath();/**Very important for canvas, use it before every stroke*/
	    	selectedRackFrontCanvas.ctx.lineWidth=1;
	    	selectedRackFrontCanvas.ctx.strokeStyle="black";		            
	        	
	    	if(i==0){/**DBG => Latter convert to the constant*/           	
	    		yCableTrayHeight= selectedRackChassisDetail.slotHeight+selectedRackChassisDetail.topTray.height+2;	                        
	    	}
	    	else{
	    		yCableTrayHeight = yCableTrayHeight+ selectedRackChassisDetail.slotHeight+selectedRackChassisDetail.yCableTray.height+selectedRackFrontCanvas.fixedBorder;	            	
	    	}
	    	
	    	
	    	if(i==selectedRackChassisDetail.maxSubRackPerRack-1)/**DBG => Latter convert to the constant*/
	    	{	    		
	    		$scope.drawYCableDetailing(3); //this is for the last 3-rows
	    	}
	    	else
	    	{	    	
	    		$scope.drawYCableDetailing(1); // and vice versa
	    	}
	            
	    	
	    }
/*
 * 
 */
    

	    
	    
	    
	    $scope.canvasDrawYCableBlock=function( times,yCableBlockHeight){
	    	
	    	var selectedRackFrontCanvas   = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;
	        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
	        var yCableBlockTrayHeight	  = selectedRackChassisDetail.slotHeight/9; /**DBG => Can be changed later, and convert to the constant*/
	        
	    	for(var count=0;count<times;count++){
	    		//alert("yCableTrayHeight "+yCableTrayHeight)
		    /*	if(count==1){
		    			selectedRackFrontCanvas.ctx.fillStyle= "red";
		    			yCableTrayHeight=+10;
		    	}
		    	else
		    		selectedRackFrontCanvas.ctx.fillStyle= "white";*/
	    		//alert("inside yCableTrayHeight "+yCableTrayHeight)	    		
	    		
		    	selectedRackFrontCanvas.ctx.rect(0,yCableBlockHeight,selectedRackFrontCanvas.width,yCableBlockTrayHeight);
	           	selectedRackFrontCanvas.ctx.stroke();/**DRAW : y-cable tray*/
	           	
	           	selectedRackFrontCanvas.ctx.save();
	           	selectedRackFrontCanvas.ctx.translate(selectedRackFrontCanvas.width/2, (yCableBlockHeight+yCableBlockTrayHeight-5));
	           	/*selectedRackFrontCanvas.ctx.rotate(-Math.PI / 2);*/
	           	selectedRackFrontCanvas.ctx.textAlign = "center";
	           	selectedRackFrontCanvas.ctx.font = /*"bold " + $scope.dwdmDetails.selectedMo.fontSize*/ 12 + "px Arial bold";
	           	selectedRackFrontCanvas.ctx.fillStyle = "grey";
	
	           	selectedRackFrontCanvas.ctx.fillText("Y-Cable Tray",0,0);/**DRAW : Y-Cable Tray Label*/
	           	selectedRackFrontCanvas.ctx.restore();
	           	
	           	if(times>1){/**DBG => Latter convert to the constant*/
	           		yCableBlockHeight+=(yCableBlockTrayHeight);
	           		//alert("inside yCableTrayHeight "+yCableTrayHeight)
	           	}
	           		
	           	
	    	}
	    }
	    
	    


	    
	    /**
	     *
	     */
	    
	    
	    //                 **************************THIS IS NOT NECESSARY******************************
	    
	    
	    $scope.generateNgChassisViewFromJson = function() {
	        console.log("generateNgChassisViewFromJson");

	        setTimeout(function() {
	            $scope.$apply(function() {
	                //	                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.ctx.clearRect(0, 0, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.width, $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack-1].frontFace.height);
	                //$("#canvasRectId").delay(400).fadeIn();	            	
	                $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace.ctx.clearRect(0, 0, 550, 780);
	                $scope.drawFace2Panel();
	            });
	        }, 100);
	    };

	    $scope.initNgChassisViewController();/**First Entry point inside init*/ 

	}
	