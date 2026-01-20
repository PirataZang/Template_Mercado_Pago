export default defineEventHandler(async (event) => {
    return {
        message: 'This is a test POST endpoint',
        obj: event,
    }
})
