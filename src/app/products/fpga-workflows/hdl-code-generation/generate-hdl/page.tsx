'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Code, Download, FileCode, ArrowLeft, ArrowRight, Cpu, Settings, Zap, Clock, ChevronRight } from 'lucide-react';

export default function HDLGeneratorIDE() {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Form state
  const [hdlType, setHdlType] = useState('verilog');
  const [targetDevice, setTargetDevice] = useState('xilinx_artix7');
  const [designDescription, setDesignDescription] = useState('');
  const [designRequirements, setDesignRequirements] = useState('');
  const [optimizationLevel, setOptimizationLevel] = useState(3);
  const [advancedOptions, setAdvancedOptions] = useState({
    pipelineStages: true,
    resourceSharing: true,
    clockGating: true,
    retiming: true,
    inferenceRAM: true,
    inferenceROM: true,
    generateTestbench: false,
    generateConstraints: true,
    documentationLevel: 'detailed',
  });
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState<{verilog?: string, vhdl?: string, testbench?: string, constraints?: string}>({});
  const [generationStats, setGenerationStats] = useState<{luts?: number, ffs?: number, brams?: number, dsps?: number, fmax?: number}>({});
  
  // Predefined data
  const hdlTypes = [
    { id: 'verilog', name: 'Verilog' },
    { id: 'vhdl', name: 'VHDL' },
    { id: 'systemverilog', name: 'SystemVerilog' },
    { id: 'hls', name: 'High-Level Synthesis (C/C++)' },
  ];
  
  const targetDevices = [
    { id: 'xilinx_artix7', name: 'Xilinx Artix-7', family: 'Xilinx' },
    { id: 'xilinx_kintex7', name: 'Xilinx Kintex-7', family: 'Xilinx' },
    { id: 'xilinx_virtex7', name: 'Xilinx Virtex-7', family: 'Xilinx' },
    { id: 'xilinx_ultrascale', name: 'Xilinx UltraScale+', family: 'Xilinx' },
    { id: 'intel_cyclone10', name: 'Intel Cyclone 10', family: 'Intel' },
    { id: 'intel_arria10', name: 'Intel Arria 10', family: 'Intel' },
    { id: 'intel_stratix10', name: 'Intel Stratix 10', family: 'Intel' },
    { id: 'lattice_ice40', name: 'Lattice iCE40', family: 'Lattice' },
    { id: 'lattice_ecp5', name: 'Lattice ECP5', family: 'Lattice' },
    { id: 'microsemi_polarfire', name: 'Microsemi PolarFire', family: 'Microsemi' },
  ];
  
  const designTypes = [
    { id: 'combinational', name: 'Combinational Logic' },
    { id: 'sequential', name: 'Sequential Logic' },
    { id: 'fsm', name: 'Finite State Machine' },
    { id: 'datapath', name: 'Datapath' },
    { id: 'memory', name: 'Memory Controller' },
    { id: 'interface', name: 'Interface Controller' },
    { id: 'processor', name: 'Processor/CPU' },
    { id: 'accelerator', name: 'Hardware Accelerator' },
  ];
  
  // Helper functions
  const isStepCompleted = (step: number) => completedSteps.includes(step);
  
  const markStepAsCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };
  
  const calculateProgress = () => {
    return (completedSteps.length / 4) * 100;
  };
  
  const navigateToStep = (step: number) => {
    setCurrentStep(step);
  };
  
  const handleNext = () => {
    markStepAsCompleted(currentStep);
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleHDLTypeChange = (value: string) => {
    setHdlType(value);
  };
  
  const handleTargetDeviceChange = (value: string) => {
    setTargetDevice(value);
  };
  
  const handleAdvancedOptionChange = (option: string, value: any) => {
    setAdvancedOptions({
      ...advancedOptions,
      [option]: value,
    });
  };
  
  const handleGenerateCode = () => {
    markStepAsCompleted(3);
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate code generation process
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          generateMockCode();
          markStepAsCompleted(4);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const generateMockCode = () => {
    // Generate mock Verilog code
    const verilogCode = `module counter (
  input wire clk,
  input wire reset,
  input wire enable,
  output reg [7:0] count
);

  // Counter logic
  always @(posedge clk or posedge reset) begin
    if (reset) begin
      count <= 8'h00;
    end else if (enable) begin
      count <= count + 1'b1;
    end
  end

endmodule`;

    // Generate mock VHDL code
    const vhdlCode = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity counter is
  Port (
    clk    : in  STD_LOGIC;
    reset  : in  STD_LOGIC;
    enable : in  STD_LOGIC;
    count  : out STD_LOGIC_VECTOR(7 downto 0)
  );
end counter;

architecture Behavioral of counter is
  signal count_reg : unsigned(7 downto 0) := (others => '0');
begin
  process(clk, reset)
  begin
    if reset = '1' then
      count_reg <= (others => '0');
    elsif rising_edge(clk) then
      if enable = '1' then
        count_reg <= count_reg + 1;
      end if;
    end if;
  end process;
  
  count <= std_logic_vector(count_reg);
end Behavioral;`;

    // Generate mock testbench code
    const testbenchCode = `module counter_tb;
  reg clk;
  reg reset;
  reg enable;
  wire [7:0] count;

  // Instantiate the counter
  counter dut (
    .clk(clk),
    .reset(reset),
    .enable(enable),
    .count(count)
  );

  // Clock generation
  initial begin
    clk = 0;
    forever #5 clk = ~clk;
  end

  // Test sequence
  initial begin
    reset = 1;
    enable = 0;
    #20;
    reset = 0;
    #10;
    enable = 1;
    #200;
    enable = 0;
    #20;
    $finish;
  end

  // Monitor
  initial begin
    $monitor("Time=%0t: reset=%b enable=%b count=%h", $time, reset, enable, count);
  end
endmodule`;

    // Generate mock constraints file
    const constraintsCode = `# Clock constraint
create_clock -period 10.000 -name clk -waveform {0.000 5.000} [get_ports clk]

# Reset constraint
set_property IOSTANDARD LVCMOS33 [get_ports reset]
set_property PACKAGE_PIN R18 [get_ports reset]

# Enable constraint
set_property IOSTANDARD LVCMOS33 [get_ports enable]
set_property PACKAGE_PIN P18 [get_ports enable]

# Count output constraints
set_property IOSTANDARD LVCMOS33 [get_ports {count[*]}]
set_property PACKAGE_PIN K17 [get_ports {count[0]}]
set_property PACKAGE_PIN L16 [get_ports {count[1]}]
set_property PACKAGE_PIN M16 [get_ports {count[2]}]
set_property PACKAGE_PIN M17 [get_ports {count[3]}]
set_property PACKAGE_PIN L17 [get_ports {count[4]}]
set_property PACKAGE_PIN K18 [get_ports {count[5]}]
set_property PACKAGE_PIN J18 [get_ports {count[6]}]
set_property PACKAGE_PIN H18 [get_ports {count[7]}]`;

    setGeneratedCode({
      verilog: verilogCode,
      vhdl: vhdlCode,
      testbench: testbenchCode,
      constraints: constraintsCode
    });

    // Generate mock statistics
    setGenerationStats({
      luts: Math.floor(Math.random() * 100) + 20,
      ffs: Math.floor(Math.random() * 150) + 30,
      brams: Math.floor(Math.random() * 2),
      dsps: Math.floor(Math.random() * 2),
      fmax: Math.floor(Math.random() * 100) + 200,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left sidebar - Steps */}
      <div className="w-64 border-r bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">HDL Generator</h2>
          <Progress value={calculateProgress()} className="h-2 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedSteps.length} of 4 steps completed
          </p>
        </div>
        
        <div className="space-y-1">
          <Button 
            variant={currentStep === 1 ? "default" : "ghost"} 
            className={`w-full justify-start ${isStepCompleted(1) ? 'text-green-600 dark:text-green-400' : ''}`}
            onClick={() => navigateToStep(1)}
          >
            {isStepCompleted(1) ? <CheckCircle className="mr-2 h-4 w-4" /> : <span className="mr-2">1.</span>}
            Design Specification
          </Button>
          
          <Button 
            variant={currentStep === 2 ? "default" : "ghost"} 
            className={`w-full justify-start ${isStepCompleted(2) ? 'text-green-600 dark:text-green-400' : ''}`}
            onClick={() => navigateToStep(2)}
            disabled={!isStepCompleted(1)}
          >
            {isStepCompleted(2) ? <CheckCircle className="mr-2 h-4 w-4" /> : <span className="mr-2">2.</span>}
            Target Configuration
          </Button>
          
          <Button 
            variant={currentStep === 3 ? "default" : "ghost"} 
            className={`w-full justify-start ${isStepCompleted(3) ? 'text-green-600 dark:text-green-400' : ''}`}
            onClick={() => navigateToStep(3)}
            disabled={!isStepCompleted(2)}
          >
            {isStepCompleted(3) ? <CheckCircle className="mr-2 h-4 w-4" /> : <span className="mr-2">3.</span>}
            Optimization Settings
          </Button>
          
          <Button 
            variant={currentStep === 4 ? "default" : "ghost"} 
            className={`w-full justify-start ${isStepCompleted(4) ? 'text-green-600 dark:text-green-400' : ''}`}
            onClick={() => navigateToStep(4)}
            disabled={!isStepCompleted(3)}
          >
            {isStepCompleted(4) ? <CheckCircle className="mr-2 h-4 w-4" /> : <span className="mr-2">4.</span>}
            Generate & Download
          </Button>
        </div>
        
        <div className="mt-auto pt-4">
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Need help with HDL generation? Check our <a href="#" className="underline">documentation</a> or contact support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">HDL Code Generation & Optimization</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Generate optimized HDL code for your FPGA designs
            </p>
          </div>
          
          {/* Step 1: Design Specification */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design Specification</CardTitle>
                  <CardDescription>
                    Provide details about your hardware design
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hdl-type">HDL Language</Label>
                    <Select value={hdlType} onValueChange={handleHDLTypeChange}>
                      <SelectTrigger id="hdl-type">
                        <SelectValue placeholder="Select HDL type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hdlTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="design-type">Design Type</Label>
                    <Select>
                      <SelectTrigger id="design-type">
                        <SelectValue placeholder="Select design type" />
                      </SelectTrigger>
                      <SelectContent>
                        {designTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="design-name">Design Name</Label>
                    <Input id="design-name" placeholder="e.g., uart_controller, fir_filter" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="design-description">Design Description</Label>
                    <Textarea 
                      id="design-description" 
                      placeholder="Describe your design's functionality and purpose" 
                      rows={4}
                      value={designDescription}
                      onChange={(e) => setDesignDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="design-requirements">Design Requirements</Label>
                    <Textarea 
                      id="design-requirements" 
                      placeholder="Specify inputs, outputs, timing requirements, etc." 
                      rows={4}
                      value={designRequirements}
                      onChange={(e) => setDesignRequirements(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Step 2: Target Configuration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Target Configuration</CardTitle>
                  <CardDescription>
                    Configure target FPGA device and constraints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-device">Target FPGA Device</Label>
                    <Select value={targetDevice} onValueChange={handleTargetDeviceChange}>
                      <SelectTrigger id="target-device">
                        <SelectValue placeholder="Select target device" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetDevices.map((device) => (
                          <SelectItem key={device.id} value={device.id}>
                            {device.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clock-frequency">Clock Frequency (MHz)</Label>
                    <Input id="clock-frequency" type="number" placeholder="100" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Design Constraints</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area-constraint" className="text-sm">Area Constraint</Label>
                        <Select>
                          <SelectTrigger id="area-constraint">
                            <SelectValue placeholder="Select constraint" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="minimal">Minimize Area</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timing-constraint" className="text-sm">Timing Constraint</Label>
                        <Select>
                          <SelectTrigger id="timing-constraint">
                            <SelectValue placeholder="Select constraint" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="minimal">Minimize Latency</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="power-constraint" className="text-sm">Power Constraint</Label>
                        <Select>
                          <SelectTrigger id="power-constraint">
                            <SelectValue placeholder="Select constraint" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="minimal">Minimize Power</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resource-constraint" className="text-sm">Resource Constraint</Label>
                        <Select>
                          <SelectTrigger id="resource-constraint">
                            <SelectValue placeholder="Select constraint" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="minimal">Minimize DSPs</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Interface Specifications</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="input-ports" className="text-sm">Input Ports</Label>
                        <Textarea id="input-ports" placeholder="clk, reset, enable, data_in[7:0]" rows={2} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="output-ports" className="text-sm">Output Ports</Label>
                        <Textarea id="output-ports" placeholder="valid, data_out[15:0], error" rows={2} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Step 3: Optimization Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Settings</CardTitle>
                  <CardDescription>
                    Configure optimization strategies for your HDL code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="optimization-level">Optimization Level</Label>
                      <Badge variant="outline">{optimizationLevel}</Badge>
                    </div>
                    <Slider 
                      id="optimization-level"
                      min={1} 
                      max={5} 
                      step={1} 
                      value={[optimizationLevel]} 
                      onValueChange={(value) => setOptimizationLevel(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                      <span>Basic</span>
                      <span>Balanced</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Optimization Techniques</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="pipeline-stages" className="cursor-pointer">Pipeline Stages</Label>
                        <Switch 
                          id="pipeline-stages" 
                          checked={advancedOptions.pipelineStages}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('pipelineStages', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="resource-sharing" className="cursor-pointer">Resource Sharing</Label>
                        <Switch 
                          id="resource-sharing" 
                          checked={advancedOptions.resourceSharing}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('resourceSharing', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="clock-gating" className="cursor-pointer">Clock Gating</Label>
                        <Switch 
                          id="clock-gating" 
                          checked={advancedOptions.clockGating}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('clockGating', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="retiming" className="cursor-pointer">Retiming</Label>
                        <Switch 
                          id="retiming" 
                          checked={advancedOptions.retiming}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('retiming', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="inference-ram" className="cursor-pointer">Inference RAM</Label>
                        <Switch 
                          id="inference-ram" 
                          checked={advancedOptions.inferenceRAM}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('inferenceRAM', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="inference-rom" className="cursor-pointer">Inference ROM</Label>
                        <Switch 
                          id="inference-rom" 
                          checked={advancedOptions.inferenceROM}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('inferenceROM', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Additional Options</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="generate-testbench" className="cursor-pointer">Generate Testbench</Label>
                        <Switch 
                          id="generate-testbench" 
                          checked={advancedOptions.generateTestbench}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('generateTestbench', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="generate-constraints" className="cursor-pointer">Generate Constraints</Label>
                        <Switch 
                          id="generate-constraints" 
                          checked={advancedOptions.generateConstraints}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('generateConstraints', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="documentation-level">Documentation Level</Label>
                      <RadioGroup 
                        id="documentation-level" 
                        value={advancedOptions.documentationLevel}
                        onValueChange={(value) => handleAdvancedOptionChange('documentationLevel', value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="minimal" id="minimal" />
                          <Label htmlFor="minimal" className="cursor-pointer">Minimal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">Standard</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="detailed" id="detailed" />
                          <Label htmlFor="detailed" className="cursor-pointer">Detailed</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Step 4: Generate & Download */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate & Download HDL Code</CardTitle>
                  <CardDescription>
                    Generate optimized HDL code based on your specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isGenerating && Object.keys(generatedCode).length === 0 ? (
                    <div className="text-center py-8">
                      <FileCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Ready to Generate HDL Code</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Click the button below to generate optimized HDL code based on your specifications
                      </p>
                      <Button size="lg" onClick={handleGenerateCode}>
                        <Code className="mr-2 h-5 w-5" />
                        Generate HDL Code
                      </Button>
                    </div>
                  ) : isGenerating ? (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium mb-4">Generating HDL Code...</h3>
                      <Progress value={generationProgress} className="h-2 mb-2 max-w-md mx-auto" />
                      <p className="text-gray-500 dark:text-gray-400">
                        {generationProgress < 30 ? 'Analyzing design requirements...' :
                         generationProgress < 60 ? 'Optimizing code structure...' :
                         generationProgress < 90 ? 'Applying optimization techniques...' :
                         'Finalizing code generation...'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">Resource Utilization</CardTitle>
                              <Badge variant="outline" className="text-xs">{targetDevices.find(d => d.id === targetDevice)?.name}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                  LUTs
                                </span>
                                <span className="font-medium">{generationStats.luts}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                  Flip-Flops
                                </span>
                                <span className="font-medium">{generationStats.ffs}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                  BRAMs
                                </span>
                                <span className="font-medium">{generationStats.brams}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                                  DSPs
                                </span>
                                <span className="font-medium">{generationStats.dsps}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Performance Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Maximum Frequency</span>
                                  <span className="font-medium">{generationStats.fmax} MHz</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500 rounded-full" 
                                    style={{ width: `${Math.min(100, (generationStats.fmax || 0) / 3)}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">Latency</span>
                                </div>
                                <Badge variant="outline" className="text-xs">2 cycles</Badge>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Zap className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm">Power Estimate</span>
                                </div>
                                <Badge variant="outline" className="text-xs">125 mW</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <Tabs defaultValue="verilog">
                          <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="verilog">Verilog</TabsTrigger>
                            <TabsTrigger value="vhdl">VHDL</TabsTrigger>
                            <TabsTrigger value="testbench">Testbench</TabsTrigger>
                            <TabsTrigger value="constraints">Constraints</TabsTrigger>
                          </TabsList>
                          <TabsContent value="verilog" className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                            <pre className="text-sm overflow-auto">{generatedCode.verilog}</pre>
                          </TabsContent>
                          <TabsContent value="vhdl" className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                            <pre className="text-sm overflow-auto">{generatedCode.vhdl}</pre>
                          </TabsContent>
                          <TabsContent value="testbench" className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                            <pre className="text-sm overflow-auto">{generatedCode.testbench}</pre>
                          </TabsContent>
                          <TabsContent value="constraints" className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                            <pre className="text-sm overflow-auto">{generatedCode.constraints}</pre>
                          </TabsContent>
                        </Tabs>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                          <Download className="mr-2 h-5 w-5" />
                          Download All Files
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" onClick={handleGenerateCode} disabled={isGenerating}>
                    <Code className="mr-2 h-4 w-4" />
                    Regenerate Code
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}