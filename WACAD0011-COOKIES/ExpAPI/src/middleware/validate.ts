import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";

function validate(schema: Schema){
    return (req: Request, res: Response, next: NextFunction) =>{
        const {error} = schema.validate(req.body,{
            abortEarly: false
        });
        if(error) res.status(StatusCode.BAD_REQUEST).json(error)
    }
    
}