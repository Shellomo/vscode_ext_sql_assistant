import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    InitializeParams,
    TextDocumentSyncKind,
    CompletionItem,
    CompletionItemKind
} from 'vscode-languageserver/node';
import {TelemetryLog} from './telemetry';

import {TextDocument} from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
    TelemetryLog('info', 'Server initialized');
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.']
            }
        }
    };
});

// SQL Keywords for autocompletion
const keywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'GROUP BY',
    'ORDER BY', 'HAVING', 'LIMIT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE',
    'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION'
];

// Handle autocompletion requests
connection.onCompletion((params): CompletionItem[] => {
    return keywords.map(keyword => ({
        label: keyword,
        kind: CompletionItemKind.Keyword,
        data: keyword
    }));
});

// Handle completion item resolution
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return item;
});

documents.listen(connection);
connection.listen();
