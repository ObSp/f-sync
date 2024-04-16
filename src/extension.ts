import * as vscode from 'vscode';
import { basename } from 'path';
import * as fs from 'fs';

function wait(timeoutS: number){
	return new Promise(resolve => setTimeout(resolve, timeoutS*1000));
}


export async function activate(context: vscode.ExtensionContext) {

	const notify = vscode.window.showInformationMessage;
	const print = console.log;

	let updateSync = vscode.commands.registerCommand('f-sync.updateSync', async () => {

		const curWorkspaceFiles = await vscode.workspace.findFiles('**/*.*', '**/node_modules/**');
		if (curWorkspaceFiles === null) {return;}

		var foundFsyncFile: vscode.Uri = curWorkspaceFiles[1];
		var found = false;

		curWorkspaceFiles.forEach(function(file, i){
			if (found){ return;}
			const fName = basename(file.path);

			if (fName.includes(".f-sync")){
				foundFsyncFile = file;
				found = true;
			}
		});

		if (!found){return;}

		let fileContents: String | String[] = "";


		fs.readFile(foundFsyncFile.fsPath, 'utf-8', function(err, data){
			fileContents = data;
		});

		await wait(2);

		let syncToPath: String = "";
		let srcPath: String = "";

		fileContents = fileContents.split("\n");

		fileContents.forEach(line => {
			let split = line.replace(" ", "").split(":");

			if (split[0] === "destination"){
				syncToPath = split[1];
			} else if (split[0] === "source"){
				srcPath = split[1];
			}
		});

		print(syncToPath, srcPath);
	});

	context.subscriptions.push(updateSync);

	console.log('F-SYNC INITIALIZED');
}

// This method is called when your extension is deactivated
export function deactivate() {}