import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('f-sync initialized.');

	let disposable = vscode.commands.registerCommand('f-sync.updateSync', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from File Sync!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
