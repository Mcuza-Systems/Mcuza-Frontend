import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Terminal, Code2, Cpu, Database, Command } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Terminal-style Footer */}
      <footer className="bg-[#1e1e1e] border-t border-[#3e3e3e] scanlines">
        <div className="px-4 py-8">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3e3e3e]">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#00ff41]" />
              <span className="font-mono text-sm text-[#00ff41]">MCUZA-SYSTEMS</span>
              <span className="text-gray-500 text-xs font-mono">v2.1.0</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span>CONNECTED</span>
              <span>•</span>
              <span>SSL SECURE</span>
              <span>•</span>
              <span>UPTIME: 99.98%</span>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
            {/* System Info */}
            <div>
              <div className="text-[#00ff41] mb-3 font-bold">SYSTEM_INFO/</div>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3 w-3 text-[#569cd6]" />
                  <span>MCUZA Systems</span>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  AI-powered electronics development platform for engineers and innovators.
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link href="https://github.com/mcuza" className="text-gray-400 hover:text-[#00ff41] transition-colors">
                    <Github className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-[#00ff41] transition-colors">
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-[#00ff41] transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-[#00ff41] transition-colors">
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Modules */}
            <div>
              <div className="text-[#40e0d0] mb-3 font-bold">MODULES/</div>
              <div className="space-y-2">
                <Link href="/products/embedded-systems" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Code2 className="h-3 w-3" />
                  <span>embedded_systems.so</span>
                </Link>
                <Link href="/products/edge-ai" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Database className="h-3 w-3" />
                  <span>edge_ai.dll</span>
                </Link>
                <Link href="/products/fpga" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Cpu className="h-3 w-3" />
                  <span>fpga_workflows.bin</span>
                </Link>
                <Link href="/rapid-prototyping" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Command className="h-3 w-3" />
                  <span>rapid_prototype.exe</span>
                </Link>
              </div>
            </div>
            
            {/* Documentation */}
            <div>
              <div className="text-[#ff6b35] mb-3 font-bold">DOCS/</div>
              <div className="space-y-2">
                <Link href="/docs" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>api_reference.md</span>
                </Link>
                <Link href="/tutorials" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>getting_started.md</span>
                </Link>
                <Link href="/examples" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>examples/</span>
                </Link>
                <Link href="/community" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>community.md</span>
                </Link>
                <Link href="/blog" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>changelog.txt</span>
                </Link>
              </div>
            </div>
            
            {/* System Status */}
            <div>
              <div className="text-[#f7931e] mb-3 font-bold">STATUS/</div>
              <div className="space-y-2">
                <Link href="/about" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>about_us</span>
                </Link>
                <Link href="/careers" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>join_team()</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>contact.php</span>
                </Link>
                <Link href="/privacy" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>privacy.policy</span>
                </Link>
                <Link href="/terms" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span>→</span>
                  <span>terms.service</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Terminal Status Bar */}
      <div className="bg-[#007acc] h-6 flex items-center justify-between px-4 text-xs font-mono text-white">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] pulse-green"></span>
            MCUZA-SYSTEMS
          </span>
          <span>© 2024 MCUZA | All rights reserved</span>
        </div>
        <div className="flex items-center gap-4">
          <span>BUILD: stable</span>
          <span>ARCH: x64</span>
          <span>PLATFORM: web</span>
          <span>💚 Electronics Community</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
