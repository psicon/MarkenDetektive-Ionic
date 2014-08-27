angular.module('starter.controllers', [])

.filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
})

.service('ShoppingCartService', function(){
	console.log("ShoppingCartService setup");
	return {
		alerttest: function(){alert('TEST');},
		pushCartitem: function(cartitem){
 			//alert(cartitem.ean+"");			
			if(localStorage["cartitems"] == undefined){
				
 				
				var a = [];
 		
					a.push(cartitem)
					window.localStorage["cartitems"] = JSON.stringify(a);
					  //$scope.$apply;
					console.log("cartitems setted: " + cartitem);
			}else{
			var a = [];
			a = JSON.parse(localStorage["cartitems"]);
		
					a.push(cartitem)
					window.localStorage["cartitems"] = JSON.stringify(a);
					  //$scope.$apply;
					console.log("cartitems setted: " + cartitem);}
			},
		getCartitems: function(){
			var storeditems = [];
			console.log("array in storage: " + localStorage["cartitems"]);
			if(localStorage["cartitems"] == undefined){}else{
 			var storeditems = JSON.parse(localStorage["cartitems"]);
			console.log("cartitems got: " +  storeditems );}
			//alert(storeditems[0].itemname + '');
			
			return storeditems;
		},
		removeAllfromcart: function(){
				if(localStorage["cartitems"] == undefined){}else{

			a = [];
			window.localStorage["cartitems"] = JSON.stringify(a);
			console.log("cart:empty");}
		},
		removeCartitem: function(ean){
			a = JSON.parse(localStorage["cartitems"]);
   	for(var i =0;i<a.length;i++){
 			if(a[i][0]["itemean"] == ean){ 
 					 a.splice(i,1);
					 window.localStorage["cartitems"] =[];
					 window.localStorage["cartitems"] = JSON.stringify(a);}
		}
			
			
 		}
		
		}
	
	})
 

