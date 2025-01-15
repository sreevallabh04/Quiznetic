import React from 'react';
import { Shield, Key, Lock, Database, Cpu, Network } from 'lucide-react';

export const ModernEncryptionPage = () => {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Modern Encryption</h1>
        
        {/* Introduction */}
        <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Modern Cryptography Overview</h2>
              <p className="text-gray-300 mb-4">
                Modern cryptography combines advanced mathematics with computer science to provide secure communication in the digital age.
              </p>
              <div className="mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Encryption Concept"
                  className="rounded-lg w-full mb-4"
                />
                <p className="text-sm text-gray-400 italic">Modern encryption protects our digital world</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8">
          {/* Block Ciphers */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Cpu className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Block Ciphers</h2>
                
                {/* DES */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">DES (Data Encryption Standard)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        DES was the first widely-used block cipher standard, operating on 64-bit blocks with a 56-bit key.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Key Features:</h4>
                        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                          <li>16 rounds of processing</li>
                          <li>Feistel network structure</li>
                          <li>56-bit key (considered insecure today)</li>
                          <li>64-bit block size</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80"
                        alt="DES Structure Visualization"
                        className="rounded-lg w-full mb-4"
                      />
                      <p className="text-sm text-gray-400 italic">DES encryption process visualization</p>
                    </div>
                  </div>
                </div>

                {/* AES */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-300">AES (Advanced Encryption Standard)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        AES is the current standard for symmetric encryption, offering multiple key sizes and excellent performance.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Specifications:</h4>
                        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                          <li>Key sizes: 128, 192, or 256 bits</li>
                          <li>128-bit block size</li>
                          <li>Substitution-permutation network</li>
                          <li>Highly efficient in hardware</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {Array(16).fill(0).map((_, i) => (
                          <div key={i} className="aspect-square bg-purple-900/30 rounded flex items-center justify-center text-purple-300 text-xs">
                            {i.toString(16).toUpperCase()}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 italic">AES state matrix representation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Public Key Cryptography */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Key className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Public Key Cryptography</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-4">
                      Public key cryptography uses key pairs for encryption and decryption, enabling secure communication without sharing secret keys.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Common Algorithms:</h4>
                      <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                        <li>RSA (Rivest-Shamir-Adleman)</li>
                        <li>ECC (Elliptic Curve Cryptography)</li>
                        <li>Diffie-Hellman Key Exchange</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-purple-500/30 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-purple-300" />
                      </div>
                      <div className="flex-1 h-1 bg-purple-500/30 mx-4"></div>
                      <div className="w-16 h-16 rounded-full bg-pink-500/30 flex items-center justify-center">
                        <Key className="w-8 h-8 text-pink-300" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 italic text-center">Public key encryption flow</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hash Functions */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Network className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Hash Functions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-4">
                      Cryptographic hash functions create fixed-size outputs from any input, used for digital signatures and password storage.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Popular Hash Functions:</h4>
                      <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                        <li>SHA-256</li>
                        <li>SHA-3</li>
                        <li>BLAKE2</li>
                        <li>Argon2 (for passwords)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="p-2 border border-purple-500/30 rounded">
                        <p className="text-sm font-mono text-purple-300 break-all">
                          Input: "Hello"
                          <br />
                          SHA-256: 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Demo */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Database className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Modern Applications</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 text-purple-300">HTTPS/TLS</h3>
                    <img 
                      src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80"
                      alt="Web Security"
                      className="rounded-lg w-full mb-4"
                    />
                    <p className="text-sm text-gray-400">
                      Secures web communication using certificates and encryption
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 text-purple-300">Digital Signatures</h3>
                    <img 
                      src="https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=400&q=80"
                      alt="Digital Signatures"
                      className="rounded-lg w-full mb-4"
                    />
                    <p className="text-sm text-gray-400">
                      Ensures authenticity and non-repudiation of digital documents
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 text-purple-300">Blockchain</h3>
                    <img 
                      src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=400&q=80"
                      alt="Blockchain Technology"
                      className="rounded-lg w-full mb-4"
                    />
                    <p className="text-sm text-gray-400">
                      Uses cryptography for secure, decentralized transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};