import { execSync } from "child_process";
import fs from "fs";

const envExample = ".env.example";
const envLocal = ".env.local";

console.log("Installing dependencies...");
execSync("npm install");

if (!fs.existsSync(envLocal)) {
	console.log("Copying .env.example to .env.local...");
	fs.copyFileSync(envExample, envLocal);
	console.log("Copied .env.example to .env.local...");
	console.log(
		"Remember to replace any keys with placeholder values with your own values as shown in the CONTRIBUTING.md file"
	);
} else {
	console.log(".env.local already exists. Skipping copy...");
}
