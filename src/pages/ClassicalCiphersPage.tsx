import React from 'react';
import { Key, Shuffle, ArrowDownUp, BookOpen, Info } from 'lucide-react';

export const ClassicalCiphersPage = () => {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Classical Ciphers</h1>
        
        {/* Introduction */}
        <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 mb-8">
          <div className="flex items-start gap-4">
            <BookOpen className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Introduction to Classical Cryptography</h2>
              <p className="text-gray-300 mb-4">
                Classical cryptography represents the foundation of modern encryption techniques. These methods, though simpler than their modern counterparts, introduced fundamental concepts that remain relevant today.
              </p>
              <div className="mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
                  alt="Cryptography Concept"
                  className="rounded-lg w-full mb-4"
                />
                <p className="text-sm text-gray-400 italic">Historical encryption methods laid the groundwork for modern cybersecurity</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8">
          {/* Substitution Techniques */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Key className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Substitution Techniques</h2>
                <p className="text-gray-300 mb-4">
                  Substitution ciphers replace each letter in the plaintext with a different letter or symbol.
                </p>
                
                {/* Caesar Cipher */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Caesar Cipher</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        The Caesar cipher shifts each letter in the plaintext by a fixed number of positions in the alphabet.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg mb-4">
                        <h4 className="font-bold mb-2">Example:</h4>
                        <p className="text-sm text-gray-400">
                          Shift: 3
                          <br />
                          Plaintext: HELLO
                          <br />
                          Ciphertext: KHOOR
                        </p>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
                        alt="Caesar Cipher Wheel"
                        className="rounded-lg w-full mb-4"
                      />
                      <p className="text-sm text-gray-400 italic">Caesar cipher wheel showing letter substitutions</p>
                    </div>
                  </div>
                </div>

                {/* Playfair Cipher */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Playfair Cipher</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        The Playfair cipher encrypts pairs of letters (digraphs) using a 5×5 grid constructed with a keyword.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Key Features:</h4>
                        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                          <li>Uses 5×5 grid (I/J combined)</li>
                          <li>Encrypts letter pairs</li>
                          <li>No letter can be paired with itself</li>
                          <li>More secure than simple substitution</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {/* Playfair Grid Example */}
                        {['P','L','A','Y','F','I','R','E','X','M','B','C','D','G','H','K','N','O','Q','S','T','U','V','W','Z'].map((letter, index) => (
                          <div key={index} className="aspect-square flex items-center justify-center bg-purple-900/30 rounded text-purple-300 font-mono">
                            {letter}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 italic">Example Playfair grid using keyword "PLAYFAIR"</p>
                    </div>
                  </div>
                </div>

                {/* Vigenère Cipher */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Vigenère Cipher</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        The Vigenère cipher uses a keyword to shift each letter by different amounts, making it more secure than the Caesar cipher.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Example:</h4>
                        <p className="text-sm text-gray-400">
                          Keyword: KEY
                          <br />
                          Plaintext: HELLO
                          <br />
                          Keyword repeated: KEYKE
                          <br />
                          Ciphertext: RIJVS
                        </p>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <table className="w-full text-sm text-gray-400">
                        <thead>
                          <tr>
                            <th className="border border-purple-500/30 p-2">Plain</th>
                            <th className="border border-purple-500/30 p-2">Key</th>
                            <th className="border border-purple-500/30 p-2">Shift</th>
                            <th className="border border-purple-500/30 p-2">Cipher</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-purple-500/30 p-2">H</td>
                            <td className="border border-purple-500/30 p-2">K</td>
                            <td className="border border-purple-500/30 p-2">10</td>
                            <td className="border border-purple-500/30 p-2">R</td>
                          </tr>
                          {/* Add more rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Transposition Techniques */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Shuffle className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Transposition Techniques</h2>
                
                {/* Rail Fence Cipher */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Rail Fence Cipher</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        The Rail Fence cipher writes the message in a zigzag pattern and reads off each "rail" to create the ciphertext.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Example with 3 rails:</h4>
                        <pre className="text-sm text-gray-400 font-mono">
                          H . . . O . . . D
                          . E . L . W . L .
                          . . L . . . R . .
                        </pre>
                        <p className="text-sm text-gray-400 mt-2">
                          Plaintext: HELLOWORLD
                          <br />
                          Ciphertext: HODELWLRL
                        </p>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-300">1</div>
                          <div className="flex-1 h-1 bg-purple-500/30"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center text-pink-300">2</div>
                          <div className="flex-1 h-1 bg-pink-500/30"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300">3</div>
                          <div className="flex-1 h-1 bg-blue-500/30"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columnar Transposition */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Columnar Transposition</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        The Columnar Transposition cipher arranges the plaintext in a grid and reads off columns according to a key.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Example with key "CIPHER":</h4>
                        <table className="w-full text-sm text-gray-400 mb-2">
                          <thead>
                            <tr>
                              <th className="border border-purple-500/30 p-2">C</th>
                              <th className="border border-purple-500/30 p-2">I</th>
                              <th className="border border-purple-500/30 p-2">P</th>
                              <th className="border border-purple-500/30 p-2">H</th>
                              <th className="border border-purple-500/30 p-2">E</th>
                              <th className="border border-purple-500/30 p-2">R</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-purple-500/30 p-2">H</td>
                              <td className="border border-purple-500/30 p-2">E</td>
                              <td className="border border-purple-500/30 p-2">L</td>
                              <td className="border border-purple-500/30 p-2">L</td>
                              <td className="border border-purple-500/30 p-2">O</td>
                              <td className="border border-purple-500/30 p-2">W</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">
                          1. Write message in rows
                          <br />
                          2. Number columns based on key
                          <br />
                          3. Read off columns in key order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cryptanalysis */}
          <section className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <ArrowDownUp className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Cryptanalysis Techniques</h2>
                
                {/* Frequency Analysis */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Frequency Analysis</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        Frequency analysis examines the occurrence of letters in ciphertext to break substitution ciphers.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Common English Letter Frequencies:</h4>
                        <p className="text-sm text-gray-400">
                          E (12.7%)
                          <br />
                          T (9.1%)
                          <br />
                          A (8.2%)
                          <br />
                          O (7.5%)
                        </p>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="h-40 flex items-end space-x-2">
                        {[12.7, 9.1, 8.2, 7.5, 7.0, 6.7, 6.3].map((height, index) => (
                          <div
                            key={index}
                            className="flex-1 bg-purple-500/30 rounded-t"
                            style={{ height: `${height * 2}px` }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-400">
                        <span>E</span>
                        <span>T</span>
                        <span>A</span>
                        <span>O</span>
                        <span>I</span>
                        <span>N</span>
                        <span>S</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pattern Recognition */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Pattern Recognition</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        Pattern recognition involves identifying repeated sequences and common word patterns in ciphertext.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Common Patterns:</h4>
                        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                          <li>Double letters (EE, OO)</li>
                          <li>Common word endings (-ING, -ED)</li>
                          <li>Short words (A, AN, THE)</li>
                          <li>Word length patterns</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="p-2 border border-purple-500/30 rounded">
                          <p className="text-sm text-gray-400">Example Pattern:</p>
                          <p className="font-mono text-purple-300">XYZ XYZ XYZ</p>
                          <p className="text-sm text-gray-400 mt-1">Suggests a repeated word</p>
                        </div>
                        <div className="p-2 border border-purple-500/30 rounded">
                          <p className="text-sm text-gray-400">Common Structure:</p>
                          <p className="font-mono text-purple-300">X XX XXX</p>
                          <p className="text-sm text-gray-400 mt-1">Might be "I AM THE"</p>
                        </div>
                      </div>
                    </div>
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