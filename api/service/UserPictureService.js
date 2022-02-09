const {UserPictureModel} = require('../db/models')


class UserPictureService {
    async savePicture(picture, pictureSourceUrl) {
        return await UserPictureModel.create({
            picture,
            pictureSourceUrl
        })
    }

    async update({id, picture}) {
        const checkExists = await this.getByID({id})

        if (checkExists) {
            return await UserPictureModel.update(
                {
                    picture,
                },
                {
                    where: {
                        id,
                    },
                }
            )
        }
        else {
            return await this.savePicture(picture)
        }
    }

    async getByID({id}) {
        const foundPicture = await UserPictureModel.findOne({
            raw: true,
            where: {
                id
            },
            appribures: ['picture']
        })
    }
}


module.exports = new UserPictureService()