.service('LetterService', function(){
	console.log("Lertterservice setup");
	return {
		alerttest: function(){alert('TEST');},
		setLetter: function(letter){
			window.localStorage['selectedletter'] = letter;
			console.log("Letter setted: " + letter);

			},
		getLetter: function(){
			console.log("Letter got: " + window.localStorage['selectedletter'] );
			return window.localStorage['selectedletter'] + "";
		}
		
		}
	
	})
 
 .service('KontrollnummerntypService', function(){
	console.log("KontrollnummerntypService setup");
	return {
		alerttest: function(){alert('TEST');},
		setTyp: function(typ){
			window.localStorage['selectedtyp'] = typ;
			console.log("typ setted: " + typ);

			},
		getTyp: function(){
			console.log("Typ got: " + window.localStorage['selectedtyp'] );
			return window.localStorage['selectedtyp'] + "";
		}
		
		}
	
	})
  
 .service('DiscounterService', function(){
	console.log("Discounterservice setup");
	return {
 		setDiscounter: function(discounter){
			window.localStorage['selecteddiscounter'] = discounter;
			console.log("Discounter setted: " + discounter);

			},
		getDiscounter: function(){
			console.log("discounter got: " + window.localStorage['selecteddiscounter'] );
			return window.localStorage['selecteddiscounter'] + "";
		}
		
		}
	
	})
	
	.service('KategorieService', function(){
	console.log("KategorieService setup");
	return {
 		setKategorie: function(kat){
			window.localStorage['selectedkat'] = kat;
			console.log("KategorieService setted: " + kat);

			},
		getKategorie: function(){
			console.log("KategorieService got: " + window.localStorage['selectedkat'] );
			return window.localStorage['selectedkat'] + "";
		}
		
		}
	
	})
	
 .service('ProdukteService', function(){
	console.log("ProdukteService setup");
	return {
 		setProdukt: function(produkt){
			window.localStorage['selectedprodukt'] = produkt;
			console.log("produkt setted: " + produkt);

			},
		getProdukt: function(){
			console.log("produkt got: " + window.localStorage['selectedprodukt'] );
			return window.localStorage['selectedprodukt'] + "";
		}
		
		}
	
	})
	
  .service('SuchService', function(){
	console.log("SuchService setup");
	return {
 		setSuchbegriff: function(suchbegriff){
			window.localStorage['suchbegriff'] = suchbegriff;
			console.log("suchbegriff setted: " + suchbegriff);

			},
		getSuchbegriff: function(){
			console.log("suchbegriff got: " + window.localStorage['suchbegriff'] );
			return window.localStorage['suchbegriff'] + "";
		}
		
		}
	
	})
	 
	
 .controller('ShoppingCartCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $state, $http, $stateParams, $ionicPopup, ProdukteService, SuchService,ShoppingCartService) {
 							   	//$ionicLoading.show();

  data = ShoppingCartService.getCartitems();
  $scope.cartitems = data;
  console.log("cart:");
 							   	$ionicLoading.hide();

  console.log(data);
     // Open the login modal
	
  $scope.deletecart = function() {
	  var confirmPopup = $ionicPopup.confirm({
     title: '<h4 style="text-align:center;">Fertig eingekauft?</h4>',
     template: '<p style="text-align:center;"><b>Möchtest du deine Einkaufsliste komplett leeren?</b><br> Tipp: <br>einzelne Punkt kannst du durch zur Seite schieben erledigen!</p>',
	 buttons: [
      { text: 'Nein, noch nicht!', type: 'button-assertive' },
      {
        text: 'Ja, löschen!',
        type: 'button-balanced',
		onTap: function(e) {
					ShoppingCartService.removeAllfromcart();
					$scope.$apply();
			    	$state.go("app.home");
        }}]
   });
		

  }
  
     $scope.deleteitem = function(itemean) {
  		   ShoppingCartService.removeCartitem(itemean);
			if($state.current.name == "app.shoppingcart")
					{
						$state.transitionTo($state.current, $stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
					}
	   }
  
  
  $scope.getProdukt = function(ean){
	  		ProdukteService.setProdukt(ean);
			$ionicLoading.show();
	    	$state.go("app.produkt");
	  }
 
	})
 
  .controller('wizardCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $state, $http, $stateParams, $ionicPopup, ProdukteService, SuchService,ShoppingCartService) {
	 	 $scope.step = 1;
        $scope.setStep = function(step){
         $scope.step = step;
		}
	  
	  })
 
 
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $state, $http, $stateParams, $ionicPopup, ProdukteService, SuchService,ShoppingCartService) {
	 // Default to ios tab-bar style on android too
	 
	 $scope.sharenewsonfb = function(news){
 				
				var confirmPopup = $ionicPopup.confirm({
     title: '<h4 style="text-align:center;">Teilen?</h4>',
     template: '<p style="text-align:center;">Möchtest du jetzt  deinen Facebookfreunden von MarkenDetektiven erzählen?</p>',
	 buttons: [
      { text: 'Später' },
      {
        text: '<b>JA, KLAR SOFORT!</b>',
        type: 'button-balanced',
		onTap: function(e) {
			openFB.login('email,publish_actions',
            function() {
          openFB.api(
				{
					method: 'POST',
					path: '/me/feed',
					params: {
					message: "Coole App! Holt euch auch die App MarkenDetektive aus dem Appstore! " + news,
					 link: 'http://www.psicon.de/markendetektive',
					 application: 'geposted mit der MarkenDetektive App - jetzt im Appstore',
					 icon: 'http://www.psicon.de/discountermarken/img/icon1616.png'
					},
					success: $ionicPopup.alert({
											 title: 'Erfolgreich ' + data.name,
											 template: 
											 '<p style="text-align:center;">Erfolgreich auf facebook gepostet!' +
											 '</br>Danke :)</p>'
										   })                

				});},
            function(error) {
$ionicPopup.alert({
											 title: 'Fehler',
											 template: 
											 '<p style="text-align:center;">Konnte dich leider nicht bei facebook einloggen!'
										   });
										               });
        }}]
   });}
  
	 
 data = ShoppingCartService.getCartitems();

var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getnews.php",{timeout:20000});
                 responsePromise.success(function(data, status, headers, config) {
	 						 $scope.nachrichten = data;
 							 
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();

							
							
                });
	
	 
		   $scope.cartitems = data;
	ionic.Platform.ready(function() {
    // hide the status bar using the StatusBar plugin
    //StatusBar.hide();
	
	
	
     });
	 	 


  console.log(data);  
     $scope.deleteitem = function(itemean) {
  		   ShoppingCartService.removeCartitem(itemean);
			if($state.current.name == "app.home")
					{
						$state.transitionTo($state.current, $stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
					}
	   }
  
  
  $scope.getProdukt = function(ean){
	  		ProdukteService.setProdukt(ean);
			$ionicLoading.show();
	    	$state.go("app.produkt");
	  }
 
	 
   
   $scope.openlinkexternal = function (linkto) { 
					 $ionicLoading.show();
					 window.open(linkto,'_system','location=yes');
					 
				 	 $ionicLoading.hide();
}

  $scope.login = function() {
        openFB.login('email,publish_actions',
            function() {
                //alert('Facebook login succeeded');
				 
            },
            function(error) {
                alert('Facebook login failed: ' + error.error_description);
            });}
			
	
 $scope.shareonfb = function(){

				
				var confirmPopup = $ionicPopup.confirm({
     title: '<h4 style="text-align:center;">Teilen?</h4>',
     template: '<p style="text-align:center;">Möchtest du jetzt  deinen Facebookfreunden von MarkenDetektiven erzählen?</p>',
	 buttons: [
      { text: 'Später' },
      {
        text: '<b>JA, KLAR SOFORT!</b>',
        type: 'button-balanced',
		onTap: function(e) {
			openFB.login('email,publish_actions',
            function() {
          openFB.api(
				{
					method: 'POST',
					path: '/me/feed',
					params: {
					message: "Coole App! Holt euch auch die App MarkenDetektive aus dem Appstore!",
					 link: 'http://www.psicon.de/markendetektive',
					 application: 'geposted mit der MarkenDetektive App - jetzt im Appstore',
					 icon: 'http://www.psicon.de/discountermarken/img/icon1616.png'
					},
					success: $ionicPopup.alert({
											 title: 'Erfolgreich',
											 template: 
											 '<p style="text-align:center;">Erfolgreich auf facebook gepostet!' +
											 '</br>Danke :)</p>'
										   })
				});},
            function(error) {
$ionicPopup.alert({
											 title: 'Fehler',
											 template: 
											 '<p style="text-align:center;">Konnte dich leider nicht bei facebook einloggen!'
										   });
										               });
        }}]
   });}
   
   
  
  $scope.getDiscounterList = function () { 
  
	 $ionicLoading.show();
	 $state.go("app.discounter");
	if($state.current.name == "app.discounter")
					{
						$state.transitionTo($state.current, $stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
					}
					 };
					 
	$scope.getKategorieList = function () { 
  
	 $ionicLoading.show();
	 $state.go("app.kategorieauswahl");
	if($state.current.name == "app.kategorieauswahl")
					{
						$state.transitionTo($state.current, $stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
					}
					 };
 
 $scope.getMarkenProdukteList = function () { 
  
	 $ionicLoading.show();
	 $state.go("app.markenprodukte");
	if($state.current.name == "app.markenprodukte")
					{
						$state.transitionTo($state.current, $stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
					}
	
	
 };
  
  $scope.scanbarcode = function(){
	  				 $ionicLoading.show();

	  cordova.plugins.barcodeScanner.scan(
      		function (result) {
  			    //alert("We got a barcode\n" +
                //"Result: " + result.text + "\n" +
                //"Format: " + result.format + "\n" +
                //"Cancelled: " + result.cancelled);
				if(result.cancelled){	
					  				 $ionicLoading.hide();
			
				console.log("Scanner cancelled");
				}else{
				console.log("Scanned: " + result.text);
				ProdukteService.setProdukt(result.text);
	     		$state.go("app.produkt");
				
				if($state.current.name == "app.produkt")
					{
						$state.transitionTo($state.current, $stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
					}}
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      } );
	  
	  },

  // Form data for the login modal
  $scope.loginData = {};

  // Create the search modal that we will use later
  $ionicModal.fromTemplateUrl('templates/suche.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
   // Create the share modal that we will use later
  $ionicModal.fromTemplateUrl('templates/share.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.sharemodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSearch = function() {
    $scope.modal.hide();
  },
  // Triggered in the login modal to close it
  $scope.closeShare = function() {
    $scope.sharemodal.hide();
  },
   // Open the login modal
  $scope.showshare = function() {
    $scope.sharemodal.show();
  };

$scope.searchprodukte = function(suche) {
	if(suche.nach==""){$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Bitte gebe mir einen Suchbegriff!' 
							   });}else{
		$ionicLoading.show();
    	$scope.modal.hide();
		console.log("Starte Suche nach: " + suche.nach);
		console.log($state.current.name);
		SuchService.setSuchbegriff(suche.nach);
		$state.go("app.produktebysearch");
		if($state.current.name == "app.produktebysearch")
		{
			$state.transitionTo($state.current, $stateParams, {
				reload: true,
				inherit: false,
				notify: true
			});
		}
}
  };

  // Open the login modal
  $scope.showsearch = function() {
    $scope.modal.show();
  };

  // Perform the  action when the user submits the login form
  $scope.doSearch = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
 
 
  
})
  

.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
})

 .controller('getbyletterCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, LetterService) {
 							   	$ionicLoading.show();

 var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/gethandelsmarken.php?letter=" + LetterService.getLetter(),{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	 						 $scope.ProduktTypen = data;
							 //console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
							   							 $ionicLoading.hide();

                });
 
 
 })
 
 .controller('openeanCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService) {
				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/openean.php?ean=" + ProdukteService.getProdukt(),{timeout:20000});
	 						 	$scope.openeanprodukte = "";
   								$scope.myhtml='<i class="icon-left icon ion-loading-d" style="font-size:24px;" ></i><h3 >Suche in Datenbanken läuft...</h3>';
								$scope.showmyinfo = false;
								$scope.$apply();
															 							 $ionicLoading.hide();
                responsePromise.success(function(data, status, headers, config) {
							 $ionicLoading.show();
							 $scope.openeanprodukte = data;

							 responsePromise.then(function(response) {
							 							 $ionicLoading.hide();
							   							 $scope.showmyinfo = true;
	   					   								 $scope.myhtml="";
													 
     						});

		                 });
						 
						 
						 
                 responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							 $scope.myhtml = '<i class="icon-left icon ion-alert-circled" style="font-size:24px;" ><h3>Keine Antwort vom externen Server. Bitte später erneut versuchen!</h3>';
  							 
                });
				
				$scope.openlinkext = function () { 
 					 window.open('http://www.amazon.de/gp/search?ie=UTF8&camp=1638&creative=6742&index=aps&keywords=' + ProdukteService.getProdukt()  + '&linkCode=ur2&tag=wwwpsiconde-21','_system','location=yes');
	
	
 };
				
				
				
				 
  })
 
 
 .controller('getKontrollnummernCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, KontrollnummerntypService) {
				
											   	$ionicLoading.show();

				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getkontrollnummern.php?typ=" + KontrollnummerntypService.getTyp(),{timeout:20000});
	 						 $scope.openeanprodukte = "";

                responsePromise.success(function(data, status, headers, config) {
							 $ionicLoading.show();
							 $scope.Kontrollnummern = data;
 							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Keine Rückmeldung vom Server!' +
								 '</br>Versuche es später nochmal.</p>' 
							   });
                });
				
			 
				
				
				
   })
 
 .controller('getkategorieCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, KategorieService) {
 							   	$ionicLoading.show();

  var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getkategorien.php",{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	
	 						 $scope.Kategorien = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukte_bykategorie = function (task) { 
				 console.log("selected kategorie:" + task);
				 $scope.selectedKategorie = task+"";
				 KategorieService.setKategorie(task);
				 
				 $ionicLoading.show();
	 
	 	 		$state.go("app.produktebykategorie");

	
	
 };
 
 
 
 })
 
 .controller('getdiscounterCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, DiscounterService) {
 							   	$ionicLoading.show();

  var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getdiscounter.php",{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	
	 						 $scope.Discounters = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukte_bydiscounter = function (task) { 
				 console.log("selected:" + task);
				 $scope.selectedDiscounter = task+"";
				 DiscounterService.setDiscounter(task);
				 
				 $ionicLoading.show();
	 
	 	 		$state.go("app.produktebydiscounter");

	
	
 };
 
 
 
 })

