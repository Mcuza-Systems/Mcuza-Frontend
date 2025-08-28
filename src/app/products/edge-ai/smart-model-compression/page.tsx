'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Cpu, BarChart3, Target, Shield, Layers, Play, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SmartModelCompression() {
  const features = [
    {
      icon: <TrendingDown className="h-6 w-6" />,
      title: "Intelligent Compression",
      description: "AI-powered model compression using pruning, quantization, and knowledge distillation with minimal accuracy loss."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Edge-Optimized",
      description: "Optimize models specifically for edge devices including ARM Cortex-M, ESP32, and other microcontrollers."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Tuning",
      description: "Automatic performance optimization for inference speed, memory usage, and power consumption."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Platform-Specific",
      description: "Generate optimized models for TensorFlow Lite, TensorRT, OpenVINO, and custom embedded runtimes."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Accuracy Preservation",
      description: "Advanced techniques to maintain model accuracy while achieving significant size and speed improvements."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Comprehensive Analytics",
      description: "Detailed analysis of compression results with performance metrics and deployment recommendations."
    }
  ];

  const compressionStats = [
    { metric: "Model Size Reduction", before: "150 MB", after: "2.1 MB", improvement: "98.6%" },
    { metric: "Inference Speed", before: "890 ms", after: "45 ms", improvement: "95%" },
    { metric: "Memory Usage", before: "64 MB", after: "4.2 MB", improvement: "93.4%" },
    { metric: "Power Consumption", before: "850 mW", after: "95 mW", improvement: "88.8%" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            🧠 Edge AI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Smart Model
            <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent block">Compression</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Deploy AI models on edge devices with intelligent compression. Reduce model size by 95%+ while maintaining accuracy using advanced pruning, quantization, and optimization techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg text-lg px-8 py-6">
              <Link href="/products/edge-ai/smart-model-compression/compress">
                <Play className="mr-2 h-5 w-5" />
                Compress Model
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-lg px-8 py-6">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Advanced Model Optimization
            </h2>
            <p className="text-xl text-gray-300">
              AI-powered compression techniques for maximum efficiency on edge devices
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Showcase */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Compression Results
            </h2>
            <p className="text-xl text-gray-300">
              Real performance improvements from our optimization algorithms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {compressionStats.map((stat, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold text-white text-lg mb-4">{stat.metric}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="text-sm text-gray-400">Before</div>
                      <div className="text-xl font-mono text-red-400">{stat.before}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">After</div>
                      <div className="text-xl font-mono text-green-400">{stat.after}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {stat.improvement} improvement
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Deploy AI Anywhere
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-400">95%</div>
              <div className="text-white font-semibold">Size Reduction</div>
              <div className="text-gray-400 text-sm">Average model size reduction</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-400">10x</div>
              <div className="text-white font-semibold">Faster Inference</div>
              <div className="text-gray-400 text-sm">Speed improvement on edge devices</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-400">50+</div>
              <div className="text-white font-semibold">Target Platforms</div>
              <div className="text-gray-400 text-sm">Supported edge deployment targets</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Compressing Your Models
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Deploy AI models on any edge device with intelligent compression
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-purple-900 hover:bg-gray-100 border-0 shadow-lg">
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
