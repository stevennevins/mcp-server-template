import { Tool } from '@modelcontextprotocol/sdk/types.js'
import { EXAMPLE_TOOLS, EXAMPLE_HANDLERS } from '../tools/example.js'

export type ToolResult = {
    toolResult: {
        content: Array<{ type: string; text: string }>
    }
}

export class TestClient {
    private tools: Tool[]
    private handlers: Record<string, Function>

    constructor() {
        this.tools = EXAMPLE_TOOLS
        this.handlers = EXAMPLE_HANDLERS
    }

    async listTools(): Promise<Tool[]> {
        return this.tools
    }

    async callTool(toolName: string, args: Record<string, unknown>): Promise<ToolResult> {
        const handler = this.handlers[toolName]
        if (!handler) {
            throw new Error(`Tool ${toolName} not found`)
        }

        return handler({ params: { arguments: args } })
    }

    async assertToolCall(
        toolName: string,
        args: Record<string, unknown>,
        assertion: (result: ToolResult) => void | Promise<void>
    ): Promise<void> {
        const result = await this.callTool(toolName, args)
        await assertion(result)
    }
}