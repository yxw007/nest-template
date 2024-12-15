import { exec } from "child_process"
import path from "path";
import fs from "fs/promises"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
	exec("cross-env NODE_ENV=development nest build", async (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing build command: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`Build stderr: ${stderr}`);
			return;
		}

		await copyFiles();

		console.log("Build Success");
	});
}

async function copyFiles() {
	const targetDir = path.resolve(__dirname, "../dist");
	try {
		//copy package.json and package-local.json
		await fs.copyFile(path.resolve(__dirname, "../package.json"), path.join(targetDir, "package.json"));
		await fs.copyFile(path.resolve(__dirname, "../package-lock.json"), path.join(targetDir, "package-lock.json"));
		console.log("package.json and package-lock.json copied successfully");
	} catch (error) {
		console.error(`Error copying files: ${error.message}`);
	}
}

run();
