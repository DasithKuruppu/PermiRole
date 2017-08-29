

#### Installation
 1. npm install -save DasithKuruppu/PermiRole

#### Usage
 ```javascript
 
 var UserRoles= [
    {
        permissions: {
            role: 'default',
            allowed: [
                {
                    path: '/',
                    method: ['GET'],
                    fields: ['name', 'age']
                },
                {
                    path:'/users?.+',
                    method:['GET'],
                    fields:[]
                }

            ]
        }
    }
]
 var PermiRole=require('permirole')(UserRoles,function(RequestContainer){
 /*What to do if route / request is allowed
   RequestContainer={request:request,response:res,next:next,permissions:UserPermissions}
 */
  RequestContainer.next();
},function(err,RequestContainer){
 /*What to do if route / request is not allowed */
  RequestContainer.next(new Error(err.message));
});
 
```

### Run Tests
1. npm install 
2. npm test




 