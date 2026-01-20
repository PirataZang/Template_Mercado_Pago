import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const user = await prisma.user.findUnique({
        where: {
            token: body.token,
        },
    })

    const userData = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        avatar: user?.avatar,
    }
    return userData
})
