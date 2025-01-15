import React from 'react';
import { Hero } from '../components/Hero';
import { CipherPlayground } from '../components/CipherPlayground';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-400">
              Start Your Cryptography Journey
            </h2>
            <p className="text-gray-300">
              Dive into the fascinating world of cryptography, where mathematics
              meets security. Learn how ancient civilizations protected their
              secrets and how modern encryption keeps our digital world safe.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <h3 className="font-bold mb-2">Classical Ciphers</h3>
                <p className="text-sm text-gray-400">
                  Explore historical encryption methods that shaped modern cryptography
                </p>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <h3 className="font-bold mb-2">Modern Encryption</h3>
                <p className="text-sm text-gray-400">
                  Discover how today's digital security works
                </p>
              </div>
            </div>
          </div>
          <CipherPlayground />
        </div>
      </main>
    </>
  );
};