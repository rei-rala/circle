import "server-only"
import { cache } from "react"

const THE_CIRCLE_INSTAGRAM_PROFILE_ID = "53722161045";

async function getInstagramPosts(profileId: string) {
    const response = await fetch(`https://graph.instagram.com/${profileId}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`);
    const data = await response.json();
    return data;
}

async function getTheCircleInstagramPosts() {
    return getInstagramPosts(THE_CIRCLE_INSTAGRAM_PROFILE_ID);
}

export default cache(getTheCircleInstagramPosts);