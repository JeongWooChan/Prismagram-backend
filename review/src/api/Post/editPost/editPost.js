import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editPost: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { id, caption, location } = args; 
            const { user } = request; 
            const post = prisma.$exists.post({ id, user: { id: user.id }}); 
            if(post) {
                return prisma.updatePost({ 
                    data: { caption, location }, 
                    where: { id }
                });
            } else {
                throw Error("You can't do that");
            }
        }
    }
}