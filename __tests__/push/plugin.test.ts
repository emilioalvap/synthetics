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

import * as esbuild from 'esbuild';
import { join } from 'path';
import {
  MultiAssetPlugin,
  commonOptions,
  PluginData,
} from '../../src/push/plugin';

const E2E_DIR = join(__dirname, '..', 'e2e');

describe('Plugin', () => {
  it('bundle jouneys', async () => {
    const callback = (data: PluginData) => {
      expect(data.path).toContain('e2e/uptime.journey.ts');
      expect(data.contents).toMatchSnapshot();
    };

    await esbuild.build({
      ...commonOptions(),
      entryPoints: [join(E2E_DIR, 'uptime.journey.ts')],
      plugins: [MultiAssetPlugin(callback)],
    });
  });
});
