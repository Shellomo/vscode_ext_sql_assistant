# SQL Assistant Pro

SQL Assistant Pro is a powerful VS Code extension that enhances your SQL development experience with advanced formatting, intelligent autocompletion, and productivity features.

![Banner](media/sql-banner.png)

## Features

### 🎨 Smart SQL Formatting
- One-click formatting of SQL queries with industry-standard conventions
- Support for multiple SQL dialects
- Customizable formatting rules
- Format selection or entire document

### 💡 Intelligent Autocompletion
- Context-aware SQL keyword suggestions
- Smart completion for table names and columns
- Support for common SQL patterns and snippets

### ⚡ Keyboard Shortcuts
- Format SQL: `Cmd/Ctrl + Shift + F`
- More shortcuts coming soon!

## Installation

1. Open VS Code
2. Press `Cmd/Ctrl + P` to open the Quick Open dialog
3. Type `ext install sql-assistant-pro`
4. Press Enter

## Usage

### Formatting SQL
1. Open a `.sql` file or select SQL language mode
2. Use one of these methods to format your SQL:
   - Press `Cmd/Ctrl + Shift + F`
   - Right-click and select "Format SQL Query"
   - Open Command Palette (`Cmd/Ctrl + Shift + P`) and type "Format SQL Query"

### Autocompletion
- Start typing SQL keywords to see suggestions
- Use `.` after table names to see column suggestions
- Press `Tab` or `Enter` to accept suggestions

## Configuration

SQL Assistant Pro can be customized through VS Code settings:

```json
{
  "sql-assistant.formatting": {
    "keywordCase": "upper",
    "indentStyle": "standard",
    "tabWidth": 2
  }
}
```

## Requirements

- Visual Studio Code version 1.85.0 or higher

## Known Issues

- No known issues at this time. Please report any bugs on our [GitHub repository](https://github.com/Shellomo/vscode_ext_sql_assistant/issues).

## Release Notes

### 1.0.0
- Initial release
- SQL formatting support
- Basic autocompletion for SQL keywords
- Custom keyboard shortcuts

## Support

If you encounter any issues or have suggestions, please:
1. Search existing [issues](https://github.com/Shellomo/vscode_ext_sql_assistant/issues)
2. Submit a new issue if needed

## License

This extension is licensed under the [MIT License](LICENSE).

---

**Enjoy writing beautiful SQL!** 💝