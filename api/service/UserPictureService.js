const {UserPictureModel} = require('../db/models')


class UserPictureService {
    async savePicture(picture, pictureSourceUrl) {
        return await UserPictureModel.create({
            picture,
            pictureSourceUrl
        })
    }
}


module.exports = new UserPictureService()
