# MCP Server Template

A template for creating Model Context Protocol (MCP) servers in TypeScript. This template provides a solid foundation for building MCP-compatible servers with proper tooling, type safety, and best practices.

## Features

- 🚀 Full TypeScript support
- 🏗️ Container-based dependency injection
- 📦 Service-based architecture with DataProcessor interface
- 🛠️ Example tool implementation with tests
- 🧪 Vitest testing framework
- 📝 Type definitions
- 🔌 MCP SDK integration

## Getting Started

### Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server with hot reload:

   ```bash
   npm run dev
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Run tests:

   ```bash
   npm test
   ```

5. Start the production server:

   ```bash
   npm start
   ```

## Project Structure

```
src/
├── index.ts          # Entry point
├── interfaces/       # Interface definitions
│   └── tool.ts      # DataProcessor interface
└── tools/           # Tool implementations
    └── example.ts   # Example tool
```

## Creating Tools

1. Export your tool and handlers following the example in `src/tools/example.ts`:

   ```typescript
   // In your-tool.ts
   export const YOUR_TOOLS = [
     {
       name: "your-tool-name",
       description: "Your tool description",
       parameters: {
         // Your tool parameters schema
       },
     },
   ];

   export const YOUR_HANDLERS = {
     "your-tool-name": async (request) => {
       // Your tool handler implementation
       return {
         toolResult: {
           content: [{ type: "text", text: "Result" }],
         },
       };
     },
   };
   ```

2. Register your tool in the `ALL_TOOLS` and `ALL_HANDLERS` constants in `src/index.ts`:

   ```typescript
   // In src/index.ts
   import { YOUR_TOOLS, YOUR_HANDLERS } from "./tools/your-tool.js";

   // Combine all tools
   const ALL_TOOLS = [...EXAMPLE_TOOLS, ...YOUR_TOOLS];
   const ALL_HANDLERS = { ...EXAMPLE_HANDLERS, ...YOUR_HANDLERS };
   ```

The server will automatically:

- List your tool in the available tools
- Handle input validation
- Process requests to your tool
- Format responses according to the MCP protocol

## Testing

The template includes a built-in TestClient for local testing and the MCP Inspector for visual debugging.

### Using TestClient

The TestClient provides a simple way to test your tools:

```typescript
import { TestClient } from "./utils/TestClient";

describe("YourTool", () => {
  const client = new TestClient();

  it("should process data correctly", async () => {
    await client.assertToolCall(
      "your-tool-name",
      { input: "test" },
      (result) => {
        expect(result.toolResult.content).toBeDefined();
      }
    );
  });
});
```

### Using MCP Inspector

The template includes the MCP Inspector for visual debugging of your tools:

1. Start the inspector:

   ```bash
   npx @modelcontextprotocol/inspector node dist/index.js
   ```

2. Open the inspector UI at http://localhost:5173

The inspector provides:

- Visual interface for testing tools
- Real-time request/response monitoring
- Tool metadata inspection
- Interactive testing environment

### Local Testing with Cursor

To test your MCP server locally with Cursor:

1. Build and link the package:

   ```bash
   npm run build
   npm run link
   ```

2. Verify the binary works:

   ```bash
   npx example-mcp-tool
   ```

3. Add the server to Cursor:

   - Open Cursor settings
   - Navigate to the Features tab
   - Scroll down to MCP Servers section
   - Click "Add Server"
   - Select "Command" type
   - Give it a name (e.g., "Local Example Tool")
   - Enter the command: `npx example-mcp-tool`
   - Click Confirm

4. Verify the server starts correctly in Cursor by checking the MCP Servers section shows your server as running.

Note: If you make changes to your code, remember to rebuild and relink:

```bash
npm run build
npm run link
```

When you're done testing, you can unlink the package:

```bash
npm run unlink
```

This will remove the global symlink created during development.
