import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function GalleryPage(){

    const session  = await auth.api.getSession({
        headers: await headers()
    })

    if(session && session?.user?.role === "admin") redirect("/")
        
    return (
        <div>GalleryPage</div>
    )

}

export default GalleryPage;