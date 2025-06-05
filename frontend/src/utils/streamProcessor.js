export async function streamProcessor(url, onProgress) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error while loading: ${response.status} ${response.statusText}`);
    }

    const contentLengthHeader = response.headers.get("Content-Length");
    const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : null;

    const reader = response.body.getReader();
    const chunks = [];
    let loadedBytes = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loadedBytes += value.length;

        if (typeof onProgress === "function") {
            onProgress(loadedBytes, totalBytes);
        }
    }

    return new Blob(chunks);
}