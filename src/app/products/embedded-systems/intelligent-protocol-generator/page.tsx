'use client';

import Link from 'next/link';
import { ArrowRight, Radio, Network, Shield, Zap, CheckCircle, Settings, Play, Cpu, Code, Layers, Clock, Wifi, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function IntelligentProtocolGenerator() {
  const protocols = [
    { name: "UART", complexity: "Simple", useCase: "Serial Communication", icon: "📟", speed: "Up to 115.2 kbps" },
    { name: "I2C", complexity: "Medium", useCase: "Sensor Networks", icon: "🔗", speed: "Up to 3.4 Mbps" },
    { name: "SPI", complexity: "Medium", useCase: "High-Speed Peripherals", icon: "⚡", speed: "Up to 50+ Mbps" },
    { name: "CAN", complexity: "Advanced", useCase: "Automotive Systems", icon: "🚗", speed: "Up to 1 Mbps" },
    { name: "Modbus", complexity: "Advanced", useCase: "Industrial Control", icon: "🏭", speed: "Up to 115.2 kbps" },
    { name: "TCP/IP", complexity: "Expert", useCase: "Network Communication", icon: "🌐", speed: "Gigabit+" },
    { name: "Bluetooth", complexity: "Expert", useCase: "Wireless Communication", icon: "📶", speed: "Up to 3 Mbps" },
    { name: "LoRaWAN", complexity: "Advanced", useCase: "IoT Long Range", icon: "📡", speed: "Up to 37.5 kbps" },
    { name: "Zigbee", complexity: "Advanced", useCase: "Mesh Networks", icon: "🕸️", speed: "Up to 250 kbps" }
  ];

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Auto Code Generation",
      description: "Generate complete protocol stacks with state machines, error handling, and optimized data structures."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Integration",
      description: "Built-in encryption, authentication, and security features for secure communication protocols."
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Layer Abstraction",
      description: "Properly structured protocol layers following industry standards and best practices."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Performance",
      description: "Optimized for real-time systems with predictable timing and minimal resource overhead."
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Multi-protocol Support",
      description: "Support for multiple concurrent protocols with intelligent resource sharing and management."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Configuration Engine",
      description: "Flexible configuration system for adapting protocols to specific hardware and requirements."
    }
  ];

  const stats = [
    { number: "50+", label: "Supported Protocols" },
    { number: "99.9%", label: "Protocol Compliance" },
    { number: "5x", label: "Faster Development" },
    { number: "100K+", label: "Generated Protocols" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0">
            📡 Embedded Systems
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Intelligent Protocol
            <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent block">Generator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate complete communication protocol implementations with AI. From simple UART to complex TCP/IP stacks - get production-ready protocol handlers in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0 shadow-lg text-lg px-8 py-6">
              <Link href="/products/embedded-systems/intelligent-protocol-generator/generate-protocol">
                <Play className="mr-2 h-5 w-5" />
                Generate Protocol
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Supported Protocols</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Generate optimized communication stacks for any of these protocols</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.map((protocol, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2">{protocol.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{protocol.useCase}</p>
                    </div>
                    <div className="text-3xl">{protocol.icon}</div>
                  </div>
                  <p className="text-cyan-300 text-xs mb-3">{protocol.speed}</p>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">{protocol.complexity}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Advanced Protocol Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Our intelligent protocol generator creates complete, optimized communication stacks</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-cyan-600 transition-colors">
                <CardContent className="p-6">
                  <div className="text-cyan-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-cyan-900 to-blue-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Building Communication Protocols
          </h2>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-cyan-900 hover:bg-gray-100 border-0 shadow-lg">
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
