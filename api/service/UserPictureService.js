const {UserPictureModel} = require('../db/models')


class UserPictureService {
    async savePicture(picture) {
        return await UserPictureModel.create({
            picture,
        })
    }

    async getByID({id}) {
        const foundPicture = await UserPictureModel.findOne({
            raw: true,
            where: {
                id
            },
            appribures: ['picture']
        })

        return foundPicture
    }

    async update({id, picture}) {
        const checkExists = await this.getByID({id})

        if (checkExists) {
            await UserPictureModel.update(
                {
                    picture,
                },
                {
                    where: {
                        id,
                    },
                }
            )

            const updatedData = await UserPictureModel.findOne({
                raw: true,
                where: {
                    id,
                },
            })

            return updatedData
        }
        else {
            return await this.savePicture(picture)
        }
    }    
}


module.exports = new UserPictureService()
