import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { TestClient } from '../utils/TestClient.js';

describe('example-tool', () => {
    let client: TestClient;

    beforeAll(async () => {
        client = new TestClient();
    });

    it('should be available in tools list', async () => {
        const tools = await client.listTools();
        expect(tools).toContainEqual(
            expect.objectContaining({
                name: 'example-tool',
                description: 'An example tool that processes input data',
            })
        );
    });

    it('should process valid input', async () => {
        const result = await client.callTool(
            'example-tool',
            { input: 'test data' }
        );
        expect(result.toolResult.content[0]).toEqual({
            type: 'text',
            text: 'Processed: test data'
        });
    });

    it('should reject empty input', async () => {
        await expect(
            client.callTool('example-tool', { input: '' })
        ).rejects.toThrow('Input must not be empty');
    });

    it('should reject missing input', async () => {
        await expect(
            client.callTool('example-tool', {})
        ).rejects.toThrow('Required');
    });
});