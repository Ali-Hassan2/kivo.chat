import { getCurrentUser } from "@/helpers";
import { NextResponse } from "next/server";

async function POST(request:Request){
 
    const user = getCurrentUser()
    if(!user){
        return NextResponse.json({
            success:false,
            message:"Session not found Please login first"
        })
    }
}