module.exports = {
    create: {
        type: 'object',
        properties: {
            email: {type: 'string', format: 'email'},
            password: { type: 'string', maxLength: 64 },
            roles: { type: 'array', items:[{ enum: ['user', 'admin'], type: 'string'}] },
            firstName: {type: 'string', maxLength: 64},
            lastName: {type: 'string', maxLength: 64},
            provider: {type: 'string', enum: ['local', 'google', 'facebook', 'twitter']},
            nToken: { type: 'string' },
            jwt: { type: 'string' },
            confirmed: { type: 'boolean' },
            blocked: { type: 'boolean' },
            isVerified: { type: 'boolean', default: false},
        },
        required: ['email', 'roles', 'provider'],
        additionalProperties: false
    },
    api_create: {
        type: 'object',
        properties: {
            email: {type: 'string', format: 'email'},
            password: { type: 'string', maxLength: 64 },
            firstName: {type: 'string', maxLength: 64},
            lastName: {type: 'string', maxLength: 64},
        },
        required: ['email'],
        additionalProperties: false
    },
    regiter:{
        type: 'object',
        properties: {
            email: {type: 'string', format: 'email'},
            password: { type: 'string', maxLength: 64 },
            firstName: {type: 'string', maxLength: 64},
            lastName: {type: 'string', maxLength: 64},
        },
        required: ['email', 'password'],
        additionalProperties: false
    },
    login: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', maxLength: 64 }
        },
        required: ['email', 'password'],
    }
};
