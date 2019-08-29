/**
 * @author hp
 * @date 18th April, 2017
 * @brief This is the first entry point for angular control under 'chassisViewController'
 *        which automatically get called under ng-app
 */

/**Defining 'chassisView' angular app*/
var app = angular.module("chassisView", []); /// ['ngRoute']); in case of multiple controller should go for the ngRoute after defining the route entries 

/**
 * Controller Start
 */
app.controller('chassisViewController', function($scope, $http) {

    /**Basic Canvas property Set*/
    console.log("In chassisview Actual controller ");
    canvas = document.getElementById('chassisFrontCanvas');  	
    canvas.setAttribute('width', '530px');/* $("#chassisCanvasId").width());*/ 
    canvas.setAttribute('height', '750px');///$("#canvasId").css("height"));
    //canvas.setAttribute('width', '100%');
    //canvas.setAttribute('height', '750px');
    //canvas.setAttribute('margin-top', '20px');
    /*width:100%;
    height: 750px;
	margin-top: 20px;*/

    
    $scope.names = [1,2,3,4,5,6];/**DBG => For Testing purpose only*/
    
    $scope.rackViewIndex=1;
	///$("#chassisFrontCanvas").effect("highlight", {color: '#5cb888'}, 100);
    $scope.chassisViewDbData  ={"chassis":{"specs":{"maxRackPerChassis":3,"rackList":[{"maxSubRackPerRack":3,"subRackList":[{"cardList":[{"typeName":"PA\/BA","maxSlotPerCard":1,"slotId":1,"subRackId":1,"rackId":1},{"typeName":"WSS1x9","maxSlotPerCard":2,"slotId":2,"subRackId":1,"rackId":1},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":1,"rackId":1},{"typeName":"MCS","maxSlotPerCard":2,"slotId":7,"subRackId":1,"rackId":1},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":1,"rackId":1},{"typeName":"WSS1x9","maxSlotPerCard":2,"slotId":12,"subRackId":1,"rackId":1},{"typeName":"PA\/BA","maxSlotPerCard":1,"slotId":14,"subRackId":1,"rackId":1}],"maxSlotPerSubRack":14,"yCableFlag":0,"subRackId":1,"rackId":1},{"cardList":[{"typeName":"PA\/BA","maxSlotPerCard":1,"slotId":1,"subRackId":2,"rackId":1},{"typeName":"WSS1x9","maxSlotPerCard":2,"slotId":2,"subRackId":2,"rackId":1},{"typeName":"VOIP","maxSlotPerCard":1,"slotId":4,"subRackId":2,"rackId":1},{"typeName":"OCM","maxSlotPerCard":2,"slotId":5,"subRackId":2,"rackId":1},{"typeName":"CSCC","maxSlotPerCard":1,"slotId":6,"subRackId":2,"rackId":1},{"typeName":"SUPY","maxSlotPerCard":1,"slotId":7,"subRackId":2,"rackId":1},{"typeName":"SUPY","maxSlotPerCard":1,"slotId":8,"subRackId":2,"rackId":1},{"typeName":"CSCC","maxSlotPerCard":1,"slotId":9,"subRackId":2,"rackId":1},{"typeName":"EDFA ARRAY","maxSlotPerCard":2,"slotId":10,"subRackId":2,"rackId":1},{"typeName":"WSS1x9","maxSlotPerCard":2,"slotId":12,"subRackId":2,"rackId":1},{"typeName":"PA\/BA","maxSlotPerCard":1,"slotId":14,"subRackId":2,"rackId":1}],"maxSlotPerSubRack":14,"subRackId":2,"yCableFlag":0,"rackId":1},{"cardList":[{"typeName":"PA\/BA","maxSlotPerCard":1,"slotId":1,"subRackId":3,"rackId":1},{"typeName":"WSS1x9","maxSlotPerCard":2,"slotId":2,"subRackId":3,"rackId":1},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":3,"rackId":1},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":3,"rackId":1},{"typeName":"EDFA ARRAY","maxSlotPerCard":2,"slotId":10,"subRackId":3,"rackId":1}],"maxSlotPerSubRack":14,"subRackId":3,"yCableFlag":0,"rackId":1}],"rackId":1},{"maxSubRackPerRack":3,"subRackList":[{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":1,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":1,"rackId":2},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":1,"rackId":2},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":1,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":10,"subRackId":1,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":13,"subRackId":1,"rackId":2}],"maxSlotPerSubRack":14,"subRackId":1,"yCableFlag":1,"rackId":2},{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":2,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":2,"rackId":2},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":2,"rackId":2},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":2,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":10,"subRackId":2,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":13,"subRackId":2,"rackId":2}],"maxSlotPerSubRack":14,"yCableFlag":1,"subRackId":2,"rackId":2},{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":3,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":3,"rackId":2},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":3,"rackId":2},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":3,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":10,"subRackId":3,"rackId":2},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":13,"subRackId":3,"rackId":2}],"maxSlotPerSubRack":14,"yCableFlag":1,"subRackId":3,"rackId":2}],"rackId":2},{"maxSubRackPerRack":3,"subRackList":[{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":1,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":1,"rackId":3},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":1,"rackId":3},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":1,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":10,"subRackId":1,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":13,"subRackId":1,"rackId":3}],"maxSlotPerSubRack":14,"yCableFlag":1,"subRackId":1,"rackId":3},{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":2,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":2,"rackId":3},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":2,"rackId":3},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":2,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":10,"subRackId":2,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":13,"subRackId":2,"rackId":3}],"maxSlotPerSubRack":14,"yCableFlag":0,"subRackId":2,"rackId":3},{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":3,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":3,"rackId":3},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":3,"rackId":3},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":3,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":10,"subRackId":3,"rackId":3},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":13,"subRackId":3,"rackId":3}],"maxSlotPerSubRack":14,"yCableFlag":0,"subRackId":3,"rackId":3}],"rackId":3},{"maxSubRackPerRack":3,"subRackList":[{"cardList":[{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":1,"subRackId":1,"rackId":4},{"typeName":"MPN CGM","maxSlotPerCard":2,"slotId":4,"subRackId":1,"rackId":4},{"typeName":"MPC","maxSlotPerCard":1,"slotId":6,"subRackId":1,"rackId":4},{"typeName":"MPC","maxSlotPerCard":1,"slotId":9,"subRackId":1,"rackId":4}],"maxSlotPerSubRack":14,"subRackId":1,"rackId":4},{"cardList":[],"maxSlotPerSubRack":14,"subRackId":2,"rackId":4},{"cardList":[],"maxSlotPerSubRack":14,"subRackId":3,"rackId":4}],"rackId":4}]}}};///{"chassis":{"specs":{"gneId":"2","childId":"1","maxRackPerChassis":"1","rackList":[{"gneId":"2","childId":"1","rackId":"1","maxSubRackPerRack":"3","subRackList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"1","maxSlotPerSubRack":"14","cardList":[]},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","maxSlotPerSubRack":"14","cardList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"2","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"8","typeName":"WSS 1*2 Card","subType":"0","subTypeName":"NA","id":"128582","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"6","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"12","typeName":"OSC","subType":"0","subTypeName":"NA","id":"128585","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","maxPortPerCard":"6","portList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":1,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":2,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":3,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":4,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":5,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":41,"portType":0,"portTypeName":"line"}],"maxSlotPerCard":"2","type":"1","typeName":"MPN","subType":"3","subTypeName":"40G MUXPONDER by CORTINA","id":"128586","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"11","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"8","typeName":"WSS 1*2 Card","subType":"0","subTypeName":"NA","id":"128587","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"13","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"7","typeName":"OCM Card","subType":"0","subTypeName":"NA","id":"128588","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"14","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"4","typeName":"Amplifier","subType":"0","subTypeName":"NA","id":"128589","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"1","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"4","typeName":"Amplifier","subType":"0","subTypeName":"NA","id":"136138","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"5","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"1","typeName":"MPN","subType":"5","subTypeName":"CGX","id":"136712","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"3","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"7","typeName":"OCM Card","subType":"0","subTypeName":"NA","id":"136735","primaryStatus":"Absent","appStatus":"PROVISIONED_NOT_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","maxPortPerCard":"11","portList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":1,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":2,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":3,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":4,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":5,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":6,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":7,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":8,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":9,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":10,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":101,"portType":0,"portTypeName":"line"}],"maxSlotPerCard":"2","type":"1","typeName":"MPN","subType":"1","subTypeName":"100G MUXPONDER by PMC Sierra","id":"138027","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"7","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"3","typeName":"CSCC","subType":"0","subTypeName":"NA","id":"138870","primaryStatus":"Provisioned","appStatus":"PROVISIONED_READY","secondaryStatus":"1","secondaryStatusName":"Active"}]},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","maxSlotPerSubRack":"14","cardList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"1","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"1","typeName":"MPN","subType":"5","subTypeName":"CGX","id":"128592","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"3","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"1","typeName":"MPN","subType":"5","subTypeName":"CGX","id":"128593","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","maxPortPerCard":"11","portList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":1,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":2,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":3,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":4,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":5,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":6,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":7,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":8,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":9,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":10,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":101,"portType":0,"portTypeName":"line"}],"maxSlotPerCard":"2","type":"1","typeName":"MPN","subType":"1","subTypeName":"100G MUXPONDER by PMC Sierra","id":"136898","primaryStatus":"Jack Out","appStatus":"PROVISIONED_NOT_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"7","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"2","typeName":"TPC","subType":"0","subTypeName":"NA","id":"136939","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"4","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"6","typeName":"Protection Card","subType":"0","subTypeName":"NA","id":"138867","primaryStatus":"Jack Out","appStatus":"UNPROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"11","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"6","typeName":"Protection  Card","subType":"0","subTypeName":"NA","id":"138869","primaryStatus":"Ready","appStatus":"UNPROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"8","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"3","typeName":"CSCC","subType":"0","subTypeName":"NA","id":"138871","primaryStatus":"NotDetected","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"}]}]}]}}};
    $scope.trackVar={}; //Default initialisation for all tracking variables
    $scope.trackVar.selectedRack=1; 

    
    //used for the mouse-events
    
    $scope.topologyViewDetails={};
    $scope.topologyViewDetails.hovered ;
    $scope.topologyViewDetails.dragging;
    $scope.topologyViewDetails.toopTipText ;
    $scope.topologyViewDetails.mouseX ;
    $scope.topologyViewDetails.mouseY; 

    
    
    
    init($scope);
    
    
    /**
     * Called every time new NE selected from drop down
     */
    $scope.neChangeHandler = function() {

        console.log("Item changed to " + $scope.selectedName)

        /**DBG => For Testing purpose only*/ 
    	$scope.rackViewIndex=1;
    	///$("#chassisFrontCanvas").effect("highlight", {color: '#5cb888'}, 100);
        $scope.chassisViewDbData  =	//{"chassis":{"specs":{"gneId":"2","childId":"1","maxRackPerChassis":"1","rackList":[{"gneId":"2","childId":"1","rackId":"1","maxSubRackPerRack":"3","subRackList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"1","maxSlotPerSubRack":"14","cardList":[]},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","maxSlotPerSubRack":"14","cardList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"2","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"8","typeName":"WSS 1*2 Card","subType":"0","subTypeName":"NA","id":"128582","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"6","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"12","typeName":"OSC","subType":"0","subTypeName":"NA","id":"128585","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","maxPortPerCard":"6","portList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":1,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":2,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":3,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":4,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":5,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"9","cardType":"1","cardSubType":"3","portId":41,"portType":0,"portTypeName":"line"}],"maxSlotPerCard":"2","type":"1","typeName":"MPN","subType":"3","subTypeName":"40G MUXPONDER by CORTINA","id":"128586","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"11","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"8","typeName":"WSS 1*2 Card","subType":"0","subTypeName":"NA","id":"128587","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"13","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"7","typeName":"OCM Card","subType":"0","subTypeName":"NA","id":"128588","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"14","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"4","typeName":"Amplifier","subType":"0","subTypeName":"NA","id":"128589","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"1","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"4","typeName":"Amplifier","subType":"0","subTypeName":"NA","id":"136138","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"5","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"1","typeName":"MPN","subType":"5","subTypeName":"CGX","id":"136712","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"3","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"7","typeName":"OCM Card","subType":"0","subTypeName":"NA","id":"136735","primaryStatus":"Absent","appStatus":"PROVISIONED_NOT_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","maxPortPerCard":"11","portList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":1,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":2,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":3,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":4,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":5,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":6,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":7,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":8,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":9,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":10,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"4","cardType":"1","cardSubType":"1","portId":101,"portType":0,"portTypeName":"line"}],"maxSlotPerCard":"2","type":"1","typeName":"MPN","subType":"1","subTypeName":"100G MUXPONDER by PMC Sierra","id":"138027","primaryStatus":"Ready","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"2","slotId":"7","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"3","typeName":"CSCC","subType":"0","subTypeName":"NA","id":"138870","primaryStatus":"Provisioned","appStatus":"PROVISIONED_READY","secondaryStatus":"1","secondaryStatusName":"Active"}]},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","maxSlotPerSubRack":"14","cardList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"1","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"1","typeName":"MPN","subType":"5","subTypeName":"CGX","id":"128592","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"3","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"1","typeName":"MPN","subType":"5","subTypeName":"CGX","id":"128593","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","maxPortPerCard":"11","portList":[{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":1,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":2,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":3,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":4,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":5,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":6,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":7,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":8,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":9,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":10,"portType":1,"portTypeName":"client"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"10","cardType":"1","cardSubType":"1","portId":101,"portType":0,"portTypeName":"line"}],"maxSlotPerCard":"2","type":"1","typeName":"MPN","subType":"1","subTypeName":"100G MUXPONDER by PMC Sierra","id":"136898","primaryStatus":"Jack Out","appStatus":"PROVISIONED_NOT_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"7","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"2","typeName":"TPC","subType":"0","subTypeName":"NA","id":"136939","primaryStatus":"Jack Out","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"4","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"6","typeName":"Protection Card","subType":"0","subTypeName":"NA","id":"138867","primaryStatus":"Jack Out","appStatus":"UNPROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"11","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"6","typeName":"Protection  Card","subType":"0","subTypeName":"NA","id":"138869","primaryStatus":"Ready","appStatus":"UNPROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"},{"gneId":"2","childId":"1","rackId":"1","subRackId":"3","slotId":"8","maxPortPerCard":"0","portList":[],"maxSlotPerCard":"1","type":"3","typeName":"CSCC","subType":"0","subTypeName":"NA","id":"138871","primaryStatus":"NotDetected","appStatus":"PROVISIONED_READY","secondaryStatus":"","secondaryStatusName":"NA"}]}]}]}}};
        $scope.trackVar={}; //Default initialisation for all tracking variables
	    $scope.trackVar.selectedRack=1;                   
        init($scope);
        
        
    }
    
    
    
    
    
    
    //*********************************************************************************************************************************************************************************************************************************************************
    
    
    canvas.addEventListener('mousemove', function(e) {

        var pos = getMousePos(canvas, e), /// provide this canvas and event
            x = pos.x,
            y = pos.y;

        /// check x and y against the grid

    }, false);

    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {x: e.clientX - rect.left, y: e.clientY - rect.top};
    }
    
    
    
    
    
    
    $scope.canvasOnMouseHover = function(event)
    {
    	//alert("clientx" + event.clientX);
    	$scope.topologyViewDetails.dragging = false;
    	
    	var thisCanvas = document.getElementById('chassisFrontCanvas'); 
    	
    	var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;
        var selectedRackChassisDetail = $scope.dwdmDetails.chassisDetails.chassis.specs.rackList[$scope.dwdmDetails.selectedMo.selectedRack - 1];
        
    	// var selectedRackFrontCanvas = $scope.dwdmDetails.canvasDetails.racks[$scope.dwdmDetails.selectedMo.selectedRack - 1].frontFace;
        
    	if($scope.topologyViewDetails.dragging == undefined || $scope.topologyViewDetails.dragging == false)
    	{
    	    var i,j,k,selectedMo;
    	    //only the topmost one will labeled out of overlapping elements.
    	    //	            var highestIndex = -1;
    	    //	            var highestGne = -1;
            //getting correct mouse position considering resizing that may have occured in the browser:
            
    	    var bRect = thisCanvas.getBoundingClientRect(); 
    	    
    	    $scope.topologyViewDetails.mouseX = (event.clientX - bRect.left)*
                (thisCanvas.width/bRect.width);
            $scope.topologyViewDetails.mouseY = (event.clientY - bRect.top)*
                (thisCanvas.height/bRect.height);
            
            //find which shape was visited
            
            $scope.topologyViewDetails.hovered = false;

	        
	        // FOR topPanel or fan tray
	       
	        if($scope.hitTestRect(selectedRackChassisDetail.topTray.x/* tray.x */, selectedRackChassisDetail.topTray.y + selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2 /* starting tray.y */,selectedRackChassisDetail.topTray.x+selectedRackChassisDetail.topTray.thickness/* tray.width */, selectedRackChassisDetail.topTray.y+selectedRackChassisDetail.topTray.height-selectedRackFrontCanvas.fixedBorder/2 /* tray.height */, $scope.topologyViewDetails.mouseX /* cursor x */,$scope.topologyViewDetails.mouseY /* cursor y */) )
	       
	        	//testRect(tray.x,tray.y,tray.width,tray.height,XCoordinateOfCursor,YCoordinateForCursor) for checking if x,y cursor coordinate matches the selected subtray , cardlist etc. 
	        
	        {

	                $scope.topologyViewDetails.hovered = true;

	               $scope.topologyViewDetails.toopTipText = "Top Tray / Fan Tray";
	                //document.getElementById('chassisFrontCanvas').setAttribute('title',"Top Tray / Fan Tray" );
	                //$scope.topologyViewDetails.toolTipBoxMapping = selectedRackChassisDetail.topTray;
	                $scope.topologyViewDetails.showToolTipBox = true;
	                
	         }
	      
	        
	        // FOR y cable tray
	      for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++)
	    	  {
	    	  if(i==0){/**DBG => Latter convert to the constant*/           	
		    		yCableTrayHeight= selectedRackChassisDetail.slotHeight+selectedRackChassisDetail.topTray.height+2;	                        
		    	}
		    	else{
		    		yCableTrayHeight = yCableTrayHeight+ selectedRackChassisDetail.slotHeight+selectedRackChassisDetail.yCableTray.height+selectedRackFrontCanvas.fixedBorder;	            	
		    	}
		    	
		    	
		    	if(i==selectedRackChassisDetail.maxSubRackPerRack-1)/**DBG => Latter convert to the constant*/
		    	{	    		
		    		times=3; //this is for the last 3-rows
		    		yCableTrayHeight+=selectedRackChassisDetail.yCableTray.Height;
		    	}
		    	else
		    	{	    	
		    		times=1;
		    	}	
	    	  		for(var l=0;l<times;l++)
	    	  			{
	    	  				if(!$scope.topologyViewDetails.hovered && $scope.hitTestRect(0, yCableTrayHeight,selectedRackFrontCanvas.width, selectedRackChassisDetail.yCableTrayHeight , $scope.topologyViewDetails.mouseX,$scope.topologyViewDetails.mouseY))
	    	  				{
            	
	    	  					//testRect(tray.x,tray.y,tray.width,tray.height,XCoordinateOfCursor,YCoordinateForCursor) for checking if x,y cursor coordinate matches the selected subtray , cardlist etc. 
		        
	        			
	    	  					$scope.topologyViewDetails.hovered = true;

	    	  					$scope.topologyViewDetails.toopTipText = "Y cable tray";
	    	  					//$scope.topologyViewDetails.toolTipBoxMapping = selectedRack.bottomTray;
	    	  					$scope.topologyViewDetails.showToolTipBox = true;
	        			
	    	  				}//end of if
	    	  			} //end of nested for loop
	    	  }//end of for loop
	      
	    
// for the all the cards
	      
	      for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++)
	    	  {
	    	  	for(j=0; j<selectedRackChassisDetail.subRackList[i].cardList[j].length;j++ )
	    	  		{
	    	  		
	    	  			if(!$scope.topologyViewDetails.hovered && $scope.hitTestRect(selectedRackChassisDetail.subRackList[i].cardList[j].x,selectedRackChassisDetail.subRackList[i].cardList[j].y , selectedRackChassisDetail.subRackList[i].cardList[j].thickness , selectedRackChassisDetail.subRackList[i].cardList[j].height ,   $scope.topologyViewDetails.mouseX , $scope.topologyViewDetails.mouseY))                    
	    	  				//testRect(tray.x,tray.y,tray.width,tray.height,XCoordinateOfCursor,YCoordinateForCursor) for checking if x,y cursor coordinate matches the selected subtray , cardlist etc. 
	    	  				{
	    	  				
	    	  					$scope.topologyViewDetails.hovered = true;	

	    	  					$scope.topologyViewDetails.toopTipText = "Subrack Number: "+i+1 +" typeName: "+selectedRackChassisDetail.subRackList[i].cardList[j].typeName + " maxSlotPerCard: "+selectedRackChassisDetail.subRackList[i].cardList[j].maxSlotPerCard + " slotId: "+selectedRackChassisDetail.subRackList[i].cardList[j].slotId + " subRackId: "+selectedRackChassisDetail.subRackList[i].cardList[j].subRackId +" rackId: "+selectedRackChassisDetail.subRackList[i].cardList[j].rackId;
	    	  					$scope.topologyViewDetails.showToolTipBox = true;
	    	  				
	    	  				
	    	  				}
	    	  		
	    	  		}
	    	  
	    	  }
	
	      
	      
	      
	      
	      //for all the subracks
	      //this will be excluded in the end because the subracks made up of the cards 
	      //cards will take place of subracks while showing the subrack number they're in as a detail!
	      
	      
	      for(i=0;i<selectedRackChassisDetail.maxSubRackPerRack;i++)
	    	  {
	    	  	selectedRackFrontCanvas.ctx.lineWidth = selectedRackFrontCanvas.fixedBorder;
	    	  	var  y1 = (i + 1) * selectedRackChassisDetail.yCableTray.height+ selectedRackChassisDetail.topTray.height +
    			(i + 1) * selectedRackChassisDetail.slotHeight + (2 * i + 1) * (selectedRackFrontCanvas.fixedBorder / 2);
	             
	    	  	
	    	  	if(!$scope.topologyViewDetails.hovered && $scope.hitTestRect(0 , 0 ,selectedRackFrontCanvas.width , y1 ,  $scope.topologyViewDetails.mouseX , $scope.topologyViewDetails.mouseY))
	        	//testRect(tray.x,tray.y,tray.width,tray.height,XCoordinateOfCursor,YCoordinateForCursor) for checking if x,y cursor coordinate matches the selected subtray , cardlist etc. 
	        
	    	  	{

	                $scope.topologyViewDetails.hovered = true;

	                $scope.topologyViewDetails.toopTipText = "Subrack Number: "+(3-i)+ " maxSlotPerSubRack: "+selectedRackChassisDetail.subRackList[i].maxSlotPerSubRack + " yCableFlag: "+selectedRackChassisDetail.subRackList[i].yCableFlag+ " subRackId: "+selectedRackChassisDetail.subRackList[i].subRackId +" rackId: "+selectedRackChassisDetail.subRackList[i].rackId;
	                $scope.topologyViewDetails.showToolTipBox = true;
	                
	    	  	}

              }
	      
	    
	   
      } 
    	else
    	{
            $scope.topologyViewDetails.toopTipText = "";
            $scope.topologyViewDetails.showToolTipBox = false;
        }
    	document.getElementById("chassisFrontCanvas").setAttribute('title',$scope.topologyViewDetails.toopTipText);
        console.log("you're inside mouse hover method");
            
    	
  }
	 

    $scope.canvasOnMouseOut = function(event)
    {
    		$scope.topologyViewDetails.hovered = true;

			$scope.topologyViewDetails.toopTipText ="  Y-Cable Tray / Fan Tray";
			document.getElementById("chassisFrontCanvas").setAttribute('title',$scope.topologyViewDetails.toopTipText);
	        console.log("you're inside mouseout");	 
    }
         
	    
    	
    	
    	
    	
    	$scope.hitTestRect = function(x1,y1,x2,y2,mx,my)
    	
    		//testRect(tray.x,tray.y,tray.width,tray.height,XCoordinateOfCursor,YCoordinateForCursor) for checking if x,y cursor coordinate matches the selected subtray , cardlist etc. 
		    /*
		     *           (x1,y1) _______________
		     *           		|				|
		     *           		|	.(mx,my)	|
		     * 					|				|					
		     * 					|_______________| 
		     * 									 (x2,y2)(height , width)
		     * 
		     * 			here tray.x= x1 ,
		     *				 tray.y= y1 ,
		     *				 tray.height= y2 ,
		     * 				 tray.width= x2 ,
		     *				 XCoordinateOfCursor= mx ,
		     *				 YCoordinateOfCursor= my ;	 			
		     */  
    	
    	{
            if(
                mx <= x2 && mx >= x1 &&
                my <= y2 && my>= y1
            ){
                return true;
            } else if(
                mx >= x2 && mx <= x1 &&
                my >= y2 && my<= y1
            ){
                return true;
            }
            return false;
        };

    	

});
