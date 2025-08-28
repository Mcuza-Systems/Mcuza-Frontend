'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Cpu, ArrowsExpand, Layers, Clock, ArrowRight, Check, ChevronRight, X, Info, AlertCircle, Download, FileDown, Zap, Settings, Bookmark, Upload, BarChart, Gauge, Smartphone, Server, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ModelValidatorIDE() {
  // State management for model validation workflow
  const [activeStep, setActiveStep] = useState(1);
  const [modelDetails, setModelDetails] = useState({
    name: '',
    type: '',
    framework: '',
    size: '',
    inputShape: '',
    outputShape: ''
  });
  const [targetDevices, setTargetDevices] = useState([]);
  const [validationOptions, setValidationOptions] = useState({
    accuracyThreshold: 0.85,
    latencyThreshold: 100,
    memoryThreshold: 50,
    powerThreshold: 500,
    validateQuantization: true,
    validateOptimization: true,
    validateInference: true,
    generateReport: true
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  
  // Predefined data for model types and frameworks
  const modelTypes = [
    { id: 'classification', name: 'Image Classification' },
    { id: 'detection', name: 'Object Detection' },
    { id: 'segmentation', name: 'Semantic Segmentation' },
    { id: 'nlp', name: 'Natural Language Processing' },
    { id: 'audio', name: 'Audio Processing' },
    { id: 'anomaly', name: 'Anomaly Detection' },
    { id: 'timeseries', name: 'Time Series Analysis' },
  ];

  const frameworks = [
    { id: 'tensorflow', name: 'TensorFlow' },
    { id: 'pytorch', name: 'PyTorch' },
    { id: 'tflite', name: 'TensorFlow Lite' },
    { id: 'onnx', name: 'ONNX' },
    { id: 'caffe', name: 'Caffe' },
    { id: 'mxnet', name: 'MXNet' },
    { id: 'keras', name: 'Keras' },
  ];

  const deviceOptions = [
    { id: 'stm32', name: 'STM32 MCUs', category: 'microcontroller', icon: <Cpu className="h-4 w-4" /> },
    { id: 'esp32', name: 'ESP32', category: 'microcontroller', icon: <Cpu className="h-4 w-4" /> },
    { id: 'arduino', name: 'Arduino', category: 'microcontroller', icon: <Cpu className="h-4 w-4" /> },
    { id: 'raspberry_pi', name: 'Raspberry Pi', category: 'sbc', icon: <Laptop className="h-4 w-4" /> },
    { id: 'jetson_nano', name: 'NVIDIA Jetson Nano', category: 'sbc', icon: <Laptop className="h-4 w-4" /> },
    { id: 'android', name: 'Android Devices', category: 'mobile', icon: <Smartphone className="h-4 w-4" /> },
    { id: 'ios', name: 'iOS Devices', category: 'mobile', icon: <Smartphone className="h-4 w-4" /> },
    { id: 'edge_tpu', name: 'Google Edge TPU', category: 'accelerator', icon: <Zap className="h-4 w-4" /> },
    { id: 'intel_ncs', name: 'Intel Neural Compute Stick', category: 'accelerator', icon: <Zap className="h-4 w-4" /> },
    { id: 'aws_iot', name: 'AWS IoT Greengrass', category: 'cloud', icon: <Server className="h-4 w-4" /> },
    { id: 'azure_iot', name: 'Azure IoT Edge', category: 'cloud', icon: <Server className="h-4 w-4" /> },
  ];

  // Helper functions for step completion and progress
  const isStepComplete = (step) => {
    switch (step) {
      case 1: return modelDetails.name && modelDetails.type && modelDetails.framework;
      case 2: return targetDevices.length > 0;
      case 3: return true; // Validation options are optional with defaults
      default: return false;
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    for (let i = 1; i <= 3; i++) {
      if (isStepComplete(i)) completed++;
    }
    return (completed / 3) * 100;
  };

  // Navigation functions
  const goToNextStep = () => {
    if (activeStep < 4 && isStepComplete(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Handlers for model details and target device changes
  const handleModelDetailChange = (field, value) => {
    setModelDetails({
      ...modelDetails,
      [field]: value
    });
  };

  const handleTargetDeviceToggle = (deviceId) => {
    setTargetDevices(prev => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };

  const handleValidationOptionChange = (option, value) => {
    setValidationOptions({
      ...validationOptions,
      [option]: value
    });
  };

  // Model validation function
  const validateModel = () => {
    if (!isStepComplete(1) || !isStepComplete(2)) {
      return;
    }

    setIsValidating(true);
    setValidationProgress(0);
    setValidationResults(null);

    // Simulate validation process
    const interval = setInterval(() => {
      setValidationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          
          // Generate example validation results
          const results = {
            summary: {
              passed: true,
              score: 87,
              issues: 2,
              warnings: 3
            },
            metrics: {
              accuracy: {
                value: 0.89,
                threshold: validationOptions.accuracyThreshold,
                passed: 0.89 >= validationOptions.accuracyThreshold
              },
              latency: {
                value: 85,
                unit: 'ms',
                threshold: validationOptions.latencyThreshold,
                passed: 85 <= validationOptions.latencyThreshold
              },
              memory: {
                value: 42,
                unit: 'MB',
                threshold: validationOptions.memoryThreshold,
                passed: 42 <= validationOptions.memoryThreshold
              },
              power: {
                value: 450,
                unit: 'mW',
                threshold: validationOptions.powerThreshold,
                passed: 450 <= validationOptions.powerThreshold
              }
            },
            deviceCompatibility: targetDevices.map(deviceId => {
              const device = deviceOptions.find(d => d.id === deviceId);
              // Randomly determine if device is compatible
              const isCompatible = Math.random() > 0.2;
              return {
                id: deviceId,
                name: device?.name || deviceId,
                compatible: isCompatible,
                issues: isCompatible ? [] : [
                  'Memory constraints exceeded',
                  'Unsupported operations detected'
                ]
              };
            }),
            optimizationSuggestions: [
              'Quantize weights to INT8 for 70% size reduction',
              'Prune model to remove redundant connections',
              'Use layer fusion to reduce computational overhead',
              'Convert to TensorFlow Lite for better edge performance'
            ]
          };
          
          setValidationResults(results);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  // UI for the IDE
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-900 p-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <Link href="/products/edge-ai/edgeai-model-validator">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">EdgeAI Model Validator</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            {isValidating ? 'Validating...' : 'Ready'}
          </Badge>
          <Badge variant="outline" className="bg-gray-800">
            <Layers className="h-3 w-3 mr-1" />
            {modelDetails.type ? modelTypes.find(t => t.id === modelDetails.type)?.name : 'No Model Selected'}
          </Badge>
        </div>
      </div>

      {/* Left Sidebar - Steps */}
      <div className="w-64 bg-gray-900 pt-16 pb-4 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Validation Steps</h2>
          <div className="mt-4 space-y-1">
            <button
              onClick={() => setActiveStep(1)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${activeStep === 1 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(1) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(1) ? <Check className="h-3 w-3" /> : '1'}
              </div>
              <span>Model Details</span>
              {activeStep === 1 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(1) && setActiveStep(2)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(1) ? 'opacity-50 cursor-not-allowed' : activeStep === 2 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(1)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(2) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(2) ? <Check className="h-3 w-3" /> : '2'}
              </div>
              <span>Target Devices</span>
              {activeStep === 2 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(2) && setActiveStep(3)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(2) ? 'opacity-50 cursor-not-allowed' : activeStep === 3 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(2)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(3) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(3) ? <Check className="h-3 w-3" /> : '3'}
              </div>
              <span>Validation Options</span>
              {activeStep === 3 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(3) && setActiveStep(4)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(3) ? 'opacity-50 cursor-not-allowed' : activeStep === 4 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(3)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${validationResults ? 'bg-green-500' : 'bg-gray-700'}`}>
                {validationResults ? <Check className="h-3 w-3" /> : '4'}
              </div>
              <span>Validate Model</span>
              {activeStep === 4 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
          </div>
        </div>
        
        <div className="px-4 mt-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Progress</h2>
          <Progress value={calculateProgress()} className="mt-2 h-2" />
          <p className="text-xs text-gray-500 mt-1">{Math.round(calculateProgress())}% Complete</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pt-16 pb-4 overflow-y-auto">
        <div className="p-6">
          {/* Step 1: Model Details */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Model Details</h2>
              <p className="text-gray-400 mb-6">Provide information about the AI model you want to validate for edge deployment.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="modelName" className="text-sm font-medium mb-2 block">
                        Model Name
                      </Label>
                      <Input 
                        id="modelName"
                        placeholder="Enter model name"
                        className="bg-gray-950 border-gray-800"
                        value={modelDetails.name}
                        onChange={(e) => handleModelDetailChange('name', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="modelSize" className="text-sm font-medium mb-2 block">
                        Model Size (Optional)
                      </Label>
                      <Input 
                        id="modelSize"
                        placeholder="e.g., 4.5 MB"
                        className="bg-gray-950 border-gray-800"
                        value={modelDetails.size}
                        onChange={(e) => handleModelDetailChange('size', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="modelType" className="text-sm font-medium mb-2 block">
                      Model Type
                    </Label>
                    <Select 
                      value={modelDetails.type} 
                      onValueChange={(value) => handleModelDetailChange('type', value)}
                    >
                      <SelectTrigger className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-950 border-gray-800">
                        {modelTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="modelFramework" className="text-sm font-medium mb-2 block">
                      Framework
                    </Label>
                    <Select 
                      value={modelDetails.framework} 
                      onValueChange={(value) => handleModelDetailChange('framework', value)}
                    >
                      <SelectTrigger className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-950 border-gray-800">
                        {frameworks.map((framework) => (
                          <SelectItem key={framework.id} value={framework.id}>{framework.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="inputShape" className="text-sm font-medium mb-2 block">
                        Input Shape (Optional)
                      </Label>
                      <Input 
                        id="inputShape"
                        placeholder="e.g., [1, 224, 224, 3]"
                        className="bg-gray-950 border-gray-800"
                        value={modelDetails.inputShape}
                        onChange={(e) => handleModelDetailChange('inputShape', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="outputShape" className="text-sm font-medium mb-2 block">
                        Output Shape (Optional)
                      </Label>
                      <Input 
                        id="outputShape"
                        placeholder="e.g., [1, 1000]"
                        className="bg-gray-950 border-gray-800"
                        value={modelDetails.outputShape}
                        onChange={(e) => handleModelDetailChange('outputShape', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="bg-gray-800 border-gray-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Model
                      </Button>
                      <p className="text-xs text-gray-500">
                        Supported formats: .tflite, .pb, .onnx, .pt, .h5
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={goToNextStep} 
                  disabled={!isStepComplete(1)}
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Target Devices */}
          {activeStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Target Devices</h2>
              <p className="text-gray-400 mb-6">Select the edge devices you want to validate your model against.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Device Categories</h3>
                      <Tabs defaultValue="all">
                        <TabsList className="bg-gray-800">
                          <TabsTrigger value="all">All Devices</TabsTrigger>
                          <TabsTrigger value="microcontroller">Microcontrollers</TabsTrigger>
                          <TabsTrigger value="sbc">Single Board Computers</TabsTrigger>
                          <TabsTrigger value="mobile">Mobile Devices</TabsTrigger>
                          <TabsTrigger value="accelerator">Accelerators</TabsTrigger>
                          <TabsTrigger value="cloud">Cloud Edge</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="all" className="mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {deviceOptions.map((device) => (
                              <div 
                                key={device.id}
                                className={`p-4 rounded-md border-2 cursor-pointer transition-all ${targetDevices.includes(device.id) ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 hover:border-gray-700 bg-gray-900'}`}
                                onClick={() => handleTargetDeviceToggle(device.id)}
                              >
                                <div className="flex items-center">
                                  <div className="p-2 rounded-md bg-gray-800 mr-3">
                                    {device.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{device.name}</h4>
                                    <p className="text-xs text-gray-400 capitalize">{device.category}</p>
                                  </div>
                                  {targetDevices.includes(device.id) && (
                                    <Check className="h-4 w-4 ml-auto text-purple-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        {['microcontroller', 'sbc', 'mobile', 'accelerator', 'cloud'].map((category) => (
                          <TabsContent key={category} value={category} className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {deviceOptions
                                .filter(device => device.category === category)
                                .map((device) => (
                                  <div 
                                    key={device.id}
                                    className={`p-4 rounded-md border-2 cursor-pointer transition-all ${targetDevices.includes(device.id) ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 hover:border-gray-700 bg-gray-900'}`}
                                    onClick={() => handleTargetDeviceToggle(device.id)}
                                  >
                                    <div className="flex items-center">
                                      <div className="p-2 rounded-md bg-gray-800 mr-3">
                                        {device.icon}
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{device.name}</h4>
                                        <p className="text-xs text-gray-400 capitalize">{device.category}</p>
                                      </div>
                                      {targetDevices.includes(device.id) && (
                                        <Check className="h-4 w-4 ml-auto text-purple-500" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-sm text-gray-400">
                        Selected Devices: {targetDevices.length > 0 ? targetDevices.length : 'None'}
                      </p>
                      {targetDevices.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {targetDevices.map(deviceId => {
                            const device = deviceOptions.find(d => d.id === deviceId);
                            return (
                              <Badge key={deviceId} variant="secondary" className="bg-gray-800">
                                {device?.name}
                                <X 
                                  className="h-3 w-3 ml-1 cursor-pointer" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTargetDeviceToggle(deviceId);
                                  }}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
                <Button 
                  onClick={goToNextStep} 
                  disabled={!isStepComplete(2)}
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Validation Options */}
          {activeStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Validation Options</h2>
              <p className="text-gray-400 mb-6">Configure validation thresholds and options for your model.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Performance Thresholds</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="accuracyThreshold" className="text-sm font-medium mb-2 block">
                            Minimum Accuracy ({(validationOptions.accuracyThreshold * 100).toFixed(0)}%)
                          </Label>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">50%</span>
                            <input 
                              type="range" 
                              min="0.5" 
                              max="0.99" 
                              step="0.01"
                              value={validationOptions.accuracyThreshold}
                              onChange={(e) => handleValidationOptionChange('accuracyThreshold', parseFloat(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-xs text-gray-500 ml-2">99%</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="latencyThreshold" className="text-sm font-medium mb-2 block">
                            Maximum Latency ({validationOptions.latencyThreshold} ms)
                          </Label>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">10ms</span>
                            <input 
                              type="range" 
                              min="10" 
                              max="1000" 
                              step="10"
                              value={validationOptions.latencyThreshold}
                              onChange={(e) => handleValidationOptionChange('latencyThreshold', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-xs text-gray-500 ml-2">1000ms</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="memoryThreshold" className="text-sm font-medium mb-2 block">
                            Maximum Memory Usage ({validationOptions.memoryThreshold} MB)
                          </Label>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">5MB</span>
                            <input 
                              type="range" 
                              min="5" 
                              max="500" 
                              step="5"
                              value={validationOptions.memoryThreshold}
                              onChange={(e) => handleValidationOptionChange('memoryThreshold', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-xs text-gray-500 ml-2">500MB</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="powerThreshold" className="text-sm font-medium mb-2 block">
                            Maximum Power Consumption ({validationOptions.powerThreshold} mW)
                          </Label>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">100mW</span>
                            <input 
                              type="range" 
                              min="100" 
                              max="2000" 
                              step="50"
                              value={validationOptions.powerThreshold}
                              onChange={(e) => handleValidationOptionChange('powerThreshold', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-xs text-gray-500 ml-2">2000mW</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-4">Validation Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="validateQuantization" 
                            checked={validationOptions.validateQuantization}
                            onCheckedChange={(checked) => handleValidationOptionChange('validateQuantization', checked)}
                          />
                          <Label htmlFor="validateQuantization" className="text-sm">
                            Validate Quantization Compatibility
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="validateOptimization" 
                            checked={validationOptions.validateOptimization}
                            onCheckedChange={(checked) => handleValidationOptionChange('validateOptimization', checked)}
                          />
                          <Label htmlFor="validateOptimization" className="text-sm">
                            Validate Optimization Opportunities
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="validateInference" 
                            checked={validationOptions.validateInference}
                            onCheckedChange={(checked) => handleValidationOptionChange('validateInference', checked)}
                          />
                          <Label htmlFor="validateInference" className="text-sm">
                            Validate Inference Performance
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="generateReport" 
                            checked={validationOptions.generateReport}
                            onCheckedChange={(checked) => handleValidationOptionChange('generateReport', checked)}
                          />
                          <Label htmlFor="generateReport" className="text-sm">
                            Generate Comprehensive Report
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
                <Button 
                  onClick={goToNextStep} 
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 4: Validate Model */}
          {activeStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Validate Model</h2>
              <p className="text-gray-400 mb-6">Review your selections and validate the model for edge deployment.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Validation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gray-950 rounded-md p-4">
                          <h3 className="text-sm font-medium mb-2">Model Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Name:</span>
                              <span>{modelDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Type:</span>
                              <span>{modelTypes.find(t => t.id === modelDetails.type)?.name || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Framework:</span>
                              <span>{frameworks.find(f => f.id === modelDetails.framework)?.name || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Target Devices:</span>
                              <span>{targetDevices.length} selected</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={validateModel} 
                          disabled={isValidating || !isStepComplete(1) || !isStepComplete(2)}
                          className="w-full"
                          size="lg"
                        >
                          {isValidating ? (
                            <>
                              <span className="animate-pulse">Validating Model...</span>
                              <Progress value={validationProgress} className="h-1 mt-2" />
                            </>
                          ) : (
                            <>
                              <BarChart className="mr-2 h-5 w-5" />
                              VALIDATE MODEL
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {validationResults && (
                    <Card className="bg-gray-900 border-gray-800 mt-6">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>Validation Results</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between bg-gray-950 rounded-md p-4">
                            <div className="flex items-center">
                              {validationResults.summary.passed ? (
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                                  <Check className="h-6 w-6 text-green-500" />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                                  <X className="h-6 w-6 text-red-500" />
                                </div>
                              )}
                              <div>
                                <h3 className="font-medium">
                                  {validationResults.summary.passed ? 'Model Validated Successfully' : 'Validation Failed'}
                                </h3>
                                <p className="text-sm text-gray-400">
                                  {validationResults.summary.issues} issues, {validationResults.summary.warnings} warnings
                                </p>
                              </div>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
                              <span className="text-xl font-bold">{validationResults.summary.score}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(validationResults.metrics).map(([key, metric]) => (
                              <div key={key} className="bg-gray-950 rounded-md p-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-sm font-medium capitalize">{key}</h3>
                                  {metric.passed ? (
                                    <Badge className="bg-green-500">Passed</Badge>
                                  ) : (
                                    <Badge className="bg-red-500">Failed</Badge>
                                  )}
                                </div>
                                <div className="mt-2 flex items-end justify-between">
                                  <div>
                                    <span className="text-2xl font-bold">
                                      {typeof metric.value === 'number' && key === 'accuracy' ? 
                                        (metric.value * 100).toFixed(1) + '%' : 
                                        metric.value + (metric.unit ? ` ${metric.unit}` : '')}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Threshold: {key === 'accuracy' ? 
                                      (metric.threshold * 100).toFixed(0) + '%' : 
                                      metric.threshold + (metric.unit ? ` ${metric.unit}` : '')}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-3">Device Compatibility</h3>
                            <div className="space-y-2">
                              {validationResults.deviceCompatibility.map((device) => (
                                <div key={device.id} className="bg-gray-950 rounded-md p-3 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full ${device.compatible ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center mr-3`}>
                                      {device.compatible ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <X className="h-4 w-4 text-red-500" />
                                      )}
                                    </div>
                                    <span>{device.name}</span>
                                  </div>
                                  {!device.compatible && device.issues.length > 0 && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm">
                                            <Info className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <ul className="list-disc list-inside text-xs">
                                            {device.issues.map((issue, index) => (
                                              <li key={index}>{issue}</li>
                                            ))}
                                          </ul>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-3">Optimization Suggestions</h3>
                            <div className="bg-gray-950 rounded-md p-4">
                              <ul className="space-y-2">
                                {validationResults.optimizationSuggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start">
                                    <Zap className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                                    <span className="text-sm">{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div>
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Validation Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">What We Check</h3>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Model architecture compatibility</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Memory footprint and optimization</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Inference latency on target devices</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Power consumption estimation</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Quantization compatibility</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Estimated Time</h3>
                          <p className="text-white">
                            ~1-2 minutes per device
                          </p>
                        </div>
                        
                        {(!isStepComplete(1) || !isStepComplete(2)) && (
                          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-md p-3 mt-4">
                            <div className="flex">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-yellow-500">Incomplete Configuration</h4>
                                <ul className="text-xs text-yellow-500/80 mt-1 list-disc list-inside">
                                  {!isStepComplete(1) && <li>Provide model details</li>}
                                  {!isStepComplete(2) && <li>Select target devices</li>}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="mt-8 flex justify-start">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
