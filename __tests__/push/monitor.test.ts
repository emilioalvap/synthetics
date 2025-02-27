/**
 * MIT License
 *
 * Copyright (c) 2020-present, Elastic NV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

import { buildMonitorSchema, createMonitors } from '../../src/push/monitor';
import { Server } from '../utils/server';
import { createTestMonitor } from '../utils/test-config';

describe('Monitors', () => {
  const monitor = createTestMonitor('example.journey.ts');
  let server: Server;
  beforeAll(async () => {
    server = await Server.create();
  });
  afterAll(async () => {
    await server.close();
    process.env.NO_COLOR = '';
  });

  it('build monitor schema monitor', async () => {
    const schema = await buildMonitorSchema([monitor]);
    expect(schema[0]).toEqual({
      id: 'test-monitor',
      name: 'test',
      schedule: 10,
      enabled: true,
      locations: ['europe-west2-a', 'australia-southeast1-a'],
      privateLocations: ['germany'],
      content: expect.any(String),
      filter: {
        match: 'test',
      },
    });
  });

  it('api schema', async () => {
    server.route(
      '/s/dummy/api/synthetics/service/project/monitors',
      (req, res) => {
        let data = '';
        req.on('data', chunks => {
          data += chunks;
        });
        req.on('end', () => {
          // Write the post data back
          res.end(data.toString());
        });
      }
    );
    const schema = await buildMonitorSchema([monitor]);
    const { statusCode, body } = await createMonitors(
      schema,
      {
        url: `${server.PREFIX}`,
        auth: 'apiKey',
        project: 'blah',
        space: 'dummy',
      },
      false
    );

    expect(statusCode).toBe(200);
    expect(await body.json()).toEqual({
      project: 'blah',
      keep_stale: false,
      monitors: schema,
    });
  });
});
