
$(document).ready(function(){


		//Safety Form
	  var arrVeiculoSafe = [];
    var arrVeiculoSafeName = [];
    var arrPeopleSafe = [];
    var arrPeopleSafeName = [];
    var arrRedHat = [];
    var arrRedHatName = [];
    var arrfallArrestDevices = [];
    var arrfallArrestDevicesName = [];

    //EDBoard Form
    var arrConnection = [];
    var arrConnectionName = [];
    var arrEnergyMeter = [];
    var arrEnergyMeterName = [];
    var arrSwitchingMec = [];
    var arrSwitchingMecName = [];
    var arrDBoardSleeves = [];
    var arrDBoardSleevesName = [];
    var arrLightSwitch = [];
    var arrLightSwitchName = [];
    var arrPaintworkSiteLight = [];
    var arrPaintworkSiteLightName = [];
    var arrAcSupplierDefects = [];
    var arrAcSupplierDefectsName = [];

    //Container Form
    var arrContainerLight = [];
    var arrContainerLightName = [];
    var arrCircuitBreaker = [];
    var arrCircuitBreakerName = [];
    var arrEarthConnections = [];
    var arrEarthConnectionsName = [];
    var arrConditions = [];
    var arrConditionsName = [];
    var arrRoofWater = [];
    var arrRoofWaterName = [];
    var arrPaintwork = [];
    var arrPaintworkName = [];
    var arrJointsCablesHoles = [];
    var arrJointsCablesHolesName = [];
    var arrTransmissionRadioCF = [];
    var arrTransmissionRadioCFName = [];

    //Roof Top
    var arrMountingPoles = [];
    var arrMountingPolesName = [];
    var arrPolesCorrosions = [];
    var arrPolesCorrosionsName = [];
    var arrPolesEarthed = [];
    var arrPolesEarthedName = [];
    var arrCabinetDamage = [];
    var arrCabinetDamageName = [];
    var arrTransmissionRadioRF = [];
    var arrTransmissionRadioRFName = [];

    //Mast
    var arrAwLight = [];
    var arrAwLightName = [];
    var arrAwLightDbFitting = [];
    var arrAwLightDbFittingName = [];
    var arrTowerInspection = [];
    var arrTowerInspectionName = [];
    var arrPaintTower = [];
    var arrPaintTowerName = [];
    var arrVisualInpectionTransRadio = [];
    var arrVisualInpectionTransRadioName = [];
    var arrTowerSpecification = [];
    var arrTowerSpecificationName = [];

    //Air Conditioners
    var arrFanBlade = [];
    var arrFanBladeName = [];
    var arrNoiseVibration = [];
    var arrNoiseVibrationName = [];
    var arrRefrigerantLine = [];
    var arrRefrigerantLineName = [];
    var arrCasingSealed = [];
    var arrCasingSealedName = [];
    var arrRustACF = [];
    var arrRustACFName = [];

    //Site General
    var arrFenceGateLocksHinges = [];
    var arrFenceGateLocksHingesName = [];
    var arrSignage = [];
    var arrSignageName = [];
    var arrWaterDamage = [];
    var arrWaterDamageName = [];
    var arrCrushedStone = [];
    var arrCrushedStoneName = [];
    var arrSiteClean = [];
    var arrSiteCleanName = [];
    var arrWeedsGrass = [];
    var arrWeedsGrassName = [];
    var arrDefectAccessRoad = [];
    var arrDefectAccessRoadName = [];
    var arrRubish = [];
    var arrRubishName = [];

     //Alarms
    var arrIntruder = [];
    var arrIntruderName = [];
    var arrMovement = [];
    var arrMovementName = [];
    var arrHighTemp = [];
    var arrHighTempName = [];
    var arrRectifierSystem = [];
    var arrRectifierSystemName = [];
    var arrRectifierModule = [];
    var arrRectifierModuleName = [];
    var arrAircon1 = [];
    var arrAircon1Name = [];
    var arrAircon2 = [];
    var arrAircon2Name = [];
    var arrGeneratorFuel = [];
    var arrGeneratorFuelName = [];
    var arrGeneratorAbnormal = [];
    var arrGeneratorAbnormalName = [];
    var arrAircraftWarning = [];
    var arrAircraftWarningName = [];
    var arrSmoke = [];
    var arrSmokeName = [];
    var arrAcMainsFailure = [];
    var arrAcMainsFailureName = [];
    var arrBatteryLow = [];
    var arrBatteryLowName = [];
    var arrGeneratorRunning = [];
    var arrGeneratorRunningName = [];

    //Generator
    var arrEngineOil = [];
    var arrEngineOilName = [];
    var arrOilLeak = [];
    var arrOilLeakName = [];
    var arrRadiatorHoses = [];
    var arrRadiatorHosesName = [];
    var arrAirFilter = [];
    var arrAirFilterName = [];
    var arrCoolantLeaks = [];
    var arrCoolantLeaksName = [];
    var arrVBelt = [];
    var arrVBeltName = [];
    var arrFuelLeaks = [];
    var arrFuelLeaksName = [];
    var arrElectrolyteConnectionCond = [];
    var arrElectrolyteConnectionCondName = [];
    var arrSwitcherBreaker = [];
    var arrSwitcherBreakerName = [];
    var arrControlPanelRecordLevel = [];
    var arrControlPanelRecordLevelName = [];
    var arrAbnormalVibrations = [];
    var arrAbnormalVibrationsName = [];
    var arrRustGF = [];
    var arrRustGFName = [];
    var arrMoutingsBrackets = [];
    var arrMoutingsBracketsName = [];
    var arrOveralCond = [];
    var arrOveralCondName = [];

    //Petty cash Control System
    var arrPettycash_imagem = [];
    var arrPettycash_imagemName = [];


    // Image of Preventative Maintenance
    var arrJobcard_photoMaint = [];
    var arrJobcard_photoMaintName = [];




    if(window.File && window.FileList && window.FileReader) {

      $("#jobcardphotoinfo").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i];
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;
          // console.log(teste[i].name);
          //adiconar os ficheiros carregados no array
          arrJobcard_photoMaint.push(teste[i]);
          arrJobcard_photoMaintName.push(teste[i].name.split(".")[0]);

          // mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mostrarpicturesmaint_imagem");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        console.log(arrJobcard_photoMaintName);
      });

      $(".mostrarpicturesmaint_imagem").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        // console.log(arrVeiculoSafeName);
        arrJobcard_photoMaintName.splice(posicao, 1);
        arrJobcard_photoMaint.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        console.log(arrJobcard_photoMaintName);
    });

      $("#pettycash_imagem").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i];
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;
          // console.log(teste[i].name);
          //adiconar os ficheiros carregados no array
          arrPettycash_imagem.push(teste[i]);
          arrPettycash_imagemName.push(teste[i].name.split(".")[0]);

          // mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mostrarpettycash_imagem");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        console.log(arrPettycash_imagemName);
      });

      $(".mostrarpettycash_imagem").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        // console.log(arrVeiculoSafeName);
        arrPettycash_imagemName.splice(posicao, 1);
        arrPettycash_imagem.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        console.log(arrPettycash_imagemName);
    });

      $("#veiculo_safe_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i];
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;
          console.log(teste[i].name);
          //adiconar os ficheiros carregados no array
          arrVeiculoSafe.push(teste[i]);
          arrVeiculoSafeName.push(teste[i].name.split(".")[0]);

          // mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("safety1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrVeiculoSafeName);
      });

      $(".safety1").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        // console.log(arrVeiculoSafeName);
        arrVeiculoSafeName.splice(posicao, 1);
        arrVeiculoSafe.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrVeiculoSafe);
    });

      $("#People_safe_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrPeopleSafe.push(teste[i]);
          arrPeopleSafeName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("safety2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrPeopleSafe);
      });

      $(".safety2").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrPeopleSafeName.splice(posicao, 1);
        arrPeopleSafe.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrPeopleSafe);
    });

      $("#red_hat_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRedHat.push(teste[i]);
          arrRedHatName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("safety3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRedHat);
      });

      $(".safety3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRedHatName.splice(posicao, 1);
        arrRedHat.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRedHat);
    });

      $("#fall_Arrest_devices_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrfallArrestDevices.push(teste[i]);
          arrfallArrestDevicesName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("safety4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrfallArrestDevices);
      });

      $(".safety4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrfallArrestDevicesName.splice(posicao, 1);
        arrfallArrestDevices.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrfallArrestDevices);
    });

      //EDBOARD FORM

      $("#Connection_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrConnection.push(teste[i]);
          arrConnectionName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrConnection);
      });

      $(".edBoardOb1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrConnectionName.splice(posicao, 1);
        arrConnection.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrConnection);
    });

      $("#energy_meter_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrEnergyMeter.push(teste[i]);
          arrEnergyMeterName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrEnergyMeter);
      });

      $(".edBoardOb2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrEnergyMeterName.splice(posicao, 1);
        arrEnergyMeter.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrEnergyMeter);
    });

      $("#switching_mec_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrSwitchingMec.push(teste[i]);
          arrSwitchingMecName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrSwitchingMec);
      });

      $(".edBoardOb3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrSwitchingMecName.splice(posicao, 1);
        arrSwitchingMec.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrSwitchingMec);
    });

      $("#d_board_sleeves_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrDBoardSleeves.push(teste[i]);
          arrDBoardSleevesName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrDBoardSleeves);
      });

      $(".edBoardOb4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrDBoardSleevesName.splice(posicao, 1);
        arrDBoardSleeves.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrDBoardSleeves);
    });


      $("#light_switch_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrLightSwitch.push(teste[i]);
          arrLightSwitchName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrLightSwitch);
      });

      $(".edBoardOb5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrLightSwitchName.splice(posicao, 1);
        arrLightSwitch.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrLightSwitch);
    });

      $("#paintwork_sitelight_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrPaintworkSiteLight.push(teste[i]);
          arrPaintworkSiteLightName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb6");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrPaintworkSiteLight);
      });

      $(".edBoardOb6").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrPaintworkSiteLightName.splice(posicao, 1);
        arrPaintworkSiteLight.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrPaintworkSiteLight);
    });

      $("#ac_supplier_defects_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAcSupplierDefects.push(teste[i]);
          arrAcSupplierDefectsName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("edBoardOb7");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        console.log(arrAcSupplierDefects);
      });

      $(".edBoardOb7").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAcSupplierDefectsName.splice(posicao, 1);
        arrAcSupplierDefects.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        console.log(arrAcSupplierDefects);
    });

      //CONTAINER FORM

      $("#container_light_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrContainerLight.push(teste[i]);
          arrContainerLightName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrContainerLight);
      });

      $(".container1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrContainerLightName.splice(posicao, 1);
        arrContainerLight.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrContainerLight);
    });

      $("#circuit_breaker_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrCircuitBreaker.push(teste[i]);
          arrCircuitBreakerName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrCircuitBreaker);
      });

      $(".container2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrCircuitBreakerName.splice(posicao, 1);
        arrCircuitBreaker.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrCircuitBreaker);
    });

      $("#earth_connections_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrEarthConnections.push(teste[i]);
          arrEarthConnectionsName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrEarthConnections);
      });

      $(".container3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrEarthConnectionsName.splice(posicao, 1);
        arrEarthConnections.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrEarthConnections);
    });

      $("#conditions_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrConditions.push(teste[i]);
          arrConditionsName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrConditions);
      });

      $(".container4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrConditionsName.splice(posicao, 1);
        arrConditions.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrConditions);
    });

      $("#roof_water_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRoofWater.push(teste[i]);
          arrRoofWaterName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRoofWater);
      });

      $(".container5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRoofWaterName.splice(posicao, 1);
        arrRoofWater.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRoofWater);
    });

      $("#paintwork_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrPaintwork.push(teste[i]);
          arrPaintworkName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container6");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrPaintwork);
      });

      $(".container6").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrPaintworkName.splice(posicao, 1);
        arrPaintwork.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrPaintwork);
    });

      $("#joints_cables_holes_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrJointsCablesHoles.push(teste[i]);
          arrJointsCablesHolesName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container7");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrJointsCablesHoles);
      });

      $(".container7").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrJointsCablesHolesName.splice(posicao, 1);
        arrJointsCablesHoles.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrJointsCablesHoles);
    });

      $("#transmission_radio_imageCF").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrTransmissionRadioCF.push(teste[i]);
          arrTransmissionRadioCFName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("container8");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrTransmissionRadioCF);
      });

      $(".container8").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrTransmissionRadioCFName.splice(posicao, 1);
        arrTransmissionRadioCF.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrTransmissionRadioCF);
    });

      //ROOF TOP FORM
      $("#mounting_poles_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrMountingPoles.push(teste[i]);
          arrMountingPolesName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("roofTop1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrMountingPoles);
      });

      $(".roofTop1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrMountingPolesName.splice(posicao, 1);
        arrMountingPoles.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrMountingPoles);
    });

      $("#poles_corrosions_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrPolesCorrosions.push(teste[i]);
          arrPolesCorrosionsName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("roofTop2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrPolesCorrosions);
      });

       $(".roofTop2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrPolesCorrosionsName.splice(posicao, 1);
        arrPolesCorrosions.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrPolesCorrosions);
    });

      $("#poles_earthed_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrPolesEarthed.push(teste[i]);
          arrPolesEarthedName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("roofTop3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrPolesEarthed);
      });

      $(".roofTop3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrPolesEarthedName.splice(posicao, 1);
        arrPolesEarthed.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrPolesEarthed);
    });

      $("#cabinet_damage_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrCabinetDamage.push(teste[i]);
          arrCabinetDamageName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("roofTop4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrCabinetDamage);
      });

      $(".roofTop4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrCabinetDamageName.splice(posicao, 1);
        arrCabinetDamage.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrCabinetDamage);
    });

      $("#transmission_radio_imageRF").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrTransmissionRadioRF.push(teste[i]);
          arrTransmissionRadioRFName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("roofTop5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrTransmissionRadioRF);
      });

      $(".roofTop5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrTransmissionRadioRFName.splice(posicao, 1);
        arrTransmissionRadioRF.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrTransmissionRadioRF);
    });

      //MAST FORM
      $("#aw_light_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAwLight.push(teste[i]);
          arrAwLightName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
           var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mast1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAwLight);
      });

      $(".mast1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAwLightName.splice(posicao, 1);
        arrAwLight.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAwLight);
    });

      $("#aw_light_db_fitting_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAwLightDbFitting.push(teste[i]);
          arrAwLightDbFittingName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mast2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAwLightDbFitting);
      });

      $(".mast2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAwLightDbFittingName.splice(posicao, 1);
        arrAwLightDbFitting.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAwLightDbFitting);
    });

      $("#tower_inspection_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrTowerInspection.push(teste[i]);
          arrTowerInspectionName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mast3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrTowerInspection);
      });

      $(".mast3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrTowerInspectionName.splice(posicao, 1);
        arrTowerInspection.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrTowerInspection);
    });


      $("#paint_tower_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrPaintTower.push(teste[i]);
          arrPaintTowerName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mast4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrPaintTower);
      });

      $(".mast4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrPaintTowerName.splice(posicao, 1);
        arrPaintTower.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrPaintTower);
    });


      $("#visual_inpection_trans_radio_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrVisualInpectionTransRadio.push(teste[i]);
          arrVisualInpectionTransRadioName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mast5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrVisualInpectionTransRadio);
      });

      $(".mast5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrVisualInpectionTransRadioName.splice(posicao, 1);
        arrVisualInpectionTransRadio.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrVisualInpectionTransRadio);
    });

      $("#tower_specification_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrTowerSpecification.push(teste[i]);
          arrTowerSpecificationName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("mast6");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrTowerSpecification);
      });

      $(".mast6").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrTowerSpecificationName.splice(posicao, 1);
        arrTowerSpecification.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrTowerSpecification);
    });


      //AIR CONDITIONERS FORM
      $("#fan_blade_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrFanBlade.push(teste[i]);
          arrFanBladeName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("airCond1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrFanBlade);
      });

      $(".airCond1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrFanBladeName.splice(posicao, 1);
        arrFanBlade.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrFanBlade);
    });

      $("#noise_vibration_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrNoiseVibration.push(teste[i]);
          arrNoiseVibrationName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("airCond2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrNoiseVibration);
      });

      $(".airCond2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrNoiseVibrationName.splice(posicao, 1);
        arrNoiseVibration.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrNoiseVibration);
    });

      $("#refrigerant_line_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRefrigerantLine.push(teste[i]);
          arrRefrigerantLineName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("airCond3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRefrigerantLine);
      });

      $(".airCond3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRefrigerantLineName.splice(posicao, 1);
        arrRefrigerantLine.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRefrigerantLine);
    });

      $("#casing_sealed_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrCasingSealed.push(teste[i]);
          arrCasingSealedName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("airCond4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrCasingSealed);
      });

      $(".airCond4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrCasingSealedName.splice(posicao, 1);
        arrCasingSealed.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrCasingSealed);
    });

      $("#rust_imageACF").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRustACF.push(teste[i]);
          arrRustACFName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("airCond5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRustACF);
      });

      $(".airCond5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRustACFName.splice(posicao, 1);
        arrRustACF.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRustACF);
    });

      //SITE GENERAL FORM

      $("#fence_gate_locks_hinges_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrFenceGateLocksHinges.push(teste[i]);
          arrFenceGateLocksHingesName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrFenceGateLocksHinges);
      });

      $(".site_general1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrFenceGateLocksHingesName.splice(posicao, 1);
        arrFenceGateLocksHinges.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrFenceGateLocksHinges);
    });

      $("#signage_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrSignage.push(teste[i]);
          arrSignageName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrSignage);
      });

      $(".site_general2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrSignageName.splice(posicao, 1);
        arrSignage.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrSignage);
    });

      $("#water_damage_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrWaterDamage.push(teste[i]);
          arrWaterDamageName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrWaterDamage);
      });

      $(".site_general3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrWaterDamageName.splice(posicao, 1);
        arrWaterDamage.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrWaterDamage);
    });

      $("#crushed_stone_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrCrushedStone.push(teste[i]);
          arrCrushedStoneName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrCrushedStone);
      });

      $(".site_general4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrCrushedStoneName.splice(posicao, 1);
        arrCrushedStone.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrCrushedStone);
    });

      $("#site_clean_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrSiteClean.push(teste[i]);
          arrSiteCleanName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrSiteClean);
      });

      $(".site_general5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrSiteCleanName.splice(posicao, 1);
        arrSiteClean.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrSiteClean);
    });

      $("#weeds_grass_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrWeedsGrass.push(teste[i]);
          arrWeedsGrassName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general6");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrWeedsGrass);
      });

      $(".site_general6").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrWeedsGrassName.splice(posicao, 1);
        arrWeedsGrass.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrWeedsGrass);
    });

      $("#defect_access_road_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrDefectAccessRoad.push(teste[i]);
          arrDefectAccessRoadName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general7");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrDefectAccessRoad);
      });

      $(".site_general7").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrDefectAccessRoadName.splice(posicao, 1);
        arrDefectAccessRoad.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrDefectAccessRoad);
    });

      $("#rubish_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRubish.push(teste[i]);
          arrRubishName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("site_general8");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRubish);
      });

      $(".site_general8").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRubishName.splice(posicao, 1);
        arrRubish.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRubish);
    });

      //ALARMS FORM
      $("#intruder_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrIntruder.push(teste[i]);
          arrIntruderName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrIntruder);
      });

      $(".alarm1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrIntruderName.splice(posicao, 1);
        arrIntruder.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrIntruder);
    });

      $("#movement_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrMovement.push(teste[i]);
          arrMovementName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrMovement);
      });

      $(".alarm2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrMovementName.splice(posicao, 1);
        arrMovement.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrMovement);
    });

      $("#high_temp_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrHighTemp.push(teste[i]);
          arrHighTempName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrHighTemp);
      });

      $(".alarm3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrHighTempName.splice(posicao, 1);
        arrHighTemp.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrHighTemp);
    });

      $("#rectifier_system_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRectifierSystem.push(teste[i]);
          arrRectifierSystemName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRectifierSystem);
      });

      $(".alarm4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRectifierSystemName.splice(posicao, 1);
        arrRectifierSystem.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRectifierSystem);
    });


      $("#rectifier_module_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRectifierModule.push(teste[i]);
          arrRectifierModuleName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRectifierModule);
      });

      $(".alarm5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRectifierModuleName.splice(posicao, 1);
        arrRectifierModule.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRectifierModule);
    });

      $("#aircon1_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAircon1.push(teste[i]);
          arrAircon1Name.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm6");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAircon1);
      });

      $(".alarm6").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAircon1Name.splice(posicao, 1);
        arrAircon1.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAircon1);
    });

      $("#aircon2_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAircon2.push(teste[i]);
          arrAircon2Name.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm7");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAircon2);
      });

      $(".alarm7").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAircon2Name.splice(posicao, 1);
        arrAircon2.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAircon2);
      });

      $("#generator_fuel_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrGeneratorFuel.push(teste[i]);
          arrGeneratorFuelName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm8");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrGeneratorFuel);
      });

      $(".alarm8").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrGeneratorFuelName.splice(posicao, 1);
        arrGeneratorFuel.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrGeneratorFuel);
      });

      $("#generator_abnormal_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrGeneratorAbnormal.push(teste[i]);
          arrGeneratorAbnormalName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm9");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrGeneratorAbnormal);
      });

      $(".alarm9").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrGeneratorAbnormalName.splice(posicao, 1);
        arrGeneratorAbnormal.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrGeneratorAbnormal);
      });

      $("#aircraft_warning_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAircraftWarning.push(teste[i]);
          arrAircraftWarningName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm10");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAircraftWarning);
      });

      $(".alarm10").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAircraftWarningName.splice(posicao, 1);
        arrAircraftWarning.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAircraftWarning);
      });


      $("#smoke_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrSmoke.push(teste[i]);
          arrSmokeName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm11");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrSmoke);
      });

      $(".alarm11").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrSmokeName.splice(posicao, 1);
        arrSmoke.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrSmoke);
      });

      $("#ac_mains_failure_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAcMainsFailure.push(teste[i]);
          arrAcMainsFailureName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm12");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAcMainsFailure);
      });

      $(".alarm12").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAcMainsFailureName.splice(posicao, 1);
        arrAcMainsFailure.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAcMainsFailure);
      });

      $("#battery_low_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrBatteryLow.push(teste[i]);
          arrBatteryLowName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm13");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrBatteryLow);
      });

      $(".alarm13").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrBatteryLowName.splice(posicao, 1);
        arrBatteryLow.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrBatteryLow);
      });

      $("#generator_running_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrGeneratorRunning.push(teste[i]);
          arrGeneratorRunningName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("alarm14");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrGeneratorRunning);
      });

      $(".alarm14").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrGeneratorRunningName.splice(posicao, 1);
        arrGeneratorRunning.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrGeneratorRunning);
      });

      //GENERATOR FORM
      $("#engine_oil_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrEngineOil.push(teste[i]);
          arrEngineOilName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator1");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrEngineOil);
      });

      $(".generator1").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrEngineOilName.splice(posicao, 1);
        arrEngineOil.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrEngineOil);
      });

      $("#oil_leak_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrOilLeak.push(teste[i]);
          arrOilLeakName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator2");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrOilLeak);
      });

      $(".generator2").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrOilLeakName.splice(posicao, 1);
        arrOilLeak.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrOilLeak);
      });

      $("#radiator_hoses_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRadiatorHoses.push(teste[i]);
          arrRadiatorHosesName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator3");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRadiatorHoses);
      });

      $(".generator3").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRadiatorHosesName.splice(posicao, 1);
        arrRadiatorHoses.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRadiatorHoses);
      });

      $("#air_filter_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAirFilter.push(teste[i]);
          arrAirFilterName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator4");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAirFilter);
      });

      $(".generator4").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAirFilterName.splice(posicao, 1);
        arrAirFilter.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAirFilter);
      });

      $("#coolant_leaks_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrCoolantLeaks.push(teste[i]);
          arrCoolantLeaksName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator5");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrCoolantLeaks);
      });

      $(".generator5").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrCoolantLeaksName.splice(posicao, 1);
        arrCoolantLeaks.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrCoolantLeaks);
      });

      $("#v_belt_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrVBelt.push(teste[i]);
          arrVBeltName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator6");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrVBelt);
      });

      $(".generator6").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrVBeltName.splice(posicao, 1);
        arrVBelt.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrVBelt);
      });

      $("#fuel_leaks_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrFuelLeaks.push(teste[i]);
          arrFuelLeaksName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator7");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrFuelLeaks);
      });

      $(".generator7").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrFuelLeaksName.splice(posicao, 1);
        arrFuelLeaks.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrFuelLeaks);
      });

      $("#electrolyte_connection_cond_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrElectrolyteConnectionCond.push(teste[i]);
          arrElectrolyteConnectionCondName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator8");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrElectrolyteConnectionCond);
      });

      $(".generator8").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrElectrolyteConnectionCondName.splice(posicao, 1);
        arrElectrolyteConnectionCond.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrElectrolyteConnectionCond);
      });

      $("#switcher_breaker_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrSwitcherBreaker.push(teste[i]);
          arrSwitcherBreakerName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator9");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrSwitcherBreaker);
      });

      $(".generator9").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrSwitcherBreakerName.splice(posicao, 1);
        arrSwitcherBreaker.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrSwitcherBreaker);
      });

      $("#control_panel_record_level_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrControlPanelRecordLevel.push(teste[i]);
          arrControlPanelRecordLevelName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator10");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrControlPanelRecordLevel);
      });

      $(".generator10").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrControlPanelRecordLevelName.splice(posicao, 1);
        arrControlPanelRecordLevel.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrControlPanelRecordLevel);
      });

      $("#abnormal_vibrations_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrAbnormalVibrations.push(teste[i]);
          arrAbnormalVibrationsName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator11");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrAbnormalVibrations);
      });

      $(".generator11").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrAbnormalVibrationsName.splice(posicao, 1);
        arrAbnormalVibrations.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrAbnormalVibrations);
      });

      $("#rust_imageGF").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrRustGF.push(teste[i]);
          arrRustGFName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator12");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrRustGF);
      });

      $(".generator12").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrRustGFName.splice(posicao, 1);
        arrRustGF.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrRustGF);
      });

      $("#moutings_brackets_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrMoutingsBrackets.push(teste[i]);
          arrMoutingsBracketsName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator13");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        // console.log(arrMoutingsBrackets);
      });

      $(".generator13").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrMoutingsBracketsName.splice(posicao, 1);
        arrMoutingsBrackets.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        // console.log(arrMoutingsBrackets);
      });

      $("#overal_cond_image").on("change",function(e) {
        //pega os ficheiros
        var files = e.target.files,
        filesLength = files.length;
        
        //percorre o numero de ficheiros carregados
        for (var i = 0; i < filesLength; i++) {

          var f = files[i]
          var fileReader = new FileReader();
          var teste=$(this).get(0).files;

          //adiconar os ficheiros carregados no array
          arrOveralCond.push(teste[i]);
          arrOveralCondName.push(teste[i].name.split(".")[0]);

          //mostrar os ficheiros na tela
          var fileName = teste[i].name.split(".")[0];
          var tt = document.getElementById("generator14");
          tt.innerHTML += '<tr><td>' + fileName + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left selmecAzul">clear</i></a></td></tr>';
          fileReader.readAsText(f);
        }
        console.log(arrOveralCond);
      });

      $(".generator14").on("click",".eliminar", function(e){ //user click on remove text
        
        var posicao = $(this).parent('td').parent('tr')[0].rowIndex;
        arrOveralCondName.splice(posicao, 1);
        arrOveralCond.splice(posicao,1);
        $(this).parent('td').parent('tr').remove();
        console.log(arrOveralCond);
      });

    } else {
      alert("Your browser doesn't support to File API")
    }


    var contactosArray = [];
    var editarContactosArray = [];

    var travelinfoArray = [];
    var travelsiteinfoArray = [];
    var generatorJobcardArray = [];
    var equipamentoArray = [];
    var sparesArray = [];

    //Arrays de Site info
    var generatorArray = [];
    var acArray = [];
    var rectcabArray = [];
    var securityArray = [];

    //shake button
    const controle_modalclientesupp = document.querySelector("button#clientesuppopt_yes_btn_modal");
    const controle_modalpettycashreport = document.querySelector("button#pettycashreport_yes_btn_modal");
    const controle_modalcreatettnumber = document.querySelector("button#createttnumber_yes_btn_modal");


( function(){
		$('.portug').removeClass('hide');
	})()

	$('#english').click(function(){
		$('.portug').addClass('hide');
		$('.ingls').removeClass('hide');
	});

	$('#portuguese').click(function(){
		$('.portug').removeClass('hide');
		$('.ingls').addClass('hide');
	});


  $('.tabs').tabs();

 //  $('#tipo_cliente').click(function(){
 //    $('.codcliente').removeClass('hide');
 //    $('.codfornecedor').addClass('hide');
 //    $('#cliente_cod').addClass('preencher');
 //    $('#fornecedor_cod').removeClass('preencher');
 //  });

 // $('#tipo_fornecedor').click(function(){
 //    $('.codcliente').addClass('hide');
 //    $('.codfornecedor').removeClass('hide');
 //    $('#cliente_cod').removeClass('preencher');
 //    $('#fornecedor_cod').addClass('preencher');
 //  });

  $('#verTabelaClientes').click(function(){
     window.location.href="/cliente/clientesupplier/client_home";
  });


  $('#verTabelaFornecedores').click(function(){
    window.location.href="/cliente/clientesupplier/supplier_home";
  });

  $('#verBalance').click(function(){
     window.location.href="/pettycash/accountbalance_home";
  });


  $('#verControl').click(function(){
    window.location.href="/pettycash/accountcontrol_home";
  });


  $('#travelinfo_viagem').click(function(){
    $('.mostrarPartida').removeClass('hide');
    $('.mostrarChegadaSite').addClass('hide');
    $('.mostrarTrabalhoFeito').addClass('hide');
    $('.mostrarPartidaSite').addClass('hide');
    $('.mostrarProximoDestino').removeClass('hide');
    // $('.mostrartabela1').removeClass('hide');
  });

  $('#travelinfo_visitsite').click(function(){
    $('.mostrarPartida').removeClass('hide');
    $('.mostrarChegadaSite').removeClass('hide');
    $('.mostrarTrabalhoFeito').removeClass('hide');
    $('.mostrarPartidaSite').removeClass('hide');
    $('.mostrarProximoDestino').removeClass('hide');
    // $('.mostrartabela1').removeClass('hide');
  });

  $('#siteinfo_generatoryes').click(function(){

    $('#mostrarDetalhesGerador').removeClass('hide');

    if($("#siteinfo_generatoroutputkw").val() == ""){

      $('#addgenerator').removeClass('hide');
      $('#updategenerator').addClass('hide');

    }else{

      $('#updategenerator').removeClass('hide');
      $('#addgenerator').addClass('hide');

    }
    
  });

  $('#siteinfo_generatorno').click(function(){
    $('#mostrarDetalhesGerador').addClass('hide');
    $('#addgenerator').addClass('hide');
    $('#updategenerator').addClass('hide');

  });

  $('#siteinfo_acyes').click(function(){
    $('#mostrarDetalhesAc').removeClass('hide');
    $('#addac').removeClass('hide');

    if($("#siteinfo_acmodel").val() == ""){

      $('#addac').removeClass('hide');
      $('#updateac').addClass('hide');

    }else{

      $('#updateac').removeClass('hide');
      $('#addac').addClass('hide');

    }


  });

  $('#siteinfo_guardsiteyes').click(function(){
    $('#mostrarDetalhesSecurity').removeClass('hide');
    $('#addsecurity').removeClass('hide');
    
  });

  $('#siteinfo_guardsiteno').click(function(){
    $('#mostrarDetalhesSecurity').addClass('hide');
    $('#addsecurity').addClass('hide');
    
  });

    $('#siteinfo_elecpayment').change(function(){
    var pagamento = $("#siteinfo_elecpayment").val();

    if(pagamento == "EDM Prepaid/Credelec"){
      $('#inputcredelec').removeClass('hide');
    }else{
      $('#inputcredelec').addClass('hide');
    }

  });



  $('#siteinfo_acno').click(function(){
    $('#mostrarDetalhesAc').addClass('hide');
    $('#addac').addClass('hide');
    $('#updateac').addClass('hide');
  });

  $('#siteinfo_rectifiercabinnetyes').click(function(){
    $('#mostrarDetalhesRectifierCabinet').removeClass('hide');
    $('#addrectcab').removeClass('hide');

    if($("#siteinfo_rectcabcabinetmodelno").val() == ""){

      $('#addrectcab').removeClass('hide');
      $('#updaterectcab').addClass('hide');

    }else{

      $('#updaterectcab').removeClass('hide');
      $('#addrectcab').addClass('hide');

    }
    
  });

  $('#siteinfo_rectifiercabinnetno').click(function(){
    $('#mostrarDetalhesRectifierCabinet').addClass('hide');
    $('#addrectcab').addClass('hide');
    $('#updaterectcab').addClass('hide');
  });

  $('#jobcard_jobtype').change(function(){

   if($("#jobcard_jobtype").val() == "callout"){

      $('#campoquotation').addClass('hide');
    }else{
      $('#campoquotation').removeClass('hide');
    }
    
  });

  // $('#optanual').click(function(){
  //     $('#mostrarAno').removeClass('hide');
  //     $('#mostrarMes').addClass('hide');
  //     $('#mostrarColaborador').removeClass('hide');
  // });

  // $('#optmensal').click(function(){
  //     $('#mostrarAno').removeClass('hide');
  //     $('#mostrarMes').removeClass('hide');
  //     $('#mostrarColaborador').removeClass('hide');
  // });

  $('#carregarContacto').click(function(){

    $("#tabelaContactoCliente tr").each(function(){
      var currentRow=$(this);

      var col1_value=currentRow.find("td:eq(0)").text();
      var col2_value=currentRow.find("td:eq(1)").text();
          var col3_value=currentRow.find("td:eq(2)").text();
          var col4_value=currentRow.find("td:eq(3)").text();

          var editarContactosObject = {};

          editarContactosObject.contacto_nome=col1_value;
          editarContactosObject.contacto_cargo=col2_value;
          editarContactosObject.contacto_email=col3_value;
          editarContactosObject.contacto_telefone=col4_value;

          editarContactosArray.push(editarContactosObject);
          
    });
    console.log(editarContactosArray);
  });


  $('#adicionarmaiscontacto1').click(function(){
    var contactosObject = {};

      var cn = $("#contacto_nome").val();
      contactosObject.contacto_nome = cn;

      var cc = $("#contacto_cargo").val();
      contactosObject.contacto_cargo = cc;

      var ce = $("#contacto_email").val();
      contactosObject.contacto_email = ce;

      var ct = $("#contacto_telefone").val();
      contactosObject.contacto_telefone = ct;

      var mt = document.getElementById("tabelaContactoCliente");

      // document.getElementById("mostrar").innerHTML = " Nome:" + n;
       // $("<a href=\"#\">"+ n +"</a>").insertAfter("#mostrar");
       mt.innerHTML += '<tr><td>'+ cn +'</td><td>'+ cc +'</td><td>'+ce+'</td><td>'+ct+'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';
       editarContactosArray.push(contactosObject);
       console.log(editarContactosArray);

       //limpar os campos
       $("#contacto_nome").val("");
       $("#contacto_nome").siblings('label').removeClass('active');
       $("#contacto_cargo").val("");
       $("#contacto_cargo").siblings('label').removeClass('active');
       $("#contacto_email").val("");
       $("#contacto_email").siblings('label').removeClass('active');
       $("#contacto_telefone").val("");
       $("#contacto_telefone").siblings('label').removeClass('active');


  });

  $(".mostrarTabela1").on("click",".eliminar", function(e){ //user click on remove text
          // console.log($(this).parent('td'));
          //console.log($(this).parent('td').parent('tr')[0].firstChild.innerText)
          $(this).parent('td').parent('tr').remove();

          for(var i = 0; i < editarContactosArray.length; i++){
            if(editarContactosArray[i].contacto_nome == $(this).parent('td').parent('tr')[0].firstChild.innerText){
              // var testenome = editarContactosArray[i].contacto_nome;
              //   var posicaocontacto = editarContactosArray.findIndex(x => x.contacto_nome === testenome);
                editarContactosArray.splice(i, 1)
                console.log(editarContactosArray);
            }
          }
      });

  $(".mostrarTabela1").on("click",".editar", function(e){ //user click on remove text
        //console.log($(this).parent('td').parent('tr'));
        var contactosfilhos = $(this).parent('td').parent('tr')[0].childNodes;
      $("#contacto_nome").val(contactosfilhos[0].innerText);
      $("#contacto_nome").siblings('label').addClass('active');
       $("#contacto_cargo").val(contactosfilhos[1].innerText);
       $("#contacto_cargo").siblings('label').addClass('active');
       $("#contacto_email").val(contactosfilhos[2].innerText);
       $("#contacto_email").siblings('label').addClass('active');
       $("#contacto_telefone").val(contactosfilhos[3].innerText);
       $("#contacto_telefone").siblings('label').addClass('active');

       $(this).parent('td').parent('tr').remove();

       for(var i = 0; i < editarContactosArray.length; i++){
          if(editarContactosArray[i].contacto_nome == $(this).parent('td').parent('tr')[0].firstChild.innerText){
            var testenome = editarContactosArray[i].contacto_nome;
              var posicaocontacto = editarContactosArray.findIndex(x => x.contacto_nome === testenome);
              editarContactosArray.splice(posicaocontacto, 1);
              console.log(editarContactosArray);
          }
        }


    });


    $('.adicionarmaiscontacto').click(function(){
    var contactosObject = {};

      var cn = $("#contacto_nome").val();
      contactosObject.contacto_nome = cn;

      var cc = $("#contacto_cargo").val();
      contactosObject.contacto_cargo = cc;

      var ce = $("#contacto_email").val();
      contactosObject.contacto_email = ce;

      var ct = $("#contacto_telefone").val();
      contactosObject.contacto_telefone = ct;

      $('#tabelaAddContact').removeClass('hide');
      var mt = document.getElementById("mostrarTabela");

      // document.getElementById("mostrar").innerHTML = " Nome:" + n;
       // $("<a href=\"#\">"+ n +"</a>").insertAfter("#mostrar");
       mt.innerHTML += '<tr><td>'+ cn +'</td><td>'+ cc +'</td><td>'+ce+'</td><td>'+ct+'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';
       contactosArray.push(contactosObject);
       console.log(contactosArray);

       //limpar os campos
       $("#contacto_nome").val("");
       $("#contacto_nome").siblings('label').removeClass('active');
       $("#contacto_cargo").val("");
       $("#contacto_cargo").siblings('label').removeClass('active');
       $("#contacto_email").val("");
       $("#contacto_email").siblings('label').removeClass('active');
       $("#contacto_telefone").val("");
       $("#contacto_telefone").siblings('label').removeClass('active');


  });


    $(".mostrarTabela").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        //console.log($(this).parent('td').parent('tr')[0].firstChild.innerText)
        $(this).parent('td').parent('tr').remove();

        for(var i = 0; i < contactosArray.length; i++){
          if(contactosArray[i].contacto_nome == $(this).parent('td').parent('tr')[0].firstChild.innerText){
            var testenome = contactosArray[i].contacto_nome;
              var posicaocontacto = contactosArray.findIndex(x => x.contacto_nome === testenome);
              contactosArray.splice(posicaocontacto, 1)
              console.log(contactosArray);
          }
        }

        if(contactosArray.length == 0){
          $('#tabelaAddContact').addClass('hide');

        }
    });


    $(".mostrarTabela").on("click",".editar", function(e){ //user click on remove text
        //console.log($(this).parent('td').parent('tr'));
        var contactosfilhos = $(this).parent('td').parent('tr')[0].childNodes;
      $("#contacto_nome").siblings('label').addClass('active');
      $("#contacto_nome").val(contactosfilhos[0].innerText);
      $("#contacto_cargo").siblings('label').addClass('active');
      $("#contacto_cargo").val(contactosfilhos[1].innerText);
      $("#contacto_email").siblings('label').addClass('active');
      $("#contacto_email").val(contactosfilhos[2].innerText);
      $("#contacto_telefone").siblings('label').addClass('active');
      $("#contacto_telefone").val(contactosfilhos[3].innerText);

       $(this).parent('td').parent('tr').remove();

       for(var i = 0; i < contactosArray.length; i++){
          if(contactosArray[i].contacto_nome == $(this).parent('td').parent('tr')[0].firstChild.innerText){
            var testenome = contactosArray[i].contacto_nome;
              var posicaocontacto = contactosArray.findIndex(x => x.contacto_nome === testenome);
              contactosArray.splice(posicaocontacto, 1);
              //console.log(b);
          }
        }


    });


    $('.adicionarTravel').click(function(){
      $('.mostrartabela1').removeClass('hide');
    var travelinfoObject = {};

  var controle = $("input[name='travelinfo_proposito']:checked").val();

    var site = $("#jobcard_site").val();
    // travelinfoObject.jobcard_site = $("#jobcard_site").val();
    //travelinfoObject.travelinfo_proposito=$("input[name='travelinfo_proposito']:checked").val();
    var from = $("#jobcard_departureplace").val();
      travelinfoObject.jobcard_departureplace = $("#jobcard_departureplace").val();
      travelinfoObject.jobcard_kmreading = $("#jobcard_kmreading").val();
      travelinfoObject.jobcard_departuredate = $("#jobcard_departuredate").val();
      travelinfoObject.jobcard_departuretime = $("#jobcard_departuretime").val();
      travelinfoObject.jobcard_sitearrivaldate = $("#jobcard_sitearrivaldate").val();
      travelinfoObject.jobcard_sitearrivaltime = $("#jobcard_sitearrivaltime").val();
      var accaocorrretiva = $("#jobcard_remedialaction").val();
      travelinfoObject.jobcard_remedialaction = $("#jobcard_remedialaction").val();
      travelinfoObject.jobcard_healthsafety = $("#jobcard_healthsafety").val();
      travelinfoObject.jobcard_sitedeparturedate = $("#jobcard_sitedeparturedate").val();
      travelinfoObject.jobcard_sitedeparturetime = $("#jobcard_sitedeparturetime").val();
      travelinfoObject.jobcard_kmsite = $("#jobcard_kmsite").val();
      travelinfoObject.jobcard_destinationdate = $("#jobcard_destinationdate").val();
      travelinfoObject.jobcard_destinationtime = $("#jobcard_destinationtime").val();
      var to = $("#jobcard_destinationplace").val();
      travelinfoObject.jobcard_destinationplace = $("#jobcard_destinationplace").val();
      travelinfoObject.jobcard_kmdestination = $("#jobcard_kmdestination").val();

      var dataIda;
      var dataVolta;
      var horaIda = $("#jobcard_departuretime").val() + ' - ' + $("#jobcard_destinationtime").val();
      var horaIda1 = $("#jobcard_departuretime").val() + ' - ' + $("#jobcard_sitearrivaltime").val();
      var horaVolta = $("#jobcard_sitedeparturetime").val() + ' - ' + $("#jobcard_destinationtime").val();

      

      var mtt = document.getElementById("mostrarTabelaTravel");

      // document.getElementById("mostrar").innerHTML = " Nome:" + n;
       // $("<a href=\"#\">"+ n +"</a>").insertAfter("#mostrar");
       //mtt.innerHTML += '<tr><td>'+ $("#jobcard_departuredate").val() +'</td><td>'+ +'</td><td>'+ $("#jobcard_remedialaction").val() +'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';
       travelinfoArray.push(travelinfoObject);
       console.log(travelinfoObject);

       if(controle == "viagem"){
      if(($("#jobcard_departuredate").val()) == ($("#jobcard_destinationdate").val())){

        dataIda = $("#jobcard_departuredate").val();

      }else{

        dataIda = $("#jobcard_departuredate").val() + ' - ' + $("#jobcard_destinationdate").val();
      }

          mtt.innerHTML += '<tr><td>' + from + '<i class="material-icons prefix center" style="display: inline-flex; vertical-align: top;">trending_flat</i>' + to + '</td><td>' + dataIda +  '</td><td>' + horaIda + '</td><td>' + ' - ' + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>' ;
       }else{
          if(($("#jobcard_departuredate").val()) == ($("#jobcard_sitearrivaldate").val())){

            dataIda = $("#jobcard_departuredate").val();

          } else{

            dataIda = $("#jobcard_departuredate").val() + ' - ' + $("#jobcard_sitearrivaldate").val();

          }

          if(($("#jobcard_sitedeparturedate").val()) == ($("#jobcard_destinationdate").val())){

            dataVolta = $("#jobcard_sitedeparturedate").val();

          } else{

            dataVolta = $("#jobcard_sitedeparturedate").val() + ' - ' + $("#jobcard_destinationdate").val();

          }

          mtt.innerHTML += '<tr><td>' + from + '<i class="material-icons prefix center" style="display: inline-flex; vertical-align: top;">trending_flat</i>' + site + '</td><td>' + dataIda +  '</td><td>' + horaIda1 + '</td><td>' + accaocorrretiva + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr><tr><td>' + site + '<i class="material-icons prefix center" style="display: inline-flex; vertical-align: top;">trending_flat</i>' + to + '</td><td>' + dataVolta + '</td><td>' + horaVolta + '</td><td>' + accaocorrretiva + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>' ;
       }


       //limpar os campos
      $("#jobcard_departureplace").val("");
      $("#jobcard_kmreading").val("");
      $("#jobcard_departuredate").val("");
      $("#jobcard_departuretime").val("");
      $("#jobcard_sitearrivaldate").val("");
      $("#jobcard_sitearrivaltime").val("");
      $("#jobcard_remedialaction").val("");
      $("#jobcard_healthsafety").val("");
      $("#jobcard_sitedeparturedate").val("");
      $("#jobcard_sitedeparturetime").val("");
      // $("#jobcard_sleeping").val("");
      // $("#jobcard_totalsleep").val("");
      $("#jobcard_kmsite").val("");
      $("#jobcard_destinationdate").val("");
      $("#jobcard_destinationtime").val("");
      $("#jobcard_destinationplace").val("");
      $("#jobcard_kmdestination").val("");


      $('#addtravel').addClass('hide');

  });

    
    $(".mostrarTabelaTravel").on("click",".eliminar", function(e){ //user click on remove text
    $(this).parent('td').parent('tr').parent('tbody').empty();

    //limpar o array
    travelinfoArray = [];
    //$('#adicionarTravel').removeClass('hide');
      $('#updatetravel').removeClass('hide');
    });



    $(".mostrarTabelaTravel").on("click",".editar", function(e){ //user click on edit text
        console.log($(this).parent('td').parent('tr').parent('tbody')[0].rows.length);

        if(($(this).parent('td').parent('tr').parent('tbody')[0].rows.length) == 1 ){
          $("#jobcard_departureplace").val(travelinfoArray[0].jobcard_departureplace);
          $("#jobcard_kmreading").val(travelinfoArray[0].jobcard_kmreading);
          $("#jobcard_departuredate").val(travelinfoArray[0].jobcard_departuredate);
          $("#jobcard_departuretime").val(travelinfoArray[0].jobcard_departuretime);
          $("#jobcard_destinationdate").val(travelinfoArray[0].jobcard_destinationdate);
          $("#jobcard_destinationtime").val(travelinfoArray[0].jobcard_destinationtime);
          $("#jobcard_destinationplace").val(travelinfoArray[0].jobcard_destinationplace);
          $("#jobcard_kmdestination").val(travelinfoArray[0].jobcard_kmdestination);
        }else{
            $("#jobcard_departureplace").val(travelinfoArray[0].jobcard_departureplace);
          $("#jobcard_kmreading").val(travelinfoArray[0].jobcard_kmreading);
          $("#jobcard_departuredate").val(travelinfoArray[0].jobcard_departuredate);
          $("#jobcard_departuretime").val(travelinfoArray[0].jobcard_departuretime);
          $("#jobcard_sitearrivaldate").val(travelinfoArray[0].jobcard_sitearrivaldate);
          $("#jobcard_sitearrivaltime").val(travelinfoArray[0].jobcard_sitearrivaltime);
          $("#jobcard_remedialaction").val(travelinfoArray[0].jobcard_remedialaction);
          $("#jobcard_healthsafety").val(travelinfoArray[0].jobcard_healthsafety);
          $("#jobcard_sitedeparturedate").val(travelinfoArray[0].jobcard_sitedeparturedate);
          $("#jobcard_sitedeparturetime").val(travelinfoArray[0].jobcard_sitedeparturetime);
          // $("#jobcard_sleeping").val("");
          // $("#jobcard_totalsleep").val("");
          $("#jobcard_kmsite").val(travelinfoArray[0].jobcard_kmsite);
          $("#jobcard_destinationdate").val(travelinfoArray[0].jobcard_destinationdate);
          $("#jobcard_destinationtime").val(travelinfoArray[0].jobcard_destinationtime);
          $("#jobcard_destinationplace").val(travelinfoArray[0].jobcard_destinationplace);
          $("#jobcard_kmdestination").val(travelinfoArray[0].jobcard_kmdestination);
        }

        $(this).parent('td').parent('tr').parent('tbody').empty();
        travelinfoArray = [];
        //$('#adicionarTravel').removeClass('hide');
        $('#updatetravel').removeClass('hide');
    });


    $('#adicionarEquipamento').click(function(){
    var equipamentoObject = {};
    $('.mostrartabela2').removeClass('hide');

      var equip = $("#jobcard_equiptype").val();
      equipamentoObject.jobcard_equiptype = $("#jobcard_equiptype").val();
      var manuftr = $("#jobcard_manufacturer").val();
      equipamentoObject.jobcard_manufacturer = $("#jobcard_manufacturer").val();
      var mdl = $("#jobcard_model").val();
      equipamentoObject.jobcard_model = $("#jobcard_model").val();
      var srlnum = $("#jobcard_serialnumber").val();
      equipamentoObject.jobcard_serialnumber = $("#jobcard_serialnumber").val();
      equipamentoObject.jobcard_capcity = $("#jobcard_capcity").val();
      equipamentoObject.jobcard_type = $("#jobcard_type").val();

      

      var mt = document.getElementById("mostrarTabelaEquipamento");

      // document.getElementById("mostrar").innerHTML = " Nome:" + n;
       // $("<a href=\"#\">"+ n +"</a>").insertAfter("#mostrar");
       mt.innerHTML += '<tr><td>' + equip + '</td><td>' + manuftr + '</td><td>' + mdl + '</td><td>' + srlnum + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';
       equipamentoArray.push(equipamentoObject);
       console.log(equipamentoArray);

       //limpar os campos
       $("#jobcard_equiptype").val("");
      $("#jobcard_manufacturer").val("");
       $("#jobcard_model").val("");
       $("#jobcard_serialnumber").val("");
       $("#jobcard_capcity").val("");
       $("#jobcard_type").val("");


  });

    $(".mostrarTabelaEquipamento").on("click",".eliminar", function(e){ //user click on remove text
    //console.log($(this).parent('td').parent('tr'));
        
    $(this).parent('td').parent('tr').remove();

        for(var i = 0; i < equipamentoArray.length; i++){
          if(equipamentoArray[i].jobcard_serialnumber == $(this).parent('td').parent('tr')[0].childNodes[3].innerText){
            var testenome = equipamentoArray[i].jobcard_serialnumber;
              var posicaocontacto = equipamentoArray.findIndex(x => x.jobcard_serialnumber === testenome);
              equipamentoArray.splice(posicaocontacto, 1)
              console.log(equipamentoArray);
          }
        }

        
    });

    $(".mostrarTabelaEquipamento").on("click",".editar", function(e){ //user click on remove text
        //console.log($(this).parent('td').parent('tr'));
        var filhos = $(this).parent('td').parent('tr')[0].childNodes;
        // console.log(filhos);

       $(this).parent('td').parent('tr').remove();

       for(var i = 0; i < equipamentoArray.length; i++){
          if(equipamentoArray[i].jobcard_serialnumber == $(this).parent('td').parent('tr')[0].childNodes[3].innerText){
            var testenome = equipamentoArray[i].jobcard_serialnumber;
            var posicaocontacto = equipamentoArray.findIndex(x => x.jobcard_serialnumber === testenome);

                $("#jobcard_equiptype").val(equipamentoArray[i].jobcard_equiptype);
            $("#jobcard_manufacturer").val(equipamentoArray[i].jobcard_manufacturer);
            $("#jobcard_model").val(equipamentoArray[i].jobcard_model);
            $("#jobcard_serialnumber").val(equipamentoArray[i].jobcard_serialnumber);
            $("#jobcard_capcity").val(equipamentoArray[i].jobcard_capcity);
            $("#jobcard_type").val(equipamentoArray[i].jobcard_type);


              equipamentoArray.splice(posicaocontacto, 1);
              //console.log(b);
              console.log(equipamentoArray);
          }
        }


    });


    $('#adicionarSpares').click(function(){
    var sparesObject = {};
    $('.mostrartabela3').removeClass('hide');

      // var store = $("#jobcard_fromstore").val();
      // sparesObject.jobcard_fromstore = $("#jobcard_fromstore").val();
      // sparesObject.jobcard_maintenanceofficer = $("#jobcard_maintenanceofficer").val();
      var itm = $("#jobcard_item").val();
      sparesObject.jobcard_item = $("#jobcard_item").val();
      var rmg = $("#jobcard_remaining").val();
      sparesObject.jobcard_remaining = $("#jobcard_remaining").val();
      var usd = $("#jobcard_quantity").val();
      sparesObject.jobcard_quantity = $("#jobcard_quantity").val();
      var dtusd = $("#jobcard_datauso").val();
      sparesObject.jobcard_datauso = $("#jobcard_datauso").val();

      

      var mt = document.getElementById("mostrarTabelaSpares");

      // document.getElementById("mostrar").innerHTML = " Nome:" + n;
       // $("<a href=\"#\">"+ n +"</a>").insertAfter("#mostrar");
       mt.innerHTML += '<tr><td>' + itm + '</td><td>' + usd + '</td><td>' + rmg + '</td><td>' + dtusd + '</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';
      sparesArray.push(sparesObject);
       console.log(sparesArray);

       //limpar os campos
       // $("#jobcard_fromstore").val("");
       // $("#jobcard_maintenanceofficer").val("");
       $("#jobcard_item").val("");
       $("#jobcard_remaining").val("");
       $("#jobcard_quantity").val("");
       $("#jobcard_datauso").val("");


  });

    $(".mostrarTabelaSpares").on("click",".eliminar", function(e){ //user click on remove text
    //console.log($(this).parent('td').parent('tr')[0].childNodes);
        
    $(this).parent('td').parent('tr').remove();

        for(var i = 0; i < sparesArray.length; i++){

          if((sparesArray[i].jobcard_item == $(this).parent('td').parent('tr')[0].childNodes[0].innerText) && (sparesArray[i].jobcard_quantity == $(this).parent('td').parent('tr')[0].childNodes[1].innerText) && (sparesArray[i].jobcard_remaining == $(this).parent('td').parent('tr')[0].childNodes[2].innerText) && (sparesArray[i].jobcard_datauso == $(this).parent('td').parent('tr')[0].childNodes[3].innerText) ){
            sparesArray.splice(i, 1)
            console.log(sparesArray);
          }
        }

        
    });

    $(".mostrarTabelaSpares").on("click",".editar", function(e){ //user click on remove text
    //console.log($(this).parent('td').parent('tr')[0].childNodes);
        
    $(this).parent('td').parent('tr').remove();

        for(var i = 0; i < sparesArray.length; i++){

          if((sparesArray[i].jobcard_item == $(this).parent('td').parent('tr')[0].childNodes[0].innerText) && (sparesArray[i].jobcard_quantity == $(this).parent('td').parent('tr')[0].childNodes[1].innerText) && (sparesArray[i].jobcard_remaining == $(this).parent('td').parent('tr')[0].childNodes[2].innerText) && (sparesArray[i].jobcard_datauso == $(this).parent('td').parent('tr')[0].childNodes[3].innerText) ){
            
          //  $("#jobcard_fromstore").val(sparesArray[i].jobcard_fromstore);
           // $("#jobcard_maintenanceofficer").val(sparesArray[i].jobcard_maintenanceofficer);
           $("#jobcard_item").val(sparesArray[i].jobcard_item);
           $("#jobcard_remaining").val(sparesArray[i].jobcard_remaining);
           $("#jobcard_quantity").val(sparesArray[i].jobcard_quantity);
           $("#jobcard_datauso").val(sparesArray[i].jobcard_datauso);

            sparesArray.splice(i, 1)
            console.log(sparesArray);
          }
        }

        
    });

    $('#jobcard_tecniconome').change(function(){

      var nm = document.getElementById("jobcard_tecniconome").value;
      var dadostecnicos= JSON.parse($("#contain").attr("detalhestecnico"));

      var posicaonometecnico = dadostecnicos.findIndex(x => x.nome === nm);
      $("#jobcard_cell").val(dadostecnicos[posicaonometecnico].telefone_1);
      $("#jobcard_linemanager").val(dadostecnicos[posicaonometecnico].nome_supervisor);



    });

    $('#jobcard_clientenome').change(function(){

      var nm = document.getElementById("jobcard_clientenome").value;
      var dadosclientessite= JSON.parse($("#recolherdados").attr("detalhesclientessite"));
      //var dadossiteinfo= JSON.parse($("#contain1").attr("detalhessiteinfo"));

      
      var posicaoclientesite = dadosclientessite.findIndex(x => x._id === nm);

     
      var jobcard_site = document.getElementById("jobcard_site");
      while (jobcard_site.options.length > 0) { 
        jobcard_site.remove(0); 
      }

        var opt = document.createElement('option');
        opt.value = "Escolha a opção";
        opt.innerHTML = "Escolha a opção";
        opt.id = "segundo";
        jobcard_site.appendChild(opt);

        document.getElementById("segundo").selected = "true";
        document.getElementById("segundo").disabled = "true";

      if(posicaoclientesite != -1){
        
        for(var j = 0; j < dadosclientessite[posicaoclientesite].sites.length; j++){

          var opt = document.createElement('option');
          opt.value = dadosclientessite[posicaoclientesite].sites[j];
          opt.innerHTML = dadosclientessite[posicaoclientesite].sites[j];
          jobcard_site.appendChild(opt);
          //console.log(dadosclientessite[i].sites[j]);
        }
      }
    });

    $('#siteinfo_maintoff').change(function(){

      var nm = document.getElementById("siteinfo_maintoff").value;
      var dadostecnicos= JSON.parse($("#contain2").attr("detalhestecnico"));

      var posicaonometecnico = dadostecnicos.findIndex(x => x.nome === nm);
      
      $("#siteinfo_techcontactnum").val(dadostecnicos[posicaonometecnico].telefone_1);
      $("#siteinfo_techcontactnum").siblings('label').addClass('active');


    });

    $('#jobcard_site').change(function(){

      var site = parseInt(document.getElementById("jobcard_site").value);
      var dadossiteinfo= JSON.parse($("#recolherdados").attr("detalhessiteinfo"));

      var posicaositenumber = dadossiteinfo.findIndex(x => x.siteinfo_sitenum === site);
      
      $("#jobcard_tecniconome").val(dadossiteinfo[posicaositenumber].siteinfo_maintoff);
      $("#jobcard_tecniconome").siblings('label').addClass('active');


    });

    $('.adicionarGenerator').click(function(){

      var generatorObject = {};

        // var siteinfo_generator=$("input[name='siteinfo_generator']:checked").val();
        // generatorObject.siteinfo_generator = siteinfo_generator;

        var siteinfo_generatortype=$("#siteinfo_generatortype").val();
        generatorObject.siteinfo_generatortype = siteinfo_generatortype;

        var siteinfo_generatoroutputkw=$("#siteinfo_generatoroutputkw").val();
        generatorObject.siteinfo_generatoroutputkw = siteinfo_generatoroutputkw;

        var siteinfo_generatormodelno=$("#siteinfo_generatormodelno").val();
        generatorObject.siteinfo_generatormodelno = siteinfo_generatormodelno;

        var siteinfo_generatorengineserialnumber=$("#siteinfo_generatorengineserialnumber").val();
        generatorObject.siteinfo_generatorengineserialnumber = siteinfo_generatorengineserialnumber;

        var siteinfo_generatorenginecapacity=$("#siteinfo_generatorenginecapacity").val();
        generatorObject.siteinfo_generatorenginecapacity = siteinfo_generatorenginecapacity;

        var siteinfo_generatorstartertype=$("#siteinfo_generatorstartertype").val();
        generatorObject.siteinfo_generatorstartertype = siteinfo_generatorstartertype;

        var siteinfo_generatorfuelconsumption=$("#siteinfo_generatorfuelconsumption").val();
        generatorObject.siteinfo_generatorfuelconsumption = siteinfo_generatorfuelconsumption;

        $('.mostrartabelaGeradores').removeClass('hide');
        var mt = document.getElementById("mostrarTabelaGenerator");
        console.log(generatorArray);
        generatorArray.push(generatorObject);

        mt.innerHTML += '<tr><td>'+ siteinfo_generatortype +'</td><td>'+ siteinfo_generatormodelno +'</td><td>'+siteinfo_generatorenginecapacity+'</td><td>'+siteinfo_generatorfuelconsumption+'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';

        //limpar os campos
       $("#siteinfo_generatortype").val("");
       $("#siteinfo_generatoroutputkw").val("");
       $("#siteinfo_generatormodelno").val("");
       $("#siteinfo_generatorengineserialnumber").val("");
       $("#siteinfo_generatorenginecapacity").val("");
       $("#siteinfo_generatorstartertype").val("");
       $("#siteinfo_generatorfuelconsumption").val("");

       $('#addgenerator').removeClass('hide');
      $('#updategenerator').addClass('hide');

    });


    $(".mostrarTabelaGenerator").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaogerador = $(this).parent('td').parent('tr')[0].rowIndex - 1;
        generatorArray.splice(posicaogerador, 1);
        $(this).parent('td').parent('tr').remove();
        //console.log(generatorArray);
        if(generatorArray.length == 0){
          $('.mostrartabelaGeradores').addClass('hide');
        }
    });

    $(".mostrarTabelaGenerator").on("click",".editar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaogerador = $(this).parent('td').parent('tr')[0].rowIndex - 1;

        $("#siteinfo_generatortype").val(generatorArray[posicaogerador].siteinfo_generatortype);
        $("#siteinfo_generatoroutputkw").val(generatorArray[posicaogerador].siteinfo_generatoroutputkw);
        $("#siteinfo_generatormodelno").val(generatorArray[posicaogerador].siteinfo_generatormodelno);
        $("#siteinfo_generatorengineserialnumber").val(generatorArray[posicaogerador].siteinfo_generatorengineserialnumber);
        $("#siteinfo_generatorenginecapacity").val(generatorArray[posicaogerador].siteinfo_generatorenginecapacity);
        $("#siteinfo_generatorstartertype").val(generatorArray[posicaogerador].siteinfo_generatorstartertype);
        $("#siteinfo_generatorfuelconsumption").val(generatorArray[posicaogerador].siteinfo_generatorfuelconsumption);
        generatorArray.splice(posicaogerador, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(generatorArray);

        $('#addgenerator').addClass('hide');
        $('#updategenerator').removeClass('hide');
    });

    $('.adicionarAc').click(function(){

        var acObject = {};

        // var siteinfo_ac=$("input[name='siteinfo_ac']:checked").val();
        // acObject.siteinfo_ac = siteinfo_ac;

        var siteinfo_acmanufacturer=$("#siteinfo_acmanufacturer").val();
        acObject.siteinfo_acmanufacturer = siteinfo_acmanufacturer;

        var siteinfo_actype=$("#siteinfo_actype").val();
        acObject.siteinfo_actype = siteinfo_actype;

        var siteinfo_acmodel=$("#siteinfo_acmodel").val();
        acObject.siteinfo_acmodel = siteinfo_acmodel;

        var siteinfo_acnumber=$("#siteinfo_acnumber").val();
        acObject.siteinfo_acnumber = siteinfo_acnumber;

        var siteinfo_acserialnumber=$("#siteinfo_acserialnumber").val();
        acObject.siteinfo_acserialnumber = siteinfo_acserialnumber;

        var siteinfo_acbtu=$("#siteinfo_acbtu").val();
        acObject.siteinfo_acbtu = siteinfo_acbtu;

        var siteinfo_accageinstalled=$("#siteinfo_accageinstalled").val();
        acObject.siteinfo_accageinstalled = siteinfo_accageinstalled;

        var siteinfo_acsleeveinstalled=$("#siteinfo_acsleeveinstalled").val();
        acObject.siteinfo_acsleeveinstalled = siteinfo_acsleeveinstalled;

        var siteinfo_acunitcontrolltype=$("#siteinfo_acunitcontrolltype").val();
        acObject.siteinfo_acunitcontrolltype = siteinfo_acunitcontrolltype;

        var siteinfo_accontrollermodel=$("#siteinfo_accontrollermodel").val();
        acObject.siteinfo_accontrollermodel = siteinfo_accontrollermodel;

        $('.mostrartabelaAC').removeClass('hide');
        var mt = document.getElementById("mostrarTabelaAc");
        acArray.push(acObject);
        console.log(acArray);

        mt.innerHTML += '<tr><td>'+ siteinfo_acnumber +'</td><td>'+ siteinfo_actype +'</td><td>'+siteinfo_acmanufacturer+'</td><td>'+siteinfo_acmodel+'</td><td>'+ siteinfo_acbtu +'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';

        //limpar os campos
       $("#siteinfo_acmanufacturer").val("");
       $("#siteinfo_actype").val("");
       $("#siteinfo_acmodel").val("");
       $("#siteinfo_acnumber").val("");
       $("#siteinfo_acserialnumber").val("");
       $("#siteinfo_acbtu").val("");
       $("#siteinfo_accageinstalled").val("");
       $("#siteinfo_acsleeveinstalled").val("");
       $("#siteinfo_acunitcontrolltype").val("");
       $("#siteinfo_accontrollermodel").val("");


       $('#addac').removeClass('hide');
       $('#updateac').addClass('hide');

    });

    $(".mostrarTabelaAc").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaoac = $(this).parent('td').parent('tr')[0].rowIndex - 1;
        acArray.splice(posicaoac, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(acArray);
    });

     $(".mostrarTabelaAc").on("click",".editar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaoac = $(this).parent('td').parent('tr')[0].rowIndex - 1;

        
        $("#siteinfo_acmanufacturer").val(acArray[posicaoac].siteinfo_acmanufacturer);
        $("#siteinfo_actype").val(acArray[posicaoac].siteinfo_actype);
        $("#siteinfo_acmodel").val(acArray[posicaoac].siteinfo_acmodel);
        $("#siteinfo_acnumber").val(acArray[posicaoac].siteinfo_acnumber);
        $("#siteinfo_acserialnumber").val(acArray[posicaoac].siteinfo_acserialnumber);
        $("#siteinfo_acbtu").val(acArray[posicaoac].siteinfo_acbtu);
        $("#siteinfo_accageinstalled").val(acArray[posicaoac].siteinfo_accageinstalled);
        $("#siteinfo_acsleeveinstalled").val(acArray[posicaoac].siteinfo_acsleeveinstalled);
        $("#siteinfo_acunitcontrolltype").val(acArray[posicaoac].siteinfo_acunitcontrolltype);
        $("#siteinfo_accontrollermodel").val(acArray[posicaoac].siteinfo_accontrollermodel);
        
        acArray.splice(posicaoac, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(acArray);

        $('#addac').addClass('hide');
        $('#updateac').removeClass('hide');
    });

     $('.adicionarRectCab').click(function(){

      var rectcabObject = {};


        // var siteinfo_rectifiercabinnet=$("input[name='siteinfo_rectifiercabinnet']:checked").val();
        // rectcabObject.siteinfo_rectifiercabinnet = siteinfo_rectifiercabinnet;

        var siteinfo_rectcabcabinetmodelno=$("#siteinfo_rectcabcabinetmodelno").val();
        rectcabObject.siteinfo_rectcabcabinetmodelno = siteinfo_rectcabcabinetmodelno;

        var siteinfo_rectcabcabinetnumber=$("#siteinfo_rectcabcabinetnumber").val();
        rectcabObject.siteinfo_rectcabcabinetnumber = siteinfo_rectcabcabinetnumber;

        var siteinfo_rectcabtype=$("#siteinfo_rectcabtype").val();
        rectcabObject.siteinfo_rectcabtype = siteinfo_rectcabtype;

        var siteinfo_rectcabinputtype=$("#siteinfo_rectcabinputtype").val();
        rectcabObject.siteinfo_rectcabinputtype = siteinfo_rectcabinputtype;

        var siteinfo_rectcabnobatteries=$("#siteinfo_rectcabnobatteries").val();
        rectcabObject.siteinfo_rectcabnobatteries = siteinfo_rectcabnobatteries;

        var siteinfo_rectcabbatterycapac=$("#siteinfo_rectcabbatterycapac").val();
        rectcabObject.siteinfo_rectcabbatterycapac = siteinfo_rectcabbatterycapac;


        $('.mostrartabelaRectCab').removeClass('hide');
        var mt = document.getElementById("mostrartabelaRectGab");
        rectcabArray.push(rectcabObject);
        console.log(rectcabArray);

        mt.innerHTML += '<tr><td>'+ siteinfo_rectcabcabinetnumber +'</td><td>'+ siteinfo_rectcabtype +'</td><td>'+siteinfo_rectcabinputtype+'</td><td>'+siteinfo_rectcabnobatteries+'</td><td>'+siteinfo_rectcabbatterycapac+'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';

        //limpar os campos
       $("#siteinfo_rectcabcabinetmodelno").val("");
       $("#siteinfo_rectcabcabinetnumber").val("");
       $("#siteinfo_rectcabtype").val("");
       $("#siteinfo_rectcabinputtype").val("");
       $("#siteinfo_rectcabnobatteries").val("");
       $("#siteinfo_rectcabbatterycapac").val("");
       

       $('#addrectcab').removeClass('hide');
      $('#updaterectcab').addClass('hide');

    });

     $(".mostrartabelaRectGab").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaorectcab = $(this).parent('td').parent('tr')[0].rowIndex - 1;
        rectcabArray.splice(posicaorectcab, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(rectcabArray);
    });


     $(".mostrartabelaRectGab").on("click",".editar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaorectcab = $(this).parent('td').parent('tr')[0].rowIndex - 1;

        $("#siteinfo_rectcabcabinetmodelno").val(rectcabArray[posicaorectcab].siteinfo_rectcabcabinetmodelno);
        $("#siteinfo_rectcabcabinetnumber").val(rectcabArray[posicaorectcab].siteinfo_rectcabcabinetnumber);
        $("#siteinfo_rectcabtype").val(rectcabArray[posicaorectcab].siteinfo_rectcabtype);
        $("#siteinfo_rectcabinputtype").val(rectcabArray[posicaorectcab].siteinfo_rectcabinputtype);
        $("#siteinfo_rectcabnobatteries").val(rectcabArray[posicaorectcab].siteinfo_rectcabnobatteries);
        $("#siteinfo_rectcabbatterycapac").val(rectcabArray[posicaorectcab].siteinfo_rectcabbatterycapac);
        
        rectcabArray.splice(posicaorectcab, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(rectcabArray);

        $('#addrectcab').addClass('hide');
        $('#updaterectcab').removeClass('hide');
    });

     $('.adicionarSecurity').click(function(){

        var securityObject = {};

        var siteinfo_secguardname=$("#siteinfo_secguardname").val();
        securityObject.siteinfo_secguardname = siteinfo_secguardname;

        var siteinfo_secbinumber=$("#siteinfo_secbinumber").val();
        securityObject.siteinfo_secbinumber = siteinfo_secbinumber;

        var siteinfo_secnib=$("#siteinfo_secnib").val();
        securityObject.siteinfo_secnib = siteinfo_secnib;

        var siteinfo_secvalue=$("#siteinfo_secvalue").val();
        securityObject.siteinfo_secvalue = siteinfo_secvalue;
        


        $('.mostrartabelaSeguranca').removeClass('hide');
        var mt = document.getElementById("mostrartabelaSecurity");
        securityArray.push(securityObject);
        console.log(securityArray);

        mt.innerHTML += '<tr><td>'+ siteinfo_secguardname +'</td><td>'+ siteinfo_secbinumber +'</td><td>'+siteinfo_secnib+'</td><td>'+siteinfo_secvalue+'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';

        //limpar os campos
       $("#siteinfo_secguardname").val("");
       $("#siteinfo_secbinumber").val("");
       $("#siteinfo_secnib").val("");
       $("#siteinfo_secvalue").val("");
       
       

       $('#addsecurity').removeClass('hide');
        $('#updatesecurity').addClass('hide');

    });

     $(".mostrartabelaSecurity").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaosecurity = $(this).parent('td').parent('tr')[0].rowIndex - 1;
        securityArray.splice(posicaosecurity, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(securityArray);
    });

     $(".mostrartabelaSecurity").on("click",".editar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaosecurity = $(this).parent('td').parent('tr')[0].rowIndex - 1;

        $("#siteinfo_secguardname").val(securityArray[posicaosecurity].siteinfo_secguardname);
        $("#siteinfo_secbinumber").val(securityArray[posicaosecurity].siteinfo_secbinumber);
        $("#siteinfo_secnib").val(securityArray[posicaosecurity].siteinfo_secnib);
        $("#siteinfo_secvalue").val(securityArray[posicaosecurity].siteinfo_secvalue);
        
        
        securityArray.splice(posicaosecurity, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(securityArray);

        $('#addsecurity').addClass('hide');
        $('#updatesecurity').removeClass('hide');
    });

     $('.adicionarGeradorJobcard').click(function(){
      var generatorJobcardObject = {};

      var jobcard_generator=$("#jobcard_generator").val();
      generatorJobcardObject.jobcard_generator = jobcard_generator;

      var jobcard_previousgeneratorhours=$("#jobcard_previousgeneratorhours").val();
      generatorJobcardObject.jobcard_previousgeneratorhours = jobcard_previousgeneratorhours;

      var jobcard_currentgeneratorhours=$("#jobcard_currentgeneratorhours").val();
      generatorJobcardObject.jobcard_currentgeneratorhours = jobcard_currentgeneratorhours;

      var jobcard_previousrefuelhrs=$("#jobcard_previousrefuelhrs").val();
      generatorJobcardObject.jobcard_previousrefuelhrs = jobcard_previousrefuelhrs;

      var jobcard_generatorrefuel=$("#jobcard_generatorrefuel").val();
      generatorJobcardObject.jobcard_generatorrefuel = jobcard_generatorrefuel;

      var jobcard_litersoil=$("#jobcard_litersoil").val();
      generatorJobcardObject.jobcard_litersoil = jobcard_litersoil;

      var jobcard_dsc=$("#jobcard_dsc").val();
      generatorJobcardObject.jobcard_dsc = jobcard_dsc;

      var jobcard_refuelreason=$("#jobcard_refuelreason").val();
      generatorJobcardObject.jobcard_refuelreason = jobcard_refuelreason;

      var jobcard_lastrefueldate=$("#jobcard_lastrefueldate").val();
      generatorJobcardObject.jobcard_lastrefueldate = jobcard_lastrefueldate;

      var jobcard_generatorbeenserviced=$("#jobcard_generatorbeenserviced").val();
      generatorJobcardObject.jobcard_generatorbeenserviced = jobcard_generatorbeenserviced;

      var jobcard_hourslastservice=$("#jobcard_hourslastservice").val();
      generatorJobcardObject.jobcard_hourslastservice = jobcard_hourslastservice;

      $('.mostrartabela5').removeClass('hide');
      var mt = document.getElementById("mostrarTabelaGeradorJobcard");
      generatorJobcardArray.push(generatorJobcardObject);

      mt.innerHTML += '<tr><td>'+ jobcard_generator +'</td><td>'+ jobcard_previousgeneratorhours +'</td><td>'+jobcard_currentgeneratorhours+'</td><td>'+jobcard_refuelreason+'</td><td>'+jobcard_litersoil+'</td><td><a class="tooltipped pointer info eliminar"><i class="material-icons left activarVerde">clear</i></a><a class="tooltipped pointer info editar"><i class="material-icons left activarVerde">edit</i></a></td></tr>';

      var selcopt = document.getElementById("jobcard_generator");
      selcopt.remove(selcopt.selectedIndex);
      // console.log(selcopt.options);


      //var opcaooo = "Escolha uma opcao";
      $("#jobcard_generator").val("");
      $("#jobcard_previousgeneratorhours").val("");
      $("#jobcard_currentgeneratorhours").val("");
      $("#jobcard_previousrefuelhrs").val("");
      $("#jobcard_generatorrefuel").val("");
      $("#jobcard_litersoil").val("");
      $("#jobcard_dsc").val("");
      $("#jobcard_refuelreason").val("");
      $("#jobcard_lastrefueldate").val("");
      $("#jobcard_generatorbeenserviced").val("");
      $("#jobcard_hourslastservice").val("");

      

      if(selcopt.options.length == 1){

        $('#addgeradorjob').addClass('hide');
        $('#updategeradorjob').addClass('hide');

      }else{
        $('#addgeradorjob').removeClass('hide');
        $('#updategeradorjob').addClass('hide');
      }


        
      document.getElementById("primeiro").selected = "true";
      document.getElementById("primeiro").disabled = "true";

        

    });

     $(".mostrarTabelaGeradorJobcard").on("click",".eliminar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaogeneratorjobcard = $(this).parent('td').parent('tr')[0].rowIndex - 1;
        var geradorslct = generatorJobcardArray[posicaogeneratorjobcard].jobcard_generator;
        //console.log(geradorslct);
        var opt = document.createElement('option');
        opt.value = geradorslct;
        opt.innerHTML = geradorslct;
        jobcard_generator.appendChild(opt);

        generatorJobcardArray.splice(posicaogeneratorjobcard, 1);
        $(this).parent('td').parent('tr').remove();
        
    });

     $(".mostrarTabelaGeradorJobcard").on("click",".editar", function(e){ //user click on remove text
        // console.log($(this).parent('td'));
        // console.log($(this).parent('td').parent('tr'));
        var posicaogeneratorjobcard = $(this).parent('td').parent('tr')[0].rowIndex - 1;

        $("#jobcard_generator").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_generator);
        $("#jobcard_previousgeneratorhours").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_previousgeneratorhours);
        $("#jobcard_currentgeneratorhours").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_currentgeneratorhours);
        $("#jobcard_previousrefuelhrs").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_previousrefuelhrs);
        $("#jobcard_generatorrefuel").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_generatorrefuel);
        $("#jobcard_litersoil").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_litersoil);
        $("#jobcard_dsc").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_dsc);
        $("#jobcard_refuelreason").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_refuelreason);
        $("#jobcard_lastrefueldate").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_lastrefueldate);
        $("#jobcard_generatorbeenserviced").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_generatorbeenserviced);
        $("#jobcard_hourslastservice").val(generatorJobcardArray[posicaogeneratorjobcard].jobcard_hourslastservice);
        

        var opt = document.createElement('option');
        opt.value = generatorJobcardArray[posicaogeneratorjobcard].jobcard_generator;
        opt.innerHTML = generatorJobcardArray[posicaogeneratorjobcard].jobcard_generator;
        jobcard_generator.appendChild(opt);
        
        generatorJobcardArray.splice(posicaogeneratorjobcard, 1);
        $(this).parent('td').parent('tr').remove();
        console.log(generatorJobcardArray);

        $('#addgeradorjob').addClass('hide');
        $('#updategeradorjob').removeClass('hide');
    });

     $('.aprovarttnumber').click(function(){

      var novo=$(this).attr("data-user-new")
      var dadojobtype =$(this).attr("datajobtype")
      var dadosjobcards = JSON.parse($("#recolherdados").attr("detalhesjobcards"));
      //console.log(dadosjobcards);
      var nomeT = $("#recolherdados").attr("detalhessession");
      var contR = false;

        for(var i = 0; i < dadosjobcards.length; i++){

          if(dadosjobcards[i].travelinfoArrayJobcard.length != 0){
            if((dadosjobcards[i].travelinfoArrayJobcard[0].jobcard_remedialaction == "") && (dadosjobcards[i].jobcard_tecniconome == nomeT)){
              contR = true;
              break;
            }
          }else
              if((dadosjobcards[i].jobcard_controlador.length == 2) && (dadosjobcards[i].jobcard_tecniconome == nomeT)){

                 contR = true;
                break;

            }
          
        }

        if(contR == true){
          $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message'));
          $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Não é possível aceitar este Jobcard. Termine os Jobcards pendentes !':'It is not possible to approve this Jobcard. Complete the pending Jobcards <b>')+(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ':"</b>"));
          $('#msg_modal').openModal({dismissible:false});
          $('#ok_btn_modal').click(function(e){ e.stopPropagation(); window.location.href="#"; });

        }else{

          $('#yes_no_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#yes_no_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Deseja realmente aceitar este cartão de trabalho':'Do you really want to accept the jobcard <b>')+(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ?':"</b>?"))
          $('#yes_no_modal').openModal({dismissible:false});
          // $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
          $('#yes_btn_modal').click(function(e){


            e.stopPropagation();
            e.stopImmediatePropagation();

            var jobcardformdata = new FormData();

            var rule="/manutencao/aprovarttnumber";

            var jobcard_id = novo;
            jobcardformdata.append("jobcard_id", jobcard_id);

            var ttnumber_status="In Progress";
            jobcardformdata.append("ttnumber_status", ttnumber_status);

            var jobcard_controlador = [1, 1];
            jobcardformdata.append("jobcard_controlador", JSON.stringify(jobcard_controlador));

            var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
            var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
            var ano = (new Date()).getFullYear();
            var todaydate = dia + "/" + mes + "/" + ano;

            var jobcard_audittrail = {};

            jobcard_audittrail.jobcard_audittrailname = nomeT;
            jobcard_audittrail.jobcard_audittrailaction = "Accept the jobcard";
            jobcard_audittrail.jobcard_audittraildate = dia + "/" + mes + "/" + ano;

            jobcardformdata.append("jobcard_audittrail", JSON.stringify(jobcard_audittrail));

            var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              if(dadojobtype == "Callout"){
                setTimeout(function(){
                 window.location.href="/manutencao/ttnumberhome/inprogress";
                }, 1000);
              }else{
                setTimeout(function(){
                 window.location.href="/manutencao/preventativemaint/inprogress";
                }, 1000);
              }

              
          });
        
        }

    });

     //ManutencaoHome

    $("#verTabsSiteInfo").click(function(){
      window.location.href="/manutencao/siteinfohome";
    });

    $("#verTabsTTNumber").click(function(){
      window.location.href="/manutencao/ttnumberhome";
    });

    $("#verTabsCorrectiveMaintenance").click(function(){
      window.location.href="/manutencao/correctivemaintenance";
    });

    $("#verTabsPreventiveMaintenance").click(function(){
      window.location.href="/manutencao/preventativehome"
    });

    //TTNumberHome
    $("#verTTNumberNew").click(function(){
      window.location.href="/manutencao/ttnumberhome/new";
    });

    $("#verTTNumberOnprogress").click(function(){
      window.location.href="/manutencao/ttnumberhome/inprogress";
    });

    $("#verTTNumberComplete").click(function(){
      window.location.href="/manutencao/ttnumberhome/complete";
    });

    $("#verTTInvoiced").click(function(){
      window.location.href="/manutencao/ttnumberhome/tobeinvoiced";
    });

    //Preventative Home
    $("#verMaintPlan").click(function(){
      window.location.href="/manutencao/preventativemaint/new";
    });

    $("#verMaintPlanOnprogress").click(function(){
      window.location.href="/manutencao/preventativemaint/inprogress";
    });

    $("#verMaintPlanComplete").click(function(){
      window.location.href="/manutencao/preventativemaint/complete";
    });

    $("#verMaintPlanInvoiced").click(function(){
      window.location.href="/manutencao/preventativemaint/tobeinvoiced";
    });

    $(".aprovarjobcard").click(function(){

      var novo=$(this).attr("data-user-new");
      var dadojobtype =$(this).attr("datajobtype");
      var nomeSession =$(this).attr("detalhessession");
      
      $('#yes_no_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Aprovar o Jobcard':'Approve Jobcard'))
            $('#yes_no_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Deseja faturar este jobcard':'Do you want to invoice this jobcard <b>') +(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ?':"</b>?"))
            $('#yes_no_modal').openModal({dismissible:false});
            $('#no_btn_modal_').click(function(e){ 

              e.stopPropagation();
              e.stopImmediatePropagation();

              var jobcardformdata = new FormData();

              var rule="/manutencao/aprovarjobcard/nottobeinvoiced";

              var jobcard_id = novo;
              jobcardformdata.append("jobcard_id", jobcard_id);
              
              var ttnumber_status = "Complete";
              jobcardformdata.append("ttnumber_status", ttnumber_status);

              var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
              var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
              var ano = (new Date()).getFullYear();
              var todaydate = dia + "/" + mes + "/" + ano;

              var jobcard_audittrail = {};
              jobcard_audittrail.jobcard_audittrailname = nomeSession;
              jobcard_audittrail.jobcard_audittrailaction = "Job Card Approved";
              jobcard_audittrail.jobcard_audittraildate = todaydate;

              jobcardformdata.append("jobcard_audittrail", JSON.stringify(jobcard_audittrail));

              var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              if(dadojobtype == "Callout"){
                setTimeout(function(){
                  window.location.href="/manutencao/ttnumberhome/complete";
              }, 1000);

              }else{
                  setTimeout(function(){
                    window.location.href="/manutencao/preventativemaint/complete";
                }, 1000);
              }

               



            });
            $('#yes_btn_modal').click(function(e){

              e.stopPropagation();
              e.stopImmediatePropagation();

              var jobcardformdata = new FormData();

              var rule="/manutencao/aprovarjobcard/tobeinvoiced";

              var jobcard_id = novo;
              jobcardformdata.append("jobcard_id", jobcard_id);
              
              var ttnumber_status = "To be Invoiced";
              jobcardformdata.append("ttnumber_status", ttnumber_status);

              var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
              var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
              var ano = (new Date()).getFullYear();
              var todaydate = dia + "/" + mes + "/" + ano;

              var jobcard_audittrail = {};
              jobcard_audittrail.jobcard_audittrailname = nomeSession;
              jobcard_audittrail.jobcard_audittrailaction = "To Be Invoiced";
              jobcard_audittrail.jobcard_audittraildate = todaydate;

              jobcardformdata.append("jobcard_audittrail", JSON.stringify(jobcard_audittrail));


              var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              if(dadojobtype == "Callout"){
                setTimeout(function(){
                  window.location.href="/manutencao/ttnumberhome/tobeinvoiced";
              }, 1000);

              }else{
                  setTimeout(function(){
                  window.location.href="/manutencao/preventativemaint/tobeinvoiced";
              }, 1000);
              }

               




            });

    });

    $('.reprovarjobcard').click(function(){

      var novo=$(this).attr("data-user-new");
      var dadojobtype =$(this).attr("datajobtype");
      var nomeSession =$(this).attr("detalhessession");

      $('#yes_no_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
      $('#yes_no_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Deseja devolver este jobcard para ser retificado':'Do you want to return this jobcard to be rectified <b>') +(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ?':"</b>?"))
      $('#yes_no_modal').openModal({dismissible:false});
      $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){

        e.stopPropagation();
        e.stopImmediatePropagation();

        $('#reprovarrazao_modal').openModal({dismissible:false});
        $('#reprovarrazao_cancel_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
        $('#reprovarrazao_yes_btn_modal').click(function(e){


           var jobcardformdata = new FormData();

            var rule="/manutencao/sendbackjobcard";

            var jobcard_id = novo;
            jobcardformdata.append("jobcard_id", jobcard_id);

            var jobcard_razaoreprovar = $("#jobcard_razaoreprovar").val();
            jobcardformdata.append("jobcard_razaoreprovar", jobcard_razaoreprovar);

              var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
              var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
              var ano = (new Date()).getFullYear();
              var todaydate = dia + "/" + mes + "/" + ano;

              var jobcard_audittrail = {};
              jobcard_audittrail.jobcard_audittrailname = nomeSession;
              jobcard_audittrail.jobcard_audittrailaction = "Send Back";
              jobcard_audittrail.jobcard_audittraildate = todaydate;

              jobcardformdata.append("jobcard_audittrail", JSON.stringify(jobcard_audittrail));
            

            var xhr = new XMLHttpRequest();
            // Add any event handlers here...
            xhr.open('POST',rule, true);
            xhr.send(jobcardformdata);

            if(dadojobtype == "Callout"){

                setTimeout(function(){
                  window.location.href="/manutencao/ttnumberhome/inprogress";
              }, 1000);

            }else{

              setTimeout(function(){
                  window.location.href="/manutencao/preventativemaint/inprogress";
              }, 1000);

            }

             
        });
       

      });


      
    });

    $('.mostrarrazoessendback').click(function(){

      var razoessendback = $(this).attr("detalhesrazoes");

      $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Razões':'Reasons'));
      $('#msg_content_modal').html(razoessendback);
      $('#msg_modal').openModal({dismissible:false});

    });

    $('.retificarjobcard').click(function(){

      var referencia = $(this).attr("data-user-new");
      var dadosjobcard = JSON.parse($("#recolherdados").attr("detalhesjobcards"));


      

      for(var i = 0; i < dadosjobcard.length; i++){

        if(dadosjobcard[i]._id == referencia){
          $("#jobcard_razaoreprovar").val(dadosjobcard[0].jobcard_razaoreprovar);
          $("#jobcard_razaoreprovar").siblings('label').addClass('active');

          break;
        }

      }
      
      $('#reprovarrazao_modal').openModal({dismissible:false});
      $('#reprovarrazao_cancel_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
      
      $('#reprovarrazao_yes_btn_modal').addClass('hide');
      
    });



    $(".sendapproval").click(function(){
        var novo=$("#approvalinfo").attr("data-user-new");
        var dadousuario = $("#approvalinfo").attr("detalhessession");
        var dadojobtype =$("#approvalinfo").attr("datajobtype");

      $('#yes_no_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
      $('#yes_no_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Deseja mandar para a aprovação ':'Do you want to send for approval <b>') +(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ?':"</b>?"))
      $('#yes_no_modal').openModal({dismissible:false});
      $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        var jobcardformdata = new FormData();

        var rule="/manutencao/sendforapproval";

        var jobcard_id = novo;
        jobcardformdata.append("jobcard_id", jobcard_id);
        
        var nomebackoffice = dadousuario;
        jobcardformdata.append("nomebackoffice", nomebackoffice);

        var jobcard_controlador = [1,1,1];
        jobcardformdata.append("jobcard_controlador", JSON.stringify(jobcard_controlador));

        var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
        var ano = (new Date()).getFullYear();
        var todaydate = dia + "/" + mes + "/" + ano;

        var jobcard_audittrail = {};
        jobcard_audittrail.jobcard_audittrailname = dadousuario;
        jobcard_audittrail.jobcard_audittrailaction = "Send for approval";
        jobcard_audittrail.jobcard_audittraildate = todaydate;

        jobcardformdata.append("jobcard_audittrail", JSON.stringify(jobcard_audittrail));

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST',rule, true);
        xhr.send(jobcardformdata);

        if(dadojobtype == "Callout"){
            setTimeout(function(){
              window.location.href="/manutencao/ttnumberhome/inprogress";
            }, 1000);

        }else{

          setTimeout(function(){
              window.location.href="/manutencao/preventativemaint/inprogress";
            }, 1000);

        }

         

      });

    });


    // $('#pettycashreportano').change(function(){

    //   var ano = document.getElementById("pettycashreportano").value;
    //   var pettycashreportcolaborador = $("#pettycashreportcolaborador").val();
    //   var dadosanomes = JSON.parse($("#escolherreport").attr("detalhesanosmeses"));
    //   var dadosnomesanomes = JSON.parse($("#escolherreport").attr("detalhesnomesanosmeses"));
    //   var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      
    //   var pettycashreportmes = document.getElementById("pettycashreportmes");
    //   while (pettycashreportmes.options.length > 0) { 
    //     pettycashreportmes.remove(0); 
    //   }

    //     var opt = document.createElement('option');
    //     opt.value = "Escolha a opção";
    //     opt.innerHTML = "Escolha a opção";
    //     opt.id = "primeiro";
    //     pettycashreportmes.appendChild(opt);

    //     document.getElementById("primeiro").selected = "true";
    //     document.getElementById("primeiro").disabled = "true";

    //     if((pettycashreportcolaborador == "Todos") || (dadosnomesanomes.length == 0)){

    //       var posicaoano = dadosanomes.findIndex(x => parseInt(x._id) === parseInt(ano));
    //       if(posicaoano != -1){
        
    //         for(var j = 0; j < dadosanomes[posicaoano].listames.length; j++){

    //           var opt1 = document.createElement('option');
    //           opt1.value = dadosanomes[posicaoano].listames[j];
    //           opt1.innerHTML = meses[parseInt(dadosanomes[posicaoano].listames[j]) - 1];
    //           pettycashreportmes.appendChild(opt1);
    //           //console.log(dadosclientessite[i].sites[j]);
    //         }
    //       }

    //     }else{

    //       var posicaonome = dadosnomesanomes.findIndex(x => x._id === pettycashreportcolaborador);
    //       var posicaoano = dadosnomesanomes[posicaonome].listaanos.findIndex(x => parseInt(x.ano) === parseInt(ano));

    //       if(posicaoano != -1){
    //         for(var j = 0; j < dadosnomesanomes[posicaonome].listaanos[posicaoano].listames.length; j++){

    //           var opt1 = document.createElement('option');
    //           opt1.value = dadosnomesanomes[posicaonome].listaanos[posicaoano].listames[j];
    //           opt1.innerHTML = meses[parseInt(dadosnomesanomes[posicaonome].listaanos[posicaoano].listames[j]) - 1];
    //           pettycashreportmes.appendChild(opt1);
    //           //console.log(dadosclientessite[i].sites[j]);
    //         }
    //       }
    //     }
      
    //   // var posicaoano = dadosanomes.findIndex(x => parseInt(x._id) === parseInt(nm));
    //   // console.log(posicaoano);

    //   // if(posicaoano != -1){
        
    //   //   for(var j = 0; j < dadosanomes[posicaoano].listames.length; j++){

    //   //     var opt = document.createElement('option');
    //   //     opt.value = dadosanomes[posicaoano].listames[j];
    //   //     opt.innerHTML = meses[parseInt(dadosanomes[posicaoano].listames[j]) - 1];
    //   //     pettycashreportmes.appendChild(opt);
    //   //     //console.log(dadosclientessite[i].sites[j]);
    //   //   }
    //   // }
    // });

    // $('#pettycashreportcolaborador').change(function(){

    //   var pettycashreportcolaborador = $("#pettycashreportcolaborador").val();
    //   var dadosnomesanomes = JSON.parse($("#escolherreport").attr("detalhesnomesanosmeses"));
    //   var dadosanomes = JSON.parse($("#escolherreport").attr("detalhesanosmeses"));
    //   var pettycashreportano = document.getElementById("pettycashreportano");

    //   // remover as opcoes pettycashreportano
    //     while (pettycashreportano.options.length > 0) { 
    //       pettycashreportano.remove(0); 
    //     }

    //     var opt = document.createElement('option');
    //     opt.value = "Escolha a opção";
    //     opt.innerHTML = "Escolha a opção";
    //     opt.id = "segundo";
    //     pettycashreportano.appendChild(opt);

    //     document.getElementById("segundo").selected = "true";
    //     document.getElementById("segundo").disabled = "true";


    //   if((pettycashreportcolaborador == "Todos") || (dadosnomesanomes.length == 0)){

    //       if(dadosanomes.length != 0){

    //           for(var j = 0; j < dadosanomes.length; j++){

    //               var opt4 = document.createElement('option');
    //               opt4.value = dadosanomes[j]._id;
    //               opt4.innerHTML = dadosanomes[j]._id;
    //               pettycashreportano.appendChild(opt4);
    //           }
    //       }

    //   }else{

    //     var posicaonome = dadosnomesanomes.findIndex(x => x._id === pettycashreportcolaborador);

    //       if(posicaonome != -1){
          
    //         for(var j = 0; j < dadosnomesanomes[posicaonome].listaanos.length; j++){

    //           var opt4 = document.createElement('option');
    //           opt4.value = dadosnomesanomes[posicaonome].listaanos[j].ano;
    //           opt4.innerHTML = dadosnomesanomes[posicaonome].listaanos[j].ano;
    //           pettycashreportano.appendChild(opt4);
              
    //         }
    //       }

    //   }

    // });

    $(".escolheform").click(function(){

      document.getElementById('formulariocliente').checked = false;
      document.getElementById('formulariofornecedor').checked = false;

      $('#clientesupp_modal').openModal({dismissible:false});
      // $('#clientesuppopt_cancel_btn_modal_').click(function(e){});
      $('#clientesuppopt_yes_btn_modal').click(function(e){

        e.stopPropagation();
        e.stopImmediatePropagation();

        var clientesuppopt=$("input[name='clientesuppopt']:checked").val();
        
        if(clientesuppopt == undefined) {

          $('#clientesuppopt_yes_btn_modal').addClass('apply-shake');
          $('#paragrafoatt').removeClass('hide');


        }else{

          window.location.href="/cliente/novo/" + clientesuppopt;
        }

        
      });

    });

    controle_modalclientesupp.addEventListener("animationend", (e) => {
      controle_modalclientesupp.classList.remove("apply-shake");
      $('#paragrafoatt').addClass('hide');
   });

    $("#carta_apresentacao_empresa1").click(function(){
          var documento=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/cliente/downloaddocumento', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({documento}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };

        });

        $("#alvara1").click(function(){
          var documento=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/cliente/downloaddocumento', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({documento}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };

        });

        $("#certidao_entidades_legais1").click(function(){
          var documento=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/cliente/downloaddocumento', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({documento}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };

        });

        $("#nuit1").click(function(){
          var documento=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/cliente/downloaddocumento', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({documento}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };

        });

        $("#nuel1").click(function(){
          var documento=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/cliente/downloaddocumento', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({documento}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };

        });

        $("#carta_confirmacao_banco1").click(function(){
          var documento=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/cliente/downloaddocumento', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({documento}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };

        });

    //Popup Escolher tipo de report
    $("#escolherreport").click(function(){

      var dadoscolaboradoresmes = JSON.parse($("#escolherreport").attr("detalhescolaboradoresmes"));
      var dadosnomesanomes = JSON.parse($("#escolherreport").attr("detalhesnomesanosmeses"));
      var dadosanomes = JSON.parse($("#escolherreport").attr("detalhesanosmeses"));
      var dadosmes = JSON.parse($("#escolherreport").attr("detalhesmeses"));
      var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept','Oct', 'Nov', 'Dec'];
      var nome= $("#escolherreport").attr("detalheusuario");

      
      // preencher os colaboradores 
      var pettycashreportcolaborador = document.getElementById("pettycashreportcolaborador");
      // remover as opcoes pettycashreportcolaborador
      while (pettycashreportcolaborador.options.length > 0) { 
        pettycashreportcolaborador.remove(0); 
      }

        var opt1 = document.createElement('option');
        opt1.value = "Escolha a opção";
        opt1.innerHTML = "Escolha a opção";
        opt1.id = "segundo1";
        pettycashreportcolaborador.appendChild(opt1);

        document.getElementById("segundo1").selected = "true";
        document.getElementById("segundo1").disabled = "true";

        if (dadoscolaboradoresmes.length != 0) {
          var opt2 = document.createElement('option');
          opt2.value = "All";
          opt2.innerHTML = "All";
          pettycashreportcolaborador.appendChild(opt2);

        
        for(var i = 0; i < dadoscolaboradoresmes.length; i++){

            var opt3 = document.createElement('option');
            opt3.value = dadoscolaboradoresmes[i]._id;
            opt3.innerHTML = dadoscolaboradoresmes[i]._id;
            pettycashreportcolaborador.appendChild(opt3);
        }
      }else{

         var opt2 = document.createElement('option');
          opt2.value = nome;
          opt2.innerHTML = nome;
          pettycashreportcolaborador.appendChild(opt2);

      }

      // preencher os anos
      var pettycashreportanofrom = document.getElementById("pettycashreportanofrom");
      var pettycashreportanoto = document.getElementById("pettycashreportanoto");

      // remover as opcoes pettycashreportcolaborador
      while (pettycashreportanofrom.options.length > 0) { 
        pettycashreportanofrom.remove(0); 
      }

        var opt4 = document.createElement('option');
        opt4.value = "Escolha a opção";
        opt4.innerHTML = "Escolha a opção";
        opt4.id = "segundo4";
        pettycashreportanofrom.appendChild(opt4);

        document.getElementById("segundo4").selected = "true";
        document.getElementById("segundo4").disabled = "true";

        for(var i = 0; i < dadosanomes.length; i++){

            var opt5 = document.createElement('option');
            opt5.value = dadosanomes[i]._id;
            opt5.innerHTML = dadosanomes[i]._id;
            pettycashreportanofrom.appendChild(opt5);
        }

      while (pettycashreportanoto.options.length > 0) { 
        pettycashreportanoto.remove(0); 
      }

        var opt6 = document.createElement('option');
        opt6.value = "Escolha a opção";
        opt6.innerHTML = "Escolha a opção";
        opt6.id = "segundo6";
        pettycashreportanoto.appendChild(opt6);

        document.getElementById("segundo6").selected = "true";
        document.getElementById("segundo6").disabled = "true";

        for(var i = 0; i < dadosanomes.length; i++){

            var opt7 = document.createElement('option');
            opt7.value = dadosanomes[i]._id;
            opt7.innerHTML = dadosanomes[i]._id;
            pettycashreportanoto.appendChild(opt7);
        }

         // preencher os meses
        var pettycashreportmesfrom = document.getElementById("pettycashreportmesfrom");
        var pettycashreportmesto = document.getElementById("pettycashreportmesto");

        // / remover as opcoes pettycashreportcolaborador
        while (pettycashreportmesfrom.options.length > 0) { 
          pettycashreportmesfrom.remove(0); 
        }

          var opt8 = document.createElement('option');
          opt8.value = "Escolha a opção";
          opt8.innerHTML = "Escolha a opção";
          opt8.id = "segundo8";
          pettycashreportmesfrom.appendChild(opt8);

          document.getElementById("segundo8").selected = "true";
          document.getElementById("segundo8").disabled = "true";

          for(var i = 0; i < dadosmes.length; i++){

              var opt9 = document.createElement('option');
              opt9.value = dadosmes[i]._id;
              opt9.innerHTML = meses[parseInt(dadosmes[i]._id) - 1];
              pettycashreportmesfrom.appendChild(opt9);
          }

        while (pettycashreportmesto.options.length > 0) { 
          pettycashreportmesto.remove(0); 
        }

          var opt10 = document.createElement('option');
          opt10.value = "Escolha a opção";
          opt10.innerHTML = "Escolha a opção";
          opt10.id = "segundo10";
          pettycashreportmesto.appendChild(opt10);

          document.getElementById("segundo10").selected = "true";
          document.getElementById("segundo10").disabled = "true";

          for(var i = 0; i < dadosmes.length; i++){

              var opt11 = document.createElement('option');
              opt11.value = dadosmes[i]._id;
              opt11.innerHTML = meses[parseInt(dadosmes[i]._id)-1]; 
              pettycashreportmesto.appendChild(opt11);
          }

      

      $('#pettycashreport_modal').openModal({dismissible:false});
      $('#pettycashreport_yes_btn_modal').click(function(e){

          e.stopPropagation();
          e.stopImmediatePropagation();

          var pettycashreportcolaborador = $("#pettycashreportcolaborador").val();
          var pettycashreportanofrom = $("#pettycashreportanofrom").val();
          var pettycashreportmesfrom = $("#pettycashreportmesfrom").val();
          console.log(pettycashreportanofrom)
          var pettycashreportanoto = $("#pettycashreportanoto").val();
          var pettycashreportmesto = $("#pettycashreportmesto").val();



          if(((pettycashreportcolaborador == null) && (pettycashreportanofrom == null) && (pettycashreportmesfrom == null)) || (pettycashreportcolaborador == null)) {

            $('#pettycashreport_yes_btn_modal').addClass('apply-shake');
            $('#paragrafoatt1').removeClass('hide');

          }else
              if( (((pettycashreportanofrom != null) && (pettycashreportanoto == null)) || ((pettycashreportmesfrom != null) && (pettycashreportmesto == null))) || (((pettycashreportanofrom == null) && (pettycashreportanoto != null)) || ((pettycashreportmesfrom == null) && (pettycashreportmesto != null)))){

                $('#pettycashreport_yes_btn_modal').addClass('apply-shake');
                $('#paragrafoatt3').removeClass('hide');

              }else
                  if(((parseInt(pettycashreportanofrom) == parseInt(pettycashreportanoto)) && (parseInt(pettycashreportmesfrom) > parseInt(pettycashreportmesto))) || (pettycashreportanofrom > pettycashreportanoto) ){

                    $('#pettycashreport_yes_btn_modal').addClass('apply-shake');
                    $('#paragrafoatt4').removeClass('hide');
                  }else{

                    var rangeTime, colaborador, anoFrom, mesFrom, anoTo, mesTo;

                    if(pettycashreportcolaborador == "All"){

                      colaborador = pettycashreportcolaborador;

                    }else{

                      nome_colab = pettycashreportcolaborador.split(" ");
                      colaborador = nome_colab[0] + '_' + nome_colab[1];

                    }

                    if(pettycashreportanofrom == null){

                        if(pettycashreportmesfrom == null){

                          window.location.href="/pettycash/printreportall/" + colaborador;
                        //   setTimeout(function(){
                        //     window.location.href="/pettycash/accountcontrol_home";
                        // }, 1000);

                        }else{

                          rangeTime = pettycashreportmesfrom + "_to_" +  pettycashreportmesto;
                          window.location.href="/pettycash/printreportmonth/" + colaborador + "/" + rangeTime;
                        //   setTimeout(function(){
                        //     window.location.href="/pettycash/accountcontrol_home";
                        // }, 1000);
                          
                        }

                    }else{

                      if(pettycashreportmesfrom == null){

                          rangeTime =  pettycashreportanofrom + "_to_" +  pettycashreportanoto;
                          window.location.href="/pettycash/printreportyear/" + colaborador + "/" + rangeTime;
                        //   setTimeout(function(){
                        //     window.location.href="/pettycash/accountcontrol_home";
                        // }, 1000);

                        }else{

                          rangeTime = pettycashreportmesfrom + "_" + pettycashreportanofrom + "_to_" + pettycashreportmesto +  "_" +  pettycashreportanoto;
                          window.location.href="/pettycash/printreportfull/" + colaborador + "/" + rangeTime;
                        }

                    }


                    


                  }




      });


    });

    controle_modalpettycashreport.addEventListener("animationend", (e) => {
      controle_modalpettycashreport.classList.remove("apply-shake");
      $('#paragrafoatt1').addClass('hide');
      $('#paragrafoatt3').addClass('hide');
      $('#paragrafoatt4').addClass('hide');
   });

    //Popup TT Number

    $("#createnewttnumber").click(function(){

      var dadosusuarios = JSON.parse($("#recolherdados").attr("detalhesusuarios"));
      var dadosclientes = JSON.parse($("#recolherdados").attr("detalhesclientes"));
      var dadosjobcards = JSON.parse($("#recolherdados").attr("detalhesjobcards"));
      var nomesession = $("#recolherdados").attr("detalhessession");


      var jobcard_clientenome1 = document.getElementById("jobcard_clientenome");

      while (jobcard_clientenome1.options.length > 0) { 
        jobcard_clientenome1.remove(0); 
      }

      var opt2 = document.createElement('option');
      opt2.value = "Escolha a opção";
      opt2.innerHTML = "Escolha a opção";
      opt2.id = "segundo1";
      jobcard_clientenome1.appendChild(opt2);
      document.getElementById("segundo1").selected = "true";
      document.getElementById("segundo1").disabled = "true";

      for(var j = 0; j < dadosclientes.length; j++){

          var opt = document.createElement('option');
          opt.value = dadosclientes[j].cliente_nome;
          opt.innerHTML = dadosclientes[j].cliente_nome;
          jobcard_clientenome1.appendChild(opt);
          //console.log(dadosclientessite[i].sites[j]);
      }


      var jobcard_tecniconome1 = document.getElementById("jobcard_tecniconome");
      while (jobcard_tecniconome1.options.length > 0) { 
        jobcard_tecniconome1.remove(0); 
      }

      var opt3 = document.createElement('option');
      opt3.value = "Escolha a opção";
      opt3.innerHTML = "Escolha a opção";
      opt3.id = "segundo2";
      jobcard_tecniconome1.appendChild(opt3);
      document.getElementById("segundo2").selected = "true";
      document.getElementById("segundo2").disabled = "true";

      for(var i = 0; i < dadosusuarios.length; i++){

          var opt1 = document.createElement('option');
          opt1.value = dadosusuarios[i].nome;
          opt1.innerHTML = dadosusuarios[i].nome;
          jobcard_tecniconome1.appendChild(opt1);
          
      }

      $('#createttnumber_modal').openModal({dismissible:false});
      $('#createttnumber_cancel_btn_modal_').click(function(e){ 

          e.stopPropagation();
          
          
          var teste = document.getElementsByClassName("select-wrapper");
          for(var j = 0; j < teste[0].childNodes[2].childNodes.length; j++){
            teste[0].childNodes[2].childNodes[j].childNodes[0].childNodes[0].checked = false;
            $("li").removeClass("active");
            $("li").removeClass("selected");
          }
            teste[0].childNodes[1].value = "Escolha a opção";
           
          
          $("#jobcard_ttnumber").val("");
          $("#jobcard_ttnumber").siblings('label').removeClass('active');
          $("#jobcard_clientenome").val("");
          var siteselect = document.getElementById("jobcard_site");
           while (siteselect.options.length > 0) { 
            siteselect.remove(0); 
          }

          var opt4 = document.createElement('option');
          opt4.value = "Escolha a opção";
          opt4.innerHTML = "Escolha a opção";
          opt4.id = "segundo";
          siteselect.appendChild(opt4);

          document.getElementById("segundo").selected = "true";
          document.getElementById("segundo").disabled = "true";

          // document.getElementById("terceiro").selected = "true";
          // document.getElementById("terceiro").disabled = "true";

          document.getElementById("quarto").selected = "true";
          document.getElementById("quarto").disabled = "true";
          //$("#jobcard_call").siblings('li').removeClass('active');
          $("#jobcard_tecniconome").val("");
          $("#jobcard_jobinfo").val("");
          $("#jobcard_jobinfo").siblings('label').removeClass('active');
          // $("#jobcard_call").val("");
          $("#jobcard_datareporte").val("");
          $("#jobcard_datareporte").siblings('label').removeClass('active');
          $("#jobcard_horareporte").val("");
          $("#jobcard_horareporte").siblings('label').removeClass('active');

          $('#createttnumber_modal').closeModal();
         
      });

      $('#createttnumber_yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        var jobcard_ttnumber= $("#jobcard_ttnumber").val();
        var posicaottnumber = dadosjobcards.findIndex(x => parseInt(x.jobcard_ttnumber) === parseInt(jobcard_ttnumber));

        if((jobcard_ttnumber == "") || ($("#jobcard_clientenome").val() == null) || ($("#jobcard_call").val().length == 0) || ($("#jobcard_departamento").val() == null) || ($("#jobcard_site").val() == null) || ($("#jobcard_tecniconome").val() == null) || ($("#jobcard_jobinfo").val() == "") || ($("#jobcard_datareporte").val() == "") || ($("#jobcard_horareporte").val() == "")){
            
            $('#createttnumber_yes_btn_modal').addClass('apply-shake');
            $('#paragrafottnumber1').removeClass('hide');

            setTimeout(function(){
              $('#paragrafottnumber1').addClass('hide');
            }, 2000);
        }else
          if(posicaottnumber != -1){

            $('#createttnumber_yes_btn_modal').addClass('apply-shake');
            $('#paragrafottnumber').removeClass('hide');

            setTimeout(function(){
              $('#paragrafottnumber').addClass('hide');
            }, 2000);

          }else{

                  var rule="/manutencao/novojobcard";
                var jobcardformdata = new FormData();
                
                jobcardformdata.append("jobcard_ttnumber", jobcard_ttnumber);

                var jobcard_cod=Date.now();
                jobcardformdata.append("jobcard_cod", jobcard_cod);

                var jobcard_call=$("#jobcard_call").val();
                console.log(jobcard_call);
                jobcardformdata.append("jobcard_call", JSON.stringify(jobcard_call));

                var ttnumber_status="New";
                jobcardformdata.append("ttnumber_status", ttnumber_status);

                var jobcard_departamento=$("#jobcard_departamento").val();;
                jobcardformdata.append("jobcard_departamento", jobcard_departamento);

                var jobcard_jobtype="Callout";
                jobcardformdata.append("jobcard_jobtype", jobcard_jobtype);

                var jobcard_jobinfo=$("#jobcard_jobinfo").val();
                jobcardformdata.append("jobcard_jobinfo", jobcard_jobinfo);

                var jobcard_tecniconome=$("#jobcard_tecniconome").val();
                jobcardformdata.append("jobcard_tecniconome", jobcard_tecniconome);

                var posicaotecnico = dadosusuarios.findIndex(x => x.nome === jobcard_tecniconome);
                
                var jobcard_regiao=dadosusuarios[posicaotecnico].regiao;
                jobcardformdata.append("jobcard_regiao", jobcard_regiao);

                var jobcard_cell=dadosusuarios[posicaotecnico].telefone_1;
                jobcardformdata.append("jobcard_cell", jobcard_cell);

                var jobcard_linemanager=dadosusuarios[posicaotecnico].nome_supervisor;
                jobcardformdata.append("jobcard_linemanager", jobcard_linemanager);

                var jobcard_loggedby=nomesession;
                jobcardformdata.append("jobcard_loggedby", jobcard_loggedby);

                var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
                var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
                var ano = (new Date()).getFullYear();
                var todaydate = dia + "/" + mes + "/" + ano;

                var jobcard_loggedon= todaydate;
                jobcardformdata.append("jobcard_loggedon", jobcard_loggedon);

                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                  var datamobile = $("#jobcard_datareporte1").val();
                  var datamobilesplit = datamobile.split("-");
                  var jobcard_datareporte = datamobilesplit[2] + "/" + datamobilesplit[1] + "/" + datamobilesplit[0];

                }else{
                  var jobcard_datareporte=$("#jobcard_datareporte").val();
                }

                jobcardformdata.append("jobcard_datareporte", jobcard_datareporte);

                var jobcard_horareporte=$("#jobcard_horareporte").val();
                jobcardformdata.append("jobcard_horareporte", jobcard_horareporte);

                var jobcard_quotacao="";
                jobcardformdata.append("jobcard_quotacao", jobcard_quotacao);

                var jobcard_planneddate="";
                jobcardformdata.append("jobcard_planneddate", jobcard_planneddate);

                var jobcard_planneddatems=0;
                jobcardformdata.append("jobcard_planneddatems", jobcard_planneddatems);

                var jobcard_planneddate5beforems=0;
                jobcardformdata.append("jobcard_planneddate5beforems", jobcard_planneddate5beforems);

                var jobcard_planneddate5afterms=0;
                jobcardformdata.append("jobcard_planneddate5afterms", jobcard_planneddate5afterms);

                var jobcard_workstatus="";
                jobcardformdata.append("jobcard_workstatus", jobcard_workstatus);

                var jobcard_razaoreprovar="";
                jobcardformdata.append("jobcard_razaoreprovar", jobcard_razaoreprovar);

                var jobcard_clientenome=$("#jobcard_clientenome").val();;
                jobcardformdata.append("jobcard_clientenome", jobcard_clientenome);

                var jobcard_site=$("#jobcard_site").val();
                jobcardformdata.append("jobcard_site", jobcard_site);

                var posicaocliente = dadosclientes.findIndex(x => x.cliente_nome === jobcard_clientenome);

                var jobcard_clientebranch=dadosclientes[posicaocliente].cliente_filial;
                jobcardformdata.append("jobcard_clientebranch", jobcard_clientebranch);

                var jobcard_clientetelefone=dadosclientes[posicaocliente].cliente_telefone;
                jobcardformdata.append("jobcard_clientetelefone", jobcard_clientetelefone);

                var jobcard_controlador = [1];
                jobcardformdata.append("jobcard_controlador", JSON.stringify(jobcard_controlador));

                var jobcard_controladorintervenientes = [];
                jobcard_controladorintervenientes.push(jobcard_loggedby);
                jobcard_controladorintervenientes.push(jobcard_tecniconome);
                jobcard_controladorintervenientes.push(jobcard_linemanager);
                jobcardformdata.append("jobcard_controladorintervenientes", JSON.stringify(jobcard_controladorintervenientes));

                var jobcard_travelinfo_proposito="";
                jobcardformdata.append("jobcard_travelinfo_proposito", jobcard_travelinfo_proposito);

                var travelinfoArrayJobcard = [];
                jobcardformdata.append("travelinfoArrayJobcard", JSON.stringify(travelinfoArrayJobcard));

                var generatorArrayJobcard = [];
                jobcardformdata.append("generatorArrayJobcard", JSON.stringify(generatorArrayJobcard));

                var equipamentoArrayJobcard = [];
                jobcardformdata.append("equipamentoArrayJobcard", JSON.stringify(equipamentoArrayJobcard));

                var sparesArrayJobcard = [];
                jobcardformdata.append("sparesArrayJobcard", JSON.stringify(sparesArrayJobcard));

                  var xhr = new XMLHttpRequest();
                  // Add any event handlers here...
                  xhr.open('POST',rule, true);
                  xhr.send(jobcardformdata);

                   setTimeout(function(){
                      window.location.href="/manutencao/ttnumberhome/new";
                  }, 1000);

        }

      });
    
    });

    controle_modalcreatettnumber.addEventListener("animationend", (e) => {
      controle_modalcreatettnumber.classList.remove("apply-shake");
      //$('#paragrafottnumber').addClass('hide');
   });

    //Accoes dos icons no ttform
    $('.chegadasite').click(function(){

      var referencia = $(this).attr("data-user-new");
      var dadojobtype =$(this).attr("datajobtype");
      // $(this).parent('td').parent('tr')[0].childNodes[4].childNodes[0].attributes[4].value;
     


      $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
      $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Já se encontra no site ':'Have you just arrived the site <b>') +(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
      $('#yes_no_modal').openModal({dismissible:false});
      $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        var jobcardformdata = new FormData();

        var rule="/manutencao/updatechegadasite";

        var jobcard_id = referencia;
        jobcardformdata.append("jobcard_id", jobcard_id);

        var travelinfoObject = {};

        var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
        var ano = (new Date()).getFullYear();
        var todaydate = dia + "/" + mes + "/" + ano;

        var todayhours = new Date();
        var todaytime = todayhours.getHours() + ":" + todayhours.getMinutes();

        var jobcard_sitearrivaldate = todaydate;
        travelinfoObject.jobcard_sitearrivaldate = jobcard_sitearrivaldate;

        var jobcard_sitearrivaltime = todaytime;
        travelinfoObject.jobcard_sitearrivaltime = jobcard_sitearrivaltime;

        travelinfoObject.jobcard_remedialaction = "";

        travelinfoObject.jobcard_healthsafety = "";

        travelinfoObject.jobcard_hsreason = "";

        travelinfoObject.jobcard_sitedeparturedate = "";

        travelinfoObject.jobcard_sitedeparturetime = "";

        travelsiteinfoArray.push(travelinfoObject);

        jobcardformdata.append("travelinfoArrayJobcard", JSON.stringify(travelsiteinfoArray));



        var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',rule, true);
          xhr.send(jobcardformdata);

          if(dadojobtype == "Callout"){
            setTimeout(function(){
              window.location.href="/manutencao/ttnumberhome/inprogress";
            }, 1000);

          }else{
            setTimeout(function(){
              window.location.href="/manutencao/preventativemaint/inprogress";
            }, 1000);
          }

          

      });
    });

   $('.saidasite').click(function(){

          var referencia = $(this).attr("data-user-new");
          // $(this).parent('td').parent('tr')[0].childNodes[4].childNodes[0].attributes[4].value;
          var referenciaTravel = $(this).attr("dadostravel");
          var dadojobtype =$(this).attr("datajobtype");
          var dadoplanneddatems = parseInt($(this).attr("dataplanneddatems"));

          var dadoplanneddatebeforems = parseInt($(this).attr("dataplanneddatebeforems"));
          var dadoplanneddateafterms = parseInt($(this).attr("dataplanneddateafterms"));
          console.log(dadoplanneddatems, dadoplanneddatebeforems, dadoplanneddateafterms)
          // $(this).parent('td').parent('tr')[0].childNodes[4].childNodes[0].attributes[5].value;

          $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja sair do site ':'Do you want to leave the site <b>') +(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
          $('#yes_no_modal').openModal({dismissible:false});
          $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
          $('#yes_btn_modal').click(function(e){

                $('#jobcardtecnico_modal').openModal({dismissible:false});
                $('#jobcardtecnico_cancel_btn_modal_').click(function(e){
                    e.stopPropagation();
                    window.location.href="#";
                });

                $('#jobcardtecnico_yes_btn_modal').click(function(e){
                  e.stopPropagation();
                  e.stopImmediatePropagation();

                  var jobcardformdata = new FormData();

                  var rule="/manutencao/updatesaidasite";

                  var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
                  var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
                  var ano = (new Date()).getFullYear();
                  var todaydate = dia + "/" + mes + "/" + ano;

                  var dataActualms= (new Date(ano, (mes - 1), dia).getTime());

                  var todayhours = new Date();
                  var todaytime = todayhours.getHours() + ":" + todayhours.getMinutes();

                  var jobcard_id = referencia;
                  jobcardformdata.append("jobcard_id", jobcard_id);

                  var jobcard_idTravel = referenciaTravel;
                  jobcardformdata.append("jobcard_idTravel", jobcard_idTravel);

                  var jobcard_remedialaction = $("#jobcard_remedialaction").val();
                  jobcardformdata.append("jobcard_remedialaction", jobcard_remedialaction);

                  var jobcard_healthsafety = $("#jobcard_healthsafety").val();
                  jobcardformdata.append("jobcard_healthsafety", jobcard_healthsafety);

                  var jobcard_hsreason;

                  if(jobcard_healthsafety == "No"){
                     jobcard_hsreason = "";
                  }else{
                    jobcard_hsreason = $("#jobcard_hsreason").val();
                  }
                  
                  jobcardformdata.append("jobcard_hsreason", jobcard_hsreason);

                  var jobcard_sitedeparturedate = todaydate;
                  jobcardformdata.append("jobcard_sitedeparturedate", jobcard_sitedeparturedate);

                  var jobcard_sitedeparturetime = todaytime;
                  jobcardformdata.append("jobcard_sitedeparturetime", jobcard_sitedeparturetime);

                  var jobcard_workstatus;
                  if( dadoplanneddatems != 0){

                    if((dataActualms > dadoplanneddatebeforems) && (dataActualms < dadoplanneddatems)){
                        jobcard_workstatus = "Done early";
                    }else
                      if(dataActualms == dadoplanneddatems ){
                        jobcard_workstatus = "Done on time";
                      }else
                        if((dataActualms > dadoplanneddatems) && (dataActualms < dadoplanneddateafterms)){
                          jobcard_workstatus = "Done later";
                        }else{
                          jobcard_workstatus = "Out of time";
                        }
                  }else{
                    jobcard_workstatus = "";
                  }
                 jobcardformdata.append("jobcard_workstatus", jobcard_workstatus);

                  var xhr = new XMLHttpRequest();
                  // Add any event handlers here...
                  xhr.open('POST',rule, true);
                  xhr.send(jobcardformdata);

                  if(dadojobtype == "Callout"){

                      setTimeout(function(){
                        window.location.href="/manutencao/ttnumberhome/inprogress";
                      }, 1000);

                  }else{
                    setTimeout(function(){
                        window.location.href="/manutencao/preventativemaint/inprogress";
                      }, 1000);
                  }

                  

                });
          });

    });

    
   $('.generatordetalhes').click(function(){

         var referencia =$(this).attr("data-user-new");
         
         var dadossiteinfo = JSON.parse($("#recolherdados").attr("detalhessiteinfo"));
         var siteescolhido = $(this).attr("detalhesite");
         var dadojobtype =$(this).attr("datajobtype");
         var comparador = [];
         
        
         var nomesite = $("#recolherdados").attr("detalhessiteinfo");
         var jobcard_generator = document.getElementById("jobcard_generator");

        for(var j = 0; j < dadossiteinfo.length; j++){

          if(dadossiteinfo[j].siteinfo_sitenum == siteescolhido){

              if(dadossiteinfo[j].siteinfo_generatorArray.length == 0){

                comparador.push(1);

              }else{

                comparador.push(1);
                comparador.push(1)

                for(var i = 0; i < dadossiteinfo[j].siteinfo_generatorArray.length; i++){

                    var opt = document.createElement('option');
                    opt.value = dadossiteinfo[j].siteinfo_generatorArray[i].siteinfo_generatortype + ' - ' + dadossiteinfo[j].siteinfo_generatorArray[i].siteinfo_generatormodelno;
                    opt.innerHTML = dadossiteinfo[j].siteinfo_generatorArray[i].siteinfo_generatortype + ' - ' + dadossiteinfo[j].siteinfo_generatorArray[i].siteinfo_generatormodelno;
                    jobcard_generator.appendChild(opt);
                    //console.log(dadosclientessite[i].sites[j]);
                }

              }

              
          }
        }

        if(comparador.length == 1){
          $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message'));
          $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Este site não possui geradores!':'This site has no generators!<b>')+(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ':"</b>"));
          $('#msg_modal').openModal({dismissible:false});

        }else{

          $('#jobcardgenerator_modal').openModal({dismissible:false});
          $('#jobcardgenerator_cancel_btn_modal_').click(function(e){
              e.stopPropagation();
              window.location.href="#";
          });

          $('#jobcardgenerator_yes_btn_modal').click(function(e){
              e.stopPropagation();
              e.stopImmediatePropagation();

              var jobcardformdata = new FormData();

              var rule="/manutencao/updategeneratordetails";

              var jobcard_id = referencia;
              jobcardformdata.append("jobcard_id", jobcard_id);

              var jobcard_generator = $("#jobcard_generator").val();;
              jobcardformdata.append("jobcard_generator", jobcard_generator);

              var jobcard_currentgeneratorhours = $("#jobcard_currentgeneratorhours").val();;
              jobcardformdata.append("jobcard_currentgeneratorhours", jobcard_currentgeneratorhours);

              var jobcard_previousrefuelhrs = "";
              jobcardformdata.append("jobcard_previousrefuelhrs", jobcard_previousrefuelhrs);

              var jobcard_generatorrefuel = $("#jobcard_generatorrefuel").val();;
              jobcardformdata.append("jobcard_generatorrefuel", jobcard_generatorrefuel);

              var jobcard_litersoil = $("#jobcard_litersoil").val();;
              jobcardformdata.append("jobcard_litersoil", jobcard_litersoil);

              var jobcard_dsc = $("#jobcard_dsc").val();;
              jobcardformdata.append("jobcard_dsc", jobcard_dsc);

              var jobcard_refuelreason = $("#jobcard_refuelreason").val();;
              jobcardformdata.append("jobcard_refuelreason", jobcard_refuelreason);

              var jobcard_generatorbeenserviced = $("#jobcard_generatorbeenserviced").val();;
              jobcardformdata.append("jobcard_generatorbeenserviced", jobcard_generatorbeenserviced);

              var jobcard_hourslastservice = "";
              jobcardformdata.append("jobcard_hourslastservice", jobcard_hourslastservice);

              // var selcopt = document.getElementById("jobcard_generator");
              // selcopt.remove(selcopt.selectedIndex);

              console.log(jobcard_id);
              var xhr = new XMLHttpRequest();
                  // Add any event handlers here...
                  xhr.open('POST',rule, true);
                  xhr.send(jobcardformdata);


              if(dadojobtype == "Callout"){

                  setTimeout(function(){
                    window.location.href="/manutencao/ttnumberhome/inprogress";
                  }, 1000);

              }else{
                setTimeout(function(){
                    window.location.href="/manutencao/preventativemaint/inprogress";
                  }, 1000);
              }


          });

        }

          

    });

     $('#reasonoptions').change(function(){
      var op = $("#reasonoptions").val();

        for(var j = 0; j < op.length; j++){

          if(op[j] == "Outros"){
            $('#mostrarOutros').removeClass('hide');
          }else{
            $("#reasonoutros").val("")
            $("#reasonoutros").siblings('label').removeClass('active');
            $('#mostrarOutros').addClass('hide');
            

          }

        }

        if(op.length == 0){
          $("#reasonoutros").val("")
          $("#reasonoutros").siblings('label').removeClass('active');
          $('#mostrarOutros').addClass('hide');
        }

    });

     $('.editCreditPettycash').click(function(){

      var referencia = $(this).attr("dataref");
      var creditovalor = $(this).attr("creditovalue");
      var saldovalor = $(this).attr("saldovalue");
      $("#pettycash_credito1").val(creditovalor);
      $("#pettycash_credito1").siblings('label').addClass('active');
      var dadoscaminho = $(this).attr("detalhescaminho");
      var definircaminho = dadoscaminho.split('/')[1];

      $('#pettycasheditcredit_modal').openModal({dismissible:false});
      $('#pettycasheditcredit_yes_btn_modal').click(function(e){

          e.stopPropagation();
          e.stopImmediatePropagation();

          var rule="/pettycash/editCreditPettycash/" + dadoscaminho + "/" + referencia;

          var pettycashopformdata = new FormData();

          var pettycashop_id = referencia;
          pettycashopformdata.append("pettycashop_id", pettycashop_id);

          var creditovalornovo = $("#pettycash_credito1").val();
          pettycashopformdata.append("creditovalornovo", creditovalornovo);

          var creditovalorantigo = creditovalor;
          pettycashopformdata.append("creditovalorantigo", creditovalorantigo);

          var saldovaloranterior = saldovalor;
          pettycashopformdata.append("saldovaloranterior", saldovaloranterior);

          var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',rule, true);
          xhr.send(pettycashopformdata);

          setTimeout(function(){
            if(definircaminho != "range"){
              window.location.href="/pettycash/detalhesUso/" + dadoscaminho;
            }else{
              window.location.href="/pettycash/accountcontrol_home";
            }
            
          }, 1000);


      });


     });

    $('.refusepettycash').click(function(){

      var referencia = $(this).attr("dataref");
      var debitovalor = $(this).attr("debitovalue");
      var dadoscaminho = $(this).attr("detalhescaminho");
      var definircaminho = dadoscaminho.split('/')[1];
      // console.log(dadoscaminho)

      $('#pettycashreason_modal').openModal({dismissible:false});
      $('#pettycashreason_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var reasonoptions = $("#reasonoptions").val();
          var posicao = reasonoptions.indexOf("Outros");
          var reasonoutros = $("#reasonoutros").val();

          if((reasonoptions.length == 0) || ((posicao != -1) && (reasonoutros == ""))) {

            $('#pettycashreason_yes_btn_modal').addClass('apply-shake');
            $('#paragrafoatt2').removeClass('hide');

          }else{
            var rule="/pettycash/refusepettycash/" + dadoscaminho + "/" + referencia;

          var optionsformdata = new FormData();

          var operation_id = referencia;
          optionsformdata.append("operation_id", operation_id);

          if(reasonoutros != ""){
            // reasonoptions.push(reasonoutros);
            reasonoptions[posicao] = reasonoutros
          }
          optionsformdata.append("reasonoptions", JSON.stringify(reasonoptions));


          optionsformdata.append("debitovalor", debitovalor);

          var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',rule, true);
          xhr.send(optionsformdata);

          setTimeout(function(){
            if(definircaminho != "range"){
              window.location.href="/pettycash/detalhesUso/" + dadoscaminho;
            }else{
              window.location.href="/pettycash/accountcontrol_home";
            }
            
          }, 1000);
          }

          

      });

    });

    const controle_modalpettycashrefuse = document.querySelector("button#pettycashreason_yes_btn_modal");

    controle_modalpettycashrefuse.addEventListener("animationend", (e) => {
      controle_modalpettycashrefuse.classList.remove("apply-shake");
      $('#paragrafoatt2').addClass('hide');
   });


    $('.equipmentrepairs').click(function(){

        var referencia = $(this).attr("data-user-new");
        var dadojobtype =$(this).attr("datajobtype");
        // $(this).parent('td').parent('tr')[0].childNodes[4].childNodes[0].attributes[4].value;

        $('#jobcardequipment_modal').openModal({dismissible:false});
        $('#jobcardequipment_cancel_btn_modal_').click(function(e){
              e.stopPropagation();
              window.location.href="#";
        });

        $('#jobcardequipment_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateequipmentrepairs";

          var jobcard_id = referencia;
          jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcard_equiptype = $("#jobcard_equiptype").val();;
          jobcardformdata.append("jobcard_equiptype", jobcard_equiptype);

          var jobcard_manufacturer = $("#jobcard_manufacturer").val();;
          jobcardformdata.append("jobcard_manufacturer", jobcard_manufacturer);

          var jobcard_model = $("#jobcard_model").val();;
          jobcardformdata.append("jobcard_model", jobcard_model);

          var jobcard_serialnumber = $("#jobcard_serialnumber").val();;
          jobcardformdata.append("jobcard_serialnumber", jobcard_serialnumber);

          var jobcard_capacity = $("#jobcard_capacity").val();;
          jobcardformdata.append("jobcard_capacity", jobcard_capacity);

          var jobcard_type = $("#jobcard_type").val();;
          jobcardformdata.append("jobcard_type", jobcard_type);

          var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',rule, true);
          xhr.send(jobcardformdata);

          if(dadojobtype == "Callout"){

              setTimeout(function(){
                window.location.href="/manutencao/ttnumberhome/inprogress";
              }, 1000);

          }else{
            setTimeout(function(){
                window.location.href="/manutencao/preventativemaint/inprogress";
              }, 1000);
          }


          // setTimeout(function(){
          //   window.location.href="/manutencao/ttnumberhome/inprogress";
          // }, 1000);

        });
    });

    $('.sparesused').click(function(){

        var referencia = $(this).attr("data-user-new");
        var referencia1 = $(this).attr("data-user-name");
        var dadojobtype =$(this).attr("datajobtype");

        var dadosarmazem = JSON.parse($("#recolherdados").attr("detalhesarmazens"));
        var posicaostock = dadosarmazem.findIndex(x => x.nome === referencia1);
        
         var jobcard_item = document.getElementById("jobcard_item");

          while (jobcard_item.options.length > 0) { 
            jobcard_item.remove(0); 
          }

            var opt1 = document.createElement('option');
            opt1.value = "Escolha a opção";
            opt1.innerHTML = "Escolha a opção";
            opt1.id = "segundo";
           jobcard_item.appendChild(opt1);

            document.getElementById("segundo").selected = "true";
            document.getElementById("segundo").disabled = "true";

            if(posicaostock == -1){

                $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message'));
                $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Itens indisponíveis!':'Unavailable items!<b>')+(($(".lang-picker > .selected").attr("value")=="pt")?'</b> ':"</b>"));
                $('#msg_modal').openModal({dismissible:false});

            }else{

                 if(dadosarmazem.length != 0){
            for(var j = 0; j < dadosarmazem[posicaostock].disponibilidade.length; j++){
              

              var opt = document.createElement('option');
              opt.value = dadosarmazem[posicaostock].disponibilidade[j].description_item;
              opt.innerHTML = dadosarmazem[posicaostock].disponibilidade[j].description_item;
              jobcard_item.appendChild(opt);
              //console.log(dadosclientessite[i].sites[j]);
              
            
            }
           }

          

          $('#jobcardspares_modal').openModal({dismissible:false});
          $('#jobcardspares_cancel_btn_modal_').click(function(e){
                e.stopPropagation();
                window.location.href="#";
          });

          $('#jobcardspares_yes_btn_modal').click(function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();

            var jobcardformdata = new FormData();

            var rule="/manutencao/updatesparesused";

            var jobcard_id = referencia;
            jobcardformdata.append("jobcard_id", jobcard_id);

            var jobcard_tecniconome = referencia1;
            jobcardformdata.append("jobcard_tecniconome", jobcard_tecniconome);

            var jobcard_item = $("#jobcard_item").val();;
            jobcardformdata.append("jobcard_item", jobcard_item);

            // var posicaoitem = dadosarmazem[0].disponibilidade.findIndex(x => x.description_item === jobcard_item);

            // var referenciaItem = dadosarmazem[0].disponibilidade[posicaoitem]._id;
            // jobcardformdata.append("referenciaItem", referenciaItem);

            var jobcard_remaining = $("#jobcard_remaining").val();;
            jobcardformdata.append("jobcard_remaining", jobcard_remaining);

            var jobcard_quantityhave = $("#jobcard_quantityhave").val();;
            jobcardformdata.append("jobcard_quantityhave", jobcard_quantityhave);

            var jobcard_quantityuse = $("#jobcard_quantityuse").val();;
            jobcardformdata.append("jobcard_quantityuse", jobcard_quantityuse);

            var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
            var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
            var ano = (new Date()).getFullYear();
            var todaydate = dia + "/" + mes + "/" + ano;

            var jobcard_datauso = todaydate;
            jobcardformdata.append("jobcard_datauso", jobcard_datauso);

            

            var xhr = new XMLHttpRequest();
            // Add any event handlers here...
            xhr.open('POST',rule, true);
            xhr.send(jobcardformdata);


            if(dadojobtype == "Callout"){

              setTimeout(function(){
                window.location.href="/manutencao/ttnumberhome/inprogress";
              }, 1000);

          }else{
            setTimeout(function(){
                window.location.href="/manutencao/preventativemaint/inprogress";
              }, 1000);
          }

            // setTimeout(function(){
            //   window.location.href="/manutencao/ttnumberhome/inprogress";
            // }, 1000);

          });

            }

        
    });

     $('#jobcard_item').change(function(){

      var dadosarmazem = JSON.parse($("#recolherdados").attr("detalhesarmazens"));
      var referencia1 = $(".sparesused").attr("data-user-name");
      var posicaostock = dadosarmazem.findIndex(x => x.nome === referencia1);

      $("#jobcard_quantityhave").val("");
      $("#jobcard_quantityhave").siblings('label').removeClass('active');

      var jobcard_item = $("#jobcard_item").val();

      for(var j = 0; j < dadosarmazem[posicaostock].disponibilidade.length; j++){

        if(dadosarmazem[posicaostock].disponibilidade[j].description_item == jobcard_item){
          $("#jobcard_quantityhave").val(dadosarmazem[posicaostock].disponibilidade[j].disponivel);
          $("#jobcard_quantityuse").attr("max",dadosarmazem[posicaostock].disponibilidade[j].disponivel);
          $("#jobcard_remaining").attr("max",dadosarmazem[posicaostock].disponibilidade[j].disponivel);
          $("#jobcard_quantityhave").siblings('label').addClass('active');
        }
      }

      $("#jobcard_quantityuse").val("");
      $("#jobcard_quantityuse").siblings('label').removeClass('active');

      $("#jobcard_remaining").val("");
      $("#jobcard_remaining").siblings('label').removeClass('active');
      

     });

     // $('#jobcard_quantityuse').on("keyup", function(){

     //    $("#jobcard_remaining").val("");
     //    $("#jobcard_remaining").siblings('label').removeClass('active');

     //    var jobcard_remaining = parseInt($("#jobcard_quantityhave").val()) - parseInt($("#jobcard_quantityuse").val());

     //    $("#jobcard_remaining").val(jobcard_remaining);
     //      $("#jobcard_remaining").siblings('label').addClass('active');

     // });

    $('#jobcard_healthsafety').change(function(){

      var op = document.getElementById("jobcard_healthsafety").value;

      if(op == "Yes"){

        $('.verrazaohs').removeClass('hide');

      }else{
        $('.verrazaohs').addClass('hide');
      }

    });

    $('#jobcard_healthsafety1').change(function(){
      var op = document.getElementById("jobcard_healthsafety1").value;

      if(op == "Yes"){
        $('#mostrarrazaoHS').removeClass('hide');
      }else{
        $('#mostrarrazaoHS').addClass('hide');
      }
    });


    $('.mostrardetalhesTravel').click(function(){

      var referencia = $(this).attr("data-user-new");

      var referenciaArray = $(this).attr("data-array-new");

       var dadosjobcard = JSON.parse($("#recolherdados2").attr("detalhejobcard"));


      // pegar os valores dda tabela/array/base de dados e colocar no pop up para editar/visualizar as infos
       $("#jobcard_sitearrivaldate").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_sitearrivaldate);
       $("#jobcard_sitearrivaldate").siblings('label').addClass('active');

       $("#jobcard_sitearrivaltime").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_sitearrivaltime);
       $("#jobcard_sitearrivaltime").siblings('label').addClass('active');

       $("#jobcard_remedialaction1").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_remedialaction);
       $("#jobcard_remedialaction1").siblings('label').addClass('active');

       $("div.jobcard_healthsafety11 select").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_healthsafety);
       var op = dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_healthsafety;
      
        if(op == "No"){
          $('#mostrarrazaoHS').addClass('hide');
        }else{
          $('#mostrarrazaoHS').removeClass('hide');
        }

       $("#jobcard_hsreason1").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_hsreason);
       $("#jobcard_hsreason1").siblings('label').addClass('active');

       $("#jobcard_sitedeparturedate").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_sitedeparturedate);
       $("#jobcard_sitedeparturedate").siblings('label').addClass('active');

       $("#jobcard_sitedeparturetime").val(dadosjobcard[0].travelinfoArrayJobcard[0].jobcard_sitedeparturetime);
       $("#jobcard_sitedeparturetime").siblings('label').addClass('active');


      $('#traveldetail_modal').openModal({dismissible:false});
      $('#traveldetail_cancel_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
      $('#traveldetail_yes_btn_modal').click(function(e){

        var jobcardformdata = new FormData();

        var rule="/manutencao/updatetabletravel";

        var jobcard_id = referencia;
        jobcardformdata.append("jobcard_id", jobcard_id);

        var jobcard_travelid = referenciaArray;
        jobcardformdata.append("jobcard_travelid", jobcard_travelid);

        var jobcard_remedialaction = $("#jobcard_remedialaction1").val();
        jobcardformdata.append("jobcard_remedialaction", jobcard_remedialaction);

        var jobcard_healthsafety = $("#jobcard_healthsafety1").val();
        jobcardformdata.append("jobcard_healthsafety", jobcard_healthsafety);

        var jobcard_hsreason;

        if(jobcard_healthsafety == "No"){
           jobcard_hsreason = "";
        }else{
          jobcard_hsreason = $("#jobcard_hsreason1").val();
        }
        
        jobcardformdata.append("jobcard_hsreason", jobcard_hsreason);

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST',rule, true);
        xhr.send(jobcardformdata);

        setTimeout(function(){
          window.location.href="/manutencao/detalhesJobcard/" + referencia;
        }, 1000);

      });

    });

    $('.mostrardetalhesGenerator').click(function(){

      var referencia = $(this).attr("data-user-new");

      var referenciaArray = $(this).attr("data-array-new");

      var posicaoelemento = $(this).attr("data-position-new");

       var dadosjobcard = JSON.parse($("#recolherdados2").attr("detalhejobcard"));

       var dadossitegenerator = JSON.parse($("#recolherdados3").attr("detalhesitegenerator"));

       var jobcard_generator = document.getElementById("jobcard_generator");
      while (jobcard_generator.options.length > 0) { 
        jobcard_generator.remove(0); 
      }

        var opt = document.createElement('option');
        opt.value = "Escolha a opção";
        opt.innerHTML = "Escolha a opção";
        opt.id = "primeiro";
        jobcard_generator.appendChild(opt);

       for(var j = 0; j < dadossitegenerator.length; j++){

            var opt = document.createElement('option');
            opt.value = dadossitegenerator[j].siteinfo_generatortype + ' - ' + dadossitegenerator[j].siteinfo_generatormodelno;
            opt.innerHTML = dadossitegenerator[j].siteinfo_generatortype + ' - ' + dadossitegenerator[j].siteinfo_generatormodelno;
            jobcard_generator.appendChild(opt);

       }

       $("#jobcard_generator").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_generator);

       $("#jobcard_currentgeneratorhours").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_currentgeneratorhours);
       $("#jobcard_currentgeneratorhours").siblings('label').addClass('active');

       $("#jobcard_generatorrefuel").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_generatorrefuel);
       $("#jobcard_generatorrefuel").siblings('label').addClass('active');

       $("#jobcard_litersoil").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_litersoil);
       $("#jobcard_litersoil").siblings('label').addClass('active');

       $("#jobcard_dsc").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_dsc);
       $("#jobcard_refuelreason").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_refuelreason);
       $("#jobcard_generatorbeenserviced").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_generatorbeenserviced);

      $('#mostrarPreviousHours').removeClass('hide');
      $("#jobcard_previousrefuelhrs").val(dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_previousrefuelhrs);
      $("#jobcard_previousrefuelhrs").siblings('label').addClass('active');

      $('#jobcardgenerator_update_btn_modal').removeClass('hide');
      $('#jobcardgenerator_yes_btn_modal').addClass('hide');
      $('#jobcardgenerator_modal').openModal({dismissible:false});
      $('#jobcardgenerator_cancel_btn_modal_').click(function(e){e.stopPropagation(); window.location.href="#";});
      $('#jobcardgenerator_update_btn_modal').click(function(e){

        var jobcardformdata = new FormData();

        var rule="/manutencao/updatetablegenerator";

        var jobcard_id = referencia;
        jobcardformdata.append("jobcard_id", jobcard_id);

        var jobcard_generatorid = referenciaArray;
        jobcardformdata.append("jobcard_generatorid", jobcard_generatorid);

        var jobcard_generatorposition = posicaoelemento ;
        jobcardformdata.append("jobcard_generatorposition", jobcard_generatorposition);

        var jobcard_generator = $("#jobcard_generator").val();;
        jobcardformdata.append("jobcard_generator", jobcard_generator);

        var jobcard_currentgeneratorhours = $("#jobcard_currentgeneratorhours").val();;
        jobcardformdata.append("jobcard_currentgeneratorhours", jobcard_currentgeneratorhours);

        var jobcard_previousrefuelhrs = dadosjobcard[0].generatorArrayJobcard[posicaoelemento].jobcard_previousrefuelhrs;
        jobcardformdata.append("jobcard_previousrefuelhrs", jobcard_previousrefuelhrs);

        var jobcard_generatorrefuel = $("#jobcard_generatorrefuel").val();;
        jobcardformdata.append("jobcard_generatorrefuel", jobcard_generatorrefuel);

        var jobcard_litersoil = $("#jobcard_litersoil").val();;
        jobcardformdata.append("jobcard_litersoil", jobcard_litersoil);

        var jobcard_dsc = $("#jobcard_dsc").val();;
        jobcardformdata.append("jobcard_dsc", jobcard_dsc);

        var jobcard_refuelreason = $("#jobcard_refuelreason").val();;
        jobcardformdata.append("jobcard_refuelreason", jobcard_refuelreason);

        var jobcard_generatorbeenserviced = $("#jobcard_generatorbeenserviced").val();;
        jobcardformdata.append("jobcard_generatorbeenserviced", jobcard_generatorbeenserviced);

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST',rule, true);
        xhr.send(jobcardformdata);

        setTimeout(function(){
          window.location.href="/manutencao/detalhesJobcard/" + referencia;
        }, 1000);

      });




    });
    

    $('.mostrardetalhesEquipment').click(function(){

      var referencia = $(this).attr("data-user-new");

      var referenciaArray = $(this).attr("data-array-new");

      var posicaoelemento = $(this).attr("data-position-new");

       var dadosjobcard = JSON.parse($("#recolherdados2").attr("detalhejobcard"));

       $("#jobcard_equiptype").val(dadosjobcard[0].equipamentoArrayJobcard[posicaoelemento].jobcard_equiptype);

       $("#jobcard_manufacturer").val(dadosjobcard[0].equipamentoArrayJobcard[posicaoelemento].jobcard_manufacturer);

       $("#jobcard_model").val(dadosjobcard[0].equipamentoArrayJobcard[posicaoelemento].jobcard_model);
       $("#jobcard_model").siblings('label').addClass('active');

       $("#jobcard_serialnumber").val(dadosjobcard[0].equipamentoArrayJobcard[posicaoelemento].jobcard_serialnumber);
       $("#jobcard_serialnumber").siblings('label').addClass('active');

       $("#jobcard_capacity").val(dadosjobcard[0].equipamentoArrayJobcard[posicaoelemento].jobcard_capacity);
       $("#jobcard_capacity").siblings('label').addClass('active');

       $("#jobcard_type").val(dadosjobcard[0].equipamentoArrayJobcard[posicaoelemento].jobcard_type);
       $("#jobcard_type").siblings('label').addClass('active');


       $('#jobcardequipment_update_btn_modal').removeClass('hide');
       $('#jobcardequipment_yes_btn_modal').addClass('hide');
       $('#jobcardequipment_modal').openModal({dismissible:false});
        $('#jobcardequipment_cancel_btn_modal_').click(function(e){
              e.stopPropagation();
              window.location.href="#";
        });

        $('#jobcardequipment_update_btn_modal').click(function(e){

          var jobcardformdata = new FormData();

          var rule="/manutencao/updatetableequipment";

          var jobcard_id = referencia;
          jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcard_equipmentid = referenciaArray;
          jobcardformdata.append("jobcard_equipmentid", jobcard_equipmentid);

          var jobcard_equipmentposition = posicaoelemento ;
          jobcardformdata.append("jobcard_equipmentposition", jobcard_equipmentposition);

          var jobcard_equiptype = $("#jobcard_equiptype").val();;
          jobcardformdata.append("jobcard_equiptype", jobcard_equiptype);

          var jobcard_manufacturer = $("#jobcard_manufacturer").val();;
          jobcardformdata.append("jobcard_manufacturer", jobcard_manufacturer);

          var jobcard_model = $("#jobcard_model").val();;
          jobcardformdata.append("jobcard_model", jobcard_model);

          var jobcard_serialnumber = $("#jobcard_serialnumber").val();;
          jobcardformdata.append("jobcard_serialnumber", jobcard_serialnumber);

          var jobcard_capacity = $("#jobcard_capacity").val();;
          jobcardformdata.append("jobcard_capacity", jobcard_capacity);

          var jobcard_type = $("#jobcard_type").val();;
          jobcardformdata.append("jobcard_type", jobcard_type);

          var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',rule, true);
          xhr.send(jobcardformdata);

          setTimeout(function(){
            window.location.href="/manutencao/detalhesJobcard/" + referencia;
          }, 1000);



        });


    });

    $('.mostrardetalhesSpares').click(function(){

        // var referencia = $(this).attr("data-user-new");
        // var item = $(this).attr("data-item-name");

        var dadosarmazem = JSON.parse($("#recolherdados2").attr("detalhesarmazens"));
        
         // var jobcard_item = document.getElementById("jobcard_item");

         //    while (jobcard_item.options.length > 0) { 
         //      jobcard_item.remove(0); 
         //    }

         //    var opt1 = document.createElement('option');
         //    opt1.value = "Escolha a opção";
         //    opt1.innerHTML = "Escolha a opção";
         //    opt1.id = "segundo";
         //   jobcard_item.appendChild(opt1);

         //    document.getElementById("segundo").selected = "true";
         //    document.getElementById("segundo").disabled = "true";

         // if(dadosarmazem.length != 0){
         //  for(var j = 0; j < dadosarmazem[0].disponibilidade.length; j++){
            

         //    var opt = document.createElement('option');
         //    opt.value = dadosarmazem[0].disponibilidade[j].description_item;
         //    opt.innerHTML = dadosarmazem[0].disponibilidade[j].description_item;
         //    jobcard_item.appendChild(opt);
         //    //console.log(dadosclientessite[i].sites[j]);
            
          
         //  }
         // }

       var posicaoelemento = $(this).attr("data-position-new");

       var dadosjobcard = JSON.parse($("#recolherdados2").attr("detalhejobcard"));

       $('#mostrarDataUso').removeClass('hide');

       var jobcard_item = document.getElementById("jobcard_item");

       var jobcard_item = document.getElementById("jobcard_item");

            while (jobcard_item.options.length > 0) { 
              jobcard_item.remove(0); 
            }

       var opt1 = document.createElement('option');
        opt1.value = "Escolha a opção";
        opt1.innerHTML = "Escolha a opção";
        opt1.id = "segundo";
       jobcard_item.appendChild(opt1);

        var opt = document.createElement('option');
        opt.value = dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_item;
        opt.innerHTML = dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_item;
        jobcard_item.appendChild(opt);


        $("#jobcard_item").val(dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_item);

       $("#jobcard_remaining").val(dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_remaining);
       $("#jobcard_remaining").siblings('label').addClass('active');

       $("#jobcard_quantityhave").val(dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_quantityhave);
       $("#jobcard_quantityhave").siblings('label').addClass('active');

       $("#jobcard_quantityuse").val(dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_quantityuse);
       $("#jobcard_quantityuse").siblings('label').addClass('active');

       $("#jobcard_datauso").val(dadosjobcard[0].sparesArrayJobcard[posicaoelemento].jobcard_datauso);
       $("#jobcard_datauso").siblings('label').addClass('active');

       $('#jobcardspares_yes_btn_modal').addClass('hide');
        $('#jobcardspares_modal').openModal({dismissible:false});
        $('#jobcardspares_cancel_btn_modal_').click(function(e){
              e.stopPropagation();
              window.location.href="#";
        });

        // $('#jobcardspares_yes_btn_modal').click(function(e){

        //   var jobcardformdata = new FormData();

        //   var rule="/manutencao/updatesparesused";

        //   var jobcard_id = referencia;
        //   jobcardformdata.append("jobcard_id", jobcard_id);

        //   var jobcard_tecniconome = referencia1;
        //   jobcardformdata.append("jobcard_tecniconome", jobcard_tecniconome);

        //   var jobcard_item = $("#jobcard_item").val();;
        //   jobcardformdata.append("jobcard_item", jobcard_item);

        //   // var posicaoitem = dadosarmazem[0].disponibilidade.findIndex(x => x.description_item === jobcard_item);

        //   // var referenciaItem = dadosarmazem[0].disponibilidade[posicaoitem]._id;
        //   // jobcardformdata.append("referenciaItem", referenciaItem);

        //   var jobcard_remaining = $("#jobcard_remaining").val();;
        //   jobcardformdata.append("jobcard_remaining", jobcard_remaining);

        //   var jobcard_quantityhave = $("#jobcard_quantityhave").val();;
        //   jobcardformdata.append("jobcard_quantityhave", jobcard_quantityhave);

        //   var jobcard_quantityuse = $("#jobcard_quantityuse").val();;
        //   jobcardformdata.append("jobcard_quantityuse", jobcard_quantityuse);

        //   var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
        //   var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
        //   var ano = (new Date()).getFullYear();
        //   var todaydate = dia + "/" + mes + "/" + ano;

        //   var jobcard_datauso = todaydate;
        //   jobcardformdata.append("jobcard_datauso", jobcard_datauso);

          

        //   var xhr = new XMLHttpRequest();
        //   // Add any event handlers here...
        //   xhr.open('POST',rule, true);
        //   xhr.send(jobcardformdata);

        //   setTimeout(function(){
        //     window.location.href="/manutencao/ttnumberhome/inprogress";
        //   }, 1000);

        // });

    });

    
    $('.signageModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardsignage_modal').openModal({dismissible:false});
      $('#jobcardsignage_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateSignageInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardsignage = {};

          jobcardsignage.jobcard_idpresent=$("input[name='jobcard_idpresent']:checked").val();
          jobcardsignage.jobcard_vmlogopresent=$("input[name='jobcard_vmlogopresent']:checked").val();
          jobcardsignage.jobcard_signnotice=$("input[name='jobcard_signnotice']:checked").val();
          jobcardsignage.jobcard_cautionladder=$("input[name='jobcard_cautionladder']:checked").val();
          jobcardsignage.jobcard_cautioncabletray=$("input[name='jobcard_cautioncabletray']:checked").val();
          jobcardsignage.jobcard_noticedoor=$("input[name='jobcard_noticedoor']:checked").val();
          jobcardsignage.jobcard_warningstick=$("input[name='jobcard_warningstick']:checked").val();
          jobcardsignage.jobcard_rooftopdoorlocked=$("input[name='jobcard_rooftopdoorlocked']:checked").val();
          jobcardsignage.jobcard_accesscontrolrooftop=$("input[name='jobcard_accesscontrolrooftop']:checked").val();
          jobcardsignage.jobcard_signagecomments=$("#jobcard_signagecomments").val();

          jobcardformdata.append("jobcardsignage", JSON.stringify(jobcardsignage));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.containerModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardcontainer_modal').openModal({dismissible:false});
      $('#jobcardcontainer_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateContainerInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardcontainer = {};

          jobcardcontainer.jobcard_containerligth=$("input[name='jobcard_containerligth']:checked").val();
          jobcardcontainer.jobcard_testemergency=$("input[name='jobcard_testemergency']:checked").val();
          jobcardcontainer.jobcard_powersockets=$("input[name='jobcard_powersockets']:checked").val();
          jobcardcontainer.jobcard_testearth=$("input[name='jobcard_testearth']:checked").val();
          jobcardcontainer.jobcard_circuitbreakers=$("input[name='jobcard_circuitbreakers']:checked").val();
          jobcardcontainer.jobcard_surgearrestors=$("input[name='jobcard_surgearrestors']:checked").val();
          jobcardcontainer.jobcard_electricalconnections=$("input[name='jobcard_electricalconnections']:checked").val();
          jobcardcontainer.jobcard_labelling=$("input[name='jobcard_labelling']:checked").val();
          jobcardcontainer.jobcard_earthconnections=$("input[name='jobcard_earthconnections']:checked").val();
          jobcardcontainer.jobcard_powerskirting=$("input[name='jobcard_powerskirting']:checked").val();
          

          jobcardformdata.append("jobcardcontainer", JSON.stringify(jobcardcontainer));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });


    $('.mastModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardmast_modal').openModal({dismissible:false});
      $('#jobcardmast_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateMastInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardmast = {};

          jobcardmast.jobcard_awlight=$("input[name='jobcard_awlight']:checked").val();
          jobcardmast.jobcard_connectligthswitches=$("input[name='jobcard_connectligthswitches']:checked").val();
          jobcardmast.jobcard_surgeprotection=$("input[name='jobcard_surgeprotection']:checked").val();
          jobcardmast.jobcard_cleaninside=$("input[name='jobcard_cleaninside']:checked").val();
          jobcardmast.jobcard_reportdamage=$("input[name='jobcard_cleaninside']:checked").val();
          jobcardmast.jobcard_sealentries=$("input[name='jobcard_sealentries']:checked").val();
          jobcardmast.jobcard_mountingsfeeders=$("input[name='jobcard_mountingsfeeders']:checked").val();
          jobcardmast.jobcard_rustcable=$("input[name='jobcard_rustcable']:checked").val();
          jobcardmast.jobcard_mastcomments=$("#jobcard_mastcomments").val();
          
          

          jobcardformdata.append("jobcardmast", JSON.stringify(jobcardmast));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });


    $('.cleaningModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardcleaning_modal').openModal({dismissible:false});
      $('#jobcardcleaning_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateCleaningInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardcleaning = {};

          jobcardcleaning.jobcard_servicefence=$("input[name='jobcard_servicefence']:checked").val();
          jobcardcleaning.jobcard_cleansite=$("input[name='jobcard_cleansite']:checked").val();
          jobcardcleaning.jobcard_cleanweed=$("input[name='jobcard_cleanweed']:checked").val();
          jobcardcleaning.jobcard_poisontreament=$("input[name='jobcard_poisontreament']:checked").val();
          jobcardcleaning.jobcard_removerubbish=$("input[name='jobcard_removerubbish']:checked").val();
          jobcardcleaning.jobcard_anydefects=$("input[name='jobcard_anydefects']:checked").val();
          jobcardcleaning.jobcard_cleaningcomments=$("#jobcard_cleaningcomments").val();
          
          

          jobcardformdata.append("jobcardcleaning", JSON.stringify(jobcardcleaning));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.locksModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardlocks_modal').openModal({dismissible:false});
      $('#jobcardlocks_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateLocksInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardlocks = {};

          jobcardlocks.jobcard_locksgate=$("input[name='jobcard_locksgate']:checked").val();
          jobcardlocks.jobcard_locksP3=$("input[name='jobcard_locksP3']:checked").val();
          jobcardlocks.jobcard_locksgenset=$("input[name='jobcard_locksgenset']:checked").val();
          jobcardlocks.jobcard_lockscontainer=$("input[name='jobcard_lockscontainer']:checked").val();
          jobcardlocks.jobcard_locksM3=$("input[name='jobcard_locksM3']:checked").val();
          jobcardlocks.jobcard_lockscomments=$("#jobcard_lockscomments").val();
          
          

          jobcardformdata.append("jobcardlocks", JSON.stringify(jobcardlocks));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.environmentalModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardenvironmental_modal').openModal({dismissible:false});
      $('#jobcardenvironmental_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateEnvironmentalInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardenvironmental = {};

          jobcardenvironmental.jobcard_siteerosion=$("input[name='jobcard_siteerosion']:checked").val();
          jobcardenvironmental.jobcard_groundcover=$("input[name='jobcard_groundcover']:checked").val();
          jobcardenvironmental.jobcard_oildiesel=$("input[name='jobcard_oildiesel']:checked").val();
          jobcardenvironmental.jobcard_overallsite=$("input[name='jobcard_overallsite']:checked").val();
          jobcardenvironmental.jobcard_environmentalcomments=$("#jobcard_environmentalcomments").val();
          
          

          jobcardformdata.append("jobcardenvironmental", JSON.stringify(jobcardenvironmental));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.fallarrestModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardfallarrest_modal').openModal({dismissible:false});
      $('#jobcardfallarrest_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateFallArrestInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardfallarrest = {};

          jobcardfallarrest.jobcard_visiblestate=$("input[name='jobcard_visiblestate']:checked").val();
          jobcardfallarrest.jobcard_fallarrestcomments=$("#jobcard_fallarrestcomments").val();
          
          

          jobcardformdata.append("jobcardfallarrest", JSON.stringify(jobcardfallarrest));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

     $('.generatorinfojobcardModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardgeneratorinfo_modal').openModal({dismissible:false});
      $('#jobcardgeneratorinfo_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateGenaratorInfoJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardgeneratorinfo = {};

          jobcardgeneratorinfo.jobcard_startupdelay=$("#jobcard_startupdelay").val();
          jobcardgeneratorinfo.jobcard_mainsrestore=$("#jobcard_mainsrestore").val();
          jobcardgeneratorinfo.jobcard_loadR=$("#jobcard_loadR").val();
          jobcardgeneratorinfo.jobcard_loadwhiteS=$("#jobcard_loadwhiteS").val();
          jobcardgeneratorinfo.jobcard_loadblueT=$("#jobcard_loadblueT").val();
          jobcardgeneratorinfo.jobcard_frequency=$("#jobcard_frequency").val();
          jobcardgeneratorinfo.jobcard_batteryvoltage=$("#jobcard_batteryvoltage").val();
          jobcardgeneratorinfo.jobcard_batterycharging=$("#jobcard_batterycharging").val();
          jobcardgeneratorinfo.jobcard_coolantlevel=$("input[name='jobcard_coolantlevel']:checked").val();
          jobcardgeneratorinfo.jobcard_oilpressure=$("#jobcard_oilpressure").val();
          jobcardgeneratorinfo.jobcard_generatorinfocomments=$("#jobcard_generatorinfocomments").val();
          jobcardgeneratorinfo.jobcard_oilfilter=$("input[name='jobcard_oilfilter']:checked").val();
          jobcardgeneratorinfo.jobcard_oillevel=$("input[name='jobcard_oillevel']:checked").val();
          jobcardgeneratorinfo.jobcard_oilleaks=$("input[name='jobcard_oilleaks']:checked").val();
          jobcardgeneratorinfo.jobcard_radiatorhoses=$("input[name='jobcard_radiatorhoses']:checked").val();
          jobcardgeneratorinfo.jobcard_airfilter=$("input[name='jobcard_airfilter']:checked").val();
          jobcardgeneratorinfo.jobcard_coolantleaks=$("input[name='jobcard_coolantleaks']:checked").val();
          jobcardgeneratorinfo.jobcard_fuelfilter=$("input[name='jobcard_fuelfilter']:checked").val();
          jobcardgeneratorinfo.jobcard_vbelt=$("input[name='jobcard_vbelt']:checked").val();
          jobcardgeneratorinfo.jobcard_fuelleaks=$("input[name='jobcard_fuelleaks']:checked").val();
          jobcardgeneratorinfo.jobcard_preruncontrol=$("input[name='jobcard_preruncontrol']:checked").val();
          jobcardgeneratorinfo.jobcard_chargeralarms=$("input[name='jobcard_chargeralarms']:checked").val();
          jobcardgeneratorinfo.jobcard_failmains=$("input[name='jobcard_failmains']:checked").val();
          jobcardgeneratorinfo.jobcard_abnormalvibrations=$("input[name='jobcard_abnormalvibrations']:checked").val();
          jobcardgeneratorinfo.jobcard_airflowradiator=$("input[name='jobcard_airflowradiator']:checked").val();
          jobcardgeneratorinfo.jobcard_waterpump=$("input[name='jobcard_waterpump']:checked").val();
          jobcardgeneratorinfo.jobcard_externalalarms=$("input[name='jobcard_externalalarms']:checked").val();
          jobcardgeneratorinfo.jobcard_testruncomments=$("#jobcard_testruncomments").val();
          jobcardgeneratorinfo.jobcard_switchauto=$("input[name='jobcard_switchauto']:checked").val();
          jobcardgeneratorinfo.jobcard_externalclear=$("input[name='jobcard_externalclear']:checked").val();
          jobcardgeneratorinfo.jobcard_postruncomments=$("#jobcard_postruncomments").val();

          
          
          

          jobcardformdata.append("jobcardgeneratorinfo", JSON.stringify(jobcardgeneratorinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    
    $('.edBoardModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardedBoard_modal').openModal({dismissible:false});
      $('#jobcardedBoard_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateedBoardJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardedBoardinfo = {};

          
          jobcardedBoardinfo.jobcard_tightenconnect=$("input[name='jobcard_tightenconnect']:checked").val();
          jobcardedBoardinfo.jobcard_energymeters=$("input[name='jobcard_energymeters']:checked").val();
          jobcardedBoardinfo.jobcard_unauthorizedconnect=$("input[name='jobcard_unauthorizedconnect']:checked").val();
          jobcardedBoardinfo.jobcard_holessealed=$("input[name='jobcard_holessealed']:checked").val();
          jobcardedBoardinfo.jobcard_sitelight=$("input[name='jobcard_sitelight']:checked").val();
          jobcardedBoardinfo.jobcard_meterbox=$("input[name='jobcard_meterbox']:checked").val();
          jobcardedBoardinfo.jobcard_autorearm=$("input[name='jobcard_autorearm']:checked").val();
          jobcardedBoardinfo.jobcard_edBoardcomments=$("#jobcard_edBoardcomments").val();

          
          
          

          jobcardformdata.append("jobcardedBoardinfo", JSON.stringify(jobcardedBoardinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });


    $('.electricalModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardelectrical_modal').openModal({dismissible:false});
      $('#jobcardelectrical_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateelectricalJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardelectricalinfo = {};

          
          jobcardelectricalinfo.jobcard_currentreadingsred=$("#jobcard_currentreadingsred").val();
          jobcardelectricalinfo.jobcard_currentreadingswhite=$("#jobcard_currentreadingswhite").val();
          jobcardelectricalinfo.jobcard_currentreadingsblue=$("#jobcard_currentreadingsblue").val();
          jobcardelectricalinfo.jobcard_currentreadingsneutral=$("#jobcard_currentreadingsneutral").val();
          jobcardelectricalinfo.jobcard_voltagereadingRW=$("#jobcard_voltagereadingRW").val();
          jobcardelectricalinfo.jobcard_voltagereadingRN=$("#jobcard_voltagereadingRN").val();
          jobcardelectricalinfo.jobcard_voltagereadingRE=$("#jobcard_voltagereadingRE").val();
          jobcardelectricalinfo.jobcard_voltagereadingRB=$("#jobcard_voltagereadingRB").val();
          jobcardelectricalinfo.jobcard_voltagereadingWN=$("#jobcard_voltagereadingWN").val();
          jobcardelectricalinfo.jobcard_voltagereadingWE=$("#jobcard_voltagereadingWE").val();
          jobcardelectricalinfo.jobcard_voltagereadingWB=$("#jobcard_voltagereadingWB").val();
          jobcardelectricalinfo.jobcard_voltagereadingBN=$("#jobcard_voltagereadingBN").val();
          jobcardelectricalinfo.jobcard_voltagereadingBE=$("#jobcard_voltagereadingBE").val();
          jobcardelectricalinfo.jobcard_voltagereadingNE=$("#jobcard_voltagereadingNE").val();
          jobcardelectricalinfo.jobcard_electricalcomments=$("#jobcard_electricalcomments").val();
          jobcardelectricalinfo.jobcard_earthleakage=$("input[name='jobcard_earthleakage']:checked").val();
          jobcardelectricalinfo.jobcard_earthohm=$("#jobcard_earthohm").val();
          jobcardelectricalinfo.jobcard_earthcomments=$("#jobcard_earthcomments").val();
          

          jobcardformdata.append("jobcardelectricalinfo", JSON.stringify(jobcardelectricalinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.rectifierModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardrectifier_modal').openModal({dismissible:false});
      $('#jobcardrectifier_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updaterectifierJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardrectifierinfo = {};

          
          jobcardrectifierinfo.jobcard_rectmake=$("#jobcard_rectmake").val();
          jobcardrectifierinfo.jobcard_opproperly=$("input[name='jobcard_opproperly']:checked").val();
          jobcardrectifierinfo.jobcard_slotspopulated=$("input[name='jobcard_slotspopulated']:checked").val();
          jobcardrectifierinfo.jobcard_parametersokay=$("input[name='jobcard_parametersokay']:checked").val();
          jobcardrectifierinfo.jobcard_systemupgrade=$("input[name='jobcard_systemupgrade']:checked").val();
          jobcardrectifierinfo.jobcard_slotsburn=$("input[name='jobcard_slotsburn']:checked").val();
          jobcardrectifierinfo.jobcard_supervisormodule=$("input[name='jobcard_supervisormodule']:checked").val();
          jobcardrectifierinfo.jobcard_lvdokay=$("input[name='jobcard_lvdokay']:checked").val();
          jobcardrectifierinfo.jobcard_pldokay=$("input[name='jobcard_pldokay']:checked").val();
          jobcardrectifierinfo.jobcard_AcDcCbOkay=$("input[name='jobcard_AcDcCbOkay']:checked").val();
          jobcardrectifierinfo.jobcard_alarmcommport=$("input[name='jobcard_alarmcommport']:checked").val();
          jobcardrectifierinfo.jobcard_rectifiercomments=$("#jobcard_rectifiercomments").val();
          
          

          jobcardformdata.append("jobcardrectifierinfo", JSON.stringify(jobcardrectifierinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.batterybanksModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardbatterybanks_modal').openModal({dismissible:false});
      $('#jobcardbatterybanks_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updatebatterybanksJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardbatterybanksinfo = {};

          //Battery Bank 1
            //Test 1
            jobcardbatterybanksinfo.jobcard_batterybank1_test1_cell1=$("#jobcard_batterybank1_test1_cell1").val();
            jobcardbatterybanksinfo.jobcard_batterybank1_test1_cell2=$("#jobcard_batterybank1_test1_cell2").val();
            jobcardbatterybanksinfo.jobcard_batterybank1_test1_cell3=$("#jobcard_batterybank1_test1_cell3").val();
            jobcardbatterybanksinfo.jobcard_batterybank1_test1_cell4=$("#jobcard_batterybank1_test1_cell4").val();
            
            //Test 2
            jobcardbatterybanksinfo.jobcard_batterybank1_test2_cell1=$("#jobcard_batterybank1_test2_cell1").val();
            jobcardbatterybanksinfo.jobcard_batterybank1_test2_cell2=$("#jobcard_batterybank1_test2_cell2").val();
            jobcardbatterybanksinfo.jobcard_batterybank1_test2_cell3=$("#jobcard_batterybank1_test2_cell3").val();
            jobcardbatterybanksinfo.jobcard_batterybank1_test2_cell4=$("#jobcard_batterybank1_test2_cell4").val();

          //Battery Bank 2
            //Test 1
            jobcardbatterybanksinfo.jobcard_batterybank2_test1_cell5=$("#jobcard_batterybank2_test1_cell5").val();
            jobcardbatterybanksinfo.jobcard_batterybank2_test1_cell6=$("#jobcard_batterybank2_test1_cell6").val();
            jobcardbatterybanksinfo.jobcard_batterybank2_test1_cell7=$("#jobcard_batterybank2_test1_cell7").val();
            jobcardbatterybanksinfo.jobcard_batterybank2_test1_cell8=$("#jobcard_batterybank2_test1_cell8").val();
            
            //Test 2
            jobcardbatterybanksinfo.jobcard_batterybank2_test2_cell5=$("#jobcard_batterybank2_test2_cell5").val();
            jobcardbatterybanksinfo.jobcard_batterybank2_test2_cell6=$("#jobcard_batterybank2_test2_cell6").val();
            jobcardbatterybanksinfo.jobcard_batterybank2_test2_cell7=$("#jobcard_batterybank2_test2_cell7").val();
            jobcardbatterybanksinfo.jobcard_batterybank2_test2_cell8=$("#jobcard_batterybank2_test2_cell8").val();


          //Battery Bank 3
            //Test 1
            jobcardbatterybanksinfo.jobcard_batterybank3_test1_cell9=$("#jobcard_batterybank3_test1_cell9").val();
            jobcardbatterybanksinfo.jobcard_batterybank3_test1_cell10=$("#jobcard_batterybank3_test1_cell10").val();
            jobcardbatterybanksinfo.jobcard_batterybank3_test1_cell11=$("#jobcard_batterybank3_test1_cell11").val();
            jobcardbatterybanksinfo.jobcard_batterybank3_test1_cell12=$("#jobcard_batterybank3_test1_cell12").val();
            
            //Test 2
            jobcardbatterybanksinfo.jobcard_batterybank3_test2_cell9=$("#jobcard_batterybank3_test2_cell9").val();
            jobcardbatterybanksinfo.jobcard_batterybank3_test2_cell10=$("#jobcard_batterybank3_test2_cell10").val();
            jobcardbatterybanksinfo.jobcard_batterybank3_test2_cell11=$("#jobcard_batterybank3_test2_cell11").val();
            jobcardbatterybanksinfo.jobcard_batterybank3_test2_cell12=$("#jobcard_batterybank3_test2_cell12").val();

           //Battery Bank 4
            //Test 1
            jobcardbatterybanksinfo.jobcard_batterybank4_test1_cell13=$("#jobcard_batterybank4_test1_cell13").val();
            jobcardbatterybanksinfo.jobcard_batterybank4_test1_cell14=$("#jobcard_batterybank4_test1_cell14").val();
            jobcardbatterybanksinfo.jobcard_batterybank4_test1_cell15=$("#jobcard_batterybank4_test1_cell15").val();
            jobcardbatterybanksinfo.jobcard_batterybank4_test1_cell16=$("#jobcard_batterybank4_test1_cell16").val();
            
            //Test 2
            jobcardbatterybanksinfo.jobcard_batterybank4_test2_cell13=$("#jobcard_batterybank4_test2_cell13").val();
            jobcardbatterybanksinfo.jobcard_batterybank4_test2_cell14=$("#jobcard_batterybank4_test2_cell14").val();
            jobcardbatterybanksinfo.jobcard_batterybank4_test2_cell15=$("#jobcard_batterybank4_test2_cell15").val();
            jobcardbatterybanksinfo.jobcard_batterybank4_test2_cell16=$("#jobcard_batterybank4_test2_cell16").val();

          //Battery Bank 5
            //Test 1
            jobcardbatterybanksinfo.jobcard_batterybank5_test1_cell17=$("#jobcard_batterybank5_test1_cell17").val();
            jobcardbatterybanksinfo.jobcard_batterybank5_test1_cell18=$("#jobcard_batterybank5_test1_cell18").val();
            jobcardbatterybanksinfo.jobcard_batterybank5_test1_cell19=$("#jobcard_batterybank5_test1_cell19").val();
            jobcardbatterybanksinfo.jobcard_batterybank5_test1_cell20=$("#jobcard_batterybank5_test1_cell20").val();
            
            //Test 2
            jobcardbatterybanksinfo.jobcard_batterybank5_test2_cell17=$("#jobcard_batterybank5_test2_cell17").val();
            jobcardbatterybanksinfo.jobcard_batterybank5_test2_cell18=$("#jobcard_batterybank5_test2_cell18").val();
            jobcardbatterybanksinfo.jobcard_batterybank5_test2_cell19=$("#jobcard_batterybank5_test2_cell19").val();
            jobcardbatterybanksinfo.jobcard_batterybank5_test2_cell20=$("#jobcard_batterybank5_test2_cell20").val();

          //Battery Bank 6
            //Test 1
            jobcardbatterybanksinfo.jobcard_batterybank6_test1_cell21=$("#jobcard_batterybank6_test1_cell21").val();
            jobcardbatterybanksinfo.jobcard_batterybank6_test1_cell22=$("#jobcard_batterybank6_test1_cell22").val();
            jobcardbatterybanksinfo.jobcard_batterybank6_test1_cell23=$("#jobcard_batterybank6_test1_cell23").val();
            jobcardbatterybanksinfo.jobcard_batterybank6_test1_cell24=$("#jobcard_batterybank6_test1_cell24").val();
            
            //Test 2
            jobcardbatterybanksinfo.jobcard_batterybank6_test2_cell21=$("#jobcard_batterybank6_test2_cell21").val();
            jobcardbatterybanksinfo.jobcard_batterybank6_test2_cell22=$("#jobcard_batterybank6_test2_cell22").val();
            jobcardbatterybanksinfo.jobcard_batterybank6_test2_cell23=$("#jobcard_batterybank6_test2_cell23").val();
            jobcardbatterybanksinfo.jobcard_batterybank6_test2_cell24=$("#jobcard_batterybank6_test2_cell24").val();
          
          

          jobcardformdata.append("jobcardbatterybanksinfo", JSON.stringify(jobcardbatterybanksinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.aircondModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardaircond_modal').openModal({dismissible:false});
      $('#jobcardaircond_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateaircondJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardaircondinfo = {};

          
          jobcardaircondinfo.jobcard_noisevibration=$("input[name='jobcard_noisevibration']:checked").val();
          jobcardaircondinfo.jobcard_cleanfilter=$("input[name='jobcard_cleanfilter']:checked").val();
          jobcardaircondinfo.jobcard_hightemperature=$("input[name='jobcard_hightemperature']:checked").val();
          jobcardaircondinfo.jobcard_operatingtime=$("input[name='jobcard_operatingtime']:checked").val();
          jobcardaircondinfo.jobcard_accooling=$("input[name='jobcard_accooling']:checked").val();
          jobcardaircondinfo.jobcard_acmodelcapacity=$("#jobcard_acmodelcapacity").val();
          jobcardaircondinfo.jobcard_accageinst=$("input[name='jobcard_accageinst']:checked").val();
          
          
          

          jobcardformdata.append("jobcardaircondinfo", JSON.stringify(jobcardaircondinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.antennasModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardantennas_modal').openModal({dismissible:false});
      $('#jobcardantennas_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateantennasJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardantennasinfo = {};

          
          jobcardantennasinfo.jobcard_antennasecure=$("input[name='jobcard_antennasecure']:checked").val();
          jobcardantennasinfo.jobcard_bracketscond=$("input[name='jobcard_bracketscond']:checked").val();
          jobcardantennasinfo.jobcard_clampcond=$("input[name='jobcard_clampcond']:checked").val();
          jobcardantennasinfo.jobcard_opticfibercond=$("input[name='jobcard_opticfibercond']:checked").val();
          jobcardantennasinfo.jobcard_rrucables=$("input[name='jobcard_rrucables']:checked").val();
          jobcardantennasinfo.jobcard_rrucond=$("input[name='jobcard_rrucond']:checked").val();
          jobcardantennasinfo.jobcard_aauearth=$("input[name='jobcard_aauearth']:checked").val();
          jobcardantennasinfo.jobcard_jumpercond=$("input[name='jobcard_jumpercond']:checked").val();
          jobcardantennasinfo.jobcard_dcducables=$("input[name='jobcard_dcducables']:checked").val();
          jobcardantennasinfo.jobcard_cablesdamages=$("input[name='jobcard_cablesdamages']:checked").val();
          jobcardantennasinfo.jobcard_opticLabels=$("input[name='jobcard_opticLabels']:checked").val();
          jobcardantennasinfo.jobcard_constructionradius=$("input[name='jobcard_constructionradius']:checked").val();
          jobcardantennasinfo.jobcard_radiocomments=$("#jobcard_radiocomments").val();
          
          
          

          jobcardformdata.append("jobcardantennasinfo", JSON.stringify(jobcardantennasinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.eainfoModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardeainfo_modal').openModal({dismissible:false});
      $('#jobcardeainfo_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateeainfoJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardeainfo = {};

          
          jobcardeainfo.jobcard_acmains=$("input[name='jobcard_acmains']:checked").val();
          jobcardeainfo.jobcard_ac1=$("input[name='jobcard_ac1']:checked").val();
          jobcardeainfo.jobcard_ac2=$("input[name='jobcard_ac2']:checked").val();
          jobcardeainfo.jobcard_doorswitch=$("input[name='jobcard_doorswitch']:checked").val();
          jobcardeainfo.jobcard_genabnormal=$("input[name='jobcard_genabnormal']:checked").val();
          jobcardeainfo.jobcard_genlowfuel=$("input[name='jobcard_genlowfuel']:checked").val();
          jobcardeainfo.jobcard_genrunning=$("input[name='jobcard_genrunning']:checked").val();
          jobcardeainfo.jobcard_rectmodule=$("input[name='jobcard_rectmodule']:checked").val();
          jobcardeainfo.jobcard_rectsystem=$("input[name='jobcard_rectsystem']:checked").val();
          jobcardeainfo.jobcard_hightemp=$("input[name='jobcard_hightemp']:checked").val();
          jobcardeainfo.jobcard_eainfocomments=$("#jobcard_eainfocomments").val();
          
          
          

          jobcardformdata.append("jobcardeainfo", JSON.stringify(jobcardeainfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.txinfoModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardtxinfo_modal').openModal({dismissible:false});
      $('#jobcardtxinfo_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updatetxinfoJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardtxinfo = {};

          
          jobcardtxinfo.jobcard_internalearth=$("input[name='jobcard_internalearth']:checked").val();
          jobcardtxinfo.jobcard_internelectconnect=$("input[name='jobcard_internelectconnect']:checked").val();
          jobcardtxinfo.jobcard_internallabels=$("input[name='jobcard_internallabels']:checked").val();
          jobcardtxinfo.jobcard_internalddf=$("input[name='jobcard_internalddf']:checked").val();
          jobcardtxinfo.jobcard_internalconnecttight=$("input[name='jobcard_internalconnecttight']:checked").val();
          jobcardtxinfo.jobcard_internalIFlabels=$("input[name='jobcard_internalIFlabels']:checked").val();
          jobcardtxinfo.jobcard_txinternalcomm=$("#jobcard_txinternalcomm").val();
          jobcardtxinfo.jobcard_externalbrackets=$("input[name='jobcard_externalbrackets']:checked").val();
          jobcardtxinfo.jobcard_externalnutstight=$("input[name='jobcard_externalnutstight']:checked").val();
          jobcardtxinfo.jobcard_externalearth=$("input[name='jobcard_externalearth']:checked").val();
          jobcardtxinfo.jobcard_externalIFconntight=$("input[name='jobcard_externalIFconntight']:checked").val();
          jobcardtxinfo.jobcard_externallabels=$("input[name='jobcard_externallabels']:checked").val();
          jobcardtxinfo.jobcard_externalwaterproof=$("input[name='jobcard_externalwaterproof']:checked").val();
          jobcardtxinfo.jobcard_externalcomm=$("#jobcard_externalcomm").val();
          
          
          
          

          jobcardformdata.append("jobcardtxinfo", JSON.stringify(jobcardtxinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.vsatinfoModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardvsatinfo_modal').openModal({dismissible:false});
      $('#jobcardvsatinfo_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updatevsatinfoJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          var jobcardvsatinfo = {};

          
          
          
          jobcardvsatinfo.jobcard_vsatlinkfrom=$("#jobcard_vsatlinkfrom").val();
          jobcardvsatinfo.jobcard_vsatlinkto=$("#jobcard_vsatlinkto").val();
          jobcardvsatinfo.jobcard_ebno=$("#jobcard_ebno").val();
          jobcardvsatinfo.jobcard_txlevel=$("#jobcard_txlevel").val();
          jobcardvsatinfo.jobcard_equipmentlabels=$("input[name='jobcard_equipmentlabels']:checked").val();
          jobcardvsatinfo.jobcard_cableslabels=$("input[name='jobcard_cableslabels']:checked").val();
          jobcardvsatinfo.jobcard_entrysealed=$("input[name='jobcard_entrysealed']:checked").val();
          jobcardvsatinfo.jobcard_conduittrunksclean=$("input[name='jobcard_conduittrunksclean']:checked").val();
          jobcardvsatinfo.jobcard_230vrecLN=$("#jobcard_230vrecLN").val();
          jobcardvsatinfo.jobcard_230vrecLE=$("#jobcard_230vrecLE").val();
          jobcardvsatinfo.jobcard_230vrecNE=$("#jobcard_230vrecNE").val();
          jobcardvsatinfo.jobcard_230vrecEEBar=$("#jobcard_230vrecEEBar").val();
          jobcardvsatinfo.jobcard_downloadmodemconfig=$("input[name='jobcard_downloadmodemconfig']:checked").val();
          jobcardvsatinfo.jobcard_checkplugsconntight=$("input[name='jobcard_checkplugsconntight']:checked").val();
          jobcardvsatinfo.jobcard_checkdishplunthclean=$("input[name='jobcard_checkdishplunthclean']:checked").val();
          jobcardvsatinfo.jobcard_checkdishcracksagg=$("input[name='jobcard_checkdishcracksagg']:checked").val();
          jobcardvsatinfo.jobcard_checkgalvaniseditems=$("input[name='jobcard_checkgalvaniseditems']:checked").val();
          jobcardvsatinfo.jobcard_checkdishdentsbumpsplit=$("input[name='jobcard_checkdishdentsbumpsplit']:checked").val();
          jobcardvsatinfo.jobcard_checkfanintsakevent=$("input[name='jobcard_checkfanintsakevent']:checked").val();
          jobcardvsatinfo.jobcard_checkdishearthdensorpaste=$("input[name='jobcard_checkdishearthdensorpaste']:checked").val();
          jobcardvsatinfo.jobcard_checkdishtight=$("input[name='jobcard_checkdishtight']:checked").val();
          jobcardvsatinfo.jobcard_checkconnsealed=$("input[name='jobcard_checkconnsealed']:checked").val();
          jobcardvsatinfo.jobcard_checkentrysealed=$("input[name='jobcard_checkentrysealed']:checked").val();
          jobcardvsatinfo.jobcard_checksignalpathobst=$("input[name='jobcard_checksignalpathobst']:checked").val();
          jobcardvsatinfo.jobcard_vsatcomments=$("input[name='jobcard_vsatcomments']:checked").val();
          
          
          

          jobcardformdata.append("jobcardvsatinfo", JSON.stringify(jobcardvsatinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.photoModal').click(function(){

      var referencia = $(this).attr("dataref");
      // var tws = $(this).attr("teste");
      // console.log(tws);

      $('#jobcardphotoinfo_modal').openModal({dismissible:false});
      $('#jobcardphotoinfo_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updatephotoinfoJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);

          

          
          var jobcardphotoinfo = arrJobcard_photoMaint;
          if(jobcardphotoinfo.length!=0){
            for(let i = 0, j = jobcardphotoinfo.length; i<j;i++){
              jobcardformdata.append('jobcardphotoinfo', jobcardphotoinfo[i]);
            }
          }


          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.concernsModal').click(function(){

      var referencia = $(this).attr("dataref");
      console.log(referencia);

      $('#jobcardconcernsinfo_modal').openModal({dismissible:false});
      $('#jobcardconcernsinfo_yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

          var jobcardformdata = new FormData();

          var rule="/manutencao/updateconcernsinfoJobcardInfo/" + referencia;

          // var jobcard_id = referencia;
          // jobcardformdata.append("jobcard_id", jobcard_id);
          var jobcardconcernsinfo = {};
          
          jobcardconcernsinfo.jobcard_concernsmaintnumber=$("#jobcard_concernsmaintnumber").val();
          jobcardconcernsinfo.jobcard_concernstype=$("#jobcard_concernstype").val();
          jobcardconcernsinfo.jobcard_concernsdescription=$("#jobcard_concernsdescription").val();
          jobcardconcernsinfo.jobcard_concernsdate=$("#jobcard_concernsdate").val();
          jobcardconcernsinfo.jobcard_concernsacknowledged=$("#jobcard_concernsacknowledged").val();
          
          jobcardformdata.append("jobcardconcernsinfo", JSON.stringify(jobcardconcernsinfo));

          var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(jobcardformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/manutencao/menuMaintPlan/" + referencia;
            }, 1000);


      });


    });

    $('.voltaraomenuprev').click(function(){

      window.location.href="/manutencao/preventativemaint/inprogress";

    });

    $('.signageModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardsignage");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Sinalização não disponível':'Signage information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardsignage = JSON.parse($(this).attr("datajobcardsignage"));

        var jobcard_idpresent = detalhesjobcardsignage.jobcard_idpresent;
        if(jobcard_idpresent == "ok"){
          document.getElementById("jobcard_idpresentok").checked = true;
          document.getElementById("jobcard_idpresentnotok").disabled = true;
          document.getElementById("jobcard_idpresentna").disabled = true;
        }else
          if(jobcard_idpresent == "not ok"){
            document.getElementById("jobcard_idpresentok").disabled = true;
            document.getElementById("jobcard_idpresentnotok").checked = true;
            document.getElementById("jobcard_idpresentna").disabled = true;
          }else{
            document.getElementById("jobcard_idpresentok").disabled = true;
            document.getElementById("jobcard_idpresentnotok").disabled = true;
            document.getElementById("jobcard_idpresentna").checked = true;
          }


        var jobcard_vmlogopresent = detalhesjobcardsignage.jobcard_vmlogopresent;
        if(jobcard_idpresent == "ok"){
          document.getElementById("jobcard_vmlogopresentok").checked = true;
          document.getElementById("jobcard_vmlogopresentnotok").disabled = true;
          document.getElementById("jobcard_vmlogopresentna").disabled = true;
        }else
          if(jobcard_idpresent == "not ok"){
            document.getElementById("jobcard_vmlogopresentok").disabled = true;
            document.getElementById("jobcard_vmlogopresentnotok").checked = true;
            document.getElementById("jobcard_vmlogopresentna").disabled = true;
          }else{
            document.getElementById("jobcard_vmlogopresentok").disabled = true;
            document.getElementById("jobcard_vmlogopresentnotok").disabled = true;
            document.getElementById("jobcard_vmlogopresentna").checked = true;
          }

        var jobcard_vmlogopresent = detalhesjobcardsignage.jobcard_vmlogopresent;
        if(jobcard_vmlogopresent == "ok"){
          document.getElementById("jobcard_vmlogopresentok").checked = true;
          document.getElementById("jobcard_vmlogopresentnotok").disabled = true;
          document.getElementById("jobcard_vmlogopresentna").disabled = true;
        }else
          if(jobcard_vmlogopresent == "not ok"){
            document.getElementById("jobcard_vmlogopresentok").disabled = true;
            document.getElementById("jobcard_vmlogopresentnotok").checked = true;
            document.getElementById("jobcard_vmlogopresentna").disabled = true;
          }else{
            document.getElementById("jobcard_vmlogopresentok").disabled = true;
            document.getElementById("jobcard_vmlogopresentnotok").disabled = true;
            document.getElementById("jobcard_vmlogopresentna").checked = true;
          }

        var jobcard_signnotice = detalhesjobcardsignage.jobcard_signnotice;
        if(jobcard_signnotice == "ok"){
          document.getElementById("jobcard_signnoticeok").checked = true;
          document.getElementById("jobcard_signnoticenotok").disabled = true;
          document.getElementById("jobcard_signnoticena").disabled = true;
        }else
          if(jobcard_signnotice == "not ok"){
            document.getElementById("jobcard_signnoticeok").disabled = true;
            document.getElementById("jobcard_signnoticenotok").checked = true;
            document.getElementById("jobcard_signnoticena").disabled = true;
          }else{
            document.getElementById("jobcard_signnoticeok").disabled = true;
            document.getElementById("jobcard_signnoticenotok").disabled = true;
            document.getElementById("jobcard_signnoticena").checked = true;
          }


        var jobcard_cautionladder = detalhesjobcardsignage.jobcard_cautionladder;
        if(jobcard_cautionladder == "ok"){
          document.getElementById("jobcard_cautionladderok").checked = true;
          document.getElementById("jobcard_cautionladdernotok").disabled = true;
          document.getElementById("jobcard_cautionladderna").disabled = true;
        }else
          if(jobcard_cautionladder == "not ok"){
            document.getElementById("jobcard_cautionladderok").disabled = true;
            document.getElementById("jobcard_cautionladdernotok").checked = true;
            document.getElementById("jobcard_cautionladderna").disabled = true;
          }else{
            document.getElementById("jobcard_cautionladderok").disabled = true;
            document.getElementById("jobcard_cautionladdernotok").disabled = true;
            document.getElementById("jobcard_cautionladderna").checked = true;
          }

        var jobcard_cautioncabletray = detalhesjobcardsignage.jobcard_cautioncabletray;
        if(jobcard_cautioncabletray == "ok"){
          document.getElementById("jobcard_cautioncabletrayok").checked = true;
          document.getElementById("jobcard_cautioncabletraynotok").disabled = true;
          document.getElementById("jobcard_cautioncabletrayna").disabled = true;
        }else
          if(jobcard_cautioncabletray == "not ok"){
            document.getElementById("jobcard_cautioncabletrayok").disabled = true;
            document.getElementById("jobcard_cautioncabletraynotok").checked = true;
            document.getElementById("jobcard_cautioncabletrayna").disabled = true;
          }else{
            document.getElementById("jobcard_cautioncabletrayok").disabled = true;
            document.getElementById("jobcard_cautioncabletraynotok").disabled = true;
            document.getElementById("jobcard_cautioncabletrayna").checked = true;
          }

        var jobcard_noticedoor = detalhesjobcardsignage.jobcard_noticedoor;
        if(jobcard_noticedoor == "ok"){
          document.getElementById("jobcard_noticedoorok").checked = true;
          document.getElementById("jobcard_noticedoornotok").disabled = true;
          document.getElementById("jobcard_noticedoorna").disabled = true;
        }else
          if(jobcard_noticedoor == "not ok"){
            document.getElementById("jobcard_noticedoorok").disabled = true;
            document.getElementById("jobcard_noticedoornotok").checked = true;
            document.getElementById("jobcard_noticedoorna").disabled = true;
          }else{
            document.getElementById("jobcard_noticedoorok").disabled = true;
            document.getElementById("jobcard_noticedoornotok").disabled = true;
            document.getElementById("jobcard_noticedoorna").checked = true;
          }


        var jobcard_warningstick = detalhesjobcardsignage.jobcard_warningstick;
        if(jobcard_warningstick == "ok"){
          document.getElementById("jobcard_warningstickok").checked = true;
          document.getElementById("jobcard_warningsticknotok").disabled = true;
          document.getElementById("jobcard_warningstickna").disabled = true;
        }else
          if(jobcard_warningstick == "not ok"){
            document.getElementById("jobcard_warningstickok").disabled = true;
            document.getElementById("jobcard_warningsticknotok").checked = true;
            document.getElementById("jobcard_warningstickna").disabled = true;
          }else{
            document.getElementById("jobcard_warningstickok").disabled = true;
            document.getElementById("jobcard_warningsticknotok").disabled = true;
            document.getElementById("jobcard_warningstickna").checked = true;
          }


        var jobcard_rooftopdoorlocked = detalhesjobcardsignage.jobcard_rooftopdoorlocked;
        if(jobcard_rooftopdoorlocked == "ok"){
          document.getElementById("jobcard_rooftopdoorlockedok").checked = true;
          document.getElementById("jobcard_rooftopdoorlockednotok").disabled = true;
          document.getElementById("jobcard_rooftopdoorlockedna").disabled = true;
        }else
          if(jobcard_rooftopdoorlocked == "not ok"){
            document.getElementById("jobcard_rooftopdoorlockedok").disabled = true;
            document.getElementById("jobcard_rooftopdoorlockednotok").checked = true;
            document.getElementById("jobcard_rooftopdoorlockedna").disabled = true;
          }else{
            document.getElementById("jobcard_rooftopdoorlockedok").disabled = true;
            document.getElementById("jobcard_rooftopdoorlockednotok").disabled = true;
            document.getElementById("jobcard_rooftopdoorlockedna").checked = true;
          }

        var jobcard_accesscontrolrooftop = detalhesjobcardsignage.jobcard_accesscontrolrooftop;
        if(jobcard_accesscontrolrooftop == "ok"){
          document.getElementById("jobcard_accesscontrolrooftopok").checked = true;
          document.getElementById("jobcard_accesscontrolrooftopnotok").disabled = true;
          document.getElementById("jobcard_accesscontrolrooftopna").disabled = true;
        }else
          if(jobcard_accesscontrolrooftop == "not ok"){
            document.getElementById("jobcard_accesscontrolrooftopok").disabled = true;
            document.getElementById("jobcard_accesscontrolrooftopnotok").checked = true;
            document.getElementById("jobcard_accesscontrolrooftopna").disabled = true;
          }else{
            document.getElementById("jobcard_accesscontrolrooftopok").disabled = true;
            document.getElementById("jobcard_accesscontrolrooftopnotok").disabled = true;
            document.getElementById("jobcard_accesscontrolrooftopna").checked = true;
          }

          var jobcard_signagecomments = detalhesjobcardsignage.jobcard_signagecomments;
          $("#jobcard_signagecomments").val(jobcard_signagecomments);
          $("#jobcard_signagecomments").siblings('label').removeClass('active');

        $('#jobcardsignage_modal').openModal({dismissible:false});
        $('#jobcardsignage_yes_btn_modal').addClass('hide')
      }
      


    });


    $('.containerModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardcontainer");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Contentor não disponível':'Container information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardcontainer = JSON.parse($(this).attr("datajobcardcontainer"));

        var jobcard_containerligth = detalhesjobcardcontainer.jobcard_containerligth;
        if(jobcard_containerligth == "ok"){
          document.getElementById("jobcard_containerligthok").checked = true;
          document.getElementById("jobcard_containerligthnotok").disabled = true;
          document.getElementById("jobcard_containerligthna").disabled = true;
        }else
          if(jobcard_containerligth == "not ok"){
            document.getElementById("jobcard_containerligthok").disabled = true;
            document.getElementById("jobcard_containerligthnotok").checked = true;
            document.getElementById("jobcard_containerligthna").disabled = true;
          }else{
            document.getElementById("jobcard_containerligthok").disabled = true;
            document.getElementById("jobcard_containerligthnotok").disabled = true;
            document.getElementById("jobcard_containerligthna").checked = true;
          }
        
          

        var jobcard_testemergency = detalhesjobcardcontainer.jobcard_testemergency;
        if(jobcard_testemergency == "ok"){
          document.getElementById("jobcard_testemergencyok").checked = true;
          document.getElementById("jobcard_testemergencynotok").disabled = true;
          document.getElementById("jobcard_testemergencyna").disabled = true;
        }else
          if(jobcard_testemergency == "not ok"){
            document.getElementById("jobcard_testemergencyok").disabled = true;
            document.getElementById("jobcard_testemergencynotok").checked = true;
            document.getElementById("jobcard_testemergencyna").disabled = true;
          }else{
            document.getElementById("jobcard_testemergencyok").disabled = true;
            document.getElementById("jobcard_testemergencynotok").disabled = true;
            document.getElementById("jobcard_testemergencyna").checked = true;
          }


        var jobcard_powersockets = detalhesjobcardcontainer.jobcard_powersockets;
        if(jobcard_powersockets == "ok"){
          document.getElementById("jobcard_powersocketsok").checked = true;
          document.getElementById("jobcard_powersocketsnotok").disabled = true;
          document.getElementById("jobcard_powersocketsna").disabled = true;
        }else
          if(jobcard_powersockets == "not ok"){
            document.getElementById("jobcard_powersocketsok").disabled = true;
            document.getElementById("jobcard_powersocketsnotok").checked = true;
            document.getElementById("jobcard_powersocketsna").disabled = true;
          }else{
            document.getElementById("jobcard_powersocketsok").disabled = true;
            document.getElementById("jobcard_powersocketsnotok").disabled = true;
            document.getElementById("jobcard_powersocketsna").checked = true;
          }


        var jobcard_testearth = detalhesjobcardcontainer.jobcard_testearth;
        if(jobcard_testearth == "ok"){
          document.getElementById("jobcard_testearthok").checked = true;
          document.getElementById("jobcard_testearthnotok").disabled = true;
          document.getElementById("jobcard_testearthna").disabled = true;
        }else
          if(jobcard_testearth == "not ok"){
            document.getElementById("jobcard_testearthok").disabled = true;
            document.getElementById("jobcard_testearthnotok").checked = true;
            document.getElementById("jobcard_testearthna").disabled = true;
          }else{
            document.getElementById("jobcard_testearthok").disabled = true;
            document.getElementById("jobcard_testearthnotok").disabled = true;
            document.getElementById("jobcard_testearthna").checked = true;
          }


        var jobcard_circuitbreakers = detalhesjobcardcontainer.jobcard_circuitbreakers;
        if(jobcard_circuitbreakers == "ok"){
          document.getElementById("jobcard_circuitbreakersok").checked = true;
          document.getElementById("jobcard_circuitbreakersnotok").disabled = true;
          document.getElementById("jobcard_circuitbreakersna").disabled = true;
        }else
          if(jobcard_circuitbreakers == "not ok"){
            document.getElementById("jobcard_circuitbreakersok").disabled = true;
            document.getElementById("jobcard_circuitbreakersnotok").checked = true;
            document.getElementById("jobcard_circuitbreakersna").disabled = true;
          }else{
            document.getElementById("jobcard_circuitbreakersok").disabled = true;
            document.getElementById("jobcard_circuitbreakersnotok").disabled = true;
            document.getElementById("jobcard_circuitbreakersna").checked = true;
          }

        var jobcard_surgearrestors = detalhesjobcardcontainer.jobcard_surgearrestors;
        if(jobcard_surgearrestors == "ok"){
          document.getElementById("jobcard_surgearrestorsok").checked = true;
          document.getElementById("jobcard_surgearrestorsnotok").disabled = true;
          document.getElementById("jobcard_surgearrestorsna").disabled = true;
        }else
          if(jobcard_surgearrestors == "not ok"){
            document.getElementById("jobcard_surgearrestorsok").disabled = true;
            document.getElementById("jobcard_surgearrestorsnotok").checked = true;
            document.getElementById("jobcard_surgearrestorsna").disabled = true;
          }else{
            document.getElementById("jobcard_surgearrestorsok").disabled = true;
            document.getElementById("jobcard_surgearrestorsnotok").disabled = true;
            document.getElementById("jobcard_surgearrestorsna").checked = true;
          }


        var jobcard_electricalconnections = detalhesjobcardcontainer.jobcard_electricalconnections;
        if(jobcard_electricalconnections == "ok"){
          document.getElementById("jobcard_electricalconnectionsok").checked = true;
          document.getElementById("jobcard_electricalconnectionsnotok").disabled = true;
          document.getElementById("jobcard_electricalconnectionsna").disabled = true;
        }else
          if(jobcard_electricalconnections == "not ok"){
            document.getElementById("jobcard_electricalconnectionsok").disabled = true;
            document.getElementById("jobcard_electricalconnectionsnotok").checked = true;
            document.getElementById("jobcard_electricalconnectionsna").disabled = true;
          }else{
            document.getElementById("jobcard_electricalconnectionsok").disabled = true;
            document.getElementById("jobcard_electricalconnectionsnotok").disabled = true;
            document.getElementById("jobcard_electricalconnectionsna").checked = true;
          }


        var jobcard_labelling = detalhesjobcardcontainer.jobcard_labelling;
        if(jobcard_labelling == "ok"){
          document.getElementById("jobcard_labellingok").checked = true;
          document.getElementById("jobcard_labellingnotok").disabled = true;
          document.getElementById("jobcard_labellingna").disabled = true;
        }else
          if(jobcard_labelling == "not ok"){
            document.getElementById("jobcard_labellingok").disabled = true;
            document.getElementById("jobcard_labellingnotok").checked = true;
            document.getElementById("jobcard_labellingna").disabled = true;
          }else{
            document.getElementById("jobcard_labellingok").disabled = true;
            document.getElementById("jobcard_labellingnotok").disabled = true;
            document.getElementById("jobcard_labellingna").checked = true;
          }

        var jobcard_earthconnections = detalhesjobcardcontainer.jobcard_earthconnections;
        if(jobcard_earthconnections == "ok"){
          document.getElementById("jobcard_earthconnectionsok").checked = true;
          document.getElementById("jobcard_earthconnectionsnotok").disabled = true;
          document.getElementById("jobcard_earthconnectionsna").disabled = true;
        }else
          if(jobcard_earthconnections == "not ok"){
            document.getElementById("jobcard_earthconnectionsok").disabled = true;
            document.getElementById("jobcard_earthconnectionsnotok").checked = true;
            document.getElementById("jobcard_earthconnectionsna").disabled = true;
          }else{
            document.getElementById("jobcard_earthconnectionsok").disabled = true;
            document.getElementById("jobcard_earthconnectionsnotok").disabled = true;
            document.getElementById("jobcard_earthconnectionsna").checked = true;
          }

        var jobcard_powerskirting = detalhesjobcardcontainer.jobcard_powerskirting;
        if(jobcard_powerskirting == "ok"){
          document.getElementById("jobcard_powerskirtingok").checked = true;
          document.getElementById("jobcard_powerskirtingnotok").disabled = true;
          document.getElementById("jobcard_powerskirtingna").disabled = true;
        }else
          if(jobcard_powerskirting == "not ok"){
            document.getElementById("jobcard_powerskirtingok").disabled = true;
            document.getElementById("jobcard_powerskirtingnotok").checked = true;
            document.getElementById("jobcard_powerskirtingna").disabled = true;
          }else{
            document.getElementById("jobcard_powerskirtingok").disabled = true;
            document.getElementById("jobcard_powerskirtingnotok").disabled = true;
            document.getElementById("jobcard_powerskirtingna").checked = true;
          }


          $('#jobcardcontainer_modal').openModal({dismissible:false});
          $('#jobcardcontainer_yes_btn_modal').addClass('hide');
        
        }


        
      
      


    });

    $('.mastModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardmast");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Mastro não disponível':'Mast information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardmast = JSON.parse($(this).attr("datajobcardmast"));

          var jobcard_awlight = detalhesjobcardmast.jobcard_awlight;
          if(jobcard_awlight == "ok"){
            document.getElementById("jobcard_awlightok").checked = true;
            document.getElementById("jobcard_awlightnotok").disabled = true;
            document.getElementById("jobcard_awlightna").disabled = true;
          }else
            if(jobcard_awlight == "not ok"){
              document.getElementById("jobcard_awlightok").disabled = true;
              document.getElementById("jobcard_awlightnotok").checked = true;
              document.getElementById("jobcard_awlightna").disabled = true;
            }else{
              document.getElementById("jobcard_awlightok").disabled = true;
              document.getElementById("jobcard_awlightnotok").disabled = true;
              document.getElementById("jobcard_awlightna").checked = true;
            }


          var jobcard_connectligthswitches = detalhesjobcardmast.jobcard_connectligthswitches;
          if(jobcard_connectligthswitches == "ok"){
            document.getElementById("jobcard_connectligthswitchesok").checked = true;
            document.getElementById("jobcard_connectligthswitchesnotok").disabled = true;
            document.getElementById("jobcard_connectligthswitchesna").disabled = true;
          }else
            if(jobcard_connectligthswitches == "not ok"){
              document.getElementById("jobcard_connectligthswitchesok").disabled = true;
              document.getElementById("jobcard_connectligthswitchesnotok").checked = true;
              document.getElementById("jobcard_connectligthswitchesna").disabled = true;
            }else{
              document.getElementById("jobcard_connectligthswitchesok").disabled = true;
              document.getElementById("jobcard_connectligthswitchesnotok").disabled = true;
              document.getElementById("jobcard_connectligthswitchesna").checked = true;
            }


          var jobcard_surgeprotection = detalhesjobcardmast.jobcard_surgeprotection;
          if(jobcard_surgeprotection == "ok"){
            document.getElementById("jobcard_surgeprotectionok").checked = true;
            document.getElementById("jobcard_surgeprotectionnotok").disabled = true;
            document.getElementById("jobcard_surgeprotectionna").disabled = true;
          }else
            if(jobcard_surgeprotection == "not ok"){
              document.getElementById("jobcard_surgeprotectionok").disabled = true;
              document.getElementById("jobcard_surgeprotectionnotok").checked = true;
              document.getElementById("jobcard_surgeprotectionna").disabled = true;
            }else{
              document.getElementById("jobcard_surgeprotectionok").disabled = true;
              document.getElementById("jobcard_surgeprotectionnotok").disabled = true;
              document.getElementById("jobcard_surgeprotectionna").checked = true;
            }


          var jobcard_cleaninside = detalhesjobcardmast.jobcard_cleaninside;
          if(jobcard_cleaninside == "ok"){
            document.getElementById("jobcard_cleaninsideok").checked = true;
            document.getElementById("jobcard_cleaninsidenotok").disabled = true;
            document.getElementById("jobcard_cleaninsidena").disabled = true;
          }else
            if(jobcard_cleaninside == "not ok"){
              document.getElementById("jobcard_cleaninsideok").disabled = true;
              document.getElementById("jobcard_cleaninsidenotok").checked = true;
              document.getElementById("jobcard_cleaninsidena").disabled = true;
            }else{
              document.getElementById("jobcard_cleaninsideok").disabled = true;
              document.getElementById("jobcard_cleaninsidenotok").disabled = true;
              document.getElementById("jobcard_cleaninsidena").checked = true;
            }


          var jobcard_reportdamage = detalhesjobcardmast.jobcard_reportdamage;
          if(jobcard_reportdamage == "ok"){
            document.getElementById("jobcard_reportdamageok").checked = true;
            document.getElementById("jobcard_reportdamagenotok").disabled = true;
            document.getElementById("jobcard_reportdamagena").disabled = true;
          }else
            if(jobcard_reportdamage == "not ok"){
              document.getElementById("jobcard_reportdamageok").disabled = true;
              document.getElementById("jobcard_reportdamagenotok").checked = true;
              document.getElementById("jobcard_reportdamagena").disabled = true;
            }else{
              document.getElementById("jobcard_reportdamageok").disabled = true;
              document.getElementById("jobcard_reportdamagenotok").disabled = true;
              document.getElementById("jobcard_reportdamagena").checked = true;
            }


          var jobcard_sealentries = detalhesjobcardmast.jobcard_sealentries;
          if(jobcard_sealentries == "ok"){
            document.getElementById("jobcard_sealentriesok").checked = true;
            document.getElementById("jobcard_sealentriesnotok").disabled = true;
            document.getElementById("jobcard_sealentriesna").disabled = true;
          }else
            if(jobcard_sealentries == "not ok"){
              document.getElementById("jobcard_sealentriesok").disabled = true;
              document.getElementById("jobcard_sealentriesnotok").checked = true;
              document.getElementById("jobcard_sealentriesna").disabled = true;
            }else{
              document.getElementById("jobcard_sealentriesok").disabled = true;
              document.getElementById("jobcard_sealentriesnotok").disabled = true;
              document.getElementById("jobcard_sealentriesna").checked = true;
            }


          var jobcard_mountingsfeeders = detalhesjobcardmast.jobcard_mountingsfeeders;
          if(jobcard_mountingsfeeders == "ok"){
            document.getElementById("jobcard_mountingsfeedersok").checked = true;
            document.getElementById("jobcard_mountingsfeedersnotok").disabled = true;
            document.getElementById("jobcard_mountingsfeedersna").disabled = true;
          }else
            if(jobcard_mountingsfeeders == "not ok"){
              document.getElementById("jobcard_mountingsfeedersok").disabled = true;
              document.getElementById("jobcard_mountingsfeedersnotok").checked = true;
              document.getElementById("jobcard_mountingsfeedersna").disabled = true;
            }else{
              document.getElementById("jobcard_mountingsfeedersok").disabled = true;
              document.getElementById("jobcard_mountingsfeedersnotok").disabled = true;
              document.getElementById("jobcard_mountingsfeedersna").checked = true;
            }


          var jobcard_rustcable = detalhesjobcardmast.jobcard_rustcable;
          if(jobcard_rustcable == "ok"){
            document.getElementById("jobcard_rustcableok").checked = true;
            document.getElementById("jobcard_rustcablesnotok").disabled = true;
            document.getElementById("jobcard_rustcablena").disabled = true;
          }else
            if(jobcard_rustcable == "not ok"){
              document.getElementById("jobcard_rustcableok").disabled = true;
              document.getElementById("jobcard_rustcablesnotok").checked = true;
              document.getElementById("jobcard_rustcablena").disabled = true;
            }else{
              document.getElementById("jobcard_rustcableok").disabled = true;
              document.getElementById("jobcard_rustcablesnotok").disabled = true;
              document.getElementById("jobcard_rustcablena").checked = true;
            }


          var jobcard_mastcomments = detalhesjobcardmast.jobcard_mastcomments;
          $("#jobcard_mastcomments").val(jobcard_mastcomments);
          $("#jobcard_mastcomments").siblings('label').removeClass('active');



          $('#jobcardmast_modal').openModal({dismissible:false});
          $('#jobcardmast_yes_btn_modal').addClass('hide');
        
        }


    });

    $('.cleaningModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardcleaning");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Mastro não disponível':'Mast information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardcleaning = JSON.parse($(this).attr("datajobcardcleaning"));

          var jobcard_servicefence = detalhesjobcardcleaning.jobcard_servicefence;
          if(jobcard_servicefence == "ok"){
            document.getElementById("jobcard_servicefenceok").checked = true;
            document.getElementById("jobcard_servicefencenotok").disabled = true;
            document.getElementById("jobcard_servicefencena").disabled = true;
          }else
            if(jobcard_servicefence == "not ok"){
              document.getElementById("jobcard_servicefenceok").disabled = true;
              document.getElementById("jobcard_servicefencenotok").checked = true;
              document.getElementById("jobcard_servicefencena").disabled = true;
            }else{
              document.getElementById("jobcard_servicefenceok").disabled = true;
              document.getElementById("jobcard_servicefencenotok").disabled = true;
              document.getElementById("jobcard_servicefencena").checked = true;
            }



          var jobcard_cleansite = detalhesjobcardcleaning.jobcard_cleansite;
          if(jobcard_cleansite == "ok"){
            document.getElementById("jobcard_cleansiteok").checked = true;
            document.getElementById("jobcard_cleansitenotok").disabled = true;
            document.getElementById("jobcard_cleansitena").disabled = true;
          }else
            if(jobcard_cleansite == "not ok"){
              document.getElementById("jobcard_cleansiteok").disabled = true;
              document.getElementById("jobcard_cleansitenotok").checked = true;
              document.getElementById("jobcard_cleansitena").disabled = true;
            }else{
              document.getElementById("jobcard_cleansiteok").disabled = true;
              document.getElementById("jobcard_cleansitenotok").disabled = true;
              document.getElementById("jobcard_cleansitena").checked = true;
            }


          var jobcard_cleanweed = detalhesjobcardcleaning.jobcard_cleanweed;
          if(jobcard_cleanweed == "ok"){
            document.getElementById("jobcard_cleanweedok").checked = true;
            document.getElementById("jobcard_cleanweednotok").disabled = true;
            document.getElementById("jobcard_cleanweedna").disabled = true;
          }else
            if(jobcard_cleanweed == "not ok"){
              document.getElementById("jobcard_cleanweedok").disabled = true;
              document.getElementById("jobcard_cleanweednotok").checked = true;
              document.getElementById("jobcard_cleanweedna").disabled = true;
            }else{
              document.getElementById("jobcard_cleanweedok").disabled = true;
              document.getElementById("jobcard_cleanweednotok").disabled = true;
              document.getElementById("jobcard_cleanweedna").checked = true;
            }


          var jobcard_poisontreament = detalhesjobcardcleaning.jobcard_poisontreament;
          if(jobcard_poisontreament == "ok"){
            document.getElementById("jobcard_poisontreamentok").checked = true;
            document.getElementById("jobcard_poisontreamentnotok").disabled = true;
            document.getElementById("jobcard_poisontreamentna").disabled = true;
          }else
            if(jobcard_poisontreament == "not ok"){
              document.getElementById("jobcard_poisontreamentok").disabled = true;
              document.getElementById("jobcard_poisontreamentnotok").checked = true;
              document.getElementById("jobcard_poisontreamentna").disabled = true;
            }else{
              document.getElementById("jobcard_poisontreamentok").disabled = true;
              document.getElementById("jobcard_poisontreamentnotok").disabled = true;
              document.getElementById("jobcard_poisontreamentna").checked = true;
            }


          var jobcard_removerubbish = detalhesjobcardcleaning.jobcard_removerubbish;
          if(jobcard_removerubbish == "ok"){
            document.getElementById("jobcard_removerubbishok").checked = true;
            document.getElementById("jobcard_removerubbishnotok").disabled = true;
            document.getElementById("jobcard_removerubbishna").disabled = true;
          }else
            if(jobcard_removerubbish == "not ok"){
              document.getElementById("jobcard_removerubbishok").disabled = true;
              document.getElementById("jobcard_removerubbishnotok").checked = true;
              document.getElementById("jobcard_removerubbishna").disabled = true;
            }else{
              document.getElementById("jobcard_removerubbishok").disabled = true;
              document.getElementById("jobcard_removerubbishnotok").disabled = true;
              document.getElementById("jobcard_removerubbishna").checked = true;
            }


          var jobcard_anydefects = detalhesjobcardcleaning.jobcard_anydefects;
          if(jobcard_anydefects == "ok"){
            document.getElementById("jobcard_anydefectsok").checked = true;
            document.getElementById("jobcard_anydefectsnotok").disabled = true;
            document.getElementById("jobcard_anydefectsna").disabled = true;
          }else
            if(jobcard_anydefects == "not ok"){
              document.getElementById("jobcard_anydefectsok").disabled = true;
              document.getElementById("jobcard_anydefectsnotok").checked = true;
              document.getElementById("jobcard_anydefectsna").disabled = true;
            }else{
              document.getElementById("jobcard_anydefectsok").disabled = true;
              document.getElementById("jobcard_anydefectsnotok").disabled = true;
              document.getElementById("jobcard_anydefectsna").checked = true;
            }


          var jobcard_cleaningcomments = detalhesjobcardcleaning.jobcard_cleaningcomments;
          $("#jobcard_cleaningcomments").val(jobcard_cleaningcomments);
          $("#jobcard_cleaningcomments").siblings('label').removeClass('active');



          $('#jobcardcleaning_modal').openModal({dismissible:false});
          $('#jobcardcleaning_yes_btn_modal').addClass('hide');
        
        }


    });


    $('.locksModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardlocks");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Fechaduras não disponível':'Locks information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardlocks = JSON.parse($(this).attr("datajobcardlocks"));

          
          var jobcard_locksgate = detalhesjobcardlocks.jobcard_locksgate;
          if(jobcard_locksgate == "ok"){
            document.getElementById("jobcard_locksgateok").checked = true;
            document.getElementById("jobcard_locksgatenotok").disabled = true;
            document.getElementById("jobcard_locksgatena").disabled = true;
          }else
            if(jobcard_locksgate == "not ok"){
              document.getElementById("jobcard_locksgateok").disabled = true;
              document.getElementById("jobcard_locksgatenotok").checked = true;
              document.getElementById("jobcard_locksgatena").disabled = true;
            }else{
              document.getElementById("jobcard_locksgateok").disabled = true;
              document.getElementById("jobcard_locksgatenotok").disabled = true;
              document.getElementById("jobcard_locksgatena").checked = true;
            }


          var jobcard_locksP3 = detalhesjobcardlocks.jobcard_locksP3;
          if(jobcard_locksP3 == "ok"){
            document.getElementById("jobcard_locksP3ok").checked = true;
            document.getElementById("jobcard_locksP3notok").disabled = true;
            document.getElementById("jobcard_locksP3na").disabled = true;
          }else
            if(jobcard_locksP3 == "not ok"){
              document.getElementById("jobcard_locksP3ok").disabled = true;
              document.getElementById("jobcard_locksP3notok").checked = true;
              document.getElementById("jobcard_locksP3na").disabled = true;
            }else{
              document.getElementById("jobcard_locksP3ok").disabled = true;
              document.getElementById("jobcard_locksP3notok").disabled = true;
              document.getElementById("jobcard_locksP3na").checked = true;
            }


          var jobcard_locksgenset = detalhesjobcardlocks.jobcard_locksgenset;
          if(jobcard_locksgenset == "ok"){
            document.getElementById("jobcard_locksgensetok").checked = true;
            document.getElementById("jobcard_locksgensetnotok").disabled = true;
            document.getElementById("jobcard_locksgensetna").disabled = true;
          }else
            if(jobcard_locksgenset == "not ok"){
              document.getElementById("jobcard_locksgensetok").disabled = true;
              document.getElementById("jobcard_locksgensetnotok").checked = true;
              document.getElementById("jobcard_locksgensetna").disabled = true;
            }else{
              document.getElementById("jobcard_locksgensetok").disabled = true;
              document.getElementById("jobcard_locksgensetnotok").disabled = true;
              document.getElementById("jobcard_locksgensetna").checked = true;
            }


          var jobcard_lockscontainer = detalhesjobcardlocks.jobcard_lockscontainer;
          if(jobcard_lockscontainer == "ok"){
            document.getElementById("jobcard_lockscontainerok").checked = true;
            document.getElementById("jobcard_lockscontainernotok").disabled = true;
            document.getElementById("jobcard_lockscontainerna").disabled = true;
          }else
            if(jobcard_lockscontainer == "not ok"){
              document.getElementById("jobcard_lockscontainerok").disabled = true;
              document.getElementById("jobcard_lockscontainernotok").checked = true;
              document.getElementById("jobcard_lockscontainerna").disabled = true;
            }else{
              document.getElementById("jobcard_lockscontainerok").disabled = true;
              document.getElementById("jobcard_lockscontainernotok").disabled = true;
              document.getElementById("jobcard_lockscontainerna").checked = true;
            }


          var jobcard_locksM3 = detalhesjobcardlocks.jobcard_locksM3;
          if(jobcard_locksM3 == "ok"){
            document.getElementById("jobcard_locksM3ok").checked = true;
            document.getElementById("jobcard_locksM3notok").disabled = true;
            document.getElementById("jobcard_locksM3na").disabled = true;
          }else
            if(jobcard_locksM3 == "not ok"){
              document.getElementById("jobcard_locksM3ok").disabled = true;
              document.getElementById("jobcard_locksM3notok").checked = true;
              document.getElementById("jobcard_locksM3na").disabled = true;
            }else{
              document.getElementById("jobcard_locksM3ok").disabled = true;
              document.getElementById("jobcard_locksM3notok").disabled = true;
              document.getElementById("jobcard_locksM3na").checked = true;
            }


          var jobcard_lockscomments = detalhesjobcardlocks.jobcard_lockscomments;
          $("#jobcard_lockscomments").val(jobcard_lockscomments);
          $("#jobcard_lockscomments").siblings('label').removeClass('active');


          $('#jobcardlocks_modal').openModal({dismissible:false});
          $('#jobcardlocks_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.environmentalModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardenvironmental");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Meio Ambiente não disponível':'Environmental information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardenvironmental = JSON.parse($(this).attr("datajobcardenvironmental"));

          var jobcard_siteerosion = detalhesjobcardenvironmental.jobcard_siteerosion;
          if(jobcard_siteerosion == "ok"){
            document.getElementById("jobcard_siteerosionok").checked = true;
            document.getElementById("jobcard_siteerosionnotok").disabled = true;
            document.getElementById("jobcard_siteerosionna").disabled = true;
          }else
            if(jobcard_siteerosion == "not ok"){
              document.getElementById("jobcard_siteerosionok").disabled = true;
              document.getElementById("jobcard_siteerosionnotok").checked = true;
              document.getElementById("jobcard_siteerosionna").disabled = true;
            }else{
              document.getElementById("jobcard_siteerosionok").disabled = true;
              document.getElementById("jobcard_siteerosionnotok").disabled = true;
              document.getElementById("jobcard_siteerosionna").checked = true;
            }


          var jobcard_groundcover = detalhesjobcardenvironmental.jobcard_groundcover;
          if(jobcard_groundcover == "ok"){
            document.getElementById("jobcard_groundcoverok").checked = true;
            document.getElementById("jobcard_groundcovernotok").disabled = true;
            document.getElementById("jobcard_groundcoverna").disabled = true;
          }else
            if(jobcard_groundcover == "not ok"){
              document.getElementById("jobcard_groundcoverok").disabled = true;
              document.getElementById("jobcard_groundcovernotok").checked = true;
              document.getElementById("jobcard_groundcoverna").disabled = true;
            }else{
              document.getElementById("jobcard_groundcoverok").disabled = true;
              document.getElementById("jobcard_groundcovernotok").disabled = true;
              document.getElementById("jobcard_groundcoverna").checked = true;
            }


          var jobcard_oildiesel = detalhesjobcardenvironmental.jobcard_oildiesel;
          if(jobcard_oildiesel == "ok"){
            document.getElementById("jobcard_oildieselok").checked = true;
            document.getElementById("jobcard_oildieselnotok").disabled = true;
            document.getElementById("jobcard_oildieselna").disabled = true;
          }else
            if(jobcard_oildiesel == "not ok"){
              document.getElementById("jobcard_oildieselok").disabled = true;
              document.getElementById("jobcard_oildieselnotok").checked = true;
              document.getElementById("jobcard_oildieselna").disabled = true;
            }else{
              document.getElementById("jobcard_oildieselok").disabled = true;
              document.getElementById("jobcard_oildieselnotok").disabled = true;
              document.getElementById("jobcard_oildieselna").checked = true;
            }


          var jobcard_overallsite = detalhesjobcardenvironmental.jobcard_overallsite;
          if(jobcard_overallsite == "ok"){
            document.getElementById("jobcard_overallsiteok").checked = true;
            document.getElementById("jobcard_overallsitenotok").disabled = true;
            document.getElementById("jobcard_overallsitena").disabled = true;
          }else
            if(jobcard_overallsite == "not ok"){
              document.getElementById("jobcard_overallsiteok").disabled = true;
              document.getElementById("jobcard_overallsitenotok").checked = true;
              document.getElementById("jobcard_overallsitena").disabled = true;
            }else{
              document.getElementById("jobcard_overallsiteok").disabled = true;
              document.getElementById("jobcard_overallsitenotok").disabled = true;
              document.getElementById("jobcard_overallsitena").checked = true;
            }

          var jobcard_environmentalcomments = detalhesjobcardenvironmental.jobcard_environmentalcomments;
          $("#jobcard_environmentalcomments").val(jobcard_environmentalcomments);
          $("#jobcard_environmentalcomments").siblings('label').removeClass('active');



          $('#jobcardenvironmental_modal').openModal({dismissible:false});
          $('#jobcardenvironmental_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.fallarrestModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardfallarrest");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Protecção contra queda não disponível':'Fall Arrest information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardfallarrest = JSON.parse($(this).attr("datajobcardfallarrest"));

          var jobcard_visiblestate = detalhesjobcardfallarrest.jobcard_visiblestate;
          if(jobcard_visiblestate == "ok"){
            document.getElementById("jobcard_visiblestateok").checked = true;
            document.getElementById("jobcard_visiblestatenotok").disabled = true;
            document.getElementById("jobcard_visiblestatena").disabled = true;
          }else
            if(jobcard_visiblestate == "not ok"){
              document.getElementById("jobcard_visiblestateok").disabled = true;
              document.getElementById("jobcard_visiblestatenotok").checked = true;
              document.getElementById("jobcard_visiblestatena").disabled = true;
            }else{
              document.getElementById("jobcard_visiblestateok").disabled = true;
              document.getElementById("jobcard_visiblestatenotok").disabled = true;
              document.getElementById("jobcard_visiblestatena").checked = true;
            }


          var jobcard_fallarrestcomments = detalhesjobcardfallarrest.jobcard_fallarrestcomments;
          $("#jobcard_fallarrestcomments").val(jobcard_fallarrestcomments);
          $("#jobcard_fallarrestcomments").siblings('label').removeClass('active');


          $('#jobcardfallarrest_modal').openModal({dismissible:false});
          $('#jobcardfallarrest_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.generatorinfojobcardModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardgeneratorinfo");
      console.log(comparador)

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Gerador não disponível':'Generator information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardgeneratorinfo = JSON.parse($(this).attr("datajobcardgeneratorinfo"));


          var jobcard_startupdelay = detalhesjobcardgeneratorinfo.jobcard_startupdelay;
          $("#jobcard_startupdelay").val(jobcard_startupdelay);
          $("#jobcard_startupdelay").siblings('label').removeClass('active');

          var jobcard_mainsrestore = detalhesjobcardgeneratorinfo.jobcard_mainsrestore;
          $("#jobcard_mainsrestore").val(jobcard_mainsrestore);
          $("#jobcard_mainsrestore").siblings('label').removeClass('active');


          var jobcard_loadR = detalhesjobcardgeneratorinfo.jobcard_loadR;
          $("#jobcard_loadR").val(jobcard_loadR);
          $("#jobcard_loadR").siblings('label').removeClass('active');


          var jobcard_loadwhiteS = detalhesjobcardgeneratorinfo.jobcard_loadwhiteS;
          $("#jobcard_loadwhiteS").val(jobcard_loadwhiteS);
          $("#jobcard_loadwhiteS").siblings('label').removeClass('active');


          var jobcard_loadblueT = detalhesjobcardgeneratorinfo.jobcard_loadblueT;
          $("#jobcard_loadblueT").val(jobcard_loadblueT);
          $("#jobcard_loadblueT").siblings('label').removeClass('active');


          var jobcard_frequency = detalhesjobcardgeneratorinfo.jobcard_frequency;
          $("#jobcard_frequency").val(jobcard_frequency);
          $("#jobcard_frequency").siblings('label').removeClass('active');


          var jobcard_batteryvoltage = detalhesjobcardgeneratorinfo.jobcard_batteryvoltage;
          $("#jobcard_batteryvoltage").val(jobcard_batteryvoltage);
          $("#jobcard_batteryvoltage").siblings('label').removeClass('active');

          
          var jobcard_batterycharging = detalhesjobcardgeneratorinfo.jobcard_batterycharging;
          $("#jobcard_batterycharging").val(jobcard_batterycharging);
          $("#jobcard_batterycharging").siblings('label').removeClass('active');


          var jobcard_coolantlevel = detalhesjobcardgeneratorinfo.jobcard_coolantlevel;
          if(jobcard_coolantlevel == "ok"){
            document.getElementById("jobcard_coolantlevelok").checked = true;
            document.getElementById("jobcard_coolantlevelnotok").disabled = true;
            document.getElementById("jobcard_coolantlevelna").disabled = true;
          }else
            if(jobcard_coolantlevel == "not ok"){
              document.getElementById("jobcard_coolantlevelok").disabled = true;
              document.getElementById("jobcard_coolantlevelnotok").checked = true;
              document.getElementById("jobcard_coolantlevelna").disabled = true;
            }else{
              document.getElementById("jobcard_coolantlevelok").disabled = true;
              document.getElementById("jobcard_coolantlevelnotok").disabled = true;
              document.getElementById("jobcard_coolantlevelna").checked = true;
            }


          var jobcard_oilpressure = detalhesjobcardgeneratorinfo.jobcard_oilpressure;
          $("#jobcard_oilpressure").val(jobcard_oilpressure);
          $("#jobcard_oilpressure").siblings('label').removeClass('active');


          var jobcard_generatorinfocomments = detalhesjobcardgeneratorinfo.jobcard_generatorinfocomments;
          $("#jobcard_generatorinfocomments").val(jobcard_generatorinfocomments);
          $("#jobcard_generatorinfocomments").siblings('label').removeClass('active');


          var jobcard_oilfilter = detalhesjobcardgeneratorinfo.jobcard_oilfilter;
          if(jobcard_oilfilter == "ok"){
            document.getElementById("jobcard_oilfilterok").checked = true;
            document.getElementById("jobcard_oilfilternotok").disabled = true;
            document.getElementById("jobcard_oilfilterna").disabled = true;
          }else
            if(jobcard_oilfilter == "not ok"){
              document.getElementById("jobcard_oilfilterok").disabled = true;
              document.getElementById("jobcard_oilfilternotok").checked = true;
              document.getElementById("jobcard_oilfilterna").disabled = true;
            }else{
              document.getElementById("jobcard_oilfilterok").disabled = true;
              document.getElementById("jobcard_oilfilternotok").disabled = true;
              document.getElementById("jobcard_oilfilterna").checked = true;
            }


          var jobcard_oillevel = detalhesjobcardgeneratorinfo.jobcard_oillevel;
          if(jobcard_oillevel == "ok"){
            document.getElementById("jobcard_oillevelok").checked = true;
            document.getElementById("jobcard_oillevelnotok").disabled = true;
            document.getElementById("jobcard_oillevelna").disabled = true;
          }else
            if(jobcard_oillevel == "not ok"){
              document.getElementById("jobcard_oillevelok").disabled = true;
              document.getElementById("jobcard_oillevelnotok").checked = true;
              document.getElementById("jobcard_oillevelna").disabled = true;
            }else{
              document.getElementById("jobcard_oillevelok").disabled = true;
              document.getElementById("jobcard_oillevelnotok").disabled = true;
              document.getElementById("jobcard_oillevelna").checked = true;
            }


          var jobcard_oilleaks = detalhesjobcardgeneratorinfo.jobcard_oilleaks;
          if(jobcard_oilleaks == "ok"){
            document.getElementById("jobcard_oilleaksok").checked = true;
            document.getElementById("jobcard_oilleaksnotok").disabled = true;
            document.getElementById("jobcard_oilleaksna").disabled = true;
          }else
            if(jobcard_oilleaks == "not ok"){
              document.getElementById("jobcard_oilleaksok").disabled = true;
              document.getElementById("jobcard_oilleaksnotok").checked = true;
              document.getElementById("jobcard_oilleaksna").disabled = true;
            }else{
              document.getElementById("jobcard_oilleaksok").disabled = true;
              document.getElementById("jobcard_oilleaksnotok").disabled = true;
              document.getElementById("jobcard_oilleaksna").checked = true;
            }


          var jobcard_radiatorhoses = detalhesjobcardgeneratorinfo.jobcard_radiatorhoses;
          if(jobcard_radiatorhoses == "ok"){
            document.getElementById("jobcard_radiatorhosesok").checked = true;
            document.getElementById("jobcard_radiatorhosesnotok").disabled = true;
            document.getElementById("jobcard_radiatorhosesna").disabled = true;
          }else
            if(jobcard_radiatorhoses == "not ok"){
              document.getElementById("jobcard_radiatorhosesok").disabled = true;
              document.getElementById("jobcard_radiatorhosesnotok").checked = true;
              document.getElementById("jobcard_radiatorhosesna").disabled = true;
            }else{
              document.getElementById("jobcard_radiatorhosesok").disabled = true;
              document.getElementById("jobcard_radiatorhosesnotok").disabled = true;
              document.getElementById("jobcard_radiatorhosesna").checked = true;
            }


          var jobcard_airfilter = detalhesjobcardgeneratorinfo.jobcard_airfilter;
          if(jobcard_airfilter == "ok"){
            document.getElementById("jobcard_airfilterok").checked = true;
            document.getElementById("jobcard_airfilternotok").disabled = true;
            document.getElementById("jobcard_airfilterna").disabled = true;
          }else
            if(jobcard_airfilter == "not ok"){
              document.getElementById("jobcard_airfilterok").disabled = true;
              document.getElementById("jobcard_airfilternotok").checked = true;
              document.getElementById("jobcard_airfilterna").disabled = true;
            }else{
              document.getElementById("jobcard_airfilterok").disabled = true;
              document.getElementById("jobcard_airfilternotok").disabled = true;
              document.getElementById("jobcard_airfilterna").checked = true;
            }



          var jobcard_coolantleaks = detalhesjobcardgeneratorinfo.jobcard_coolantleaks;
          if(jobcard_coolantleaks == "ok"){
            document.getElementById("jobcard_coolantleaksok").checked = true;
            document.getElementById("jobcard_coolantleaksnotok").disabled = true;
            document.getElementById("jobcard_coolantleaksna").disabled = true;
          }else
            if(jobcard_coolantleaks == "not ok"){
              document.getElementById("jobcard_coolantleaksok").disabled = true;
              document.getElementById("jobcard_coolantleaksnotok").checked = true;
              document.getElementById("jobcard_coolantleaksna").disabled = true;
            }else{
              document.getElementById("jobcard_coolantleaksok").disabled = true;
              document.getElementById("jobcard_coolantleaksnotok").disabled = true;
              document.getElementById("jobcard_coolantleaksna").checked = true;
            }


          var jobcard_fuelfilter = detalhesjobcardgeneratorinfo.jobcard_fuelfilter;
          if(jobcard_fuelfilter == "ok"){
            document.getElementById("jobcard_fuelfilterok").checked = true;
            document.getElementById("jobcard_fuelfilternotok").disabled = true;
            document.getElementById("jobcard_fuelfilterna").disabled = true;
          }else
            if(jobcard_fuelfilter == "not ok"){
              document.getElementById("jobcard_fuelfilterok").disabled = true;
              document.getElementById("jobcard_fuelfilternotok").checked = true;
              document.getElementById("jobcard_fuelfilterna").disabled = true;
            }else{
              document.getElementById("jobcard_fuelfilterok").disabled = true;
              document.getElementById("jobcard_fuelfilternotok").disabled = true;
              document.getElementById("jobcard_fuelfilterna").checked = true;
            }


          var jobcard_vbelt = detalhesjobcardgeneratorinfo.jobcard_vbelt;
          if(jobcard_vbelt == "ok"){
            document.getElementById("jobcard_vbeltok").checked = true;
            document.getElementById("jobcard_vbeltnotok").disabled = true;
            document.getElementById("jobcard_vbeltna").disabled = true;
          }else
            if(jobcard_vbelt == "not ok"){
              document.getElementById("jobcard_vbeltok").disabled = true;
              document.getElementById("jobcard_vbeltnotok").checked = true;
              document.getElementById("jobcard_vbeltna").disabled = true;
            }else{
              document.getElementById("jobcard_vbeltok").disabled = true;
              document.getElementById("jobcard_vbeltnotok").disabled = true;
              document.getElementById("jobcard_vbeltna").checked = true;
            }


          var jobcard_fuelleaks = detalhesjobcardgeneratorinfo.jobcard_fuelleaks;
          if(jobcard_fuelleaks == "ok"){
            document.getElementById("jobcard_fuelleaksok").checked = true;
            document.getElementById("jobcard_fuelleaksnotok").disabled = true;
            document.getElementById("jobcard_fuelleaksna").disabled = true;
          }else
            if(jobcard_fuelleaks == "not ok"){
              document.getElementById("jobcard_fuelleaksok").disabled = true;
              document.getElementById("jobcard_fuelleaksnotok").checked = true;
              document.getElementById("jobcard_fuelleaksna").disabled = true;
            }else{
              document.getElementById("jobcard_fuelleaksok").disabled = true;
              document.getElementById("jobcard_fuelleaksnotok").disabled = true;
              document.getElementById("jobcard_fuelleaksna").checked = true;
            }


          var jobcard_preruncontrol = detalhesjobcardgeneratorinfo.jobcard_preruncontrol;
          if(jobcard_preruncontrol == "ok"){
            document.getElementById("jobcard_preruncontrolok").checked = true;
            document.getElementById("jobcard_preruncontrolnotok").disabled = true;
            document.getElementById("jobcard_preruncontrolna").disabled = true;
          }else
            if(jobcard_preruncontrol == "not ok"){
              document.getElementById("jobcard_preruncontrolok").disabled = true;
              document.getElementById("jobcard_preruncontrolnotok").checked = true;
              document.getElementById("jobcard_preruncontrolna").disabled = true;
            }else{
              document.getElementById("jobcard_preruncontrolok").disabled = true;
              document.getElementById("jobcard_preruncontrolnotok").disabled = true;
              document.getElementById("jobcard_preruncontrolna").checked = true;
            }


          var jobcard_chargeralarms = detalhesjobcardgeneratorinfo.jobcard_chargeralarms;
          if(jobcard_chargeralarms == "ok"){
            document.getElementById("jobcard_chargeralarmsok").checked = true;
            document.getElementById("jobcard_chargeralarmsnotok").disabled = true;
            document.getElementById("jobcard_chargeralarmsna").disabled = true;
          }else
            if(jobcard_chargeralarms == "not ok"){
              document.getElementById("jobcard_chargeralarmsok").disabled = true;
              document.getElementById("jobcard_chargeralarmsnotok").checked = true;
              document.getElementById("jobcard_chargeralarmsna").disabled = true;
            }else{
              document.getElementById("jobcard_chargeralarmsok").disabled = true;
              document.getElementById("jobcard_chargeralarmsnotok").disabled = true;
              document.getElementById("jobcard_chargeralarmsna").checked = true;
            }


          var jobcard_failmains = detalhesjobcardgeneratorinfo.jobcard_failmains;
          if(jobcard_failmains == "ok"){
            document.getElementById("jobcard_failmainsok").checked = true;
            document.getElementById("jobcard_failmainsnotok").disabled = true;
            document.getElementById("jobcard_failmainsna").disabled = true;
          }else
            if(jobcard_failmains == "not ok"){
              document.getElementById("jobcard_failmainsok").disabled = true;
              document.getElementById("jobcard_failmainsnotok").checked = true;
              document.getElementById("jobcard_failmainsna").disabled = true;
            }else{
              document.getElementById("jobcard_failmainsok").disabled = true;
              document.getElementById("jobcard_failmainsnotok").disabled = true;
              document.getElementById("jobcard_failmainsna").checked = true;
            }


          var jobcard_abnormalvibrations = detalhesjobcardgeneratorinfo.jobcard_abnormalvibrations;
          if(jobcard_abnormalvibrations == "ok"){
            document.getElementById("jobcard_abnormalvibrationsok").checked = true;
            document.getElementById("jobcard_abnormalvibrationsnotok").disabled = true;
            document.getElementById("jobcard_abnormalvibrationsna").disabled = true;
          }else
            if(jobcard_abnormalvibrations == "not ok"){
              document.getElementById("jobcard_abnormalvibrationsok").disabled = true;
              document.getElementById("jobcard_abnormalvibrationsnotok").checked = true;
              document.getElementById("jobcard_abnormalvibrationsna").disabled = true;
            }else{
              document.getElementById("jobcard_abnormalvibrationsok").disabled = true;
              document.getElementById("jobcard_abnormalvibrationsnotok").disabled = true;
              document.getElementById("jobcard_abnormalvibrationsna").checked = true;
            }


          var jobcard_airflowradiator = detalhesjobcardgeneratorinfo.jobcard_airflowradiator;
          if(jobcard_airflowradiator == "ok"){
            document.getElementById("jobcard_airflowradiatorok").checked = true;
            document.getElementById("jobcard_airflowradiatornotok").disabled = true;
            document.getElementById("jobcard_airflowradiatorna").disabled = true;
          }else
            if(jobcard_airflowradiator == "not ok"){
              document.getElementById("jobcard_airflowradiatorok").disabled = true;
              document.getElementById("jobcard_airflowradiatornotok").checked = true;
              document.getElementById("jobcard_airflowradiatorna").disabled = true;
            }else{
              document.getElementById("jobcard_airflowradiatorok").disabled = true;
              document.getElementById("jobcard_airflowradiatornotok").disabled = true;
              document.getElementById("jobcard_airflowradiatorna").checked = true;
            }


          var jobcard_waterpump = detalhesjobcardgeneratorinfo.jobcard_waterpump;
          if(jobcard_waterpump == "ok"){
            document.getElementById("jobcard_waterpumpok").checked = true;
            document.getElementById("jobcard_waterpumpnotok").disabled = true;
            document.getElementById("jobcard_waterpumpna").disabled = true;
          }else
            if(jobcard_waterpump == "not ok"){
              document.getElementById("jobcard_waterpumpok").disabled = true;
              document.getElementById("jobcard_waterpumpnotok").checked = true;
              document.getElementById("jobcard_waterpumpna").disabled = true;
            }else{
              document.getElementById("jobcard_waterpumpok").disabled = true;
              document.getElementById("jobcard_waterpumpnotok").disabled = true;
              document.getElementById("jobcard_waterpumpna").checked = true;
            }

          var jobcard_externalalarms = detalhesjobcardgeneratorinfo.jobcard_externalalarms;
          if(jobcard_externalalarms == "ok"){
            document.getElementById("jobcard_externalalarmsok").checked = true;
            document.getElementById("jobcard_externalalarmsnotok").disabled = true;
            document.getElementById("jobcard_externalalarmsna").disabled = true;
          }else
            if(jobcard_externalalarms == "not ok"){
              document.getElementById("jobcard_externalalarmsok").disabled = true;
              document.getElementById("jobcard_externalalarmsnotok").checked = true;
              document.getElementById("jobcard_externalalarmsna").disabled = true;
            }else{
              document.getElementById("jobcard_externalalarmsok").disabled = true;
              document.getElementById("jobcard_externalalarmsnotok").disabled = true;
              document.getElementById("jobcard_externalalarmsna").checked = true;
            }


          var jobcard_testruncomments = detalhesjobcardgeneratorinfo.jobcard_testruncomments;
          $("#jobcard_testruncomments").val(jobcard_testruncomments);
          $("#jobcard_testruncomments").siblings('label').removeClass('active');


          var jobcard_switchauto = detalhesjobcardgeneratorinfo.jobcard_switchauto;
          if(jobcard_switchauto == "ok"){
            document.getElementById("jobcard_switchautook").checked = true;
            document.getElementById("jobcard_switchautonotok").disabled = true;
            document.getElementById("jobcard_switchautona").disabled = true;
          }else
            if(jobcard_switchauto == "not ok"){
              document.getElementById("jobcard_switchautook").disabled = true;
              document.getElementById("jobcard_switchautonotok").checked = true;
              document.getElementById("jobcard_switchautona").disabled = true;
            }else{
              document.getElementById("jobcard_switchautook").disabled = true;
              document.getElementById("jobcard_switchautonotok").disabled = true;
              document.getElementById("jobcard_switchautona").checked = true;
            }


          var jobcard_externalclear = detalhesjobcardgeneratorinfo.jobcard_externalclear;
          if(jobcard_externalclear == "ok"){
            document.getElementById("jobcard_externalclearok").checked = true;
            document.getElementById("jobcard_externalclearnotok").disabled = true;
            document.getElementById("jobcard_externalclearna").disabled = true;
          }else
            if(jobcard_externalclear == "not ok"){
              document.getElementById("jobcard_externalclearok").disabled = true;
              document.getElementById("jobcard_externalclearnotok").checked = true;
              document.getElementById("jobcard_externalclearna").disabled = true;
            }else{
              document.getElementById("jobcard_externalclearok").disabled = true;
              document.getElementById("jobcard_externalclearnotok").disabled = true;
              document.getElementById("jobcard_externalclearna").checked = true;
            }


          var jobcard_postruncomments = detalhesjobcardgeneratorinfo.jobcard_postruncomments;
          $("#jobcard_postruncomments").val(jobcard_testruncomments);
          $("#jobcard_postruncomments").siblings('label').removeClass('active');


          $('#jobcardgeneratorinfo_modal').openModal({dismissible:false});
          $('#jobcardgeneratorinfo_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.edBoardModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardedBoardinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre EDBoard não disponível':'EDBoard information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardedBoardinfo = JSON.parse($(this).attr("datajobcardedBoardinfo"));

          var jobcard_tightenconnect = detalhesjobcardedBoardinfo.jobcard_tightenconnect;
          if(jobcard_tightenconnect == "ok"){
            document.getElementById("jobcard_tightenconnectok").checked = true;
            document.getElementById("jobcard_tightenconnectnotok").disabled = true;
            document.getElementById("jobcard_tightenconnectna").disabled = true;
          }else
            if(jobcard_tightenconnect == "not ok"){
              document.getElementById("jobcard_tightenconnectok").disabled = true;
              document.getElementById("jobcard_tightenconnectnotok").checked = true;
              document.getElementById("jobcard_tightenconnectna").disabled = true;
            }else{
              document.getElementById("jobcard_tightenconnectok").disabled = true;
              document.getElementById("jobcard_tightenconnectnotok").disabled = true;
              document.getElementById("jobcard_tightenconnectna").checked = true;
            }


          var jobcard_energymeters = detalhesjobcardedBoardinfo.jobcard_energymeters;
          if(jobcard_energymeters == "ok"){
            document.getElementById("jobcard_energymetersok").checked = true;
            document.getElementById("jobcard_energymetersnotok").disabled = true;
            document.getElementById("jobcard_energymetersna").disabled = true;
          }else
            if(jobcard_energymeters == "not ok"){
              document.getElementById("jobcard_energymetersok").disabled = true;
              document.getElementById("jobcard_energymetersnotok").checked = true;
              document.getElementById("jobcard_energymetersna").disabled = true;
            }else{
              document.getElementById("jobcard_energymetersok").disabled = true;
              document.getElementById("jobcard_energymetersnotok").disabled = true;
              document.getElementById("jobcard_energymetersna").checked = true;
            }


          var jobcard_unauthorizedconnect = detalhesjobcardedBoardinfo.jobcard_unauthorizedconnect;
          if(jobcard_unauthorizedconnect == "ok"){
            document.getElementById("jobcard_unauthorizedconnectok").checked = true;
            document.getElementById("jobcard_unauthorizedconnectnotok").disabled = true;
            document.getElementById("jobcard_unauthorizedconnectna").disabled = true;
          }else
            if(jobcard_unauthorizedconnect == "not ok"){
              document.getElementById("jobcard_unauthorizedconnectok").disabled = true;
              document.getElementById("jobcard_unauthorizedconnectnotok").checked = true;
              document.getElementById("jobcard_unauthorizedconnectna").disabled = true;
            }else{
              document.getElementById("jobcard_unauthorizedconnectok").disabled = true;
              document.getElementById("jobcard_unauthorizedconnectnotok").disabled = true;
              document.getElementById("jobcard_unauthorizedconnectna").checked = true;
            }



          var jobcard_holessealed = detalhesjobcardedBoardinfo.jobcard_holessealed;
          if(jobcard_holessealed == "ok"){
            document.getElementById("jobcard_holessealedok").checked = true;
            document.getElementById("jobcard_holessealednotok").disabled = true;
            document.getElementById("jobcard_holessealedna").disabled = true;
          }else
            if(jobcard_holessealed == "not ok"){
              document.getElementById("jobcard_holessealedok").disabled = true;
              document.getElementById("jobcard_holessealednotok").checked = true;
              document.getElementById("jobcard_holessealedna").disabled = true;
            }else{
              document.getElementById("jobcard_holessealedok").disabled = true;
              document.getElementById("jobcard_holessealednotok").disabled = true;
              document.getElementById("jobcard_holessealedna").checked = true;
            }


          var jobcard_sitelight = detalhesjobcardedBoardinfo.jobcard_sitelight;
          if(jobcard_sitelight == "ok"){
            document.getElementById("jobcard_sitelightok").checked = true;
            document.getElementById("jobcard_sitelightnotok").disabled = true;
            document.getElementById("jobcard_sitelightna").disabled = true;
          }else
            if(jobcard_sitelight == "not ok"){
              document.getElementById("jobcard_sitelightok").disabled = true;
              document.getElementById("jobcard_sitelightnotok").checked = true;
              document.getElementById("jobcard_sitelightna").disabled = true;
            }else{
              document.getElementById("jobcard_sitelightok").disabled = true;
              document.getElementById("jobcard_sitelightnotok").disabled = true;
              document.getElementById("jobcard_sitelightna").checked = true;
            }


          var jobcard_meterbox = detalhesjobcardedBoardinfo.jobcard_meterbox;
          if(jobcard_meterbox == "ok"){
            document.getElementById("jobcard_meterboxok").checked = true;
            document.getElementById("jobcard_meterboxnotok").disabled = true;
            document.getElementById("jobcard_meterboxna").disabled = true;
          }else
            if(jobcard_meterbox == "not ok"){
              document.getElementById("jobcard_meterboxok").disabled = true;
              document.getElementById("jobcard_meterboxnotok").checked = true;
              document.getElementById("jobcard_meterboxna").disabled = true;
            }else{
              document.getElementById("jobcard_meterboxok").disabled = true;
              document.getElementById("jobcard_meterboxnotok").disabled = true;
              document.getElementById("jobcard_meterboxna").checked = true;
            }


          var jobcard_autorearm = detalhesjobcardedBoardinfo.jobcard_autorearm;
          if(jobcard_autorearm == "ok"){
            document.getElementById("jobcard_autorearmok").checked = true;
            document.getElementById("jobcard_autorearmnotok").disabled = true;
            document.getElementById("jobcard_autorearmna").disabled = true;
          }else
            if(jobcard_autorearm == "not ok"){
              document.getElementById("jobcard_autorearmok").disabled = true;
              document.getElementById("jobcard_autorearmnotok").checked = true;
              document.getElementById("jobcard_autorearmna").disabled = true;
            }else{
              document.getElementById("jobcard_autorearmok").disabled = true;
              document.getElementById("jobcard_autorearmnotok").disabled = true;
              document.getElementById("jobcard_autorearmna").checked = true;
            }


          var jobcard_edBoardcomments = detalhesjobcardedBoardinfo.jobcard_edBoardcomments;
          $("#jobcard_edBoardcomments").val(jobcard_edBoardcomments);
          $("#jobcard_edBoardcomments").siblings('label').removeClass('active');



          $('#jobcardedBoard_modal').openModal({dismissible:false});
          $('#jobcardedBoard_yes_btn_modal').addClass('hide');
        
        }

    });



    $('.electricalModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardelectricalinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação Eléctrica não disponível':'Electrical information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardelectricalinfo = JSON.parse($(this).attr("datajobcardelectricalinfo"));


          var jobcard_currentreadingsred = detalhesjobcardelectricalinfo.jobcard_currentreadingsred;
          $("#jobcard_currentreadingsred").val(jobcard_currentreadingsred);
          $("#jobcard_currentreadingsred").siblings('label').addClass('active');

          var jobcard_currentreadingswhite = detalhesjobcardelectricalinfo.jobcard_currentreadingswhite;
          $("#jobcard_currentreadingswhite").val(jobcard_currentreadingswhite);
          $("#jobcard_currentreadingswhite").siblings('label').addClass('active');

          var jobcard_currentreadingsblue = detalhesjobcardelectricalinfo.jobcard_currentreadingsblue;
          $("#jobcard_currentreadingsblue").val(jobcard_currentreadingsblue);
          $("#jobcard_currentreadingsblue").siblings('label').addClass('active');


          var jobcard_currentreadingsneutral = detalhesjobcardelectricalinfo.jobcard_currentreadingsneutral;
          $("#jobcard_currentreadingsneutral").val(jobcard_currentreadingsneutral);
          $("#jobcard_currentreadingsneutral").siblings('label').addClass('active');


          var jobcard_voltagereadingRW = detalhesjobcardelectricalinfo.jobcard_voltagereadingRW;
          $("#jobcard_voltagereadingRW").val(jobcard_voltagereadingRW);
          $("#jobcard_voltagereadingRW").siblings('label').addClass('active');


          var jobcard_voltagereadingRN = detalhesjobcardelectricalinfo.jobcard_voltagereadingRN;
          $("#jobcard_voltagereadingRN").val(jobcard_voltagereadingRN);
          $("#jobcard_voltagereadingRN").siblings('label').addClass('active');


          var jobcard_voltagereadingRE = detalhesjobcardelectricalinfo.jobcard_voltagereadingRE;
          $("#jobcard_voltagereadingRE").val(jobcard_voltagereadingRE);
          $("#jobcard_voltagereadingRE").siblings('label').addClass('active');


          var jobcard_voltagereadingRB = detalhesjobcardelectricalinfo.jobcard_voltagereadingRB;
          $("#jobcard_voltagereadingRB").val(jobcard_voltagereadingRB);
          $("#jobcard_voltagereadingRB").siblings('label').addClass('active');


          var jobcard_voltagereadingWN = detalhesjobcardelectricalinfo.jobcard_voltagereadingWN;
          $("#jobcard_voltagereadingWN").val(jobcard_voltagereadingWN);
          $("#jobcard_voltagereadingWN").siblings('label').addClass('active');


          var jobcard_voltagereadingWE = detalhesjobcardelectricalinfo.jobcard_voltagereadingWE;
          $("#jobcard_voltagereadingWE").val(jobcard_voltagereadingWE);
          $("#jobcard_voltagereadingWE").siblings('label').addClass('active');


          var jobcard_voltagereadingWB = detalhesjobcardelectricalinfo.jobcard_voltagereadingWB;
          $("#jobcard_voltagereadingWB").val(jobcard_voltagereadingWB);
          $("#jobcard_voltagereadingWB").siblings('label').addClass('active');


          var jobcard_voltagereadingBN = detalhesjobcardelectricalinfo.jobcard_voltagereadingBN;
          $("#jobcard_voltagereadingBN").val(jobcard_voltagereadingBN);
          $("#jobcard_voltagereadingBN").siblings('label').addClass('active');


          var jobcard_voltagereadingBE = detalhesjobcardelectricalinfo.jobcard_voltagereadingBE;
          $("#jobcard_voltagereadingBE").val(jobcard_voltagereadingBE);
          $("#jobcard_voltagereadingBE").siblings('label').addClass('active');


          var jobcard_voltagereadingNE = detalhesjobcardelectricalinfo.jobcard_voltagereadingNE;
          $("#jobcard_voltagereadingNE").val(jobcard_voltagereadingNE);
          $("#jobcard_voltagereadingNE").siblings('label').addClass('active');


          var jobcard_electricalcomments = detalhesjobcardelectricalinfo.jobcard_electricalcomments;
          $("#jobcard_electricalcomments").val(jobcard_electricalcomments);
          $("#jobcard_electricalcomments").siblings('label').addClass('active');



          var jobcard_earthleakage = detalhesjobcardelectricalinfo.jobcard_earthleakage;
          if(jobcard_earthleakage == "ok"){
            document.getElementById("jobcard_earthleakageok").checked = true;
            document.getElementById("jobcard_earthleakagenotok").disabled = true;
            document.getElementById("jobcard_earthleakagena").disabled = true;
          }else
            if(jobcard_earthleakage == "not ok"){
              document.getElementById("jobcard_earthleakageok").disabled = true;
              document.getElementById("jobcard_earthleakagenotok").checked = true;
              document.getElementById("jobcard_earthleakagena").disabled = true;
            }else{
              document.getElementById("jobcard_earthleakageok").disabled = true;
              document.getElementById("jobcard_earthleakagenotok").disabled = true;
              document.getElementById("jobcard_earthleakagena").checked = true;
            }


          var jobcard_earthohm = detalhesjobcardelectricalinfo.jobcard_earthohm;
          $("#jobcard_earthohm").val(jobcard_earthohm);
          $("#jobcard_earthohm").siblings('label').addClass('active');


          var jobcard_earthcomments = detalhesjobcardelectricalinfo.jobcard_earthcomments;
          $("#jobcard_earthcomments").val(jobcard_earthcomments);
          $("#jobcard_earthcomments").siblings('label').addClass('active');




          $('#jobcardelectrical_modal').openModal({dismissible:false});
          $('#jobcardelectrical_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.rectifierModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardrectifierinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Rectificador não disponível':'Rectifier information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardrectifierinfo = JSON.parse($(this).attr("datajobcardrectifierinfo"));


          var jobcard_rectmake = detalhesjobcardrectifierinfo.jobcard_rectmake;
          $("#jobcard_rectmake").val(jobcard_rectmake);
          $("#jobcard_rectmake").siblings('label').addClass('active');


          var jobcard_opproperly = detalhesjobcardrectifierinfo.jobcard_opproperly;
          if(jobcard_opproperly == "ok"){
            document.getElementById("jobcard_opproperlyok").checked = true;
            document.getElementById("jobcard_opproperlynotok").disabled = true;
            document.getElementById("jobcard_opproperlyna").disabled = true;
          }else
            if(jobcard_opproperly == "not ok"){
              document.getElementById("jobcard_opproperlyok").disabled = true;
              document.getElementById("jobcard_opproperlynotok").checked = true;
              document.getElementById("jobcard_opproperlyna").disabled = true;
            }else{
              document.getElementById("jobcard_opproperlyok").disabled = true;
              document.getElementById("jobcard_opproperlynotok").disabled = true;
              document.getElementById("jobcard_opproperlyna").checked = true;
            }


          var jobcard_slotspopulated = detalhesjobcardrectifierinfo.jobcard_slotspopulated;
          if(jobcard_slotspopulated == "ok"){
            document.getElementById("jobcard_slotspopulatedok").checked = true;
            document.getElementById("jobcard_slotspopulatednotok").disabled = true;
            document.getElementById("jobcard_slotspopulatedna").disabled = true;
          }else
            if(jobcard_slotspopulated == "not ok"){
              document.getElementById("jobcard_slotspopulatedok").disabled = true;
              document.getElementById("jobcard_slotspopulatednotok").checked = true;
              document.getElementById("jobcard_slotspopulatedna").disabled = true;
            }else{
              document.getElementById("jobcard_slotspopulatedok").disabled = true;
              document.getElementById("jobcard_slotspopulatednotok").disabled = true;
              document.getElementById("jobcard_slotspopulatedna").checked = true;
            }


          var jobcard_parametersokay = detalhesjobcardrectifierinfo.jobcard_parametersokay;
          if(jobcard_parametersokay == "ok"){
            document.getElementById("jobcard_parametersokayok").checked = true;
            document.getElementById("jobcard_parametersokaynotok").disabled = true;
            document.getElementById("jobcard_parametersokayna").disabled = true;
          }else
            if(jobcard_parametersokay == "not ok"){
              document.getElementById("jobcard_parametersokayok").disabled = true;
              document.getElementById("jobcard_parametersokaynotok").checked = true;
              document.getElementById("jobcard_parametersokayna").disabled = true;
            }else{
              document.getElementById("jobcard_parametersokayok").disabled = true;
              document.getElementById("jobcard_parametersokaynotok").disabled = true;
              document.getElementById("jobcard_parametersokayna").checked = true;
            }



          var jobcard_systemupgrade = detalhesjobcardrectifierinfo.jobcard_systemupgrade;
          if(jobcard_systemupgrade == "yes"){
            document.getElementById("jobcard_systemupgradeyes").checked = true;
            document.getElementById("jobcard_systemupgradeno").disabled = true;
          }else{
              document.getElementById("jobcard_systemupgradeyes").disabled = true;
              document.getElementById("jobcard_systemupgradeno").disabled = true;
            }



          var jobcard_slotsburn = detalhesjobcardrectifierinfo.jobcard_slotsburn;
          if(jobcard_slotsburn == "ok"){
            document.getElementById("jobcard_slotsburnok").checked = true;
            document.getElementById("jobcard_slotsburnnotok").disabled = true;
            document.getElementById("jobcard_slotsburnna").disabled = true;
          }else
            if(jobcard_slotsburn == "not ok"){
              document.getElementById("jobcard_slotsburnok").disabled = true;
              document.getElementById("jobcard_slotsburnnotok").checked = true;
              document.getElementById("jobcard_slotsburnna").disabled = true;
            }else{
              document.getElementById("jobcard_slotsburnok").disabled = true;
              document.getElementById("jobcard_slotsburnnotok").disabled = true;
              document.getElementById("jobcard_slotsburnna").checked = true;
            }


          var jobcard_supervisormodule = detalhesjobcardrectifierinfo.jobcard_supervisormodule;
          if(jobcard_supervisormodule == "ok"){
            document.getElementById("jobcard_supervisormoduleok").checked = true;
            document.getElementById("jobcard_supervisormodulenotok").disabled = true;
            document.getElementById("jobcard_supervisormodulena").disabled = true;
          }else
            if(jobcard_supervisormodule == "not ok"){
              document.getElementById("jobcard_supervisormoduleok").disabled = true;
              document.getElementById("jobcard_supervisormodulenotok").checked = true;
              document.getElementById("jobcard_supervisormodulena").disabled = true;
            }else{
              document.getElementById("jobcard_supervisormoduleok").disabled = true;
              document.getElementById("jobcard_supervisormodulenotok").disabled = true;
              document.getElementById("jobcard_supervisormodulena").checked = true;
            }


          var jobcard_lvdokay = detalhesjobcardrectifierinfo.jobcard_lvdokay;
          if(jobcard_lvdokay == "ok"){
            document.getElementById("jobcard_lvdokayok").checked = true;
            document.getElementById("jobcard_lvdokaynotok").disabled = true;
            document.getElementById("jobcard_lvdokayna").disabled = true;
          }else
            if(jobcard_lvdokay == "not ok"){
              document.getElementById("jobcard_lvdokayok").disabled = true;
              document.getElementById("jobcard_lvdokaynotok").checked = true;
              document.getElementById("jobcard_lvdokayna").disabled = true;
            }else{
              document.getElementById("jobcard_lvdokayok").disabled = true;
              document.getElementById("jobcard_lvdokaynotok").disabled = true;
              document.getElementById("jobcard_lvdokayna").checked = true;
            }



          var jobcard_pldokay = detalhesjobcardrectifierinfo.jobcard_pldokay;
          if(jobcard_pldokay == "ok"){
            document.getElementById("jobcard_pldokayok").checked = true;
            document.getElementById("jobcard_pldokaynotok").disabled = true;
            document.getElementById("jobcard_pldokayna").disabled = true;
          }else
            if(jobcard_pldokay == "not ok"){
              document.getElementById("jobcard_pldokayok").disabled = true;
              document.getElementById("jobcard_pldokaynotok").checked = true;
              document.getElementById("jobcard_pldokayna").disabled = true;
            }else{
              document.getElementById("jobcard_pldokayok").disabled = true;
              document.getElementById("jobcard_pldokaynotok").disabled = true;
              document.getElementById("jobcard_pldokayna").checked = true;
            }


          var jobcard_AcDcCbOkay = detalhesjobcardrectifierinfo.jobcard_AcDcCbOkay;
          if(jobcard_AcDcCbOkay == "ok"){
            document.getElementById("jobcard_AcDcCbOkayok").checked = true;
            document.getElementById("jobcard_AcDcCbOkaynotok").disabled = true;
            document.getElementById("jobcard_AcDcCbOkayna").disabled = true;
          }else
            if(jobcard_AcDcCbOkay == "not ok"){
              document.getElementById("jobcard_AcDcCbOkayok").disabled = true;
              document.getElementById("jobcard_AcDcCbOkaynotok").checked = true;
              document.getElementById("jobcard_AcDcCbOkayna").disabled = true;
            }else{
              document.getElementById("jobcard_AcDcCbOkayok").disabled = true;
              document.getElementById("jobcard_AcDcCbOkaynotok").disabled = true;
              document.getElementById("jobcard_AcDcCbOkayna").checked = true;
            }


          var jobcard_alarmcommport = detalhesjobcardrectifierinfo.jobcard_alarmcommport;
          if(jobcard_alarmcommport == "ok"){
            document.getElementById("jobcard_alarmcommportok").checked = true;
            document.getElementById("jobcard_alarmcommportnotok").disabled = true;
            document.getElementById("jobcard_alarmcommportna").disabled = true;
          }else
            if(jobcard_alarmcommport == "not ok"){
              document.getElementById("jobcard_alarmcommportok").disabled = true;
              document.getElementById("jobcard_alarmcommportnotok").checked = true;
              document.getElementById("jobcard_alarmcommportna").disabled = true;
            }else{
              document.getElementById("jobcard_alarmcommportok").disabled = true;
              document.getElementById("jobcard_alarmcommportnotok").disabled = true;
              document.getElementById("jobcard_alarmcommportna").checked = true;
            }


          var jobcard_rectifiercomments = detalhesjobcardrectifierinfo.jobcard_rectifiercomments;
          $("#jobcard_rectifiercomments").val(jobcard_rectmake);
          $("#jobcard_rectifiercomments").siblings('label').addClass('active');




          $('#jobcardrectifier_modal').openModal({dismissible:false});
          $('#jobcardrectifier_yes_btn_modal').addClass('hide');
        
        }

    });



    $('.batterybanksModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardbatterybanksinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Bancos de Bateria não disponível':'Battery Banks information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardbatterybanksinfo = JSON.parse($(this).attr("datajobcardbatterybanksinfo"));


          var jobcard_batterybank1_test1_cell1 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test1_cell1;
          $("#jobcard_batterybank1_test1_cell1").val(jobcard_batterybank1_test1_cell1);
          $("#jobcard_batterybank1_test1_cell1").siblings('label').addClass('active');


          var jobcard_batterybank1_test1_cell2 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test1_cell2;
          $("#jobcard_batterybank1_test1_cell2").val(jobcard_batterybank1_test1_cell2);
          $("#jobcard_batterybank1_test1_cell2").siblings('label').addClass('active');


          var jobcard_batterybank1_test1_cell3 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test1_cell3;
          $("#jobcard_batterybank1_test1_cell3").val(jobcard_batterybank1_test1_cell3);
          $("#jobcard_batterybank1_test1_cell3").siblings('label').addClass('active');


          var jobcard_batterybank1_test1_cell4 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test1_cell4;
          $("#jobcard_batterybank1_test1_cell4").val(jobcard_batterybank1_test1_cell4);
          $("#jobcard_batterybank1_test1_cell4").siblings('label').addClass('active');


          var jobcard_batterybank1_test2_cell1 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test2_cell1;
          $("#jobcard_batterybank1_test2_cell1").val(jobcard_batterybank1_test2_cell1);
          $("#jobcard_batterybank1_test2_cell1").siblings('label').addClass('active');


          var jobcard_batterybank1_test2_cell2 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test2_cell2;
          $("#jobcard_batterybank1_test2_cell2").val(jobcard_batterybank1_test2_cell2);
          $("#jobcard_batterybank1_test2_cell2").siblings('label').addClass('active');


          var jobcard_batterybank1_test2_cell3 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test2_cell3;
          $("#jobcard_batterybank1_test2_cell3").val(jobcard_batterybank1_test2_cell3);
          $("#jobcard_batterybank1_test2_cell3").siblings('label').addClass('active');


          var jobcard_batterybank1_test2_cell4 = detalhesjobcardbatterybanksinfo.jobcard_batterybank1_test2_cell4;
          $("#jobcard_batterybank1_test2_cell4").val(jobcard_batterybank1_test2_cell4);
          $("#jobcard_batterybank1_test2_cell4").siblings('label').addClass('active');


          var jobcard_batterybank2_test1_cell5 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test1_cell5;
          $("#jobcard_batterybank2_test1_cell5").val(jobcard_batterybank2_test1_cell5);
          $("#jobcard_batterybank2_test1_cell5").siblings('label').addClass('active');


          var jobcard_batterybank2_test1_cell6 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test1_cell6;
          $("#jobcard_batterybank2_test1_cell6").val(jobcard_batterybank2_test1_cell6);
          $("#jobcard_batterybank2_test1_cell6").siblings('label').addClass('active');


          var jobcard_batterybank2_test1_cell7 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test1_cell7;
          $("#jobcard_batterybank2_test1_cell7").val(jobcard_batterybank2_test1_cell7);
          $("#jobcard_batterybank2_test1_cell7").siblings('label').addClass('active');


          var jobcard_batterybank2_test1_cell8 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test1_cell8;
          $("#jobcard_batterybank2_test1_cell8").val(jobcard_batterybank2_test1_cell8);
          $("#jobcard_batterybank2_test1_cell8").siblings('label').addClass('active');


          var jobcard_batterybank2_test2_cell6 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test2_cell6;
          $("#jobcard_batterybank2_test2_cell6").val(jobcard_batterybank2_test2_cell6);
          $("#jobcard_batterybank2_test2_cell6").siblings('label').addClass('active');


          var jobcard_batterybank2_test2_cell7 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test2_cell7;
          $("#jobcard_batterybank2_test2_cell7").val(jobcard_batterybank2_test2_cell7);
          $("#jobcard_batterybank2_test2_cell7").siblings('label').addClass('active');


          var jobcard_batterybank2_test2_cell8 = detalhesjobcardbatterybanksinfo.jobcard_batterybank2_test2_cell8;
          $("#jobcard_batterybank2_test2_cell8").val(jobcard_batterybank2_test2_cell8);
          $("#jobcard_batterybank2_test2_cell8").siblings('label').addClass('active');


          var jobcard_batterybank3_test1_cell9 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test1_cell9;
          $("#jobcard_batterybank3_test1_cell9").val(jobcard_batterybank2_test2_cell8);
          $("#jobcard_batterybank3_test1_cell9").siblings('label').addClass('active');


          var jobcard_batterybank3_test1_cell10 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test1_cell10;
          $("#jobcard_batterybank3_test1_cell10").val(jobcard_batterybank2_test2_cell8);
          $("#jobcard_batterybank3_test1_cell10").siblings('label').addClass('active');


          var jobcard_batterybank3_test1_cell11 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test1_cell11;
          $("#jobcard_batterybank3_test1_cell11").val(jobcard_batterybank3_test1_cell11);
          $("#jobcard_batterybank3_test1_cell11").siblings('label').addClass('active');


          var jobcard_batterybank3_test1_cell12 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test1_cell12;
          $("#jobcard_batterybank3_test1_cell12").val(jobcard_batterybank3_test1_cell12);
          $("#jobcard_batterybank3_test1_cell12").siblings('label').addClass('active');


          var jobcard_batterybank3_test2_cell9 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test2_cell9;
          $("#jobcard_batterybank3_test2_cell9").val(jobcard_batterybank3_test2_cell9);
          $("#jobcard_batterybank3_test2_cell9").siblings('label').addClass('active');


          var jobcard_batterybank3_test2_cell10 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test2_cell10;
          $("#jobcard_batterybank3_test2_cell10").val(jobcard_batterybank3_test2_cell10);
          $("#jobcard_batterybank3_test2_cell10").siblings('label').addClass('active');


          var jobcard_batterybank3_test2_cell11 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test2_cell11;
          $("#jobcard_batterybank3_test2_cell11").val(jobcard_batterybank3_test2_cell11);
          $("#jobcard_batterybank3_test2_cell11").siblings('label').addClass('active');


          var jobcard_batterybank3_test2_cell12 = detalhesjobcardbatterybanksinfo.jobcard_batterybank3_test2_cell12;
          $("#jobcard_batterybank3_test2_cell12").val(jobcard_batterybank3_test2_cell12);
          $("#jobcard_batterybank3_test2_cell12").siblings('label').addClass('active');


          var jobcard_batterybank4_test1_cell13 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test1_cell13;
          $("#jobcard_batterybank4_test1_cell13").val(jobcard_batterybank4_test1_cell13);
          $("#jobcard_batterybank4_test1_cell13").siblings('label').addClass('active');


          var jobcard_batterybank4_test1_cell14 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test1_cell14;
          $("#jobcard_batterybank4_test1_cell14").val(jobcard_batterybank4_test1_cell14);
          $("#jobcard_batterybank4_test1_cell14").siblings('label').addClass('active');


          var jobcard_batterybank4_test1_cell15 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test1_cell15;
          $("#jobcard_batterybank4_test1_cell15").val(jobcard_batterybank4_test1_cell15);
          $("#jobcard_batterybank4_test1_cell15").siblings('label').addClass('active');


          var jobcard_batterybank4_test1_cell16 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test1_cell16;
          $("#jobcard_batterybank4_test1_cell16").val(jobcard_batterybank4_test1_cell16);
          $("#jobcard_batterybank4_test1_cell16").siblings('label').addClass('active');


          var jobcard_batterybank4_test2_cell13 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test2_cell13;
          $("#jobcard_batterybank4_test2_cell13").val(jobcard_batterybank4_test2_cell13);
          $("#jobcard_batterybank4_test2_cell13").siblings('label').addClass('active');


          var jobcard_batterybank4_test2_cell14 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test2_cell14;
          $("#jobcard_batterybank4_test2_cell14").val(jobcard_batterybank4_test2_cell14);
          $("#jobcard_batterybank4_test2_cell14").siblings('label').addClass('active');


          var jobcard_batterybank4_test2_cell15 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test2_cell15;
          $("#jobcard_batterybank4_test2_cell15").val(jobcard_batterybank4_test2_cell15);
          $("#jobcard_batterybank4_test2_cell15").siblings('label').addClass('active');


          var jobcard_batterybank4_test2_cell16 = detalhesjobcardbatterybanksinfo.jobcard_batterybank4_test2_cell16;
          $("#jobcard_batterybank4_test2_cell16").val(jobcard_batterybank4_test2_cell16);
          $("#jobcard_batterybank4_test2_cell16").siblings('label').addClass('active');


          var jobcard_batterybank5_test1_cell17 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test1_cell17;
          $("#jobcard_batterybank5_test1_cell17").val(jobcard_batterybank5_test1_cell17);
          $("#jobcard_batterybank5_test1_cell17").siblings('label').addClass('active');


          var jobcard_batterybank5_test1_cell18 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test1_cell18;
          $("#jobcard_batterybank5_test1_cell18").val(jobcard_batterybank5_test1_cell18);
          $("#jobcard_batterybank5_test1_cell18").siblings('label').addClass('active');


          var jobcard_batterybank5_test1_cell19 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test1_cell19;
          $("#jobcard_batterybank5_test1_cell19").val(jobcard_batterybank5_test1_cell19);
          $("#jobcard_batterybank5_test1_cell19").siblings('label').addClass('active');


          var jobcard_batterybank5_test1_cell20 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test1_cell20;
          $("#jobcard_batterybank5_test1_cell20").val(jobcard_batterybank5_test1_cell20);
          $("#jobcard_batterybank5_test1_cell20").siblings('label').addClass('active');


          var jobcard_batterybank5_test2_cell17 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test2_cell17;
          $("#jobcard_batterybank5_test2_cell17").val(jobcard_batterybank5_test2_cell17);
          $("#jobcard_batterybank5_test2_cell17").siblings('label').addClass('active');


          var jobcard_batterybank5_test2_cell18 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test2_cell18;
          $("#jobcard_batterybank5_test2_cell18").val(jobcard_batterybank5_test2_cell18);
          $("#jobcard_batterybank5_test2_cell18").siblings('label').addClass('active');


          var jobcard_batterybank5_test2_cell19 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test2_cell19;
          $("#jobcard_batterybank5_test2_cell19").val(jobcard_batterybank5_test2_cell19);
          $("#jobcard_batterybank5_test2_cell19").siblings('label').addClass('active');


          var jobcard_batterybank5_test2_cell20 = detalhesjobcardbatterybanksinfo.jobcard_batterybank5_test2_cell20;
          $("#jobcard_batterybank5_test2_cell20").val(jobcard_batterybank5_test2_cell20);
          $("#jobcard_batterybank5_test2_cell20").siblings('label').addClass('active');


          var jobcard_batterybank6_test1_cell21 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test1_cell21;
          $("#jobcard_batterybank6_test1_cell21").val(jobcard_batterybank6_test1_cell21);
          $("#jobcard_batterybank6_test1_cell21").siblings('label').addClass('active');


          var jobcard_batterybank6_test1_cell22 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test1_cell22;
          $("#jobcard_batterybank6_test1_cell22").val(jobcard_batterybank6_test1_cell22);
          $("#jobcard_batterybank6_test1_cell22").siblings('label').addClass('active');


          var jobcard_batterybank6_test1_cell23 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test1_cell23;
          $("#jobcard_batterybank6_test1_cell23").val(jobcard_batterybank6_test1_cell23);
          $("#jobcard_batterybank6_test1_cell23").siblings('label').addClass('active');


          var jobcard_batterybank6_test1_cell24 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test1_cell24;
          $("#jobcard_batterybank6_test1_cell24").val(jobcard_batterybank6_test1_cell24);
          $("#jobcard_batterybank6_test1_cell24").siblings('label').addClass('active');


          var jobcard_batterybank6_test2_cell21 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test2_cell21;
          $("#jobcard_batterybank6_test2_cell21").val(jobcard_batterybank6_test2_cell21);
          $("#jobcard_batterybank6_test2_cell21").siblings('label').addClass('active');


          var jobcard_batterybank6_test2_cell22 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test2_cell22;
          $("#jobcard_batterybank6_test2_cell22").val(jobcard_batterybank6_test2_cell22);
          $("#jobcard_batterybank6_test2_cell22").siblings('label').addClass('active');


          var jobcard_batterybank6_test2_cell23 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test2_cell23;
          $("#jobcard_batterybank6_test2_cell23").val(jobcard_batterybank6_test2_cell23);
          $("#jobcard_batterybank6_test2_cell23").siblings('label').addClass('active');


          var jobcard_batterybank6_test2_cell24 = detalhesjobcardbatterybanksinfo.jobcard_batterybank6_test2_cell24;
          $("#jobcard_batterybank6_test2_cell24").val(jobcard_batterybank6_test2_cell24);
          $("#jobcard_batterybank6_test2_cell24").siblings('label').addClass('active');




          $('#jobcardbatterybanks_modal').openModal({dismissible:false});
          $('#jobcardbatterybanks_yes_btn_modal').addClass('hide');
        
        }

    });

    

    $('.aircondModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardaircondinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre AC não disponível':'AC information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardaircondinfo = JSON.parse($(this).attr("datajobcardaircondinfo"));


          var jobcard_noisevibration = detalhesjobcardaircondinfo.jobcard_noisevibration;
          if(jobcard_noisevibration == "ok"){
            document.getElementById("jobcard_noisevibrationok").checked = true;
            document.getElementById("jobcard_noisevibrationnotok").disabled = true;
            document.getElementById("jobcard_noisevibrationna").disabled = true;
          }else
            if(jobcard_noisevibration == "not ok"){
              document.getElementById("jobcard_noisevibrationok").disabled = true;
              document.getElementById("jobcard_noisevibrationnotok").checked = true;
              document.getElementById("jobcard_noisevibrationna").disabled = true;
            }else{
              document.getElementById("jobcard_noisevibrationok").disabled = true;
              document.getElementById("jobcard_noisevibrationnotok").disabled = true;
              document.getElementById("jobcard_noisevibrationna").checked = true;
            }


          var jobcard_cleanfilter = detalhesjobcardaircondinfo.jobcard_cleanfilter;
          if(jobcard_cleanfilter == "ok"){
            document.getElementById("jobcard_cleanfilterok").checked = true;
            document.getElementById("jobcard_cleanfilternotok").disabled = true;
            document.getElementById("jobcard_cleanfilterna").disabled = true;
          }else
            if(jobcard_cleanfilter == "not ok"){
              document.getElementById("jobcard_cleanfilterok").disabled = true;
              document.getElementById("jobcard_cleanfilternotok").checked = true;
              document.getElementById("jobcard_cleanfilterna").disabled = true;
            }else{
              document.getElementById("jobcard_cleanfilterok").disabled = true;
              document.getElementById("jobcard_cleanfilternotok").disabled = true;
              document.getElementById("jobcard_cleanfilterna").checked = true;
            }


          var jobcard_hightemperature = detalhesjobcardaircondinfo.jobcard_hightemperature;
          if(jobcard_hightemperature == "ok"){
            document.getElementById("jobcard_hightemperatureok").checked = true;
            document.getElementById("jobcard_hightemperaturenotok").disabled = true;
            document.getElementById("jobcard_hightemperaturena").disabled = true;
          }else
            if(jobcard_hightemperature == "not ok"){
              document.getElementById("jobcard_hightemperatureok").disabled = true;
              document.getElementById("jobcard_hightemperaturenotok").checked = true;
              document.getElementById("jobcard_hightemperaturena").disabled = true;
            }else{
              document.getElementById("jobcard_hightemperatureok").disabled = true;
              document.getElementById("jobcard_hightemperaturenotok").disabled = true;
              document.getElementById("jobcard_hightemperaturena").checked = true;
            }


          var jobcard_operatingtime = detalhesjobcardaircondinfo.jobcard_operatingtime;
          if(jobcard_operatingtime == "ok"){
            document.getElementById("jobcard_operatingtimeok").checked = true;
            document.getElementById("jobcard_operatingtimenotok").disabled = true;
            document.getElementById("jobcard_operatingtimena").disabled = true;
          }else
            if(jobcard_operatingtime == "not ok"){
              document.getElementById("jobcard_operatingtimeok").disabled = true;
              document.getElementById("jobcard_operatingtimenotok").checked = true;
              document.getElementById("jobcard_operatingtimena").disabled = true;
            }else{
              document.getElementById("jobcard_operatingtimeok").disabled = true;
              document.getElementById("jobcard_operatingtimenotok").disabled = true;
              document.getElementById("jobcard_operatingtimena").checked = true;
            }


          var jobcard_accooling = detalhesjobcardaircondinfo.jobcard_accooling;
          if(jobcard_accooling == "ok"){
            document.getElementById("jobcard_accoolingok").checked = true;
            document.getElementById("jobcard_accoolingnotok").disabled = true;
            document.getElementById("jobcard_accoolingna").disabled = true;
          }else
            if(jobcard_accooling == "not ok"){
              document.getElementById("jobcard_accoolingok").disabled = true;
              document.getElementById("jobcard_accoolingnotok").checked = true;
              document.getElementById("jobcard_accoolingna").disabled = true;
            }else{
              document.getElementById("jobcard_accoolingok").disabled = true;
              document.getElementById("jobcard_accoolingnotok").disabled = true;
              document.getElementById("jobcard_accoolingna").checked = true;
            }


          var jobcard_acmodelcapacity = detalhesjobcardbatterybanksinfo.jobcard_acmodelcapacity;
          $("#jobcard_acmodelcapacity").val(jobcard_acmodelcapacity);
          $("#jobcard_acmodelcapacity").siblings('label').addClass('active');


          var jobcard_accageinst = detalhesjobcardaircondinfo.jobcard_accageinst;
          if(jobcard_accageinst == "ok"){
            document.getElementById("jobcard_accageinstok").checked = true;
            document.getElementById("jobcard_accageinstnotok").disabled = true;
            document.getElementById("jobcard_accageinstna").disabled = true;
          }else
            if(jobcard_accageinst == "not ok"){
              document.getElementById("jobcard_accageinstok").disabled = true;
              document.getElementById("jobcard_accageinstnotok").checked = true;
              document.getElementById("jobcard_accageinstna").disabled = true;
            }else{
              document.getElementById("jobcard_accageinstok").disabled = true;
              document.getElementById("jobcard_accageinstnotok").disabled = true;
              document.getElementById("jobcard_accageinstna").checked = true;
            }



          $('#jobcardaircond_modal').openModal({dismissible:false});
          $('#jobcardaircond_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.antennasModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardantennasinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Antenas não disponível':'Antennas information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardantennasinfo = JSON.parse($(this).attr("datajobcardantennasinfo"));

          var jobcard_antennasecure = detalhesjobcardantennasinfo.jobcard_antennasecure;
          if(jobcard_antennasecure == "ok"){
            document.getElementById("jobcard_antennasecureok").checked = true;
            document.getElementById("jobcard_antennasecurenotok").disabled = true;
            document.getElementById("jobcard_antennasecurena").disabled = true;
          }else
            if(jobcard_antennasecure == "not ok"){
              document.getElementById("jobcard_antennasecureok").disabled = true;
              document.getElementById("jobcard_antennasecurenotok").checked = true;
              document.getElementById("jobcard_antennasecurena").disabled = true;
            }else{
              document.getElementById("jobcard_antennasecureok").disabled = true;
              document.getElementById("jobcard_antennasecurenotok").disabled = true;
              document.getElementById("jobcard_antennasecurena").checked = true;
            }


          var jobcard_bracketscond = detalhesjobcardantennasinfo.jobcard_bracketscond;
          if(jobcard_bracketscond == "ok"){
            document.getElementById("jobcard_bracketscondok").checked = true;
            document.getElementById("jobcard_bracketscondnotok").disabled = true;
            document.getElementById("jobcard_bracketscondna").disabled = true;
          }else
            if(jobcard_bracketscond == "not ok"){
              document.getElementById("jobcard_bracketscondok").disabled = true;
              document.getElementById("jobcard_bracketscondnotok").checked = true;
              document.getElementById("jobcard_bracketscondna").disabled = true;
            }else{
              document.getElementById("jobcard_bracketscondok").disabled = true;
              document.getElementById("jobcard_bracketscondnotok").disabled = true;
              document.getElementById("jobcard_bracketscondna").checked = true;
            }


          var jobcard_clampcond = detalhesjobcardantennasinfo.jobcard_clampcond;
          if(jobcard_clampcond == "ok"){
            document.getElementById("jobcard_clampcondok").checked = true;
            document.getElementById("jobcard_clampcondnotok").disabled = true;
            document.getElementById("jobcard_clampcondna").disabled = true;
          }else
            if(jobcard_clampcond == "not ok"){
              document.getElementById("jobcard_clampcondok").disabled = true;
              document.getElementById("jobcard_clampcondnotok").checked = true;
              document.getElementById("jobcard_clampcondna").disabled = true;
            }else{
              document.getElementById("jobcard_clampcondok").disabled = true;
              document.getElementById("jobcard_clampcondnotok").disabled = true;
              document.getElementById("jobcard_clampcondna").checked = true;
            }


          var jobcard_opticfibercond = detalhesjobcardantennasinfo.jobcard_opticfibercond;
          if(jobcard_opticfibercond == "ok"){
            document.getElementById("jobcard_opticfibercondok").checked = true;
            document.getElementById("jobcard_opticfibercondnotok").disabled = true;
            document.getElementById("jobcard_opticfibercondna").disabled = true;
          }else
            if(jobcard_opticfibercond == "not ok"){
              document.getElementById("jobcard_opticfibercondok").disabled = true;
              document.getElementById("jobcard_opticfibercondnotok").checked = true;
              document.getElementById("jobcard_opticfibercondna").disabled = true;
            }else{
              document.getElementById("jobcard_opticfibercondok").disabled = true;
              document.getElementById("jobcard_opticfibercondnotok").disabled = true;
              document.getElementById("jobcard_opticfibercondna").checked = true;
            }


          var jobcard_rrucables = detalhesjobcardantennasinfo.jobcard_rrucables;
          if(jobcard_rrucables == "ok"){
            document.getElementById("jobcard_rrucablesok").checked = true;
            document.getElementById("jobcard_rrucablesnotok").disabled = true;
            document.getElementById("jobcard_rrucablesna").disabled = true;
          }else
            if(jobcard_rrucables == "not ok"){
              document.getElementById("jobcard_rrucablesok").disabled = true;
              document.getElementById("jobcard_rrucablesnotok").checked = true;
              document.getElementById("jobcard_rrucablesna").disabled = true;
            }else{
              document.getElementById("jobcard_rrucablesok").disabled = true;
              document.getElementById("jobcard_rrucablesnotok").disabled = true;
              document.getElementById("jobcard_rrucablesna").checked = true;
            }


          var jobcard_rrucond = detalhesjobcardantennasinfo.jobcard_rrucond;
          if(jobcard_rrucond == "ok"){
            document.getElementById("jobcard_rrucondok").checked = true;
            document.getElementById("jobcard_rrucondnotok").disabled = true;
            document.getElementById("jobcard_rrucondna").disabled = true;
          }else
            if(jobcard_rrucond == "not ok"){
              document.getElementById("jobcard_rrucondok").disabled = true;
              document.getElementById("jobcard_rrucondnotok").checked = true;
              document.getElementById("jobcard_rrucondna").disabled = true;
            }else{
              document.getElementById("jobcard_rrucondok").disabled = true;
              document.getElementById("jobcard_rrucondnotok").disabled = true;
              document.getElementById("jobcard_rrucondna").checked = true;
            }


          var jobcard_aauearth = detalhesjobcardantennasinfo.jobcard_aauearth;
          if(jobcard_aauearth == "ok"){
            document.getElementById("jobcard_aauearthok").checked = true;
            document.getElementById("jobcard_aauearthnotok").disabled = true;
            document.getElementById("jobcard_aauearthna").disabled = true;
          }else
            if(jobcard_aauearth == "not ok"){
              document.getElementById("jobcard_aauearthok").disabled = true;
              document.getElementById("jobcard_aauearthnotok").checked = true;
              document.getElementById("jobcard_aauearthna").disabled = true;
            }else{
              document.getElementById("jobcard_aauearthok").disabled = true;
              document.getElementById("jobcard_aauearthnotok").disabled = true;
              document.getElementById("jobcard_aauearthna").checked = true;
            }


          var jobcard_jumpercond = detalhesjobcardantennasinfo.jobcard_jumpercond;
          if(jobcard_jumpercond == "ok"){
            document.getElementById("jobcard_jumpercondok").checked = true;
            document.getElementById("jobcard_jumpercondnotok").disabled = true;
            document.getElementById("jobcard_jumpercondna").disabled = true;
          }else
            if(jobcard_jumpercond == "not ok"){
              document.getElementById("jobcard_jumpercondok").disabled = true;
              document.getElementById("jobcard_jumpercondnotok").checked = true;
              document.getElementById("jobcard_jumpercondna").disabled = true;
            }else{
              document.getElementById("jobcard_jumpercondok").disabled = true;
              document.getElementById("jobcard_jumpercondnotok").disabled = true;
              document.getElementById("jobcard_jumpercondna").checked = true;
            }


          var jobcard_dcducables = detalhesjobcardantennasinfo.jobcard_dcducables;
          if(jobcard_dcducables == "ok"){
            document.getElementById("jobcard_dcducablesok").checked = true;
            document.getElementById("jobcard_dcducablesnotok").disabled = true;
            document.getElementById("jobcard_dcducablesna").disabled = true;
          }else
            if(jobcard_dcducables == "not ok"){
              document.getElementById("jobcard_dcducablesok").disabled = true;
              document.getElementById("jobcard_dcducablesnotok").checked = true;
              document.getElementById("jobcard_dcducablesna").disabled = true;
            }else{
              document.getElementById("jobcard_dcducablesok").disabled = true;
              document.getElementById("jobcard_dcducablesnotok").disabled = true;
              document.getElementById("jobcard_dcducablesna").checked = true;
            }


          var jobcard_cablesdamages = detalhesjobcardantennasinfo.jobcard_cablesdamages;
          if(jobcard_cablesdamages == "ok"){
            document.getElementById("jobcard_cablesdamagesok").checked = true;
            document.getElementById("jobcard_cablesdamagesnotok").disabled = true;
            document.getElementById("jobcard_cablesdamagesna").disabled = true;
          }else
            if(jobcard_cablesdamages == "not ok"){
              document.getElementById("jobcard_cablesdamagesok").disabled = true;
              document.getElementById("jobcard_cablesdamagesnotok").checked = true;
              document.getElementById("jobcard_cablesdamagesna").disabled = true;
            }else{
              document.getElementById("jobcard_cablesdamagesok").disabled = true;
              document.getElementById("jobcard_cablesdamagesnotok").disabled = true;
              document.getElementById("jobcard_cablesdamagesna").checked = true;
            }


          var jobcard_opticLabels = detalhesjobcardantennasinfo.jobcard_opticLabels;
          if(jobcard_opticLabels == "ok"){
            document.getElementById("jobcard_opticLabelsok").checked = true;
            document.getElementById("jobcard_opticLabelsnotok").disabled = true;
            document.getElementById("jobcard_opticLabelsna").disabled = true;
          }else
            if(jobcard_opticLabels == "not ok"){
              document.getElementById("jobcard_opticLabelsok").disabled = true;
              document.getElementById("jobcard_opticLabelsnotok").checked = true;
              document.getElementById("jobcard_opticLabelsna").disabled = true;
            }else{
              document.getElementById("jobcard_opticLabelsok").disabled = true;
              document.getElementById("jobcard_opticLabelsnotok").disabled = true;
              document.getElementById("jobcard_opticLabelsna").checked = true;
            }


          var jobcard_constructionradius = detalhesjobcardantennasinfo.jobcard_constructionradius;
          if(jobcard_constructionradius == "ok"){
            document.getElementById("jobcard_constructionradiusok").checked = true;
            document.getElementById("jobcard_constructionradiusnotok").disabled = true;
            document.getElementById("jobcard_constructionradiusna").disabled = true;
          }else
            if(jobcard_constructionradius == "not ok"){
              document.getElementById("jobcard_constructionradiusok").disabled = true;
              document.getElementById("jobcard_constructionradiusnotok").checked = true;
              document.getElementById("jobcard_constructionradiusna").disabled = true;
            }else{
              document.getElementById("jobcard_constructionradiusok").disabled = true;
              document.getElementById("jobcard_constructionradiusnotok").disabled = true;
              document.getElementById("jobcard_constructionradiusna").checked = true;
            }



          var jobcard_radiocomments = detalhesjobcardantennasinfo.jobcard_radiocomments;
          $("#jobcard_radiocomments").val(jobcard_radiocomments);
          $("#jobcard_radiocomments").siblings('label').addClass('active');




          $('#jobcardantennas_modal').openModal({dismissible:false});
          $('#jobcardantennas_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.eainfoModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardeainfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre EA não disponível':'EA information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardeainfo = JSON.parse($(this).attr("datajobcardeainfo"));

          var jobcard_acmains = detalhesjobcardeainfo.jobcard_acmains;
          if(jobcard_acmains == "ok"){
            document.getElementById("jobcard_acmainsok").checked = true;
            document.getElementById("jobcard_acmainsnotok").disabled = true;
            document.getElementById("jobcard_acmainsna").disabled = true;
          }else
            if(jobcard_acmains == "not ok"){
              document.getElementById("jobcard_acmainsok").disabled = true;
              document.getElementById("jobcard_acmainsnotok").checked = true;
              document.getElementById("jobcard_acmainsna").disabled = true;
            }else{
              document.getElementById("jobcard_acmainsok").disabled = true;
              document.getElementById("jobcard_acmainsnotok").disabled = true;
              document.getElementById("jobcard_acmainsna").checked = true;
            }


          var jobcard_ac1 = detalhesjobcardeainfo.jobcard_ac1;
          if(jobcard_ac1 == "ok"){
            document.getElementById("jobcard_ac1ok").checked = true;
            document.getElementById("jobcard_ac1notok").disabled = true;
            document.getElementById("jobcard_ac1na").disabled = true;
          }else
            if(jobcard_ac1 == "not ok"){
              document.getElementById("jobcard_ac1ok").disabled = true;
              document.getElementById("jobcard_ac1notok").checked = true;
              document.getElementById("jobcard_ac1na").disabled = true;
            }else{
              document.getElementById("jobcard_ac1ok").disabled = true;
              document.getElementById("jobcard_ac1notok").disabled = true;
              document.getElementById("jobcard_ac1na").checked = true;
            }


          var jobcard_ac2 = detalhesjobcardeainfo.jobcard_ac2;
          if(jobcard_ac2 == "ok"){
            document.getElementById("jobcard_ac2ok").checked = true;
            document.getElementById("jobcard_ac2notok").disabled = true;
            document.getElementById("jobcard_ac2na").disabled = true;
          }else
            if(jobcard_ac2 == "not ok"){
              document.getElementById("jobcard_ac2ok").disabled = true;
              document.getElementById("jobcard_ac2notok").checked = true;
              document.getElementById("jobcard_ac2na").disabled = true;
            }else{
              document.getElementById("jobcard_ac2ok").disabled = true;
              document.getElementById("jobcard_ac2notok").disabled = true;
              document.getElementById("jobcard_ac2na").checked = true;
            }


          var jobcard_doorswitch = detalhesjobcardeainfo.jobcard_doorswitch;
          if(jobcard_doorswitch == "ok"){
            document.getElementById("jobcard_doorswitchok").checked = true;
            document.getElementById("jobcard_doorswitchnotok").disabled = true;
            document.getElementById("jobcard_doorswitchna").disabled = true;
          }else
            if(jobcard_doorswitch == "not ok"){
              document.getElementById("jobcard_doorswitchok").disabled = true;
              document.getElementById("jobcard_doorswitchnotok").checked = true;
              document.getElementById("jobcard_doorswitchna").disabled = true;
            }else{
              document.getElementById("jobcard_doorswitchok").disabled = true;
              document.getElementById("jobcard_doorswitchnotok").disabled = true;
              document.getElementById("jobcard_doorswitchna").checked = true;
            }


          var jobcard_genabnormal = detalhesjobcardeainfo.jobcard_genabnormal;
          if(jobcard_genabnormal == "ok"){
            document.getElementById("jobcard_genabnormalok").checked = true;
            document.getElementById("jobcard_genabnormalnotok").disabled = true;
            document.getElementById("jobcard_genabnormalna").disabled = true;
          }else
            if(jobcard_genabnormal == "not ok"){
              document.getElementById("jobcard_genabnormalok").disabled = true;
              document.getElementById("jobcard_genabnormalnotok").checked = true;
              document.getElementById("jobcard_genabnormalna").disabled = true;
            }else{
              document.getElementById("jobcard_genabnormalok").disabled = true;
              document.getElementById("jobcard_genabnormalnotok").disabled = true;
              document.getElementById("jobcard_genabnormalna").checked = true;
            }


          var jobcard_genlowfuel = detalhesjobcardeainfo.jobcard_genlowfuel;
          if(jobcard_genlowfuel == "ok"){
            document.getElementById("jobcard_genlowfuelok").checked = true;
            document.getElementById("jobcard_genlowfuelnotok").disabled = true;
            document.getElementById("jobcard_genlowfuelna").disabled = true;
          }else
            if(jobcard_genlowfuel == "not ok"){
              document.getElementById("jobcard_genlowfuelok").disabled = true;
              document.getElementById("jobcard_genlowfuelnotok").checked = true;
              document.getElementById("jobcard_genlowfuelna").disabled = true;
            }else{
              document.getElementById("jobcard_genlowfuelok").disabled = true;
              document.getElementById("jobcard_genlowfuelnotok").disabled = true;
              document.getElementById("jobcard_genlowfuelna").checked = true;
            }


          var jobcard_genrunning = detalhesjobcardeainfo.jobcard_genrunning;
          if(jobcard_genrunning == "ok"){
            document.getElementById("jobcard_genrunningok").checked = true;
            document.getElementById("jobcard_genrunningnotok").disabled = true;
            document.getElementById("jobcard_genrunningna").disabled = true;
          }else
            if(jobcard_genrunning == "not ok"){
              document.getElementById("jobcard_genrunningok").disabled = true;
              document.getElementById("jobcard_genrunningnotok").checked = true;
              document.getElementById("jobcard_genrunningna").disabled = true;
            }else{
              document.getElementById("jobcard_genrunningok").disabled = true;
              document.getElementById("jobcard_genrunningnotok").disabled = true;
              document.getElementById("jobcard_genrunningna").checked = true;
            }

          var jobcard_rectmodule = detalhesjobcardeainfo.jobcard_rectmodule;
          if(jobcard_rectmodule == "ok"){
            document.getElementById("jobcard_rectmoduleok").checked = true;
            document.getElementById("jobcard_rectmodulenotok").disabled = true;
            document.getElementById("jobcard_rectmodulena").disabled = true;
          }else
            if(jobcard_rectmodule == "not ok"){
              document.getElementById("jobcard_rectmoduleok").disabled = true;
              document.getElementById("jobcard_rectmodulenotok").checked = true;
              document.getElementById("jobcard_rectmodulena").disabled = true;
            }else{
              document.getElementById("jobcard_rectmoduleok").disabled = true;
              document.getElementById("jobcard_rectmodulenotok").disabled = true;
              document.getElementById("jobcard_rectmodulena").checked = true;
            }


          var jobcard_rectsystem = detalhesjobcardeainfo.jobcard_rectsystem;
          if(jobcard_rectsystem == "ok"){
            document.getElementById("jobcard_rectsystemok").checked = true;
            document.getElementById("jobcard_rectsystemnotok").disabled = true;
            document.getElementById("jobcard_rectsystemna").disabled = true;
          }else
            if(jobcard_rectsystem == "not ok"){
              document.getElementById("jobcard_rectsystemok").disabled = true;
              document.getElementById("jobcard_rectsystemnotok").checked = true;
              document.getElementById("jobcard_rectsystemna").disabled = true;
            }else{
              document.getElementById("jobcard_rectsystemok").disabled = true;
              document.getElementById("jobcard_rectsystemnotok").disabled = true;
              document.getElementById("jobcard_rectsystemna").checked = true;
            }


          var jobcard_hightemp = detalhesjobcardeainfo.jobcard_hightemp;
          if(jobcard_hightemp == "ok"){
            document.getElementById("jobcard_hightempok").checked = true;
            document.getElementById("jobcard_hightempnotok").disabled = true;
            document.getElementById("jobcard_hightempna").disabled = true;
          }else
            if(jobcard_hightemp == "not ok"){
              document.getElementById("jobcard_hightempok").disabled = true;
              document.getElementById("jobcard_hightempnotok").checked = true;
              document.getElementById("jobcard_hightempna").disabled = true;
            }else{
              document.getElementById("jobcard_hightempok").disabled = true;
              document.getElementById("jobcard_hightempnotok").disabled = true;
              document.getElementById("jobcard_hightempna").checked = true;
            }


           var jobcard_eainfocomments = detalhesjobcardantennasinfo.jobcard_eainfocomments;
          $("#jobcard_eainfocomments").val(jobcard_eainfocomments);
          $("#jobcard_eainfocomments").siblings('label').addClass('active');


          $('#jobcardeainfo_modal').openModal({dismissible:false});
          $('#jobcardeainfo_yes_btn_modal').addClass('hide');
        
        }

    });


    $('.txinfoModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardtxinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre TX não disponível':'TX information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardtxinfo = JSON.parse($(this).attr("datajobcardtxinfo"));

          var jobcard_internalearth = detalhesjobcardtxinfo.jobcard_internalearth;
          if(jobcard_internalearth == "ok"){
            document.getElementById("jobcard_internalearthok").checked = true;
            document.getElementById("jobcard_internalearthnotok").disabled = true;
            document.getElementById("jobcard_internalearthna").disabled = true;
          }else
            if(jobcard_internalearth == "not ok"){
              document.getElementById("jobcard_internalearthok").disabled = true;
              document.getElementById("jobcard_internalearthnotok").checked = true;
              document.getElementById("jobcard_internalearthna").disabled = true;
            }else{
              document.getElementById("jobcard_internalearthok").disabled = true;
              document.getElementById("jobcard_internalearthnotok").disabled = true;
              document.getElementById("jobcard_internalearthna").checked = true;
            }


          var jobcard_internelectconnect = detalhesjobcardtxinfo.jobcard_internelectconnect;
          if(jobcard_internelectconnect == "ok"){
            document.getElementById("jobcard_internelectconnectok").checked = true;
            document.getElementById("jobcard_internelectconnectnotok").disabled = true;
            document.getElementById("jobcard_internelectconnectna").disabled = true;
          }else
            if(jobcard_internelectconnect == "not ok"){
              document.getElementById("jobcard_internelectconnectok").disabled = true;
              document.getElementById("jobcard_internelectconnectnotok").checked = true;
              document.getElementById("jobcard_internelectconnectna").disabled = true;
            }else{
              document.getElementById("jobcard_internelectconnectok").disabled = true;
              document.getElementById("jobcard_internelectconnectnotok").disabled = true;
              document.getElementById("jobcard_internelectconnectna").checked = true;
            }


          var jobcard_internallabels = detalhesjobcardtxinfo.jobcard_internallabels;
          if(jobcard_internallabels == "ok"){
            document.getElementById("jobcard_internallabelsok").checked = true;
            document.getElementById("jobcard_internallabelsnotok").disabled = true;
            document.getElementById("jobcard_internallabelsna").disabled = true;
          }else
            if(jobcard_internallabels == "not ok"){
              document.getElementById("jobcard_internallabelsok").disabled = true;
              document.getElementById("jobcard_internallabelsnotok").checked = true;
              document.getElementById("jobcard_internallabelsna").disabled = true;
            }else{
              document.getElementById("jobcard_internallabelsok").disabled = true;
              document.getElementById("jobcard_internallabelsnotok").disabled = true;
              document.getElementById("jobcard_internallabelsna").checked = true;
            }


          var jobcard_internalddf = detalhesjobcardtxinfo.jobcard_internalddf;
          if(jobcard_internalddf == "ok"){
            document.getElementById("jobcard_internalddfok").checked = true;
            document.getElementById("jobcard_internalddfnotok").disabled = true;
            document.getElementById("jobcard_internalddfna").disabled = true;
          }else
            if(jobcard_internalddf == "not ok"){
              document.getElementById("jobcard_internalddfok").disabled = true;
              document.getElementById("jobcard_internalddfnotok").checked = true;
              document.getElementById("jobcard_internalddfna").disabled = true;
            }else{
              document.getElementById("jobcard_internalddfok").disabled = true;
              document.getElementById("jobcard_internalddfnotok").disabled = true;
              document.getElementById("jobcard_internalddfna").checked = true;
            }


          var jobcard_internalconnecttight = detalhesjobcardtxinfo.jobcard_internalconnecttight;
          if(jobcard_internalconnecttight == "ok"){
            document.getElementById("jobcard_internalconnecttightok").checked = true;
            document.getElementById("jobcard_internalconnecttightnotok").disabled = true;
            document.getElementById("jobcard_internalconnecttightna").disabled = true;
          }else
            if(jobcard_internalconnecttight == "not ok"){
              document.getElementById("jobcard_internalconnecttightok").disabled = true;
              document.getElementById("jobcard_internalconnecttightnotok").checked = true;
              document.getElementById("jobcard_internalconnecttightna").disabled = true;
            }else{
              document.getElementById("jobcard_internalconnecttightok").disabled = true;
              document.getElementById("jobcard_internalconnecttightnotok").disabled = true;
              document.getElementById("jobcard_internalconnecttightna").checked = true;
            }


          var jobcard_internalIFlabels = detalhesjobcardtxinfo.jobcard_internalIFlabels;
          if(jobcard_internalIFlabels == "ok"){
            document.getElementById("jobcard_internalIFlabelsok").checked = true;
            document.getElementById("jobcard_internalIFlabelsnotok").disabled = true;
            document.getElementById("jobcard_internalIFlabelsna").disabled = true;
          }else
            if(jobcard_internalIFlabels == "not ok"){
              document.getElementById("jobcard_internalIFlabelsok").disabled = true;
              document.getElementById("jobcard_internalIFlabelsnotok").checked = true;
              document.getElementById("jobcard_internalIFlabelsna").disabled = true;
            }else{
              document.getElementById("jobcard_internalIFlabelsok").disabled = true;
              document.getElementById("jobcard_internalIFlabelsnotok").disabled = true;
              document.getElementById("jobcard_internalIFlabelsna").checked = true;
            }


          var jobcard_txinternalcomm = detalhesjobcardtxinfo.jobcard_txinternalcomm;
          $("#jobcard_txinternalcomm").val(jobcard_txinternalcomm);
          $("#jobcard_txinternalcomm").siblings('label').addClass('active');


          var jobcard_externalbrackets = detalhesjobcardtxinfo.jobcard_externalbrackets;
          if(jobcard_externalbrackets == "ok"){
            document.getElementById("jobcard_externalbracketsok").checked = true;
            document.getElementById("jobcard_externalbracketsnotok").disabled = true;
            document.getElementById("jobcard_externalbracketsna").disabled = true;
          }else
            if(jobcard_externalbrackets == "not ok"){
              document.getElementById("jobcard_externalbracketsok").disabled = true;
              document.getElementById("jobcard_externalbracketsnotok").checked = true;
              document.getElementById("jobcard_externalbracketsna").disabled = true;
            }else{
              document.getElementById("jobcard_externalbracketsok").disabled = true;
              document.getElementById("jobcard_externalbracketsnotok").disabled = true;
              document.getElementById("jobcard_externalbracketsna").checked = true;
            }



          var jobcard_externalnutstight = detalhesjobcardtxinfo.jobcard_externalnutstight;
          if(jobcard_externalnutstight == "ok"){
            document.getElementById("jobcard_externalnutstightok").checked = true;
            document.getElementById("jobcard_externalnutstightnotok").disabled = true;
            document.getElementById("jobcard_externalnutstightna").disabled = true;
          }else
            if(jobcard_externalnutstight == "not ok"){
              document.getElementById("jobcard_externalnutstightok").disabled = true;
              document.getElementById("jobcard_externalnutstightnotok").checked = true;
              document.getElementById("jobcard_externalnutstightna").disabled = true;
            }else{
              document.getElementById("jobcard_externalnutstightok").disabled = true;
              document.getElementById("jobcard_externalnutstightnotok").disabled = true;
              document.getElementById("jobcard_externalnutstightna").checked = true;
            }


          var jobcard_externalearth = detalhesjobcardtxinfo.jobcard_externalearth;
          if(jobcard_externalearth == "ok"){
            document.getElementById("jobcard_externalearthok").checked = true;
            document.getElementById("jobcard_externalearthnotok").disabled = true;
            document.getElementById("jobcard_externalearthna").disabled = true;
          }else
            if(jobcard_externalearth == "not ok"){
              document.getElementById("jobcard_externalearthok").disabled = true;
              document.getElementById("jobcard_externalearthnotok").checked = true;
              document.getElementById("jobcard_externalearthna").disabled = true;
            }else{
              document.getElementById("jobcard_externalearthok").disabled = true;
              document.getElementById("jobcard_externalearthnotok").disabled = true;
              document.getElementById("jobcard_externalearthna").checked = true;
            }


          var jobcard_externalIFconntight = detalhesjobcardtxinfo.jobcard_externalIFconntight;
          if(jobcard_externalIFconntight == "ok"){
            document.getElementById("jobcard_externalIFconntightok").checked = true;
            document.getElementById("jobcard_externalIFconntightnotok").disabled = true;
            document.getElementById("jobcard_externalIFconntightna").disabled = true;
          }else
            if(jobcard_externalIFconntight == "not ok"){
              document.getElementById("jobcard_externalIFconntightok").disabled = true;
              document.getElementById("jobcard_externalIFconntightnotok").checked = true;
              document.getElementById("jobcard_externalIFconntightna").disabled = true;
            }else{
              document.getElementById("jobcard_externalIFconntightok").disabled = true;
              document.getElementById("jobcard_externalearthnotok").disabled = true;
              document.getElementById("jobcard_externalIFconntightna").checked = true;
            }


          var jobcard_externallabels = detalhesjobcardtxinfo.jobcard_externallabels;
          if(jobcard_externallabels == "ok"){
            document.getElementById("jobcard_externallabelsok").checked = true;
            document.getElementById("jobcard_externallabelsnotok").disabled = true;
            document.getElementById("jobcard_externallabelsna").disabled = true;
          }else
            if(jobcard_externallabels == "not ok"){
              document.getElementById("jobcard_externallabelsok").disabled = true;
              document.getElementById("jobcard_externallabelsnotok").checked = true;
              document.getElementById("jobcard_externallabelsna").disabled = true;
            }else{
              document.getElementById("jobcard_externallabelsok").disabled = true;
              document.getElementById("jobcard_externallabelsnotok").disabled = true;
              document.getElementById("jobcard_externallabelsna").checked = true;
            }


          var jobcard_externalwaterproof = detalhesjobcardtxinfo.jobcard_externalwaterproof;
          if(jobcard_externalwaterproof == "ok"){
            document.getElementById("jobcard_externalwaterproofok").checked = true;
            document.getElementById("jobcard_externalwaterproofnotok").disabled = true;
            document.getElementById("jobcard_externalwaterproofna").disabled = true;
          }else
            if(jobcard_externalwaterproof == "not ok"){
              document.getElementById("jobcard_externalwaterproofok").disabled = true;
              document.getElementById("jobcard_externalwaterproofnotok").checked = true;
              document.getElementById("jobcard_externalwaterproofna").disabled = true;
            }else{
              document.getElementById("jobcard_externalwaterproofok").disabled = true;
              document.getElementById("jobcard_externalwaterproofnotok").disabled = true;
              document.getElementById("jobcard_externalwaterproofna").checked = true;
            }


          var jobcard_externalcomm = detalhesjobcardtxinfo.jobcard_externalcomm;
          $("#jobcard_externalcomm").val(jobcard_externalcomm);
          $("#jobcard_externalcomm").siblings('label').addClass('active');


          $('#jobcardtxinfo_modal').openModal({dismissible:false});
          $('#jobcardtxinfo_yes_btn_modal').addClass('hide');
        
        }

    });


    
    $('.vsatinfoModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardvsatinfo");

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre VSAT não disponível':'VSAT information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardvsatinfo = JSON.parse($(this).attr("datajobcardvsatinfo"));

          var jobcard_vsatlinkfrom = detalhesjobcardvsatinfo.jobcard_vsatlinkfrom;
          $("#jobcard_vsatlinkfrom").val(jobcard_vsatlinkfrom);
          $("#jobcard_vsatlinkfrom").siblings('label').removeClass('active');


          var jobcard_vsatlinkto = detalhesjobcardvsatinfo.jobcard_vsatlinkto;
          $("#jobcard_vsatlinkto").val(jobcard_vsatlinkto);
          $("#jobcard_vsatlinkto").siblings('label').removeClass('active');


          var jobcard_ebno = detalhesjobcardvsatinfo.jobcard_ebno;
          $("#jobcard_ebno").val(jobcard_ebno);
          $("#jobcard_ebno").siblings('label').removeClass('active');


          var jobcard_txlevel = detalhesjobcardvsatinfo.jobcard_txlevel;
          $("#jobcard_txlevel").val(jobcard_txlevel);
          $("#jobcard_txlevel").siblings('label').removeClass('active');


          var jobcard_equipmentlabels = detalhesjobcardvsatinfo.jobcard_equipmentlabels;
          if(jobcard_equipmentlabels == "ok"){
            document.getElementById("jobcard_equipmentlabelsok").checked = true;
            document.getElementById("jobcard_equipmentlabelsnotok").disabled = true;
            document.getElementById("jobcard_equipmentlabelsna").disabled = true;
          }else
            if(jobcard_equipmentlabels == "not ok"){
              document.getElementById("jobcard_equipmentlabelsok").disabled = true;
              document.getElementById("jobcard_equipmentlabelsnotok").checked = true;
              document.getElementById("jobcard_equipmentlabelsna").disabled = true;
            }else{
              document.getElementById("jobcard_equipmentlabelsok").disabled = true;
              document.getElementById("jobcard_equipmentlabelsnotok").disabled = true;
              document.getElementById("jobcard_equipmentlabelsna").checked = true;
            }


          var jobcard_cableslabels = detalhesjobcardvsatinfo.jobcard_cableslabels;
          if(jobcard_cableslabels == "ok"){
            document.getElementById("jobcard_cableslabelsok").checked = true;
            document.getElementById("jobcard_cableslabelsnotok").disabled = true;
            document.getElementById("jobcard_cableslabelsna").disabled = true;
          }else
            if(jobcard_cableslabels == "not ok"){
              document.getElementById("jobcard_cableslabelsok").disabled = true;
              document.getElementById("jobcard_cableslabelsnotok").checked = true;
              document.getElementById("jobcard_cableslabelsna").disabled = true;
            }else{
              document.getElementById("jobcard_cableslabelsok").disabled = true;
              document.getElementById("jobcard_cableslabelsnotok").disabled = true;
              document.getElementById("jobcard_cableslabelsna").checked = true;
            }


          var jobcard_entrysealed = detalhesjobcardvsatinfo.jobcard_entrysealed;
          if(jobcard_entrysealed == "ok"){
            document.getElementById("jobcard_entrysealedok").checked = true;
            document.getElementById("jobcard_entrysealednotok").disabled = true;
            document.getElementById("jobcard_entrysealedna").disabled = true;
          }else
            if(jobcard_entrysealed == "not ok"){
              document.getElementById("jobcard_entrysealedok").disabled = true;
              document.getElementById("jobcard_entrysealednotok").checked = true;
              document.getElementById("jobcard_entrysealedna").disabled = true;
            }else{
              document.getElementById("jobcard_entrysealedok").disabled = true;
              document.getElementById("jobcard_entrysealednotok").disabled = true;
              document.getElementById("jobcard_entrysealedna").checked = true;
            }


          var jobcard_conduittrunksclean = detalhesjobcardvsatinfo.jobcard_conduittrunksclean;
          if(jobcard_conduittrunksclean == "ok"){
            document.getElementById("jobcard_conduittrunkscleanok").checked = true;
            document.getElementById("jobcard_conduittrunkscleannotok").disabled = true;
            document.getElementById("jobcard_conduittrunkscleanna").disabled = true;
          }else
            if(jobcard_conduittrunksclean == "not ok"){
              document.getElementById("jobcard_conduittrunkscleanok").disabled = true;
              document.getElementById("jobcard_conduittrunkscleannotok").checked = true;
              document.getElementById("jobcard_conduittrunkscleanna").disabled = true;
            }else{
              document.getElementById("jobcard_conduittrunkscleanok").disabled = true;
              document.getElementById("jobcard_conduittrunkscleannotok").disabled = true;
              document.getElementById("jobcard_conduittrunkscleanna").checked = true;
            }


          var jobcard_230vrecLN = detalhesjobcardvsatinfo.jobcard_230vrecLN;
          $("#jobcard_230vrecLN").val(jobcard_230vrecLN);
          $("#jobcard_230vrecLN").siblings('label').removeClass('active');

          var jobcard_230vrecLE = detalhesjobcardvsatinfo.jobcard_230vrecLE;
          $("#jobcard_230vrecLE").val(jobcard_230vrecLE);
          $("#jobcard_230vrecLE").siblings('label').removeClass('active');

          var jobcard_230vrecNE = detalhesjobcardvsatinfo.jobcard_230vrecNE;
          $("#jobcard_230vrecNE").val(jobcard_230vrecNE);
          $("#jobcard_230vrecNE").siblings('label').removeClass('active');

          var jobcard_230vrecEEBar = detalhesjobcardvsatinfo.jobcard_230vrecEEBar;
          $("#jobcard_230vrecEEBar").val(jobcard_230vrecEEBar);
          $("#jobcard_230vrecEEBar").siblings('label').removeClass('active');



          var jobcard_downloadmodemconfig = detalhesjobcardvsatinfo.jobcard_downloadmodemconfig;
          if(jobcard_downloadmodemconfig == "ok"){
            document.getElementById("jobcard_downloadmodemconfigok").checked = true;
            document.getElementById("jobcard_downloadmodemconfignotok").disabled = true;
            document.getElementById("jobcard_downloadmodemconfigna").disabled = true;
          }else
            if(jobcard_downloadmodemconfig == "not ok"){
              document.getElementById("jobcard_downloadmodemconfigok").disabled = true;
              document.getElementById("jobcard_downloadmodemconfignotok").checked = true;
              document.getElementById("jobcard_downloadmodemconfigna").disabled = true;
            }else{
              document.getElementById("jobcard_downloadmodemconfigok").disabled = true;
              document.getElementById("jobcard_downloadmodemconfignotok").disabled = true;
              document.getElementById("jobcard_downloadmodemconfigna").checked = true;
            }


          var jobcard_checkplugsconntight = detalhesjobcardvsatinfo.jobcard_checkplugsconntight;
          if(jobcard_checkplugsconntight == "ok"){
            document.getElementById("jobcard_checkplugsconntightok").checked = true;
            document.getElementById("jobcard_checkplugsconntightnotok").disabled = true;
            document.getElementById("jobcard_checkplugsconntightna").disabled = true;
          }else
            if(jobcard_checkplugsconntight == "not ok"){
              document.getElementById("jobcard_checkplugsconntightok").disabled = true;
              document.getElementById("jobcard_checkplugsconntightnotok").checked = true;
              document.getElementById("jobcard_checkplugsconntightna").disabled = true;
            }else{
              document.getElementById("jobcard_checkplugsconntightok").disabled = true;
              document.getElementById("jobcard_checkplugsconntightnotok").disabled = true;
              document.getElementById("jobcard_checkplugsconntightna").checked = true;
            }



          var jobcard_checkdishplunthclean = detalhesjobcardvsatinfo.jobcard_checkdishplunthclean;
          if(jobcard_checkdishplunthclean == "ok"){
            document.getElementById("jobcard_checkdishplunthcleanok").checked = true;
            document.getElementById("jobcard_checkdishplunthcleannotok").disabled = true;
            document.getElementById("jobcard_checkdishplunthcleanna").disabled = true;
          }else
            if(jobcard_checkdishplunthclean == "not ok"){
              document.getElementById("jobcard_checkdishplunthcleanok").disabled = true;
              document.getElementById("jobcard_checkdishplunthcleannotok").checked = true;
              document.getElementById("jobcard_checkdishplunthcleanna").disabled = true;
            }else{
              document.getElementById("jobcard_checkdishplunthcleanok").disabled = true;
              document.getElementById("jobcard_checkdishplunthcleannotok").disabled = true;
              document.getElementById("jobcard_checkdishplunthcleanna").checked = true;
            }


          var jobcard_checkdishcracksagg = detalhesjobcardvsatinfo.jobcard_checkdishcracksagg;
          if(jobcard_checkdishcracksagg == "ok"){
            document.getElementById("jobcard_checkdishcracksaggok").checked = true;
            document.getElementById("jobcard_checkdishcracksaggnotok").disabled = true;
            document.getElementById("jobcard_checkdishcracksaggna").disabled = true;
          }else
            if(jobcard_checkdishcracksagg == "not ok"){
              document.getElementById("jobcard_checkdishcracksaggok").disabled = true;
              document.getElementById("jobcard_checkdishcracksaggnotok").checked = true;
              document.getElementById("jobcard_checkdishcracksaggna").disabled = true;
            }else{
              document.getElementById("jobcard_checkdishcracksaggok").disabled = true;
              document.getElementById("jobcard_checkdishcracksaggnotok").disabled = true;
              document.getElementById("jobcard_checkdishcracksaggna").checked = true;
            }


          var jobcard_checkgalvaniseditems = detalhesjobcardvsatinfo.jobcard_checkgalvaniseditems;
          if(jobcard_checkgalvaniseditems == "ok"){
            document.getElementById("jobcard_checkgalvaniseditemsok").checked = true;
            document.getElementById("jobcard_checkgalvaniseditemsnotok").disabled = true;
            document.getElementById("jobcard_checkgalvaniseditemsna").disabled = true;
          }else
            if(jobcard_checkgalvaniseditems == "not ok"){
              document.getElementById("jobcard_checkgalvaniseditemsok").disabled = true;
              document.getElementById("jobcard_checkgalvaniseditemsnotok").checked = true;
              document.getElementById("jobcard_checkgalvaniseditemsna").disabled = true;
            }else{
              document.getElementById("jobcard_checkgalvaniseditemsok").disabled = true;
              document.getElementById("jobcard_checkgalvaniseditemsnotok").disabled = true;
              document.getElementById("jobcard_checkgalvaniseditemsna").checked = true;
            }


          var jobcard_checkdishdentsbumpsplit = detalhesjobcardvsatinfo.jobcard_checkdishdentsbumpsplit;
          if(jobcard_checkdishdentsbumpsplit == "ok"){
            document.getElementById("jobcard_checkdishdentsbumpsplitok").checked = true;
            document.getElementById("jobcard_checkdishdentsbumpsplitnotok").disabled = true;
            document.getElementById("jobcard_checkdishdentsbumpsplitna").disabled = true;
          }else
            if(jobcard_checkdishdentsbumpsplit == "not ok"){
              document.getElementById("jobcard_checkdishdentsbumpsplitok").disabled = true;
              document.getElementById("jobcard_checkdishdentsbumpsplitnotok").checked = true;
              document.getElementById("jobcard_checkdishdentsbumpsplitna").disabled = true;
            }else{
              document.getElementById("jobcard_checkdishdentsbumpsplitok").disabled = true;
              document.getElementById("jobcard_checkdishdentsbumpsplitnotok").disabled = true;
              document.getElementById("jobcard_checkdishdentsbumpsplitna").checked = true;
            }


          var jobcard_checkfanintsakevent = detalhesjobcardvsatinfo.jobcard_checkfanintsakevent;
          if(jobcard_checkfanintsakevent == "ok"){
            document.getElementById("jobcard_checkfanintsakeventok").checked = true;
            document.getElementById("jobcard_checkfanintsakeventnotok").disabled = true;
            document.getElementById("jobcard_checkfanintsakeventna").disabled = true;
          }else
            if(jobcard_checkfanintsakevent == "not ok"){
              document.getElementById("jobcard_checkfanintsakeventok").disabled = true;
              document.getElementById("jobcard_checkfanintsakeventnotok").checked = true;
              document.getElementById("jobcard_checkfanintsakeventna").disabled = true;
            }else{
              document.getElementById("jobcard_checkfanintsakeventok").disabled = true;
              document.getElementById("jobcard_checkfanintsakeventnotok").disabled = true;
              document.getElementById("jobcard_checkfanintsakeventna").checked = true;
            }


          var jobcard_checkdishearthdensorpaste = detalhesjobcardvsatinfo.jobcard_checkdishearthdensorpaste;
          if(jobcard_checkdishearthdensorpaste == "ok"){
            document.getElementById("jobcard_checkdishearthdensorpasteok").checked = true;
            document.getElementById("jobcard_checkfanintsakeventnotok").disabled = true;
            document.getElementById("jobcard_checkdishearthdensorpastena").disabled = true;
          }else
            if(jobcard_checkdishearthdensorpaste == "not ok"){
              document.getElementById("jobcard_checkdishearthdensorpasteok").disabled = true;
              document.getElementById("jobcard_checkfanintsakeventnotok").checked = true;
              document.getElementById("jobcard_checkdishearthdensorpastena").disabled = true;
            }else{
              document.getElementById("jobcard_checkdishearthdensorpasteok").disabled = true;
              document.getElementById("jobcard_checkfanintsakeventnotok").disabled = true;
              document.getElementById("jobcard_checkdishearthdensorpastena").checked = true;
            }


          var jobcard_checkdishtight = detalhesjobcardvsatinfo.jobcard_checkdishtight;
          if(jobcard_checkdishtight == "ok"){
            document.getElementById("jobcard_checkdishtightok").checked = true;
            document.getElementById("jobcard_checkdishtightnotok").disabled = true;
            document.getElementById("jobcard_checkdishtightna").disabled = true;
          }else
            if(jobcard_checkdishtight == "not ok"){
              document.getElementById("jobcard_checkdishtightok").disabled = true;
              document.getElementById("jobcard_checkdishtightnotok").checked = true;
              document.getElementById("jobcard_checkdishtightna").disabled = true;
            }else{
              document.getElementById("jobcard_checkdishtightok").disabled = true;
              document.getElementById("jobcard_checkdishtightnotok").disabled = true;
              document.getElementById("jobcard_checkdishtightna").checked = true;
            }


          var jobcard_checkentrysealed = detalhesjobcardvsatinfo.jobcard_checkentrysealed;
          if(jobcard_checkentrysealed == "ok"){
            document.getElementById("jobcard_checkentrysealedok").checked = true;
            document.getElementById("jobcard_checkentrysealednotok").disabled = true;
            document.getElementById("jobcard_checkentrysealedna").disabled = true;
          }else
            if(jobcard_checkentrysealed == "not ok"){
              document.getElementById("jobcard_checkentrysealedok").disabled = true;
              document.getElementById("jobcard_checkentrysealednotok").checked = true;
              document.getElementById("jobcard_checkentrysealedna").disabled = true;
            }else{
              document.getElementById("jobcard_checkentrysealedok").disabled = true;
              document.getElementById("jobcard_checkentrysealednotok").disabled = true;
              document.getElementById("jobcard_checkentrysealedna").checked = true;
            }


          var jobcard_checksignalpathobst = detalhesjobcardvsatinfo.jobcard_checksignalpathobst;
          if(jobcard_checksignalpathobst == "ok"){
            document.getElementById("jobcard_checksignalpathobstok").checked = true;
            document.getElementById("jobcard_checksignalpathobstnotok").disabled = true;
            document.getElementById("jobcard_checksignalpathobstna").disabled = true;
          }else
            if(jobcard_checksignalpathobst == "not ok"){
              document.getElementById("jobcard_checksignalpathobstok").disabled = true;
              document.getElementById("jobcard_checksignalpathobstnotok").checked = true;
              document.getElementById("jobcard_checksignalpathobstna").disabled = true;
            }else{
              document.getElementById("jobcard_checksignalpathobstok").disabled = true;
              document.getElementById("jobcard_checksignalpathobstnotok").disabled = true;
              document.getElementById("jobcard_checksignalpathobstna").checked = true;
            }


          var jobcard_vsatcomments = detalhesjobcardvsatinfo.jobcard_vsatcomments;
          $("#jobcard_vsatcomments").val(jobcard_vsatcomments);
          $("#jobcard_vsatcomments").siblings('label').removeClass('active');


          $('#jobcardvsatinfo_modal').openModal({dismissible:false});
          $('#jobcardvsatinfo_yes_btn_modal').addClass('hide');
        
        }

    });



    $('.photoModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardphotoinfo");
      // console.log(JSON.parse(comparador))

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Fotos não disponível':'Photos information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardphotoinfo = JSON.parse($(this).attr("datajobcardphotoinfo"));
          // $('#msform').removeClass('hide');
          // $('#jobcardphotoinfodetalhes_cancel').removeClass('hide');


          for(var i = 0, j = detalhesjobcardphotoinfo.length; i<j;i++){
            var tt = document.getElementById("msform");
            var dir  = detalhesjobcardphotoinfo[i];

            tt.innerHTML += '<div class="row"><img class="center" style="width:80%; height:80%; padding-top:10px" src='+dir+'></div>';

          }

          // tt.innerHTML +='<div class="row"><div class="row"><button type="button" id="jobcarddetalhesjobcardphotoinfo" class="action-button btn modal-action modal-close waves-effect waves-green btn-flat">Back</button></div>';

          $('#jobcardphotoinfodetalhes_modal').openModal();
          // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src='+dir+'>')
          
        
        }

    });


    $('.concernsModalDetails').click(function(){

      var comparador = $(this).attr("datajobcardconcernsinfo");
      // console.log(JSON.parse(comparador))

      if(comparador === "{}"){

        $('#msg_title_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
        $('#msg_content_modal').html((($(".lang-picker > .selected").attr("value")=="pt")?'Informação sobre Preocupações não disponível':'Concerns information not available'))
        $('#msg_modal').openModal({dismissible:false});

      }else{
          var detalhesjobcardconcernsinfo = JSON.parse($(this).attr("datajobcardconcernsinfo"));


          var jobcard_concernsmaintnumber = detalhesjobcardconcernsinfo.jobcard_concernsmaintnumber;
          $("#jobcard_concernsmaintnumber").val(jobcard_concernsmaintnumber);
          $("#jobcard_concernsmaintnumber").siblings('label').removeClass('active');


          var jobcard_concernstype = detalhesjobcardconcernsinfo.jobcard_concernstype;
          $("#jobcard_concernstype").val(jobcard_concernstype);
          // $("#jobcard_concernsmaintnumber").siblings('label').removeClass('active');


          var jobcard_concernsdescription = detalhesjobcardconcernsinfo.jobcard_concernsdescription;
          $("#jobcard_concernsdescription").val(jobcard_concernsdescription);
          $("#jobcard_concernsdescription").siblings('label').removeClass('active');


          var jobcard_concernsdate = detalhesjobcardconcernsinfo.jobcard_concernsdate;
          $("#jobcard_concernsdate").val(jobcard_concernsdate);
          $("#jobcard_concernsdate").siblings('label').removeClass('active');


          var jobcard_concernsacknowledged = detalhesjobcardconcernsinfo.jobcard_concernsacknowledged;
          $("#jobcard_concernsacknowledged").val(jobcard_concernsacknowledged);
          $("#jobcard_concernsacknowledged").siblings('label').removeClass('active');


          $('#jobcardconcernsinfo_modal').openModal({dismissible:false});
          $('#jobcardconcernsinfo_yes_btn_modal').addClass('hide');
          
          
        
        }

    });
    

    $('#pergunta3yes').click(function(){

      $('#mostrardetalhespergunta3').removeClass('hide');

    });

    $('#pergunta3no').click(function(){

      $('#mostrardetalhespergunta3').addClass('hide');

    });


    $('#pergunta5yes').click(function(){

      $('#mostrardetalhespergunta5').removeClass('hide');

    });

    $('#pergunta5no').click(function(){

      $('#mostrardetalhespergunta5').addClass('hide');

    });

    $('#pergunta6yes').click(function(){

      $('#mostrardetalhespergunta6').removeClass('hide');

    });

    $('#pergunta6no').click(function(){

      $('#mostrardetalhespergunta6').addClass('hide');

    });

    $('#pergunta7yes').click(function(){

      $('#mostrardetalhespergunta7').removeClass('hide');

    });

    $('#pergunta7no').click(function(){

      $('#mostrardetalhespergunta7').addClass('hide');

    });

    $('#pergunta8yes').click(function(){

      $('#mostrardetalhespergunta8').removeClass('hide');

    });

    $('#pergunta8no').click(function(){

      $('#mostrardetalhespergunta8').addClass('hide');

    });

    $('#pergunta9yes').click(function(){

      $('#mostrardetalhespergunta9').removeClass('hide');

    });

    $('#pergunta9no').click(function(){

      $('#mostrardetalhespergunta9').addClass('hide');

    });

    $('#trocabotoes').click(function(){

      var pergunta1=$("input[name='pergunta1']:checked").val();
      var pergunta2=$("input[name='pergunta2']:checked").val();
      var pergunta4=$("input[name='pergunta4']:checked").val();

      if((pergunta1 == "Yes") || (pergunta2 == "Yes") || (pergunta4 == "Yes")){
        $('.captarinquerito').addClass('hide');
        $('#verAnexo').removeClass('hide');
      }

    });

    $('#verAnexo').click(function(){

      $('.captarinquerito').removeClass('hide');

    });

    $('#voltarPergunta8').click(function(){

      $('.captarinquerito').addClass('hide');
      
    });

    $('.captarinquerito').click(function(){

      $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
      $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a informação ':'Do you really want to save <b>') +(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
      $('#yes_no_modal').openModal({dismissible:false});
      $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){

        var rule="/inquerito/novo";
        var inqueritoformdata = new FormData();
        

        var pergunta1=$("input[name='pergunta1']:checked").val();
        inqueritoformdata.append("pergunta1", pergunta1);

        var anexo = {};

        anexo.companyname=$("#companyname").val();
        anexo.companyresgistnum=$("#companyresgistnum").val();
        anexo.surname=$("#surname").val();
        anexo.fornames=$("#fornames").val();
        anexo.residentialadd=$("#residentialadd").val();
        anexo.businessadd=$("#businessadd").val();
        anexo.postaladd=$("#postaladd").val();
        anexo.nationality=$("#nationality").val();
        anexo.datebirth=$("#datebirth").val();
        anexo.passportnum=$("#passportnum").val();
        anexo.occupation=$("#occupation").val();

        inqueritoformdata.append("anexo", JSON.stringify(anexo));

        var pergunta2=$("input[name='pergunta2']:checked").val();
        inqueritoformdata.append("pergunta2", pergunta2);

        var pergunta3=$("input[name='pergunta3']:checked").val();
        inqueritoformdata.append("pergunta3", pergunta3);

        var pergunta3details=$("#pergunta3details").val();
        inqueritoformdata.append("pergunta3details", pergunta3details);

        var pergunta4=$("input[name='pergunta4']:checked").val();
        inqueritoformdata.append("pergunta4", pergunta4);

        var pergunta5=$("input[name='pergunta5']:checked").val();
        inqueritoformdata.append("pergunta5", pergunta5);

        var pergunta5details=$("#pergunta5details").val();
        inqueritoformdata.append("pergunta5details", pergunta5details);

        var pergunta6=$("input[name='pergunta6']:checked").val();
        inqueritoformdata.append("pergunta6", pergunta6);

        var pergunta6details=$("#pergunta6details").val();
        inqueritoformdata.append("pergunta6details", pergunta6details);

        var pergunta7=$("input[name='pergunta6']:checked").val();
        inqueritoformdata.append("pergunta7", pergunta7);

        var pergunta7details=$("#pergunta7details").val();
        inqueritoformdata.append("pergunta7details", pergunta7details);

        var pergunta8=$("input[name='pergunta8']:checked").val();
        inqueritoformdata.append("pergunta8", pergunta8);

        var pergunta8details=$("#pergunta8details").val();
        inqueritoformdata.append("pergunta8details", pergunta8details);

        var pergunta9=$("input[name='pergunta9']:checked").val();
        inqueritoformdata.append("pergunta9", pergunta9);

        var pergunta9details=$("#pergunta9details").val();
        inqueritoformdata.append("pergunta9details", pergunta9details);


        var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
        var ano = (new Date()).getFullYear();
        var data=dia + "/" + mes + "/" + ano;
        inqueritoformdata.append("data", data);

        
        var signature=$("#recolherdados").attr("detalhessession");
        inqueritoformdata.append("signature", signature);
        

        var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',rule, true);
          xhr.send(inqueritoformdata);

           setTimeout(function(){
              window.location.href="/inquerito";
          }, 1000);

      });

    });


    $('#captarCliente').click(function(){
      var codigo = $("#cliente_cod").val();
      var dadoscomp=JSON.parse($("#captarCliente").attr("recolhadados"));
      var comparador = false;

        for(var i = 0, j = dadoscomp.length; i<j;i++){

          if(codigo == dadoscomp[i].cliente_cod){
            comparador = true;
          }
        }

      if(comparador == true){

          $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O código do cliente já se encontra registado.':'The client code is already registered.'));
          $('#msg_modal').openModal();

      }else{

        if(validar()){
          $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a informação ':'Do you really want to save <b>') +$('#cliente_nome').val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
          $('#yes_no_modal').openModal({dismissible:false});
          // $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
          $('#yes_btn_modal').click(function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();

            var clienteformdata = new FormData();
            var rule="/cliente/novo";

            var cliente_cod=$("#cliente_cod").val();
            clienteformdata.append("cliente_cod", cliente_cod);

            var cliente_nome=$("#cliente_nome").val();
            clienteformdata.append("cliente_nome", cliente_nome);

            var cliente_nuit=$("#cliente_nuit").val();
            clienteformdata.append("cliente_nuit", cliente_nuit);

            var cliente_filial=$("#cliente_filial").val();
            clienteformdata.append("cliente_filial", cliente_filial);

            var cliente_telefone=$("#cliente_telefone").val();
            clienteformdata.append("cliente_telefone", cliente_telefone);

            var cliente_web=$("#cliente_web").val();
            clienteformdata.append("cliente_web", cliente_web);

            var cliente_outros=$("#cliente_outros").val();
            clienteformdata.append("cliente_outros", cliente_outros);

            var cliente_endfisico=$("#cliente_endfisico").val();
            clienteformdata.append("cliente_endfisico", cliente_endfisico);

            var cliente_bairrofisico=$("#cliente_bairrofisico").val();
            clienteformdata.append("cliente_bairrofisico", cliente_bairrofisico);

            var cliente_cidadefisico=$("#cliente_cidadefisico").val();
            clienteformdata.append("cliente_cidadefisico", cliente_cidadefisico);

            var cliente_provinciafisico=$("#cliente_provinciafisico").val();
            clienteformdata.append("cliente_provinciafisico", cliente_provinciafisico);

            var cliente_codpostalfisico=$("#cliente_codpostalfisico").val();
            clienteformdata.append("cliente_codpostalfisico", cliente_codpostalfisico);

            var cliente_paisfisico=$("#cliente_paisfisico").val();
            clienteformdata.append("cliente_paisfisico", cliente_paisfisico);

            var cliente_endpostal=$("#cliente_endpostal").val();
            clienteformdata.append("cliente_endpostal", cliente_endpostal);

            var cliente_bairropostal=$("#cliente_bairropostal").val();
            clienteformdata.append("cliente_bairropostal", cliente_bairropostal);

            var cliente_cidadepostal=$("#cliente_cidadepostal").val();
            clienteformdata.append("cliente_cidadepostal", cliente_cidadepostal);

            var cliente_provinciapostal=$("#cliente_provinciapostal").val();
            clienteformdata.append("cliente_provinciapostal", cliente_provinciapostal);

            var cliente_codpostalpostal=$("#cliente_codpostalpostal").val();
            clienteformdata.append("cliente_codpostalpostal", cliente_codpostalpostal);

            var cliente_paispostal=$("#cliente_paispostal").val();
            clienteformdata.append("cliente_paispostal", cliente_paispostal);

            var dataregistocliente = new Date();
            clienteformdata.append("dataregistocliente", dataregistocliente);

            var contactosArrayCliente = contactosArray;
            clienteformdata.append("contactosArrayCliente", JSON.stringify(contactosArrayCliente));

            //console.log(contactosArray);

            var xhr = new XMLHttpRequest();
                // Add any event handlers here...
                xhr.open('POST',rule, true);
                xhr.send(clienteformdata);

                setTimeout(function(){
               window.location.href="/cliente/clientesupplier/client_home";
              }, 1000);

          });
        }
      }
  });


    $('#captarFornecedor').click(function(){

        var codigo = $("#fornecedor_cod").val();
        var dadoscomp=JSON.parse($("#captarFornecedor").attr("recolhadados"));
        var comparador = false;

        for(var i = 0, j = dadoscomp.length; i<j;i++){

          if(codigo == dadoscomp[i].fornecedor_cod){
            comparador = true;
          }
        }

        if(comparador == true){
          $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O código do fornecedor já se encontra registado.':'The supplier code is already registered.'));
          $('#msg_modal').openModal();
        }
        else if($("#cliente_termos").val() == null){
          $('#msg_title_modal').html('Campo Não Preenchido')
          $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Por favor preencha os Termos ':'Please fill Terms <b>') + (($(".lang-picker").attr("value")=="pt")?'</b> !':"</b>!"));
          $('#msg_modal').openModal();
        }else{

          if(validar()){
            $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
            $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a informação ':'Do you really want to save <b>') +$('#cliente_nome').val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
            $('#yes_no_modal').openModal({dismissible:false});
            // $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
            $('#yes_btn_modal').click(function(e){
                  e.stopPropagation();
                  e.stopImmediatePropagation();

                  
                  var fornecedorformdata= new FormData();

                  var fornecedor_cod=$("#fornecedor_cod").val();
                  fornecedorformdata.append("fornecedor_cod", fornecedor_cod);

                  var rule="/cliente/novofornecedor/" + fornecedor_cod;

                  var cliente_nome=$("#cliente_nome").val();
                  fornecedorformdata.append("cliente_nome", cliente_nome);

                  var cliente_nuit=$("#cliente_nuit").val();
                  fornecedorformdata.append("cliente_nuit", cliente_nuit);

                  var cliente_filial=$("#cliente_filial").val();
                  fornecedorformdata.append("cliente_filial", cliente_filial);

                  var cliente_telefone=$("#cliente_telefone").val();
                  fornecedorformdata.append("cliente_telefone", cliente_telefone);

                  var cliente_web=$("#cliente_web").val();
                  fornecedorformdata.append("cliente_web", cliente_web);

                  var cliente_outros=$("#cliente_outros").val();
                  fornecedorformdata.append("cliente_outros", cliente_outros);

                  var cliente_endfisico=$("#cliente_endfisico").val();
                  fornecedorformdata.append("cliente_endfisico", cliente_endfisico);

                  var cliente_bairrofisico=$("#cliente_bairrofisico").val();
                  fornecedorformdata.append("cliente_bairrofisico", cliente_bairrofisico);

                  var cliente_cidadefisico=$("#cliente_cidadefisico").val();
                  fornecedorformdata.append("cliente_cidadefisico", cliente_cidadefisico);

                  var cliente_provinciafisico=$("#cliente_provinciafisico").val();
                  fornecedorformdata.append("cliente_provinciafisico", cliente_provinciafisico);

                  var cliente_codpostalfisico=$("#cliente_codpostalfisico").val();
                  fornecedorformdata.append("cliente_codpostalfisico", cliente_codpostalfisico);

                  var cliente_paisfisico=$("#cliente_paisfisico").val();
                  fornecedorformdata.append("cliente_paisfisico", cliente_paisfisico);

                  var cliente_endpostal=$("#cliente_endpostal").val();
                  fornecedorformdata.append("cliente_endpostal", cliente_endpostal);

                  var cliente_bairropostal=$("#cliente_bairropostal").val();
                  fornecedorformdata.append("cliente_bairropostal", cliente_bairropostal);

                  var cliente_cidadepostal=$("#cliente_cidadepostal").val();
                  fornecedorformdata.append("cliente_cidadepostal", cliente_cidadepostal);

                  var cliente_provinciapostal=$("#cliente_provinciapostal").val();
                  fornecedorformdata.append("cliente_provinciapostal", cliente_provinciapostal);

                  var cliente_codpostalpostal=$("#cliente_codpostalpostal").val();
                  fornecedorformdata.append("cliente_codpostalpostal", cliente_codpostalpostal);

                  var cliente_paispostal=$("#cliente_paispostal").val();
                  fornecedorformdata.append("cliente_paispostal", cliente_paispostal);

                  var dataregistocliente = new Date();
                  fornecedorformdata.append("dataregistocliente", dataregistocliente);

                  var cliente_termos=$("#cliente_termos").val();
                  fornecedorformdata.append("cliente_termos", cliente_termos);

                  var contactosArrayCliente = contactosArray;
                  fornecedorformdata.append("contactosArrayCliente", JSON.stringify(contactosArrayCliente));

                  var carta_apresentacao_empresa=$("#carta_apresentacao_empresa").get(0).files;
                  fornecedorformdata.append('carta_apresentacao_empresa', carta_apresentacao_empresa[0]);

                  var alvara=$("#alvara").get(0).files;
                  fornecedorformdata.append('alvara', alvara[0]);

                  var certidao_entidades_legais=$("#certidao_entidades_legais").get(0).files;
                  fornecedorformdata.append('certidao_entidades_legais', certidao_entidades_legais[0]);

                  var nuit=$("#nuit").get(0).files;
                  fornecedorformdata.append('nuit', nuit[0]);

                  var nuel=$("#nuel").get(0).files;
                  fornecedorformdata.append('nuel', nuel[0]);

                  var carta_confirmacao_banco=$("#carta_confirmacao_banco").get(0).files;
                  fornecedorformdata.append('carta_confirmacao_banco', carta_confirmacao_banco[0]);


                    var xhr = new XMLHttpRequest();
                      // Add any event handlers here...
                      xhr.open('POST',rule, true);
                      xhr.send(fornecedorformdata);

                      setTimeout(function(){
                     window.location.href="/cliente/clientesupplier/supplier_home";
                    }, 1000);

                });
              }
          }
  });


    $('#editarCliente').click(function(){

        var dadosclientes =JSON.parse($("#editarCliente").attr("dadosclientes"));
        var referenciaCliente=$("#referenciarCliente").attr("data");
        var comparador = false;
        var codigo = $("#cliente_cod").val();

        var posicao = dadosclientes.findIndex(x => x._id === referenciaCliente);
        dadosclientes.splice(posicao, 1);

        for(var i = 0, j = dadosclientes.length; i<j;i++){

          if(codigo == dadosclientes[i].cliente_cod){
            comparador = true;
          }
        }
        
        if(comparador == true){
          $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O código do cliente já se encontra registado no sistema. Escolha outro':'The client code is already registered in the system. Choose another.'));
          $('#msg_modal').openModal();
        }else{

            if(validar()){
              $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
              $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente actualizar a informação de ':'Do you really want to update the information of <b>') +$('#cliente_nome').val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
              $('#yes_no_modal').openModal({dismissible:false});
              // $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
              $('#yes_btn_modal').click(function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();

                var clienteformdata = new FormData();
                var rule="/cliente/editarCliente/" + referenciaCliente;

                var cliente_cod=$("#cliente_cod").val();
                clienteformdata.append("cliente_cod", cliente_cod);

                var cliente_nome=$("#cliente_nome").val();
                clienteformdata.append("cliente_nome", cliente_nome);

                var cliente_nuit=$("#cliente_nuit").val();
                clienteformdata.append("cliente_nuit", cliente_nuit);

                var cliente_filial=$("#cliente_filial").val();
                clienteformdata.append("cliente_filial", cliente_filial);

                var cliente_telefone=$("#cliente_telefone").val();
                clienteformdata.append("cliente_telefone", cliente_telefone);

                var cliente_web=$("#cliente_web").val();
                clienteformdata.append("cliente_web", cliente_web);

                var cliente_outros=$("#cliente_outros").val();
                clienteformdata.append("cliente_outros", cliente_outros);

                var cliente_endfisico=$("#cliente_endfisico").val();
                clienteformdata.append("cliente_endfisico", cliente_endfisico);

                var cliente_bairrofisico=$("#cliente_bairrofisico").val();
                clienteformdata.append("cliente_bairrofisico", cliente_bairrofisico);

                var cliente_cidadefisico=$("#cliente_cidadefisico").val();
                clienteformdata.append("cliente_cidadefisico", cliente_cidadefisico);

                var cliente_provinciafisico=$("#cliente_provinciafisico").val();
                clienteformdata.append("cliente_provinciafisico", cliente_provinciafisico);

                var cliente_codpostalfisico=$("#cliente_codpostalfisico").val();
                clienteformdata.append("cliente_codpostalfisico", cliente_codpostalfisico);

                var cliente_paisfisico=$("#cliente_paisfisico").val();
                clienteformdata.append("cliente_paisfisico", cliente_paisfisico);

                var cliente_endpostal=$("#cliente_endpostal").val();
                clienteformdata.append("cliente_endpostal", cliente_endpostal);

                var cliente_bairropostal=$("#cliente_bairropostal").val();
                clienteformdata.append("cliente_bairropostal", cliente_bairropostal);

                var cliente_cidadepostal=$("#cliente_cidadepostal").val();
                clienteformdata.append("cliente_cidadepostal", cliente_cidadepostal);

                var cliente_provinciapostal=$("#cliente_provinciapostal").val();
                clienteformdata.append("cliente_provinciapostal", cliente_provinciapostal);

                var cliente_codpostalpostal=$("#cliente_codpostalpostal").val();
                clienteformdata.append("cliente_codpostalpostal", cliente_codpostalpostal);

                var cliente_paispostal=$("#cliente_paispostal").val();
                clienteformdata.append("cliente_paispostal", cliente_paispostal);

                var dataedicaocliente = new Date();
                clienteformdata.append("dataedicaocliente", dataedicaocliente);

                var contactosArrayCliente = editarContactosArray;
                clienteformdata.append("contactosArrayCliente", JSON.stringify(contactosArrayCliente));

                var xhr = new XMLHttpRequest();
                // Add any event handlers here...
                xhr.open('POST',rule, true);
                xhr.send(clienteformdata);

                setTimeout(function(){
               window.location.href="/cliente/clientesupplier/client_home";
              }, 1000);

              });
            }
        }
  });


    $('#editarFornecedor').click(function(){

        var dadosfornecedores =JSON.parse($("#editarFornecedor").attr("dadosfornecedores"));
        var referenciaFornecedor=$("#referenciarFornecedor").attr("data");
        var comparador = false;
        var codigo = $("#fornecedor_cod").val();

        var posicao = dadosfornecedores.findIndex(x => x._id === referenciaFornecedor);
        dadosfornecedores.splice(posicao, 1);

        for(var i = 0, j = dadosfornecedores.length; i<j;i++){

          if(codigo == dadosfornecedores[i].fornecedor_cod){
            comparador = true;
          }
        }

        if(comparador == true){
          $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O código do fornecedor já se encontra registado no sistema. Escolha outro':'The supplier code is already registered in the system. Choose another.'));
          $('#msg_modal').openModal();
        }else{

            if(validar()){
              $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
              $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente actualizar a informação ':'Do you really want to update <b>') +$('#cliente_nome').val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
              $('#yes_no_modal').openModal({dismissible:false});
              // $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
              $('#yes_btn_modal').click(function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();

                var fornecedorformdata= new FormData();
                var rule="/cliente/editarFornecedor/" + referenciaFornecedor;;

                var fornecedor_cod=$("#fornecedor_cod").val();
                fornecedorformdata.append("fornecedor_cod", fornecedor_cod);

                var cliente_nome=$("#cliente_nome").val();
                fornecedorformdata.append("cliente_nome", cliente_nome);

                var cliente_nuit=$("#cliente_nuit").val();
                fornecedorformdata.append("cliente_nuit", cliente_nuit);

                var cliente_filial=$("#cliente_filial").val();
                fornecedorformdata.append("cliente_filial", cliente_filial);

                var cliente_telefone=$("#cliente_telefone").val();
                fornecedorformdata.append("cliente_telefone", cliente_telefone);

                var cliente_web=$("#cliente_web").val();
                fornecedorformdata.append("cliente_web", cliente_web);

                var cliente_outros=$("#cliente_outros").val();
                fornecedorformdata.append("cliente_outros", cliente_outros);

                var cliente_endfisico=$("#cliente_endfisico").val();
                fornecedorformdata.append("cliente_endfisico", cliente_endfisico);

                var cliente_bairrofisico=$("#cliente_bairrofisico").val();
                fornecedorformdata.append("cliente_bairrofisico", cliente_bairrofisico);

                var cliente_cidadefisico=$("#cliente_cidadefisico").val();
                fornecedorformdata.append("cliente_cidadefisico", cliente_cidadefisico);

                var cliente_provinciafisico=$("#cliente_provinciafisico").val();
                fornecedorformdata.append("cliente_provinciafisico", cliente_provinciafisico);

                var cliente_codpostalfisico=$("#cliente_codpostalfisico").val();
                fornecedorformdata.append("cliente_codpostalfisico", cliente_codpostalfisico);

                var cliente_paisfisico=$("#cliente_paisfisico").val();
                fornecedorformdata.append("cliente_paisfisico", cliente_paisfisico);

                var cliente_endpostal=$("#cliente_endpostal").val();
                fornecedorformdata.append("cliente_endpostal", cliente_endpostal);

                var cliente_bairropostal=$("#cliente_bairropostal").val();
                fornecedorformdata.append("cliente_bairropostal", cliente_bairropostal);

                var cliente_cidadepostal=$("#cliente_cidadepostal").val();
                fornecedorformdata.append("cliente_cidadepostal", cliente_cidadepostal);

                var cliente_provinciapostal=$("#cliente_provinciapostal").val();
                fornecedorformdata.append("cliente_provinciapostal", cliente_provinciapostal);

                var cliente_codpostalpostal=$("#cliente_codpostalpostal").val();
                fornecedorformdata.append("cliente_codpostalpostal", cliente_codpostalpostal);

                var cliente_paispostal=$("#cliente_paispostal").val();
                fornecedorformdata.append("cliente_paispostal", cliente_paispostal);

                var dataedicaocliente = new Date();
                fornecedorformdata.append("dataedicaocliente", dataedicaocliente);

                var cliente_termos=$("#cliente_termos").val();
                fornecedorformdata.append("cliente_termos", cliente_termos);

                var contactosArrayCliente = editarContactosArray;
                fornecedorformdata.append("contactosArrayCliente", JSON.stringify(contactosArrayCliente));

                    var xhr = new XMLHttpRequest();
                      // Add any event handlers here...
                      xhr.open('POST',rule, true);
                      xhr.send(fornecedorformdata);

                      setTimeout(function(){
                     window.location.href="/cliente/clientesupplier/supplier_home";
                    }, 1000);

                
              });
            }
      }
  });


    $('#captarSiteInfo').click(function(){

      if(validar()){
        $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
        $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a informação ':'Do you really want to save <b>') + (($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
        $('#yes_no_modal').openModal({dismissible:false});
        $('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="#"; });
        $('#yes_btn_modal').click(function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();

           var nm = document.getElementById("siteinfo_client").value;
           var dadosclientes = JSON.parse($("#contain3").attr("detalhesclientes"));

           var posicaonomecliente = dadosclientes.findIndex(x => x.cliente_nome === nm);

           var rule="/manutencao/novositeinfo";
           var siteinfoformdata= new FormData();

        var siteinfo_client=$("#siteinfo_client").val();
        siteinfoformdata.append("siteinfo_client", siteinfo_client);

        var siteinfo_sitename=$("#siteinfo_sitename").val();
        siteinfoformdata.append("siteinfo_sitename", siteinfo_sitename);

        var siteinfo_sitenum=$("#siteinfo_sitenum").val();
        siteinfoformdata.append("siteinfo_sitenum", siteinfo_sitenum);

        var siteinfo_typesite=$("#siteinfo_typesite").val();
        siteinfoformdata.append("siteinfo_typesite", siteinfo_typesite);

        var siteinfo_phasenum=$("#siteinfo_phasenum").val();
        siteinfoformdata.append("siteinfo_phasenum", siteinfo_phasenum);

        var siteinfo_siteclassif=$("#siteinfo_siteclassif").val();
        siteinfoformdata.append("siteinfo_siteclassif", siteinfo_siteclassif);

        var siteinfo_radiotec=$("#siteinfo_radiotec").val();
        siteinfoformdata.append("siteinfo_radiotec", siteinfo_radiotec);

        var siteinfo_maintoff=$("#siteinfo_maintoff").val();
        siteinfoformdata.append("siteinfo_maintoff", siteinfo_maintoff);

        var siteinfo_techcontactnum=$("#siteinfo_techcontactnum").val();
        siteinfoformdata.append("siteinfo_techcontactnum", siteinfo_techcontactnum);

        var siteinfo_regiao=$("#siteinfo_regiao").val();
        siteinfoformdata.append("siteinfo_regiao", siteinfo_regiao);

        var siteinfo_area=$("#siteinfo_area").val();
        siteinfoformdata.append("siteinfo_area", siteinfo_area);

        var siteinfo_regiaoselmec=$("#siteinfo_regiaoselmec").val();
        siteinfoformdata.append("siteinfo_regiaoselmec", siteinfo_regiaoselmec);

        var siteinfo_gps=$("#siteinfo_gps").val();
        siteinfoformdata.append("siteinfo_gps", siteinfo_gps);

        var siteinfo_planmaintdate=$("#siteinfo_planmaintdate").val();
        siteinfoformdata.append("siteinfo_planmaintdate", siteinfo_planmaintdate);

        var siteinfo_siteonairdate=$("#siteinfo_siteonairdate").val();
        siteinfoformdata.append("siteinfo_siteonairdate", siteinfo_siteonairdate);

        var siteinfo_siteannoucdate=$("#siteinfo_siteannoucdate").val();
        siteinfoformdata.append("siteinfo_siteannoucdate", siteinfo_siteannoucdate);
        
        var siteinfo_twinbts=$("#siteinfo_twinbts").val();
        siteinfoformdata.append("siteinfo_twinbts", siteinfo_twinbts);

        var siteinfo_btslinkedsite=$("#siteinfo_btslinkedsite").val();
        siteinfoformdata.append("siteinfo_btslinkedsite", siteinfo_btslinkedsite);

        //gerador
          var siteinfo_generator=$("input[name='siteinfo_generator']:checked").val();
          siteinfoformdata.append("siteinfo_generator", siteinfo_generator);

          if(siteinfo_generator == "No"){
             var siteinfo_generatorArray = [];
             siteinfoformdata.append("siteinfo_generatorArray", JSON.stringify(siteinfo_generatorArray));
          }else{
            var siteinfo_generatorArray = generatorArray;
            siteinfoformdata.append("siteinfo_generatorArray", JSON.stringify(siteinfo_generatorArray));
          }

          

        //ac
          var siteinfo_ac=$("input[name='siteinfo_ac']:checked").val();
          siteinfoformdata.append("siteinfo_ac", siteinfo_ac);

          if(siteinfo_ac == "No"){
             var siteinfo_acArray = [];
             siteinfoformdata.append("siteinfo_acArray", JSON.stringify(siteinfo_acArray));
          }else{
           var siteinfo_acArray = acArray;
            siteinfoformdata.append("siteinfo_acArray", JSON.stringify(siteinfo_acArray));
          }


        //rectifiercabbinet
          var siteinfo_rectifiercabinnet=$("input[name='siteinfo_rectifiercabinnet']:checked").val();
          siteinfoformdata.append("siteinfo_rectifiercabinnet", siteinfo_rectifiercabinnet);

          if(siteinfo_ac == "No"){
             var siteinfo_rectcabArray = [];
             siteinfoformdata.append("siteinfo_rectcabArray", JSON.stringify(siteinfo_rectcabArray));
          }else{
           var siteinfo_rectcabArray = rectcabArray;
           siteinfoformdata.append("siteinfo_rectcabArray", JSON.stringify(siteinfo_rectcabArray));
          }

          

        //security
          var siteinfo_fencing=$("input[name='siteinfo_fencing']:checked").val();
          siteinfoformdata.append("siteinfo_fencing", siteinfo_fencing);

          var siteinfo_fencingelectrified=$("input[name='siteinfo_fencingelectrified']:checked").val();
          siteinfoformdata.append("siteinfo_fencingelectrified", siteinfo_fencingelectrified);

          var siteinfo_guardsite=$("input[name='siteinfo_guardsite']:checked").val();
          siteinfoformdata.append("siteinfo_guardsite", siteinfo_guardsite);

          var siteinfo_securityArray = securityArray;
          siteinfoformdata.append("siteinfo_securityArray", JSON.stringify(siteinfo_securityArray));

        //electricity
        var siteinfo_elecsupptype=$("input[name='siteinfo_elecsupptype']:checked").val();
        siteinfoformdata.append("siteinfo_elecsupptype", siteinfo_elecsupptype);

        var siteinfo_electype=$("input[name='siteinfo_electype']:checked").val();
        siteinfoformdata.append("siteinfo_electype", siteinfo_electype);

        var siteinfo_elecpayment=$("#siteinfo_elecpayment").val();
        siteinfoformdata.append("siteinfo_elecpayment", siteinfo_elecpayment);

        var siteinfo_credelec=$("#siteinfo_credelec").val();
        siteinfoformdata.append("siteinfo_credelec", siteinfo_credelec);

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST',rule, true);
        xhr.send(siteinfoformdata);

        setTimeout(function(){
         window.location.href="/manutencao/siteinfohome";
        }, 1000);

      });

        

      }

    });


	$('#captarSite').click(function(){
		if(validar()){
			
			
				// e.preventDefault();
		// 		// ++++++++++++++++++++++++++++++++++++
				// var formData = new FormData();
				// var files=$("#nome_pai").get(0).files;
				// for(let i = 0, j = files.length; i<j;i++){
				// 	formData.append(' file_'+i, files[i]);
				// }

				// var xhr = new XMLHttpRequest();
				// // Add any event handlers here...
				// xhr.open('POST', "/gerador/novo", true);
				// xhr.send(formData);

		// 		return false; 

		// 		//++++++++++++++++++++++++ 

								var detalhes=$("#msform").serialize();
								var id1=$("#operator").val();
								var id2=$("#ticketNumber").val();
								var id3=$("#siteNumber").val();
								var regra=id2+"/"+id3
								

								$.post("/gerador/novo", detalhes, function(data){
									
								 		console.log("executado coom sucesso")		
								})
					$('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
				$('#image_modal').openModal();
								
								setTimeout(function(){
					window.location.href="/gerador/continuacao/"+regra;
				}, 1000)
								
									
									
			
		}
	});




		$('#captarSite1').click(function(){

    if(validar()){
      

      //var detalhes=$("#msform").serialize();
      //var id1=$("#tobedoneby").val();
      var identificador = $("#ajuda1").attr("identificador");
      var ticketNumber=$("#ticketNumber").val();
      var siteNumber=$("#siteNumber").val();
      var company=$("#company").val();
      var dateChecked=$("#dateChecked").val();
      

          $.post("/gerador/novoregisto", {ticketNumber:ticketNumber, identificador:identificador, company:company, dateChecked:dateChecked}, function(data){
            
              console.log("executado coom sucesso")   
          })
    //$('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
    //$('#image_modal').openModal();
          
        
    window.location.href="/gerador/seguranca/"+identificador;
    
            
                  
                  
      
    }
  });

	$('#update_checkedby').click(function(){
		
			

			//var detalhes=$("#msform").serialize();
			//var id1=$("#tobedoneby").val();
			var identific=$("#localizar").attr("data");
			var tobedoneby=$("#tobedoneby").val();
			
			console.log(identific);
					
					$.post("/gerador/editarcheckedby", {tobedoneby:tobedoneby, identific:identific}, function(data){
						
					 		console.log("executado coom sucesso")		
					});
		/*//$('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
		//$('#image_modal').openModal();*/
					
					setTimeout(function(){
		window.location.href="/gerador/info/details/"+identific;
		}, 1000)
						
									
									
			
		
	});

$("#atribuir_viatura").click(function(){
	$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
			$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente atribuir a viatura ao  <b>':'Do you really want to give vehicle to  <b>') + $("#beneficiario").val()+"</b> ?")
			$('#yes_no_modal').openModal({dismissible:false});
		$('#no_btn_modal_').click(function(){ window.location.href="/ferramenta"; });
		$('#yes_btn_modal').click(function(){


			var rule="/ferramenta/atribuicao";

			 var atribuicao= new FormData();

			 var dataInserida=$("#condutor").attr("datainserted");
			 atribuicao.append("dataInserida", dataInserida);

			 var kilometragem=$("#kilometragem").val();
			 atribuicao.append("kilometragem", kilometragem);
			 var usado_por= $("#condutor").val();
			 atribuicao.append("usado_por", usado_por);
			 var marca=$("#marca").val();
			 atribuicao.append("marca", marca)
			 var beneficiario=$("#beneficiario").val();
			 atribuicao.append("beneficiario", beneficiario);
			 var matricula= $("#matricula").val();
			 atribuicao.append("matricula", matricula);
			 var modelo=$("#modelo").val();
			 atribuicao.append("modelo", modelo);

			

			 var xhr = new XMLHttpRequest();
				// Add any event handlers here...
				xhr.open('POST',rule, true);
				xhr.send(atribuicao);

 				console.log(kilometragem,usado_por,marca, beneficiario);
 				setTimeout(function(){
		window.location.href="/inspdiaria";
		}, 1000)

		})
});

$('#procurarPettyCash').click(function(){

        var mesfrom = parseInt($("#mesfrom").val());
        var anofrom = parseInt($("#anofrom").val());
        var mesto = parseInt($("#mesto").val());
        var anoto = parseInt($("#anoto").val());

        var nomepettycash = $("#viewpettycash_nome").val().split(' ');
        var nome = nomepettycash[0] + '_' + nomepettycash[1];

        if(anofrom == anoto){

          if(mesfrom > mesto){

            $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
            $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O intervalo escolhido é invalido. Escolha outro.':'The chosen range is invalid. Choose another.'));
            $('#msg_modal').openModal();

          }else{

            window.location.href="/pettycash/detalhesUso/" + nome + "/" + mesfrom + "_" + anofrom + "_to_" + mesto + "_" + anoto;
          
          }
        }else
            if(anofrom > anoto){
              $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
              $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O intervalo escolhido é invalido. Escolha outro.':'The chosen range is invalid. Choose another.'));
              $('#msg_modal').openModal();
            }else{
              window.location.href="/pettycash/detalhesUso/" + nome + "/" + mesfrom + "_" + anofrom + "_to_" + mesto + "_" + anoto;
          
            }

      });


  $('#captarPettycash').click(function(){

        var saldodisp =$("#captarPettycash").attr("saldodisponivel");
        var pettycash_value=$("#pettycash_value").val();
        
        var comparador = saldodisp - pettycash_value;
        if(comparador < 0){
          $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
          $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'O seu saldo é insuficiente para esta transacção.':'Your balance is insufficient for this transaction.'));
          $('#msg_modal').openModal();
        }else{

            
            $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
            $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar este registro':'Do you really want to save this record') + "?")
            $('#yes_no_modal').openModal({dismissible:false});
            $('#yes_btn_modal').click(function(e){
              e.stopPropagation();
              e.stopImmediatePropagation();

              var pettycashformdata = new FormData();
              var rule="/pettycash/novoregistro";

              var pettycashuser_nome=$("#pettycash_nome").val();
              pettycashformdata.append("pettycashuser_nome", pettycashuser_nome);

              // var pettycash_region=$("#pettycash_region").val();
              // pettycashformdata.append("pettycash_region", pettycash_region);

              var pettycashuser_code=$("#user_code").val();
              pettycashformdata.append("pettycashuser_code", pettycashuser_code);

              var pettycash_data=$("#pettycash_creationdate").val();
              pettycashformdata.append("pettycash_data", pettycash_data);

              var pettycash_anoFiscal=$("#pettycash_financialyear").val();
              pettycashformdata.append("pettycash_anoFiscal", pettycash_anoFiscal);

              var pettycash_ano = pettycash_data.split("/")[2];
              pettycashformdata.append("pettycash_ano", parseInt(pettycash_ano));

              var pettycash_mes = pettycash_data.split("/")[1];
              pettycashformdata.append("pettycash_mes", parseInt(pettycash_mes));

              var pettycash_credito = "-";
              pettycashformdata.append("pettycash_credito", pettycash_credito);

              var pettycash_debito = $("#pettycash_value").val();
              pettycashformdata.append("pettycash_debito", pettycash_debito);

              var pettycash_saldo = comparador;
              pettycashformdata.append("pettycash_saldo", pettycash_saldo);

              var pettycash_notas = "";
              pettycashformdata.append("pettycash_notas", pettycash_notas);

              var pettycash_pur= [];
              var pettycash_purchaseObj = {};

              pettycash_purchaseObj.purchase_date = $("#pettycash_date").val();
              pettycash_purchaseObj.purchase_description=$("#pettycash_description").val();
              pettycash_purchaseObj.purchase_value=$("#pettycash_value").val();
              pettycash_purchaseObj.purchase_supplier=$("#pettycash_supplier").val();
              pettycash_purchaseObj.purchase_docno=$("#pettycash_docno").val();
              pettycash_purchaseObj.purchase_comments=$("#pettycash_comments").val();
              pettycash_purchaseObj.purchase_imagem=[];

              pettycash_pur.push(pettycash_purchaseObj);

              var pettycash_purchase = pettycash_pur;
              pettycashformdata.append("pettycash_purchase", JSON.stringify(pettycash_purchase));

              var pettycash_imagem = arrPettycash_imagem;
              if(pettycash_imagem.length!=0){
                for(let i = 0, j = pettycash_imagem.length; i<j;i++){
                  pettycashformdata.append('pettycash_imagem', pettycash_imagem[i]);
                }
              }


              var xhr = new XMLHttpRequest();
              // Add any event handlers here...
              xhr.open('POST',rule, true);
              xhr.send(pettycashformdata);

              $('#loading').fadeIn().delay(15000).fadeOut();
              setTimeout(function(){
             window.location.href="/pettycash/accountcontrol_home";
            }, 5000);


            });
      }

    });
  

$('#captarSafety').click(function(){
  

    var rul=$(this).attr("dataref");
    var el=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");



    var veiculo_safe=$("input[name='veiculo_safe']:checked").val();
    var people_safe=$("input[name='people_safe']:checked").val();
    var red_hat=$("input[name='red_hat']:checked").val();
    var fall_Arrest_devices=$("input[name='fall_Arrest_devices']:checked").val();

  

    if ((!veiculo_safe) || (!people_safe) || (!red_hat) || (!fall_Arrest_devices)) { 

       $('#msg_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Campo Não Preenchido.':'Field Not Filled.<b>') + (($(".lang-picker").attr("value")=="pt")?'</b> ':"</b>"))
        $('#msg_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Por favor preencha todos os campos.':'Please fill in all fields. <b>') + (($(".lang-picker").attr("value")=="pt")?'</b> ':"</b>"));
        $('#msg_modal').openModal();

    }else{

        $('#yes_no_title_modal').html('Mensagem de registo')
         $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a informação ':'Do you really want to save <b>') + (($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b>?"))
         $('#yes_no_modal').openModal();
         // $('#no_btn_modal_').click(function(){window.location.href="#";});
         $('#yes_btn_modal').click(function(e){
           e.stopPropagation();
            e.stopImmediatePropagation();

           rul ="/gerador/seguranca/"+ rul + "/" + numeroSite;
           // console.log(rul)

            
           var formData = new FormData();

      
           formData.append('veiculo_safe', veiculo_safe);
           var veiculo_safe_comment=$("#veiculo_safe_comment").val();
           formData.append('veiculo_safe_comment', veiculo_safe_comment);
           var veiculo_safe_image=arrVeiculoSafe;
           if(veiculo_safe_image.length!=0){
           for(let i = 0, j = veiculo_safe_image.length; i<j;i++){
             formData.append('veiculo_safe_image', veiculo_safe_image[i]);
           }}

        
           formData.append('people_safe', people_safe);
           var people_safe_comment=$("#people_safe_comment").val();
           formData.append('people_safe_comment', people_safe_comment);
           var People_safe_image=arrPeopleSafe;
           if(People_safe_image.length!=0){
           for(let i = 0, j = People_safe_image.length; i<j;i++){
             formData.append('People_safe_image', People_safe_image[i]);
           }}
            

           formData.append('red_hat', red_hat);
           var red_hat_comment=$("#red_hat_comment").val();
           formData.append('red_hat_comment', red_hat_comment);
           var red_hat_image=arrRedHat;
           if(red_hat_image.length!=0){
           for(let i = 0, j = red_hat_image.length; i<j;i++){
             formData.append('red_hat_image', red_hat_image[i]);
           }}

        
           formData.append('fall_Arrest_devices', fall_Arrest_devices);
           var fall_Arrest_devices_comment=$("#fall_Arrest_devices_comment").val();
           formData.append('fall_Arrest_devices_comment', fall_Arrest_devices_comment);
           var fall_Arrest_devices_image=arrfallArrestDevices;
           if(fall_Arrest_devices_image.length!=0){
           for(let i = 0, j = fall_Arrest_devices_image.length; i<j;i++){
             formData.append('fall_Arrest_devices_image', fall_Arrest_devices_image[i]);
           }}

           // +++++++++++++++++++++++++++++++++++
           // var files=$("#nome_pai").get(0).files;
           // for(let i = 0, j = files.length; i<j;i++){
           //  formData.append(' file_'+i, files[i]);
           // }

           var xhr = new XMLHttpRequest();
           // Add any event handlers here...
           xhr.open('POST', rul, true);
           xhr.send(formData);
          
            $('#loading').fadeIn().delay(20000).fadeOut();
           setTimeout(function(){

             window.location.href="/gerador/edboard/"+el
           }, 10000);

           //++++++++++++++++++++++++ 

                   // var detalhes=$("#msform").serialize();
                   // $.post("/gerador/novo", detalhes, function(data){
                   //  window.location.href="/gerador";        
                   // })
                    
         });

      }
  });

  $('.dropdown-trigger').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    click: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  }
);

  
  $('#captarSafetyDetalhes').click(function(){
    var el=$(this).attr("dataref");
    window.location.href="/gerador/eddboardss/details/"+el;
  });



	$('#captarRoofTop').click(function(){
    var rul=$(this).attr("dataref");
    var el=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/rooftop/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();

        var mounting_poles=$("input[name='mounting_poles']:checked").val();
        formData.append('mounting_poles', mounting_poles);
        var mounting_poles_comment=$("#mounting_poles_comment").val();
        formData.append('mounting_poles_comment', mounting_poles_comment);
        var mounting_poles_image=arrMountingPoles;

        if(mounting_poles_image.length!=0){
        for(let i = 0, j = mounting_poles_image.length; i<j;i++){
          formData.append('mounting_poles_image', mounting_poles_image[i]);
        }}


        var poles_corrosions=$("input[name='poles_corrosions']:checked").val();
        formData.append('poles_corrosions', poles_corrosions);
        var poles_corrosions_comment=$("#poles_corrosions_comment").val();
        formData.append('poles_corrosions_comment', poles_corrosions_comment);
        var poles_corrosions_image=arrPolesCorrosions;


        if(poles_corrosions_image.length!=0){
        for(let i = 0, j = poles_corrosions_image.length; i<j;i++){
          formData.append('poles_corrosions_image', poles_corrosions_image[i]);
        }}

        
        

        var poles_earthed=$("input[name='poles_earthed']:checked").val();
        formData.append('poles_earthed', poles_earthed);
        var poles_earthed_comment=$("#poles_earthed_comment").val();
        formData.append('poles_earthed_comment', poles_earthed_comment);
        var poles_earthed_image=arrPolesEarthed;
        if(poles_earthed_image.length!=0){
        for(let i = 0, j = poles_earthed_image.length; i<j;i++){
          formData.append('poles_earthed_image', poles_earthed_image[i]);
        }}

        

        var cabinet_damage=$("input[name='cabinet_damage']:checked").val();
        formData.append('cabinet_damage', cabinet_damage);
        var cabinet_damage_comment=$("#cabinet_damage_comment").val();
        formData.append('cabinet_damage_comment', cabinet_damage_comment);
        var cabinet_damage_image=arrCabinetDamage;
        if(cabinet_damage_image.length!=0){
        for(let i = 0, j = cabinet_damage_image.length; i<j;i++){
          formData.append('cabinet_damage_image', cabinet_damage_image[i]);
        }}

        

        var transmission_radio=$("input[name='transmission_radio']:checked").val();
        formData.append('transmission_radio', transmission_radio);
        var transmission_radio_comment=$("#transmission_radio_comment").val();
        formData.append('transmission_radio_comment', transmission_radio_comment);
        var transmission_radio_image=arrTransmissionRadioRF;
        if(transmission_radio_image.length!=0){
        for(let i = 0, j = transmission_radio_image.length; i<j;i++){
          formData.append('transmission_radio_image', transmission_radio_image[i]);
        }}

        

      

        

        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          
          window.location.href="/gerador/mast/"+el;
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });

	$('#captarRoofTopDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/mast/details/"+el;
	});

$("#registar_novoVeiculo").click(function(){
	
	$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
		$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente registar a viatura <b>':'Do you really want to save  vehicle <b>') +$("#matricula").val().toUpperCase()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"</b> ?"))
		$('#yes_no_modal').openModal({dismissible:false});
		$('#no_btn_modal_').click(function(){ window.location.href="/veiculo_Control"; });
		$("#yes_btn_modal").click(function(e){
	// var yu=$("#registar_acao").attr('datainserted')
	e.preventDefault();

	var rul="/veiculo_Control/novo";
	var acao1 = new FormData();
	
	var marca=$("#marca").val();
	var modelo=$('#modelo').val();
	acao1.append('marca', marca);
	acao1.append('modelo', modelo);

	var matricula=$('#matricula').val().toUpperCase();
	acao1.append('matricula', matricula);

	var kilometragem=$('#kilometragem').val();
	acao1.append('kilometragem', kilometragem);

	var provincia=$('#provincia').val();
	acao1.append('provincia', provincia);

	var regiao=$("#regiao").val();
	acao1.append('regiao', regiao);

	var ano_aquisicao=$("#ano_aquisicao").val();
	acao1.append('ano_aquisicao', ano_aquisicao);
	
	
				var xhr = new XMLHttpRequest();
				// Add any event handlers here...
				xhr.open('POST', rul, true);
				xhr.send(acao1);

			$('#image_modal').html('<img class="center" style="; padding-top:; background-color:#808080" src="/img/selmecPreloader.gif">')
			$('#image_modal').openModal();
				setTimeout(function(){
					
					window.location.href="/veiculo_Control"
				}, 1000)
		});

});

$("#registar_novoCarro").click(function(){ 
	
	$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
		$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente registar <b>':'Do you really want to save  <b>') +$("#condutor").val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"'s</b> action?"))
		$('#yes_no_modal').openModal();
		$('#no_btn_modal_').click(function(){ window.location.href="/ferramenta"; });
		$("#yes_btn_modal").click(function(e){
	// var yu=$("#registar_acao").attr('datainserted')
	e.preventDefault();
	var rul="/ferramenta/novo";
	var acao1 = new FormData();
	var condutor=$("#condutor").val();
	acao1.append('responsavel',condutor);
	var marca=$("#marca").val();
	var modelo=$('#modelo').val();
	acao1.append('modelo', modelo);
	acao1.append('marca', marca);
	var matricula=$('#matricula').val().toUpperCase();
	acao1.append('matricula', matricula);
	var kilometragem=$('#kilometragem').val();
	acao1.append('kilometragem', kilometragem);
	var local=$('#local').val();
	acao1.append('local', local);
	var regiao=$("#regiao").val();
	acao1.append('regiao', regiao);
	var ano_aquisicao=$("#ano_aquisicao").val();
	acao1.append('ano_aquisicao', ano_aquisicao);
	
	
				var xhr = new XMLHttpRequest();
				// Add any event handlers here...
				xhr.open('POST', rul, true);
				xhr.send(acao1);

			$('#image_modal').html('<img class="center" style="width:40%; padding-top:15px; background-color:#808080" src="/img/selmecPreloader.gif">')
			$('#image_modal').openModal();
				setTimeout(function(){
					
					window.location.href="/ferramenta"
				}, 1000)
		});

});

$("#registar_acao").click(function(){
	
	$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
		$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente registar acção no veiculo de <b>':'Do you really want to save action on  <b>') +$("#motorista").val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"'s</b> vehicle?"))
		$('#yes_no_modal').openModal();
		// $('#no_btn_modal_').click(function(){ window.location.href="/inspdiaria"; });
		$("#yes_btn_modal").click(function(e){
	// var yu=$("#registar_acao").attr('datainserted')
	e.preventDefault();
	var rul="/inspdiaria/remove/"+($("#motorista").attr('datainserted'));
	var acao = new FormData();
	var motorista=$("#motorista").val();
	acao.append('motorista',motorista);
	var dattta=$("#dattta").val();
	acao.append('dattta', dattta);
	var data_acao=$('#data_acao').val();
	acao.append('data_acao', data_acao);
	var razao_acao=$('#razao_acao').val();
	acao.append('razao_acao', razao_acao);
	var fleet_man=$('#fleet_man').val();
	acao.append('fleet_man', fleet_man);
	var tipo_acao=$('#tipo_acao').val();
	acao.append('tipo_acao', tipo_acao);
	// var lembrete=$('#lembrete').val();
	// acao.append('lembrete', lembrete);
				var xhr = new XMLHttpRequest();
				// Add any event handlers here...
				xhr.open('POST', rul, true);
				xhr.send(acao);

			$('#image_modal').html('<img class="center" style="width:40%; padding-top:15px; background-color:#808080" src="/img/selmecPreloader.gif">')
			$('#image_modal').openModal();
				setTimeout(function(){
					
					window.location.href="/inspdiaria"
				}, 3000)
		});

});

$("#caso_resolvido").click(function(){
	
	$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Mensagem do Sistema':'System Message'))
		$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente registar acção no veiculo de <b>':'Do you really want to save action on  <b>') +$("#motorista").val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"'s</b> vehicle?"))
		$('#yes_no_modal').openModal();
		// $('#no_btn_modal_').click(function(){ window.location.href="/inspdiaria"; });
		$("#yes_btn_modal").click(function(e){
	// var yu=$("#registar_acao").attr('datainserted')
	e.preventDefault();
	var caso_re=$("#motorista").val();
	var rul="/inspdiaria/completar/"+caso_re;
	window.location.href=rul;
				

			
		});

});

	$('#captarContainer').click(function(){
    var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/contentor/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();

        var container_light=$("input[name='container_light']:checked").val();
        formData.append('container_light', container_light);
        var container_light_comment=$("#container_light_comment").val();
        formData.append('container_light_comment', container_light_comment);
        var container_light_image=arrContainerLight;
        if(container_light_image.length!=0){
        for(let i = 0, j = container_light_image.length; i<j;i++){
          formData.append('container_light_image', container_light_image[i]);
        }}
        

        var circuit_breaker=$("input[name='circuit_breaker']:checked").val();
        formData.append('circuit_breaker', circuit_breaker);
        var circuit_breaker_comment=$("#circuit_breaker_comment").val();
        formData.append('circuit_breaker_comment', circuit_breaker_comment);
        var circuit_breaker_image=arrCircuitBreaker;
        if(circuit_breaker_image.length!=0){
        for(let i = 0, j = circuit_breaker_image.length; i<j;i++){
          formData.append('circuit_breaker_image', circuit_breaker_image[i]);
        }}
        

        var earth_connections=$("input[name='earth_connections']:checked").val();
        formData.append('earth_connections', earth_connections);
        var earth_connections_comment=$("#earth_connections_comment").val();
        formData.append('earth_connections_comment', earth_connections_comment);
        var earth_connections_image=arrEarthConnections;
        if(earth_connections_image.length!=0){
        for(let i = 0, j = earth_connections_image.length; i<j;i++){
          formData.append('earth_connections_image', earth_connections_image[i]);
        }}

        var conditions=$("input[name='conditions']:checked").val();
        formData.append('conditions', conditions);
        var conditions_comment=$("#conditions_comment").val();
        formData.append('conditions_comment', conditions_comment);
        var conditions_image=arrConditions;
        if(conditions_image.length!=0){
        for(let i = 0, j = conditions_image.length; i<j;i++){
          formData.append('conditions_image', conditions_image[i]);
        }}

        var paintwork=$("input[name='paintwork']:checked").val();
        formData.append('paintwork', paintwork);
        var paintwork_comment=$("#paintwork_comment").val();
        formData.append('paintwork_comment', paintwork_comment);
        var paintwork_image=arrPaintwork;
        if(paintwork_image.length!=0){
        for(let i = 0, j = paintwork_image.length; i<j;i++){
          formData.append('paintwork_image', paintwork_image[i]);
        }}

        var roof_water=$("input[name='roof_water']:checked").val();
        formData.append('roof_water', roof_water);
        var roof_water_comment=$("#roof_water_comment").val();
        formData.append('roof_water_comment', roof_water_comment);
        var roof_water_image=arrRoofWater;
        if(roof_water_image.length!=0){
        for(let i = 0, j = roof_water_image.length; i<j;i++){
          formData.append('roof_water_image', roof_water_image[i]);
        }}

        var joints_cables_holes=$("input[name='joints_cables_holes']:checked").val();
        formData.append('joints_cables_holes', joints_cables_holes);
        var joints_cables_holes_comment=$("#joints_cables_holes_comment").val();
        formData.append('joints_cables_holes_comment', joints_cables_holes_comment);
        var joints_cables_holes_image=arrJointsCablesHoles;
        if(joints_cables_holes_image.length!=0){
        for(let i = 0, j = joints_cables_holes_image.length; i<j;i++){
          formData.append('joints_cables_holes_image', joints_cables_holes_image[i]);
        }}
        

        var transmission_radio=$("input[name='transmission_radio']:checked").val();
        formData.append('transmission_radio', transmission_radio);
        var transmission_radio_comment=$("#transmission_radio_comment").val();
        formData.append('transmission_radio_comment', transmission_radio_comment);
        var transmission_radio_image=arrTransmissionRadioCF;
        if(transmission_radio_image.length!=0){
        for(let i = 0, j = transmission_radio_image.length; i<j;i++){
          formData.append('transmission_radio_image', transmission_radio_image[i]);
        }}

        

        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          
          window.location.href="/gerador/rooftop/"+el
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });

	$('#captarContainerDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/rooftop/details/"+el;
	});

	$('#captarMast').click(function(){
    var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/mast/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();

        var aw_light=$("input[name='aw_light']:checked").val();
        formData.append('aw_light', aw_light);
        var aw_light_comment=$("#aw_light_comment").val();
        formData.append('aw_light_comment', aw_light_comment);
        var aw_light_image=arrAwLight;
        if(aw_light_image.length!=0){
        for(let i = 0, j = aw_light_image.length; i<j;i++){
          formData.append('aw_light_image', aw_light_image[i]);
        }}

        var aw_light_db_fitting=$("input[name='aw_light_db_fitting']:checked").val();
        formData.append('aw_light_db_fitting', aw_light_db_fitting);
        var aw_light_db_fitting_comment=$("#aw_light_db_fitting_comment").val();
        formData.append('aw_light_db_fitting_comment', aw_light_db_fitting_comment);
        var aw_light_db_fitting_image=arrAwLightDbFitting;
        if(aw_light_db_fitting_image.length!=0){
        for(let i = 0, j = aw_light_db_fitting_image.length; i<j;i++){
          formData.append('aw_light_db_fitting_image', aw_light_db_fitting_image[i]);
        }}
        

        var tower_inspection=$("input[name='tower_inspection']:checked").val();
        formData.append('tower_inspection', tower_inspection);
        var tower_inspection_comment=$("#tower_inspection_comment").val();
        formData.append('tower_inspection_comment', tower_inspection_comment);
        var tower_inspection_image=arrTowerInspection;
        if(tower_inspection_image.length!=0){
        for(let i = 0, j = tower_inspection_image.length; i<j;i++){
          formData.append('tower_inspection_image', tower_inspection_image[i]);
        }}

        var paint_tower=$("input[name='paint_tower']:checked").val();
        formData.append('paint_tower', paint_tower);
        var paint_tower_comment=$("#paint_tower_comment").val();
        formData.append('paint_tower_comment', paint_tower_comment);
        var paint_tower_image=arrPaintTower;
        if(paint_tower_image.length!=0){
        for(let i = 0, j = paint_tower_image.length; i<j;i++){
          formData.append('paint_tower_image', paint_tower_image[i]);
        }}

        var visual_inpection_trans_radio=$("input[name='visual_inpection_trans_radio']:checked").val();
        formData.append('visual_inpection_trans_radio', visual_inpection_trans_radio);
        var visual_inpection_trans_radio_comment=$("#visual_inpection_trans_radio_comment").val();
        formData.append('visual_inpection_trans_radio_comment', visual_inpection_trans_radio_comment);
        var visual_inpection_trans_radio_image=arrVisualInpectionTransRadio;
        if(visual_inpection_trans_radio_image.length!=0){
        for(let i = 0, j = visual_inpection_trans_radio_image.length; i<j;i++){
          formData.append('visual_inpection_trans_radio_image', visual_inpection_trans_radio_image[i]);
        }}

        var tower_specification=$("input[name='tower_specification']:checked").val();
        formData.append('tower_specification', tower_specification);
        var tower_specification_comment=$("#tower_specification_comment").val();
        formData.append('tower_specification_comment', tower_specification_comment);
        var tower_specification_image=arrTowerSpecification;
        if(tower_specification_image.length!=0){
        for(let i = 0, j = tower_specification_image.length; i<j;i++){
          formData.append('tower_specification_image', tower_specification_image[i]);
        }}
        


        

        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          window.location.href="/gerador/arcond/"+el;
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });


	$('#captarMastDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/arcond/details/"+el;
	});


$('#captarArCond').click(function(){
    var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/arcond/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();

        var fan_blade=$("input[name='fan_blade']:checked").val();
        formData.append('fan_blade', fan_blade);
        var fan_blade_comment=$("#fan_blade_comment").val();
        formData.append('fan_blade_comment', fan_blade_comment);
        var fan_blade_image=arrFanBlade;
        if(fan_blade_image.length!=0){
        for(let i = 0, j = fan_blade_image.length; i<j;i++){
          formData.append('fan_blade_image', fan_blade_image[i]);
        }}

        var noise_vibration=$("input[name='noise_vibration']:checked").val();
        formData.append('noise_vibration', noise_vibration);
        var noise_vibration_comment=$("#noise_vibration_comment").val();
        formData.append('noise_vibration_comment', noise_vibration_comment);
        var noise_vibration_image=arrNoiseVibration;
        if(noise_vibration_image.length!=0){
        for(let i = 0, j = noise_vibration_image.length; i<j;i++){
          formData.append('noise_vibration_image', noise_vibration_image[i]);
        }}
        

        var refrigerant_line=$("input[name='refrigerant_line']:checked").val();
        formData.append('refrigerant_line', refrigerant_line);
        var refrigerant_line_comment=$("#refrigerant_line_comment").val();
        formData.append('refrigerant_line_comment', refrigerant_line_comment);
        var refrigerant_line_image=arrRefrigerantLine;
        if(refrigerant_line_image.length!=0){
        for(let i = 0, j = refrigerant_line_image.length; i<j;i++){
          formData.append('refrigerant_line_image', refrigerant_line_image[i]);
        }}

        var casing_sealed=$("input[name='casing_sealed']:checked").val();
        formData.append('casing_sealed', casing_sealed);
        var casing_sealed_comment=$("#casing_sealed_comment").val();
        formData.append('casing_sealed_comment', casing_sealed_comment);
        var casing_sealed_image=arrCasingSealed;
        if(casing_sealed_image.length!=0){
        for(let i = 0, j = casing_sealed_image.length; i<j;i++){
          formData.append('casing_sealed_image', casing_sealed_image[i]);
        }}

        var rust=$("input[name='rust']:checked").val();
        formData.append('rust', rust);
        var rust_comment=$("#rust_comment").val();
        formData.append('rust_comment', rust_comment);
        var rust_image=arrRustACF;
        if(rust_image.length!=0){
        for(let i = 0, j = rust_image.length; i<j;i++){
          formData.append('rust_image', rust_image[i]);
        }}

        


        

        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          
          window.location.href="/gerador/sitegeneral/"+el;
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });


	$('#captarArCondDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/general_site/details/"+el;
	});

$('#captarGenerator').click(function(){
  var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/generator/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();
        var generator_current_hours=$("#generator_current_hours").val();
        formData.append('generator_current_hours', generator_current_hours);

        var generator_fuel_level=$("#generator_fuel_level").val();
        formData.append('generator_fuel_level', generator_fuel_level);


        var engine_oil=$("input[name='engine_oil']:checked").val();
        formData.append('engine_oil', engine_oil);
        var engine_oil_comment=$("#engine_oil_comment").val();
        formData.append('engine_oil_comment', engine_oil_comment);
        var engine_oil_image=arrEngineOil;
        if(engine_oil_image.length!=0){
        for(let i = 0, j = engine_oil_image.length; i<j;i++){
          formData.append('engine_oil_image', engine_oil_image[i]);
        }}
        

        var oil_leak=$("input[name='oil_leak']:checked").val();
        formData.append('oil_leak', oil_leak);
        var oil_leak_comment=$("#oil_leak_comment").val();
        formData.append('oil_leak_comment', oil_leak_comment);
        var oil_leak_image=arrOilLeak;
        if(oil_leak_image.length!=0){
        for(let i = 0, j = oil_leak_image.length; i<j;i++){
          formData.append('oil_leak_image', oil_leak_image[i]);
        }}

        var radiator_hoses=$("input[name='radiator_hoses']:checked").val();
        formData.append('radiator_hoses', radiator_hoses);
        var radiator_hoses_comment=$("#radiator_hoses_comment").val();
        formData.append('radiator_hoses_comment', radiator_hoses_comment);
        var radiator_hoses_image=arrRadiatorHoses;
        if(radiator_hoses_image.length!=0){
        for(let i = 0, j = radiator_hoses_image.length; i<j;i++){
          formData.append('radiator_hoses_image', radiator_hoses_image[i]);
        }}

        var air_filter=$("input[name='air_filter']:checked").val();
        formData.append('air_filter', air_filter);
        var air_filter_comment=$("#air_filter_comment").val();
        formData.append('air_filter_comment', air_filter_comment);
        var air_filter_image=arrAirFilter;
        if(air_filter_image.length!=0){
        for(let i = 0, j = air_filter_image.length; i<j;i++){
          formData.append('air_filter_image', air_filter_image[i]);
        }}

        var coolant_leaks=$("input[name='coolant_leaks']:checked").val();
        formData.append('coolant_leaks', coolant_leaks);
        var coolant_leaks_comment=$("#coolant_leaks_comment").val();
        formData.append('coolant_leaks_comment', coolant_leaks_comment);
        var coolant_leaks_image=arrCoolantLeaks;
        if(coolant_leaks_image.length!=0){
        for(let i = 0, j = coolant_leaks_image.length; i<j;i++){
          formData.append('coolant_leaks_image', coolant_leaks_image[i]);
        }}
        

        var v_belt=$("input[name='v_belt']:checked").val();
        formData.append('v_belt', v_belt);
        var v_belt_comment=$("#v_belt_comment").val();
        formData.append('v_belt_comment', v_belt_comment);
        var v_belt_image=arrVBelt;
        if(v_belt_image.length!=0){
        for(let i = 0, j = v_belt_image.length; i<j;i++){
          formData.append('v_belt_image', v_belt_image[i]);
        }}

        var fuel_leaks=$("input[name='fuel_leaks']:checked").val();
        formData.append('fuel_leaks', fuel_leaks);
        var fuel_leaks_comment=$("#fuel_leaks_comment").val();
        formData.append('fuel_leaks_comment', fuel_leaks_comment);
        var fuel_leaks_image=arrFuelLeaks;
        if(fuel_leaks_image.length!=0){
        for(let i = 0, j = fuel_leaks_image.length; i<j;i++){
          formData.append('fuel_leaks_image', fuel_leaks_image[i]);
        }}

        var electrolyte_connection_cond=$("input[name='electrolyte_connection_cond']:checked").val();
        formData.append('electrolyte_connection_cond', electrolyte_connection_cond);
        var electrolyte_connection_cond_comment=$("#electrolyte_connection_cond_comment").val();
        formData.append('electrolyte_connection_cond_comment', electrolyte_connection_cond_comment);
        var electrolyte_connection_cond_image=arrElectrolyteConnectionCond;
        if(electrolyte_connection_cond_image.length!=0){
        for(let i = 0, j = electrolyte_connection_cond_image.length; i<j;i++){
          formData.append('electrolyte_connection_cond_image', electrolyte_connection_cond_image[i]);
        }}

        var switcher_breaker=$("input[name='switcher_breaker']:checked").val();
        formData.append('switcher_breaker', switcher_breaker);
        var switcher_breaker_comment=$("#switcher_breaker_comment").val();
        formData.append('switcher_breaker_comment', switcher_breaker_comment);
        var switcher_breaker_image=arrSwitcherBreaker;
        if(switcher_breaker_image.length!=0){
        for(let i = 0, j = switcher_breaker_image.length; i<j;i++){
          formData.append('switcher_breaker_image', switcher_breaker_image[i]);
        }}

        var control_panel_record_level=$("input[name='control_panel_record_level']:checked").val();
        formData.append('control_panel_record_level', control_panel_record_level);
        var control_panel_record_level_comment=$("#control_panel_record_level_comment").val();
        formData.append('control_panel_record_level_comment', control_panel_record_level_comment);
        var control_panel_record_level_image=arrControlPanelRecordLevel;
        if(control_panel_record_level_image.length!=0){
        for(let i = 0, j = control_panel_record_level_image.length; i<j;i++){
          formData.append('control_panel_record_level_image', control_panel_record_level_image[i]);
        }}

        var abnormal_vibrations=$("input[name='abnormal_vibrations']:checked").val();
        formData.append('abnormal_vibrations', abnormal_vibrations);
        var abnormal_vibrations_comment=$("#abnormal_vibrations_comment").val();
        formData.append('abnormal_vibrations_comment', abnormal_vibrations_comment);
        var abnormal_vibrations_image=arrAbnormalVibrations;
        if(abnormal_vibrations_image.length!=0){
        for(let i = 0, j = abnormal_vibrations_image.length; i<j;i++){
          formData.append('abnormal_vibrations_image', abnormal_vibrations_image[i]);
        }}

        var rust=$("input[name='rust']:checked").val();
        formData.append('rust', rust);
        var rust_comment=$("#rust_comment").val();
        formData.append('rust_comment', rust_comment);
        var rust_image=arrRustGF;
        if(rust_image.length!=0){
        for(let i = 0, j = rust_image.length; i<j;i++){
          formData.append('rust_image',rust_image[i]);
        }}

        var overal_cond=$("input[name='overal_cond']:checked").val();
        formData.append('overal_cond', overal_cond);
        var overal_cond_comment=$("#overal_cond_comment").val();
        formData.append('overal_cond_comment', overal_cond_comment);
        var overal_cond_image=arrOveralCond;
        if(overal_cond_image.length!=0){
        for(let i = 0, j = overal_cond_image.length; i<j;i++){
          formData.append('overal_cond_image', overal_cond_image[i]);
        }}

        var moutings_brackets=$("input[name='moutings_brackets']:checked").val();
        formData.append('moutings_brackets', moutings_brackets);
        var moutings_brackets_comment=$("#moutings_brackets_comment").val();
        formData.append('moutings_brackets_comment', moutings_brackets_comment);
        var moutings_brackets_image=arrMoutingsBrackets;
        if(moutings_brackets_image.length!=0){
        for(let i = 0, j = moutings_brackets_image.length; i<j;i++){
          formData.append('moutings_brackets_image', moutings_brackets_image[i]);
        }}
        

        // var generator_chour=$("#generator_chour").val();
        // formData.append('generator_chour', generator_chour); 

        // var aditional_info=$("#aditional_info").val();
        // formData.append('aditional_info', aditional_info);

        


        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          
          window.location.href="/gerador"
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });



$('#captarAlarm').click(function(){
  var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/alarm/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();

        var intruder=$("input[name='intruder']:checked").val();
        formData.append('intruder', intruder);
        var intruder_comment=$("#intruder_comment").val();
        formData.append('intruder_comment', intruder_comment);
        var intruder_image=arrIntruder;
        if(intruder_image.length!=0){
        for(let i = 0, j = intruder_image.length; i<j;i++){
          formData.append('intruder_image', intruder_image[i]);
        }}

        var movement=$("input[name='movement']:checked").val();
        formData.append('movement', movement);
        var movement_comment=$("#movement_comment").val();
        formData.append('movement_comment', movement_comment);
        var movement_image=arrMovement;
        if(movement_image.length!=0){
        for(let i = 0, j = movement_image.length; i<j;i++){
          formData.append('movement_image', movement_image[i]);
        }}
        

        var high_temp=$("input[name='high_temp']:checked").val();
        formData.append('high_temp', high_temp);
        var high_temp_comment=$("#high_temp_comment").val();
        formData.append('high_temp_comment', high_temp_comment);
        var high_temp_image=arrHighTemp;
        if(high_temp_image.length!=0){
        for(let i = 0, j = high_temp_image.length; i<j;i++){
          formData.append('high_temp_image', high_temp_image[i]);
        }}

        var rectifier_system=$("input[name='rectifier_system']:checked").val();
        formData.append('rectifier_system', rectifier_system);
        var rectifier_system_comment=$("#rectifier_system_comment").val();
        formData.append('rectifier_system_comment', rectifier_system_comment);
        var rectifier_system_image=arrRectifierSystem;
        if(rectifier_system_image.length!=0){
        for(let i = 0, j = rectifier_system_image.length; i<j;i++){
          formData.append('rectifier_system_image', rectifier_system_image[i]);
        }}

        var rectifier_module=$("input[name='rectifier_module']:checked").val();
        formData.append('rectifier_module', rectifier_module);
        var rectifier_module_comment=$("#rectifier_module_comment").val();
        formData.append('rectifier_module_comment', rectifier_module_comment);
        var rectifier_module_image=arrRectifierModule;
        if(rectifier_module_image.length!=0){
        for(let i = 0, j = rectifier_module_image.length; i<j;i++){
          formData.append('rectifier_module_image', rectifier_module_image[i]);
        }}

        var aircon1=$("input[name='aircon1']:checked").val();
        formData.append('aircon1', aircon1);
        var aircon1_comment=$("#aircon1_comment").val();
        formData.append('aircon1_comment', aircon1_comment);
        var aircon1_image=arrAircon1;
        if(aircon1_image.length!=0){
        for(let i = 0, j = aircon1_image.length; i<j;i++){
          formData.append('aircon1_image', aircon1_image[i]);
        }}
        

        var aircon2=$("input[name='aircon2']:checked").val();
        formData.append('aircon2', aircon2);
        var aircon2_comment=$("#aircon2_comment").val();
        formData.append('aircon2_comment', aircon2_comment);
        var aircon2_image=arrAircon2;
        if(aircon2_image.length!=0){
        for(let i = 0, j = aircon2_image.length; i<j;i++){
          formData.append('aircon2_image', aircon2_image[i]);
        }}

        var generator_fuel=$("input[name='generator_fuel']:checked").val();
        formData.append('generator_fuel', generator_fuel);
        var generator_fuel_comment=$("#generator_fuel_comment").val();
        formData.append('generator_fuel_comment', generator_fuel_comment);
        var generator_fuel_image=arrGeneratorFuel;
        if(generator_fuel_image.length!=0){
        for(let i = 0, j = generator_fuel_image.length; i<j;i++){
          formData.append('generator_fuel_image', generator_fuel_image[i]);
        }}
        
        var generator_abnormal=$("input[name='generator_abnormal']:checked").val();
        formData.append('generator_abnormal', generator_abnormal);
        var generator_abnormal_comment=$("#generator_abnormal_comment").val();
        formData.append('generator_abnormal_comment', generator_abnormal_comment);
        var generator_abnormal_image=arrGeneratorAbnormal;
        if(generator_abnormal_image.length!=0){
        for(let i = 0, j = generator_abnormal_image.length; i<j;i++){
          formData.append('generator_abnormal_image', generator_abnormal_image[i]);
        }}

        var aircraft_warning=$("input[name='aircraft_warning']:checked").val();
        formData.append('aircraft_warning', aircraft_warning);
        var aircraft_warning_comment=$("#aircraft_warning_comment").val();
        formData.append('aircraft_warning_comment', aircraft_warning_comment);
        var aircraft_warning_image=arrAircraftWarning;
        if(aircraft_warning_image.length!=0){
        for(let i = 0, j = aircraft_warning_image.length; i<j;i++){
          formData.append('aircraft_warning_image', aircraft_warning_image[i]);
        }}

        var smoke=$("input[name='smoke']:checked").val();
        formData.append('smoke', smoke);
        var smoke_comment=$("#smoke_comment").val();
        formData.append('smoke_comment', smoke_comment);
        var smoke_image=arrSmoke;
        if(smoke_image.length!=0){
        for(let i = 0, j = smoke_image.length; i<j;i++){
          formData.append('smoke_image', smoke_image[i]);
        }}

        var ac_mains_failure=$("input[name='ac_mains_failure']:checked").val();
        formData.append('ac_mains_failure', ac_mains_failure);
        var ac_mains_failure_comment=$("#ac_mains_failure_comment").val();
        formData.append('ac_mains_failure_comment', ac_mains_failure_comment);
        var ac_mains_failure_image=arrAcMainsFailure;
        if(ac_mains_failure_image.length!=0){
        for(let i = 0, j = ac_mains_failure_image.length; i<j;i++){
          formData.append('ac_mains_failure_image', ac_mains_failure_image[i]);
        }}

        var battery_low=$("input[name='battery_low']:checked").val();
        formData.append('battery_low', battery_low);
        var battery_low_comment=$("#battery_low_comment").val();
        formData.append('battery_low_comment', battery_low_comment);
        var battery_low_image=arrBatteryLow;
        if(battery_low_image.length!=0){
        for(let i = 0, j = battery_low_image.length; i<j;i++){
          formData.append('battery_low_image', battery_low_image[i]);
        }}

        var generator_running=$("input[name='generator_running']:checked").val();
        formData.append('generator_running', generator_running);
        var generator_running_comment=$("#generator_running_comment").val();
        formData.append('generator_running_comment', generator_running_comment);
        var generator_running_image=arrGeneratorRunning;
        if(generator_running_image.length!=0){
        for(let i = 0, j = generator_running_image.length; i<j;i++){
          formData.append('generator_running_image', generator_running_image[i]);
        }}
        

        


        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          
          window.location.href="/gerador/generator/"+el;
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });

		$('#captarAlarmDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/generator/details/"+el;
	});


$('#captarEDBoard').click(function(){
    var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/edboard/" + rul + "/" + numeroSite;
        //console.log(rul)
        
        var formData = new FormData();

        var connections=$("input[name='connections']:checked").val();
        formData.append('connections', connections);
        var connections_comment=$("#connections_comment").val();
        formData.append('connections_comment', connections_comment);
        var Connection_image=arrConnection;
        if(Connection_image.length!=0){
        for(let i = 0, j = Connection_image.length; i<j;i++){
          formData.append('Connection_image', Connection_image[i]);
        }}

        var energy_meter=$("input[name='energy_meter']:checked").val();
        formData.append('energy_meter', energy_meter);
        var energy_meter_comment=$("#energy_meter_comment").val();
        formData.append('energy_meter_comment', energy_meter_comment);
        var energy_meter_image=arrEnergyMeter;
        if(energy_meter_image.length!=0){
        for(let i = 0, j = energy_meter_image.length; i<j;i++){
          formData.append('energy_meter_image', energy_meter_image[i]);
        }}
        

        var switching_mec=$("input[name='switching_mec']:checked").val();
        formData.append('switching_mec', switching_mec);
        var switching_mec_comment=$("#switching_mec_comment").val();
        formData.append('switching_mec_comment', switching_mec_comment);
        var switching_mec_image=arrSwitchingMec;
        if(switching_mec_image.length!=0){
        for(let i = 0, j = switching_mec_image.length; i<j;i++){
          formData.append('switching_mec_image', switching_mec_image[i]);
        }}

        var d_board_sleeves=$("input[name='d_board_sleeves']:checked").val();
        formData.append('d_board_sleeves', d_board_sleeves);
        var d_board_sleeves_comment=$("#d_board_sleeves_comment").val();
        formData.append('d_board_sleeves_comment', d_board_sleeves_comment);
        var d_board_sleeves_image=arrDBoardSleeves;
        if(d_board_sleeves_image.length!=0){
        for(let i = 0, j = d_board_sleeves_image.length; i<j;i++){
          formData.append('d_board_sleeves_image', d_board_sleeves_image[i]);
        }}

        var light_switch=$("input[name='light_switch']:checked").val();
        formData.append('light_switch', light_switch);
        var light_switch_comment=$("#light_switch_comment").val();
        formData.append('light_switch_comment', light_switch_comment);
        var light_switch_image=arrLightSwitch;
        if(light_switch_image.length!=0){
        for(let i = 0, j = light_switch_image.length; i<j;i++){
          formData.append('light_switch_image', light_switch_image[i]);
        }}

        var paintwork_sitelight=$("input[name='paintwork_sitelight']:checked").val();
        formData.append('paintwork_sitelight', paintwork_sitelight);
        var paintwork_sitelight_comment=$("#paintwork_sitelight_comment").val();
        formData.append('paintwork_sitelight_comment', paintwork_sitelight_comment);
        var paintwork_sitelight_image=arrPaintworkSiteLight;
        if(paintwork_sitelight_image.length!=0){
        for(let i = 0, j = paintwork_sitelight_image.length; i<j;i++){
          formData.append('paintwork_sitelight_image', paintwork_sitelight_image[i]);
        }}
        

        var ac_supplier_defects=$("input[name='ac_supplier_defects']:checked").val();
        formData.append('ac_supplier_defects', ac_supplier_defects);
        var ac_supplier_defects_comment=$("#ac_supplier_defects_comment").val();
        formData.append('ac_supplier_defects_comment', ac_supplier_defects_comment);
        var ac_supplier_defects_image=arrAcSupplierDefects;
        if(ac_supplier_defects_image.length!=0){
        for(let i = 0, j = ac_supplier_defects_image.length; i<j;i++){
          formData.append('ac_supplier_defects_image', ac_supplier_defects_image[i]);
        }}

        

        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){
          
          window.location.href="/gerador/contentor/"+el
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });

	$('#captarEDBoardDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/contentor/details/"+el;
	});

$('#captarSiteGeneral').click(function(){
    var el=$(this).attr("dataref");
    var rul=$(this).attr("dataref");
    var numeroSite=$(this).attr("numSite");

    if(true){
      $('#yes_no_title_modal').html('Mensagem de registo')
      $('#yes_no_content_modal').html('Deseja realmente gravar?')
      $('#yes_no_modal').openModal();
      // $('#no_btn_modal_').click(function(){ window.location.href="#"; });
      $('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();

        rul ="/gerador/sitegeneral/" + rul + "/" + numeroSite;
        console.log(rul)
        
        var formData = new FormData();

        var fence_gate_locks_hinges=$("input[name='fence_gate_locks_hinges']:checked").val();
        formData.append('fence_gate_locks_hinges', fence_gate_locks_hinges);
        var fence_gate_locks_hinges_comment=$("#fence_gate_locks_hinges_comment").val();
        formData.append('fence_gate_locks_hinges_comment', fence_gate_locks_hinges_comment);
        var fence_gate_locks_hinges_image=arrFenceGateLocksHinges;
        if(fence_gate_locks_hinges_image.length!=0){
        for(let i = 0, j = fence_gate_locks_hinges_image.length; i<j;i++){
          formData.append('fence_gate_locks_hinges_image', fence_gate_locks_hinges_image[i]);
        }}

        var signage=$("input[name='signage']:checked").val();
        formData.append('signage', signage);
        var signage_comment=$("#signage_comment").val();
        formData.append('signage_comment', signage_comment);
        var signage_image=arrSignage;
        if(signage_image.length!=0){
        for(let i = 0, j = signage_image.length; i<j;i++){
          formData.append('signage_image', signage_image[i]);
        }}
        

        var water_damage=$("input[name='water_damage']:checked").val();
        formData.append('water_damage', water_damage);
        var water_damage_comment=$("#water_damage_comment").val();
        formData.append('water_damage_comment', water_damage_comment);
        var water_damage_image=arrWaterDamage;
        if(water_damage_image.length!=0){
        for(let i = 0, j = water_damage_image.length; i<j;i++){
          formData.append('water_damage_image', water_damage_image[i]);
        }}

        var crushed_stone=$("input[name='crushed_stone']:checked").val();
        formData.append('crushed_stone', crushed_stone);
        var crushed_stone_comment=$("#crushed_stone_comment").val();
        formData.append('crushed_stone_comment', crushed_stone_comment);
        var crushed_stone_image=arrCrushedStone;
        if(crushed_stone_image.length!=0){
        for(let i = 0, j = crushed_stone_image.length; i<j;i++){
          formData.append('crushed_stone_image', crushed_stone_image[i]);
        }}

        var site_clean=$("input[name='site_clean']:checked").val();
        formData.append('site_clean', site_clean);
        var site_clean_comment=$("#site_clean_comment").val();
        formData.append('site_clean_comment', site_clean_comment);
        var site_clean_image=arrSiteClean;
        if(site_clean_image.length!=0){
        for(let i = 0, j = site_clean_image.length; i<j;i++){
          formData.append('site_clean_image', site_clean_image[i]);
        }}

        var weeds_grass=$("input[name='weeds_grass']:checked").val();
        formData.append('weeds_grass', weeds_grass);
        var weeds_grass_comment=$("#weeds_grass_comment").val();
        formData.append('weeds_grass_comment', weeds_grass_comment);
        var weeds_grass_image=arrWeedsGrass;
        if(weeds_grass_image.length!=0){
        for(let i = 0, j = weeds_grass_image.length; i<j;i++){
          formData.append('weeds_grass_image', weeds_grass_image[i]);
        }}
        

        var rubish=$("input[name='rubish']:checked").val();
        formData.append('rubish', rubish);
        var rubish_comment=$("#rubish_comment").val();
        formData.append('rubish_comment', rubish_comment);
        var rubish_image=arrRubish;
        if(rubish_image.length!=0){
        for(let i = 0, j = rubish_image.length; i<j;i++){
          formData.append('rubish_image', rubish_image[i]);
        }}

        var defect_access_road=$("input[name='defect_access_road']:checked").val();
        formData.append('defect_access_road', defect_access_road);
        var defect_access_road_comment=$("#defect_access_road_comment").val();
        formData.append('defect_access_road_comment', defect_access_road_comment);
        var defect_access_road_image=arrDefectAccessRoad;
        if(defect_access_road_image.length!=0){
        for(let i = 0, j = defect_access_road_image.length; i<j;i++){
          formData.append('defect_access_road_image', defect_access_road_image[i]);
        }}

        

        // +++++++++++++++++++++++++++++++++++
        // var files=$("#nome_pai").get(0).files;
        // for(let i = 0, j = files.length; i<j;i++){
        //  formData.append(' file_'+i, files[i]);
        // }

        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', rul, true);
        xhr.send(formData);
        // window.location.href="/gerador";
    //    return false; 
      // $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src="/img/preloader.gif">')
      // $('#image_modal').openModal();
        $('#loading').fadeIn().delay(20000).fadeOut();
        setTimeout(function(){

          window.location.href="/gerador/alarm/"+el
        }, 10000)
    //    //++++++++++++++++++++++++ 

                // var detalhes=$("#msform").serialize();
                // $.post("/gerador/novo", detalhes, function(data){
                //  window.location.href="/gerador";        
                // })
                
      })
    }
  });


	$('#captarSiteGeneralDetalhes').click(function(){
		var el=$(this).attr("dataref");
		window.location.href="/gerador/alarm/details/"+el;
	});


	var i18n = new I18n();
  i18n.localize();
  var sslg=$(".lang-picker").attr("value");
	// $('.lang-picker #portuguese').addClass('selected');
  
  i18n.lang(sslg);

	// $('.lang-picker #portuguese').on('click', function () {
	// 	i18n.lang('pt');
	// 	selectLang($(this));
  // })
  
	// $('.lang-picker #english').on('click', function () {
	// 	i18n.lang('en');
	// 	selectLang($(this));
  // })
  
	// $('.lang-picker #spanish').on('click', function () {
	// 	i18n.lang('es');
	// 	selectLang($(this));
	// })

	function selectLang (picker) {
		$('.lang-picker li').removeClass('selected');
		picker.addClass('selected');
	}

	$("#pesquisadoruser").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#myTableUser tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
			});

	
	$("#pesquisador").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#myTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
			});
	//openNav();
	$('select').material_select();
  	Materialize.updateTextFields();
	// inicializacao();
	actualizarDados();

	//actualizarDados_Util();	
	$(".button-collapse").sideNav();
	$('#editar').click(function(){
	$('#yes_no_title_modal').html('Edicao de campos');
	$('#yes_no_content_modal').html('Esta prestes a habilitar edicao de campos<br/>Deseja continuar?');
	$('#yes_no_modal').openModal();	
	$('#yes_btn_modal').click(function(){
		habilitarCampos();
		})
	})
	inicializacao();

	$('#sair').click(function(){
		$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
		$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente sair do sistema ':'Do you realy want to logout?'))
			
		
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/";
		})
	})

	$('.perfil').click(function(){
		$('#msg_title_modal').html('Mensagem do Sistema')
		$('#msg_content_modal').html("Perfil em Manuntencao!")
		$('#msg_modal').openModal();
		$('#ok_btn_modal_').click(function(){
			window.location.href="/";
		})
	})

	$('#registarSite').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem de registo')
			$('#yes_no_content_modal').html('Deseja realmente registar <b>'+$('#nome').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(){
				document.forms.formulario.submit();
			})
		}
	})

	$("#tipo_estatistica").change(function(){
		let comp=$(this).val();
		if(comp=="diario"){
			$(".diario").removeClass("hide");
			$(".mes").addClass("hide");
			$(".anooo").addClass("hide");


		}
		else
		{
			if(comp=="mensal"){
			$(".mes").removeClass("hide");
			$(".diario").addClass("hide");
			$(".anooo").addClass("hide");

		}
			else
			{
			$(".anooo").removeClass("hide");
			$(".mes").addClass("hide");
			$(".diario").addClass("hide");
			}
		}

	})

	$('.apagar_inspdiaria').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
			$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente tomar acção no veiculo de <b>':'Do you really want to take action on  <b>') +$(this).attr("data-user-id")+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"'s</b> vehicle?"))
			$('#yes_no_modal').openModal();
		$('#no_btn_modal_').click(function(){ window.location.href="/inspdiaria"; });
		$('#yes_btn_modal').click(function(){
			window.location.href="/inspdiaria/remove/"+novo;
		})
	})

	$('.apagar_ferramenta').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar a pre-inspecção de <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/ferramenta/remove/"+novo;
		})
	})

	$('.apagar_Epi').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar a pre-inspecção de <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/epi/remove/"+novo;
		})
	})

	$('.apagar_tanque').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar a pre-inspecção do tanque <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/tanque/remove/"+novo;
		})
	})

	$('.apagar_inspmensal').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar a inspecçao Mensal do <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/inspmensal/remove/"+novo;
		})
	})


	$('.apagar_utilizador').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar o utilizador <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/utilizador/remove/"+novo;
		})
	})


	$('.apagar_Gerador').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar pre-utilização do gerador de <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/gerador/remove/"+novo;
		})
	})



	$('.apagar_Transferencia').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente apagar a transferência da viatura <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			window.location.href="/transferencia/remove/"+novo;
		})
	})

	
	$('.aprovar_transferencia').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente aprovar a transferência da viatura <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			$.post("/transferencia/aprovar", {novo:novo}, function(data){
				// window.location.href="/transferencia"
				setTimeout(function(){
					window.location.href="/transferencia";
				}, 4000)

			})
			//window.location.href="/transferencia/remove/"+novo;
		})
	})

	$('.reprovar_transferencia').click(function(){
		$('#yes_no_title_modal').html('Mensagem do sistema')
		var mestre= $(this).attr("data-user-id");
		var novo=$(this).attr("data-user-new")
		console.log(mestre);
		console.log(novo)
		$('#yes_no_content_modal').html('Deseja realmente reprovar a transferência da viatura <b>'+mestre+ "<b>?")
		$('#yes_no_modal').openModal();
		$('#yes_btn_modal').click(function(){
			$.post("/transferencia/reprovar", {novo:novo}, function(data){
				window.location.href="/transferencia"
			})
			//window.location.href="/transferencia/remove/"+novo;
		})
	})



	$(".imagee").click(function(){
		window.location.href="/inicio"
	})
$(".baseinfo").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/info/details/"+refer;
	})





	$(".inspseguro").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/seguranca/"+refer;
	})
	$(".inspedboard").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/edboard/"+refer;
	})
	$(".inspcontainer").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/contentor/"+refer;
	})

	$(".inspacond").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/arcond/"+refer;
	})

	$(".inspmast").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/mast/"+refer;
	})

	$(".inspalarm").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/alarm/"+refer;
	})

	$(".inspgenerator").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/generator/"+refer;
	})

	$(".insprooftop").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/rooftop/"+refer;
	})

	$(".inspsitegeneral").click(function(){
		var refer= $(this).attr("dataref");
		console.log(refer);
		window.location.href="/gerador/sitegeneral/"+refer;
	})

	$(".securedetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/seguranca/details/"+refer;
		})

		$(".edboraddetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/eddboardss/details/"+refer;
		})

		$(".containerdetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/contentor/details/"+refer;
		})

		$(".airconddetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/arcond/details/"+refer;
		})

		$(".mastdetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/mast/details/"+refer;
		})

		$(".alarmdetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/alarm/details/"+refer;
		})

		$(".generatordetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/generator/details/"+refer;
		})

		$(".rooftopdetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/rooftop/details/"+refer;
		})

		$(".generalsitedetails").click(function(){
			var refer= $(this).attr("dataref");
			console.log(refer);
			window.location.href="/gerador/general_site/details/"+refer;
		})




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++imagem magnific++++++++++++++++++++++++++++++++++++++++++
	$('.verimagem').click(function(){
    
    var dir = $(this).attr('src');
    console.log(dir);
    $('#image_modal').html('<img class="center" style="width:80%; height:80%; padding-top:10px" src='+dir+'>')
    $('#image_modal').openModal();
  });




	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++end imagem magnific++++++++++++++++++++++++++++++++++++++

	
	$("#marcarLida").click(function(){
		window.location.href="/mensagem/saida"
	})
	$("#voltar_Viaturas").click(function(){
		window.location.href="/veiculo_Control"
	})
	
	$("#voltarMensal").click(function(){
		window.location.href="/inspmensal"
	})
	$("#voltarFerramenta").click(function(){
		window.location.href="/ferramenta"
	})
	$("#voltarTransferencia").click(function(){
		window.location.href="/transferencia"
	})
	$("#voltarTanque").click(function(){
		window.location.href="/tanque"
	})
	$("#voltarGerador").click(function(){
		window.location.href="/gerador"
	})
	$("#voltarEpi").click(function(){
		window.location.href="/epi"
	})


	$("#voltarDiario").click(function(){
		window.location.href="/inspdiaria"
	})
	$("#voltar_util").click(function(){
		window.location.href="/utilizador"
	})
	$("#marcarLida_e").click(function(){
		window.location.href="/mensagem"
	})

	$('#captar').click(function(){
		if($("input[name='camera']:checked").val() == "not ok" && $("#razaoCamera").val().length == 0){
			$('#msg_title_modal').html('Campo Não Preenchido')
			$('#msg_content_modal').html('Por favor seleccione as razões');
			$('#msg_modal').openModal();
		}else {
			if(validar()){
				$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
				$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente Gravar a inspeção do ':'Do you really want to save <b>') +$('#motorista').val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"'s</b> inspection?"))
				$('#yes_no_modal').openModal({dismissible:false});
				$('#no_btn_modal_').click(function(e){ e.stopPropagation(); window.location.href="/inspdiaria"; });
				$('#yes_btn_modal').click(function(e){
					e.stopPropagation();
					var motorista=$("#motorista").val();
					var matricula=$("#matricula").val();
					var datta=$("#datta").val();
					var limpa_parabrisas=$("input[name='limpa_parabrisas']:checked").val();
					var nivel=$("input[name='nivel']:checked").val();
					var kilometragem=$("#kilometragem").val();
					var carrocaria=$("input[name='carrocaria']:checked").val();
					var razaoCarrocari=$("#razaoCarrocaria").val();
					var luzes=$("input[name='luzes']:checked").val();
					var parabrisas=$("input[name='parabrisa']:checked").val();
					var pneus=$("input[name='pneus']:checked").val();
					var razaoPneus=$("#razaoPneus").val();
					var razaoPressao=$("#razaoPressao").val();
					var razaoPorcas=$("#razaoPorcas").val();
					var razaoVidros=$("#razaoVidros").val();
					var razaoLuzes=$("#razaoLuzes").val();
					var razaoNivel=$("#razaoNivel").val();
					var razaoTravoes=$("#razaoTravoes").val();
					var razaoCamera=$("#razaoCamera").val();
					var porcas=$("input[name='porcas']:checked").val();
					var pressao=$("input[name='pressao']:checked").val();
					var vidros=$("input[name='vidros']:checked").val();
					var refrigeracao=$("input[name='refrigeracao']:checked").val();
					var travoes=$("input[name='travoes']:checked").val();
					var observacao=$("input[name='observacao']:checked").val();

					var camera=$("input[name='camera']:checked").val();
					var handsfree=$("input[name='handsfree']:checked").val();
					$.post( "/inspdiaria/novo", {motorista:motorista, nivel:nivel, limpa_parabrisas:limpa_parabrisas, razaoCarrocari:JSON.stringify(razaoCarrocari), razaoPneus:JSON.stringify(razaoPneus), razaoPressao:JSON.stringify(razaoPressao), razaoPorcas:JSON.stringify(razaoPorcas), razaoCamera:JSON.stringify(razaoCamera), razaoVidros:JSON.stringify(razaoVidros), razaoLuzes:JSON.stringify(razaoLuzes), razaoNivel:JSON.stringify(razaoNivel), razaoTravoes:JSON.stringify(razaoTravoes),
					 matricula:matricula, camera:camera, handsfree:handsfree, kilometragem:kilometragem, carrocaria:carrocaria, luzes:luzes, parabrisas:parabrisas, porcas:porcas, pneus:pneus, pressao:pressao,  vidros:vidros, travoes:travoes, datta:datta, refrigeracao:refrigeracao,  observacao:observacao}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
					$("input[name='carrocaria']:checked").prop("checked", false);
					$("input[name='luzes']:checked").prop("checked", false);
					$("input[name='parabrisa']:checked").prop("checked", false);
					$("input[name='pneus']:checked").prop("checked", false);
					$("input[name='porcas']:checked").prop("checked", false);
					$("input[name='pressao']:checked").prop("checked", false);
					$("input[name='vidros']:checked").prop("checked", false);
					$("input[name='refrigeracao']:checked").prop("checked", false);
					//$("input[name='nivel']:checked").prop("checked", false);
					$("input[name='travoes']:checked").prop("checked", false);
					$("input[name='observacao']:checked").prop("checked", false);
					$("#motorista").val('');
					$("#matricula").val('');
					$("#icon_prefix2").val('');
					$("#datta").val('');
					$("#kilometragem").val('');
					$('#image_modal')
					$('#image_modal').openModal();
					setTimeout(function(){
						window.location.href="/inspdiaria";
					}, 2000)
					
					
				})



				})
			}
		}
	})



	$('#refrigeracaonotok').click(function(){
		$('#refrigeracaoRazao').removeClass('hide');
	})
	$('#refrigeracaook').click(function(){
		$('#refrigeracaoRazao').addClass('hide');
	})


	$('#cameranotok').click(function(){ 
		$('#cameraRazao').removeClass('hide');
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})
	$('#cameraok').click(function(){
		$('#cameraRazao').addClass('hide');
	})


	$('#travoesnotok').click(function(){
		$('#travoesRazao').removeClass('hide');

		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}

	})
	$('#travoesok').click(function(){
		$('#travoesRazao').addClass('hide');
	})

	$('#vidrosnotok').click(function(){
		$('#vidrosRazao').removeClass('hide');
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})
	$('#vidrosok').click(function(){
		$('#vidrosRazao').addClass('hide');
	})

	$('#pneusnotok').click(function(){
		$('#pneusRazao').removeClass('hide');
		$('#carrocariaRazao').removeClass('hide');
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})
	$('#pneusok').click(function(){
		$('#pneusRazao').addClass('hide');
	})

	$('#pressaonotok').click(function(){
		$('#pressaoRazao').removeClass('hide');
		
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}

	})
	$('#pressaook').click(function(){
		$('#pressaoRazao').addClass('hide');
	})

	$('#porcasnotok').click(function(){
		$('#porcasRazao').removeClass('hide');
		
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})
	$('#porcasok').click(function(){
		$('#porcasRazao').addClass('hide');
	})

	$('#carrocarianotok').click(function(){
		$('#carrocariaRazao').removeClass('hide');
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})

	$('#carrocariaok').click(function(){
		$('#carrocariaRazao').addClass('hide');
	})

	$('#luzesnotok').click(function(){
		$('#luzesParte').removeClass('hide');
		
		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})
	$('#luzesok').click(function(){
		$('#luzesParte').addClass('hide');
	})

	$('#nivelnotok').click(function(){
		$('#nivelPartescol').removeClass('hide');

		if ($(".lang-picker").attr("value")=="pt"){
			$(".ptgues").removeClass('hide')
			$(".ingles").addClass('hide')
		}
		else{
			$(".ingles").removeClass('hide')
			$(".ptgues").addClass('hide')
		}
	})
	$('#nivelok').click(function(){
		$('#nivelPartescol').addClass('hide');
	})

	$('#captarFerramenta').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem do registo')
			$('#yes_no_content_modal').html('Deseja realmente gravar a inspenção do <b>'+$('#nome').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(){

				var estado_geral=$("#_estado_geral").val();
				//ferra.data=body.data;
				var cabos_mangueira=$("#cabos_mangueira").val();
				var interruptores=$("#interruptores").val();
				var ruido=$("#ruido").val();
				var funcionamento=$("#funcionamento").val();
				var manometro=$("#manometro").val();
				var macarico=$("#macarico").val();
				var nivel_vidros=$("#nivel_vidros").val();
				var nome=$("#nome").val();
				var image=nome;
				var utilizador=$("#utilizador").val();
				//var data_utilizador=$("#data_utilizador").val();
				var observacao=$("#observacao").val();
				$.post("/ferramenta/novo", {utilizador:utilizador,estado_geral:estado_geral,cabos_mangueira:cabos_mangueira,interruptores:interruptores,ruido:ruido,funcionamento:funcionamento,manometro:manometro,macarico:macarico,nivel_vidros:nivel_vidros,nome:nome,image:image,observacao:observacao}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
				$("#_estado_geral").val('');
				$("#cabos_mangueira").val('');
				$("#interruptores").val('');
				$("#ruido").val('');
				$("#funcionamento").val('');
				$("#manometro").val('');
				$("#macarico").val('');
				$("#nivel_vidros").val('');
				$("#nome").val('');
				$("#image").val('');
				$("#utilizador").val('');
				$("#data_utilizador").val('');
				$("#observacao").val('');
				window.location.href="/ferramenta";
				console.log("cheguei!!!!!")})



			})
		}
	})
	$('#captarEpi').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem do registo')
			$('#yes_no_content_modal').html('Deseja realmente gravar a inspecção de <b>'+$('#nome').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(){

				var estado_geral=$("#_estado_geral").val();
				//ferra.data=body.data;
				var componentes=$("#componentes").val();
				var nome=$("#nome").val();
				var image=nome;
				var utilizador=$("#utilizador").val();
				//var data_utilizador=$("#data_utilizador").val();
				var observacao=$("#observacao").val();
				$.post("/epi/novo", {utilizador:utilizador,estado_geral:estado_geral,componentes:componentes,nome:nome,image:image,observacao:observacao}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
				$("#_estado_geral").val('');
				$("#funcionamento").val('');
				$("#nome").val('');
				$("#image").val('');
				$("#utilizador").val('');
				$("#observacao").val('');
				window.location.href="/epi";
				console.log("cheguei!!!!!")})



			})
		}
	})


	$('#captarTanque').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem do registo')
			$('#yes_no_content_modal').html('Deseja realmente gravar a inspecção do tanque de <b>'+$('#motorista').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(){
				var estado_geral_=$("#estado_geral_").val();
				var freio_manual=$("#freio_manual").val();
				var pneus=$("#pneus").val();
				var tampa_combustivel=$("#tampa_combustivel").val();
				var chapa_matricula=$("#chapa_matricula").val();
				var cabo_polia_peca=$("#cabo_polia_peca").val();
				var trailer_licenciado=$("#trailer_licenciado").val();
				var tanque_abordo=$("#tanque_abordo").val();
				var luzes=$("#luzes").val();
				var acoplamento=$("#acoplamento").val();
				var parafusos_hook=$("#parafusos_hook").val();
				var rodas=$("#rodas").val();
				var motorista=$("#motorista").val();
				var observacao=$("#observacao").val();
				$.post( "/tanque/novo", {
					estado_geral_:estado_geral_,
					freio_manual:freio_manual,
					pneus:pneus,
					tampa_combustivel:tampa_combustivel,
					chapa_matricula:chapa_matricula,
					cabo_polia_peca:cabo_polia_peca,
					trailer_licenciado:trailer_licenciado,
					tanque_abordo:tanque_abordo,
					luzes:luzes,
					acoplamento:acoplamento,
					parafusos_hook:parafusos_hook,
					rodas:rodas,
					motorista:motorista, observacao:observacao
				}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
				$("#estado_geral_").val('');
				$("#freio_manual").val('');
				$("#pneus").val('');
				$("#tampa_combustivel").val('');
				$("#chapa_matricula").val('');
				$("#cabo_polia_peca").val('');
				$("#trailer_licenciado").val('');
				$("#tanque_abordo").val('');
				$("#luzes").val('');
				$("#pneus").val('');
				$("#parafusos_hook").val('');
				$("#rodas").val('');
				$("#motorista").val('');
				$("#observacao").val('');
				window.location.href="/tanque";
				console.log("cheguei!!!!!")})



			})
		}
	})

		$('#captarGerador').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem do registo')
			$('#yes_no_content_modal').html('Deseja realmente gravar a inspecção do tanque de <b>'+$('#motorista').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(){
				var estado_geral_=$("#estado_geral_").val();
				var freio_manual=$("#freio_manual").val();
				var pneus=$("#pneus").val();
				var tampa_combustivel=$("#tampa_combustivel").val();
				var chapa_matricula=$("#chapa_matricula").val();
				var cabo_polia_peca=$("#cabo_polia_peca").val();
				var trailer_licenciado=$("#trailer_licenciado").val();
				var gerador_abordo=$("#gerador_abordo").val();
				var luzes=$("#luzes").val();
				var acoplamento=$("#acoplamento").val();
				var parafusos_hook=$("#parafusos_hook").val();
				var roda_sobressalente=$("#roda_sobressalente").val();
				var motorista=$("#motorista").val();
				var interruptores_eletrico=$("#interruptores_eletrico").val();
				var manometro=$("#manometro").val();
				var licenca_veiculo=$("#licenca_veiculo").val();
				var roda_reboque=$("#roda_reboque").val();
				var bateria=$("#bateria").val();
				var ficha_electrica=$("#ficha_electrica").val();
				var observacao=$("#observacao").val();
				$.post( "/gerador/novo", {
					estado_geral_:estado_geral_,
					freio_manual:freio_manual,
					pneus:pneus,
					tampa_combustivel:tampa_combustivel,
					chapa_matricula:chapa_matricula,
					cabo_polia_peca:cabo_polia_peca,
					trailer_licenciado:trailer_licenciado,
					gerador_abordo:gerador_abordo,
					luzes:luzes,
					acoplamento:acoplamento,
					parafusos_hook:parafusos_hook,
					roda_sobressalente:roda_sobressalente,
					motorista:motorista,
					interruptores_eletrico:interruptores_eletrico,
					manometro:manometro,
					licenca_veiculo:licenca_veiculo,
					roda_reboque:roda_reboque,
					bateria:bateria,
					ficha_electrica:ficha_electrica, observacao:observacao
				}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
				$("#freio_manual").val('');
				$("#pneus").val('');
				$("#tampa_combustivel").val('');
				$("#chapa_matricula").val('');
				$("#cabo_polia_peca").val('');
				$("#trailer_licenciado").val('');
				$("#gerador_abordo").val('');
				$("#luzes").val('');
				$("#pneus").val('');
				$("#parafusos_hook").val('');
				$("#roda_sobressalente").val('');
				$("#motorista").val();
				$("#interruptores_eletrico").val('');
				$("#manometro").val('');
				$("#licenca_veiculo").val('');
				$("#roda_reboque").val('');
				$("#bateria").val('');
				$("ficha_electrica").val('');
				$("#observacao").val('');
				window.location.href="/gerador";
				console.log("cheguei!!!!!")})



			})
		}
	})

	$('#captarMensal').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem do registo')
			$('#yes_no_content_modal').html('Deseja realmente gravar a inspenção do <b>'+$('#motorista').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(){
				var estado_pintura=$("#estado_pintura").val();
				var lubrificacao_tubos=$("#lubrificacao_tubos").val();
				var kit_maos_camera=$("#kit_maos_camera").val();
				var condicionado_electrico=$("#condicionado_electrico").val();
				var porcas_parafusos=$("#porcas_parafusos").val();
				var sinalizacao=$("#sinalizacao").val();
				var documentos=$("#documentos").val();
				var parabrisas=$("#parabrisas").val();
				var sist_direcao=$("#sist_direcao").val();
				var trinco_seguranca=$("#trinco_seguranca").val();
				var espelhos=$("#espelhos").val();
				var travoes=$("#travoes").val();
				var buzina=$("#buzina").val();
				var socorro_extintor=$("#socorro_extintor").val();
				var macaco_roda=$("#macaco_roda").val();
				var vidros_manometro=$("#vidros_manometro").val();
				var liquido=$("#liquido").val();
				var tapetes=$("#tapetes").val();
				var bateria=$("#bateria").val();
				var etiquetas=$("#etiquetas").val();
				var sinais_perigo=$("#sinais_perigo").val();
				var quilometragem=$("#quilometragem").val();
				var data=$("#data").val();
				var inspector=$("#inspector").val();
				var matricula=$("#matricula").val();
				var motorista=$("#motorista").val();
				var marca_modelo=$("#marca_modelo").val();
				var numero_registo=$("#numero_registo").val();
				var mes=$("#mes").val();
				var observacao=$("#observacao").val();
				$.post( "/inspmensal/novo", {estado_pintura:estado_pintura,
					lubrificacao_tubos:lubrificacao_tubos,
					kit_maos_camera:kit_maos_camera,
					condicionado_electrico:condicionado_electrico,
					porcas_parafusos:porcas_parafusos,
					sinalizacao:sinalizacao,
					documentos:documentos,
					parabrisas:parabrisas,
					sist_direcao:sist_direcao,
					trinco_seguranca:trinco_seguranca,
					espelhos:espelhos,
					travoes:travoes,
					buzina:buzina,
					socorro_extintor:socorro_extintor,
					macaco_roda:macaco_roda,
					vidros_manometro:vidros_manometro,
					liquido:liquido,
					tapetes:tapetes,
					bateria:bateria,
					etiquetas:etiquetas,
					sinais_perigo:sinais_perigo,
					quilometragem:quilometragem,
					data:data,
					inspector:inspector,
					matricula:matricula,
					motorista:motorista,
					marca_modelo:marca_modelo,
					numero_registo:numero_registo,
					mes:mes, observacao:observacao}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
					$("#estado_pintura").val('');
					$("#lubrificacao_tubos").val('');
					$("#kit_maos_camera").val();
					$("#condicionado_electrico").val('');
					$("#porcas_parafusos").val('');
					$("#sinalizacao").val('');
					$("#documentos").val('');
					$("#parabrisas").val('');
					$("#sist_direcao").val('');
					$("#trinco_seguranca").val('');
					$("#espelhos").val('');
					$("#travoes").val('');
					$("#buzina").val('');
					$("#socorro_extintor").val('');
					$("#macaco_roda").val('');
					$("#vidros_manometro").val('');
					$("#liquido").val('');
					$("#tapetes").val('');
					$("#bateria").val('');
					$("#etiquetas").val('');
					$("#sinais_perigo").val('');
					$("#quilometragem").val('');
					$("#data").val('');
					$("#inspector").val('');
					$("#matricula").val('');
					$("#motorista").val('');
					$("#marca_modelo").val('');
					$("#numero_registo").val('');
					$("#mes").val('');
					$("#observacao").val('');
				window.location.href="/inspmensal";
				console.log("cheguei!!!!!")})



			})
		}
	})

	


	// $('#upexcel').change(function (e) {
  //               var rABS = true;
  //               var files = e.target.files, f = files[0];
  //               if (files) {
  //                   var reader = new FileReader();
  //                   reader.onload = function (e) {
  //                       var data = e.target.result;
  //                       if (!rABS) data = new Uint8Array(data);
  //                       //ler o excel
  //                       var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
  //                       // pegar o nome da primeira folha/sheet
  //                       var first_sheet_name = workbook.SheetNames[0];

  //                       /* Get Objecto que representa a folha1 */
  //                       var worksheet = workbook.Sheets[first_sheet_name];

  //                       //extrair dados da primeira folha como array de objectos
  //                       let json = XLSX.utils.sheet_to_json(worksheet,
  //                           {
  //                               "range": 1, // a partir de que linha deve ler os dados (para nao ler com a linha dos titulos)
  //                               "header": ["matricula", "kilometragem", "combustivel"] // lista dos nomes para os campos que correspondem as colunas do excel
  //                           	// "header": ["nome", "telefone_1", "email", "regiao", "departamento", "nome_supervisor"]
  //                           });

  //                       //imprimir na consola
  //                       var m=JSON.stringify(json);

  //                       console.log(m);
  //                       $.post("/utilizador/update", {m:m}, function(data){
  //                       	//window.location.href="/utilizador";
  //                       })

  //                       //preencher tabela
  //                       // let tabela = document.getElementById("tabela");
  //                       // tabela.append("<thead></thead>")
  //                   }
  //                   if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
  //               }
  //           });

	// 		$('#registar_editacao').click(function(){
  //       var referencia = $(this).attr("detalhesusuario");
  //       if(validar()){
  //         $('#yes_no_title_modal').html('Message System')
  //         $('#yes_no_content_modal').html('do you really to update data of <b>'+$('#nome').val()+'</b>?')
  //         $('#yes_no_modal').openModal();
  //         $('#yes_btn_modal').click(function(){
  //           var identificacao=referencia;
  //           var user_code=$("#user_code").val();
  //           var nome=$("#nome").val();
  //           var kilometragem=$("#kilometragem").val();
  //           var carta_conducao=$("#carta_conducao").val();
  //           var data_nascimento= $("#data_nascimento").val();
  //           var Validade_carta= $("#Validade_carta").val();
  //           var regiao= $("#regiao").val();
  //           var departamento= $("#departamento").val();
  //           var provincia_trabalho=$("#provincia_trabalho").val();
  //           var telefone_supervisor= $("#telefone_supervisor").val();
  //           var matricula=$("#matricula").val().toUpperCase();
  //           var supervisor=$("#supervisor").val();
  //           var funcao=$("#funcao").val();
  //           var marca=$("#marca").val();
  //           var modelo=$("#modelo").val();
  //           var ano_aquisicao=$("#ano_aquisicao").val();
  //           var telefone_1=$("#telefone_1").val();
  //           // var user_pettycash=$("#user_pettycash").val();
  //           var nome_supervisor=$("#nome_supervisor").val();
  //           var email=$("#email").val();
  //           var username=$("#username").val();
  //           var nivel_acesso= $("#nivel_acesso").val();
  //           var senha=$("#senha").val();
  //           $.post( "/utilizador/editar",
  //           { user_code:user_code,
  //             nome:nome,
  //             identificacao:identificacao,
  //             kilometragem:kilometragem,
  //             carta_conducao:carta_conducao,
  //             data_nascimento:data_nascimento,
  //             Validade_carta:Validade_carta,
  //             nome_supervisor:nome_supervisor,
  //             regiao:regiao,
  //             departamento:departamento,
  //             provincia_trabalho:provincia_trabalho,
  //             telefone_supervisor:telefone_supervisor,
  //             matricula:matricula,
  //             supervisor:supervisor,
  //             funcao:funcao,
  //             marca:marca,
  //             modelo:modelo,
  //             ano_aquisicao:ano_aquisicao,
  //             telefone_1:telefone_1,
  //             email:email,
  //             username:username,
  //             nivel_acesso:nivel_acesso,
  //             senha:senha}, function( data ) {
  //               //alert("dados Gravados com Sucesso!!");
  //           $("#nome").val('');
  //           $("#carta_conducao").val('');
  //           $("#data_nascimento").val('');
  //           $("#Validade_carta").val('');
  //           $("#regiao").val('');
  //           $("#departamento").val('');
  //           $("#provincia_trabalho").val('');
  //           $("#telefone_supervisor").val('');
  //           $("#matricula").val('')
  //           $("#supervisor").val('');
  //           $("#funcao").val('');
  //           $("#marca").val('');
  //           $("#modelo").val('');
  //           $("#ano_aquisicao").val('');
  //           $("#telefone_1").val('');
  //           $("#email").val('');
  //           $("#username").val('');
  //           $("#nivel_acesso").val('');
  //           $("#senha").val('');
  //           $("#kilometragem").val('');
  //           window.location.href="/utilizador";
  //           console.log("cheguei!!!!!")
  //    })
    
    
    
  //         })
  //       }
  //     })

      $("#carregar_photo").change(function(e){
        $('#loading').fadeIn().delay(7000).fadeOut();
        // $.post("/inspdiaria/actualzacao_kilometro", {m:m}, function(data){
        //   //window.location.href="/utilizador";
        // }) carregar_photo
    
        let perfil_photoo= new FormData();
        var photo_perfil=e.target.files;
            if(photo_perfil.length!=0){
            for(let i = 0; i < photo_perfil.length; i++){
              perfil_photoo.append('photo_perfil', photo_perfil[i]);
            }
            }
            console.log(photo_perfil);
            let ruless= "/utilizador/carregar_photo";
            var xhr = new XMLHttpRequest();
            // Add any event handlers here...
            xhr.open('POST',ruless, true);
            xhr.send(perfil_photoo);
    
    
    
        
    
        setTimeout(function(){window.location.href="/inicio"}, 3000);
        
      });
      
    
    
      $('#upexcel').change(function (e) {
                    var rABS = true;
                    var files = e.target.files, f = files[0];
                    if (files) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            if (!rABS) data = new Uint8Array(data);
                            //ler o excel
                            var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array', cellDates: true, dateNF: 'yyyy/mm/dd;@' });
                            // pegar o nome da primeira folha/sheet
                            var first_sheet_name = workbook.SheetNames[0];
    
                            /* Get Objecto que representa a folha1 */
                            var worksheet = workbook.Sheets[first_sheet_name];
    
                            //extrair dados da primeira folha como array de objectos
                            let json = XLSX.utils.sheet_to_json(worksheet,
                                {
                                    "range": 1, // a partir de que linha deve ler os dados (para nao ler com a linha dos titulos)
                                    "header": ["matricula", "k_inicial", "k_final", "ddata"] // lista dos nomes para os campos que correspondem as colunas do excel
                                  // "header": ["nome", "telefone_1", "email", "regiao", "departamento", "nome_supervisor"]
                                });
    
                            //imprimir na consola
                            var m=JSON.stringify(json);
    
                            console.log(m);
                            $.post("/inspdiaria/actualzacao_kilometro", {m:m}, function(data){
                              //window.location.href="/utilizador";
                            })
    
                            $('#loading').fadeIn().delay(7000).fadeOut();
    
                            setTimeout(function(){window.location.href="/inspdiaria"}, 3000);
    
                            //preencher tabela
                            // let tabela = document.getElementById("tabela");
                            // tabela.append("<thead></thead>")
                        }
                        if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
                    }
                });
    
                $('#upexcelUtilizador').change(function (e) {
                  var rABS = true;
                  var files = e.target.files, f = files[0];
                  if (files) {
                      var reader = new FileReader();
                      reader.onload = function (e) {
                          var data = e.target.result;
                          if (!rABS) data = new Uint8Array(data);
                          //ler o excel
                          var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array', cellDates: true, dateNF: 'yyyy/mm/dd;@' });
                          // pegar o nome da primeira folha/sheet
                          var first_sheet_name = workbook.SheetNames[0];
    
                          /* Get Objecto que representa a folha1 */
                          var worksheet = workbook.Sheets[first_sheet_name];
    
                          //extrair dados da primeira folha como array de objectos
                          let json = XLSX.utils.sheet_to_json(worksheet,
                              {
                                  "range": 1, // a partir de que linha deve ler os dados (para nao ler com a linha dos titulos)
                                  "header": ["codigo", "nome_proprio", "nome"] // lista dos nomes para os campos que correspondem as colunas do excel
                                // "header": ["nome", "telefone_1", "email", "regiao", "departamento", "nome_supervisor"]
                              });
    
                          //imprimir na consola
                          var m=JSON.stringify(json);
    
                          console.log(m);
                          $.post("/utilizador/actualzacao_Hr", {m:m}, function(data){
                            //window.location.href="/utilizador";
                          })
    
                          $('#loading').fadeIn().delay(7000).fadeOut();
    
                          setTimeout(function(){window.location.href="/inspdiaria"}, 3000);
    
                          //preencher tabela
                          // let tabela = document.getElementById("tabela");
                          // tabela.append("<thead></thead>")
                      }
                      if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
                  }
              });
    
          $('#registar_editacao').click(function(){
            if(validar()){
              $('#yes_no_title_modal').html('Message System')
              $('#yes_no_content_modal').html('do you really to update data of <b>'+$('#nome').val()+'</b>?')
              $('#yes_no_modal').openModal();
              $('#yes_btn_modal').click(function(e){
                $('#loading').fadeIn().delay(7000).fadeOut();
                e.stopImmediatePropagation();
                var identificacao=$("#identificacao").val();
                var nome=$("#nome").val();
                var kilometragem=$("#kilometragem").val();
                var carta_conducao=$("#carta_conducao").val();
                var data_nascimento= $("#data_nascimento").val();
                var Validade_carta= $("#Validade_carta").val();
                var regiao= $("#regiao").val();
                var departamento= $("#departamento").val();
                var provincia_trabalho=$("#provincia_trabalho").val();
                var telefone_supervisor= $("#telefone_supervisor").val();
                var matricula=$("#matricula").val().toUpperCase();
                var supervisor=$("#supervisor").val();
                var funcao=$("#funcao").val();
                var marca=$("#marca").val();
                var modelo=$("#modelo").val();
                var ano_aquisicao=$("#ano_aquisicao").val();
                var telefone_1=$("#telefone_1").val();
                var nome_supervisor=$("#nome_supervisor").val();
                var email=$("#email").val();
                var username=$("#username").val();
                var nivel_acesso= $("#nivel_acesso").val();
                var senha=$("#senha").val();
                $.post( "/utilizador/editar",
                {	nome:nome,
                  identificacao:identificacao,
                  kilometragem:kilometragem,
                  carta_conducao:carta_conducao,
                  data_nascimento:data_nascimento,
                  Validade_carta:Validade_carta,
                  nome_supervisor:nome_supervisor,
                  regiao:regiao,
                  departamento:departamento,
                  provincia_trabalho:provincia_trabalho,
                  telefone_supervisor:telefone_supervisor,
                  matricula:matricula,
                  supervisor:supervisor,
                  funcao:funcao,
                  marca:marca,
                  modelo:modelo,
                  ano_aquisicao:ano_aquisicao,
                  telefone_1:telefone_1,
                  email:email,
                  username:username,
                  nivel_acesso:nivel_acesso,
                  senha:senha}, function( data ) {
                    //alert("dados Gravados com Sucesso!!");
                $("#nome").val('');
                $("#carta_conducao").val('');
                $("#data_nascimento").val('');
                $("#Validade_carta").val('');
                $("#regiao").val('');
                $("#departamento").val('');
                $("#provincia_trabalho").val('');
                $("#telefone_supervisor").val('');
                $("#matricula").val('')
                $("#supervisor").val('');
                $("#funcao").val('');
                $("#marca").val('');
                $("#modelo").val('');
                $("#ano_aquisicao").val('');
                $("#telefone_1").val('');
                $("#email").val('');
                $("#username").val('');
                $("#nivel_acesso").val('');
                $("#senha").val('');
                $("#kilometragem").val('');
                window.location.href="/utilizador";
                console.log("cheguei!!!!!")
         })
        
        
        
              })
            }
          })
          
          $('#registar_profile').click(function(){
            if(validar()){
              $('#yes_no_title_modal').html('Message System')
              $('#yes_no_content_modal').html('desejas realmente actualizar o teu perfil?')
              $('#yes_no_modal').openModal();
              $('#yes_btn_modal').click(function(e){
                $('#loading').fadeIn().delay(7000).fadeOut();
                e.stopImmediatePropagation();
                e.stopPropagation();
                var nome=$("#nome").val();
                var idioma=$("#idioma").val();
                var username_actual=$("#username_actual").val();
                var password_actual= $("#password_actual").val();
                var novo_username= $("#novo_username").val();
                var novo_password= $("#novo_password").val();
                var perfil_user=new FormData()
                perfil_user.append("username_actual", username_actual);
                perfil_user.append("nome", nome);
                perfil_user.append("idoma", idioma);
                perfil_user.append("password_actual", password_actual);
                perfil_user.append("novo_username", novo_username);
                perfil_user.append("novo_pasword", novo_password);
    
                var xhr= new XMLHttpRequest()
                xhr.open("POST", "/utilizador/profile_edit", true);
                xhr.send(perfil_user);
                
                setTimeout(function(){
                  window.location.href="/inicio"
                }, 3000)
        
        
        
              })
            }
          })
    

	$('#registar_util').click(function(){
    if(validar()){


      $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente o gravar o utilizador  <b>':'Do you really want to save <b>')+$('#nome').val()+'</b>?')

      // $('#yes_no_content_modal').html('Deseja realmente registar o utilizador <b>'+$('#nome').val()+'</b>?')
      $('#yes_no_modal').openModal();
      $('#yes_btn_modal').click(function(){ 
        var user_code=$("#user_code").val();
        var nome=$("#nome").val();
        var kilometragem=$("#kilometragem").val();
        var carta_conducao=$("#carta_conducao").val();
        var data_nascimento= $("#data_nascimento").val();
        var Validade_carta= $("#Validade_carta").val();
        var regiao= $("#regiao").val();
        var departamento= $("#departamento").val();
        var provincia_trabalho=$("#provincia_trabalho").val();
        var telefone_supervisor= $("#telefone_supervisor").val();
        var matricula=$("#matricula").val().toUpperCase();
        var supervisor=$("#supervisor").val();
        var funcao=$("#funcao").val();
        var marca=$("#marca").val();
        var modelo=$("#modelo").val();
        var ano_aquisicao=$("#ano_aquisicao").val();
        var telefone_1=$("#telefone_1").val();
        var nome_supervisor=$("#nome_supervisor").val();
        var email=$("#email").val();
        var username=$("#username").val();
        var nivel_acesso= $("#nivel_acesso").val();
        var senha=$("#senha").val();
        $.post( "/utilizador/novo",
        {
          user_code:user_code,
          nome:nome,
          kilometragem:kilometragem,
          carta_conducao:carta_conducao,
          data_nascimento:data_nascimento,
          Validade_carta:Validade_carta,
          nome_supervisor:nome_supervisor,
          regiao:regiao,
          departamento:departamento,
          provincia_trabalho:provincia_trabalho,
          telefone_supervisor:telefone_supervisor,
          matricula:matricula,
          supervisor:supervisor,
          funcao:funcao,
          marca:marca,
          modelo:modelo,
          ano_aquisicao:ano_aquisicao,
          telefone_1:telefone_1,
          email:email,
          username:username,
          nivel_acesso:nivel_acesso,
          senha:senha}, function( data ) {
            //alert("dados Gravados com Sucesso!!");
        $("#nome").val('');
        $("#carta_conducao").val('');
        $("#data_nascimento").val('');
        $("#Validade_carta").val('');
        $("#regiao").val('');
        $("#departamento").val('');
        $("#provincia_trabalho").val('');
        $("#telefone_supervisor").val('');
        $("#matricula").val('')
        $("#supervisor").val('');
        $("#funcao").val('');
        $("#marca").val('');
        $("#modelo").val('');
        $("#ano_aquisicao").val('');
        $("#telefone_1").val('');
        $("#email").val('');
        $("#username").val('');
        $("#nivel_acesso").val('');
        $("#senha").val('');
        $("#kilometragem").val('');
        window.location.href="/utilizador";
        console.log("cheguei!!!!!")
 })



      })
    }
  })
	$('#captarTransferencia').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
			$('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente transferir o veiculo <b>':'Do you really want to save <b>') +$('#marca_modelo').val()+(($(".lang-picker").attr("value")=="pt")?'</b> ?':"'s</b> Transference?"))
			$('#yes_no_modal').openModal({dismissible:false});
			$('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();
				var nivel=$("input[name='nivel']:checked").val();
				var carrocaria=$("input[name='carrocaria']:checked").val();
				var razaoCarrocari=$("#razaoCarrocaria").val();
				var luzes=$("input[name='luzes']:checked").val();
				var parabrisas=$("input[name='parabrisa']:checked").val();
				var pneus=$("input[name='pneus']:checked").val();
				var razaoPneus=$("#razaoPneus").val();
				var razaoPressao=$("#razaoPressao").val();
				var razaoPorcas=$("#razaoPorcas").val();
				var razaoVidros=$("#razaoVidros").val();
				var razaoLuzes=$("#razaoLuzes").val();
				var razaoNivel=$("#razaoNivel").val();
				var razaoTravoes=$("#razaoTravoes").val();
				var razaoCamera=$("#razaoCamera").val();
				var porcas=$("input[name='porcas']:checked").val();
				var pressao=$("input[name='pressao']:checked").val();
				var vidros=$("input[name='vidros']:checked").val();
				// var refrigeracao=$("input[name='refrigeracao']:checked").val();
				var travoes=$("input[name='travoes']:checked").val();
				var camera=$("input[name='camera']:checked").val();
				var handsfree=$("input[name='handsfree']:checked").val();
				var motorista=$("#motorista").val();
				// var data=$("#data").val();
				var matricula=$("#matricula").val();
				var supervisor=$("#supervisor").val();
				// var nome_condutor=$("#nome_condutor").val();
				var nome_receptor=$("#nome_receptor").val();
				var data_transferencia=$("#data_transferencia").val();
				var marca_modelo=$("#marca_modelo").val();
				var quilometragem=$("#quilometragem").val();
				
				$.post( "/transferencia/novo",
				{
					 nivel:nivel,
					  razaoCarrocari:JSON.stringify(razaoCarrocari),
					   razaoPneus:JSON.stringify(razaoPneus),
						razaoPressao:JSON.stringify(razaoPressao),
						 razaoPorcas:JSON.stringify(razaoPorcas), 
						 razaoCamera:JSON.stringify(razaoCamera), 
						 razaoVidros:JSON.stringify(razaoVidros), 
						 razaoLuzes:JSON.stringify(razaoLuzes), 
						 razaoNivel:JSON.stringify(razaoNivel), 
						 razaoTravoes:JSON.stringify(razaoTravoes),
					camera:camera, 
					handsfree:handsfree, 
					carrocaria:carrocaria, 
					luzes:luzes, 
					porcas:porcas, 
					pressao:pressao,  
					vidros:vidros, 
					travoes:travoes,  
					motorista:motorista,
				matricula:matricula,
				supervisor:supervisor,
				pneus:pneus,
				quilometragem:quilometragem,
				nome_receptor:nome_receptor,
				
				data_transferencia:data_transferencia,
				marca_modelo:marca_modelo}, function( data ) {
						//alert("dados Gravados com Sucesso!!");
				// $("#motorista").val('');
				// $("#data").val('');
				// $("#matricula").val('');
				// $("#pneus").val('');
				// $("#parabrisas").val('');
				// $("#porcas_parafusos").val('');
				// $("#luzes").val('');
				// $("#buzina").val('');
				// $("#vidros_motor").val('');
				// $("#liquido_refrigerante").val('');
				// $("#liquido_travoes").val('');
				// $("#kit_maos_camera").val('');
				// $("#liquido_parabrisas").val('');
				// $("#apto_uso").val('');
				// $("#data_inspecao").val('');
				// $("#nome_condutor").val('');
				// $("#nome_receptor").val('');
				// $("#verificacao_local").val('');
				// $("#data_transferencia").val('');
				// $("#marca_modelo").val('');
				// $("#quilometragem").val('');
				// $("#observacao").val('');
				window.location.href="/transferencia";
				
 })

			})
		}
	})


	
	$("#cancelar1").click(function(){
				window.location.href="/inspdiaria"
			})
$("#cancel_action").click(function(){
				window.location.href="/ferramenta"
			})
$("#cancel_action2").click(function(){
				window.location.href="/ferramenta"
			})

	$("#cancelar_util").click(function(){
				window.location.href="/utilizador"
			})
$("#cancelar_acao").click(function(){
				window.location.href="/inspdiaria"
			})

	$("#cancelarEpi").click(function(){
				window.location.href="/epi"
			})

	$("#cancelarFerramenta").click(function(){
				window.location.href="/ferramenta"
			})	
	$("#cancelarTanque").click(function(){
				window.location.href="/tanque"
			})	
	$("#cancelarMensal").click(function(){
				window.location.href="/inspmensal"
			})	
	$("#cancelar1").click(function(){
				window.location.href="/inspdiaria"
			})
	$("#cancelar_mensagem").click(function(){
				window.location.href="/mensagem"
			})

	$("#cancelarTransferencia").click(function(){
				window.location.href="/transferencia"
			})
	$("#cancelarGerador").click(function(){
				window.location.href="/gerador"
			})
	$('#enviar').click(function(){
		if(validar()){
			$('#yes_no_title_modal').html('Mensagem do registo')
			$('#yes_no_content_modal').html('Deseja realmente enviar a mensagem para  <b>'+$('#destinatario').val()+'</b>?')
			$('#yes_no_modal').openModal();
			$('#yes_btn_modal').click(function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();
				var destinatario=$("#destinatario").val();
				var assunto=$("#assunto").val();
				var mensage=$("#icon_prefix2").val();
				$.post( "/mensagem/novo", {destinatario:destinatario, assunto:assunto, conteudo:mensage, remetente:"eu"}, function( data ) {
				$("#destinatario").val('');
				$("#assunto").val('');
				$("#icon_prefix2").val();
				
				window.location.href="/mensagem/saida";
				console.log("cheguei!!!!!")
 })



			})
		}
	})
	$("#entrar").click(function(){
		var username=$("#username").val().trim();
		var senha=$("#senha").val().trim();
		var confirm=$("#confirmacaoo").val().trim();
		$.post("/", {senha:senha, username:username, confirm:confirm}, function(data){
			$("#username").val('');
			$("#senha").val('');
		})
	})


	$("#updatepwd").click(function(){
		var username=$("#username").val();
		var senha=$("#senha").val();
		$.post("/change", {senha:senha, username:username}, function(data){
			$("#username").val('');
			$("#senha").val('');
		})
	})

	function actualizarDados(){
						$.getJSON('/inspdiaria', function(result){
							$('#table_list .table_body').html('');
							console.log(result[0]);
							for (var i = 0; i < result.length; i++) {
								$('#table_list .table_body').append('<tr><td>'+result[i].motorista+'</td><td>'+result[i].matricula+'</td><td>'+result[i].data+'</td></tr>');
							};
						});


					}
	// function actualizarDados_Util(){
	// 	$.getJSON('/utilizador', function(result){
	// 		$('#table_list .table_body').html('');
	// 		console.log(result[0]);
	// 		for (var i = 0; i < result.length; i++) {
	// 			$('#table_list .table_body').append('<tr><td>'+result[i].motorista+'</td><td>'+result[i].matricula+'</td><td>'+result[i].data+'</td></tr>');
	// 		};
	// 	});


	// }






	$('#provincia_nascimento').change(function(){
		updateDistritos('provincia_nascimento', 'distrito_nascimento');
	})

	$('#provincia_residencia').change(function(){
		updateDistritos('provincia_residencia', 'distrito_residencia');
	});



	$("#category").change(function(){
		var category=["Assets", "Expenses", "Stock"];
		var subcategory=[["Cellphone", "Deskphone", "Desktop", "Laptop", "Server", "Fire Equipment", "Climbing Kit", "Multimeter", "Battery Analyzer", "Civil Tools", "Disposable Tools", "Electrical", "Electrical Tools", "Electronic Tools", "Handtool", "Kit Tools", "Mechanical Tools", "Other Tools", "Special Tools", "Transmission", "Workshop Tools", "Airconditioner"],["Advertising","Airfreight","Civil Construction","Computer Maintenance & Support","Crane Hire","Customs, Freight & Delivery Charges","Entertainment","Equipment Hire","Fault Location & Repair","Import Duties","Insurance","Labour","Legal Services","Load, Transport & Offload","Maintenance & Servicing","Mechanical Repairs","Medicals","Payroll Support","Printing Service","Recruitment","Rental","Repairs","S.H.E.Q Inspections & Services","Services & Sub Contracting","Software","Staff Accommodation","Subcriptions","Training","Translation Services","Travelling","Vehicles","Waste Container Services"],["Air Conditioniner","Chemicals","Civil","Cleaning/ Sanitation","Consumables","Electrical","Fleet","Generators","IT Accessories","Locks","Oil/Fuel","Other","Poison","R F","S.H.E.Q","Spares","Stationery"]];
		let ten= $("#category").val();
		// console.log(subcat)
		let gh = category.indexOf(ten);
		$('#subcategory').empty(); 
		console.log(ten, gh)
	subcategory[gh].forEach(function(distrito){
		$('#subcategory').append('<option value="'+distrito+'">'+distrito+'</option>')
	})

  })
  



	

	$('#mocambique').click(function(){
		$('#mocambicano_container').removeClass('hide');
		$('#estrangeiro_container').addClass('hide');
	})

	$('#estrangeiro').click(function(){
		$('#estrangeiro_container').removeClass('hide');
		$('#mocambicano_container').addClass('hide');
	})



	$("input[name='cliente_stock']").change(function(){
		if($(this).val()=="sim")
			$(".clientee").removeClass("hide");
		else
			$(".clientee").addClass("hide");

	})

	$('#estado_civil').change(function(){
		if($(this).val().match(/casado/i)){
			$('#conjuge_container').removeClass('hide');
			$('#conjuge_container input').addClass('preencher');
		} else {
			$('#conjuge_container input').removeClass('preencher');
			$('#conjuge_container').addClass('hide');
		}
	})
// **********************************************************************

	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('currentMan');
		$('.tab-content').removeClass('currentMan');

		$(this).addClass('currentMan');
		$("#"+tab_id).addClass('currentMan');
	})
// ******************************************** seccao dos stocks ***************************************************************************
$("#registar_stock_item").click(function(){
   $('#loading').fadeIn().delay(7000).fadeOut();
		var stock_item= new FormData();


		// let name = $("#name").val();
		let description_item = $("#description_item").val().trim().replace(/[/\s]/g, "_");
		let context = $("#context").val();
		let unit_sale = $("#unit_sale").val();
		let serialized_item = $("input[name='serialized_item']:checked").val();
		let cliente_stock = $("input[name='cliente_stock']:checked").val();
		if(cliente_stock=="sim")
			{let cliente = $("#cliente").val();
			stock_item.append("cliente", cliente);

			}
		let category = $("#category").val();
		let subcategory = $("#subcategory").val();
		let product_code = $("#mestsre").val();
		let lead_time = $("#lead_time").val();
		let part_number = $("#part_number").val();
		// let list_date_price  = $("#list_date_price").val();

		

		// stock_item.append("name", name);
		stock_item.append("description_item", description_item);
		stock_item.append("context", context);
		stock_item.append("unit_sale", unit_sale);
		stock_item.append("serialized_item", serialized_item);
		stock_item.append("cliente_stock", cliente_stock);
		
		stock_item.append("category", category);
		stock_item.append("subcategory", subcategory);
		stock_item.append("product_code", product_code);
		stock_item.append("lead_time", lead_time);
		stock_item.append("part_number", part_number);
		// stock_item.append("list_date_price",list_date_price);

		var xhr = new XMLHttpRequest();
		// Add any event handlers here...
		xhr.open('POST', "/stock_item/novo", true);
		xhr.send(stock_item);

		setTimeout(function(){window.location.href="/stock_item"}, 1000)





		})

// ***************************************scanner******************************

// ScanditSDK.configure("AV2e7gL8HAiwJ3BYBgopAUoYipFtFY1Mv2FB02Vbk13WXxdOxF3X9KlPeRt9AwQrxneo3gBqnVc0N1rPH3ZmyNRf00lOUikiV3h+8Z5l5HxrK3s5RyK3uskO+ReTgO0ICL8bBU2v/bbl/zOS+z84lSGB/5eJFwD22g2DaAEnEI2NHNS9XerTfas3kQGsuHKnrHngEhymKEVsHPs3x0EPdo+FGck7WKKE7rv6y6CFLI3iB2HyqsNOEfzLugDuKQjfFPN8HOxSDwkcrNEI3dVFt7Lp9zIn8/dW4jRfLuzt6O3UfyCd1rhQfTwz3qFDK4B0nzErzJiYbfk5f3LuQxIV44kOQBw+//ynVPikK8eaqSp3NR0wqFTvjDtXQOFlhEFpybSB75ysEJwbKFM+1NjC2mbW7TdQ8RnMkEk7eowQJ1rwEB4QC9sAfWOkjLlC7LdRgs4ypcLjjYB2GowBddHUOjHVjGBQD5O9xh0907DRNw2zSg+sqJMgW4h29ayvKT5M4oflegVvN0z49OOK6iumGbDa+7G2rg/ReAiJHkTs5UR7G/dCqmwXu6eXt9GjcKw3YU5hjomUjS0evSu9lqWSwS1UkmpzTMt99t1RDuwy/OZ0C+TGsp/f1EEdodiHt658nZDqDv4NVEuS6GaWH+Dqpx+tPuwbxqFd8SsNhIquAtci5wV0JXGqQOCV4BY5r0KYWtD52ntSA5fSwae/cloc3NauWbXsGVh/6DpFDeQMVZFND42cfDsANgN16UFbG7nwI3jsYqmx+Xqj7eZsP4OB9CKhkf6RfS+obyqc", {
//     engineLocation: "https://unpkg.com/scandit-sdk/build"
//     });

//     ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
//     playSoundOnScan: true,
//     vibrateOnScan: true
//     }).then(function(barcodePicker) {

//     var scanSettings = new ScanditSDK.ScanSettings({
//     enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
//     codeDuplicateFilter: 1000
//     });
//     barcodePicker.applyScanSettings(scanSettings);

//       barcodePicker.on("scan", function(scanResult) {
      
//       document.getElementById("mestsre").value=scanResult.barcodes.reduce(function(string, barcode) {
//       return string + ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
//       }, "")



//       });

//     // barcodePicker is ready here to be used (rest of the tutorial code should go here)
//     }); 
			
// *************************************end scanner****************************





		$("#registar_Po").click( async function(){

       $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data_user_new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a P.O?':'Do you realy want to save thid P.O?'))
    $('#yes_no_modal').openModal({dismissible:false});
     $("#no_btn_modal_").on( function(e){
        
    })
   
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();

      $('#loading').fadeIn().delay(7000).fadeOut();
			var requested_by = $("#requested_by").val();
			var supplier = $("#supplier").val();
			var deliver_shipping = $("#deliver_shipping").val();
			var supplier_contact = $("#supplier_contact").val();
			var address = $("#address").val();
			var supplier_code = $("#supplier_code").val();
			var payment_method = $("#payment_method").val();
			var terms = $("#terms").val();
			var department = $("#department").val();
			var subdepartment = $("#subdepartment").val();
			var quotation_number = $("#quotation_number").val();
      var for_store = $("#for_store").val();
      var for_store_ref=$("#for_store").find("option:selected").data("for_store_ref");
			var po_approver = $("#po_approver").val();
			var currency =$("input[name='currency']:checked").val();
			// var exchange_rate =$("#exchange_rate").val();
			var comment =$("#comment").val();
     

      






			var p_order= new FormData();


      var primeiro_ficheiro=$("#primeiro_ficheiro").get(0).files;
        if(primeiro_ficheiro.length!=0){
        for(let i = 0, j = primeiro_ficheiro.length; i<j;i++){
          p_order.append('primeiro_ficheiro', primeiro_ficheiro[i]);
        }
        }

         var segundo_ficheiro=$("#segundo_ficheiro").get(0).files;
        if(segundo_ficheiro.length!=0){
        for(let i = 0, j = segundo_ficheiro.length; i<j;i++){
          p_order.append('segundo_ficheiro', segundo_ficheiro[i]);
        }
        }


         var terceiro_ficheiro=$("#terceiro_ficheiro").get(0).files;
        if(terceiro_ficheiro.length!=0){
        for(let i = 0, j = terceiro_ficheiro.length; i<j;i++){
          p_order.append('terceiro_ficheiro', terceiro_ficheiro[i]);
        }
        }


      $("td.item_quantidade").each(function(){
        p_order.append("quantidades",$(this).text().trim());

      })


       $("td.item_preco").each(function(){
        p_order.append("item_preco",$(this).text().trim());

      })

        $("td.item_nome").each(function(){
        p_order.append("item_nome",$(this).text().trim());
        p_order.append("referencia", $(this).attr("data-referenciaa"))

      })

         $("td.total").each(function(){
        p_order.append("total",$(this).text().trim());

      })
          
      p_order.append("sub_total",$("td#subtotal").text());

      p_order.append("iva",$("td#iva_valor").text());

      p_order.append("total_a_pagar",$("td#total_a_pagar").text());

      p_order.append("valor_em_metical", $("td#metical_converted").text());
      p_order.append("valor_em_dolar", $("td#dolar_converted").text());
      p_order.append("valor_em_euro", $("td#euro_converted").text());
      p_order.append("valor_em_rand", $("td#rand_converted").text());


 


			p_order.append("requested_by",requested_by);
			p_order.append("supplier",supplier);
			p_order.append("deliver_shipping",deliver_shipping);
			p_order.append("supplier_contact",supplier_contact);
			p_order.append("address",address);
			p_order.append("supplier_code",supplier_code);
			p_order.append("payment_method",payment_method);
			p_order.append("terms",terms);
			p_order.append("department",department);
			p_order.append("subdepartment",subdepartment);
			p_order.append("quotation_number",quotation_number);
      p_order.append("for_store",for_store);
      p_order.append("for_store_ref",for_store_ref);
			p_order.append("po_approver",po_approver);
			p_order.append("currency",currency);
			// p_order.append("exchange_rate",exchange_rate);
			p_order.append("comment",comment);

			var xhr = new XMLHttpRequest();
					// Add any event handlers here...
					xhr.open('POST', "/purchase_order/novo", true);
					xhr.send(p_order);

					setTimeout(function(){window.location.href="/purchase_order"}, 2500)

		})
  })

$("#registar_Po_editado").click( async function(){

       $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data_user_new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente gravar a P.O?':'Do you realy want to save thid P.O?'))
    $('#yes_no_modal').openModal({dismissible:false});
     $("#no_btn_modal_").on( function(e){
        
    })
   
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();

      $('#loading').fadeIn().delay(7000).fadeOut();
      var requested_by = $("#requested_by").val();
      var supplier = $("#supplier").val();
      var deliver_shipping = $("#deliver_shipping").val();
      var supplier_contact = $("#supplier_contact").val();
      var address = $("#address").val();
      var supplier_code = $("#supplier_code").val();
      var payment_method = $("#payment_method").val();
      var terms = $("#terms").val();
      var department = $("#department").val();
      var subdepartment = $("#subdepartment").val();
      var quotation_number = $("#quotation_number").val();
      var for_store = $("#for_store").val();
      var po_approver = $("#po_approver").val();
      var currency =$("input[name='currency']:checked").val();
      // var exchange_rate =$("#exchange_rate").val();
      var comment =$("#comment").val();
      var ide=$("#requested_by").attr("data-new-sr");  
     

      






      var p_order= new FormData();


      var primeiro_ficheiro=$("#primeiro_ficheiro").get(0).files;
        if(primeiro_ficheiro.length!=0){
        for(let i = 0, j = primeiro_ficheiro.length; i<j;i++){
          p_order.append('primeiro_ficheiro', primeiro_ficheiro[i]);
        }
        }

         var segundo_ficheiro=$("#segundo_ficheiro").get(0).files;
        if(segundo_ficheiro.length!=0){
        for(let i = 0, j = segundo_ficheiro.length; i<j;i++){
          p_order.append('segundo_ficheiro', segundo_ficheiro[i]);
        }
        }


         var terceiro_ficheiro=$("#terceiro_ficheiro").get(0).files;
        if(terceiro_ficheiro.length!=0){
        for(let i = 0, j = terceiro_ficheiro.length; i<j;i++){
          p_order.append('terceiro_ficheiro', terceiro_ficheiro[i]);
        }
        }


      $("td.item_quantidade").each(function(){
        p_order.append("quantidades",$(this).text().trim());

      })


       $("td.item_preco").each(function(){
        p_order.append("item_preco",$(this).text().trim());

      })

        $("td.item_nome").each(function(){
        p_order.append("item_nome",$(this).text().trim());

      })

         $("td.total").each(function(){
        p_order.append("total",$(this).text().trim());

      })
          
      p_order.append("sub_total",$("td#subtotal").text().trim());

      p_order.append("iva",$("td#iva_valor").text());

      p_order.append("total_a_pagar",$("td#total_a_pagar").text());

      p_order.append("valor_em_metical", $("td#metical_converted").text());
      p_order.append("valor_em_dolar", $("td#dolar_converted").text());
      p_order.append("valor_em_euro", $("td#euro_converted").text());
      p_order.append("valor_em_rand", $("td#rand_converted").text());


 


      p_order.append("requested_by",requested_by);
      p_order.append("idee",ide);
      p_order.append("supplier",supplier);
      p_order.append("deliver_shipping",deliver_shipping);
      p_order.append("supplier_contact",supplier_contact);
      p_order.append("address",address);
      p_order.append("supplier_code",supplier_code);
      p_order.append("payment_method",payment_method);
      p_order.append("terms",terms);
      p_order.append("department",department);
      p_order.append("subdepartment",subdepartment);
      p_order.append("quotation_number",quotation_number);
      p_order.append("for_store",for_store);
      p_order.append("po_approver",po_approver);
      p_order.append("currency",currency);
      // p_order.append("exchange_rate",exchange_rate);
      p_order.append("comment",comment);

      var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST', "/purchase_order/po_editado", true);
          xhr.send(p_order);

          setTimeout(function(){window.location.href="/purchase_order"}, 2500)

    })
  })

    $("#emprogresso").click(function(){
        window.location.href="/purchase_order/emprogresso"
      })

     $("#aprovados").click(function(){
        window.location.href="/purchase_order/aprovados"
      })

    $("#finalizados").click(function(){
        window.location.href="/purchase_order/finalizados"
      })

     $("#reprovados").click(function(){
        window.location.href="/purchase_order/reprovados"
      })


     

$("#registar_StRequest").click(function(){

  if(validar()){

  $('#loading').fadeIn().delay(7000).fadeOut();
		var requested_by = $("#requested_by").val();
		// var company = $("#company").val();
		var request_from = $("#request_from").val();
		var department = $("#department").val();
		var Date_required = $("#Date_required").val();
		// var quote_BS_number = $("#quote_BS_number").val();
		var reason = $("#reason").val();
		var book_out_to_store = $("#book_out_to_store").val();
    var responsaveis = $("#responsaveis").val();
    var responsaveis_armazem = JSON.parse($("#chefe_departamento").attr("chefdos"));
    


    var stock_request_form= new FormData();

    responsaveis_armazem.forEach(function(item){
      stock_request_form.append("responsaveis_arrmazem", item);
    });

    $("td.item_quantidade").each(function(){
        stock_request_form.append("quantidades",$(this).text());

      })
    
    $("td.item_nome").each(function(){
        stock_request_form.append("item_nome",$(this).text().trim());

      })

      stock_request_form.append("requested_by",requested_by);
      stock_request_form.append("chefe_departamento",$("#chefe_departamento").val());
			// stock_request_form.append("company",company);
			stock_request_form.append("request_from",request_from);
			stock_request_form.append("department",department);
			stock_request_form.append("Date_required",Date_required);
			// stock_request_form.append("quote_BS_number",quote_BS_number);
			stock_request_form.append("reason",reason);
			stock_request_form.append("book_out_to_store",book_out_to_store);
      stock_request_form.append("responsaveis",responsaveis);

			var xhr = new XMLHttpRequest();
					// Add any event handlers here...
					xhr.open('POST', "/Stock_request/novo", true);
					xhr.send(stock_request_form);

					setTimeout(function(){window.location.href="/Stock_request/home"}, 1500)
        }

	})


$("#registar_StRequest_editado").click(function(){
  $('#loading').fadeIn().delay(7000).fadeOut();
    var requested_by = $("#requested_by").val();
    // var company = $("#company").val();
    var request_from = $("#request_from").val();
    var department = $("#department").val();
    var Date_required = $("#Date_required").val();
    // var quote_BS_number = $("#quote_BS_number").val();
    var reason = $("#reason").val();
    var book_out_to_store = $("#book_out_to_store").val();
    var responsaveis = $("#responsaveis").val();




    var stock_request_form= new FormData();

    $("td.item_quantidade").each(function(){
        stock_request_form.append("quantidades",$(this).text());

      })


    var caminho_totall =$("#responsaveis").attr("canal");
    var caminho_totalll = "/Stock_request/editado_stRequest/" + caminho_totall;
    
    $("td.item_nome").each(function(){
        stock_request_form.append("item_nome",$(this).text().trim());

      })

      stock_request_form.append("requested_by",requested_by);
      // stock_request_form.append("company",company);
      stock_request_form.append("request_from",request_from);
      stock_request_form.append("department",department);
      stock_request_form.append("Date_required",Date_required);
      // stock_request_form.append("quote_BS_number",quote_BS_number);
      stock_request_form.append("reason",reason);
      stock_request_form.append("book_out_to_store",book_out_to_store);
      stock_request_form.append("responsaveis",responsaveis);

      var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST',caminho_totalll , true);
          xhr.send(stock_request_form);

          setTimeout(function(){window.location.href="/Stock_request/home"}, 1500)

  })



		$("#registar_armazem").click(function(){
      $('#loading').fadeIn().delay(7000).fadeOut();
					var nome =$("#nome").val();
					var provincia =$("#provincia").val();
					var regiao =$("#regiao").val();
					var endereco =$("#endereco").val();
					var responsavel;

					var prp = $("#myTable_responsaveis tr td").text().replace(/delete_forever/g, ",");
					 responsavel = prp.split(",");
					 responsavel.pop();
           // responsavel=respnsavel.map(s=> s.trim());


					// $(".responsavel").each(function(){responsavel.push($(this).val())});


					var pessoas_permitidas;
					var pp=$("#myTable_tecnicos_permitidos tr td").text().replace(/delete_forever/g, ",");
					pessoas_permitidas=pp.split(",")
					pessoas_permitidas.pop();
            // pessoas_permitidas=pessoas_permitidas.map(s=> s.trim());
					// $(".pessoas_permitidas").each(function(){pessoas_permitidas.push($(this).val())});


					var armazemm=new FormData();

					armazemm.append("nome",nome);
					armazemm.append("provincia",provincia);
					armazemm.append("regiao",regiao);
					armazemm.append("endereco",endereco);

					for(let y=0;y<responsavel.length; y++){
						armazemm.append("responsavel", responsavel[y]);
					}

					for(let x=0; x<pessoas_permitidas.length; x++){
						armazemm.append("pessoas_permitidas", pessoas_permitidas[x]);
					}

					var xhr = new XMLHttpRequest();
					// Add any event handlers here...
					xhr.open('POST', "/armazem/novo", true);
					xhr.send(armazemm);

					setTimeout(function(){window.location.href="/armazem/central"}, 1000)



			})

    $("#editar_armazem").click(function(){
      $('#loading').fadeIn().delay(7000).fadeOut();
          var vallor=$(this).attr("valor");
          var nome =$("#nome").val();
          var provincia =$("#provincia").val();
          var regiao =$("#regiao").val();
          var endereco =$("#endereco").val();
          var responsavel;

          var prp = $("#myTable_responsaveis tr td").text().replace(/delete_forever/g, ",");
           responsavel = prp.split(",");
           responsavel.pop();
           responsavel=responsavel.map(s=> s.trim());

          // $(".responsavel").each(function(){responsavel.push($(this).val())});


          var pessoas_permitidas;
          var pp=$("#myTable_tecnicos_permitidos tr td").text().replace(/delete_forever/g, ",");
          pessoas_permitidas=pp.split(",")
          pessoas_permitidas.pop();
          pessoas_permitidas=pessoas_permitidas.map(s=> s.trim());
          // $(".pessoas_permitidas").each(function(){pessoas_permitidas.push($(this).val())});


          var armazemm=new FormData();

          armazemm.append("nome",nome);
          armazemm.append("provincia",provincia);
          armazemm.append("regiao",regiao);
          armazemm.append("endereco",endereco);
          armazemm.append("novo", vallor);

          for(let y=0;y<responsavel.length; y++){
            armazemm.append("responsavel", responsavel[y]);
          }

          for(let x=0; x<pessoas_permitidas.length; x++){
            armazemm.append("pessoas_permitidas", pessoas_permitidas[x]);
          }

          var xhr = new XMLHttpRequest();
          // Add any event handlers here...
          xhr.open('POST', "/armazem/editar09", true);
          xhr.send(armazemm);

          setTimeout(function(){window.location.href="/stock_request/home"}, 1500)



      })


	$("#stock_request_home").click(function(){
		window.location.href="/stock_request/home"
	})

  $(".quantyy").on("focus", function(){
    $(this).val("");
  });

   $(".quantyy").on("keyup", function (e) {
        var $field = $(this),
            val=this.value,
            $thisIndex=parseInt($field.data("idx"),10); 
        if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid") ) {
            this.value = inputQuantity[$thisIndex];
            return;
        } 
        if (val.length > Number($field.attr("maxlength"))) {
          val=val.slice(0, 5);
          $field.val(val);
        }
        inputQuantity[$thisIndex]=val;
      }); 



  $("#cancelar_Po").click(function(){
    window.history.back();
  })
  

	$("#my_stock_home").click(function(){
			window.location.href="/armazem/mystock"
		})

	$("#stock_history_home").click(function(){
		window.location.href="#"
	})

	$(".add-field1").click(function(){
		let resp=$(".responsavel").val();
    if(resp!=null)
		$("#myTable_responsaveis").append("<tr><td>"+resp+"</td><td class='material-icons pointer  delete_responsavel'>delete_forever</td></tr>");
	})

	$("#myTable_responsaveis").on("click", ".delete_responsavel", function(){
		console.log("cheguei no delete");
		$(this).closest("tr").remove();

	})

$(".add-field2").click(function(){
		let tecnico_re=$(".pessoas_permitidas").val();
    if(tecnico_re!=null)
		$("#myTable_tecnicos_permitidos").append("<tr><td>"+tecnico_re+"</td><td class='material-icons pointer  delete_tecnico_permitido'>delete_forever</td></tr>");
	})

	$("#myTable_tecnicos_permitidos").on("click", ".delete_tecnico_permitido", function(){
		$(this).closest("tr").remove();

	})

$(".add-field3").click(function(){

  var moeda_selecionadda=$("input[name='currency']:checked").val();

    if(moeda_selecionadda=="MZN")
        var libra="MZN ";
    if(moeda_selecionadda=="EURO")
        var libra="€ ";
    if(moeda_selecionadda=="USD")
        var libra="$ ";
    if(moeda_selecionadda=="ZAR")
        var libra="R ";

    let tecnico_re=$(".pessoas_permitidas").val();
    let referenciass=$(".pessoas_permitidas").find("option:selected").data("referencia");
		let preco_unit= $(".preco_item").val();
		let quant_item= $(".quant_item").val();
		var soma=0;

    if((moeda_selecionadda!=undefined ) && (tecnico_re!=null ) && (preco_unit!='' ) && (preco_unit!=undefined) && (quant_item!='')){
		$("#myTable_tecnicos_permitidos").append("<tr><td class='item_nome', data-referenciaa='"+referenciass+"'>"+tecnico_re+"</td><td class='item_preco'>"+libra+parseFloat(preco_unit).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+"</td><td class='item_quantidade'>"+parseFloat(quant_item).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+"</td><td class='total'>"+libra+parseFloat(quant_item*preco_unit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+"</td><td class='material-icons pointer  delete_po'>delete_forever</td></tr>");
		
		$("td.total").each(function(){
			soma+=parseFloat($(this).text().replace(/[,R€MZN\s]/g, "").replace("$", ""));
      console.log(soma)
		});

		$("td#subtotal").text(libra+parseFloat(soma).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
		let iva=moeda_selecionadda=="MZN"? parseFloat(soma*0.17).toFixed(2): parseFloat(soma*0.00).toFixed(2);
		$("td#iva_valor").text(libra+iva.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
		var a_pagar=parseFloat(soma)+parseFloat(iva);
		$("td#total_a_pagar").text(libra+parseFloat(a_pagar).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
		console.log(soma);

    actualizacao_cambio();


		$(".pessoas_permitidas").val('');
		 $(".preco_item").val('');
		$(".quant_item").val('');
    }
	 
   })

//*******************
$(".add-field4").click(function(){



    let tecnico_re=$(".pessoas_permitidas").val();
    // let preco_unit= $(".preco_item").val();
    let quant_item= $(".quant_item").val();
    var soma=0;
    if(tecnico_re!=null && quant_item!="")
    $("#myTable_tecnicos_permitidos").append("<tr><td class='item_nome'>"+tecnico_re+"</td><td class='item_quantidade'>"+parseFloat(quant_item).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+"</td><td class='material-icons pointer  delete_po'>delete_forever</td></tr>");
    
    $(".pessoas_permitidas").val('');
     $(".preco_item").val('');
    $(".quant_item").val('');
  })


//*******************

  

	$("#myTable_tecnicos_permitidos").on("click change", ".delete_po", function(){

    var moeda_selecionadda=$("input[name='currency']:checked").val();

    if(moeda_selecionadda=="MZN")
        var libra="MZN ";
    if(moeda_selecionadda=="EURO")
        var libra="€ ";
    if(moeda_selecionadda=="USD")
        var libra="$ ";
    if(moeda_selecionadda=="ZAR")
        var libra="R ";

		$(this).closest("tr").remove();
		var soma=0;
		$("td.total").each(function(){
			soma+=parseFloat($(this).text().replace(/[,R€MZN\s]/g, "").replace("$", ""));

		});

		


		
    $("td#subtotal").text(libra+parseFloat(soma).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    let iva=moeda_selecionadda=="MZN"? parseFloat(soma*0.17).toFixed(2): parseFloat(soma*0.00).toFixed(2);
    $("td#iva_valor").text(libra+iva.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    var a_pagar=parseFloat(soma)+parseFloat(iva);
    $("td#total_a_pagar").text(libra+parseFloat(a_pagar).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    console.log(soma);
    actualizacao_cambio();

		


		$(".pessoas_permitidas").val('');
		 $(".preco_item").val('');
		$(".quant_item").val('');

	})


$("#registar_cambio").click(function(){
var metical_euro = $("#metical_euro").val();
var metical_dolar = $("#metical_dolar").val();
var metical_rand = $("#metical_rand").val();

var cambio_obj= new FormData();

cambio_obj.append("metical_euro", metical_euro);
cambio_obj.append("metical_dolar", metical_dolar);
cambio_obj.append("metical_rand", metical_rand);

var xhr = new XMLHttpRequest();
					// Add any event handlers here...
xhr.open('POST', "/purchase_order/cambio/novo", true);
xhr.send(cambio_obj);

setTimeout(function(){window.location.href="/purchase_order/cambio"}, 1000)

})


$("#cancelar_cambio").click(function(){
		window.location.href="/purchase_order/cambio"
	})

$("#supplier").change(function(){
  let fornecedores=JSON.parse($("#requested_by").attr("data-sete"));
  

let supl=$("#supplier").val();
let makhap1 = fornecedores.findIndex(x => x.cliente_nome ==supl);
$("#supplier_contact").val(fornecedores[makhap1].cliente_telefone);
$("#address").val(fornecedores[makhap1].cliente_endfisico);
$("#terms").val(fornecedores[makhap1].cliente_termos);
$("#supplier_code").val(fornecedores[makhap1].fornecedor_cod);

})


$("#request_from").change(function(){
  let fornecedores=JSON.parse($("#responsaveis").attr("daddos"));
  // let outros_ =stringify(fornecedores);

let supl=$("#request_from").val();
let makhap1 = fornecedores.findIndex(x => x.nome ==supl);
$("#responsaveis").val(fornecedores[makhap1].responsavel[0]);
let outros_ =JSON.stringify(fornecedores[makhap1].responsavel);
$("#chefe_departamento").attr("chefdos", outros_);


})

$("#department").change(async function(){
  let depart= JSON.parse($("#department").attr("dados_depart"));
  let indicce = await depart.indexOf($("#department").val());

  let chefss=JSON.parse($("#chefe_departamento").attr("chefes_depart"));


  $("#chefe_departamento").val(chefss[indicce]);
  // let outros_ =stringify(fornecedores);




})


      $("#primeiro_fichero").click(function(){
          let fitchero=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/purchase_order/download_fichero', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({fitchero}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } 
                else 
                {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;
                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };


          // setTimeout(function(){
          // window.location.href="/relatorio"}, 3500)

        })

      $("#comprovativo_ficheiro").click(function(){
          let fitchero=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/purchase_order/download_fichero', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({fitchero}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'comprovativo.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } 
                else 
                {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;
                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };


          // setTimeout(function(){
          // window.location.href="/relatorio"}, 3500)

        })

            $("#segundo_fichero").click(function(){
          let fitchero=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/purchase_order/download_fichero', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({fitchero}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };


          // setTimeout(function(){
          // window.location.href="/relatorio"}, 3500)

        })

            $("#terceiro_fichero").click(function(){
          let fitchero=$(this).attr("valor");
          
               var req = new XMLHttpRequest();
          req.open('POST', '/purchase_order/download_fichero', true); // Open an async AJAX request.
          req.setRequestHeader('Content-Type', 'application/json'); // Send JSON due to the {test: "test"} in question
          req.responseType = 'blob'; // Define the expected data as blob
           req.send(JSON.stringify({fitchero}));
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200) { // When data is received successfully
                var data = req.response;
                var defaultFilename = 'ficheiro.pdf';
                // Or, you can get filename sent from backend through req.getResponseHeader('Content-Disposition')
                if (typeof window.navigator.msSaveBlob === 'function') {
                  // If it is IE that support download blob directly.
                  window.navigator.msSaveBlob(data, defaultFilename);
                } else {
                  var blob = data;
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = defaultFilename;

                  document.body.appendChild(link);

                  link.click(); // create an <a> element and simulate the click operation.
                }
              }
            }
          };


          // setTimeout(function(){
          // window.location.href="/relatorio"}, 3500)

        })

      $('.aprovar_po').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente aprovar esta P.O ?':'Do you realy want to Aprouv this P.O?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $("#no_btn_modal_").click(function(){

      window.location.href="/purchase_order/emprogresso"
    })
    $('#yes_btn_modal').click(function(e){

      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      $.post("/purchase_order/aprovar", {novo:novo}, function(data){
        // window.location.href="/transferencia"
        // setTimeout(function(){
        //   window.location.href="/purchase_order";
        // }, 1500)

      })

       setTimeout(function(){
          window.location.href="/purchase_order";
        }, 1500)
      //window.location.href="/transferencia/remove/"+novo;
    })
  })

        $('.aprovar_stock_request').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente aprovar este stock request ?':'Do you realy want to Aprouv this Stock request?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      $.post("/stock_request/aprovar", {novo:novo}, function(data){
        // window.location.href="/transferencia"
        // setTimeout(function(){
        //   window.location.href="/purchase_order";
        // }, 1500)

      })

       setTimeout(function(){
          window.location.href="/stock_request/home";
        }, 1500)
      //window.location.href="/transferencia/remove/"+novo;
    })
  })

  $('.editar_stock_request').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente editar stock request ?':'Do you realy want to edit this Stock request?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();

      var url_edtstock= "/stock_request/editar_request/"+novo;
      window.location.href= url_edtstock;

      
      
    })
  })

  $('.editar_purchase_order').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente editar a PO ?':'Do you realy want to edit this PO?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();

      var url_edtstock= "/purchase_order/editar_requestedPoo/"+novo;
      window.location.href= url_edtstock;

      
      
    })
  })

  $('.returnStock').click(function(){
    $('#yes_no_title_modal_return_stock').html((($(".lang-picker").attr("value")=="pt")?'Razoes do retorno de stock request':'Reasons'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal_return_stock').html('<div class="input-field col s12"> <input id="stock_return" type="text"><label for="email">Razoes</label></div>')
    $('#yes_no_modal_return_stock').openModal({dismissible:false});
    $('#yes_btn_modal_return_stock').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var razoes_return = $("#stock_return").val();
      $.post("/stock_request/retornar_stock", {novo:novo, razoes_return:razoes_return}, function(data){
        // window.location.href="/transferencia"
        // setTimeout(function(){
        //   window.location.href="/purchase_order";
        // }, 1500)

      })

      

       setTimeout(function(){
          window.location.href="/stock_request/home";
        }, 1500)
      //window.location.href="/transferencia/remove/"+novo;
    })
  })


$('.returnPoo').click(function(){
    $('#yes_no_title_modal_return_stock').html((($(".lang-picker").attr("value")=="pt")?'Razoes do retorno de stock request':'Reasons'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal_return_stock').html('<div class="input-field col s12"> <input id="stock_return" type="text"><label for="email">Razoes</label></div>')
    $('#yes_no_modal_return_stock').openModal({dismissible:false});
    $('#yes_btn_modal_return_stock').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var razoes_return = $("#stock_return").val();
      $.post("/purchase_order/retornar_poo", {novo:novo, razoes_return:razoes_return}, function(data){
        // window.location.href="/transferencia"
        // setTimeout(function(){
        //   window.location.href="/purchase_order";
        // }, 1500)

      })

      

       setTimeout(function(){
          window.location.href="/purchase_order";
        }, 1500)
      //window.location.href="/transferencia/remove/"+novo;
    })
  })


$('.reprovar_stock_request').click(function(){
    $('#yes_no_title_modal_return_stock').html((($(".lang-picker").attr("value")=="pt")?'Razoes da Reprovacao do stock':'Decline Reasons'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal_return_stock').html('<div class="input-field col s12"> <input id="stock_return" type="text"><label for="email">Razoes</label></div>')
    $('#yes_no_modal_return_stock').openModal({dismissible:false});
    $('#yes_btn_modal_return_stock').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var razoes_return = $("#stock_return").val();
      $.post("/stock_request/reprovar", {novo:novo, razoes_return:razoes_return}, function(data){
        

      })

      

       setTimeout(function(){
          window.location.href="/stock_request/home";
        }, 1500)
      
    })
  })

  // $('.reprovar_po').click(function(){
  //   $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
  //   var mestre= $(this).attr("data-user-id");
  //   var novo=$(this).attr("data-user-new")
  //   console.log(novo)
  //    $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente reprovar esta P.O ?':'Do you realy want to decline this P.O?'))
  //   $('#yes_no_modal').openModal({dismissible:false});
  //   $("#no_btn_modal_").click(function(){
  //     window.location.href="/purchase_order/emprogresso"
  //   })
  //   $('#yes_btn_modal').click(function(){
  //     $('#loading').fadeIn().delay(7000).fadeOut();
  //      window.location.href="/purchase_order/reprovar/"+novo

      
  //   })
  // })

  $('.reprovar_po').click(function(){
    $('#yes_no_title_modal_return_stock').html((($(".lang-picker").attr("value")=="pt")?'Razoes da Reprovacao da P.O':'Decline Reasons'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal_return_stock').html('<div class="input-field col s12"> <input id="stock_return" type="text"><label for="stock_return">Razoes</label></div>')
    $('#yes_no_modal_return_stock').openModal({dismissible:false});
    $('#yes_btn_modal_return_stock').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var razoes_return = $("#stock_return").val();
      $.post("/purchase_order/reprovar", {novo:novo, razoes_return:razoes_return}, function(data){
        

      })

      

       setTimeout(function(){
          window.location.href="/purchase_order";
        }, 1500)
      
    })
  })

   $('.cancelarr_po').click(function(){
    $('#yes_no_title_modal_return_stock').html((($(".lang-picker").attr("value")=="pt")?'Razoes do cancelamento da P.O':'Decline Reasons'))
    var mestre= $(this).attr("data-user-id");
    var novo=$(this).attr("data-user-new");
    console.log(novo)
     $('#yes_no_content_modal_return_stock').html('<div class="input-field col s12"> <input id="stock_return" type="text"><label for="stock_return">Razoes</label></div>')
    $('#yes_no_modal_return_stock').openModal({dismissible:false});
    $('#yes_btn_modal_return_stock').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var razoes_return = $("#stock_return").val();
      $.post("/purchase_order/reprovar", {novo:novo, razoes_return:razoes_return}, function(data){
        

      })

      

       setTimeout(function(){
          window.location.href="/purchase_order";
        }, 1500)
      
    })
  })



  //  $('.reprovar_stock_request').click(function(){
  //   $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
  //   var mestre= $(this).attr("data-user-id");
  //   var novo=$(this).attr("data-user-new")
  //   console.log(novo)
  //    $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente reprovar este stock request ?':'Do you realy want to decline this Stock request?'))
  //   $('#yes_no_modal').openModal({dismissible:false});
  //   $('#yes_btn_modal').click(function(){
  //     $('#loading').fadeIn().delay(7000).fadeOut();
  //      window.location.href="/stock_request/reprovar/"+novo

  //     // $.post("/purchase_order/reprovar", {novo:novo}, function(data){
  //     //   // window.location.href="/transferencia"
  //     //   // setTimeout(function(){
  //     //   //   window.location.href="/transferencia";
  //     //   // }, 4000)

  //     // })
  //     //window.location.href="/transferencia/remove/"+novo;
  //   })
  // })




   $('#registar_StRequest_reprovar').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    var mestre= $(this).attr("data-user-id");
    let razoes_reprov=$("#decline_reasons").val();
    var novo=$("#Date_required").attr("data-eight")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente reprovar o stock request ?':'Do you realy want to decline this stock request?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
    $('#loading').fadeIn().delay(7000).fadeOut();
       

      $.post("/stock_request/reprovar", {novo:novo, razoes_reprov:razoes_reprov}, function(data){
        // window.location.href="/transferencia"
        setTimeout(function(){
          window.location.href="/transferencia";
        }, 2500)

      })
      //window.location.href="/transferencia/remove/"+novo;
    })
  })



$('#reprovar_po1').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message'))
    var mestre= $(this).attr("data-user-id");
    let razoes_reprov=$("#razoes").val();
    var novo=$("#requested_by").attr("data-sete")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente reprovar esta P.O ?':'Do you realy want to decline this P.O?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $("#no_btn_modal_").click(function(){
      window.location.href="/purchase_order/emprogresso"
    })
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();

      $.post("/purchase_order/reprovar", {novo:novo, razoes_reprov:razoes_reprov}, function(data){
        // window.location.href="/transferencia"
        setTimeout(function(){
          window.location.href="/purchase_order/reprovados";
        }, 2500)

      })
      //window.location.href="/transferencia/remove/"+novo;
    })
  })



$('#receber_stock').click(function(e){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data_user_new")
    var locaal=$(this).attr("local")
    console.log(novo)
    e.preventDefault();
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente Fazer a entrega do stock?':'Do you realy want to deliver stock?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e1){
      e1.stopPropagation();
      e1.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      e1.preventDefault();
      var stock_recebidoo=new FormData();
      stock_recebidoo.append("novo", novo);
      stock_recebidoo.append("locaal", locaal);
      $(".quantyy").each(function(i){
        var receivedd=$(this).val();
        if(receivedd!='')
         stock_recebidoo.append("received", receivedd);
    })

  $(".decricao").each(function(){
          var decricao=$(this).val();
          stock_recebidoo.append("decricao", decricao);

    })

      
      var xhr=new XMLHttpRequest();
      xhr.open("POST", "/stock_request/receber_productos", true)
      xhr.send(stock_recebidoo);
      setTimeout(function(){
                  window.location.href="/stock_request/home";
                }, 2500)



      // $.post("/stock_request/receber_productos", {novo:novo}, function(data){
      //   // window.location.href="/transferencia"
      //   setTimeout(function(){
      //     window.location.href="/purchase_order";
      //   }, 1500)

      // })
      //window.location.href="/transferencia/remove/"+novo;
    })
  })

$('#delivery').click(function(){
  if(validar()){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data_user_new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente Fazer a entrega do stock?':'Do you realy want to deliver stock?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var stock_recebido=new FormData();
      stock_recebido.append("novo", novo);

  $(".decricao").each(function(){
          var decricao=$(this).val();
          stock_recebido.append("decricao", decricao);

    })

      $(".quantyy").each(function(){
        var received=$(this).val();
        if(received!='')
        stock_recebido.append("received", received);

    })
      var xhr=new XMLHttpRequest();
      xhr.open("POST", "/stock_request/delivery", true)
      xhr.send(stock_recebido);
      setTimeout(function(){
                  window.location.href="/stock_request/home";
                }, 1500)



      // $.post("/stock_request/receber_productos", {novo:novo}, function(data){
      //   // window.location.href="/transferencia"
      //   setTimeout(function(){
      //     window.location.href="/purchase_order";
      //   }, 1500)

      // })
      //window.location.href="/transferencia/remove/"+novo;
    })
  }}
  )

$('#receber_stock_po').click(function(){
  if(validar()){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data_user_new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente o stock da P.O?':'Do you realy want to receive stock?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var stock_recebido=new FormData();
      stock_recebido.append("novo", novo);

      var comprovativo=$("#comprovativo").get(0).files;
        if(comprovativo.length!=0){
        for(let i = 0, j = comprovativo.length; i<j;i++){
          stock_recebido.append('comprovativo', comprovativo[i]);
        }
        }

  $(".decricao").each(function(){
          var decricao =$(this).val();
          stock_recebido.append("decricao", decricao);
          stock_recebido.append( "referencia",$(this).attr("referencia"));
          stock_recebido.append( "price",$(this).attr("prrice"));

    })

      $(".quantyy").each(function(){
        var received=$(this).val();
        if(received!='')
        stock_recebido.append("received", received);

    })
      var xhr=new XMLHttpRequest();
      xhr.open("POST", "/purchase_order/receber_productos", true)
      xhr.send(stock_recebido);
      setTimeout(function(){
                  window.location.href="/purchase_order";
                }, 2500)



      // $.post("/stock_request/receber_productos", {novo:novo}, function(data){
      //   // window.location.href="/transferencia"
      //   setTimeout(function(){
      //     window.location.href="/purchase_order";
      //   }, 1500)

      // })
      //window.location.href="/transferencia/remove/"+novo;
    })
  }})


$('.delivery').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data-user-new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente confirmar a recepcao do stock ?':'Do you realy confirm receipt stock?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();
      var lin_url="/stock_request/delivery"
       

      $.post(lin_url, {novo:novo}, function(data){
        // window.location.href="/transferencia"
        setTimeout(function(){
          window.location.href="/purchase_order";
        }, 3000)

      })
      //window.location.href="/transferencia/remove/"+novo;
    })
  })


$('#receber_encomenda_po').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data-user-new")
    console.log(novo)
     $('#yes_no_content_modal').html((($(".lang-picker").attr("value")=="pt")?'Deseja realmente receber encomenda desta P.O ?':'Do you realy want to receive gods of this P.O?'))
    $('#yes_no_modal').openModal({dismissible:false});
    $('#yes_btn_modal').click(function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      $('#loading').fadeIn().delay(7000).fadeOut();

       

      $.post("/purchase_order/receber_productos", {novo:novo}, function(data){
        // window.location.href="/transferencia"
        setTimeout(function(){
          window.location.href="/purchase_order";
        }, 1500)

      })
      //window.location.href="/transferencia/remove/"+novo;
    })
  })

$('.stock_history').click(function(){
    $('#yes_no_title_modal').html((($(".lang-picker").attr("value")=="pt")?'Messagem do Sistema':'System Message')) 
    var novo=$(this).attr("data-new1");
    var novo1=$(this).attr("data-new11");
    console.log(novo)
    $('#loading').fadeIn().delay(7000).fadeOut();
      $.post("/stock_request/history", {novo:novo, novo1:novo1}, function(data){
        // window.location.href="/transferencia"
        

      })
      //window.location.href="/transferencia/remove/"+novo;
    
  })

$("#my_stock_request").click(function(){
  window.location.href="/stock_request/stock_pessoal";
})

$("#armazzens").click(function(){
  window.location.href="/armazem/central";
})

$("#stock_request_expediente").click(function(){
  window.location.href="/stock_request/expedientes";
})
   
  $("#stocks_aprovado").click(function(){
  window.location.href="/stock_request/aprovados";
})


 $("#stocks_reprovado").click(function(){
  window.location.href="/stock_request/reprovados";
})

$("#stocks_finalizadoss").click(function(){
  window.location.href="/stock_request/finalizados";
})


$("#stock_request_tecnicos").click(function(){
  window.location.href="/stock_request/tecnicos";
})

 //   var i=1;
 //    $("#add_row").click(function(){b=i-1;
 //      	$('#addr'+i).html($('#addr'+b).html()).find('td:first-child').html(i+1);
 //      	$('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
 //      	i++; 
 //  	});
 //    $("#delete_row").click(function(){
 //    	if(i>1){
	// 	$("#addr"+(i-1)).html('');
	// 	i--;
	// 	}
	// 	calc();
	// });
	
	// $('#tab_logic tbody').on('keyup change',function(){
	// 	calc();
	// });

	// $('#tax').on('keyup change',function(){
	// 	calc_total();
	// });
	


// ******************************************** Fim seccao do stocks ************************************************************************
// **************************************************gina****************************************************


$('#jobcard_quantityuse').on("keyup", function(){

        $("#jobcard_remaining").val("");
        $("#jobcard_remaining").siblings('label').removeClass('active');

        var jobcard_remaining = parseInt($("#jobcard_quantityhave").val()) - parseInt($("#jobcard_quantityuse").val());

        $("#jobcard_remaining").val(jobcard_remaining);
          $("#jobcard_remaining").siblings('label').addClass('active');

     });
// *************************************************end gina*************************************************

// ******************************************************************


	$('.datepicker').pickadate({
		monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
		weekdaysFull:["Domingo","Segunda","Terca","Quarta","Quinta","Sexta","Sabado"],
		weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],
		weekdaysLetter:["D","S","T","Q","Q","S","S"],
		today:"Hoje",
		clear:"Apagar",
		close:"Fechar",
		format: 'dd/mm/yyyy',
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 50, // Creates a dropdown of 15 years to control year
		monthsFull: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]
	});

  
});

$(document).on('click', '.hide-on-large-only a', function(){
	setTimeout(function(){$('.drag-target').click();}, 200);
});
$(document).on('click', 'openbtn', function(){
$(this).hide();
});

function actualizacao_cambio(){

  let cambio = JSON.parse($("#requested_by").attr("data-oito"));
  let cambio_actual=cambio[cambio.length-1];
  let moeda_selecionada=$("input[name='currency']:checked").val();
  let total_a_pay= parseFloat($("td#total_a_pagar").text().replace(/[,R€$MZN\s]/g, ""));
  if(moeda_selecionada=="MZN")
    {
      $("td#metical_converted").text(parseFloat(total_a_pay).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#dolar_converted").text(parseFloat(total_a_pay/cambio_actual.metical_dolar).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#euro_converted").text(parseFloat(total_a_pay/cambio_actual.metical_euro).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#rand_converted").text(parseFloat(total_a_pay/cambio_actual.metical_rand).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    
    }

    if(moeda_selecionada=="EURO")
    {
      $("td#metical_converted").text(parseFloat(total_a_pay*cambio_actual.metical_euro).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#euro_converted").text(parseFloat(total_a_pay).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#dolar_converted").text(parseFloat(total_a_pay*(cambio_actual.metical_euro/cambio_actual.metical_dolar).toFixed(2)).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#rand_converted").text(parseFloat(total_a_pay*(cambio_actual.metical_euro/cambio_actual.metical_rand).toFixed(2)).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      
    }

    if(moeda_selecionada=="USD")
    {

      $("td#metical_converted").text(parseFloat(total_a_pay*cambio_actual.metical_dolar).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#euro_converted").text(parseFloat(total_a_pay*(cambio_actual.metical_dolar/cambio_actual.metical_euro).toFixed(2)).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#dolar_converted").text(parseFloat(total_a_pay).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#rand_converted").text(parseFloat(total_a_pay*(cambio_actual.metical_dolar/cambio_actual.metical_rand).toFixed(2)).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      
      
    }

    if(moeda_selecionada=="ZAR")
    {


      $("td#metical_converted").text(parseFloat(total_a_pay*cambio_actual.metical_rand).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#euro_converted").text(parseFloat(total_a_pay*(cambio_actual.metical_rand/cambio_actual.metical_euro).toFixed(2)).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#dolar_converted").text(parseFloat(total_a_pay*(cambio_actual.metical_rand/cambio_actual.metical_dolar).toFixed(2)).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      $("td#rand_converted").text(parseFloat(total_a_pay).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      
      
    }

}

function desabilitarCampos(){
	$('input,select, #registar, #cancelar').attr('disabled', 'disabled');	
	$('#editar').removeClass('hide');
}
// ********************************associado ao Stock list values

function calc_total()
{
	total=0;
	$('.total').each(function() {
        total += parseInt($(this).val());
    });
	$('#sub_total').val(total.toFixed(2));
	tax_sum=total/100*$('#tax').val();
	$('#tax_amount').val(tax_sum.toFixed(2));
	$('#total_amount').val((tax_sum+total).toFixed(2));
}

var inputQuantity = [];

// *****************************end stock association *********************


function habilitarCampos(){
	$('input,select, #registar, #cancelar').removeAttr('disabled');
	$('#editar').addClass('hide');
}

function updateDistritos(provincia, distrito_alvo){
	var distritos = getDistritos();
	$('#'+distrito_alvo).empty();
	distritos[$('#'+provincia).prop('selectedIndex')].forEach(function(distrito){
		$('#'+distrito_alvo).append('<option value="'+distrito.toLowerCase()+'">'+distrito+'</option>')
	})
}


function limparFormulario(id){
		$('#yes_no_title_modal').html('Cancelar Preenchimento do Formulario');
		$('#yes_no_content_modal').html('Esta prestes a cancelar esta operacao<br/>Deseja continuar?');
		$('#yes_no_modal').openModal();	
		$('#yes_btn_modal').click(function(){
			if(id){
				desabilitarCampos();
			} else {
				document.forms.formulario.reset();
				window.scrollTo(0,0);
			}
		})
}

		function mostrarNomeConjunge(evt){
		if($(evt.target).val().match(/casado/i)){
			$('#nome_conjunge_container').removeClass('hide');
		} else {
			$('#nome_conjunge_container').addClass('hide');
		}
	}
	function openNav(){
		document.getElementById("mySidebar").style.width = "100%";
		document.getElementById("mySidebar").style.marginTop = "120px";
		document.getElementById("mySidebar").style.position = "fixed";
		document.getElementById("main").style.marginLeft = "250px";


	}
	function closeNav(){
		document.getElementById("main").style.className="hide";
		document.getElementById("mySidebar").style.width = "0"
		document.getElementById("main").style.marginLeft= "0"
	}
	function image(){
		document.windw.href("/");
	}

function inicializacao(){
	$('.tooltipped').tooltip({delay: 10});
	//$('.slider').slider({full_width: false});
	$('.datepicker').pickadate({
		monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
		weekdaysFull:["Domingo","Segunda","Terca","Quarta","Quinta","Sexta","Sabado"],
		weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],
		weekdaysLetter:["D","S","T","Q","Q","S","S"],
		today:"Hoje",
		clear:"Apagar",
		close:"Fechar",
		format: 'dd/mm/yyyy',
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 50, // Creates a dropdown of 15 years to control year
		monthsFull: [ "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]
	});
}






$('.datepicker').pickadate({
		monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
		weekdaysFull:["Domingo","Segunda","Terca","Quarta","Quinta","Sexta","Sabado"],
		weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],
		weekdaysLetter:["D","S","T","Q","Q","S","S"],
		today:"Hoje",
		clear:"Apagar",
		close:"Fechar",
		format: 'dd/mm/yyyy',
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 50, // Creates a dropdown of 15 years to control year
		monthsFull: [ "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]
	});

Date.prototype.toSimpleDateFormat = function(){
	return this.getDate()+"/"+(this.getMonth()+1)+"/"+this.getFullYear();
}

function validar(){
      var result = true;
      $('.preencher').each(function(){
        if(!result){
          return;
        }
        if($(this).val().match(/^\s*$/)){
          $('#msg_title_modal').html('Campo Não Preenchido')
          if($(this).parent().find('label').html() != undefined){
            $('#msg_content_modal').html('O campo correspondente a <b>'+$(this).parent().find('label').html().replace('*', '')+'</b> nao foi preenchido. Por favor preencha-o');
          }else{
            $('#msg_content_modal').html('O campo correspondente a <b>'+$(this).parent().find('span').html().replace('*', '')+'</b> nao foi preenchido. Por favor preencha-o');
          }
          
          $('#msg_modal').openModal();
          result = false;
          return;
        }
      });
      return result;
    }

// function testar_quantidade(){
//   var resultado=true;
//   $(".quantyy").each(function(){

//     if(!result){
//       return;
//     }
//     if()
//   })
// }



var getDistritos = (
					function(){
						var distritos = document.getElementById('remover-da-pagina') ? JSON.parse($('#remover-da-pagina').html()) : '';
						$('#remover-da-pagina').remove();
						return function(){
								return Array.isArray(distritos) ? distritos.concat([]) : 'distritos';
						}
					}
				)();


  function salvarexcel(){
  	var motorista=document.getElementById("porcas");
  	var motorist = motorista.options[motorista.selectedIndex].text;


	motorist += motorist + ';'
	motorist += "mestre";
	motorist += '\r\n';
	window.open( "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(motorist));

  	//var data= document.getElementById("parabrisas").value;

		//console.log("funcao executado****************")
		document.getElementById("lopes").innerHTML=motorist;
		
  }
function redirecionar(){
	window.location.href="/inspdiaria/novo"
}

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('select');
  //   var instances = M.FormSelect.init(elems, options);
  // });

  // // Or with jQuery

  // $(document).ready(function(){
  //   $('select').formSelect();
  // });

  var demoJson = {
    "demo": {
        "menu": {
            "financas": {
                "pt": "Finanças",
                "en": "finances"
            },
            "viatura": {
                "pt": "Viatura",
                "en": "Vehicle"
            },
            "viturainspdiaria": {
                "pt": "Insp diaria",
                "en": "Daily Insp"
            },
            "viaturaTransfere": {
                "pt": "Transferencia",
                "en": "Transference"
            },
            "utilizador": {
                "pt": "Utilizador",
                "en": "user"
            },
            "utilizadores": {
                "pt": "utilizadores",
                "en": "users"
            },
            "manutencao": {
                "pt": "Manutenção",
                "en": "Maintenance"
            },
            "estatistica": {
                "pt": "Estatistica",
                "en": "Statistic"
            },
            "viaturas": {
                "pt": "Viaturas",
                "en": "Vehicles"
            },
            "siteinsp": {
                "pt": "Insp Site",
                "en": "Site Insp"
            },
            "perfil": {
                "pt": "perfil",
                "en": "profile"
            },

            "cliente": {
                "pt": "Cliente / Fornecedor",
                "en": "Client / Supplier "
            },

            "inquerito": {
                "pt": "Inquérito",
                "en": "Inquiry"
            }
        },

         "preventative_maint": {

              "concernstype": {
                "pt": "Tipo",
                "en": "Type"
              },

              "concernsmaintnumber": {
                "pt": "Número de manutenção",
                "en": "Maintenance number"
              },

              "concernsacknowledged": {
                "pt": "Reconhecido",
                "en": "Acknowledged"
              },

              "concernsdate": {
                "pt": "Data",
                "en": "Date"
              },

              "concernsdescription": {
                "pt": "Descrição da Preocupação",
                "en": "Concern description"
              },

              "concerns": {
                "pt": "Preocupações ",
                "en": "Concerns"
              },

              "picturesmaint": {
                "pt": "Por favor, insira as fotos desta manutenção",
                "en": "Please insert a pictures of this maintenance"
              },

              "photo": {
                "pt": "Fotos",
                "en": "Photos"
              },

              "vsatcomments": {
                "pt": "VSAT comentários",
                "en": "VSAT comments"
              },

              "checksignalpathobst": {
                "pt": "Verificar o caminho do sinal obstruído",
                "en": "Check signal path obstructed"
              },

              "checkentrysealed": {
                "pt": "Verificar entrada selada",
                "en": "Check entry sealed"
              },

              "checkconnsealed": {
                "pt": "Verifique a conexão selada",
                "en": "Check connection sealed"
              },

              "checkdishtight": {
                "pt": "Verifique o aperto de prato",
                "en": "Check dish ight"
              },

              "checkdishearthdensorpaste": {
                "pt": "Verificar pasta densa de terra de prato",
                "en": "Check dish earth densor paste"
              },

              "checkfanintsakevent": {
                "pt": "Verificar a ventilação de entrada do ventilador",
                "en": "Check fan intsake ventilation"
              },

              "checkdishdentsbumpsplit": {
                "pt": "Verificar amolgadela no prato",
                "en": "Check dish dents bump split"
              },

              "checkgalvaniseditems": {
                "pt": "Verificar artigos galvanizados",
                "en": "Check galvanised items"
              },

              "checkdishcracksagg": {
                "pt": "Verificar a flacidez da placa",
                "en": "Check dish crack sagg"
              },

              "checkdishplunthclean": {
                "pt": "Verifique a Limpeza do prato",
                "en": "Check dish plunth clean"
              },

              "checkplugsconntight": {
                "pt": "Verifique se conexões das tomadas estão apertadas",
                "en": "Check plugs connections tight"
              },

              "downloadmodemconfig": {
                "pt": "Download da configuração do Modem",
                "en": "Download Modem configuration"
              },

              "conduittrunksclean": {
                "pt": "Condutas Limpas",
                "en": "Conduit trunks clean"
              },

              "entrysealed": {
                "pt": "Entrada selada",
                "en": "Entry sealed"
              },

              "cableslabels": {
                "pt": "Etiquetas de cabos",
                "en": "Cable labels"
              },

              "equipmentlabels": {
                "pt": "Etiquetas de equipamento",
                "en": "Equipment labels"
              },

              "txlevel": {
                "pt": "Nível TX",
                "en": "TX level"
              },

              "vsatlinkto": {
                "pt": "Fim da ligação VSAT",
                "en": "VSAT Link To"
              },

              "vsatlinkfrom": {
                "pt": "Início da ligação VSAT",
                "en": "VSAT Link From"
              },

              "vsatinfo": {
                "pt": "Informação VSAT",
                "en": "VSAT information"
              },

              "externalcomm": {
                "pt": "Comentários externos",
                "en": "External comments"
              },

              "externalwaterproof": {
                "pt": "Impermeabilização externa",
                "en": "External waterproof"
              },

              "externallabels": {
                "pt": "Etiquetas externas",
                "en": "External labels"
              },

              "externalIFconntight": {
                "pt": "Conexão externa IF estreita",
                "en": "External IF connection tight"
              },

              "externalearth": {
                "pt": "Terra Externa",
                "en": "External Earth"
              },

              "externalnutstight": {
                "pt": "Porcas exteriores apertadas",
                "en": "External Nuts Tight"
              },

              "externalbrackets": {
                "pt": "Suportes externos",
                "en": "External brackets"
              },

              "txinternalcomm": {
                "pt": "Comentários de TX interno",
                "en": "Tx internal comments"
              },

              "internalIFlabels": {
                "pt": "Etiquetas internas IF",
                "en": "Internal IF labels"
              },

              "internalconnecttight": {
                "pt": "Conexões internas IF apertadas",
                "en": "Internal IF connections tight"
              },

              "internalddf": {
                "pt": "Etiquetas internas DDF",
                "en": "Internal DDF labels"
              },

              "internallabels": {
                "pt": "Etiquetas internas",
                "en": "Internal labels"
              },

              "internelectconnect": {
                "pt": "Conexão eléctrica interna",
                "en": "Internal electrical connection"
              },

              "internalearth": {
                "pt": "Terra interna",
                "en": "Internal Earth"
              },

              "hightemp": {
                "pt": "Alta Temperatura",
                "en": "High Temp"
              },

              "rectsystem": {
                "pt": "Sistema rectificador",
                "en": "Rectifier system"
              },

              "rectmodule": {
                "pt": "Módulo rectificador",
                "en": "Rectifier module"
              },

              "genrunning": {
                "pt": "Gerador em funcionamento",
                "en": "Generator running"
              },

              "genlowfuel": {
                "pt": "Gerador Baixo Consumo de Combustível",
                "en": "Generator low fuel"
              },

              "genabnormal": {
                "pt": "Gerador anormal",
                "en": "Generator abnormal"
              },

              "doorswitch": {
                "pt": "Interruptor de Porta",
                "en": "Door switch"
              },

              "acmains": {
                "pt": "AC principal",
                "en": "AC mains"
              },

              "constructionradius": {
                "pt": "Construcção em raio de 50m",
                "en": "Construction in 50m radius"
              },

              "opticLabels": {
                "pt": "Etiquetas ópticas de potência RF",
                "en": "RF power optic labels"
              },

              "cablesdamages": {
                "pt": "Danos causados por cabos",
                "en": "Cable damages"
              },

              "dcducables": {
                "pt": "Cabos DCDU",
                "en": "DCDU cables"
              },

              "jumpercond": {
                "pt": "Condição do Jumper",
                "en": "Jumper condition"
              },

              "aauearth": {
                "pt": "AAU Terra",
                "en": "AAU Earth"
              },

              "rrucond": {
                "pt": "Condição RRU",
                "en": "RRU condition"
              },

              "rrucables": {
                "pt": "Cabos RRU",
                "en": "RRU cables"
              },

              "opticfibercond": {
                "pt": "Condição da fibra óptica",
                "en": "Optic fiber condition"
              },

              "clampcond": {
                "pt": "Condição da braçadeira",
                "en": "Clamp condition"
              },

              "bracketscond": {
                "pt": "Condição dos Suportes",
                "en": "Brackets condition"
              },

              "antennasecure": {
                "pt": "Antena segura",
                "en": "Antenna secure"
              },

              "antennas": {
                "pt": "Antenas",
                "en": "Antennas"
              },

              "accageinst": {
                "pt": "Grade de ar condicionado instalada",
                "en": "Air conditioning cage installed"
              },

              "acmodelcapacity": {
                "pt": "Capacidade do modelo de ar condicionado",
                "en": "Air conditioning model capacity"
              },

              "accooling": {
                "pt": "Refrigeração do ar condicionado",
                "en": "Air conditioning cooling"
              },

              "operatingtime": {
                "pt": "Tempo de operação do ar condicionado",
                "en": "Operating time air conditioning"
              },

              "hightemperature": {
                "pt": "Alarme de Alta Temperatura",
                "en": "High temperature alarm"
              },

              "cleanfilter": {
                "pt": "Filtro limpo",
                "en": "Clean Filter"
              },

              "noisevibration": {
                "pt": "Vibração do ruído do ar condicionado",
                "en": "Air conditioning noise vibration"
              },

              "aircond": {
                "pt": "Ar condicionado",
                "en": "Air conditioning"
              },

              "cell": {
                "pt": "Célula",
                "en": "Cell"
              },

              "teste": {
                "pt": "Teste",
                "en": "Test"
              },

              "batterybank": {
                "pt": "Banco de Bateria",
                "en": "Baterry Bank"
              },

              "batterybanks": {
                "pt": "Bancos de Bateria",
                "en": "Baterry Banks"
              },

              "alarmcommport": {
                "pt": "Porto de Comando do Alarme",
                "en": "Alarm Comm Port"
              },

              "supervisormodule": {
                "pt": "Módulo Supervisor",
                "en": "Supervisor module"
              },

              "slotsburn": {
                "pt": "Queimaduras nos compartimentos",
                "en": "Slots burn"
              },

              "nao": {
                "pt": "Não",
                "en": "No"
              },

              "sim": {
                "pt": "Sim",
                "en": "Yes"
              },

              "systemupgrade": {
                "pt": "Actualização das necessidades do sistema",
                "en": "System needs upgrade"
              },

              "parametersokay": {
                "pt": "Parâmetros Ok",
                "en": "Parameters Okay"
              },

              "slotspopulated": {
                "pt": "Compartimentos preenchidos",
                "en": "Slots Populated"
              },

              "opproperly": {
                "pt": "Funciona correctamente",
                "en": "Operates properly"
              },

              "rectmake": {
                "pt": "Marca do Rectificador",
                "en": "Rectifier Make"
              },

              "rectifier": {
                "pt": "Rectificador",
                "en": "Rectifier"
              },

              "earthcomments": {
                "pt": "Observações da Terra",
                "en": "Earth Comments"
              },

              "earthohm": {
                "pt": "Leitura da Terra em Ohm",
                "en": "Earth read Ohm"
              },

             "earthleakage": {
                "pt": "Fugas em leitura de terra",
                "en": "Earth read leakage"
              },

              "electricalcomments": {
                "pt": "Observações eléctricas",
                "en": "Electrical Comments"
              },

              "voltagereading": {
                "pt": "Leitura de tensão",
                "en": "Voltage Reading"
              },

              "neutral": {
                "pt": "Neutro",
                "en": "Neutral"
              },

              "blue": {
                "pt": "Azul",
                "en": "Blue"
              },

              "white": {
                "pt": "Branco",
                "en": "White"
              },

              "red": {
                "pt": "Vermelho",
                "en": "Red"
              },

              "currentreadings": {
                "pt": "Leituras de corrente",
                "en": "Current Readings"
              },

              "electrical": {
                "pt": "Eléctrico",
                "en": "Electrical"
              },

              "autorearm": {
                "pt": "Rearmar automático",
                "en": "Auto Rearm"
              },

              "meterbox": {
                "pt": "Caixa do Medidor",
                "en": "Meter Box"
              },

              "sitelight": {
                "pt": "Luz do site",
                "en": "Site Light"
              },

              "holessealed": {
                "pt": "Buracos Selados",
                "en": "Holes Sealed"
              },

              "unauthorizedconnect": {
                "pt": "Conexões não autorizadas",
                "en": "Unauthorized Connections"
              },

              "energymeters": {
                "pt": "Medidores de energia",
                "en": "Energy meters"
              },

              "tightenconnect": {
                "pt": "Aperte as conexões",
                "en": "Tighten connections"
              },

              "edBoard": {
                "pt": "Quadro de Distribuição Externa",
                "en": "External Distribution Board"
              },

              "failmains": {
                "pt": "Falha na execução do teste",
                "en": "Test Run Fail Mains Supply"
              },

              "fuelleaks": {
                "pt": "Verifique os vazamentos de combustível",
                "en": "Check Fuel Leaks"
              },

              "vbelt": {
                "pt": "Inspeccione a correia V",
                "en": "Inspect V Belt"
              },

              "radiatorhoses": {
                "pt": "Verifique as mangueiras do radiador",
                "en": "Check Radiotor Hoses"
              },

              "comentariosgenerator": {
                "pt": "Comentários do gerador",
                "en": "Generator Comments"
              },

              "postruncomments": {
                "pt": "Comentários da pós-execução",
                "en": "Post Run Comments"
              },

              "externalclear": {
                "pt": "Pós-execução para verificar alarmes externos limpos",
                "en": "Post Run Check External Alams Clear"
              },

              "switchauto": {
                "pt": "Pós-execução de interruptor de verificação automático",
                "en": "Post Run Check Switch Auto"
              },

              "testruncomments": {
                "pt": "Comentários sobre a execução de teste",
                "en": "Test Run Comments"
              },

              "externalalarms": {
                "pt": "Teste de execução para confirmar alarmes externos",
                "en": "Test Run Confirm External Alarms"
              },

              "waterpump": {
                "pt": "Teste de execução de operador da bomba de água",
                "en": "Test Run Waterpump Operator"
              },

              "airflowradiator": {
                "pt": "Teste de execução para verificar radiador de fluxo de ar",
                "en": "Test Run Check Airflow Radiator"
              },

              "abnormalvibrations": {
                "pt": "Teste de execução para verificar vibrações anormais",
                "en": "Test Run Check Abnormal Vibrations"
              },

              "failmainsna": {
                "pt": "Falha na execução do teste",
                "en": "Test Run Fail Mains Supply"
              },

              "chargeralarms": {
                "pt": "Pré-execute os alarmes do carregador de bateria",
                "en": "Prerun Battery Charger Alarms"
              },

              "prerun": {
                "pt": "Pré-execute o painel de controle",
                "en": "Prerun control panel"
              },

              "fuelleakss": {
                "pt": "Verificar vazamentos de combustível",
                "en": "Check Fuel Leaks"
              },

              "jobcard_vbelt": {
                "pt": "Inspeccione a correia V",
                "en": "Inspect V Belt"
              },

              "fuelfilter": {
                "pt": "Substitua o filtro de combustível",
                "en": "Replace Fuel Filter"
              },

             "coolantleaks": {
                "pt": "Verifique fugas de líquido de refrigeração",
                "en": "Check Coolant Leaks"
              },

              "airfilter": {
                "pt": "Substitua o filtro de ar",
                "en": "Replace Air Filter"
              },

              "oilleaks": {
                "pt": "Verifique mangueiras do radiador",
                "en": "Check Radiator Hoses"
              },

              "oilleaks": {
                "pt": "Verifique os vazamentos de óleo",
                "en": "Check Oil Leaks"
              },

              "oillevel": {
                "pt": "Verifique o nível de óleo",
                "en": "Check Oil Level"
              },

              "oilfilter": {
                "pt": "Substitua o filtro de óleo",
                "en": "Replace Oil Filter"
              },

              "oilpressure": {
                "pt": "Pressão do óleo do gerador",
                "en": "Generator oil pressure"
              },

              "coolantlevel": {
                "pt": "Nível do líquido de refrigeração do gerador",
                "en": "Generator coolant level"
              },

             "batterycharging": {
                "pt": "Corrente de carregamento de bateria de gerador",
                "en": "Generator Battery Charging Current"
              },

            "batteryvoltage": {
                "pt": "Tensão da bateria do gerador",
                "en": "Generator Battery Voltage"
            },

            "frequency": {
                "pt": "Frequência do Gerador",
                "en": "Generator Frequency"
            },

            "loadblueT": {
                "pt": "Carga do gerador azul T",
                "en": "Generator load blue T"
            },

            "loadwhiteS": {
                "pt": "Carga do gerador branco S",
                "en": "Generator load white S"
            },

            "loadR": {
                "pt": "Carga do gerador R",
                "en": "Generator load R"
            },

            "mainsrestore": {
                "pt": "Minutos de restabelecimento da rede do gerador",
                "en": "Generator mains restore minutes"
            },

            "startupdelay": {
                "pt": "Minutos de atraso na inicialização do gerador",
                "en": "Geneartor startup delay minutes"
            },

            "generator": {
                "pt": "Gerador",
                "en": "Generator"
            },

            "visiblestate": {
                "pt": "Estado visível da protecção contra queda ",
                "en": "Fall arrest visible state"
            },

            "fallarrest": {
                "pt": "Protecção contra queda ",
                "en": "Fall Arrest"
            },

            "oildiesel": {
                "pt": "Derrames de óleo diesel",
                "en": "Oil diesel spills"
            },

            "overallsite": {
                "pt": "Condição geral do site",
                "en": "Overall site condition"
            },

            "groundcover": {
                "pt": "Cobertura do solo no interior da vedação",
                "en": "Ground cover inside Fence"
            },

            "siteerosion": {
                "pt": "Área em torno da erosão do Site",
                "en": "Area around site erosion"
            },

            "environmental": {
                "pt": "Meio Ambiente",
                "en": "Environmental"
            },

            "locksM3": {
                "pt": "Fechaduras no M3",
                "en": "Locks on M3"
            },

            "lockscontainer": {
                "pt": "Fechaduras nos armários dos contentores",
                "en": "Locks on container cabinets"
            },

            "locksgenset": {
                "pt": "Fechaduras no grupo de geradores",
                "en": "Locks on Genset"
            },

            "locksP3": {
                "pt": "Fechaduras no P3",
                "en": "Locks on P3"
            },

            "locksgate": {
                "pt": "Fechaduras no portão",
                "en": "Locks on gate"
            },

            "locks": {
                "pt": "Fechaduras",
                "en": "Locks"
            },

            "cleanweed": {
                "pt": "Limpe a erva daninha e capim 1,5m ao redor",
                "en": "Clear weed and grass 1.5m around"
            },

            "anydefects": {
                "pt": "Quaisquer defeitos na via de acesso",
                "en": "Any defects on access road"
            },

            "removerubbish": {
                "pt": "Remova o lixo do arame farpado",
                "en": "Remove rubbish from razor wire"
            },

            "poisontreament": {
                "pt": "Tratamento venenoso para formigas",
                "en": "Poison treament for ants"
            },

            "cleansite": {
                "pt": "Limpe a área do Site",
                "en": "Clean Site area"
            },

            "servicefence": {
                "pt": "Rever cercas, portões, fechaduras e dobradiças",
                "en": "Service fence, gates, locks and hinges"
            },

            "cleaning": {
                "pt": "Limpeza",
                "en": "Cleaning"
            },

           "rustcable": {
                "pt": "Trate a ferrugem nos suportes de cabos e nos suportes do alimentador",
                "en": "Treat rust on cable trays and feeder brackets"
            },

          "mountingsfeeders": {
                "pt": "Verifique e repare todos os suportes para alimentadores, DB's, interruptores e luzes que estão apertados",
                "en": "Check and repair all mountings for feeders, DB's, switches and lights are tight"
            },

          "sealentries": {
                "pt": "Vedar todas as entradas e mangas com vedante de silicone",
                "en": "Seal all entries and sleeves with silicone sealant"
            },

          "reportdamage": {
                "pt": "Verifique e relate qualquer dano ao mastro, portas, degraus ou pintura",
                "en": "Check and report any damage to mast, doors, steps or paintwork"
            },

          "cleaninside": {
                "pt": "Limpe o interior do mastro",
                "en": "Clean inside of mast"
            },

          "surgeprotection": {
                "pt": "Verifique e reparar a protecção contra sobretensões no mastro DB",
                "en": "Check and repair surge protection in mast DB"
            },

          "connectligthswitches": {
                "pt": "Verifique e repare todas as conexões nas luzes e interruptores.",
                "en": "Check and repair all connections on lights and switches"
            },

          "awlight": {
                "pt": "Verifique e repare o funcionamento da luz A / W",
                "en": "Check and repair A/W light functioning"
            },

          "mast": {
                "pt": "Mastro",
                "en": "Mast"
            },

          "powerskirting": {
                "pt": "Limpe todo o powerskirting, paredes e chão com água e sabão",
                "en": "Clean all powerskirting, walls and floor with soap and water"
            },

          "earthconnections": {
                "pt": "Cubra as conexões de aterramento com pasta anticorrosiva.",
                "en": "Cover earth connections with anti-corrosion paste"
            },

          "labelling": {
                "pt": "Verifique e repare todas as etiquetas no DB interno",
                "en": "Check and repair all labeling on internal DB"
            },

            "electricalconnections": {
                "pt": "Verifique as conexões eléctricas",
                "en": "Check electrical connections"
            },

            "surgearrestors": {
                "pt": "Verifique todos os pára-raios e substitua-os se estiverem avariados",
                "en": "Check all surge arrestors and replace if faulty"
            },

            "circuitbreakers": {
                "pt": "Verifique todos os disjuntores no DB interno e substitua-os em caso de defeito",
                "en": "Check all circuit breakers on internal DB and replace if faulty"
            },

            "testearth": {
                "pt": "Teste de fuga à terra",
                "en": "Test earth leakage"
            },

            "powersockets": {
                "pt": "Teste todas as tomadas de alimentação",
                "en": "Test all power sockets"
            },

            "testemergency": {
                "pt": "Teste de funcionamento e reparação da luz de emergência",
                "en": "Test emergency light functioning and repair"
            },

            "containerligth": {
                "pt": "Verifique, limpe e repare a luz do contentor",
                "en": "Check, clean and repair container light"
            },

            "container": {
                "pt": "Contentor",
                "en": "Container"
            },

            "actualizar": {
                "pt": "A actualizar",
                "en": "Updating"
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "guardar": {
                "pt": "Guardar",
                "en": "Save"
            },
            
            "signage": {
                "pt": "Sinalização",
                "en": "Signage"
            },

            "idpresent": {
                "pt": "ID do site presente",
                "en": "Site ID present"
            },

            "vmlogopresent": {
                "pt": "Sinal do logogitpo VM presente",
                "en": "VM Logo Sign Present"
            },

            "signnotice": {
                "pt": "Sinal de aviso de vedação perimetral",
                "en": "Sign notice perimeter fence"
            },

            "cautionladder": {
                "pt": "Sinal de cuidado Escada de mão",
                "en": "Caution ladder sign"
            },

            "cautioncabletray": {
                "pt": "Cuidado com o suporte para cabos",
                "en": "Caution cable tray"
            },

            "noticedoor": {
                "pt": "Observação da porta do telhado",
                "en": "Notice door rooftop"
            },

            "warningstick": {
                "pt": "Haste de aviso de antenas",
                "en": "Warning stick antennas"
            },

            "rooftopdoorlocked": {
                "pt": "Porta do telhado trancada",
                "en": "Rooftop door locked"
            },

            "accesscontrolrooftop": {
                "pt": "Telhado de controlo de acesso",
                "en": "Access control rooftop"
            }
        },

        "stock_item_home":{
    "registado_por":{
        "pt":"registado_por",
        "en":"registed_by"
    },
    "lista_item_":{
        "pt":"Lista de Items",
        "en":"Items list"
    }

},

"stock_item_form":{
    "titulo":{
        "en":"Item Registration",
        "pt":"Registo do Item"
    },
    "codigo_de_barras":{
        "pt":"codigo de barras",
        "en":"barcode "
    }, 
    "descricao_item":{
        "pt":"Descricao",
        "en":"Item description"
    },
    "Unit":{
        "pt":"unidade de venda",
        "en": "sell unit"
    },
    "conteudo":{
        "en":"Content",
        "pt":"Conteudo"
    },

    "item_serial":{
        "pt":"Item serializado",
        "en":"Serialized Item"
    },

    "categoria":{
        "pt":"Categoria",
        "en":"Category"
    },
    "subcategoria":{
        "en":"SubCategory",
        "pt":"Subcategoria"
    },
    "tempo_entrega":{
        "en":"Time deliver (Days)",
        "pt":"Tempo de entrega (Dias)"
    }

},
"po_menu":{
    "em_progresso":{
        "en":"In Progress",
        "pt":"Em Progresso"
    },
    "aprovado":{
        "en":"Approuved",
        "pt":"Aprovado"
    },
    "reprovado":{
        "en":"Denied",
        "pt":"Reprovados"
    },
    "finalizados":{
        "en":"Finalized",
        "pt":"Finalizados"
    }
}, 

"po_form":{
    "titulo_p":{
        "pt":"Formulario da PO",
        "en":"PO form"
    },
    "nome":{
        "en":"Name",
        "pt":"Nome"
    },
    "fornecedor":{
        "en":"Supplier",
        "pt":"Fornecedor"
    },
    "Frete":{
        "en":"Ship",
        "pt":"Frete"
    },
    "cont_fornecedor":{
        "en":"Contact Number",
        "pt":"Contacto do fornecedor"
    },
    "endereco":{
        "en":"Address",
        "pt":"Endereco"
    },
    "cod_fornecedor":{
        "en":"Supplier code",
        "pt":"Codigo do Fornecedor"
    },
    "razoes":{
        "en":"Reasons",
        "pt":"Razoes"
    },
    "titulo_Pagamento":{
        "en":"Payment",
        "pt":"Pagamento"
    },
    "metodo_pagamento":{
        "en":"Payment Method",
        "pt":"Metodo de Pagamento"
    },
    "termo":{
        "en":"Term",
        "pt":"Termo"
    },
    "orde_pagamento":{
        "en":"Payment Order",
        "pt":"Ordem de Pagamento"
    }, 
    "departamento":{
        "en":"Department",
        "pt":"Departamento"
    }, 
    "subdepartamento":{
        "en":"Sub-Department",
        "pt":"Sub-departamento"
    },
    "numero_cotacao":{
        "en":"Quotation Number",
        "pt":"Numero de cotacao"
    }, 
    "destino":{
        "en":"destiny",
        "pt":"destino"
    }, 
    "moeda":{
        "en":"Currency",
        "pt":"Moeda"
    },
    "cotacao_titulo":{
        "en":"Cotation",
        "pt":"Cotacao"
    }, 
    "quantidade":{
        "en":"Quantity",
        "pt":"Quantidade"
    },
    "Preco_unit":{
        "en":"Unit price",
        "pt":"Preco Unitario"
    },
    "descricao":{
        "en":"Description",
        "pt":"Descricao"
    },
    "preco_unit":{
        "en":"Unt Pric",
        "pt":"Prec Unt"
    },
    "valor":{
        "en":"Value in",
        "pt":"Valores em"
    }, 
    "ficheiro":{
        "en":"Files",
        "pt":"Ficheiros"
    },
    "ficheiro_1":{
        "en":"File 1",
        "pt":"Ficheiro 1"
    },
    "ficheiro_2":{
        "en":"File 2",
        "pt":"Ficheiro 2"
    },
    "ficheiro_3":{
        "en":"File 3",
        "pt":"Ficheiro 3"
    },
    "resultados":{
      "en":"Results",
      "pt":"Resultados"
    },
    "acao":{
      "en":"Action",
      "pt":"Accao"
    }, 
    "data":{
      "en":"Date",
      "pt":"Data"
    },
    "recebidos":{
      "en":"Received by",
      "pt":"Recebido Por"
    }
}, 

"stok_request_form":{
    "titulo1":{
        "en":"Stock Request Form",
        "pt":"Formulario de Stock Request"
    },
    "nome":{
        "en":"Name",
        "pt":"Nome"
    },
    "departamento":{
        "en":"Department",
        "pt":"Departamento"
    }, 
    "Requesitar_em":{
        "en":"Request from",
        "pt":"Requisitar Em "
    }, 
    "data_uso":{
        "en":"Use Date",
        "pt":"Data do Uso"
    },
    "destino":{
        "en":"Destiny",
        "pt":"Destino"
    },
    "razoes":{
        "en":"Reasons",
        "pt":"Razoes"
    },
    "departamento_chefe":{
        "en":"Department Chefe",
        "pt":"Chefe do Departamento"
    }, 
    "armazem_chefe":{
        "en":"Warehouse Chefe",
        "pt":"Chefe do Armazem"
    }, 
    "selecionar_item":{
        "en":"Select item",
        "pt":"Selecione Item"
    },
    "quantidade":{
        "en":"Quantity",
        "pt":"Quantidade"
    },
    "descricao":{
      "en":"Description",
      "pt":"Descricao"
    },
    "requisicao":{
      "en":"Requested",
      "pt":"Requisitado"
    },
    "recebido":{
      "en":"Received",
      "pt":"Recebido"
    },
    "razoe_dev":{
      "en":"Return Reasons",
      "pt":"Razoes da Devolucao"
    },
    "recebido_por":{
      "en":"Received By",
      "pt":"Recebido Por"
    },
    "data":{
      "en":"Date",
      "pt":"Data"
    },
    "acao":{
      "en":"Action",
      "pt":"Accao"
    }, 
    "numero_st":{
      "en":"SR Number",
      "pt":"Numero SR"
    },
    "reprovado":{
      "en":"DECLINED",
      "pt":"REPROVADO"
    },
    "aprovado":{
      "en":"APPROUVED",
      "pt":"APROVADO"
    },
    "entregue":{
      "en":"DELIVERED",
      "pt":"ENTREGUE"
    },
    "recebbido":{
      "en":"RECEIVED",
      "pt":"RECEBIDO"
    }
}, 

"Po_home":{
    "numero_po":{
        "en":"PO Number",
        "pt":"Numero PO"
    },
    "requisitado_por":{
        "en":"Requested By",
        "pt":"Requisitado Por"
    },
    "Data_registo":{
        "en":"Date",
        "pt":"Data"

    },
    "titulo":{
        "en":"PO list",
        "pt":"Lista de PO"
    }
}, 

"stock_request_home":{
    "titulo":{
        "en":"Stock Request List",
        "pt":"Lista de Stock Request"
    },
    "numero_stock":{
        "en":"S.Req Number",
        "pt":"Numero de S. Req"
    },
    "armazem":{
        "en":"Warehouse",
        "pt":"Armazem"
    },
    "data":{
        "en":"Date",
        "pt":"Data"
    },
    "requisitado_por":{
      "en":"Requested by",
      "pt":"Requisitado por"
    }
}, 

"Stock_request_home_menu":{
    "expediente":{
        "en":"Dispatch",
        "pt":"por Despachar"
    },
    "aprovados":{
        "en":"Approuved",
        "pt":"Aprovados"
    },
    "reprovados":{
        "en":"Declined",
        "pt":"Reprovados"
    },
    "finalizados":{
        "en":"Finalized",
        "pt":"Finalizados"
    },
    "tecnicos":{
        "en":"Technicians",
        "pt":"Tecnicos"
    },
    "armazem":{
        "en":"Warehouse",
        "pt":"Armazem"
    }
},


"stock_tecnicos":{
    "subordinados":{
        "en":"Subordinates",
        "pt":"Subordinados"
    },
    "nome":{
        "en":"Name",
        "pt":"Nome"
    },
    "Provincia":{
        "en":"Province",
        "pt":"Provincia"
    },
    "regiao":{
        "en":"Region",
        "pt":"Regiao"
    }
},

"Armazem_home":{
    "armazem":{
        "en":"Warehouse",
        "pt":"Armazem"
    },
    "responsavel":{
        "en":"Chefe",
        "pt":"Chefe"
    },
    "provincia":{
        "en":"Province",
        "pt":"Provincia"
    },
    "regiao":{
        "en":"Region",
        "pt":"Regiao"
    }
},


"Armazem_form":{
    "nome":{
        "en":"Warehouse Name",
        "pt":"Nome do Armazem"
    },
    "Provincia":{
        "en":"Province",
        "pt":"Provincia"
    },
    "regiao":{
        "en":"Region",
        "pt":"Regiao"
    },
    "titulo1":{
        "en":"Warehouse registration",
        "pt":"Registo do Armazem"
    },
    "responsaveis":{
        "en":"Responsible",
        "pt":"Responsavel"
    },
    "endereco":{
        "en":"Address",
        "pt":"Endereco"
    },
    "tecnicos_locados":{
        "en":"Technician Allowed",
        "pt":"Tecnicos Permitidos"
    }
},


        "pettycash_home": {

            "accao": {
                "pt": "Acção",
                "en": "Action"
            },

            "responsavel": {
                "pt": "Responsável",
                "en": "Responsible"
            },

            "audittrail": {
                "pt": "Auditoria",
                "en": "Audit Trail"
            },

            "editcredit": {
                "pt": "Alterar o valor do crédito",
                "en": "Edit credit"
            },

            "escolhaop2": {
                "pt": "O intervalo escolhido é invalido. Escolha outro.",
                "en": "The chosen range is invalid. Choose another."
            },

            "escolhaop1": {
                "pt": "Complete o intervalo de tempo!",
                "en": "Complete the time interval!"
            },

            "outros": {
                "pt": "Outros",
                "en": "Others"
            },

            "reason1": {
                "pt": "Razão",
                "en": "Reason"
            },

            "reason": {
                "pt": "Razão da Reprovação",
                "en": "Disapproval reason"
            },

            "to": {
                "pt": "Até",
                "en": "To"
            },

           "mes": {
                "pt": "Mês",
                "en": "Month"
            },

            "ano": {
                "pt": "Ano",
                "en": "Year"
            },

          "detalhesuso": {
                "pt": "Detalhes do Pettycash",
                "en": "Pettycash Details"
            },

          "saldoactual": {
                "pt": "Saldo Actual",
                "en": "Current Balance"
            },

          "data": {
                "pt": "Data",
                "en": "Date"
            },

          "saldo": {
                "pt": "Saldo",
                "en": "Balance"
            },

          "credito": {
                "pt": "Crédito",
                "en": "Credit"
            },

          "debito": {
                "pt": "Débito",
                "en": "Debit"
            },

          "folhadecaixa": {
                "pt": "Registos de Folha de Caixa",
                "en": "Cash Sheet Records"
            },

          "accountcontrol": {
                "pt": "Controle de Despesas",
                "en": "Outgoing Control"
            },

            "accountbalance": {
                "pt": "Saldo de Conta",
                "en": "Account Balance"
            },

            "invoice_number": {
                "pt": "Número de Recibo",
                "en": "Invoice Number"
            },

            "invoice_number1": {
                "pt": "Nº Recibo",
                "en": "Invoice No"
            },

            "purchase_amount": {
                "pt": "Valor de Compra",
                "en": "Purchase Amount"
            },

            "purchase_amount1": {
                "pt": "Valor",
                "en": "Purchase"
            },

            "purchase_date": {
                "pt": "Data de Compra",
                "en": "Purchase Date"
            },

            "purchase_date1": {
                "pt": "Data",
                "en": "Date"
            },

            "nomecolaborador": {
                "pt": "Nome do Colaborador",
                "en": "Collaborator Name"
            },

            "ano": {
                "pt": "Ano",
                "en": "Year"
            },

            "mes": {
                "pt": "Mês",
                "en": "Month"
            },

            "create": {
                "pt": "Criar",
                "en": "Create"
            },

            "mensal": {
                "pt": "Mensal",
                "en": "Monthly"
            },

            "anual": {
                "pt": "Anual",
                "en": "Annual"
            },

            "pettycashreport": {
                "pt": "Tipo de Relatório",
                "en": "Report Type"
            },

            "escolhaop": {
                "pt": "Escolha uma opção",
                "en": "Choose an option"
            },

            "imagem": {
                "pt": "Imagem",
                "en": "Image"
            },

            "comment": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "docno": {
                "pt": "Doc Nr",
                "en": "Doc No"
            },

            "supplier": {
                "pt": "Fornecedor",
                "en": "Supplier"
            },

            "value": {
                "pt": "Valor",
                "en": "Value"
            },

            "description": {
                "pt": "Descrição",
                "en": "Description"
            },

            "date": {
                "pt": "Data",
                "en": "Date"
            },

            "data_hora": {
                "pt": "Data Horas",
                "en": "Date Hour"
            },

            "transactioninfo": {
                "pt": "Informações de transações",
                "en": "Transaction Information"
            },

            "dados_gerais": {
                "en": "Basic Information",
                "pt": "Dados Gerais"
            },

            "lista": {
                "pt": "Lista de Registros",
                "en": "Records list"
            },

            "nome": {
                "pt": "Nome",
                "en": "Name"
            },

            "financialyear": {
                "pt": "Ano Financeiro",
                "en": "Financial Year"
            },

            "region": {
                "pt": "Região",
                "en": "Region"
            },

            "creationdate": {
                "pt": "Data de criação",
                "en": "Creation Date"
            },

            "creationdate1": {
                "pt": "Data",
                "en": "Date"
            }
        },

        "inquerito_form": {

            "nome": {
                "pt": "Nome",
                "en": "Name"
            },

            "data": {
                "pt": "Data",
                "en": "Date"
            },

            "disclosure": {
                "pt": "Divulgação de Interesses Pessoais",
                "en": "Disclosure of Personal Interests"
            },

            "pergunta1": {
                "pt": "1. Você é director ou funcionário de qualquer outra empresa?",
                "en": "1. Are you a Director or employee of any other company?"
            },

            "companyname": {
                "pt": "Nome da Empresa",
                "en": "Company Name"
            },

            "companyresgistnum": {
                "pt": "Número de Registro da Empresa",
                "en": "Company Registration Number"
            },

            "surname": {
                "pt": "Apelido",
                "en": "Surname"
            },

            "fornames": {
                "pt": "Nomes Próprios",
                "en": "Fornames"
            },

            "residentialadd": {
                "pt": "Endereço Residencial",
                "en": "Residential Address"
            },

            "businessadd": {
                "pt": "Endereço de Negócio",
                "en": "Business Address"
            },

            "postaladd": {
                "pt": "Endereço Postal",
                "en": "Postal Address"
            },

            "nationality": {
                "pt": "Nacionalidade",
                "en": "Nationality"
            },

            "datebirth": {
                "pt": "Data de Nascimento",
                "en": "Date Birth"
            },

            "passportnum": {
                "pt": "Número de Passaporte",
                "en": "Passport Number"
            },

            "occupation": {
                "pt": "Ocupação",
                "en": "Occupation"
            },

            "anexo": {
                "pt": "Anexo A",
                "en": "Annexure A"
            },

            "pergunta2": {
                "pt": "2. Você é membro de qualquer outra corporação?  ",
                "en": "2. Are you a member of any close corporation?"
            },

            "pergunta3": {
                "pt": "3. Você está envolvido em alguma parceria, encargo, consórcio ou estrutura de negócios?",
                "en": "3. Are you involved in any partnership, trust, consortium or other business structure?"
            },

            "fornecadetalhes": {
                "pt": "Forneça Detalhes",
                "en": "Provide Details"
            },

            "fornecanome": {
                "pt": "Forneça Nome",
                "en": "Provide Name"
            },


            "detalhes": {
                "pt": "Detalhes",
                "en": "Details"
            },

            "pergunta4": {
                "pt": "4. Você é accionário em qualquer empresa privada, pública ou de capital aberto?",
                "en": "4. Do you have shareholding in any private, public or publicly listed company?"
            },

            "pergunta5": {
                "pt": "5. Algumas das empresas citadas anteriormente tem algum interesse ( ou pode adquirir futuramednte) interesse em qualquer contrato com a Empresa ou uma das suas Subsidiárias?",
                "en": "5. Do any of the companies or entities listed in 1 - 4 above have (or may in the forseseeable future acquire) an interest in any contract with the Company or any of its Subsidiary companies?"
            },

            "pergunta6": {
                "pt": "6. Excepto as 5 citadas acima, você ou a pessoa de referência têm algum interesse material, seja directa ou indirectamente, em algum contrato com a Empresa ou qualquer uma de suas Subsidiárias, seja actualmente ou a ser celebrado?",
                "en": "6. Other than in 5 above, do you or a Related Person have a material interest, whether directly or indirectly, in any contract with the Company or any of its Subsidiary companies, whether currently or to be entered into?"
            },

            "pergunta7": {
                "pt": "7. Será que algum de seus amigos ou familiares próximos tem ou estarão beneficiando materialmente, directa ou indirectamente, de qualquer contrato celebrado com a Empresa ou qualquer uma das suas Subsidiárias ou qualquer outro contrato em seu resultado?",
                "en": "7. Does any of your friends or Immediate Family have or will they be benefitting materially, either directly or indirectly, from any contract entered into with the Company or any of its Subsidiary companies or any other contract related thereto?"
            },

            "pergunta8": {
                "pt": "8. Você já recebeu ou está actualmente a receber, quaisquer benefícios, de qualquer maneira ou forma, ou presentes de qualquer pessoa ou entidade com a qual a Companhia possui uma relação de negócios, acordos ou outros negócios?",
                "en": "8. Have you ever received, or are you currently receiving, any benefits, in whatever manner or form, or gifts from any person or entity with which the Company has a business relationship, agreement or other dealings?"
            },

            "pergunta9": {
                "pt": "9. Você ou algum membro da sua família, envolvido ou se beneficiando de alguma entidade que opera em um setor semelhante ao da empresa ou entidade que opera em um setor complementar a esse setor?",
                "en": "9. Are you or any member of your Family, involved in or benefiting from, any entity that operate in a similar industry than that of the Company, or entity operating in an industry complimentary to such an industry ?"
            },

            "listarespostas": {
                "pt": "Lista das Respostas",
                "en": "List of Answers"
            }
        },


        "cliente_form": {

            "cartaconf": {
                "pt": "Carta de confirmação de conta bancária",
                "en": "Bank account confirmation letter"
            },

            "certentid": {
                "pt": "Certidão das Entidades Legais",
                "en": "Certificate of Legal Entities"
            },

            "alvara": {
                "pt": "Alvará",
                "en": "License"
            },

            "cartaapres": {
                "pt": "Carta de Apresentação da Empresa",
                "en": "Company Cover Letter"
            },

            "documentos": {
                "pt": "Documentos",
                "en": "Documents"
            },

            "escolhaop": {
                "pt": "Escolha uma opção",
                "en": "Choose an option"
            },

            "clientesupp": {
                "pt": "Deseja criar novo cliente ou fornecedor?",
                "en": "Do you want to create a new customer or supplier?"
            },

            "basicos": {
                "pt": "Informação Básica",
                "en": "Basic Information"
            },

            "cliente": {
                "pt": "Cliente",
                "en": "Client"
            },

            "fornecedor": {
                "pt": "Fornecedor",
                "en": "Supplier"
            },

            "nome": {
                "pt": "Nome",
                "en": "Name"
            },

            "telefone": {
                "pt": "Telefone",
                "en": "Phone Number"
            },

            "web": {
                "pt": "Endereço Web",
                "en": "Web Address"
            },

            "outros": {
                "pt": "Outros",
                "en": "Other"
            },

            "endfisico": {
                "pt": "Endereço Físico",
                "en": "Physical Address"
            },

            "endereco": {
                "pt": "Endereço",
                "en": "Address"
            },
            
            "bairro": {
                "pt": "Bairro",
                "en": "Suburb"
            },

            "cidade": {
                "pt": "Cidade",
                "en": "Town"
            },

            "provincia": {
                "pt": "Provincia",
                "en": "Province"
            },

            "codpostal": {
                "pt": "Código Postal",
                "en": "Postal Code"
            },

            "pais": {
                "pt": "País",
                "en": "Country"
            },

            "addContact": {
                "pt": "Adicionar Contacto",
                "en": "Add Contact"
            },

            "addContact": {
                "pt": "Adicionar mais Contactos",
                "en": "Add Contact"
            },

            "contact": {
                "pt": "Contacto",
                "en": "Contact"
            },

            "endpostal": {
                "pt": "Endereço Postal",
                "en": "Postal Address"
            },

            "cargo": {
                "pt": "Cargo",
                "en": "Job Title"
            },

            "codigo": {
                "pt": "Código",
                "en": "Code"
            },

            "termos": {
                "pt": "Termos",
                "en": "Terms"
            },

            "filial": {
                "pt": "Filial",
                "en": "Branch"
            },

            "addCliente": {
                "pt": "Guardar",
                "en": "Save"
            },
            "listaClientes": {
                "pt": "Lista de Clientes",
                "en": "Clients List"
            },

            "listaFornecedores": {
                "pt": "Lista de Fornecedores",
                "en": "Suppliers List"
            }


        },

        "ttnumber_form": {

          "errocampos": {
                "pt": "Preencha todos os campos!",
                "en": "Fill in all the fields!"
            },

          "errottnumber": {
                "pt": "Este Ticket Number já se encontra registrado! Seleccione outro.",
                "en": "This Ticket Number is already registered! Select another."
            },

          "semplano": {
                "pt": "Vazio",
                "en": "Empty"
            },

          "plano": {
                "pt": "Plano",
                "en": "Plan"
            },

          "tobeinvoiced": {
                "pt": "Para ser facturado",
                "en": "To be invoiced"
            },

          "reprazao": {
                "pt": "Razão",
                "en": "Reason"
            },

          "reprovarrazao": {
                "pt": "Informe a Razão da Reprovação",
                "en": "Enter the Reason for Disapproval"
            },

          "update": {
                "pt": "Editar",
                "en": "Update"
            },

          "guardar": {
                "pt": "Guardar",
                "en": "Save"
            },

          "chegadasite": {
                "pt": "Chegada ao Site",
                "en": "Site Arrival"
            },

          "propviagem": {
                "pt": "Tipo de Viagem",
                "en": "Travel Type"
            },

          "workreporte": {
                "pt": "Reporte do Trabalho",
                "en": "Work Report"
            },

          "tecniconome": {
                "pt": "Técnico",
                "en": "Client"
            },

          "cliente": {
                "pt": "Cliente",
                "en": "Technician"
            },

          "seminfo": {
                "pt": "Lista de Tickets Vazia",
                "en": "Empty Ticket List"
            },

            "newttnumber": {
                "pt": "Novos",
                "en": "New"
            },

            "onprogressttnumber": {
                "pt": "Em Progresso",
                "en": "In Progress"
            },

            "completettnumber": {
                "pt": "Completos",
                "en": "Complete"
            },

            "ttnumber": {
                "pt": "Ticket Number",
                "en": "Ticket Number"
            },

            "createttnumber": {
                "pt": "Criar Ticket Number",
                "en": "Create Ticket Number"
            },

            "cancelar": {
                "pt": "Cancelar",
                "en": "Cancel"
            },

            "create": {
                "pt": "Criar",
                "en": "Create"
            }
        },

        "manutencao_form": {

          "accao": {
            "pt": "Acção",
            "en": "Action"
          },

          "responsavel": {
            "pt": "Responsável",
            "en": "Responsable"
          },

          "addinfo": {
                "pt": "Info Ad",
                "en": "Add Info"
            },

          "audittrail": {
                "pt": "Auditoria",
                "en": "Audit Trail"
            },

          "planneddate": {
                "pt": "Data Planeada",
                "en": "Planned Date"
            },

            "planneddate1": {
                "pt": "Data",
                "en": "Date"
            },

          "region": {
                "pt": "Região",
                "en": "Region"
            },

            "supervisor1": {
                "pt": "Supervisor",
                "en": "Supervisor"
            },

          "maintenanceofficer1": {
                "pt": "Técnico ",
                "en": "Technician"
            },

          "sitenum": {
                "pt": "Número de Site",
                "en": "Site Number"
            },

            "sitenum1": {
                "pt": "Site",
                "en": "Site"
            },

          "quantityuse1": {
                "pt": "Quant. usada",
                "en": "Quant.y used"
            },

          "serialnumber1": {
                "pt": "Nr Série",
                "en": "Serial Nr"
            },

          "equiptype1": {
                "pt": "Tip. Equip.",
                "en": "Equip. Type"
            },

          "refuelreason1": {
                "pt": "Razão Reabast.",
                "en": "Ref. Reason" 
            },

          "previousrefuelhrs1": {
                "pt": "H. Reab. Ant.",
                "en": "Prev. Ref. H."
            },

          "remedialaction1": {
                "pt": "Ac. Correct.",
                "en": "Remed. Act."
            },

          "hsreason": {
                "pt": "Razão",
                "en": "Reason"
            },

          "gerador1": {
                "pt": "Gerador",
                "en": "Generator"
            },

          "currentgeneratorhours1": {
                "pt": "Horas actuais",
                "en": "Current Hours"
            },

          "probhsaf": {
                "pt": "Problemas de Saúde e Segurança",
                "en": "Health and Safety Problems"
            },
        
          "status": {
                "pt": "Estado",
                "en": "Status"
            },

            "reportedby": {
                "pt": "Reportado por",
                "en": "Reported By"
            },

            "siteinfo": {
                "pt": "Info. de Site",
                "en": "Site Info"
            },

            "jobcard": {
                "pt": "Lista de Cartão de trabalho",
                "en": "Job Card List"
            },

            "correctivemaint": {
                "pt": "Manutenção Correctiva",
                "en": "Corrective Maintenance"
            },

            "preventivemaint": {
                "pt": "Manutenção Preventiva",
                "en": "Preventive Maintenance"
            },

            "basicinfo": {
                "pt": "Informação Básica",
                "en": "Basic Information"
            },

            "cliente": {
                "pt": "Cliente",
                "en": "Client"
            },

            "tecnico": {
                "pt": "Técnico",
                "en": "Technician"
            },

            "reporte": {
                "pt": "Reporte",
                "en": "Report"
            },

            "departamento": {
                "pt": "Departamento",
                "en": "Department"
            },

            "regiao": {
                "pt": "Região",
                "en": "Region"
            },

            "jobtype": {
                "pt": "Tipo de trabalho",
                "en": "Job Type"
            },

            "jobinfo": {
                "pt": "Razão",
                "en": "Reason"
            },

            "clientenome": {
                "pt": "Nome",
                "en": "Name"
            },

            "clientebranch": {
                "pt": "Filial",
                "en": "Branch"
            },

            "clientetelefone": {
                "pt": "Telefone do Cliente",
                "en": "Cliente Phone Number"
            },

            "contactperson": {
                "pt": "Pessoa de Contacto",
                "en": "Contact Person"
            }, 

            "contactphone": {
                "pt": "Telefone da Pessoa de Contacto",
                "en": "Contact Person Phone"
            },

            "tecniconome": {
                "pt": "Nome",
                "en": "Name"
            },


            "loggedby": {
                "pt": "Registrado Por",
                "en": "Logged By"
            },

            "loggedon": {
                "pt": "Registrado em",
                "en": "Logged On"
            },

            "datareporte": {
                "pt": "Data relatada",
                "en": "Date reported"
            },

            "horareporte": {
                "pt": "Hora relatada",
                "en": "Time reported"
            },

            "quotacao": {
                "pt": "Quotação",
                "en": "Quotation"
            },

            "codigo": {
                "pt": "Numero Ref Comserv",
                "en": "Comserv Ref Number "
            },

            "travel": {
                "pt": "Info de Viagem",
                "en": "Travel Info"
            },

            "repair": {
                "pt": "Reparação de Equipamentos",
                "en": "Equipment Repairs"
            },

            "spare": {
                "pt": "Sobressalente Usado",
                "en": "Spare Used"
            },

            "departureplace": {
                "pt": "Local de Partida",
                "en": "Departure Place"
            },

            "kmreading": {
                "pt": "Leitor KM",
                "en": "KM Reading"
            },

            "departuredate": {
                "pt": "Data de Partida",
                "en": "Departure Date"
            },

            "departuretime": {
                "pt": "Hora de Partida",
                "en": "Departure Time"
            },

            "departure": {
                "pt": "Partida",
                "en": "Departure"
            },

            "sitearrival": {
                "pt": "Chegada ao Site",
                "en": "Site Arrival"
            },

            "sitearrivaldate": {
                "pt": "Data de Chegada ao Site",
                "en": "Site Arrival Date"
            },

            "sitearrivaltime": {
                "pt": "Hora de Chegada ao Site",
                "en": "Site Arrival Time"
            },

            "workdone": {
                "pt": "Trabalho feito",
                "en": "Work Done"
            },

            "remedialaction": {
                "pt": "Acção Correctiva",
                "en": "Remedial Action"
            },

            "healthsafety": {
                "pt": "Ocorreram problemas de Saúde e Segurança ?",
                "en": "Any Health and Safety issues occured ?"
            },

            "sitedeparturedate": {
                "pt": "Data de Partida do Site",
                "en": "Site Departure Date"
            },

            "sitedeparturetime": {
                "pt": "Hora de Partida do Site",
                "en": "Site Departure Time"
            },

            "sleeping": {
                "pt": "Vai dormir antes de continuar a viagem ?",
                "en": "Will you be sleeping before you travel further ?"
            },

            "totalsleep": {
                "pt": "Total de Horas de repouso",
                "en": "Total Hours Slept"
            },

            "sitedeparture": {
                "pt": "Partida do Site",
                "en": "Site Departure"
            },

            "nextdestination": {
                "pt": "Próximo Destino",
                "en": "Next Destination"
            },

            "destinationdate": {
                "pt": "Data de Chegada no Destino",
                "en": "Destination Arrival Date"
            },

            "destinationtime": {
                "pt": "Hora de Chegada no Destino",
                "en": "Destination Arrival Time"
            },

            "destinationplace": {
                "pt": "Destino",
                "en": "Destination Arrival Place"
            },

            "equiptype": {
                "pt": "Tipo de Equipamento",
                "en": "Equipment Type"
            },

            "manufacturer": {
                "pt": "Fabricante",
                "en": "Manufacturer"
            },

            "model": {
                "pt": "Modelo",
                "en": "Model"
            },

            "serialnumber": {
                "pt": "Número de Série",
                "en": "Serial Number"
            },

            "capacity": {
                "pt": "Capacidade",
                "en": "Capacity"
            },

            "type": {
                "pt": "Tipo",
                "en": "Type"
            },

            "fromstore": {
                "pt": "Da loja",
                "en": "From Store"
            },

            "maintenanceofficer": {
                "pt": "Oficial de Manutenção",
                "en": "Maintenance Officer"
            },

            "item": {
                "pt": "Item",
                "en": "Item"
            },

            "remaining": {
                "pt": "Restante",
                "en": "Remaining"
            },

            "quantityhave": {
                "pt": "Quantidade existente",
                "en": "Existing quantity"
            },

            "quantityuse": {
                "pt": "Quantidade usada",
                "en": "Quantity used"
            },

            "datauso": {
                "pt": "Data de uso",
                "en": "Date used"
            },

            "data": {
                "pt": "Data",
                "en": "Date"
            },

            "viagem": {
                "pt": "Viagem",
                "en": "Travel"
            },

            "visitsite": {
                "pt": "Visitar Site",
                "en": "Visit Site"
            },

            "gerador": {
                "pt": "Detalhes do Gerador ",
                "en": "Generator Details"
            },

            "previousgeneratorhours": {
                "pt": "Horas Anteriores do Gerador",
                "en": "Previous Generator Hours"
            },

            "currentgeneratorhours": {
                "pt": "Horas Actuais do Gerador",
                "en": "Current Generator Hours"
            },

            "previousrefuelhrs": {
                "pt": "Horas de Reabastecimento Anteriores",
                "en": "Previous Refuel Hours"
            },

            "generatorrefuel": {
                "pt": "Reabastecimento do Gerador (Litros)",
                "en": "Generator Refuel (Liters)"
            },

            "litersoil": {
                "pt": "Litros de óleo adicionado",
                "en": "Liters Oil Added"
            },

            "dsc": {
                "pt": "DSC Substituído ?",
                "en": "DSC Replaced ?" 
            },

            "refuelreason": {
                "pt": "Razão do Reabastecimento",
                "en": "Refuel Reason" 
            },

            "lastrefueldate": {
                "pt": "Data do Último Reabastecimento",
                "en": "Last Refuel Date" 
            },

            "generatorbeenserviced": {
                "pt": "O gerador foi reparado?",
                "en": "Has the generator been serviced ?" 
            },

            "hourslastservice": {
                "pt": "Horas do último serviço",
                "en": "Hours from last service" 
            },

            "fromto": {
                "pt": "De / Para",
                "en": "From / To"
            },

            "time": {
                "pt": "Hora",
                "en": "Time"
            },

            "distance": {
                "pt": "Distância(Km)",
                "en": "Distance(Km)"
            }

        },

        "site_info": {

          "secguardname1": {
                "pt": "Nome do Guar.",
                "en": "Guar. Name"
            },


          "secbinumber1": {
                "pt": "BI",
                "en": "ID"
            },

          "rectcabbatterycapac1": {
                "pt": "Cap. Bateria A/h",
                "en": "Battery A/h Cap."
            },

          "rectcabcabinetnumber1": {
                "pt": "Nr do Gab.",
                "en": "Cab. Nr"
            },

          "actype1": {
                "pt": "Tipo de AC",
                "en": "AC Type"
            },

          "acnumber1": {
                "pt": "Nr de AC",
                "en": "AC Nr"
            },

          "credelec": {
                "pt": "Número do medidor Credelec",
                "en": "Credelec Meter Number"
            },

          "guardsite": {
                "pt": "Existe um guarda no local ?",
                "en": "Is there a guard on site ?"
            },

          "fencingelectrified": {
                "pt": "A vedação está electrificada?",
                "en": "Is the fence electrified ?"
            },

          "addgenerator": {
                "pt": "Adicionar Gerador",
                "en": "Add Generator"
            },

            "updategenerator": {
                "pt": "Actualizar Gerador",
                "en": "Update Generator"
            },

            "addac": {
                "pt": "Adicionar AC",
                "en": "Add AC"
            },

            "updateac": {
                "pt": "Actualizar AC",
                "en": "Update AC"
            },

            "addrectcab": {
                "pt": "Adicionar Gabinete",
                "en": "Add Cabinet"
            },

            "updaterectcab": {
                "pt": "Actualizar Gabinete",
                "en": "Update Cabinet"
            },

            "addsecurity": {
                "pt": "Adicionar Guarda",
                "en": "Add Guard"
            },

            "updatesecurity": {
                "pt": "Actualizar Guarda",
                "en": "Update Guard"
            },

          "client": {
                "pt": "Cliente Associado",
                "en": "Associated Client"
            },

            "code": {
                "pt": "Codigo",
                "en": "Code"
            },
          
          "sitedetails": {
                "pt": "Detalhes do Site",
                "en": "Site Details"
            },

            "gerador": {
                "pt": "Gerador",
                "en": "Generator"
            },

            "ac": {
                "pt": "Ar condicionado",
                "en": "Air conditioning"
            },

            "rectifier": {
                "pt": "Gabinete do rectificador",
                "en": "Rectifier Cabinet"
            },

            "seguranca": {
                "pt": "Segurança",
                "en": "Security"
            },

            "electricity": {
                "pt": "Fornecimento de eletricidade",
                "en": "Electricity Supply"
            },

            "sitename": {
                "pt": "Nome do Site",
                "en": "Site Name"
            },

            "sitenum": {
                "pt": "Número de Site",
                "en": "Site Number"
            },

            "regiao": {
                "pt": "Região",
                "en": "Region"
            },

            "area": {
                "pt": "Área",
                "en": "Area"
            },

            "regiaoselmec": {
                "pt": "Região Selmec",
                "en": "Selmec Office Region"
            },

            "radiotec": {
                "pt": "Tecnologia de Rádio",
                "en": "Radio Technology"
            },

            "planmaintdate": {
                "pt": "Data da Manutenção Planeada",
                "en": "Planned Maintenance Date"
            },

            "siteclassif": {
                "pt": "Classificação de Site",
                "en": "Site Classification"
            },

            "siteannoucdate": {
                "pt": "Data de Anúncio do Site",
                "en": "Site Announce Date"
            },

            "siteonairdate": {
                "pt": "Data do Site No Ar",
                "en": "Site On Air Date"
            },

            "pacdate": {
                "pt": "Data PAC",
                "en": "PAC Date"
            },

            "btslinkedsite": {
                "pt": "BTS ligado ao Site",
                "en": "BTS Linked With Site"
            },

            "maintoff": {
                "pt": "Oficial de Manutenção",
                "en": "Maintenance Officer"
            },

            "techcontactnum": {
                "pt": "Telefone do Técnico",
                "en": "Technician Contact Number"
            },


            "typesite": {
                "pt": "Tipo de Site",
                "en": "Type of site"
            },

            "phasenum": {
                "pt": "Número de fase do site",
                "en": "Site Phase Number"
            },

            "location": {
                "pt": "Detalhes da Localização",
                "en": "Location Details"
            },

             "activity": {
                "pt": "Detalhes da actividade",
                "en": "Activity Details"
            },

             "geradorinst": {
                "pt": "Gerador instalado",
                "en": "Generator installed"
            },

            "sim": {
                "pt": "Sim",
                "en": "Yes"
            },

            "nao": {
                "pt": "Não",
                "en": "No"
            },

            "acinst": {
                "pt": "Ac instalado",
                "en": "Ac installed"
            },

            "acinst1": {
                "pt": "Instalado",
                "en": "Installed"
            },

            "rectifiercabinnetinst": {
                "pt": "Gabinete do retificador instalado",
                "en": "Rectifier cabinet installed"
            },

            "fencinginst": {
                "pt": "Vedação",
                "en": "Fencing"
            },

            "elecsupptype": {
                "pt": "Tipo de Fornecimento de Electricidade",
                "en": "Electricity Supply Type"
            },

            "electype": {
                "pt": "Tipo de Electricidade",
                "en": "Electricity Type"
            },

            "electypesingle": {
                "pt": "Fase Única",
                "en": "Single Phase"
            },

            "electypethree": {
                "pt": "Trifásico",
                "en": "Three Phase"
            },

            "listasiteinfo": {
                "pt": "Lista de informação de sites",
                "en": "Site information list"
            },

            "numero": {
                "pt": "Número",
                "en": "Number"
            },

            "generatortype": {
                "pt": "Tipo de Gerador",
                "en": "Generator Type"
            },
            "generatortype1": {
                "pt": "Tipo",
                "en": "Type"
            },

            "outputkw": {
                "pt": "Saída KW",
                "en": "Output KW"
            },

            "detalhesgerador": {
                "pt": "Detalhes do Gerador",
                "en": "Generator Details"
            },

            "modelno": {
                "pt": "Nr do Modelo",
                "en": "Model No"
            },

            "modelno1": {
                "pt": "Modelo",
                "en": "Model"
            },

            "engineserialnumber": {
                "pt": "Número de Série do Motor",
                "en": "Engine Serial Number"
            },

            "enginecapacity": {
                "pt": "Capacidade do motor",
                "en": "Engine Capacity"
            },

            "enginecapacity1": {
                "pt": "Cap. do motor",
                "en": "Engine Cap."
            },

            "startertype": {
                "pt": "Tipo Inicial",
                "en": "Starter Type"
            },

            "fuelconsumption": {
                "pt": "Consumo de Combustível",
                "en": "Fuel Consumption"
            },

             "fuelconsumption1": {
                "pt": "Combustível",
                "en": "Fuel"
            },


            "detalhesac": {
                "pt": "Detalhes do Ar Condicionado",
                "en": "Air Conditioning Details"
            },

            "acmanufacturer": {
                "pt": "Fabricante",
                "en": "Manufacturer"
            },

            "actype": {
                "pt": "Tipo de Ar Condicionado",
                "en": "Air Conditioning Type"
            },

            "acmodel": {
                "pt": "Modelo",
                "en": "Model"
            },

            "acnumber": {
                "pt": "Número de Ar Condicionado",
                "en": "Air Conditioning Number"
            },

            "acserialnumber": {
                "pt": "Número de Série",
                "en": "Serial Number"
            },

            "accageinstalled": {
                "pt": "Armação Instalada",
                "en": "Cage Installed"
            },

            "acsleeveinstalled": {
                "pt": "Bucha Instalada",
                "en": "Sleeve Installed"
            },

            "acunitcontrolltype": {
                "pt": "Tipo de Controlador de Unidade",
                "en": "Unit Controller Type"
            },

            "accontrollermodel": {
                "pt": "Modelo de Controle",
                "en": "Controller Model"
            },

            "rectcabcabinetmodelno": {
                "pt": "Nr de Modelo do Gabinete",
                "en": "Cabinet Model No"
            },

            "rectcabcabinetnumber": {
                "pt": "Número do Gabinete",
                "en": "Cabinet Number"
            },

            "rectcabtype": {
                "pt": "Tipo",
                "en": "Type"
            },

            "rectcabinputtype": {
                "pt": "Tipo de Entrada",
                "en": "Input Type"
            },

            "rectcabnobatteries": {
                "pt": "Nr de Baterias",
                "en": "No of Batteries"
            },

            "rectcabbatterycapac": {
                "pt": "Capacidade da Bateria A/h",
                "en": "Battery A/h Capacity"
            },

            "detalhessecurity": {
                "pt": "Detalhes da Segurança",
                "en": "Security Details"
            },

            "secguardname": {
                "pt": "Nome do Guarda",
                "en": "Guard Name"
            },


            "secbinumber": {
                "pt": "Número de B.I.",
                "en": "B.I. Number"
            },

            "secvalue": {
                "pt": "Valor",
                "en": "Value"
            },

            "elecpayment": {
                "pt": "Pagamento da Electricidade",
                "en": "Electricity Payment"
            }
        },
        

        "inspdiaria_home": {
            "motorista": {
                "en": "Driver",
                "pt": "Motorista"
            },
            "matricula": {
                "en": "R.Number",
                "pt": "Matricula"
            },
            "data_hora": {
                "en": "Date Hour",
                "pt": "Data Horas"
            },

            "lista_diaria": {
                "en": "Daily Inspection list",
                "pt": "Lista de Inspeção Diaria"
            },
            "historico": {
                "en": "History",
                "pt": "Historico"
            },
             "lista_viaturas": {
                "en": "Vehicles list",
                "pt": "Lista de Viaturas"
            },
            "data_inspecao": {
                "en": "Inspection date",
                "pt": "Data de inspecção"
            },
            "tipo_accao": {
                "en": "Action type",
                "pt": "Tipo de acção"
            },
             "problemas": {
                "en": "Problems",
                "pt": "Problemas"
            },
            "razoes": {
                "en": "Give Reasons",
                "pt": "Definir as razões"
            },
            "lista_vazia": {
                "en": "Empty",
                "pt": "Vazio"
            },
        },
        "utilizador_home": {
            "nome": {
                "en": "Name",
                "pt": "Nome"
            },
            "area": {
                "en": "Workplace",
                "pt": "Provincia"
            },
            "data": {
                "en": "Record Date",
                "pt": "Data de registo"
            },

            "registadopor": {
                "en": "Registed by",
                "pt": "Registado por"
            },
            "lista_vazia": {
                "en": "Empty",
                "pt": "Vazio"
            },
            "lista": {
                "en": "User List",
                "pt": "Lista de Utilizadores"
            },
        },
        "transferencia_home": {
            "Marca_Matricula": {
                "en": "Make-R.Num",
                "pt": "Marca"
            },
            "de": {
                "en": "From",
                "pt": "De"
            },
            "para": {
                "en": "To",
                "pt": "Para"
            },

            "Data_Hora": {
                "en": "Date Hours",
                "pt": "Data Hora"
            },
            "lista_vazia": {
                "en": "Empty",
                "pt": "Vazio"
            },
            "lista": {
                "en": "Transference List",
                "pt": "Lista de Transferencia"
            },
        },

        "inspdiaria_form": {
            "oleo": {
                "en": "Oil/Water",
                "pt": "Oleo/Agua"
            },

            "Vidro_Frontal": {
                "en": "Front Glass",
                "pt": "Vidro Frontal"
            },
            "Vidro_Traseiro": {
                "en": "Rear Glass",
                "pt": "Vidro Traseiro"
            },
            "Vidro_Lateral_esquerdo": {
                "en": "Left Glass",
                "pt": "Vidro Lateral esquerdo"
            },
            "Vidro_Lateral_direito": {
                "en": "Right Glass",
                "pt": "Vidro Lateral direito"
            },
            "Espelho_esquerdo": {
                "en": "Left Mirror",
                "pt": "Espelho esquerdo"
            },
            "Espelho_direito": {
                "en": "Right Mirror",
                "pt": "Espelho direito"
            },
            "Espelho_Interno": {
                "en": "Rearview Mirror",
                "pt": "Espelho Interno"
            },
            "Parachoque_Frontal": {
                "en": "Front Bumper",
                "pt": "Parachoque Frontal"
            },
            "Parachoque_Traseiro": {
                "en": "Rear Bumper",
                "pt": "Parachoque Traseiro"
            },
            "porta_esquerda": {
                "en": "Left Door",
                "pt": "Porta esquerda"
            },
            "Porta_direita": {
                "en": "Right Door",
                "pt": "Porta direita"
            },
            "capo": {
                "en": "Bonnet",
                "pt": "capo"
            },
            "canopy": {
                "en": "canopy",
                "pt": "canopy"
            },
            "grelha": {
                "en": "Grill",
                "pt": "grelha"
            },
            "Farol_frontal_esquerdo": {
                "en": "Left light",
                "pt": "Farol frontal esquerdo"
            },
            "Farol_frontal_direito": {
                "en": "Right Front light",
                "pt": "Farol frontal direito"
            },
            "Indicador frontal_esquerdo": {
                "en": "Front left indicator ",
                "pt": "Indicador frontal esquerdo"
            },
            "Indicador frontal_direito": {
                "en": "Front right indicator",
                "pt": "Indicador frontal direito"
            },
            "Indicador lateral esquerdo": {
                "en": "Left side indicator",
                "pt": "Indicador lateral esquerdo"
            },
            "Indicador lateral_direito": {
                "en": "Right side indicator",
                "pt": "Indicador lateral direito"
            },
            "Farol traseiro_esquerdo": {
                "en": "Rear left Lights",
                "pt": "Farol traseiro esquerdo"
            },
            "Farol traseiro_direito": {
                "en": "Rear Right Lights",
                "pt": "Farol traseiro direito"
            },
            "Oleo_de_travao": {
                "en": "Brake fluid",
                "pt": "Oleo de travao"
            },
            "Oleo_do_motor": {
                "en": "Engine oil",
                "pt": "Oleo do motor"
            },
            "Agua_do_radiador": {
                "en": "Radiator water ",
                "pt": "Agua do radiador"
            },
            "Agua_de_limpa_brisa": {
                "en": "Wiper water",
                "pt": "Agua de limpa-brisa"
            },
            "Refrigeração": {
                "en": "Cooling",
                "pt": "Refrigeração"
            },
            "Travão": {
                "en": "Brake",
                "pt": "Travão"
            },
            "Travão_de_estacionamento": {
                "en": "Parking brake",
                "pt": "Travão de estacionamento"
            },
            "Frontal": {
                "en": "Front",
                "pt": "Frontal"
            },
            "Traseira": {
                "en": "Rear",
                "pt": "Traseira"
            },
            "mensagem_de_erro": {
                "en": "Error message",
                "pt": "mensagem de erro"
            },

            "marca_modelo": {
                "en": "Make & Model",
                "pt": "Marca & Modelo"
            },
            "de": {
                "en": "From",
                "pt": "De"
            },
            "simm": {
                "en": "Yes",
                "pt": "Sim"
            },
            "naoo": {
                "en": "No",
                "pt": "Não"
            },
            "para": {
                "en": "To",
                "pt": "Para"
            },
            "dados_gerais": {
                "en": "Basic Information",
                "pt": "Dados Gerais"
            },
            "motorista": {
                "en": "Driver",
                "pt": "Motorista"
            },
            "matricula": {
                "en": "Registration Number",
                "pt": "Matricula"
            },
            "data_hora": {
                "en": "Date Hour",
                "pt": "Data Horas"
            },

            "lista_diaria": {
                "en": "Daily Inspection list",
                "pt": "Lista de Inspeção Diaria"
            },
            "kilometros": {
                "en": "kilometers",
                "pt": "kilometros"
            },
            "carrocaria": {
                "en": "Body",
                "pt": "Carroçaria"
            },
            "roda": {
                "en": "Wheels",
                "pt": "Rodas"
            },
            "pneus": {
                "en": "Tyre",
                "pt": "pneus"
            },
            "pressao": {
                "en": "Pressure",
                "pt": "pressao"
            },
            "porcas": {
                "en": "Nuts",
                "pt": "Porcas"
            },
            "vidros": {
                "en": "Glass/Mirror",
                "pt": "Vidros/Espelhos"
            },
            "limpa_parabrisa": {
                "en": "Wipers",
                "pt": "Limpa-parabrisas"
            },
            "luzes": {
                "en": "Lights",
                "pt": "Luzes"
            },
            "motor": {
                "en": "Engine",
                "pt": "Motor"
            },
            "oleo": {
                "en": "Oil/Water",
                "pt": "Oleo/Agua"
            },
            "travao": {
                "en": "Brake",
                "pt": "Travões"
            },
            "camera": {
                "en": "Camera",
                "pt": "Camera"
            },
            "maoslivres": {
                "en": "Handsfree",
                "pt": "Mãos-livre"
            },
            "selecionar": {
                "en": "Select the part(s)",
                "pt": "Selecione a(s) parte(s)"
            }
        },

        "utilizador_form": {

            "code": {
                "en": "Código",
                "pt": "Code"
            },

            "pettycashamount": {
                "en": "Valor Pettycash",
                "pt": "Pettycash Amount"
            },

            "gravar": {
                "en": "Save",
                "pt": "registar"
            },
            "enviar_po":{
              "en":"sent for Approval",
              "pt":"Enviar para aprovacao"

            },
            "cancelar": {
                "en": "Cancel",
                "pt": "Cancelar"
            },
            "dados_basicos": {
                "en": "Basic Information",
                "pt": "Dados Básicos"
            },
            "nome": {
                "en": "Name",
                "pt": "Nome"
            },
            "carta_conducao": {
                "en": "License Drive",
                "pt": "Carta de condução"
            },
            "data_nasc": {
                "en": "Birth Date",
                "pt": "Data de Nascimento"
            },
            "validade_carta": {
                "en": "License Validation",
                "pt": "Validade da carta"
            },
            "area": {
                "en": "Workplace",
                "pt": "Local de Trabalho"
            },
            "regiao": {
                "en": "Region",
                "pt": "Região"
            },
            "departamento": {
                "en": "Department",
                "pt": "Departamento"
            },

            "provincia": {
                "en": "Province",
                "pt": "Província"
            },
            "kilometros": {
                "en": "kilometers",
                "pt": "kilometros"
            },
            "supervisor": {
                "en": "Supervisor",
                "pt": "Supervisor"
            },
            "telefone_super": {
                "en": "Cellphone Supervisor",
                "pt": "Telefone do supervisor"
            },
            "funcao": {
                "en": "Function",
                "pt": "Função"
            },
            "veiculo": {
                "en": "Vehicle",
                "pt": "Viatura"
            },
            "matricula": {
                "en": "Reg. Number",
                "pt": "Matricula"
            },
            "marca": {
                "en": "Make",
                "pt": "Marca"
            },
            "modelo": {
                "en": "Model",
                "pt": "Modelo"
            },
            "ano": {
                "en": "Acquisition year",
                "pt": "Ano de aquisição"
            },
            "kilometros": {
                "en": "Kilometers",
                "pt": "Kilometragem"
            },
            "cantacto": {
                "en": "Contacts",
                "pt": "Contactos"
            },
            "telefone": {
                "en": "Cellphone Number",
                "pt": "Telefone"
            },
            "credenciais": {
                "en": "Credencials",
                "pt": "Credenciais"
            },
            "username": {
                "en": "Username",
                "pt": "Nome do Utilizador"
            },
            "nivel_acesso": {
                "en": "Access Level",
                "pt": "Nivel de Acesso"
            },
            "password": {
                "en": "Password",
                "pt": "Palavra passe"
            },
            "confirmacao": {
                "en": "Confirm Password",
                "pt": "Confirmar palavra passe"
            }
        },

        "pesquisar": {
            "en": "Search",
            "pt": "Pesquisar"
        },


        "form": {
            "nome": {
                "pt": "Zé dos Anzóis",
                "en": "John Doe",
                "es": "Fulano de Tal"
            },

            "registar": {
                "pt": "Enviar",
                "en": "Send"
            }
        },

        "site_home": {
            "seminfo": {
                "pt": "Sem informação da inspecção do site",
                "en": "No site inspection information"
            },

            "lista": {
                "pt": "Lista de Inspecção Site",
                "en": "Site Inspection List"
            },

            "doneby": {
                "pt": "Realizado por",
                "en": "Done by"
            },

            "numerosite": {
                "pt": "Número de site",
                "en": "Site number"
            },

            "dataplaneada": {
                "pt": "Data Planeada",
                "en": "Planned Date"
            },

            "oficial": {
                "pt": "Of. de Manut.",
                "en": "Maint. Of."
            },

            "estado": {
                "pt": "Estado",
                "en": "Status"
            }

        },

        "site_form": {
            "checkedby": {
                "pt": "Verificado por",
                "en": "Checked by"
            },

            "empresa": {
                "pt": "Empresa",
                "en": "Company"
            },

            "oficial": {
                "pt": "Oficial de Manutenção",
                "en": "Maintenance Officer"
            },

            "location": {
                "pt": "Localização do Site",
                "en": "Site Location"
            },

            "numerosite": {
                "pt": "Número do site",
                "en": "Site number"
            },

            "nomesite": {
                "pt": "Nome do site",
                "en": "Site name"
            },

            "tiposite": {
                "pt": "Tipo de site",
                "en": "Site type"
            },

            "ttnumero": {
                "pt": "Número de TT",
                "en": "TT Number"
            }

        },

        "seguro_form": {
            "safety": {
                "pt": "Segurança",
                "en": "Safety"
            },

            "pergunta1": {
                "pt": "1. Certifique-se de que o veículo esteja seguro antes de começar o trabalho.",
                "en": "1.Ensure that the vehicle is safe and secure before commencing with work."
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Assegure-se de que todo o pessoal esteja seguro antes de iniciar o trabalho.",
                "en": "2. Ensure that all personnel are safe before commencing with work."
            },

            "pergunta3": {
                "pt": "3. Use capacete no local.",
                "en": "3. Wear hard hat on site."
            },

            "pergunta4": {
                "pt": "4. Inspecione todos os dispositivos de detenção de queda, antes de usá-los.",
                "en": "4. Inspect all Fall-Arrest devices for safeness before using it."
            }
        },

        "site_options": {
            "infobasic": {
                "pt": "Informação Básica",
                "en": "Basic Information",
            },

            "safety": {
                "pt": "Segurança",
                "en": "Safety",
            },

            "extboar": {
                "pt": "Quad. de Dist. Ext.",
                "en": "Ext D. Board"
            },

            "container": {
                "pt": "Contentor",
                "en": "Container"
            },

            "arcond": {
                "pt": "Ar condicionado",
                "en": "Air conditioner"
            },

            "mast": {
                "pt": "Mastro",
                "en": "Mast"
            },

            "alarme": {
                "pt": "Alarme",
                "en": "Alarm"
            },

            "gerador": {
                "pt": "Gerador",
                "en": "Generator"
            },

            "telhado": {
                "pt": "Telhado",
                "en": "Roof Top"
            },

            "sitegeral": {
                "pt": "Site Geral",
                "en": "Site General"
            }
        },

        "edBoardOb_form": {
            "extdist": {
                "pt": "Quadro de Distribuição Externa",
                "en": "External Distribution Board"
            },

            "pergunta1": {
                "pt": "1. Verifique todas as conexões.",
                "en": "1. Check all connections."
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Verifique o funcionamento de medidores de energia.",
                "en": "2.Check funtioning of energy meters."
            },

            "pergunta3": {
                "pt": "3. Verifique o funcionamento de todos os mecanismos de comutação.",
                "en": "3. Check operation of all switching mechanisms."
            },

            "pergunta4": {
                "pt": "4. Verifique todos os orifícios do quadro de distribuição e as mangas.",
                "en": "4.Check all holes on distribution board and sleeves."
            },

            "pergunta5": {
                "pt": "5. Verifique a luz do local e mude a operação.",
                "en": "5.Check site light and switch operation."
            },

            "pergunta6": {
                "pt": "6. Inspecione a pintura no quadro de distribuição e no poste da luz de fundo.",
                "en": "6. Inspect paintwork on DB and sitelight pole."
            },

            "pergunta7": {
                "pt": "7. Inspecione a caixa do medidor do fornecedor de AC e relate todos os defeitos.",
                "en": "7.Inspect AC Supplier meter box and report any defects."
            }
        },

        "container_form": {
            "container": {
                "pt": "Contentor",
                "en": "Container"
            },

            "pergunta1": {
                "pt": "1. Verifique a luz do container.",
                "en": "1. Check container ligh"
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Verifique todos os disjuntores no quadro de distribuição interno se estiver com defeito.",
                "en": "2. Check all circuit breakers on internal DB if faulty."
            },

            "pergunta3": {
                "pt": "3. Verifique se todas as conexões terra contém pasta anti-corrosão.",
                "en": "3. Check if all earth connections with anti-corrosion paste."
            },

            "pergunta4": {
                "pt": "4. Verifique o estado das paredes, telhado, piso",
                "en": "4. Check condition of walls, roof, floor."
            },

            "pergunta5": {
                "pt": "5. Verifique o telhado para entrada de água.",
                "en": "5. Check roof for water ingress."
            },

            "pergunta6": {
                "pt": "6. Verifique a pintura.",
                "en": "6. Check paintwork."
            },

            "pergunta7": {
                "pt": "7. Verifique todas as juntas, furos e entradas de cabos.",
                "en": "7. Check all joints,holes and cable entries"
            },

            "pergunta8": {
                "pt": "8. Verifique a instalação de equipamentos de transmissão e rádio",
                "en": "8. Check transmission and radio equipment instalation."
            }
        },

        "airCond_form": {
            "arcond": {
                "pt": "Ar condicionado",
                "en": "Air conditioner"
            },

            "pergunta1": {
                "pt": "1. Verifique as pás do ventilador.",
                "en": "1. Check fan blades."
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Verifique se há algum ruído ou vibração anormal.",
                "en": "2. Check for any abnormal noise or vibration."
            },

            "pergunta3": {
                "pt": "3. Verifique todas as linhas de refrigerante.",
                "en": "3. Check all refrigerant lines."
            },

            "pergunta4": {
                "pt": "4. Certifique-se de que o revestimento esteja devidamente vedado.",
                "en": "4. Ensure casing is properly sealed."
            },

            "pergunta5": {
                "pt": "5. Verifique se há ferrugem no ar condicionado.",
                "en": "5. Check for any rust on air conditioner."
            }
        },

        "mast_form": {
            "mastro": {
                "pt": "Mastro",
                "en": "Mast"
            },

            "pergunta1": {
                "pt": "1. Verifique o funcionamento da luz A / W.",
                "en": "1. Check A/W light functioning."
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Certifique-se de que o quadro de distribuição de luz A / W e a conexão estejam seguras no mastro.",
                "en": "2. Ensure A/W light DB and fitting is secure on mast."
            },

            "pergunta3": {
                "pt": "3. Verifique e inspecione a torre.",
                "en": "3. Check and inspect tower."
            },

            "pergunta4": {
                "pt": "4. Inspeção visual da transmissão e instalação de rádio.",
                "en": "4. Check the paint on the tower."
            },

            "pergunta5": {
                "pt": "5. Inspeção visual da transmissão e instalação de rádio.",
                "en": "5.Visual inspection of transmission and radio installation."
            },

            "pergunta6": {
                "pt": "6. Especificação da torre.",
                "en": "6. Tower Specification."
            }
        },

        "alarm_form": {
            "alarme": {
                "pt": "Alarme",
                "en": "Alarm"
            },

            "pergunta1": {
                "pt": "1. Alarme de intrusão",
                "en": "1. Intruder alarm"
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Alarme de movimento",
                "en": "2. Movement alarm"
            },

            "pergunta3": {
                "pt": "3. Alarme de alta temperatura",
                "en": "3. High temp alarm"
            },

            "pergunta4": {
                "pt": "4. Alarme do sistema de retificador",
                "en": "4. Rectifier system alarm"
            },

            "pergunta5": {
                "pt": "5. Alarme do módulo retificador",
                "en": "5. Rectifier module alarm"
            },

            "pergunta6": {
                "pt": "6. Alarme do arcond 1",
                "en": "6. Aircon 1 alarm"
            },

            "pergunta7": {
                "pt": "7. Alarme do arcond 2",
                "en": "7. Aircon 2 alarm"
            },

            "pergunta8": {
                "pt": "8. Alarme de combustível baixo gerador",
                "en": "8. Generator low fuel alarm"
            },

            "pergunta9": {
                "pt": "9. Alarme anormal do gerador",
                "en": "9. Generator abnormal alarm"
            },

            "pergunta10": {
                "pt": "10. Alarme de aviso de aeronave",
                "en": "10. Aircraft warning alarm"
            },

            "pergunta11": {
                "pt": "11. Alarme de fumo",
                "en": "11. Smoke alarm"
            },

            "pergunta12": {
                "pt": "12. Alarme de falha de rede do ar condicionado",
                "en": "12. AC mains failure alarm"
            },

            "pergunta13": {
                "pt": "13. Alarme de bateria baixa",
                "en": "13. Battery low alarm"
            },

            "pergunta14": {
                "pt": "14. Alarme de funcionamento do gerador",
                "en": "14. Generator running alarm"
            }
        },

        "generator_form": {
            "gerador": {
                "pt": "Gerador",
                "en": "Generator"
            },

            "generatorhour": {
                "pt": "Horas actuais do gerador",
                "en": "Generator Current Hours"
            },

            "generatorfuellevel": {
                "pt": "Nível de combustível do gerador",
                "en": "Generator Fuel Level"
            },

            "pergunta1": {
                "pt": "1. Nível de óleo do motor",
                "en": "1. Engine oil level"
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta2": {
                "pt": "2. Vazamento de óleo",
                "en": "2. Oil leaks"
            },

            "pergunta3": {
                "pt": "3. Mangueiras do radiador (flexíveis, livre de vazamentos)",
                "en": "3. Radiator hoses (flexible, leak- free)"
            },

            "pergunta4": {
                "pt": "4. Verifique o filtro de ar",
                "en": "4.Check air filter"
            },

            "pergunta5": {
                "pt": "5. Vazamentos do refrigerador",
                "en": "5. Coolant leaks"
            },

            "pergunta6": {
                "pt": "6. Inspeccione visualmente a condição da correia trapezoidal",
                "en": "6.Visually inspect V-belt condition"
            },

            "pergunta7": {
                "pt": "7. Vazamentos de combustível",
                "en": "7. Fuel leaks"
            },

            "pergunta8": {
                "pt": "8. Verifique visualmente o nível de electrólito da bateria, conexões e condição física",
                "en": "8. Visually check battery electrolyte level, connections and physical condition"
            },

            "pergunta9": {
                "pt": "9. Verifique os interruptores do selector e estado do disjuntor correcto",
                "en": "9. Check Selector switches and breaker status correct"
            },

            "pergunta10": {
                "pt": "10. Verifique o estado do painel de controle e registrar os alarmes activos",
                "en": "10. Check status of control panel and record active alarms"
            },

            "pergunta11": {
                "pt": "11. Verifique se há vibrações anormais",
                "en": "11. Check for abnormal vibrations"
            },

            "pergunta12": {
                "pt": "12. Verifique se há ferrugem",
                "en": "12. Check for rust"
            },

            "pergunta13": {
                "pt": "13. Verifique todas as montagens e suportes do gerador",
                "en": "13. Check all mountings and generator brackets"
            },

            "pergunta14": {
                "pt": "14. Verifique a condição geral / condição do dossel",
                "en": "14. Check overall condition / Canopy condition"
            }
        },

        "roofTop_form": {
            "rooftop": {
                "pt": "Telhado",
                "en": "Roof Top"
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta1": {
                "pt": "1. Verifique os pólos de montagem, se estão instalados correctamente",
                "en": "1. Check the mounting poles if properly installed"
            },

            "pergunta2": {
                "pt": "2. Verifique se os pólos não tem corrosão",
                "en": "2. Check the poles if no corrosions "
            },

            "pergunta3": {
                "pt": "3. Verifique se os pólos estão aterrados",
                "en": "3. Check the poles if earthed"
            },

            "pergunta4": {
                "pt": "4. Verifique se os armários (de TX e baterias) possuem qualquer dano ou corrosão",
                "en": "4. Check the cabinets ( of TX and baterries ) for any damage or corosion"
            },

            "pergunta5": {
                "pt": "5. Verifique a instalação de equipamentos de transmissão e rádio",
                "en": "5.Check transmission and radio equipment instalation"
            }
        },

        "site_general_form": {
            "sitegeral": {
                "pt": "Site Geral",
                "en": "Site General"
            },

            "comentarios": {
                "pt": "Comentários",
                "en": "Comments"
            },

            "imagem": {
                "pt": "Carregar imagem",
                "en": "Load picture"
            },

            "pergunta1": {
                "pt": "1. Verifique a cerca, portões, fechaduras e dobradiças.",
                "en": "1. Check the fence, gates, locks and hinges."
            },

            "pergunta2": {
                "pt": "2. Assegure-se de que toda a sinalização esteja em ordem.",
                "en": "2. Ensure all signage is in order."
            },

            "pergunta3": {
                "pt": "3. Verifique todos os danos causados pela água ao terreno.",
                "en": "3. Check all water damage to terrain."
            },

            "pergunta4": {
                "pt": "4. Verifique o nível de pedra esmagada dentro do site.",
                "en": "4.Level crushed stone inside site."
            },

            "pergunta5": {
                "pt": "5. Certifique-se de que a área do site esteja limpa.",
                "en": "5. Ensure the site area is clean."
            },

            "pergunta6": {
                "pt": "6. Verifique todas ervas daninhas e grama de cerca de 2.5m ao redor do local.",
                "en": "6. Check all weeds and grass 2.5m arount site fence."
            },

            "pergunta7": {
                "pt": "7. Verifique e relate qaisquer defeitos na estrada de acesso.",
                "en": "7. Check and report any defects on access road."
            },

            "pergunta8": {
                "pt": "8. Verifique se há lixo no fio da navalha.",
                "en": "8. Check for rubish from razor wire."
            }
        },
        "estatistica": {
            "inspanual": {
                "pt": "Inspecção Anual",
                "en": "Annual Inspection"
            },
            "inspmensal": {
                "pt": "Inspecção Mensal",
                "en": "Monthly Inspection"
            },
            "inspregional": {
                "pt": "Inspecção Regional",
                "en": "Regional Inspection"
            },
            "insptecnicos": {
                "pt": "Inspecção dos técnicos",
                "en": "Technician Inspection"
            }
        }
    }
};

(function () {
	this.I18n = function (defaultLang) {
    // var lang = defaultLang || 'pt';
    var lang =$(".lang-picker").attr("value");
		this.language = lang;

		(function (i18n) {
			i18n.contents = demoJson;
			i18n.contents.prop = function (key) {
				var result = this;
				var keyArr = key.split('.');
				for (var index = 0; index < keyArr.length; index++) {
					var prop = keyArr[index];
					result = result[prop];
				}
				return result;
			};
			i18n.localize();
		})(this);
	};

	this.I18n.prototype.hasCachedContents = function () {
		return this.contents !== undefined;
	};

	this.I18n.prototype.lang = function (lang) {
		if (typeof lang === 'string') {
			this.language = lang;
		}
		this.localize();
		return this.language;
	};

	this.I18n.prototype.localize = function () {
		var contents = this.contents;
		if (!this.hasCachedContents()) {
			return;
		}
		var dfs = function (node, keys, results) {
			var isLeaf = function (node) {
				for (var prop in node) {
					if (node.hasOwnProperty(prop)) {
						if (typeof node[prop] === 'string') {
							return true;
						}
					}
				}
			}
			for (var prop in node) {
				if (node.hasOwnProperty(prop) && typeof node[prop] === 'object') {
					var myKey = keys.slice();
					myKey.push(prop);
					if (isLeaf(node[prop])) {
						//results.push(myKey.reduce((prev, current) => prev + '.' + current));	//not supported in older mobile broweser
						results.push(myKey.reduce( function (previousValue, currentValue, currentIndex, array) {
							return previousValue + '.' + currentValue;
						}));
					} else {
						dfs(node[prop], myKey, results);
					}
				}
			}
			return results;
		};
		var keys = dfs(contents, [], []);
		for (var index = 0; index < keys.length; index++) {
			var key = keys[index];
			if (contents.prop(key).hasOwnProperty(this.language)) {
				$('[data-i18n="'+key+'"]').text(contents.prop(key)[this.language]);
				$('[data-i18n-placeholder="'+key+'"]').attr('placeholder', contents.prop(key)[this.language]);
				$('[data-i18n-value="'+key+'"]').attr('value', contents.prop(key)[this.language]);
			} else {
				$('[data-i18n="'+key+'"]').text(contents.prop(key)['en']);
				$('[data-i18n-placeholder="'+key+'"]').attr('placeholder', contents.prop(key)['en']);
				$('[data-i18n-value="'+key+'"]').attr('value', contents.prop(key)['en']);
			}
		}
	};

}).apply(window);

// **************************************************seccao de adicionar itens ******************************************************



// $('#lembrete').datepicker({
//         autoClose : true,
//         format : 'dd mmm yyyy',
//         yearRange : 1,
//         minDate : new Date(),
//       });

