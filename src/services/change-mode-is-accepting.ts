import { ApiResponse } from "@/types"
import axios from "axios"

interface ModeProps{
  username:string,
  signal:AbortSignal
  flag:boolean
}

const changeModeToNotAcceptingMessages = async({
  signal,
  username,
  flag
}:ModeProps): Promise<ApiResponse> =>{
try {

  const response = await axios.post()
  
} catch (error:unknown) {
  
}
}