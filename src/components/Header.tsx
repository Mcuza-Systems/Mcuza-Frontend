'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, Terminal, Code2, Cpu, Brain, Settings, Zap, ChevronDown, Power, Monitor, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    {
      category: 'Embedded Systems',
      items: [
        { name: 'Intelligent Drivers Generator', href: '/products/embedded-systems/intelligent-drivers-generator' },
        { name: 'Smart HAL Synthesizer', href: '/products/embedded-systems/smart-hal-synthesizer' },
        { name: 'Intelligent Protocol Generator', href: '/products/embedded-systems/intelligent-protocol-generator' },
        { name: 'Firmware Snippet Generator', href: '/products/embedded-systems/firmware-snippet-generator' },
        { name: 'Porting Firmware For MCUs', href: '/products/embedded-systems/porting-firmware-mcus' },
      ]
    },
    {
      category: 'Edge AI',
      items: [
        { name: 'Smart Model Compression', href: '/products/edge-ai/smart-model-compression' },
        { name: 'EdgeAI Model Validator', href: '/products/edge-ai/edgeai-model-validator' },
      ]
    },
    {
      category: 'FPGA Workflows',
      items: [
        { name: 'HDL Code Generation & Optimization', href: '/products/fpga/hdl-code-generation' },
        { name: 'BitStream Generation', href: '/products/fpga/bitstream-generation' },
        { name: 'Test Bench Automation', href: '/products/fpga/testbench-automation' },
      ]
    }
  ];

  return (
    <>
      {/* IDE Toolbar */}
      <header className="sticky top-0 z-50 w-full bg-[#1e1e1e] border-b border-[#3e3e3e] scanlines">
        <div className="flex h-12 items-center px-4">
          {/* Left Section - Brand & Navigation */}
          <div className="flex items-center gap-1">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-[#2d2d2d] transition-colors">
              <Terminal className="h-4 w-4 text-[#00ff41]" />
              <span className="text-[#00ff41] font-mono font-bold text-sm terminal-text">MCUZA</span>
            </Link>
            
            <div className="w-px h-6 bg-[#3e3e3e] mx-2"></div>
            
            {/* Tool Tabs like IDE */}
            <div className="flex items-center">
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-xs font-mono text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors">
                  <Code2 className="h-3 w-3" />
                  Embedded
                  <ChevronDown className="h-3 w-3" />
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#252526] border border-[#3e3e3e] rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="text-xs text-[#00ff41] font-mono mb-2 px-2">EMBEDDED_SYSTEMS/</div>
                    {products[0].items.map((item) => (
                      <Link key={item.name} href={item.href} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors font-mono">
                        <span className="text-[#569cd6]">→</span>
                        {item.name.toLowerCase().replace(/\s+/g, '_')}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-xs font-mono text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors">
                  <Brain className="h-3 w-3" />
                  AI/ML
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#252526] border border-[#3e3e3e] rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="text-xs text-[#00ff41] font-mono mb-2 px-2">EDGE_AI/</div>
                    {products[1].items.map((item) => (
                      <Link key={item.name} href={item.href} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors font-mono">
                        <span className="text-[#569cd6]">→</span>
                        {item.name.toLowerCase().replace(/\s+/g, '_')}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-xs font-mono text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors">
                  <Cpu className="h-3 w-3" />
                  FPGA
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#252526] border border-[#3e3e3e] rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="text-xs text-[#00ff41] font-mono mb-2 px-2">FPGA_WORKFLOWS/</div>
                    {products[2].items.map((item) => (
                      <Link key={item.name} href={item.href} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors font-mono">
                        <span className="text-[#569cd6]">→</span>
                        {item.name.toLowerCase().replace(/\s+/g, '_')}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link href="/rapid-prototyping" className="flex items-center gap-1 px-3 py-2 text-xs font-mono text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors">
                <Zap className="h-3 w-3" />
                rapid_prototype.exe
              </Link>
            </div>
          </div>
          
          {/* Center - Breadcrumb/Path */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1 px-3 py-1 bg-[#0e0e0e] rounded-md border border-[#3e3e3e] font-mono text-xs text-gray-400">
              <span className="text-[#00ff41]">~/mcuza</span>
              <span>/</span>
              <span>workspace</span>
              <span className="terminal-cursor"></span>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-gray-400 hover:text-[#00ff41] hover:bg-[#2d2d2d] rounded transition-colors">
              <Monitor className="h-3 w-3" />
              docs
            </button>
            
            <div className="w-px h-6 bg-[#3e3e3e] mx-2"></div>
            
            <Link href="/login" className="flex items-center gap-1 px-3 py-1 text-xs font-mono text-gray-300 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors">
              auth.login()
            </Link>
            
            <Link href="/signup" className="flex items-center gap-1 px-3 py-1 bg-[#00ff41] text-black font-mono text-xs hover:bg-[#00ff41]/90 rounded transition-colors">
              <Power className="h-3 w-3" />
              INIT
            </Link>
            
            <button className="p-1 text-gray-400 hover:text-[#00ff41] transition-colors">
              <Maximize2 className="h-3 w-3" />
            </button>
          </div>
        </div>
        
        {/* Status Bar like IDE */}
        <div className="h-5 bg-[#007acc] flex items-center justify-between px-4 text-xs font-mono text-white">
          <div className="flex items-center gap-4">
            <span>● ONLINE</span>
            <span>v2.1.0</span>
            <span>MCU: STM32</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>LF</span>
            <span>Spaces: 2</span>
            <span>Line 1, Col 1</span>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu - Simplified */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 right-4 z-[60]">
          <Button size="sm" className="bg-[#2d2d2d] border border-[#3e3e3e] text-[#00ff41] hover:bg-[#3d3d3d]">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-80 bg-[#1e1e1e] border-l border-[#3e3e3e] p-0">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="h-5 w-5 text-[#00ff41]" />
              <span className="text-[#00ff41] font-mono font-bold">MCUZA-IDE</span>
            </div>
            
            <nav className="space-y-4">
              {products.map((category) => (
                <div key={category.category}>
                  <div className="text-xs text-[#00ff41] font-mono mb-2">{category.category.toUpperCase()}/</div>
                  <div className="space-y-1 pl-4">
                    {category.items.map((item) => (
                      <Link key={item.name} href={item.href} className="block text-xs text-gray-300 hover:text-white font-mono py-1" onClick={() => setIsOpen(false)}>
                        → {item.name.toLowerCase().replace(/\s+/g, '_')}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-[#3e3e3e] space-y-2">
                <Link href="/rapid-prototyping" className="block text-xs text-gray-300 hover:text-white font-mono py-1" onClick={() => setIsOpen(false)}>
                  → rapid_prototype.exe
                </Link>
                <Link href="/docs" className="block text-xs text-gray-300 hover:text-white font-mono py-1" onClick={() => setIsOpen(false)}>
                  → documentation/
                </Link>
              </div>
              
              <div className="pt-4 border-t border-[#3e3e3e] space-y-2">
                <Link href="/login" className="block text-xs text-gray-300 hover:text-white font-mono py-2" onClick={() => setIsOpen(false)}>
                  auth.login()
                </Link>
                <Link href="/signup" className="block text-xs bg-[#00ff41] text-black font-mono py-2 px-3 rounded" onClick={() => setIsOpen(false)}>
                  INIT_WORKSPACE
                </Link>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
