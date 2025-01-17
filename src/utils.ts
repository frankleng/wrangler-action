import { existsSync } from "node:fs";
import * as path from "node:path";

export function getNpxCmd() {
	return process.env.RUNNER_OS === "Windows" ? "npx.cmd" : "npx";
}

/**
 * A helper function to compare two semver versions. If the second arg is greater than the first arg, it returns true.
 */
export function semverCompare(version1: string, version2: string) {
	if (version2 === "latest") return true;

	const version1Parts = version1.split(".");
	const version2Parts = version2.split(".");

	for (const version1Part of version1Parts) {
		const version2Part = version2Parts.shift();

		if (version1Part !== version2Part && version2Part) {
			return version1Part < version2Part ? true : false;
		}
	}

	return false;
}

export function checkWorkingDirectory(workingDirectory = ".") {
	const normalizedPath = path.normalize(workingDirectory);
	if (existsSync(normalizedPath)) {
		return normalizedPath;
	} else {
		throw new Error(`Directory ${workingDirectory} does not exist.`);
	}
}
