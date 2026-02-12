import Subscription from '../models/subscription.model.js';


export const createSubscription = async(req,res,next)=> {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            subscription
        })
    } catch(e){
        next(e)
    }
}
export const getSubscription = async(req,res,next)=> {
    try{
        const subcription = await Subscription.findById(req.params.id)
          if(!subcription){
            const error = new Error("Subscription not found")
            error.status = 404
            throw error
        }
        res.status(200).json({
            success: true,
            message: "Subscription details fetched successfully",
            data : {subcription}
        })

    } catch(e){
        next(e)
    }
}

export const getAllubscriptions= async(req,res,next)=> {
    try{
        const subscriptions = await Subscription.find()
        if(!subscriptions){
            const error = new Error("No subscriptions found")
            error.status = 404
            throw error
        }
        res.status(200).json({
            success: true,
            message: "All Subscriptions fetched successfully",
            data : {subscriptions}
        })
    } catch(error){
        next(error)
    }
}

export const getUserSubscriptions = async(req,res,next)=> {
    try{
            if(req.user.id !== req.params.id){
                const error = new  Error("You are not the owner of the account. Access Denied")
                error.status= 401
                throw error
            }
            const subscription = await Subscription.findOne({ user: req.params.id})
            res.status(200).json({
                success: true,                
                message: "User Subscriptions fetched successfully",
                data : {subscription}
            })
    } catch(e){
        next(e)
    }
}


//Update the subscription details
export const updateSubscription = async(req,res,next)=> {
    try{
             const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
                if(!subscription){
                    const error = new Error("Subscription not found")
                    error.status = 404
                    throw error
                }
                res.status(200).json({
                    success: true,
                    message: "Subscription updated successfully",
                    data : {subscription}
                })
    } catch(e){
        next(e)
    }
}

export const cancelSubscription = async(req,res,next)=> {
    try{
            const subscription = await Subscription.findByIdAndUpdate(req.params.id, { status: 'canceled' }, { new: true })
                if(!subscription){
                    const error = new Error("Subscription not found")
                    error.status = 404
                    throw error
                }
                res.status(200).json({
                    success: true,
                    message: "Subscription canceled successfully",
                    data : {subscription}
                })
    } catch(e){
        next(e)
    }
}

export const deleteSubscription = async(req,res,next)=> {
    try{
            const subscription = await Subscription.findByIdAndDelete(req.params.id)    
                if(!subscription){
                    const error = new Error("Subscription not found")
                    error.status = 404
                    throw error
                }   
                res.status(200).json({
                    success: true,
                    message: "Subscription deleted successfully",
                })
    } catch(e){
        next(e)
    }       
}

