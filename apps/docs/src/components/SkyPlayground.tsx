import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const SkyPlayground = ({ children, reactCode, angularCode }) => {
  return (
    <div className="sky-playground-container my-8">
      {/* Live Preview Area */}
      <div className="preview-window sky-glass-cumulus p-12 rounded-t-2xl flex justify-center items-center border-b-0">
        {children}
      </div>

      {/* Code Toggle Area */}
      <div className="code-window bg-[#010816] rounded-b-2xl overflow-hidden border border-white/10">
        <Tabs>
          <TabItem value="react" label="React (TSX)" default>
            <pre className="p-4 text-sm"><code>{reactCode}</code></pre>
          </TabItem>
          <TabItem value="angular" label="Angular (HTML/TS)">
            <pre className="p-4 text-sm"><code>{angularCode}</code></pre>
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};