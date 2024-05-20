"use server"

import { headers } from "next/headers";
import { ComfyDeployClient } from "comfydeploy"

const client = new ComfyDeployClient({
    apiBase: process.env.COMFY_API_URL,
    apiToken: process.env.COMFY_API_TOKEN!,
})

export async function generate(prompt: string, prompt2: string) {
    const headersList = headers();
    const host = headersList.get("host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "";
    const endpoint = `${protocol}://${host}`;
    // Usage example: const currentUrl = getCurrentUrl(req); // req should be passed to the generate function
    console.log(process.env.CHARACTER_SHEET_ID);

    return await client.run({
        deployment_id: process.env.CHARACTER_SHEET_ID!,
        inputs: {
            "input_pos_text": prompt,
            "input_neg_text": prompt2 +"easynegative, badhandsv5-neg, bad_prompt_version2, text, writing"
        },
        webhook: `${endpoint}/api/webhook`
    })
}

export async function generate_img(input_image: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_IMG_2_IMG!,
        inputs: {
            "input_image_url": input_image
        }
    })
}



export async function generate_img2(positive_prompt: string, negative_prompt: string, input_img: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_IMG_2_IMG!,
        inputs: {
            "positive_prompt": positive_prompt,
            "negative_prompt": negative_prompt,
            "input_image_url": input_img
        }
    })
}

export async function generate_repose_img(input_text: string, input_text2: string, img1URL: string, img2URL: string, img3URL: string) {
    return await client.run({
        deployment_id: process.env.REPOSER_ID!,
        inputs: {
            "input_text_positive": input_text,
            "input_text_negative": input_text2,
            "input_image_face": img1URL,
            "input_image_pose": img2URL,
            "input_image_style": img3URL


        }
    })
}

export async function generate_attention_mask(img1URL: string, img2URL: string, img3URL: string, input_text: string, input_text2: string, input_text3: string) {
    return await client.run({
        deployment_id: process.env.ATTENTION_MASK!,
        inputs: {
            "input_image1": img1URL,
            "input_image2": img2URL,
            "input_image_bg": img3URL,
            "input_text_img1": input_text,
            "input_text_img2": input_text2,
            "input_text_situation": input_text3


        }
    })
}

export async function generate_img_with_controlnet(prompt: string, input_openpose_url: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_CONTROLNET!,
        inputs: {
            "input_text_positive": prompt,
            "input_image": input_openpose_url
        }
    })
}



export async function generate_img_with_controlnet2(prompt: string, input_text: string, input_openpose_url: string) {
    return await client.run({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_CONTROLNET!,
        inputs: {
            "positive_prompt": input_text,
            "input_image_face": prompt,
            "input_image": input_openpose_url
        }
    })
}

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