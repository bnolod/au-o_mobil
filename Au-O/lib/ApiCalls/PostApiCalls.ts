import { apiFetch } from "../apiClient";


export async function editPost(
    text: string,
    location: string,
    vehicleId: number | null,
    id: string
) {
    const res = await apiFetch(`/posts/post/${id}`, "PUT", true, {
        text,
        location,
        vehicleId,
    });
    if (res) {
        return res.data;
    } else return null;
}
