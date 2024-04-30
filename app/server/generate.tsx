"use server"

import { headers } from "next/headers";
import { ComfyDeployClient } from "comfydeploy"

const client = new ComfyDeployClient({
    apiBase: process.env.COMFY_API_URL,
    apiToken: process.env.COMFY_API_TOKEN!,
})

export async function generate(P_prompt: string, N_prompt: string) {
    const headersList = headers();
    const host = headersList.get("host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "";
    const endpoint = `${protocol}://${host}`;
    // Usage example: const currentUrl = getCurrentUrl(req); // req should be passed to the generate function
    console.log(process.env.CHARACTER_SHEET_ID);

    return await client.run({
        deployment_id: process.env.CHARACTER_SHEET_ID!,
        inputs: {
            "input_pos_text": P_prompt,
            "input_neg_text": N_prompt
        },
        webhook: `${endpoint}/api/webhook`
    })
}
export async function character_Sheet(prompt: string, prompt2: string) {
    return await client.run({
        deployment_id: process.env.CHARACTER_SHEET_ID!,
        inputs: {
            "input_pos_text": prompt,
            "input_neg_text": prompt2
        }
    })
}

export async function generate_img(input_image: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_IMG_2_IMG!,
        inputs: {
            "input_image_url": "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3b7e6fc0-3862-4e74-aecf-7d20acb136e7/original=true/image%20(30).jpeg"

            // "input_image": input_image
        }
    })
}

export async function generate_img2(input_image: string, input_image2: string, input_text: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_IMG_2_IMG!,
        inputs: {
            "input_image": input_image,
            "input_image2": input_image2,
            "input_text": input_text
        }
    })
}


export async function generate_repose_img(img1URL: string, img2URL: string, input_text: string, input_text2: string) {
    return await client.run({
        deployment_id: process.env.DEPLOYMENT_ID_REPOSER!,
        inputs: {
            "input_image_style": img1URL,
            "input_image_pose": img2URL,
            "input_text_pos": input_text,
            "input_text_neg": input_text2
        }
    })
}

export async function generate_img_with_controlnet(input_openpose_url: string, prompt: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_CONTROLNET!,
        inputs: {
            "openpose": input_openpose_url,
            "positive_prompt": prompt
        }
    })
}

// Helper function to perform the file upload
export async function uploadFile(uploadUrl: string, file: File): Promise<Response> {
    return fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
            "Content-Length": file.size.toString(),
        },
    });
}

// export async function generate_img_with_controlnet(input_openpose_url: string, prompt: string) {
//     return await client.run({
//         deployment_id: process.env.COMFY_DEPLOYMENT_ID_CONTROLNET!,
//         inputs: {
//             "positive_prompt": prompt,
//             "openpose": input_openpose_url
//         }
//     })
// }



export async function checkStatus(run_id: string) {
    return await client.getRun(run_id)
}

export async function getUploadUrl(type: string, file_size: number) {
    try {
        return await client.getUploadUrl(type, file_size)
    } catch (error) {
        console.log(error)
    }
}

// TypeScript interface for clarity on what the upload URL function returns
// interface UploadUrlResponse {
//     upload_url: string;
//     file_id: string;
//     download_url: string;
// }

// export async function getUploadUrl2(type: string, file_size: number) {
//     try {
//         return await client.getUploadUrl(type, file_size);

//     } catch (error) {
//         console.error("Failed to obtain upload URL:", error);
//         // Return null explicitly if you don't want to throw
//         return null;
//     }
// }
// TypeScript interface for clarity on what the upload URL function returns

// TypeScript interface to include nullable response
interface UploadUrlResponse {
    upload_url: string;
    file_id: string; // Assuming file_id is also needed.
    download_url: string;
}

// Function may return UploadUrlResponse or null if an error occurs or data is not found
export async function getUploadUrl2(type: string, file_size: number): Promise<UploadUrlResponse | null> {
    try {
        const response = await client.getUploadUrl(type, file_size);
        if (!response) {
            return null; // Explicitly handling cases where no response is returned
        }
        return response as UploadUrlResponse; // Cast if necessary, depending on the client.getUploadUrl return type
    } catch (error) {
        console.error("Failed to obtain upload URL:", error);
        return null;  // Return null on error
    }
}



export async function getWebsocketUrl() {
    return await client.getWebsocketUrl({
        deployment_id: process.env.COMFY_DEPLOYMENT_WS!,
    })
}

export async function getWebsocketUrl2() {
    return await client.getWebsocketUrl({
        deployment_id: process.env.COMFY_DEPLOYMENT_WS2!,
    })
}

export async function getWebsocketUrl3() {
    return await client.getWebsocketUrl({
        deployment_id: process.env.COMFY_DEPLOYMENT_WS3!,
    })
}

export async function getWebsocketUrlAny(deployment_id: string) {
    return await client.getWebsocketUrl({
        deployment_id: deployment_id,
    })
}


