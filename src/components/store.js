import { ref } from "vue";

export const currentchat=ref([])
export const againfetchchat=ref(0)

export async function getUser() {
    try {
        const result=await fetch("http://localhost:3000/getuser",
            {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+ localStorage.getItem("token")
                }
            }
        )
        const data= await result.json()
        return data.user
        
        
    } catch (error) {
        console.log("error getting user",error)
    }
}