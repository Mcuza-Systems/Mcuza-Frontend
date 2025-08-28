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
import { ArrowLeft, ArrowRight, Upload, Download, CheckCircle, AlertCircle, Clock, FileCode, Code, Zap } from 'lucide-react';

export default function TestbenchGeneratorIDE() {
  // State for multi-step workflow
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  
  // State for HDL code upload
  const [hdlFiles, setHdlFiles] = useState<{name: string, type: string, size: number}[]>([]);
  const [hdlType, setHdlType] = useState('verilog');
  const [topModule, setTopModule] = useState('');
  
  // State for testbench configuration
  const [testbenchType, setTestbenchType] = useState('self-checking');
  const [testbenchLanguage, setTestbenchLanguage] = useState('verilog');
  const [simulationTool, setSimulationTool] = useState('modelsim');
  
  // State for test options
  const [generateAssertions, setGenerateAssertions] = useState(true);
  const [generateRandomTests, setGenerateRandomTests] = useState(true);
  const [generateDirectedTests, setGenerateDirectedTests] = useState(true);
  const [generateCoverage, setGenerateCoverage] = useState(true);
  const [testCaseCount, setTestCaseCount] = useState(100);
  
  // State for advanced options
  const [clockFrequency, setClockFrequency] = useState(100);
  const [simulationTime, setSimulationTime] = useState(1000);
  const [timeUnit, setTimeUnit] = useState('ns');
  
  // State for generation process
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generatedTestbench, setGeneratedTestbench] = useState<string>('');
  
  // Predefined data for simulation tools
  const simulationTools = [
    { id: 'modelsim', name: 'ModelSim' },
    { id: 'vcs', name: 'Synopsys VCS' },
    { id: 'vivado', name: 'Vivado Simulator' },
    { id: 'xcelium', name: 'Cadence Xcelium' },
    { id: 'questa', name: 'Questa Advanced Simulator' },
    { id: 'icarus', name: 'Icarus Verilog' }
  ];
  
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
  
  // Simulate testbench generation
  const startTestbenchGeneration = () => {
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
            setGeneratedTestbench(generateMockTestbench());
            completeStep(4);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  // Generate mock testbench based on selected options
  const generateMockTestbench = () => {
    if (testbenchLanguage === 'verilog') {
      return generateVerilogTestbench();
    } else if (testbenchLanguage === 'vhdl') {
      return generateVHDLTestbench();
    } else {
      return generateSystemVerilogTestbench();
    }
  };
  
  // Generate mock Verilog testbench
  const generateVerilogTestbench = () => {
    return `\`timescale 1${timeUnit}/1${timeUnit.charAt(0)}

module ${topModule}_tb;

  // Parameters
  parameter CLK_PERIOD = ${1000/clockFrequency};
  parameter SIM_TIME = ${simulationTime};
  
  // Signals
  reg clk;
  reg rst_n;
  reg [7:0] data_in;
  wire [7:0] data_out;
  
  // Instantiate the Unit Under Test (UUT)
  ${topModule} uut (
    .clk(clk),
    .rst_n(rst_n),
    .data_in(data_in),
    .data_out(data_out)
  );
  
  // Clock generation
  initial begin
    clk = 0;
    forever #(CLK_PERIOD/2) clk = ~clk;
  end
  
  // Test sequence
  initial begin
    // Initialize inputs
    rst_n = 0;
    data_in = 8'h00;
    
    // Reset sequence
    #(CLK_PERIOD*2);
    rst_n = 1;
    
    // Test case 1: Basic operation
    #(CLK_PERIOD);
    data_in = 8'hA5;
    #(CLK_PERIOD);
    $display("Test Case 1: data_in=%h, data_out=%h", data_in, data_out);
    ${generateAssertions ? `if (data_out !== 8'hA5) $error("Test Case 1 failed!");` : ''}
    
    // Test case 2: Edge case
    #(CLK_PERIOD);
    data_in = 8'hFF;
    #(CLK_PERIOD);
    $display("Test Case 2: data_in=%h, data_out=%h", data_in, data_out);
    ${generateAssertions ? `if (data_out !== 8'hFF) $error("Test Case 2 failed!");` : ''}
    
    ${generateRandomTests ? `// Random test cases
    repeat(${testCaseCount}) begin
      #(CLK_PERIOD);
      data_in = $random;
      #(CLK_PERIOD);
      $display("Random Test: data_in=%h, data_out=%h", data_in, data_out);
    end` : ''}
    
    // End simulation
    #(CLK_PERIOD*10);
    $display("Simulation completed successfully");
    $finish;
  end
  
  ${generateCoverage ? `// Coverage
  covergroup cg @(posedge clk);
    data_in_cp: coverpoint data_in {
      bins zeros = {8'h00};
      bins ones = {8'hFF};
      bins others = {[8'h01:8'hFE]};
    }
    data_out_cp: coverpoint data_out {
      bins zeros = {8'h00};
      bins ones = {8'hFF};
      bins others = {[8'h01:8'hFE]};
    }
  endgroup
  
  cg coverage_inst = new();` : ''}
  
  // Waveform dump
  initial begin
    $dumpfile("${topModule}_tb.vcd");
    $dumpvars(0, ${topModule}_tb);
  end

endmodule`;
  };
  
  // Generate mock VHDL testbench
  const generateVHDLTestbench = () => {
    return `library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity ${topModule}_tb is
end entity;

architecture sim of ${topModule}_tb is
  -- Constants
  constant CLK_PERIOD : time := ${1000/clockFrequency} ${timeUnit};
  constant SIM_TIME : time := ${simulationTime} ${timeUnit};
  
  -- Signals
  signal clk : std_logic := '0';
  signal rst_n : std_logic := '0';
  signal data_in : std_logic_vector(7 downto 0) := (others => '0');
  signal data_out : std_logic_vector(7 downto 0);
  
  -- Component declaration
  component ${topModule} is
    port (
      clk : in std_logic;
      rst_n : in std_logic;
      data_in : in std_logic_vector(7 downto 0);
      data_out : out std_logic_vector(7 downto 0)
    );
  end component;
  
begin
  -- Instantiate the Unit Under Test (UUT)
  uut: ${topModule}
    port map (
      clk => clk,
      rst_n => rst_n,
      data_in => data_in,
      data_out => data_out
    );
  
  -- Clock generation
  clk_process: process
  begin
    clk <= '0';
    wait for CLK_PERIOD/2;
    clk <= '1';
    wait for CLK_PERIOD/2;
  end process;
  
  -- Stimulus process
  stim_proc: process
  begin
    -- Reset sequence
    rst_n <= '0';
    wait for CLK_PERIOD*2;
    rst_n <= '1';
    
    -- Test case 1: Basic operation
    wait for CLK_PERIOD;
    data_in <= x"A5";
    wait for CLK_PERIOD;
    report "Test Case 1: data_in=" & to_hstring(data_in) & ", data_out=" & to_hstring(data_out);
    ${generateAssertions ? `assert data_out = x"A5" report "Test Case 1 failed!" severity error;` : ''}
    
    -- Test case 2: Edge case
    wait for CLK_PERIOD;
    data_in <= x"FF";
    wait for CLK_PERIOD;
    report "Test Case 2: data_in=" & to_hstring(data_in) & ", data_out=" & to_hstring(data_out);
    ${generateAssertions ? `assert data_out = x"FF" report "Test Case 2 failed!" severity error;` : ''}
    
    ${generateRandomTests ? `-- Random test cases
    for i in 1 to ${testCaseCount} loop
      wait for CLK_PERIOD;
      data_in <= std_logic_vector(to_unsigned(i mod 256, 8));
      wait for CLK_PERIOD;
      report "Random Test " & integer'image(i) & ": data_in=" & to_hstring(data_in) & ", data_out=" & to_hstring(data_out);
    end loop;` : ''}
    
    -- End simulation
    wait for CLK_PERIOD*10;
    report "Simulation completed successfully";
    wait;
  end process;

end architecture;`;
  };
  
  // Generate mock SystemVerilog testbench
  const generateSystemVerilogTestbench = () => {
    return `\`timescale 1${timeUnit}/1${timeUnit.charAt(0)}

module ${topModule}_tb;

  // Parameters
  parameter CLK_PERIOD = ${1000/clockFrequency};
  parameter SIM_TIME = ${simulationTime};
  
  // Signals
  logic clk;
  logic rst_n;
  logic [7:0] data_in;
  logic [7:0] data_out;
  
  // Instantiate the Unit Under Test (UUT)
  ${topModule} uut (
    .clk(clk),
    .rst_n(rst_n),
    .data_in(data_in),
    .data_out(data_out)
  );
  
  // Clock generation
  initial begin
    clk = 0;
    forever #(CLK_PERIOD/2) clk = ~clk;
  end
  
  // Test sequence
  initial begin
    // Initialize inputs
    rst_n = 0;
    data_in = 8'h00;
    
    // Reset sequence
    #(CLK_PERIOD*2);
    rst_n = 1;
    
    // Test case 1: Basic operation
    #(CLK_PERIOD);
    data_in = 8'hA5;
    #(CLK_PERIOD);
    $display("Test Case 1: data_in=%h, data_out=%h", data_in, data_out);
    ${generateAssertions ? `assert(data_out === 8'hA5) else $error("Test Case 1 failed!");` : ''}
    
    // Test case 2: Edge case
    #(CLK_PERIOD);
    data_in = 8'hFF;
    #(CLK_PERIOD);
    $display("Test Case 2: data_in=%h, data_out=%h", data_in, data_out);
    ${generateAssertions ? `assert(data_out === 8'hFF) else $error("Test Case 2 failed!");` : ''}
    
    ${generateRandomTests ? `// Random test cases
    repeat(${testCaseCount}) begin
      #(CLK_PERIOD);
      data_in = $urandom_range(0, 255);
      #(CLK_PERIOD);
      $display("Random Test: data_in=%h, data_out=%h", data_in, data_out);
    end` : ''}
    
    // End simulation
    #(CLK_PERIOD*10);
    $display("Simulation completed successfully");
    $finish;
  end
  
  ${generateCoverage ? `// Coverage
  covergroup cg @(posedge clk);
    data_in_cp: coverpoint data_in {
      bins zeros = {8'h00};
      bins ones = {8'hFF};
      bins others = {[8'h01:8'hFE]};
    }
    data_out_cp: coverpoint data_out {
      bins zeros = {8'h00};
      bins ones = {8'hFF};
      bins others = {[8'h01:8'hFE]};
    }
    data_cross: cross data_in_cp, data_out_cp;
  endgroup
  
  cg coverage_inst = new();` : ''}
  
  // Assertions
  ${generateAssertions ? `// Protocol assertions
  property reset_clears_output;
    @(posedge clk) !rst_n |-> ##1 (data_out == 0);
  endproperty
  assert property(reset_clears_output) else $error("Reset assertion failed");
  
  property data_propagation;
    @(posedge clk) rst_n && $stable(data_in) |-> ##1 (data_out == data_in);
  endproperty
  assert property(data_propagation) else $error("Data propagation assertion failed");` : ''}
  
  // Waveform dump
  initial begin
    $dumpfile("${topModule}_tb.vcd");
    $dumpvars(0, ${topModule}_tb);
  end

endmodule`;
  };
  
  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Upload HDL Design</h2>
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
                          <FileCode className="h-4 w-4 text-blue-500" />
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
              <h2 className="text-2xl font-bold">Configure Testbench</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Select testbench type and configuration options
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testbench-type">Testbench Type</Label>
                  <Select value={testbenchType} onValueChange={setTestbenchType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select testbench type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self-checking">Self-Checking</SelectItem>
                      <SelectItem value="directed">Directed Testing</SelectItem>
                      <SelectItem value="constrained-random">Constrained Random</SelectItem>
                      <SelectItem value="assertion-based">Assertion-Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testbench-language">Testbench Language</Label>
                  <Select value={testbenchLanguage} onValueChange={setTestbenchLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verilog">Verilog</SelectItem>
                      <SelectItem value="vhdl">VHDL</SelectItem>
                      <SelectItem value="systemverilog">SystemVerilog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="simulation-tool">Target Simulation Tool</Label>
                  <Select value={simulationTool} onValueChange={setSimulationTool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select simulation tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {simulationTools.map(tool => (
                        <SelectItem key={tool.id} value={tool.id}>{tool.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Code className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Testbench Type Information</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {testbenchType === 'self-checking' && 'Self-checking testbenches automatically verify outputs against expected results.'}
                      {testbenchType === 'directed' && 'Directed testing uses specific test vectors targeting known edge cases.'}
                      {testbenchType === 'constrained-random' && 'Constrained random testing uses randomized inputs with constraints for thorough verification.'}
                      {testbenchType === 'assertion-based' && 'Assertion-based verification uses formal properties to verify design behavior.'}
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
              <h2 className="text-2xl font-bold">Test Options</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Configure test features and simulation parameters
              </p>
            </div>
            
            <Tabs defaultValue="features">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="features">Test Features</TabsTrigger>
                <TabsTrigger value="simulation">Simulation Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <Label>Test Features</Label>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="generate-assertions" className="text-sm">Generate Assertions</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Add assertions to verify expected behavior</p>
                    </div>
                    <Switch
                      id="generate-assertions"
                      checked={generateAssertions}
                      onCheckedChange={setGenerateAssertions}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="generate-random-tests" className="text-sm">Random Test Cases</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Generate random input test vectors</p>
                    </div>
                    <Switch
                      id="generate-random-tests"
                      checked={generateRandomTests}
                      onCheckedChange={setGenerateRandomTests}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="generate-directed-tests" className="text-sm">Directed Test Cases</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Include specific test cases for edge conditions</p>
                    </div>
                    <Switch
                      id="generate-directed-tests"
                      checked={generateDirectedTests}
                      onCheckedChange={setGenerateDirectedTests}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="generate-coverage" className="text-sm">Coverage Collection</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Add code and functional coverage metrics</p>
                    </div>
                    <Switch
                      id="generate-coverage"
                      checked={generateCoverage}
                      onCheckedChange={setGenerateCoverage}
                    />
                  </div>
                </div>
                
                {generateRandomTests && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="test-case-count">Number of Random Test Cases</Label>
                      <span className="text-sm text-gray-500">{testCaseCount}</span>
                    </div>
                    <Slider
                      id="test-case-count"
                      min={10}
                      max={1000}
                      step={10}
                      value={[testCaseCount]}
                      onValueChange={(value) => setTestCaseCount(value[0])}
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="simulation" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clock-frequency">Clock Frequency (MHz)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="clock-frequency"
                          type="number"
                          min={1}
                          max={1000}
                          value={clockFrequency}
                          onChange={(e) => setClockFrequency(parseInt(e.target.value) || 100)}
                        />
                        <span className="text-sm text-gray-500">MHz</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time-unit">Time Unit</Label>
                      <Select value={timeUnit} onValueChange={setTimeUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ns">Nanoseconds (ns)</SelectItem>
                          <SelectItem value="ps">Picoseconds (ps)</SelectItem>
                          <SelectItem value="us">Microseconds (us)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="simulation-time">Simulation Time</Label>
                      <span className="text-sm text-gray-500">{simulationTime} {timeUnit}</span>
                    </div>
                    <Slider
                      id="simulation-time"
                      min={100}
                      max={10000}
                      step={100}
                      value={[simulationTime]}
                      onValueChange={(value) => setSimulationTime(value[0])}
                    />
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
              <h2 className="text-2xl font-bold">Generate Testbench</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Review your configuration and generate the testbench
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Design Information</h3>
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
                      <h3 className="font-medium">Testbench Configuration</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Testbench Type:</span>
                          <span className="font-medium">
                            {testbenchType === 'self-checking' && 'Self-Checking'}
                            {testbenchType === 'directed' && 'Directed Testing'}
                            {testbenchType === 'constrained-random' && 'Constrained Random'}
                            {testbenchType === 'assertion-based' && 'Assertion-Based'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Language:</span>
                          <span className="font-medium">{testbenchLanguage.charAt(0).toUpperCase() + testbenchLanguage.slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Simulation Tool:</span>
                          <span className="font-medium">
                            {simulationTools.find(tool => tool.id === simulationTool)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Test Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {generateAssertions && (
                        <div className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium">
                          Assertions
                        </div>
                      )}
                      {generateRandomTests && (
                        <div className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">
                          Random Tests ({testCaseCount})
                        </div>
                      )}
                      {generateDirectedTests && (
                        <div className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-2 py-1 rounded-md text-xs font-medium">
                          Directed Tests
                        </div>
                      )}
                      {generateCoverage && (
                        <div className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 px-2 py-1 rounded-md text-xs font-medium">
                          Coverage Collection
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Simulation Settings</h3>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Clock Frequency:</span>
                        <span className="font-medium">{clockFrequency} MHz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Simulation Time:</span>
                        <span className="font-medium">{simulationTime} {timeUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Time Unit:</span>
                        <span className="font-medium">{timeUnit}</span>
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
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={startTestbenchGeneration}
                >
                  Generate Testbench
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
            
            {isGenerating && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating testbench...</span>
                    <span>{Math.round(generationProgress)}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 font-mono text-xs h-32 overflow-y-auto">
                  {generationProgress > 10 && <div className="text-gray-600 dark:text-gray-400">Analyzing design files...</div>}
                  {generationProgress > 30 && <div className="text-gray-600 dark:text-gray-400">Extracting module interfaces...</div>}
                  {generationProgress > 50 && <div className="text-gray-600 dark:text-gray-400">Generating test vectors...</div>}
                  {generationProgress > 70 && <div className="text-gray-600 dark:text-gray-400">Creating testbench structure...</div>}
                  {generationProgress > 90 && <div className="text-gray-600 dark:text-gray-400">Finalizing testbench code...</div>}
                  {generationProgress >= 100 && <div className="text-green-600 dark:text-green-400">Testbench generation complete!</div>}
                </div>
              </div>
            )}
            
            {generationComplete && generatedTestbench && (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Testbench Generated Successfully</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Generated Testbench</h3>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 font-mono text-xs h-96 overflow-y-auto">
                    <pre>{generatedTestbench}</pre>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download All Files
                  </Button>
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
            <h1 className="text-2xl font-bold">Testbench Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Generate comprehensive testbenches for your HDL designs
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
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : ''}`}
                    onClick={() => setCurrentStep(1)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(1) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 1 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(1) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>1</span>
                      )}
                    </div>
                    <span className="font-medium">Upload Design</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : ''}`}
                    onClick={() => setCurrentStep(2)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(2) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 2 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(2) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>2</span>
                      )}
                    </div>
                    <span className="font-medium">Configure Testbench</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 3 ? 'text-blue-600 dark:text-blue-400' : ''}`}
                    onClick={() => setCurrentStep(3)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(3) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 3 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(3) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>3</span>
                      )}
                    </div>
                    <span className="font-medium">Test Options</span>
                  </div>
                  
                  <div 
                    className={`flex items-center space-x-3 cursor-pointer ${currentStep === 4 ? 'text-blue-600 dark:text-blue-400' : ''}`}
                    onClick={() => setCurrentStep(4)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepCompleted(4) ? 'bg-green-100 dark:bg-green-900/30' : currentStep === 4 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {isStepCompleted(4) ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className={`font-medium ${currentStep === 4 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>4</span>
                      )}
                    </div>
                    <span className="font-medium">Generate Testbench</span>
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
                <CardContent className="pt-6 flex justify-between border-t">
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
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}