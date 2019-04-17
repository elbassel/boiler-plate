module.exports = {
    _id: { type: 'ObjectId'},
    email: { type: 'string', required: true },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    password: { type: 'string' },
    provider: { type: 'string', enum: ['local', 'google', 'facebook', 'twitter']},
    roles: [{ type: 'string'}],
    image: { type: 'string' },
    nToken: { type: 'string' },
    resetToken: { type: 'string' },
    confirmed: { type: 'bool' },
    blocked: { type: 'bool' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
};
