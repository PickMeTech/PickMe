export async function streamProcessor(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error while loading: ${response.status} ${response.statusText}`);
    }

    const contentLength = response.headers.get("Content-Length");
    const totalBytes = contentLength ? parseInt(contentLength, 10) : null;

    const reader = response.body.getReader();
    const chunks = [];
    let loadedBytes = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loadedBytes += value.length;
    }
    return new Blob(chunks);
}