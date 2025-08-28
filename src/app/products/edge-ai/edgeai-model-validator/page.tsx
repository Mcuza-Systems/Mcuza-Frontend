'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Play, Shield, Zap, Target, BarChart3, AlertTriangle, Clock, Cpu, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function EdgeAIModelValidator() {
  const validationTests = [
    {
      name: "Accuracy Validation",
      icon: "🎯",
      description: "Compare model accuracy against ground truth datasets",
      metrics: ["Precision", "Recall", "F1-Score", "mAP"]
    },
    {
      name: "Performance Profiling",
      icon: "⚡",
      description: "Measure inference speed and resource utilization",
      metrics: ["Latency", "Throughput", "Memory Usage", "Power Consumption"]
    },
    {
      name: "Robustness Testing",
      icon: "🛡️",
      description: "Test model stability under various conditions",
      metrics: ["Adversarial", "Noise Resistance", "Edge Cases", "Drift Detection"]
    },
    {
      name: "Hardware Compatibility",
      icon: "💻",
      description: "Validate deployment on target edge devices",
      metrics: ["Device Support", "Quantization", "Optimization", "Calibration"]
    },
    {
      name: "Regression Testing",
      icon: "🔄",
      description: "Automated testing for model updates and changes",
      metrics: ["Version Compare", "Performance Delta", "Feature Drift", "CI/CD Integration"]
    },
    {
      name: "Real-world Validation",
      icon: "🌍",
      description: "Test with real production data and scenarios",
      metrics: ["Live Data", "A/B Testing", "User Feedback", "Production Metrics"]
    }
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Comprehensive Testing Suite",
      description: "End-to-end validation covering accuracy, performance, robustness, and compatibility testing."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Hardware-Specific Validation",
      description: "Test models on actual target hardware including ARM, NVIDIA Jetson, Intel Movidius, and more."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Detailed Analytics",
      description: "Rich dashboards and reports with actionable insights for model improvement."
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Issue Detection",
      description: "Automatically identify potential issues like bias, overfitting, and performance degradation."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Automated Workflows",
      description: "Set up continuous validation pipelines that run automatically on model updates."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Visual Debugging",
      description: "Interactive visualizations to understand model behavior and identify problematic inputs."
    }
  ];

  const supportedFrameworks = [
    { name: "TensorFlow Lite", logo: "🧠", description: "Google's mobile ML framework" },
    { name: "PyTorch Mobile", logo: "🔥", description: "Facebook's edge deployment solution" },
    { name: "ONNX Runtime", logo: "⚙️", description: "Cross-platform inference engine" },
    { name: "Core ML", logo: "🍎", description: "Apple's on-device ML framework" },
    { name: "TensorRT", logo: "🚀", description: "NVIDIA's inference optimizer" },
    { name: "OpenVINO", logo: "📊", description: "Intel's edge AI toolkit" }
  ];

  const stats = [
    { number: "99.9%", label: "Validation Accuracy" },
    { number: "50+", label: "Supported Devices" },
    { number: "10x", label: "Faster Testing" },
    { number: "24/7", label: "Automated Monitoring" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-orange-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white border-0">
            ✅ Edge AI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            EdgeAI Model
            <span className="bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent block">Validator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Validate and test AI models for edge deployment. Comprehensive testing framework that ensures your models work reliably on target hardware before production.
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 border-0 shadow-lg text-lg px-8 py-6">
            <Link href="/products/edge-ai/edgeai-model-validator/validate">
              <Play className="mr-2 h-5 w-5" />
              Validate Model
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-rose-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Tests Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Comprehensive Validation Suite</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Thoroughly test your AI models across all critical dimensions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {validationTests.map((test, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-rose-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{test.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{test.name}</h3>
                      <p className="text-gray-400 text-sm">{test.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {test.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-rose-600/30 text-rose-300">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Advanced Validation Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Everything you need for thorough AI model validation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-rose-500 transition-colors">
                <CardContent className="p-6">
                  <div className="text-rose-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Frameworks Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Supported AI Frameworks</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Validate models from all major ML frameworks</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedFrameworks.map((framework, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-rose-600 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{framework.logo}</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{framework.name}</h3>
                  <p className="text-gray-400 text-sm">{framework.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-900 to-orange-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Validate Your AI Models?
          </h2>
          <p className="text-xl mb-8 text-rose-100">Ensure your models work perfectly on edge devices before deployment</p>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-rose-900 hover:bg-gray-100 border-0 shadow-lg">
            <Link href="/products/edge-ai/edgeai-model-validator/validate">
              Start Model Validation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
