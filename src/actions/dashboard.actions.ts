"use server"

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { asset, category } from "@/lib/db/schema";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import {z} from "zod";

const AssetSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    categoryId: z.number().positive('Please select category'),
    fileUrl: z.url('Invalid file url'),
    thumbnailUrl: z.url('Invalid file url').optional(),
})

export async function getCategoriesAction(){
    try {
        return db.select().from(category);
    } catch (error) {
        console.log(error);
        return []
    }
}


export async function uploadAssetAction(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    if(!session?.user){
        throw new Error("You must be logged in to upload an asset")
    }

    try {
        const validateFields = AssetSchema.parse({
            title: formData.get("title"),
            description: formData.get("description"),
            categoryId: Number(formData.get("categoryId")),
            fileUrl: formData.get("fileUrl"),
            thumbnailUrl: formData.get("thumbnailUrl") || formData.get("fileUrl"),
        })

        await db.insert(asset).values({
            title: validateFields.title,
            description: validateFields.description ?? "",
            categoryId: validateFields.categoryId,
            fileUrl: validateFields.fileUrl,
            thumbnailUrl: validateFields.thumbnailUrl ?? "",
            isApproved: 'pending',
            userId: session?.user?.id ?? "",
        })

        revalidatePath("/dashboard/assets")
        return {
            success: true,
            message: "Asset uploaded successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Failed to upload asset"
        }
    }


}

export async function getUserAssetsAction(userId: string){
    try {
        return await db.select().from(asset).where(eq(asset.userId, userId)).orderBy(asset.createdAt);

    } catch (error) {
        return []
    }
}