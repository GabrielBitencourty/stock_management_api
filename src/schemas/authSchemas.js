const { z } = require('zod')

const signinSchema = z.object({
    userEmail: z.string().email(),
    password: z.string().min(1)
})

const signupSchema = z.object({
    userEmail: z.string().email(),
    userName: z.string().trim().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((body) => body.password === body.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
})

module.exports = {
    signinSchema,
    signupSchema
}
