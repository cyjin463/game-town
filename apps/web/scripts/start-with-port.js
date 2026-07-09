const net = require('net');
const { spawn } = require('child_process');
const path = require('path');

const DEFAULT_PORT = 3000;
const MAX_PORT = 3100;

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();

        server.unref();
        server.on('error', () => resolve(false));
        server.listen(port, () => {
            server.close(() => resolve(true));
        });
    });
}

async function findAvailablePort(startPort) {
    for (let port = startPort; port <= MAX_PORT; port++) {
        if (await isPortAvailable(port)) {
            return port;
        }
    }

    throw new Error(`No available port found between ${startPort} and ${MAX_PORT}`);
}

async function main() {
    const preferredPort = Number.parseInt(process.env.PORT || '', 10) || DEFAULT_PORT;
    const port = await findAvailablePort(preferredPort);

    if (port !== preferredPort) {
        console.warn(` ⚠ Port ${preferredPort} is in use, trying ${port} instead.`);
    }

    const nextBin = require.resolve('next/dist/bin/next');
    const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
        env: { ...process.env, PORT: String(port) },
    });

    child.on('exit', (code) => {
        process.exit(code ?? 0);
    });
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