.controller('getProduktebydiscounterCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService, DiscounterService) {
 							   	$ionicLoading.show();

  
  
				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getprodukte_bydiscounter.php?discounterid=" + DiscounterService.getDiscounter(),{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	 						 $scope.Produkte = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukt = function (task) { 
				
				
				 console.log("selected Produkt:" + task);
				 $scope.selectedProdukt = task+"";
				 ProdukteService.setProdukt(task);
				 
				 $ionicLoading.show();
	 
	 	 		$state.go("app.produkt");

	
	
 };
 
 
 
 })
 
 .controller('getNeuesteprodukteCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService) {
 
  							   	$ionicLoading.show();

  
				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getneuesteprodukte.php",{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	 						 $scope.Produkte = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukt = function (task) { 
				
				
				 console.log("selected Produkt:" + task);
				 $scope.selectedProdukt = task+"";
				 ProdukteService.setProdukt(task);
				 
				 $ionicLoading.show();
	 
	 	 		$state.go("app.produkt");

	
	
 };
 
 
 
 })
 
 

.controller('getProduktebykategorieCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService, KategorieService) {
 							   	$ionicLoading.show();

  
  
				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getprodukte_bykategorie.php?kategorie=" + KategorieService.getKategorie(),{timeout:19000});

                responsePromise.success(function(data, status, headers, config) {
	 						 $scope.Produkte = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukt = function (task) { 
				
				
				 console.log("selected Produkt:" + task);
				 $scope.selectedProdukt = task+"";
				 ProdukteService.setProdukt(task);
				 
				 $ionicLoading.show();
	 
	 	 		$state.go("app.produkt");

	
	
 };
 
 
 
 })


.controller('getProduktebysearchCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService, SuchService) {
   							   	$ionicLoading.show();

  
				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getprodukte_bysearch.php?ean=" + SuchService.getSuchbegriff(),{timeout:12000});

console.log("Suchlink: http://psicon.de/discountermarken/ionic/php/getprodukte_bysearch.php?searchitem=" + SuchService.getSuchbegriff());
                responsePromise.success(function(data, status, headers, config) {
	 						 $scope.Produkte = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukt = function (task) { 
				
				
				 console.log("selected Produkt:" + task);
				 $scope.selectedProdukt = task+"";
				 ProdukteService.setProdukt(task);
				 
				 $ionicLoading.show();
	 	 		$state.go("app.produkt");

	
	
 };
 
 
 
 })

   
.controller('getProduktCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService, DiscounterService,ShoppingCartService) {
 
							   	$ionicLoading.show();

  $scope.openlinkext = function () { 
 					 window.open('http://www.amazon.de/gp/search?ie=UTF8&camp=1638&creative=6742&index=aps&keywords=' + ProdukteService.getProdukt()  + '&linkCode=ur2&tag=wwwpsiconde-21','_system','location=yes');
	
	
 };
  
				var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getprodukte_byean.php?ean=" + ProdukteService.getProdukt(),{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	 						 $scope.Produkte = data;
							 console.log(data);
							 $ionicLoading.hide();
		                
						 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
							   	$ionicLoading.hide();

                });
				
				 $scope.addtocart = function(name, discounter, ean,preis){
				  //alert('Trying to add: ' + name + ' d: ' + discounter + 'ean: ' + ean);
				  var cartitems = [    			{ 	itemname: name, 
				  									itemdiscounter: discounter, 	
													itemean: ean,
													itempreis: preis
													}   
   								];
 
 				$ionicPopup.alert({
								 title: name + '',
								 template: 
								 '<p style="text-align:center;">wurde erfolgreich zu deiner Einkaufsliste hinzugefügt!</p>'
							   }); 				 ShoppingCartService.pushCartitem(cartitems);
				  };
 
  $scope.shareonfb = function(posting, img1, img2){

				
				var confirmPopup = $ionicPopup.confirm({
     title: '<h4 style="text-align:center;">Geheimnis veröffentlichen?</h4>',
     template: '<p style="text-align:center;">Möchtest du jetzt bei deinen Facebookfreunden mit diesem Geheimnis so richtig Eindruck schinden?</p>',
	 buttons: [
      { text: 'Später' },
      {
        text: '<b>JA, KLAR SOFORT!</b>',
        type: 'button-balanced',
		onTap: function(e) {
			openFB.login('email,publish_actions',
            function() {
          openFB.api(
				{
					method: 'POST',
					path: '/me/feed',
					params: {
					message: posting+"",
					 link: 'http://www.psicon.de/markendetektive',
					 application: 'geposted mit der MarkenDetektive App - jetzt im Appstore',
					 icon: 'http://www.psicon.de/discountermarken/img/icon1616.png',
					 picture: img1
					},
					success: $ionicPopup.alert({
											 title: 'Erfolgreich',
											 template: 
											 '<p style="text-align:center;">Erfolgreich auf facebook gepostet!' +
											 '</br>Danke :)</p>'
										   })
				});},
            function(error) {
$ionicPopup.alert({
											 title: 'Fehler',
											 template: 
											 '<p style="text-align:center;">Konnte dich leider nicht bei facebook einloggen!'
										   });
										               });
        }}]
   });
   
				
				
			 
	
            
	 
	  };
  

 
  
 
 })

