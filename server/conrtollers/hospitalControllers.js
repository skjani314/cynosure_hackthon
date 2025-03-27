export const addDoctor=async(req,res,next)=>
{
    try {
        const {name,
        email,
        rating,
        active,
        specility,
        } =req.body

        if(!name || !email || !rating ||!specility)
        {
              res.json({success:false,mess})
        }
    } catch (error) {
        next(error)
    }
}