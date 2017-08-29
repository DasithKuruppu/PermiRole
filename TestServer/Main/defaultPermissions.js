module.exports =[
        {
            permissions: {
                role: 'default',
                allowed: [
                    {
                        path: '/',
                        method: ['GET'],
                        fields: ['name', 'age']
                    }
                ]
            }
        }
    ]

