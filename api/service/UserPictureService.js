const {UserPictureModel} = require('../db/models')


class UserPictureService {
    async savePicture(picture, pictureSourceUrl) {
        return await UserPictureModel.create({
            picture,
            pictureSourceUrl
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
    }
}


module.exports = new UserPictureService()
