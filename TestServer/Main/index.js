var DefaultPermissions=require('./defaultPermissions.js');
var Middleware=function(Permissions,allowed,rejected){
    var ExpressMiddleware=function(request,res,next){
        var method = request.method
        
        var user=request.user ||{};
        var UserPermissions=null;
        var url=request.originalUrl
        var Hirachy=null;
        
        // Function type check 
        if(typeof rejected !== "function"){ 
                new Error('rejected parameter needs to be a function');
        }
        if(typeof allowed !== "function"){
                new Error('allowed parameter needs to be a function');
        }
        
        if(!Permissions){
            Permissions=DefaultPermissions;
        }
        if(validatePermissionObj(Permissions)){
            new Error('Invalid permissions structure')
        }
        if(user){  //if a user is present 
            if(!user.role){
                user.role='default';
            }

            UserPermissions=Permissions.find(function(userpermissions){
                return userpermissions.permissions.role == user.role || 'default';
            });
           
            var status=UserPermissions.permissions.allowed.find(function(permission){
                var regpath=new RegExp('^'+permission.path+'$','gi'); // treat path as regexp
                var regtest=regpath.test(url);
                var methodtest=permission.method.indexOf(method)!=-1
                return regtest && methodtest;
               // return regpath.test(url) && permission.methodsallowed.indexOf(method)!=-1 ;
            })
            if(status){
                return allowed({request:request,response:res,next:next,permissions:UserPermissions})
            }else{
                return rejected({message:'No permissions to access route'},{request:request,response:res,next:next,permissions:UserPermissions})
            }
        
        }
        else{
        
                return rejected({message:'Request.user or permissions not found/defined'},{request:request,response:res,next:next,permissions:UserPermissions})
            
        }
        
        
       
       
        
       
    }
    return ExpressMiddleware;
}

// validate Permissions object structure
function validatePermissionObj(obj){
    if(!Array.isArray(obj)){
        return false;
    }
    return obj.every(function(RolePermissions){
        if(!RolePermissions.role || !RolePermissions.allowed){
            return false
        }
        if(!Array.isArray(RolePermissions.allowed)){
            return false
        }
        return RolePermissions.allowed.every(function(Route){
            if(!Route.path || !Array.isArray(Route.method) || !Array.isArray(Route.fields)){
                return false
            }
            return true;

        })
    })


}



module.exports=Middleware;
