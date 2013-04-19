function calculateBAC(){ 
        var weight = document.getElementById("weight").value;        
        
        if ( (weight == "") || (weight <= 0) ) {
                $('#weight').css("background-color", "red");
                document.getElementById("weight-val").innerHTML="Please enter valid weight.";
        }
        else {
                if ($('#male').hasClass('active')) {
                    var genderMultiplier = .58;
                } else {
                    var genderMultiplier = .49;
                    var gender = "Female";
                }
                
                // In case it was checked before
                $('#weight').css("background-color", "white");
                $('#weight-val').hide();
        
                var alcoholPct = document.getElementById("alcoholPct").value;
                var quantity = document.getElementById("quantity").value;
                var hours = document.getElementById("hours").value;
                
                // Check to see if kg or lbs
                if (document.getElementById('kg').checked){
                        var lbsToKg = weight;
                }
                else {
                        var lbsToKg = weight/2.2046;
                }
                
                var totalBodyWater = lbsToKg*genderMultiplier*1000;
                var oneOzAlcohol = 29.57*0.79;
                var oneOzAlcoholUser = oneOzAlcohol/totalBodyWater;
                var alcoholConcentration = oneOzAlcoholUser*0.806*100;
                var amountConsumed = alcoholConcentration*alcoholPct*quantity;
                var metabolicDiscount = amountConsumed-(0.012*hours);
                var result = Math.round(metabolicDiscount*100)/100;
                var bac = result.toFixed(2).toString().slice(1);
                //$('#result-box').animate({width:'toggle'},350);
                
                $("#panel-2").hide();
                $("#panel-3").show();
                
                if (gender == 'Female'){
                        mixpanel.track('Calculation', {
                                'gender': 'female',
                                'weight': weight,
                                'alcoholPct': alcoholPct,
                                'quantity': quantity,
                                'hours': hours,
                                'bac': bac
                        });
                } else {
                        mixpanel.track('Calculation', {
                                'gender': 'male',
                                'weight': weight,
                                'alcoholPct': alcoholPct,
                                'quantity': quantity,
                                'hours': hours,
                                'bac': bac
                        });
                }

                if (metabolicDiscount > 0){
                    if ( (metabolicDiscount >= 0.00) && (metabolicDiscount <= 0.02)) {
                        document.getElementById("result").innerHTML="Your Blood Alcohol Content is " + bac + ". Drink More, Bitch.";
                        document.getElementById("result-num").innerHTML=bac;
                    }
                    
                    if ( (metabolicDiscount > 0.02) && (metabolicDiscount <= 0.06)) {
                        document.getElementById("result").innerHTML="Your Blood Alcohol Content is " + bac + ". Smooth buzz...";
                        document.getElementById("result-num").innerHTML=bac;
                    }
                    
                    if ( (metabolicDiscount > 0.06) && (metabolicDiscount < 0.08)) {
                        document.getElementById("result").innerHTML="Your Blood Alcohol Content is " + bac + ". DANGER ZONE.";
                        document.getElementById("result-num").innerHTML=bac;
                    }
                    
                    if ( (metabolicDiscount >= 0.08 ) && (metabolicDiscount < 0.30) ) {
                        document.getElementById("result").innerHTML="Your Blood Alcohol Content is " + bac + ". You are SMASHDD.";
                        document.getElementById("result-num").innerHTML=bac;
                    }            
                    
                    if ( (metabolicDiscount > 0.30) ){
                        document.getElementById("result").innerHTML="Call a fucking ambulance.";
                        document.getElementById("result-num").innerHTML=bac;
                    }
                } else {
                        document.getElementById("result").innerHTML="Your Blood Alcohol Content is .00. You are fine.";
                        document.getElementById("result-num").innerHTML=".00";
                }
        }
};