import User from '../model/user.model.js';

class ProfileController {
    async getProfile(req, res) {
        try {

            const user = await User.findById(
                req.user.userId
            ).select("-password");

            return res.status(200).json({
                success: true,
                data: user
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
    async updateProfile(req,res){
    try {

        const {
            Name,
            Mobile
        } = req.body;

        const user =
            await User.findByIdAndUpdate(
                req.user.userId,
                {
                    Name,
                    Mobile
                },
                {
                    new:true
                }
            ).select("-password");

        return res.status(200).json({
            success:true,
            data:user
        });

    } catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

}
export default ProfileController;