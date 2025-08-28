'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingDown, Cpu, Zap, Target, Shield, BarChart3, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CompressModel() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            <Link href="/products/edge-ai/smart-model-compression">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Overview
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Smart Model Compression</h1>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">Model Compressor</Badge>
      </section>
      <section className="py-20 px-4 bg-gray-900/30 flex-1">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Compress Your AI Model</h2>
          <p className="text-lg text-gray-300 mb-8 text-center">Select compression techniques and let our AI optimize your model for edge deployment.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 1: Choose Compression</CardTitle>
                <CardDescription className="text-gray-400">Pruning, quantization, distillation, and more.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-purple-400 border-purple-400">Pruning</Button>
                  <Button variant="outline" className="text-pink-400 border-pink-400">Quantization</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">Distillation</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Custom</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 2: Select Target Device</CardTitle>
                <CardDescription className="text-gray-400">Optimize for ARM Cortex-M, ESP32, and more.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-purple-400 border-purple-400">ARM Cortex-M</Button>
                  <Button variant="outline" className="text-pink-400 border-pink-400">ESP32</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">AVR</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Custom</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Compress Model
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Compression Status</CardTitle>
                <CardDescription className="text-gray-400">See progress and results of your model compression.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="text-purple-400" />
                    <span className="text-white">Compression in progress...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="text-pink-400" />
                    <span className="text-white">Performance tuning...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="text-blue-400" />
                    <span className="text-white">Accuracy checks...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Compressed Model Preview</CardTitle>
                <CardDescription className="text-gray-400">Preview the optimized model details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                  <pre className="text-sm text-gray-300">
{`// Example Model Compression
Model: MobileNetV2
Original Size: 14.2 MB
Compressed Size: 1.1 MB
Accuracy: 98.2% (original), 97.9% (compressed)
Optimized for: ARM Cortex-M4
`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
