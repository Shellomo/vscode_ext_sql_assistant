import * as vscode from 'vscode';
import {format} from 'sql-formatter';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';
import {initializeTelemetryReporter, TelemetryLog} from "./telemetry";

// Define the FormatOptionsWithLanguage type based on sql-formatter's actual types
type FormatOptionsWithLanguage = {
    language?: 'sql' | 'mysql' | 'postgresql' | 'mariadb' | 'n1ql' | 'plsql' | 'spark' | 'redshift' | 'db2' | 'hive';
    tabWidth?: number;
    useTabs?: boolean;
    keywordCase?: 'upper' | 'lower' | 'preserve';
    identifierCase?: 'upper' | 'lower' | 'preserve';
    functionCase?: 'upper' | 'lower' | 'preserve';
    indentStyle?: 'standard' | 'tabularLeft' | 'tabularRight';
    logicalOperatorNewline?: 'before' | 'after';
    expressionWidth?: number;
    lineBetweenQueries?: 'preserve' | 'newline' | 'multiple';
    denseOperators?: boolean;
    newlineBeforeSemicolon?: boolean;
};

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    initializeTelemetryReporter(context);
    TelemetryLog('info', 'Extension activated');
    // Register SQL formatter
    let disposable = vscode.commands.registerCommand('sql-assistant.formatQuery', () => {
        TelemetryLog('info', 'Formatting SQL query');
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selection = editor.selection;

        // If no text is selected, use the entire document
        const text = selection.isEmpty
            ? document.getText()
            : document.getText(selection);

        try {
            const formatted = format(text, {
                language: 'sql',
                tabWidth: 2,
                useTabs: false,
                keywordCase: 'upper',
                indentStyle: 'standard'
            });

            editor.edit(editBuilder => {
                if (selection.isEmpty) {
                    // If no selection, replace entire document
                    const fullRange = new vscode.Range(
                        document.positionAt(0),
                        document.positionAt(document.getText().length)
                    );
                    editBuilder.replace(fullRange, formatted);
                } else {
                    editBuilder.replace(selection, formatted);
                }
            });
        } catch (err: any) {
            console.error('Formatting error:', err); // Add this log
            TelemetryLog('error', 'Failed to format SQL query', {error: err.message});
            vscode.window.showErrorMessage('Failed to format SQL: ' + err.message);
        }
    });

    // Setup language server
    const serverModule = context.asAbsolutePath('out/server.js');
    const debugOptions = {execArgv: ['--nolazy', '--inspect=6009']};

    const serverOptions: ServerOptions = {
        run: {module: serverModule, transport: TransportKind.ipc},
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    };

    // Language client options
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{scheme: 'file', language: 'sql'}],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.sql')
        }
    };

    // Create and start language client
    client = new LanguageClient(
        'sqlLanguageServer',
        'SQL Language Server',
        serverOptions,
        clientOptions
    );

    client.start();

    context.subscriptions.push(disposable);
}

export function deactivate(): Thenable<void> | undefined {
    TelemetryLog('info', 'Extension deactivated');
    if (!client) {
        return undefined;
    }
    return client.stop();
}
