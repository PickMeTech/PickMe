export async function streamProcessor(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error while loading: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    return new Blob(chunks);
}