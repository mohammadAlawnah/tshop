import categoriesRouter from './modules/category/category.router.js'
import productRouter from './modules/product/product.router.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import subcategoryRouter from './modules/subcategory/subcategory.router.js'
import cors from 'cors'
import connectDB from '../DB/connection.js'

export const initApp = (app,express)=>{
    connectDB();

    app.use(cors());
    
    app.use(express.json());
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/category',categoriesRouter)
    app.use('/subcategorie',subcategoryRouter)


    // app.use('/user',userRouter)
    app.use('*',(req,res)=>{
        res.status(404).json({message : "page not found"})
    })
}

export default initApp;