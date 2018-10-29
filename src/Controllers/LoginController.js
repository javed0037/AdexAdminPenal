import config from '../../../config';
import swal from 'sweetalert';

export const onSubmit = (e) =>{    
    e.preventDefault();
   
    var txtusername=this.state.usernameOrEmail;
    var txtpassword=this.state.password;

  //   if(txtusername == "superadmin" &&  txtpassword == "superadmin")
  //   {
	//     sessionStorage.setItem("username","superadmin");
	//     sessionStorage.setItem("jwt","ghjghjghjghjfghj");
	//     sessionStorage.setItem("user_id","1");
	//     sessionStorage.setItem("typeid","1");
	//     window.location.href = '/';

  //  }else{
      
  //         swal({
  //              title: "Wrong!",
  //              text: "Username password wrong.",
  //              icon: "error",
  //            });
   
  //   }
    
    if(txtusername!="" && txtpassword!="")
    {
      var getusersobj={ 
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'                 
        }),
        body: JSON.stringify({
          "usernameOrEmail" :txtusername,
          "password" :txtpassword
        })
      }    
      var api_url=`${config.API_URL}`;
         
      fetch(api_url+'/auth/signin', getusersobj)
        .then(function(response){
          if(response.status!=200)
          {
            swal({
              title: "Wrong!",
              text: "Somthing went wrong.",
              icon: "error",
            });
          }
          
          response.json().then(json=>{
              if(json.status==true)
              {
                sessionStorage.clear(); 
                sessionStorage.setItem("username",txtusername);
                sessionStorage.setItem("jwt",json.accessToken);
                sessionStorage.setItem("user_id",json.id);
                sessionStorage.setItem("typeid",json.typeid);
                window.location.href = '/';
              }
              else
              {
                  swal({
                    title: "Wrong!",
                    text: json.message,
                    icon: "error",
                  });
              }
          })
        }).catch(error => {
          swal({
            title: "Wrong!",
            text: error.toString(),
            icon: "error",
          });          
        });
      }
      else
      {
        swal({
              title: "Required!",
              text: "Username & password is compulsory!",
              icon: "warning",
            });
      }
  }


  export const onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }