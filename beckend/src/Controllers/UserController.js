const {secret,jwt} = require('../Utils/Verify')

const {VideosData,getProfile} = require('../Utils/FlowDbm')

//home web
const HomeWeb = (req,res) => {
    try{
        res.send('hello world')
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//search
const SearchVideo =  async(req,res) => {
    try{
        //get Query
        const {q} = req.query

        //videodatas
        const Videos = await VideosData()

        // //filter
        const FilterVideo = Videos.filter((e) => e.Title.toLowerCase().includes(q));
        
        if(!FilterVideo || FilterVideo.length < 0) {
            return res.status(404).json({msg : 'NOT Match'})
        }

        const MapVideo = await Promise.all(
           await FilterVideo.map(async(e) => {
            const {_id,PrName,Title,Views,VdFile,VdType,ImgFile,ImgType} = e

            //decodedVIDEO
            const videDeco = VdFile.toString('base64');
            //path
            const videoPath = `data:${VdType};base64,${videDeco}`;

            //decodedPoster
            const ImgDeco = ImgFile.toString('base64');
            //path
            const ImgPath = `data:${ImgType};base64,${ImgDeco}`
            
              //getProfile //for pict
             const ProfileOk = await getProfile(PrName)
             if(!ProfileOk){
                return res.status(404).json({msg : 'Not Authorization'})
             }

             //decodedImage
             const ImageData = ProfileOk.ImgFile.toString('base64');
             //imagePath
             const ProfilePath = `data:${ProfileOk.ImgType};base64,${ImageData}`;

            return {_id,PrName,Title,Views,videoPath,ImgPath,ProfilePath}
            })
        )

        if(!MapVideo || MapVideo.length < 0){
            return res.status(404).json({msg : 'NOT Match'})
        }
        
        res.status(200).json({msg : 'Success', Datas: MapVideo});
    }catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}






module.exports = {HomeWeb,SearchVideo}