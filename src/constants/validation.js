/* Function name : checkValidationFormAllControls;
     * (Use for function for all common validation
     * check field validation use 
     * range,required,min,max,email,phone,alphabet,number,password
     * and confirm password matching,password format);
     * Parameter:pass the full control;
     * return error object with true and false;
     */
     export function checkValidationFormAllControls(controls, check, arrayData = []) {
        var i=0 
        var msg=''
        var errorMessageObject = {};
        var pattern=''
      if (arrayData.length > 0) {
        
        
        
          for ( i = 0; i < controls.length; i++) {
            //var ngReflectName=controls.attributes.indexOf("ng-reflect-name");
              //Check All Required filled based on the all controlles required property 
              if (controls[i].required && !controls[i].value) {
                errorMessageObject[controls[i].id] = controls[i].id.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].id.replace(/_\d+/g, ' ').slice(1).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' ')+'is required.';
              }
              //Check All required filled based on type=radio input box
              else if (controls[i].type === 'radio' && !controls[i].validity.valid) {
  
                errorMessageObject[controls[i].id] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_\d+/g, ' ').slice(1).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' ')+'is required.';
              }
             
              else if (controls[i].type === 'checkbox' && !controls[i].validity.valid) {
  
                errorMessageObject[controls[i].id] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' ')+'is required.';
              }
          }
      } else {
        
         errorMessageObject = {};
        for ( i = 0; i < controls.length; i++) {
          //console.log(controls[i]);
          //Check All Required filled based on the all controlles required property 
          if (controls[i].required && !controls[i].value) {
            errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
          }
          //Check All required filled based on type=radio input box
          else if (controls[i].type === 'radio' && !controls[i].validity.valid) {
            errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
          }
              else if (controls[i].type === 'file' && !controls[i].validity.valid) {
            errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
          } else if (controls[i].type === 'file' && controls[i].validity.valid) {          
            if(controls[i].getAttribute('validFileExtention')){
              if(controls[i].getAttribute('validFileExtention').split(',').indexOf(controls[i].value.split('.').pop()) !== -1){  
              }else{
                errorMessageObject[controls[i].name] = 'only support pdf and image';
              }
            //return filename.split('.').pop();
            //errorMessageObject[controls[i].name] = 
            
            }
          }
          //Check Email required and email format filled based on type=email input box
          else if (controls[i].type === 'email' && controls[i].value && controls[i].name) {
            //var pattern = new RegExp(controls[i].pattern);
            //check pattern of email
             pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            if (pattern.test(controls[i].value)) {
  
            }
            //just for testing
            else if(controls[i].name === 'email_id_or_mobile_number' && !controls[i].value){
              errorMessageObject[controls[i].name] = "Please enter a valid "+ controls[i].name.replace(/_/g, ' ').charAt(0) + controls[i].name.replace(/_/g, ' ').slice(1) +'. Mobile number should be of 10 digits.';
  
            }
  
            //end
            else if(controls[i].name === 'email_id_or_mobile_number'){
             errorMessageObject[controls[i].name] = "Please enter a valid "+ controls[i].name.replace(/_/g, ' ').charAt(0) + controls[i].name.replace(/_/g, ' ').slice(1) +'. Mobile number should be of 10 digits.';
            } 
            else {
              
              errorMessageObject[controls[i].name] = 'Enter valid '+controls[i].name.replace(/_/g, ' ').charAt(0)+ controls[i].name.replace(/_/g, ' ').slice(1) + " address.";
            }
  
          }
          //Check Password required and password format filled based on type=password input box
          else if (controls[i].type === 'password' && controls[i].value) {
            
            pattern = new RegExp(controls[i].pattern);
            if (pattern.test(controls[i].value)) {
                
              if(controls[i].getAttribute('match'))
              {
                
                if(controls[i-2].id===controls[i].getAttribute('match').split(',')[0] && controls[i].id===controls[i].getAttribute('match').split(',')[1])
                {
                 if(controls[i-2].value!==controls[i].value)
                 {
                  errorMessageObject[controls[i].name] = controls[i].getAttribute('match').split(',')[0].replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].getAttribute('match').split(',')[0].replace(/_/g, ' ').slice(1)+' and '+controls[i].getAttribute('match').split(',')[1].replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].getAttribute('match').split(',')[1].replace(/_/g, ' ').slice(1)+ ' is not same.';     
                 }
                }
               
              }
            } else {
                 
                errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + " must be alphanumeric and minimum of 8 digits. It is mandatory to use numbers and special characters in the password.";
              
  
            }
  
          }
           
  
          else if (controls[i].type === 'text' && controls[i].value && controls[i].name) {
             msg="Invalid";
            if(controls[i].getAttribute('message'))
            {
              msg=controls[i].getAttribute('message');
            }
             pattern = new RegExp(controls[i].pattern);
             
            
            if (pattern.test(controls[i].value)) {
  
            }
            else if(controls[i].name === 'Aadhaar_number'){
              errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ') + ' ' + 'should be of' + ' ' + controls[i].maxLength + " digits.";
            }
            else if(controls[i].name === 'Driving_licence_number'){
              errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ') + ' ' + 'should be of' + ' ' + controls[i].maxLength + " digits.";
            }
            else if(controls[i].name === 'Passport_number'){
              errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ') + ' ' + 'should be of' + ' ' + controls[i].maxLength + " digits.";
            }
             else {
              errorMessageObject[controls[i].name] = msg+ ' ' +controls[i].name.replace(/_/g, ' ').charAt(0) + controls[i].name.replace(/_/g, ' ').slice(1) + '.';
            }
  
          }
  
          //check All pattern based on type = tel filed
          else if (controls[i].type === 'tel' && controls[i].value) {
  
             
            if (controls[i].value.length !== controls[i].maxLength) {
              // Please enter a valid mobile number/email id. Mobile number should be of 10 digits.
              // Email id or mobile number is not valid 10 digit number.
              errorMessageObject[controls[i].name] = "Please enter a valid "+ controls[i].name.replace(/_/g, ' ').charAt(0) + controls[i].name.replace(/_/g, ' ').slice(1) +'. Mobile number should be of '+  controls[i].maxLength + " digits.";
            }
               msg=" is not valid format.";
              if(controls[i].getAttribute('message'))
              {
                msg=controls[i].getAttribute('message');
              }
              pattern = new RegExp(controls[i].pattern);
             
              
              if (pattern.test(controls[i].value)) {
    
              } else {
                errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) +' '+ msg;
              }
     
  
          }
          else if (controls[i].type === 'checkbox' && !controls[i].validity.valid) {
  
            errorMessageObject[controls[i].name] = controls[i].name.replace(/_/g, ' ').charAt(0).toUpperCase() + controls[i].name.replace(/_/g, ' ').slice(1) + ' is required.';
          }
          
          
        }
      }
  
  
  
    //   if (Object.keys(errorMessageObject).length !=== 0) {
    //     errorMessageObject["valid"] = true;
    //   } else {
    //     errorMessageObject["valid"] = false;
    //   }
      
      
    //   if(this.errorMultipleFormValidationMessageObject.length>0)
    //   {
        
    //     return this.errorMultipleFormValidationMessageObject;
    //   }
    console.log(errorMessageObject);
    if (Object.keys(errorMessageObject).length !== 0) {
        errorMessageObject["valid"] = true;
      } else {
        errorMessageObject["valid"] = false;
      }
      return errorMessageObject;
    }
     