.controller('getmarkenprodukteCtrl', function($scope, $http, $ionicLoading, $state,$ionicPopup, ProdukteService) {
 
  var responsePromise = $http.get("http://psicon.de/discountermarken/ionic/php/getmarkenprodukte.php",{timeout:20000});

                responsePromise.success(function(data, status, headers, config) {
	
	 						 $scope.Produkte = data;
							 console.log(data);
							 $ionicLoading.hide();
		                 });
                responsePromise.error(function(data, status, headers, config) {
							 $ionicLoading.hide();
							$ionicPopup.alert({
								 title: 'FEHLER',
								 template: 
								 '<p style="text-align:center;">Prüfe deine Internetverbindung!' +
								 '</br>Vielleicht hast du hier auch keinen Empfang.</p>'
							   });
                });
				
				$scope.getprodukte_bymarke = function (task) { 
				 console.log("selected:" + task);
				 $scope.selectedProdukt = task+"";
				 ProdukteService.setProdukt(task);
				 
				 $ionicLoading.show();
	 
	 	 		$state.go("app.produkt");

	
	
 };
 
 
 
 })



.controller('getController', function($scope, $http, $ionicLoading, $state, LetterService, KontrollnummerntypService) {
$scope.Typen = [    	{ Bez: 'Molkereibetriebe', Typ: 1},    
						{ Bez: 'Fleischereibetriebe', Typ:2},    
						{ Bez: 'Fischereibetriebe', Typ:3}    
									]
									
$scope.letters = [
    { letter: 'A'},    { letter: 'B'},    { letter: 'C'},    { letter: 'D'},    { letter: 'E'},
    { letter: 'F'},    { letter: 'G'},    { letter: 'H'},    { letter: 'I'},    { letter: 'J'},
    { letter: 'K'},    { letter: 'L'},    { letter: 'M'},    { letter: 'N'},    { letter: 'O'},
    { letter: 'P'},    { letter: 'Q'},    { letter: 'R'},    { letter: 'S'},    { letter: 'T'},
    { letter: 'U'},    { letter: 'V'},    { letter: 'W'},    { letter: 'X'},    { letter: 'Y'},
    { letter: 'Z'},  ];


  $scope.getHandelsmarken = function (task) { 
		
	 $scope.selectedletter = task+"";
	 LetterService.setLetter(task.letter[0]+"");
	 
	 $ionicLoading.show();
	 
	 	 $state.go("app.handelsmarkeletter");

	
	
 };
 
  $scope.getKontrollnummern = function (task) { 
 	 $scope.selectedtyp = task+"";
	 KontrollnummerntypService.setTyp(task+"");
	 
	 $ionicLoading.show();
	 
	 	 $state.go("app.kontrollnummern");

	
	
 };
 
  
 
});