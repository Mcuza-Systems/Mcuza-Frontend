'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Upload, Download, CheckCircle, AlertCircle, Clock, Cpu, Zap, FileCode, Settings, BarChart2 } from 'lucide-react';

export default function BitstreamGeneratorIDE() {
  // State for multi-step workflow
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  
  // State for HDL code upload
  const [hdlFiles, setHdlFiles] = useState<{name: string, type: string, size: number}[]>([]);
  const [hdlType, setHdlType] = useState('verilog');
  const [topModule, setTopModule] = useState('');
  
  // State for target device configuration
  const [targetVendor, setTargetVendor] = useState('');
  const [targetFamily, setTargetFamily] = useState('');
  const [targetDevice, setTargetDevice] = useState('');
  const [targetPackage, setTargetPackage] = useState('');
  const [targetSpeed, setTargetSpeed] = useState('');
  
  // State for constraints
  const [timingConstraints, setTimingConstraints] = useState('');
  const [pinConstraints, setPinConstraints] = useState('');
  const [placementConstraints, setPlacementConstraints] = useState('');
  
  // State for optimization options
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');
  const [optimizeArea, setOptimizeArea] = useState(true);
  const [optimizeSpeed, setOptimizeSpeed] = useState(true);
  const [optimizePower, setOptimizePower] = useState(false);
  
  // State for generation options
  const [generateReports, setGenerateReports] = useState(true);
  const [generateTestbench, setGenerateTestbench] = useState(false);
  
  // State for generation process
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generationResults, setGenerationResults] = useState<any>(null);
  
  // Predefined data for vendors and device families
  const vendors = [
    { id: 'xilinx', name: 'Xilinx' },
    { id: 'intel', name: 'Intel' },
    { id: 'lattice', name: 'Lattice' },
    { id: 'microsemi', name: 'Microsemi' }
  ];
  
  const deviceFamilies: {[key: string]: {id: string, name: string}[]} = {
    xilinx: [
      { id: 'artix7', name: 'Artix-7' },
      { id: 'kintex7', name: 'Kintex-7' },
      { id: 'virtex7', name: 'Virtex-7' },
      { id: 'zynq7000', name: 'Zynq-7000' },
      { id: 'ultrascale', name: 'UltraScale' }
    ],
    intel: [
      { id: 'cyclone5', name: 'Cyclone V' },
      { id: 'cyclone10', name: 'Cyclone 10' },
      { id: 'arria10', name: 'Arria 10' },
      { id: 'stratix10', name: 'Stratix 10' },
      { id: 'agilex', name: 'Agilex' }
    ],
    lattice: [
      { id: 'ice40', name: 'iCE40' },
      { id: 'ecp5', name: 'ECP5' },
      { id: 'crosslink', name: 'CrossLink' },
      { id: 'certus', name: 'Certus-NX' }
    ],
    microsemi: [
      { id: 'polarfire', name: 'PolarFire' },
      { id: 'igloo2', name: 'IGLOO2' },
      { id: 'smartfusion2', name: 'SmartFusion2' }
    ]
  };
  
  // Helper function to mark a step as completed
  const completeStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };
  
  // Helper function to check if a step is completed
  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step);
  };
  
  // Helper function to navigate to next step
  const goToNextStep = () => {
    if (currentStep < 4) {
      completeStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Helper function to navigate to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Update progress when steps change
  useEffect(() => {
    const progressValue = (completedSteps.length / 4) * 100;
    setProgress(progressValue);
  }, [completedSteps]);
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => ({
        name: file.name,
        type: file.name.split('.').pop() || '',
        size: file.size
      }));
      setHdlFiles(fileArray);
    }
  };
  
  // Handle vendor change
  const handleVendorChange = (value: string) => {
    setTargetVendor(value);
    setTargetFamily('');
    setTargetDevice('');
    setTargetPackage('');
    setTargetSpeed('');
  };
  
  // Simulate bitstream generation
  const startBitstreamGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationComplete(false);
    
    // Simulate generation process with progress updates
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setGenerationComplete(true);
            setGenerationResults(generateMockResults());
            completeStep(4);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  // Generate mock results based on selected options
  const generateMockResults = () => {
    const resourceUtilization = {
      luts: Math.floor(Math.random() * 10000) + 5000,
      registers: Math.floor(Math.random() * 15000) + 8000,
      brams: Math.floor(Math.random() * 100) + 50,
      dsps: Math.floor(Math.random() * 50) + 10,
      utilization: Math.floor(Math.random() * 40) + 20
    };
    
    const timingResults = {
      worstNegativeSlack: optimizeSpeed ? -0.5 : -2.5,
      worstHoldSlack: 0.2,
      clockPeriod: 10.0,
      maxFrequency: optimizeSpeed ? 150.0 : 100.0,
      timingMet: optimizeSpeed
    };
    
    const powerEstimation = {
      static: optimizePower ? 0.1 : 0.2,
      dynamic: optimizePower ? 0.5 : 1.2,
      total: optimizePower ? 0.6 : 1.4
    };
    
    return {
      bitstreamSize: Math.floor(Math.random() * 5000000) + 1000000,
      resourceUtilization,
      timingResults,
      powerEstimation,
      generationTime: Math.floor(Math.random() * 300) + 120
    };
  };
  
  // Example constraint templates
  const timingConstraintTemplate = `# Clock constraints
create_clock -period 10.000 -name clk -waveform {0.000 5.000} [get_ports clk]
set_input_delay -clock clk -max 2.000 [get_ports {data_in[*]}]
set_output_delay -clock clk -max 2.000 [get_ports {data_out[*]}]`;
  
  const pinConstraintTemplate = `# Pin constraints
set_property PACKAGE_PIN W5 [get_ports clk]
set_property IOSTANDARD LVCMOS33 [get_ports clk]
set_property PACKAGE_PIN V17 [get_ports {data_in[0]}]
set_property IOSTANDARD LVCMOS33 [get_ports {data_in[0]}]`;
  
  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Upload HDL Code</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Upload your HDL files and specify the top module
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hdl-type">HDL Type</Label>
                  <Select value={hdlType} onValueChange={setHdlType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select HDL type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verilog">Verilog</SelectItem>
                      <SelectItem value="vhdl">VHDL</SelectItem>
                      <SelectItem value="systemverilog">SystemVerilog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="top-module">Top Module Name</Label>
                  <Input
                    id="top-module"
                    placeholder="e.g., my_design_top"
                    value={topModule}
                    onChange={(e) => setTopModule(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload HDL Files</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm font-medium">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Supported formats: .v, .sv, .vhd, .vhdl
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              {hdlFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="border rounded-lg divide-y">
                    {hdlFiles.map((file, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <FileCode className="h-4 w-4 text-orange-500" />
                          <span>{file.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Configure Target Device</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Select your target FPGA device and package
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">FPGA Vendor</Label>
                  <Select value={targetVendor} onValueChange={handleVendorChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map(vendor => (
                        <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="family">Device Family</Label>
                  <Select 
                    value={targetFamily} 
                    onValueChange={setTargetFamily}
                    disabled={!targetVendor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={targetVendor ? "Select family" : "Select vendor first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {targetVendor && deviceFamilies[targetVendor].map(family => (
                        <SelectItem key={family.id} value={family.id}>{family.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device">Device</Label>
                  <Input
                    id="device"
                    placeholder="e.g., xc7a100t"
                    value={targetDevice}
                    onChange={(e) => setTargetDevice(e.target.value)}
                    disabled={!targetFamily}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package">Package</Label>
                  <Input
                    id="package"
                    placeholder="e.g., csg324"
                    value={targetPackage}
                    onChange={(e) => setTargetPackage(e.target.value)}
                    disabled={!targetFamily}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="speed">Speed Grade</Label>
                  <Input
                    id="speed"
                    placeholder="e.g., -1"
                    value={targetSpeed}
                    onChange={(e) => setTargetSpeed(e.target.value)}
                    disabled={!targetFamily}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Cpu className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Device Selection Tips</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Choose a device with sufficient resources for your design. Consider LUT count, memory blocks, DSP slices, and I/O pins required by your design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Set Constraints & Optimization</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Configure timing, pin assignments, and optimization options
              </p>
            </div>
            
            <Tabs defaultValue="constraints">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="constraints">Constraints</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="constraints" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="timing-constraints">Timing Constraints</Label>
                  <Textarea
                    id="timing-constraints"
                    placeholder="Enter timing constraints..."
                    value={timingConstraints}
                    onChange={(e) => setTimingConstraints(e.target.value)}
                    className="font-mono text-sm h-32"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTimingConstraints(timingConstraintTemplate)}
                  >
                    Load Template
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pin-constraints">Pin Constraints</Label>
                  <Textarea
                    id="pin-constraints"
                    placeholder="Enter pin constraints..."
                    value={pinConstraints}
                    onChange={(e) => setPinConstraints(e.target.value)}
                    className="font-mono text-sm h-32"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPinConstraints(pinConstraintTemplate)}
                  >
                    Load Template
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="placement-constraints">Placement Constraints (Optional)</Label>
                  <Textarea
                    id="placement-constraints"
                    placeholder="Enter placement constraints..."
                    value={placementConstraints}
                    onChange={(e) => setPlacementConstraints(e.target.value)}
                    className="font-mono text-sm h-24"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="optimization" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Optimization Strategy</Label>
                    <RadioGroup value={optimizationLevel} onValueChange={setOptimizationLevel}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="area" id="area" />
                        <Label htmlFor="area">Optimize for Area</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="balanced" id="balanced" />
                        <Label htmlFor="balanced">Balanced (Default)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="speed" id="speed" />
                        <Label htmlFor="speed">Optimize for Speed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="power" id="power" />
                        <Label htmlFor="power">Optimize for Power</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Advanced Optimization Options</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="optimize-area" className="text-sm">Resource Optimization</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Minimize LUT, FF, and BRAM usage</p>
                      </div>
                      <Switch
                        id="optimize-area"
                        checked={optimizeArea}
                        onCheckedChange={setOptimizeArea}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="optimize-speed" className="text-sm">Timing Optimization</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Improve clock frequency and timing closure</p>
                      </div>
                      <Switch
                        id="optimize-speed"
                        checked={optimizeSpeed}
                        onCheckedChange={setOptimizeSpeed}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="optimize-power" className="text-sm">Power Optimization</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Reduce dynamic and static power consumption</p>
                      </div>
                      <Switch
                        id="optimize-power"
                        checked={optimizePower}
                        onCheckedChange={setOptimizePower}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Additional Options</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="generate-reports" className="text-sm">Generate Detailed Reports</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Include timing, utilization, and power reports</p>
                      </div>
                      <Switch
                        id="generate-reports"
                        checked={generateReports}
                        onCheckedChange={setGenerateReports}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="generate-testbench" className="text-sm">Generate Programming Files</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Create JTAG programming files in addition to bitstream</p>
                      </div>
                      <Switch
                        id="generate-testbench"
                        checked={generateTestbench}
                        onCheckedChange={setGenerateTestbench}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Generate Bitstream</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Review your configuration and generate the FPGA bitstream
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">HDL Configuration</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">HDL Type:</span>
                          <span className="font-medium">{hdlType.charAt(0).toUpperCase() + hdlType.slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Top Module:</span>
                          <span className="font-medium">{topModule || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Files:</span>
                          <span className="font-medium">{hdlFiles.length} file(s)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Target Device</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Vendor:</span>
                          <span className="font-medium">
                            {targetVendor ? vendors.find(v => v.id === targetVendor)?.name : 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Family:</span>
                          <span className="font-medium">
                            {targetFamily && targetVendor ? 
                              deviceFamilies[targetVendor].find(f => f.id === targetFamily)?.name : 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Device:</span>
                          <span className="font-medium">{targetDevice || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Optimization Strategy</h3>
                    <div className="text-sm">
                      <span className="font-medium">
                        {optimizationLevel === 'area' && 'Optimize for Area'}
                        {optimizationLevel === 'balanced' && 'Balanced Optimization'}
                        {optimizationLevel === 'speed' && 'Optimize for Speed'}
                        {optimizationLevel === 'power' && 'Optimize for Power'}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {optimizeArea && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            Resource Optimization
                          </Badge>
                        )}
                        {optimizeSpeed && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            Timing Optimization
                          </Badge>
                        )}
                        {optimizePower && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            Power Optimization
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {!isGenerating && !generationComplete && (
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={startBitstreamGeneration}
                >
                  Generate Bitstream
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
            
            {isGenerating && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating bitstream...</span>
                    <span>{Math.round(generationProgress)}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 font-mono text-xs h-32 overflow-y-auto">
                  {generationProgress > 10 && <div className="text-gray-600 dark:text-gray-400">Reading design files...</div>}
                  {generationProgress > 25 && <div className="text-gray-600 dark:text-gray-400">Analyzing design hierarchy...</div>}
                  {generationProgress > 40 && <div className="text-gray-600 dark:text-gray-400">Synthesizing design...</div>}
                  {generationProgress > 60 && <div className="text-gray-600 dark:text-gray-400">Implementing design (place and route)...</div>}
                  {generationProgress > 80 && <div className="text-gray-600 dark:text-gray-400">Generating bitstream file...</div>}
                  {generationProgress >= 100 && <div className="text-green-600 dark:text-green-400">Bitstream generation complete!</div>}
                </div>
              </div>
            )}
            
            {generationComplete && generationResults && (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Bitstream Generated Successfully</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Settings className="h-5 w-5 text-orange-500" />
                          <h3 className="font-medium">Resource Utilization</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">LUTs:</span>
                              <span>{generationResults.resourceUtilization.luts.toLocaleString()}</span>
                            </div>
                            <Progress value={generationResults.resourceUtilization.utilization} className="h-1.5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Registers:</span>
                              <span>{generationResults.resourceUtilization.registers.toLocaleString()}</span>
                            </div>
                            <Progress value={generationResults.resourceUtilization.utilization - 5} className="h-1.5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Block RAM:</span>
                              <span>{generationResults.resourceUtilization.brams}</span>
                            </div>
                            <Progress value={generationResults.resourceUtilization.utilization + 10} className="h-1.5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">DSP Blocks:</span>
                              <span>{generationResults.resourceUtilization.dsps}</span>
                            </div>
                            <Progress value={generationResults.resourceUtilization.utilization - 10} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-orange-500" />
                          <h3 className="font-medium">Timing & Performance</h3>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Max Frequency:</span>
                            <span className="font-medium">{generationResults.timingResults.maxFrequency.toFixed(2)} MHz</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Worst Negative Slack:</span>
                            <span className={generationResults.timingResults.worstNegativeSlack >= 0 ? 
                              "font-medium text-green-600 dark:text-green-400" : 
                              "font-medium text-red-600 dark:text-red-400"}>
                              {generationResults.timingResults.worstNegativeSlack.toFixed(3)} ns
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Timing Constraints Met:</span>
                            <span className={generationResults.timingResults.timingMet ? 
                              "font-medium text-green-600 dark:text-green-400" : 
                              "font-medium text-red-600 dark:text-red-400"}>
                              {generationResults.timingResults.timingMet ? "Yes" : "No"}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Power Consumption:</span>
                            <span className="font-medium">{generationResults.powerEstimation.total.toFixed(2)} W</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Bitstream Size:</span>
                            <span className="font-medium">{(generationResults.bitstreamSize / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Generation Time:</span>
                            <span className="font-medium">{generationResults.generationTime} seconds</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download Bitstream
                  </Button>
                  
                  {generateReports && (
                    <Button variant="outline">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Download Reports
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bitstream Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Generate optimized FPGA bitstreams from your HDL code
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Steps */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 1 ? 'text-orange-600 dark:text-orange-400' : ''}`}
                    onClick={() => setCurrentStep(1)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(1) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 1 ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(1) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 1 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'}`}>1</span>
                      )}
                    </div>
                    <span className="font-medium">Upload HDL Code</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 2 ? 'text-orange-600 dark:text-orange-400' : ''}`}
                    onClick={() => setCurrentStep(2)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(2) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 2 ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(2) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 2 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'}`}>2</span>
                      )}
                    </div>
                    <span className="font-medium">Configure Target</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 3 ? 'text-orange-600 dark:text-orange-400' : ''}`}
                    onClick={() => setCurrentStep(3)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(3) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 3 ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(3) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 3 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'}`}>3</span>
                      )}
                    </div>
                    <span className="font-medium">Set Constraints</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 4 ? 'text-orange-600 dark:text-orange-400' : ''}`}
                    onClick={() => setCurrentStep(4)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(4) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 4 ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(4) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 4 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'}`}>4</span>
                      )}
                    </div>
                    <span className="font-medium">Generate Bitstream</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                {renderStepContent()}
              </CardContent>
              
              {/* Navigation buttons */}
              {!generationComplete && (
                <CardFooter className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  {currentStep < 4 && (
                    <Button
                      onClick={goToNextStep}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}