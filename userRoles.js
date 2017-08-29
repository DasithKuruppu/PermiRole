module.exports =[
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
    },
    {
        permissions: {
            role: 'admin',
            allowed: [
                {
                    path: '/',
                    method: ['GET,POST,PUT,DELETE'],
                    fields: ['name', 'age']
                },
                {
                    path:'/users',
                    method:['GET,POST,PUT,DELETE'],
                    fields:[]
                }

            ]
        }
    }
]

