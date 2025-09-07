
"use client";


import { useState } from 'react';
import { ChevronRight, ChevronDown, Settings, Cpu, Zap, HardDrive, Cog, FileText, Download, Play, Check, X, Search, Plus, Minus, RefreshCw, FolderOpen, File, Monitor, Layers, Code2, Terminal, GitBranch, BookOpen, AlertTriangle, Info, Power, CircuitBoard, Network, Radio, Truck, Usb, Globe, Music, Cable, Building, Bluetooth, Wifi, Smartphone, Microchip, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function DriverGeneratorIDE() {
  // Reset all selections and settings to initial state
  const handleReset = () => {
    setCurrentStep(0);
    setSelectedMCU('');
    setSelectedProtocol('');
    setSelectedPeripheral('');
    setSettings({});
    setExpandedSections({ mcu: true });
    setSearchTerm('');
    setPeripheralSearchTerm('');
    setVisitedSteps([0]);
    setHighestAccessibleStep(0);
    setValidationErrors([]);
    setErrorMessages({ mcu: '', protocol: '', peripheral: '' });
    setDriverSettings({
      driverName: '',
      includePath: 'drivers/',
      codeStyle: '',
      errorHandling: true,
      documentation: true,
      testCode: false,
      halIntegration: true,
      optimization: 'balanced',
      memoryPriority: 'moderate',
      interruptSupport: false,
      dmaSupport: false,
      powerManagement: false,
      debugSupport: true,
      threadSafety: false,
      customPrefix: '',
      licenseHeader: 'mit'
    });
    setAdditionalConfig({
      customRequirements: '',
      targetApplication: '',
      operatingSystem: '',
      rtosSupport: false,
      bootloaderIntegration: false,
      securityFeatures: false,
      calibrationSupport: false,
      diagnosticsEnabled: false,
      firmwareVersion: '1.0.0',
      compilerToolchain: '',
      buildSystem: '',
      testFramework: '',
      memoryConstraints: {
        stackSize: '4096',
        heapSize: '8192',
        flashUsage: 'moderate'
      },
      performanceTargets: {
        maxResponseTime: '100',
        throughput: 'standard',
        powerConsumption: 'balanced'
      },
      compliance: {
        automotive: false,
        medical: false,
        aerospace: false,
        industrial: false
      },
      customDefines: [],
      includePaths: [],
      linkLibraries: []
    });
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMCU, setSelectedMCU] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [selectedPeripheral, setSelectedPeripheral] = useState('');
  const [settings, setSettings] = useState({});
  const [expandedSections, setExpandedSections] = useState({ mcu: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [peripheralSearchTerm, setPeripheralSearchTerm] = useState('');
  const [visitedSteps, setVisitedSteps] = useState([0]); // Track visited steps
  const [highestAccessibleStep, setHighestAccessibleStep] = useState(0); // Track progression
  const [validationErrors, setValidationErrors] = useState([]); // Track validation errors
  
  // Error messages for missing selections
  const [errorMessages, setErrorMessages] = useState({
    mcu: '',
    protocol: '',
    peripheral: ''
  });
  const [driverSettings, setDriverSettings] = useState({
    driverName: '',
    includePath: 'drivers/',
    codeStyle: '',
    errorHandling: true,
    documentation: true,
    testCode: false,
    halIntegration: true,
    optimization: 'balanced',
    memoryPriority: 'moderate',
    interruptSupport: false,
    dmaSupport: false,
    powerManagement: false,
    debugSupport: true,
    threadSafety: false,
    customPrefix: '',
    licenseHeader: 'mit'
  });

  // Additional configuration state
  const [additionalConfig, setAdditionalConfig] = useState({
    customRequirements: '',
    targetApplication: '',
    operatingSystem: '',
    rtosSupport: false,
    bootloaderIntegration: false,
    securityFeatures: false,
    calibrationSupport: false,
    diagnosticsEnabled: false,
    firmwareVersion: '1.0.0',
    compilerToolchain: '',
    buildSystem: '',
    testFramework: '',
    memoryConstraints: {
      stackSize: '4096',
      heapSize: '8192',
      flashUsage: 'moderate'
    },
    performanceTargets: {
      maxResponseTime: '100',
      throughput: 'standard',
      powerConsumption: 'balanced'
    },
    compliance: {
      automotive: false,
      medical: false,
      aerospace: false,
      industrial: false
    },
    customDefines: [],
    includePaths: [],
    linkLibraries: []
  });

  const workflowSteps = [
    { id: 0, name: 'MCU/MPU Selection', icon: <Cpu className="h-4 w-4" />, completed: false },
    { id: 1, name: 'Protocol/Bus Selection', icon: <Zap className="h-4 w-4" />, completed: false },
    { id: 2, name: 'Peripheral Device Selection', icon: <HardDrive className="h-4 w-4" />, completed: false },
    { id: 3, name: 'Driver Settings', icon: <Settings className="h-4 w-4" />, completed: false },
    { id: 4, name: 'Additional Configuration', icon: <Cog className="h-4 w-4" />, completed: false },
    { id: 5, name: 'Overview & Generate', icon: <FileText className="h-4 w-4" />, completed: false }
  ];

  const mcuFamilies = {
    'STM32': {
      series: {
        'STM32F4': ['STM32F401', 'STM32F407', 'STM32F411', 'STM32F429'],
        'STM32F7': ['STM32F746', 'STM32F767', 'STM32F777'],
        'STM32H7': ['STM32H743', 'STM32H753', 'STM32H750'],
        'STM32L4': ['STM32L432', 'STM32L476', 'STM32L496']
      }
    },
    'ESP32': {
      series: {
        'ESP32': ['ESP32-WROOM-32', 'ESP32-WROVER'],
        'ESP32-S3': ['ESP32-S3-WROOM-1', 'ESP32-S3-DevKitC-1'],
        'ESP32-C3': ['ESP32-C3-WROOM-02', 'ESP32-C3-DevKitM-1']
      }
    },
    'Arduino': {
      series: {
        'AVR': ['Arduino Uno', 'Arduino Nano', 'Arduino Pro Mini'],
        'ARM': ['Arduino Due', 'Arduino MKR1000', 'Arduino Zero']
      }
    }
  };

  const protocols = [
    { name: 'I2C', description: 'Inter-Integrated Circuit', frequency: 'Up to 3.4 MHz', icon: 'Circuit', category: 'Serial', popularity: 'High' },
    { name: 'SPI', description: 'Serial Peripheral Interface', frequency: 'Up to 50 MHz', icon: 'Network', category: 'Serial', popularity: 'High' },
    { name: 'UART', description: 'Universal Asynchronous Receiver-Transmitter', frequency: 'Up to 12 Mbps', icon: 'Radio', category: 'Serial', popularity: 'High' },
    { name: 'CAN', description: 'Controller Area Network', frequency: 'Up to 1 Mbps', icon: 'Truck', category: 'Industrial', popularity: 'Medium' },
    { name: 'USB', description: 'Universal Serial Bus', frequency: 'Up to 480 Mbps', icon: 'Usb', category: 'Computer', popularity: 'High' },
    { name: 'Ethernet', description: 'Ethernet Communication', frequency: 'Up to 1 Gbps', icon: 'Globe', category: 'Network', popularity: 'Medium' },
    { name: 'I2S', description: 'Inter-IC Sound', frequency: 'Up to 20 MHz', icon: 'Music', category: 'Audio', popularity: 'Medium' },
    { name: 'OneWire', description: 'Dallas 1-Wire Interface', frequency: 'Up to 16.3 kbps', icon: 'Cable', category: 'Serial', popularity: 'Low' },
    { name: 'SDIO', description: 'Secure Digital Input Output', frequency: 'Up to 50 MHz', icon: 'SdCard', category: 'Storage', popularity: 'Medium' },
    { name: 'RS485', description: 'Serial Communications Standard', frequency: 'Up to 10 Mbps', icon: 'Building', category: 'Industrial', popularity: 'Medium' },
    { name: 'RS232', description: 'Serial Port Standard', frequency: 'Up to 1 Mbps', icon: 'Terminal', category: 'Legacy', popularity: 'Low' },
    { name: 'BLE', description: 'Bluetooth Low Energy', frequency: '1 Mbps / 2 Mbps', icon: 'Bluetooth', category: 'Wireless', popularity: 'High' },
    { name: 'WiFi', description: 'Wireless Network Communication', frequency: 'Up to 1.3 Gbps', icon: 'Wifi', category: 'Wireless', popularity: 'High' },
    { name: 'LoRa', description: 'Long Range Radio', frequency: 'Up to 50 kbps', icon: 'Radio', category: 'Wireless', popularity: 'Medium' },
    { name: 'MIPI', description: 'Mobile Industry Processor Interface', frequency: 'Up to 4.5 Gbps', icon: 'Smartphone', category: 'Display', popularity: 'Medium' },
    { name: 'QSPI', description: 'Quad Serial Peripheral Interface', frequency: 'Up to 104 MHz', icon: 'Microchip', category: 'Storage', popularity: 'Medium' }
  ];

  const peripherals = {
    'I2C': [
      { name: 'BME280', category: 'Environmental Sensor', description: 'Temperature, Pressure, Humidity' },
      { name: 'MPU6050', category: 'IMU Sensor', description: '6-axis Motion Tracking' },
      { name: 'DS3231', category: 'RTC', description: 'Real-Time Clock' },
      { name: 'OLED SSD1306', category: 'Display', description: '128x64 OLED Display' }
    ],
    'SPI': [
      { name: 'NRF24L01', category: 'RF Module', description: '2.4GHz Wireless Transceiver' },
      { name: 'SD Card', category: 'Storage', description: 'Secure Digital Card' },
      { name: 'MAX7219', category: 'Display Driver', description: '8-Digit LED Display Driver' }
    ],
    'UART': [
      { name: 'ESP8266', category: 'WiFi Module', description: 'WiFi Communication Module' },
      { name: 'HC-05', category: 'Bluetooth', description: 'Bluetooth Communication Module' },
      { name: 'GPS Module', category: 'Navigation', description: 'Global Positioning System' }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Professional search functionality
  const getFilteredMCUs = () => {
    if (!searchTerm) {
      return mcuFamilies;
    }

    const filtered = {};
    const term = searchTerm.toLowerCase();

    Object.entries(mcuFamilies).forEach(([family, data]) => {
      const matchingModels = {};
      let hasMatches = false;

      Object.entries(data.series).forEach(([series, models]) => {
        const filteredModels = models.filter(model => 
          model.toLowerCase().includes(term) ||
          series.toLowerCase().includes(term) ||
          family.toLowerCase().includes(term)
        );

        if (filteredModels.length > 0) {
          matchingModels[series] = filteredModels;
          hasMatches = true;
        }
      });

      if (hasMatches) {
        filtered[family] = { series: matchingModels };
        // Auto-expand families with search matches
        if (!expandedSections[family.toLowerCase()]) {
          setExpandedSections(prev => ({ ...prev, [family.toLowerCase()]: true }));
        }
      }
    });

    return filtered;
  };

  // Get total count of matching MCUs
  const getSearchResultsCount = () => {
    const filtered = getFilteredMCUs();
    return Object.values(filtered).reduce((total, family) => {
      return total + Object.values(family.series).flat().length;
    }, 0);
  };

  // Get all matching MCU names for search suggestions
  const getSearchSuggestions = () => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const suggestions = [];
    const term = searchTerm.toLowerCase();

    Object.entries(mcuFamilies).forEach(([family, data]) => {
      Object.entries(data.series).forEach(([series, models]) => {
        models.forEach(model => {
          if (model.toLowerCase().includes(term)) {
            suggestions.push({ model, series, family });
          }
        });
      });
    });

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  // Helper function to get icon component
  const getProtocolIcon = (iconName) => {
    const iconProps = { className: "h-4 w-4" };
    switch (iconName) {
      case 'Circuit': return <CircuitBoard {...iconProps} />;
      case 'Network': return <Network {...iconProps} />;
      case 'Radio': return <Radio {...iconProps} />;
      case 'Truck': return <Truck {...iconProps} />;
      case 'Usb': return <Usb {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'Music': return <Music {...iconProps} />;
      case 'Cable': return <Cable {...iconProps} />;
      case 'SdCard': return <HardDrive {...iconProps} />;
      case 'Building': return <Building {...iconProps} />;
      case 'Terminal': return <Terminal {...iconProps} />;
      case 'Bluetooth': return <Bluetooth {...iconProps} />;
      case 'Wifi': return <Wifi {...iconProps} />;
      case 'Smartphone': return <Smartphone {...iconProps} />;
      case 'Microchip': return <Microchip {...iconProps} />;
      default: return <Zap {...iconProps} />;
    }
  };

  // Get category color scheme
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Serial': return { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' };
      case 'Wireless': return { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400' };
      case 'Industrial': return { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', text: 'text-orange-400' };
      case 'Network': return { bg: 'from-green-500/20 to-teal-500/20', border: 'border-green-500/30', text: 'text-green-400' };
      case 'Computer': return { bg: 'from-indigo-500/20 to-blue-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400' };
      case 'Audio': return { bg: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
      case 'Storage': return { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' };
      case 'Display': return { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' };
      case 'Legacy': return { bg: 'from-gray-500/20 to-slate-500/20', border: 'border-gray-500/30', text: 'text-gray-400' };
      default: return { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-500/30', text: 'text-gray-400' };
    }
  };

  // Validate selections and show error messages
  const validateSelections = () => {
    let errors = { mcu: '', protocol: '', peripheral: '' };
    let isValid = true;
    
    if (!selectedMCU) {
      errors.mcu = 'Please select a target MCU before proceeding.';
      isValid = false;
    }
    if (!selectedProtocol) {
      errors.protocol = 'Please select a communication protocol before proceeding.';
      isValid = false;
    }
    if (!selectedPeripheral) {
      errors.peripheral = 'Please select a peripheral device before proceeding.';
      isValid = false;
    }
    
    setErrorMessages(errors);
    return isValid;
  };
  
  // Clear errors when selections change
  const clearErrors = () => {
    setErrorMessages({ mcu: '', protocol: '', peripheral: '' });
  };

  // Navigation logic functions
  const updateProgressAndNavigate = (stepId) => {
    // Validate required selections before navigating to certain steps
    if (stepId === 3) { // Driver Settings step
      if (!selectedMCU || !selectedProtocol || !selectedPeripheral) {
        validateSelections();
        return;
      }
    } else if (stepId === 2) { // Peripheral Device Selection requires protocol
      if (!selectedProtocol) {
        validateSelections();
        return;
      }
    }
    // Update visited steps
    setVisitedSteps(prev => {
      const newVisited = [...prev];
      if (!newVisited.includes(stepId)) {
        newVisited.push(stepId);
      }
      return newVisited;
    });
    
    // Update highest accessible step based on requirements
    const newHighestStep = Math.max(
      stepId,
      calculateMaxAccessibleStep()
    );
    setHighestAccessibleStep(newHighestStep);
    
    // Navigate to the step
    setCurrentStep(stepId);
  };
  
  const calculateMaxAccessibleStep = () => {
    // Step 0 (MCU) - Always accessible
    let maxStep = 0;
    
    // Step 1 (Protocol) - Always accessible
    maxStep = Math.max(maxStep, 1);
    
    // Step 2 (Peripheral) - Accessible if protocol is selected
    if (selectedProtocol) {
      maxStep = Math.max(maxStep, 2);
    }
    
    // Step 3 (Settings) - Accessible if MCU, protocol, and peripheral are selected
    if (selectedMCU && selectedProtocol && selectedPeripheral) {
      maxStep = Math.max(maxStep, 3);
    }
    
    // Step 4 (Additional Config) - Accessible if core selections are made
    if (selectedMCU && selectedProtocol && selectedPeripheral) {
      maxStep = Math.max(maxStep, 4);
    }
    
    // Step 5 (Overview) - Accessible if core selections are made
    if (selectedMCU && selectedProtocol && selectedPeripheral) {
      maxStep = Math.max(maxStep, 5);
    }
    
    return maxStep;
  };
  
  const isStepAccessible = (stepId) => {
    // Always allow access to visited steps
    if (visitedSteps.includes(stepId)) {
      return true;
    }
    
    // Allow access to steps within the calculated max accessible range
    return stepId <= Math.max(highestAccessibleStep, calculateMaxAccessibleStep());
  };
  
  const getStepStatus = (stepId) => {
    const isVisited = visitedSteps.includes(stepId);
    const isAccessible = isStepAccessible(stepId);
    const isActive = currentStep === stepId;
    
    // Determine completion status
    let isCompleted = false;
    switch (stepId) {
      case 0: isCompleted = !!selectedMCU; break;
      case 1: isCompleted = !!selectedProtocol; break;
      case 2: isCompleted = !!selectedPeripheral; break;
      case 3: 
        isCompleted = Object.entries(driverSettings).some(([key, value]) => {
          if (typeof value === 'boolean') return value === true;
          if (typeof value === 'string') return value !== '' && value !== 'drivers/';
          return false;
        });
        break;
      case 4:
        isCompleted = Object.entries(additionalConfig).some(([key, value]) => {
          if (typeof value === 'boolean') return value === true;
          if (typeof value === 'string') return value !== '';
          if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) return value.length > 0;
            return Object.values(value).some(v => v !== '' && v !== false);
          }
          return false;
        });
        break;
      case 5: isCompleted = selectedMCU && selectedProtocol && selectedPeripheral; break;
      default: isCompleted = false;
    }
    
    return { isVisited, isAccessible, isActive, isCompleted };
  };

  // Show errors in the main render functions
  const renderErrors = () => {
    const errors = [];
    if (errorMessages.mcu) errors.push(errorMessages.mcu);
    if (errorMessages.protocol) errors.push(errorMessages.protocol);
    if (errorMessages.peripheral) errors.push(errorMessages.peripheral);

    if (errors.length === 0) return null;
    
    return (
      <div className="mb-4 rounded border border-red-600 bg-red-900/70 p-3 text-red-300 font-mono text-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <strong className="text-red-200">Configuration Error</strong>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
      </div>
    );
  };

  const renderMCUSelection = () => (
    <div className="space-y-6">
      {renderErrors()}
      <div className="flex items-center gap-4 mb-6 pb-3 border-b border-[#3e3e3e]">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
          <Cpu className="h-5 w-5 text-black" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Target MCU Selection</h1>
          <p className="text-gray-300 text-sm">Configure your embedded system's microcontroller unit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* MCU Browser - Professional Design */}
        <Card className="xl:col-span-2 border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
          <CardHeader className="pb-4 border-b border-[#3e3e3e]">
            <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
              <div className="w-8 h-8 bg-[#00ff41]/20 rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-[#00ff41]" />
              </div>
              MCU Database
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search microcontrollers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[32rem] px-4 py-2">
              {/* Search Results Counter */}
              {searchTerm && (
                <div className="px-4 py-2 bg-[#3e3e3e]/20 border-b border-[#3e3e3e] mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Search className="h-3 w-3 text-[#00ff41]" />
                    <span className="text-[#00ff41] font-mono">
                      {getSearchResultsCount()} results for "{searchTerm}"
                    </span>
                  </div>
                </div>
              )}
              
              {/* Search Suggestions - Quick Select */}
              {searchTerm && searchTerm.length >= 2 && getSearchSuggestions().length > 0 && (
                <div className="px-4 py-2 mb-4">
                  <div className="text-xs text-gray-400 font-mono mb-2">Quick Select:</div>
                  <div className="space-y-1">
                    {getSearchSuggestions().map((suggestion, index) => (
                      <div
                        key={`${suggestion.family}-${suggestion.series}-${suggestion.model}`}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all group hover:bg-[#00ff41]/10 ${
                          selectedMCU === suggestion.model
                            ? 'bg-gradient-to-r from-[#00ff41]/20 to-[#40e0d0]/10 border border-[#00ff41]/30'
                            : 'hover:border hover:border-[#00ff41]/20'
                        }`}
                        onClick={() => {
                          setSelectedMCU(suggestion.model);
                          setSearchTerm(''); // Clear search after selection
                          clearErrors(); // Clear any existing errors
                        }}
                      >
                        <div className="w-4 h-4 bg-[#00ff41] rounded flex items-center justify-center">
                          <Cpu className="h-2 w-2 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-sm whitespace-normal break-words">{suggestion.model}</div>
                          <div className="text-xs text-gray-400 whitespace-normal break-words">
                            {suggestion.family} › {suggestion.series}
                          </div>
                        </div>
                        {selectedMCU === suggestion.model && (
                          <Check className="h-3 w-3 text-[#00ff41]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {Object.entries(getFilteredMCUs()).map(([family, data]) => (
                  <div key={family} className="">
                    <div
                      className="flex items-center gap-4 cursor-pointer hover:bg-[#3e3e3e]/30 p-4 rounded-lg transition-all group min-h-[48px]"
                      onClick={() => toggleSection(family.toLowerCase())}
                    >
                      {expandedSections[family.toLowerCase()] ? 
                        <ChevronDown className="h-4 w-4 text-[#00ff41] group-hover:text-[#40e0d0]" /> : 
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#00ff41]" />
                      }
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                        <FolderOpen className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white font-semibold group-hover:text-[#00ff41] transition-colors">{family}</span>
                      <Badge className="ml-auto bg-[#3e3e3e] text-gray-300 text-xs">
                        {Object.values(data.series).flat().length}
                      </Badge>
                    </div>
                    
                    {expandedSections[family.toLowerCase()] && (
                      <div className="ml-6 mt-2 space-y-1">
                        {Object.entries(data.series).map(([series, models]) => (
                          <div key={series}>
                            <div className="flex items-center gap-4 py-3 text-gray-300 min-h-[40px]">
                              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-teal-500 rounded flex items-center justify-center">
                                <Layers className="h-2 w-2 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-200 whitespace-normal break-words">{series}</span>
                              <div className="h-px bg-gradient-to-r from-gray-600 to-transparent flex-1 ml-2" />
                            </div>
                            <div className="ml-7 space-y-2">
                              {models.map(model => (
                                <div
                                  key={model}
                                  className={`text-base cursor-pointer hover:bg-[#00ff41]/10 p-3 rounded-lg transition-all flex items-center gap-4 group min-h-[40px] ${
                                    selectedMCU === model 
                                      ? 'bg-gradient-to-r from-[#00ff41]/20 to-[#40e0d0]/10 border-l-2 border-[#00ff41] text-[#00ff41] font-semibold' 
                                      : 'text-gray-300 hover:text-white'
                                  }`}
                                  onClick={() => {
                                    setSelectedMCU(model);
                                    clearErrors();
                                  }}
                                >
                                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                                    selectedMCU === model ? 'bg-[#00ff41]' : 'bg-[#3e3e3e] group-hover:bg-[#00ff41]/20'
                                  }`}>
                                    <Cpu className={`h-3 w-3 ${
                                      selectedMCU === model ? 'text-black' : 'text-gray-400 group-hover:text-[#00ff41]'
                                    }`} />
                                  </div>
                                  <span className="flex-1 whitespace-normal break-words">{model}</span>
                                  {selectedMCU === model && (
                                    <Check className="h-4 w-4 text-[#00ff41]" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* MCU Specifications Panel */}
        <Card className="xl:col-span-3 border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
          <CardHeader className="pb-4 border-b border-[#3e3e3e]">
            <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center">
                <Monitor className="h-4 w-4 text-black" />
              </div>
              MCU Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {selectedMCU ? (
              <div className="space-y-6">
                {/* Selected MCU Header */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#00ff41]/10 to-[#40e0d0]/5 border border-[#00ff41]/30 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-xl flex items-center justify-center shadow-lg">
                    <Cpu className="h-6 w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{selectedMCU}</h3>
                    <p className="text-gray-300 text-sm">ARM Cortex-M4 Microcontroller</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#00ff41] to-[#40e0d0] text-black font-semibold px-4 py-2">
                    ✓ SELECTED
                  </Badge>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Cpu className="h-3 w-3 text-blue-400" />
                      </div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Architecture</label>
                    </div>
                    <p className="text-white font-bold text-lg">ARM Cortex-M4</p>
                    <p className="text-gray-400 text-xs mt-1">32-bit RISC processor</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="h-3 w-3 text-green-400" />
                      </div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Max Frequency</label>
                    </div>
                    <p className="text-white font-bold text-lg">168 MHz</p>
                    <p className="text-gray-400 text-xs mt-1">High-performance operation</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <HardDrive className="h-3 w-3 text-purple-400" />
                      </div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Flash Memory</label>
                    </div>
                    <p className="text-white font-bold text-lg">1024 KB</p>
                    <p className="text-gray-400 text-xs mt-1">Program storage</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Monitor className="h-3 w-3 text-orange-400" />
                      </div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SRAM</label>
                    </div>
                    <p className="text-white font-bold text-lg">192 KB</p>
                    <p className="text-gray-400 text-xs mt-1">System memory</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <Power className="h-3 w-3 text-teal-400" />
                      </div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Voltage Range</label>
                    </div>
                    <p className="text-white font-bold text-lg">1.8V - 3.6V</p>
                    <p className="text-gray-400 text-xs mt-1">Operating voltage</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-3 w-3 text-red-400" />
                      </div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Package</label>
                    </div>
                    <p className="text-white font-bold text-lg">LQFP144</p>
                    <p className="text-gray-400 text-xs mt-1">144-pin package</p>
                  </div>
                </div>

                {/* Available Communication Interfaces */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#00ff41]" />
                    Available Communication Interfaces
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {['I2C', 'SPI', 'UART', 'CANxx', 'USB', 'Ethernet'].map(peripheral => (
                      <div key={peripheral} className="bg-gradient-to-r from-[#00ff41]/20 to-[#40e0d0]/10 border border-[#00ff41]/30 rounded-lg px-4 py-2 flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#00ff41] rounded flex items-center justify-center">
                          <Check className="h-2 w-2 text-black" />
                        </div>
                        <span className="text-white font-medium text-sm">{peripheral}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-[#3e3e3e] to-[#2d2d2d] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#3e3e3e]">
                  <Cpu className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-lg">No MCU/MPU Selected</h3>
                <p className="text-gray-400 max-w-md mx-auto">Choose a microcontroller from the database to view detailed specifications and technical information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProtocolSelection = () => {
    const categories = [...new Set(protocols.map(p => p.category))];
    
    return (
      <div className="space-y-8">
        {renderErrors()}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#3e3e3e]">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-mono">protocol_bus_selection</h1>
            <p className="text-gray-300 text-sm">Choose the communication protocol for your peripheral device</p>
          </div>
        </div>

  {/* Protocol Statistics removed as per user request */}

        {/* Category Tabs */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-[#00ff41]/20 rounded flex items-center justify-center">
              <Layers className="h-2 w-2 text-[#00ff41]" />
            </div>
            <h3 className="text-lg font-semibold text-white font-mono">Browse by Category</h3>
          </div>
          
          {categories.map(category => {
            const categoryProtocols = protocols.filter(p => p.category === category);
            const colors = getCategoryColor(category);
            
            return (
              <div key={category} className="space-y-4">
                {/* Category Header */}
                <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    {getProtocolIcon(categoryProtocols[0]?.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${colors.text} font-mono text-lg`}>{category}</h4>
                    <p className="text-xs text-gray-400">{categoryProtocols.length} protocol{categoryProtocols.length !== 1 ? 's' : ''} available</p>
                  </div>
                  <Badge className={`${colors.bg} ${colors.text} border ${colors.border} font-mono text-xs`}>
                    {category.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Protocols in Category */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 ml-4">
                  {categoryProtocols.map((protocol) => {
                    const isSelected = selectedProtocol === protocol.name;
                    
                    return (
                      <Card
                        key={protocol.name}
                        className={`border cursor-pointer transition-all duration-200 hover:shadow-xl group min-h-[120px] ${
                          isSelected
                            ? `border-[#00ff41] bg-gradient-to-br from-[#00ff41]/10 to-[#40e0d0]/5 shadow-lg ring-1 ring-[#00ff41]/20`
                            : 'border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] hover:border-[#00ff41]/50 hover:shadow-lg'
                        }`}
                        onClick={() => {
                          setSelectedProtocol(protocol.name);
                          clearErrors();
                        }}
                      >
                        <CardContent className="p-3 flex flex-col gap-2">
                          <div className="flex items-center gap-2 justify-between">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              isSelected 
                                ? 'bg-gradient-to-br from-[#00ff41] to-[#40e0d0] shadow-lg' 
                                : `bg-gradient-to-br ${colors.bg} group-hover:scale-110`
                            }`}>
                              <div className={isSelected ? 'text-black' : colors.text}>
                                {getProtocolIcon(protocol.icon)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-base font-mono truncate transition-colors ${
                                isSelected ? 'text-[#00ff41]' : 'text-white group-hover:text-[#00ff41]'
                              }`}>
                                {protocol.name}
                              </h3>
                              <div className="flex items-center gap-1 mt-1 flex-wrap">
                                <Badge className={`text-xs px-1 py-0.5 ${colors.bg} ${colors.text} border ${colors.border}`}>
                                  {protocol.category}
                                </Badge>
                                <Badge className={`text-xs px-1 py-0.5 ${
                                  protocol.popularity === 'High' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                  protocol.popularity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                }`}>
                                  {protocol.popularity}
                                </Badge>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-full flex items-center justify-center shadow-lg">
                                <Check className="h-3 w-3 text-black font-bold" />
                              </div>
                            )}
                          </div>
                          <p className="text-gray-300 text-xs leading-snug line-clamp-2">{protocol.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-[#00ff41]" />
                              <span className="text-xs text-gray-400 font-mono">MAX_SPEED</span>
                            </div>
                            <Badge className={`bg-gradient-to-r from-[#00ff41]/20 to-[#40e0d0]/10 text-[#00ff41] border border-[#00ff41]/30 font-mono text-xs px-2 py-0.5`}>
                              {protocol.frequency}
                            </Badge>
                          </div>
                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="mt-2 pt-2 border-t border-[#00ff41]/20">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
                                <span className="text-xs text-[#00ff41] font-mono font-semibold">PROTOCOL_SELECTED</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Protocol Info Panel */}
        {selectedProtocol && (
          <Card className="border border-[#00ff41]/30 bg-gradient-to-br from-[#00ff41]/5 to-[#40e0d0]/5 shadow-xl">
            <CardHeader className="pb-4 border-b border-[#00ff41]/20">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                Selected Protocol: {selectedProtocol}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {(() => {
                const selected = protocols.find(p => p.name === selectedProtocol);
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          {getProtocolIcon(selected?.icon)}
                        </div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Protocol Type</label>
                      </div>
                      <p className="text-white font-bold text-lg font-mono">{selected?.name}</p>
                      <p className="text-gray-400 text-xs mt-1">{selected?.description}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="h-3 w-3 text-green-400" />
                        </div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Max Speed</label>
                      </div>
                      <p className="text-white font-bold text-lg font-mono">{selected?.frequency}</p>
                      <p className="text-gray-400 text-xs mt-1">Maximum data rate</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Layers className="h-3 w-3 text-purple-400" />
                        </div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</label>
                      </div>
                      <p className="text-white font-bold text-lg font-mono">{selected?.category}</p>
                      <p className="text-gray-400 text-xs mt-1">{selected?.popularity} popularity</p>
                    </div>
                  </div>
                );
              })()} 
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Get filtered peripherals based on search term
  const getFilteredPeripherals = () => {
    if (!selectedProtocol) return [];
    
    const availablePeripherals = peripherals[selectedProtocol] || [];
    
    if (!peripheralSearchTerm) {
      return availablePeripherals;
    }
    
    const term = peripheralSearchTerm.toLowerCase();
    return availablePeripherals.filter(device => 
      device.name.toLowerCase().includes(term) ||
      device.category.toLowerCase().includes(term) ||
      device.description.toLowerCase().includes(term)
    );
  };

  // Get peripheral categories for the selected protocol
  const getPeripheralCategories = () => {
    if (!selectedProtocol) return [];
    const availablePeripherals = peripherals[selectedProtocol] || [];
    return [...new Set(availablePeripherals.map(p => p.category))];
  };

  // Get category color scheme for peripherals
  const getPeripheralCategoryColor = (category) => {
    switch (category) {
      case 'Environmental Sensor': return { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-400' };
      case 'IMU Sensor': return { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' };
      case 'RTC': return { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400' };
      case 'Display': return { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' };
      case 'RF Module': return { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', text: 'text-orange-400' };
      case 'Storage': return { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' };
      case 'Display Driver': return { bg: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400' };
      case 'WiFi Module': return { bg: 'from-teal-500/20 to-cyan-500/20', border: 'border-teal-500/30', text: 'text-teal-400' };
      case 'Bluetooth': return { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400' };
      case 'Navigation': return { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' };
      default: return { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-500/30', text: 'text-gray-400' };
    }
  };

  // Get peripheral icon based on category
  const getPeripheralIcon = (category) => {
    const iconProps = { className: "h-4 w-4" };
    switch (category) {
      case 'Environmental Sensor': return <Zap {...iconProps} />;
      case 'IMU Sensor': return <Cpu {...iconProps} />;
      case 'RTC': return <Clock {...iconProps} />;
      case 'Display': return <Monitor {...iconProps} />;
      case 'RF Module': return <Radio {...iconProps} />;
      case 'Storage': return <HardDrive {...iconProps} />;
      case 'Display Driver': return <Layers {...iconProps} />;
      case 'WiFi Module': return <Wifi {...iconProps} />;
      case 'Bluetooth': return <Bluetooth {...iconProps} />;
      case 'Navigation': return <Globe {...iconProps} />;
      default: return <Microchip {...iconProps} />;
    }
  };

  const renderPeripheralSelection = () => {
    if (!selectedProtocol) {
      return (
        <div className="space-y-8">
          {renderErrors()}
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#3e3e3e]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
              <HardDrive className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1 font-mono">peripheral_device_selection</h1>
              <p className="text-gray-300 text-sm">Select the specific peripheral device for driver generation</p>
            </div>
          </div>

          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-[#3e3e3e] to-[#2d2d2d] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#3e3e3e]">
              <AlertTriangle className="h-10 w-10 text-orange-400" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-lg">No Protocol Selected</h3>
            <p className="text-gray-400 max-w-md mx-auto">Please select a communication protocol first to view compatible peripheral devices</p>
            <Button 
              onClick={() => setCurrentStep(1)}
              className="mt-6 bg-gradient-to-r from-[#00ff41] to-[#40e0d0] hover:from-[#00e038] hover:to-[#30d0c0] text-black font-mono font-bold"
            >
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Go Back to Protocol Selection
            </Button>
          </div>
        </div>
      );
    }

    const categories = getPeripheralCategories();
    const filteredPeripherals = getFilteredPeripherals();
    
    return (
      <div className="space-y-8">
        {renderErrors()}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#3e3e3e]">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
            <HardDrive className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-mono">peripheral_device_selection</h1>
            <p className="text-gray-300 text-sm">Select the specific peripheral device for driver generation</p>
          </div>
        </div>

        {/* Protocol Context & Search */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="h-3 w-3 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Selected Protocol</span>
            </div>
            <p className="text-lg font-bold text-white font-mono">{selectedProtocol}</p>
            <p className="text-gray-400 text-xs mt-1">Communication interface</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                <HardDrive className="h-3 w-3 text-green-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Devices</span>
            </div>
            <p className="text-lg font-bold text-white">{peripherals[selectedProtocol]?.length || 0}</p>
            <p className="text-gray-400 text-xs mt-1">Compatible peripherals</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Layers className="h-3 w-3 text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</span>
            </div>
            <p className="text-lg font-bold text-white">{categories.length}</p>
            <p className="text-gray-400 text-xs mt-1">Device types</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Search className="h-3 w-3 text-orange-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Filtered Results</span>
            </div>
            <p className="text-lg font-bold text-white">{filteredPeripherals.length}</p>
            <p className="text-gray-400 text-xs mt-1">Matching devices</p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
              <div className="w-8 h-8 bg-[#00ff41]/20 rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-[#00ff41]" />
              </div>
              Peripheral Search
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search peripherals by name, category, or description..."
                value={peripheralSearchTerm}
                onChange={(e) => setPeripheralSearchTerm(e.target.value)}
                className="pl-10 bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
              />
            </div>
            {peripheralSearchTerm && (
              <div className="flex items-center gap-2 text-xs mt-2">
                <Search className="h-3 w-3 text-[#00ff41]" />
                <span className="text-[#00ff41] font-mono">
                  {filteredPeripherals.length} results for "{peripheralSearchTerm}"
                </span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setPeripheralSearchTerm('')}
                  className="ml-auto h-auto p-1 text-gray-400 hover:text-white hover:bg-[#3e3e3e]"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Category Sections */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-[#00ff41]/20 rounded flex items-center justify-center">
              <Layers className="h-2 w-2 text-[#00ff41]" />
            </div>
            <h3 className="text-lg font-semibold text-white font-mono">Browse by Category</h3>
            <Badge className="bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 font-mono text-xs ml-auto">
              {selectedProtocol} COMPATIBLE
            </Badge>
          </div>
          
          {categories.map(category => {
            const categoryDevices = filteredPeripherals.filter(p => p.category === category);
            const colors = getPeripheralCategoryColor(category);
            
            if (categoryDevices.length === 0) return null;
            
            return (
              <div key={category} className="space-y-4">
                {/* Category Header */}
                <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    {getPeripheralIcon(category)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${colors.text} font-mono text-lg`}>{category}</h4>
                    <p className="text-xs text-gray-400">{categoryDevices.length} device{categoryDevices.length !== 1 ? 's' : ''} available</p>
                  </div>
                  <Badge className={`${colors.bg} ${colors.text} border ${colors.border} font-mono text-xs`}>
                    {category.toUpperCase().replace(' ', '_')}
                  </Badge>
                </div>
                
                {/* Devices in Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ml-4">
                  {categoryDevices.map((device) => {
                    const isSelected = selectedPeripheral === device.name;
                    
                    return (
                      <Card
                        key={device.name}
                        className={`border cursor-pointer transition-all duration-200 hover:shadow-xl group ${
                          isSelected
                            ? `border-[#00ff41] bg-gradient-to-br from-[#00ff41]/10 to-[#40e0d0]/5 shadow-lg ring-1 ring-[#00ff41]/20`
                            : 'border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] hover:border-[#00ff41]/50 hover:shadow-lg'
                        }`}
                        onClick={() => {
                          setSelectedPeripheral(device.name);
                          clearErrors();
                        }}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                isSelected 
                                  ? 'bg-gradient-to-br from-[#00ff41] to-[#40e0d0] shadow-lg' 
                                  : `bg-gradient-to-br ${colors.bg} group-hover:scale-110`
                              }`}>
                                <div className={isSelected ? 'text-black' : colors.text}>
                                  {getPeripheralIcon(device.category)}
                                </div>
                              </div>
                              <div>
                                <h3 className={`font-bold text-lg font-mono transition-colors ${
                                  isSelected ? 'text-[#00ff41]' : 'text-white group-hover:text-[#00ff41]'
                                }`}>
                                  {device.name}
                                </h3>
                                <Badge className={`text-xs px-2 py-1 mt-1 ${colors.bg} ${colors.text} border ${colors.border}`}>
                                  {device.category}
                                </Badge>
                              </div>
                            </div>
                            
                            {isSelected && (
                              <div className="w-6 h-6 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-full flex items-center justify-center shadow-lg">
                                <Check className="h-3 w-3 text-black font-bold" />
                              </div>
                            )}
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{device.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-[#00ff41]" />
                              <span className="text-xs text-gray-400 font-mono">PROTOCOL</span>
                            </div>
                            <Badge className={`bg-gradient-to-r from-[#00ff41]/20 to-[#40e0d0]/10 text-[#00ff41] border border-[#00ff41]/30 font-mono text-xs px-3 py-1`}>
                              {selectedProtocol}
                            </Badge>
                          </div>
                          
                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="mt-4 pt-4 border-t border-[#00ff41]/20">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
                                <span className="text-xs text-[#00ff41] font-mono font-semibold">PERIPHERAL_SELECTED</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Peripheral Info Panel */}
        {selectedPeripheral && (
          <Card className="border border-[#00ff41]/30 bg-gradient-to-br from-[#00ff41]/5 to-[#40e0d0]/5 shadow-xl">
            <CardHeader className="pb-4 border-b border-[#00ff41]/20">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                Selected Peripheral: {selectedPeripheral}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {(() => {
                const selected = (peripherals[selectedProtocol] || []).find(p => p.name === selectedPeripheral);
                if (!selected) return null;
                
                const colors = getPeripheralCategoryColor(selected.category);
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          {getPeripheralIcon(selected.category)}
                        </div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Device Name</label>
                      </div>
                      <p className="text-white font-bold text-lg font-mono">{selected.name}</p>
                      <p className="text-gray-400 text-xs mt-1">{selected.category}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="h-3 w-3 text-green-400" />
                        </div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Protocol</label>
                      </div>
                      <p className="text-white font-bold text-lg font-mono">{selectedProtocol}</p>
                      <p className="text-gray-400 text-xs mt-1">Communication interface</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Info className="h-3 w-3 text-purple-400" />
                        </div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                      </div>
                      <p className="text-white font-bold text-sm font-mono leading-relaxed">{selected.description}</p>
                      <p className="text-gray-400 text-xs mt-1">Device functionality</p>
                    </div>
                  </div>
                );
              })()} 
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Update driver settings
  const updateDriverSetting = (key, value) => {
    setDriverSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderSettings = () => {
    const totalSettings = Object.keys(driverSettings).length;
    const configuredSettings = Object.entries(driverSettings).filter(([key, value]) => {
      if (typeof value === 'boolean') return value === true;
      if (typeof value === 'string') return value !== '' && value !== 'drivers/';
      return false;
    }).length;

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#3e3e3e]">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
            <Settings className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-mono">driver_settings</h1>
            <p className="text-gray-300 text-sm">Configure driver parameters and advanced options</p>
          </div>
        </div>

        {/* Configuration Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Settings className="h-3 w-3 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Settings</span>
            </div>
            <p className="text-lg font-bold text-white">{totalSettings}</p>
            <p className="text-gray-400 text-xs mt-1">Available options</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Check className="h-3 w-3 text-green-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configured</span>
            </div>
            <p className="text-lg font-bold text-white">{configuredSettings}</p>
            <p className="text-gray-400 text-xs mt-1">Settings enabled</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Code2 className="h-3 w-3 text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Code Style</span>
            </div>
            <p className="text-lg font-bold text-white">{driverSettings.codeStyle || 'None'}</p>
            <p className="text-gray-400 text-xs mt-1">Formatting standard</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Zap className="h-3 w-3 text-orange-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Optimization</span>
            </div>
            <p className="text-lg font-bold text-white capitalize">{driverSettings.optimization}</p>
            <p className="text-gray-400 text-xs mt-1">Performance level</p>
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="space-y-8">
          {/* Basic Configuration */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-400" />
                </div>
                Basic Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <File className="h-4 w-4 text-[#00ff41]" />
                    Driver Name
                  </Label>
                  <Input
                    value={driverSettings.driverName}
                    onChange={(e) => updateDriverSetting('driverName', e.target.value)}
                    placeholder={`${selectedPeripheral?.toLowerCase() || 'device'}_driver`}
                    className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                  />
                  <p className="text-xs text-gray-400">Main driver file name (without .c/.h extension)</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-[#00ff41]" />
                    Include Path
                  </Label>
                  <Input
                    value={driverSettings.includePath}
                    onChange={(e) => updateDriverSetting('includePath', e.target.value)}
                    placeholder="drivers/"
                    className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                  />
                  <p className="text-xs text-gray-400">Directory path for generated files</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-[#00ff41]" />
                    Code Style
                  </Label>
                  <Select value={driverSettings.codeStyle} onValueChange={(value) => updateDriverSetting('codeStyle', value)}>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                      <SelectValue placeholder="Select coding standard" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                      <SelectItem value="misra">MISRA-C (Safety Critical)</SelectItem>
                      <SelectItem value="google">Google Style Guide</SelectItem>
                      <SelectItem value="llvm">LLVM Coding Standards</SelectItem>
                      <SelectItem value="kernel">Linux Kernel Style</SelectItem>
                      <SelectItem value="embedded">Embedded C Guidelines</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">Coding standards and formatting rules</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#00ff41]" />
                    Custom Prefix
                  </Label>
                  <Input
                    value={driverSettings.customPrefix}
                    onChange={(e) => updateDriverSetting('customPrefix', e.target.value)}
                    placeholder={`${selectedPeripheral?.toLowerCase() || 'dev'}_`}
                    className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                  />
                  <p className="text-xs text-gray-400">Function and variable name prefix</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Features */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Cog className="h-4 w-4 text-green-400" />
                </div>
                Advanced Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <div>
                        <Label className="text-white font-medium">Error Handling</Label>
                        <p className="text-xs text-gray-400">Comprehensive error checking and reporting</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.errorHandling}
                      onCheckedChange={(checked) => updateDriverSetting('errorHandling', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                      <div>
                        <Label className="text-white font-medium">Documentation</Label>
                        <p className="text-xs text-gray-400">Generate Doxygen-compatible comments</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.documentation}
                      onCheckedChange={(checked) => updateDriverSetting('documentation', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <GitBranch className="h-5 w-5 text-yellow-400" />
                      <div>
                        <Label className="text-white font-medium">Test Functions</Label>
                        <p className="text-xs text-gray-400">Include unit test and example code</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.testCode}
                      onCheckedChange={(checked) => updateDriverSetting('testCode', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Layers className="h-5 w-5 text-purple-400" />
                      <div>
                        <Label className="text-white font-medium">HAL Integration</Label>
                        <p className="text-xs text-gray-400">Hardware Abstraction Layer support</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.halIntegration}
                      onCheckedChange={(checked) => updateDriverSetting('halIntegration', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-orange-400" />
                      <div>
                        <Label className="text-white font-medium">Interrupt Support</Label>
                        <p className="text-xs text-gray-400">Hardware interrupt handling routines</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.interruptSupport}
                      onCheckedChange={(checked) => updateDriverSetting('interruptSupport', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <HardDrive className="h-5 w-5 text-green-400" />
                      <div>
                        <Label className="text-white font-medium">DMA Support</Label>
                        <p className="text-xs text-gray-400">Direct Memory Access operations</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.dmaSupport}
                      onCheckedChange={(checked) => updateDriverSetting('dmaSupport', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Power className="h-5 w-5 text-teal-400" />
                      <div>
                        <Label className="text-white font-medium">Power Management</Label>
                        <p className="text-xs text-gray-400">Low-power modes and sleep functions</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.powerManagement}
                      onCheckedChange={(checked) => updateDriverSetting('powerManagement', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Terminal className="h-5 w-5 text-cyan-400" />
                      <div>
                        <Label className="text-white font-medium">Debug Support</Label>
                        <p className="text-xs text-gray-400">Debugging macros and trace functions</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={driverSettings.debugSupport}
                      onCheckedChange={(checked) => updateDriverSetting('debugSupport', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance & Quality */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-orange-400" />
                </div>
                Performance & Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#00ff41]" />
                    Optimization Level
                  </Label>
                  <Select value={driverSettings.optimization} onValueChange={(value) => updateDriverSetting('optimization', value)}>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                      <SelectValue placeholder="Select optimization level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                      <SelectItem value="size">Size Optimized (-Os)</SelectItem>
                      <SelectItem value="speed">Speed Optimized (-O3)</SelectItem>
                      <SelectItem value="balanced">Balanced (-O2)</SelectItem>
                      <SelectItem value="debug">Debug Friendly (-O0)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">Compiler optimization preferences</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-[#00ff41]" />
                    Memory Priority
                  </Label>
                  <Select value={driverSettings.memoryPriority} onValueChange={(value) => updateDriverSetting('memoryPriority', value)}>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                      <SelectValue placeholder="Select memory usage priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                      <SelectItem value="low">Low Memory Usage</SelectItem>
                      <SelectItem value="moderate">Moderate Usage</SelectItem>
                      <SelectItem value="high">High Performance</SelectItem>
                      <SelectItem value="custom">Custom Profile</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">Memory allocation strategy</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#00ff41]" />
                    License Header
                  </Label>
                  <Select value={driverSettings.licenseHeader} onValueChange={(value) => updateDriverSetting('licenseHeader', value)}>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                      <SelectItem value="mit">MIT License</SelectItem>
                      <SelectItem value="apache">Apache 2.0</SelectItem>
                      <SelectItem value="bsd">BSD 3-Clause</SelectItem>
                      <SelectItem value="gpl">GPL v3</SelectItem>
                      <SelectItem value="proprietary">Proprietary</SelectItem>
                      <SelectItem value="none">No License</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">License header for generated files</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-indigo-400" />
                    <div>
                      <Label className="text-white font-medium">Thread Safety</Label>
                      <p className="text-xs text-gray-400">Multi-threaded environment support</p>
                    </div>
                  </div>
                  <Checkbox 
                    checked={driverSettings.threadSafety}
                    onCheckedChange={(checked) => updateDriverSetting('threadSafety', checked)}
                    className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Summary */}
        {(driverSettings.driverName || driverSettings.codeStyle) && (
          <Card className="border border-[#00ff41]/30 bg-gradient-to-br from-[#00ff41]/5 to-[#40e0d0]/5 shadow-xl">
            <CardHeader className="pb-4 border-b border-[#00ff41]/20">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                Configuration Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <File className="h-3 w-3 text-blue-400" />
                    </div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Generated Files</label>
                  </div>
                  <div className="space-y-1 text-sm text-white font-mono">
                    <p>• {driverSettings.driverName || `${selectedPeripheral?.toLowerCase() || 'device'}_driver`}.c</p>
                    <p>• {driverSettings.driverName || `${selectedPeripheral?.toLowerCase() || 'device'}_driver`}.h</p>
                    {driverSettings.testCode && <p>• test_{driverSettings.driverName || 'driver'}.c</p>}
                    {driverSettings.documentation && <p>• README.md</p>}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Settings className="h-3 w-3 text-green-400" />
                    </div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Features</label>
                  </div>
                  <div className="space-y-1 text-sm text-white">
                    {driverSettings.errorHandling && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> Error Handling</p>}
                    {driverSettings.documentation && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> Documentation</p>}
                    {driverSettings.halIntegration && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> HAL Integration</p>}
                    {driverSettings.debugSupport && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> Debug Support</p>}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-3 w-3 text-purple-400" />
                    </div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Performance</label>
                  </div>
                  <div className="space-y-1 text-sm text-white font-mono">
                    <p>Optimization: {driverSettings.optimization}</p>
                    <p>Memory: {driverSettings.memoryPriority}</p>
                    <p>Style: {driverSettings.codeStyle || 'Default'}</p>
                    <p>License: {driverSettings.licenseHeader?.toUpperCase() || 'MIT'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };


  // Update additional config
  const updateAdditionalConfig = (key, value) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setAdditionalConfig(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setAdditionalConfig(prev => ({ ...prev, [key]: value }));
    }
  };

  // Add/remove custom items
  const addCustomItem = (type, item) => {
    if (item.trim()) {
      setAdditionalConfig(prev => ({
        ...prev,
        [type]: [...prev[type], item.trim()]
      }));
    }
  };

  const removeCustomItem = (type, index) => {
    setAdditionalConfig(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const renderAdditionalConfig = () => {
    const totalConfigs = Object.keys(additionalConfig).length;
    const configuredItems = Object.entries(additionalConfig).filter(([key, value]) => {
      if (typeof value === 'boolean') return value === true;
      if (typeof value === 'string') return value !== '';
      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) return value.length > 0;
        return Object.values(value).some(v => v !== '' && v !== false);
      }
      return false;
    }).length;

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#3e3e3e]">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
            <Cog className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-mono">additional_configuration</h1>
            <p className="text-gray-300 text-sm">Fine-tune driver behavior and add custom requirements</p>
          </div>
        </div>

        {/* Configuration Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Cog className="h-3 w-3 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Options</span>
            </div>
            <p className="text-lg font-bold text-white">{totalConfigs}</p>
            <p className="text-gray-400 text-xs mt-1">Configuration sections</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Check className="h-3 w-3 text-green-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configured</span>
            </div>
            <p className="text-lg font-bold text-white">{configuredItems}</p>
            <p className="text-gray-400 text-xs mt-1">Options set</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-3 w-3 text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Compliance</span>
            </div>
            <p className="text-lg font-bold text-white">{Object.values(additionalConfig.compliance).filter(Boolean).length}</p>
            <p className="text-gray-400 text-xs mt-1">Standards enabled</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Code2 className="h-3 w-3 text-orange-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Custom Items</span>
            </div>
            <p className="text-lg font-bold text-white">{additionalConfig.customDefines.length + additionalConfig.includePaths.length + additionalConfig.linkLibraries.length}</p>
            <p className="text-gray-400 text-xs mt-1">Defines & paths</p>
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="space-y-8">
          {/* Project Information */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-400" />
                </div>
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#00ff41]" />
                    Target Application
                  </Label>
                  <Input
                    value={additionalConfig.targetApplication}
                    onChange={(e) => updateAdditionalConfig('targetApplication', e.target.value)}
                    placeholder="IoT Device, Automotive ECU, Industrial Controller..."
                    className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                  />
                  <p className="text-xs text-gray-400">Describe the target application or use case</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-[#00ff41]" />
                    Operating System
                  </Label>
                  <Select value={additionalConfig.operatingSystem} onValueChange={(value) => updateAdditionalConfig('operatingSystem', value)}>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                      <SelectValue placeholder="Select target OS" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                      <SelectItem value="bare-metal">Bare Metal</SelectItem>
                      <SelectItem value="freertos">FreeRTOS</SelectItem>
                      <SelectItem value="zephyr">Zephyr RTOS</SelectItem>
                      <SelectItem value="threadx">ThreadX</SelectItem>
                      <SelectItem value="micrium">Micrium OS</SelectItem>
                      <SelectItem value="embos">embOS</SelectItem>
                      <SelectItem value="linux">Embedded Linux</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">Target operating system or execution environment</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[#00ff41]" />
                    Firmware Version
                  </Label>
                  <Input
                    value={additionalConfig.firmwareVersion}
                    onChange={(e) => updateAdditionalConfig('firmwareVersion', e.target.value)}
                    placeholder="1.0.0"
                    className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                  />
                  <p className="text-xs text-gray-400">Version number for generated driver</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#00ff41]" />
                    Compiler Toolchain
                  </Label>
                  <Select value={additionalConfig.compilerToolchain} onValueChange={(value) => updateAdditionalConfig('compilerToolchain', value)}>
                    <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                      <SelectValue placeholder="Select toolchain" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                      <SelectItem value="gcc-arm">GCC ARM Embedded</SelectItem>
                      <SelectItem value="armcc">ARM Compiler</SelectItem>
                      <SelectItem value="icc">IAR C/C++</SelectItem>
                      <SelectItem value="keil">Keil MDK</SelectItem>
                      <SelectItem value="clang">Clang/LLVM</SelectItem>
                      <SelectItem value="avr-gcc">AVR-GCC</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">Target compiler and toolchain</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Features */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-green-400" />
                </div>
                System Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Cpu className="h-5 w-5 text-blue-400" />
                      <div>
                        <Label className="text-white font-medium">RTOS Support</Label>
                        <p className="text-xs text-gray-400">Real-time operating system integration</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.rtosSupport}
                      onCheckedChange={(checked) => updateAdditionalConfig('rtosSupport', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <HardDrive className="h-5 w-5 text-purple-400" />
                      <div>
                        <Label className="text-white font-medium">Bootloader Integration</Label>
                        <p className="text-xs text-gray-400">Firmware update and bootloader support</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.bootloaderIntegration}
                      onCheckedChange={(checked) => updateAdditionalConfig('bootloaderIntegration', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <div>
                        <Label className="text-white font-medium">Security Features</Label>
                        <p className="text-xs text-gray-400">Encryption, authentication, and secure boot</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.securityFeatures}
                      onCheckedChange={(checked) => updateAdditionalConfig('securityFeatures', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-yellow-400" />
                      <div>
                        <Label className="text-white font-medium">Calibration Support</Label>
                        <p className="text-xs text-gray-400">Runtime parameter tuning and calibration</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.calibrationSupport}
                      onCheckedChange={(checked) => updateAdditionalConfig('calibrationSupport', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Terminal className="h-5 w-5 text-green-400" />
                      <div>
                        <Label className="text-white font-medium">Diagnostics Enabled</Label>
                        <p className="text-xs text-gray-400">Built-in diagnostics and health monitoring</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.diagnosticsEnabled}
                      onCheckedChange={(checked) => updateAdditionalConfig('diagnosticsEnabled', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory & Performance Constraints */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-orange-400" />
                </div>
                Memory & Performance Constraints
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Memory Constraints */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center">
                      <HardDrive className="h-2 w-2 text-purple-400" />
                    </div>
                    <h4 className="text-white font-semibold font-mono">Memory Limits</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Layers className="h-4 w-4 text-[#00ff41]" />
                      Stack Size (bytes)
                    </Label>
                    <Input
                      value={additionalConfig.memoryConstraints.stackSize}
                      onChange={(e) => updateAdditionalConfig('memoryConstraints.stackSize', e.target.value)}
                      placeholder="4096"
                      className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                    />
                    <p className="text-xs text-gray-400">Maximum stack memory usage</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-[#00ff41]" />
                      Heap Size (bytes)
                    </Label>
                    <Input
                      value={additionalConfig.memoryConstraints.heapSize}
                      onChange={(e) => updateAdditionalConfig('memoryConstraints.heapSize', e.target.value)}
                      placeholder="8192"
                      className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                    />
                    <p className="text-xs text-gray-400">Dynamic memory allocation limit</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Microchip className="h-4 w-4 text-[#00ff41]" />
                      Flash Usage Priority
                    </Label>
                    <Select value={additionalConfig.memoryConstraints.flashUsage} onValueChange={(value) => updateAdditionalConfig('memoryConstraints.flashUsage', value)}>
                      <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                        <SelectValue placeholder="Select flash priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                        <SelectItem value="minimal">Minimal (Code size priority)</SelectItem>
                        <SelectItem value="moderate">Moderate (Balanced)</SelectItem>
                        <SelectItem value="generous">Generous (Feature rich)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Flash memory usage strategy</p>
                  </div>
                </div>
                
                {/* Performance Targets */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center">
                      <Zap className="h-2 w-2 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold font-mono">Performance Targets</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#00ff41]" />
                      Max Response Time (μs)
                    </Label>
                    <Input
                      value={additionalConfig.performanceTargets.maxResponseTime}
                      onChange={(e) => updateAdditionalConfig('performanceTargets.maxResponseTime', e.target.value)}
                      placeholder="100"
                      className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20"
                    />
                    <p className="text-xs text-gray-400">Maximum acceptable response time</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Network className="h-4 w-4 text-[#00ff41]" />
                      Throughput Requirement
                    </Label>
                    <Select value={additionalConfig.performanceTargets.throughput} onValueChange={(value) => updateAdditionalConfig('performanceTargets.throughput', value)}>
                      <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                        <SelectValue placeholder="Select throughput" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                        <SelectItem value="low">Low (&lt; 1 kB/s)</SelectItem>
                        <SelectItem value="standard">Standard (1-100 kB/s)</SelectItem>
                        <SelectItem value="high">High (100 kB/s - 1 MB/s)</SelectItem>
                        <SelectItem value="ultra">Ultra (&gt; 1 MB/s)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Data throughput requirements</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Power className="h-4 w-4 text-[#00ff41]" />
                      Power Consumption
                    </Label>
                    <Select value={additionalConfig.performanceTargets.powerConsumption} onValueChange={(value) => updateAdditionalConfig('performanceTargets.powerConsumption', value)}>
                      <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                        <SelectValue placeholder="Select power profile" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                        <SelectItem value="ultra-low">Ultra Low Power</SelectItem>
                        <SelectItem value="low">Low Power</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="performance">Performance First</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Power consumption priority</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Standards */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
                Industry Compliance & Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-blue-400" />
                      <div>
                        <Label className="text-white font-medium">Automotive (ISO 26262)</Label>
                        <p className="text-xs text-gray-400">Functional safety for automotive systems</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.compliance.automotive}
                      onCheckedChange={(checked) => updateAdditionalConfig('compliance.automotive', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 text-red-400" />
                      <div>
                        <Label className="text-white font-medium">Medical (IEC 62304)</Label>
                        <p className="text-xs text-gray-400">Medical device software standards</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.compliance.medical}
                      onCheckedChange={(checked) => updateAdditionalConfig('compliance.medical', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Radio className="h-5 w-5 text-purple-400" />
                      <div>
                        <Label className="text-white font-medium">Aerospace (DO-178C)</Label>
                        <p className="text-xs text-gray-400">Aviation software certification</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.compliance.aerospace}
                      onCheckedChange={(checked) => updateAdditionalConfig('compliance.aerospace', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-yellow-400" />
                      <div>
                        <Label className="text-white font-medium">Industrial (IEC 61508)</Label>
                        <p className="text-xs text-gray-400">Functional safety for industrial systems</p>
                      </div>
                    </div>
                    <Checkbox 
                      checked={additionalConfig.compliance.industrial}
                      onCheckedChange={(checked) => updateAdditionalConfig('compliance.industrial', checked)}
                      className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Requirements */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-cyan-400" />
                </div>
                Custom Requirements & Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#00ff41]" />
                    Custom Requirements
                  </Label>
                  <Textarea
                    value={additionalConfig.customRequirements}
                    onChange={(e) => updateAdditionalConfig('customRequirements', e.target.value)}
                    placeholder="Describe any specific requirements, constraints, or custom functionality needed for your driver...\n\nExample:\n- Must support hot-swapping of devices\n- Require thread-safe operations\n- Need custom error codes for application layer\n- Support for firmware update during runtime"
                    rows={8}
                    className="bg-[#1e1e1e] border-[#3e3e3e] text-white placeholder-gray-400 focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400">Detailed requirements and specifications for the generated driver</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Cog className="h-4 w-4 text-[#00ff41]" />
                      Build System
                    </Label>
                    <Select value={additionalConfig.buildSystem} onValueChange={(value) => updateAdditionalConfig('buildSystem', value)}>
                      <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                        <SelectValue placeholder="Select build system" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                        <SelectItem value="cmake">CMake</SelectItem>
                        <SelectItem value="makefile">Makefile</SelectItem>
                        <SelectItem value="autotools">Autotools</SelectItem>
                        <SelectItem value="bazel">Bazel</SelectItem>
                        <SelectItem value="ninja">Ninja</SelectItem>
                        <SelectItem value="platformio">PlatformIO</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Target build system integration</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-[#00ff41]" />
                      Test Framework
                    </Label>
                    <Select value={additionalConfig.testFramework} onValueChange={(value) => updateAdditionalConfig('testFramework', value)}>
                      <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                        <SelectValue placeholder="Select test framework" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                        <SelectItem value="unity">Unity Test Framework</SelectItem>
                        <SelectItem value="cppunit">CppUnit</SelectItem>
                        <SelectItem value="googletest">Google Test</SelectItem>
                        <SelectItem value="catch2">Catch2</SelectItem>
                        <SelectItem value="cmocka">CMocka</SelectItem>
                        <SelectItem value="greatest">Greatest</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Unit testing framework preference</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Summary */}
        {configuredItems > 0 && (
          <Card className="border border-[#00ff41]/30 bg-gradient-to-br from-[#00ff41]/5 to-[#40e0d0]/5 shadow-xl">
            <CardHeader className="pb-4 border-b border-[#00ff41]/20">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold font-mono">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                Additional Configuration Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Info className="h-3 w-3 text-blue-400" />
                    </div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Info</label>
                  </div>
                  <div className="space-y-1 text-sm text-white font-mono">
                    {additionalConfig.targetApplication && <p>App: {additionalConfig.targetApplication}</p>}
                    {additionalConfig.operatingSystem && <p>OS: {additionalConfig.operatingSystem}</p>}
                    {additionalConfig.compilerToolchain && <p>Compiler: {additionalConfig.compilerToolchain}</p>}
                    <p>Version: {additionalConfig.firmwareVersion}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Settings className="h-3 w-3 text-green-400" />
                    </div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">System Features</label>
                  </div>
                  <div className="space-y-1 text-sm text-white">
                    {additionalConfig.rtosSupport && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> RTOS Support</p>}
                    {additionalConfig.bootloaderIntegration && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> Bootloader</p>}
                    {additionalConfig.securityFeatures && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> Security</p>}
                    {additionalConfig.diagnosticsEnabled && <p className="flex items-center gap-2"><Check className="h-3 w-3 text-[#00ff41]" /> Diagnostics</p>}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#3e3e3e]/40 to-[#2d2d2d]/40 p-4 rounded-xl border border-[#3e3e3e]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-3 w-3 text-purple-400" />
                    </div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Constraints</label>
                  </div>
                  <div className="space-y-1 text-sm text-white font-mono">
                    <p>Stack: {additionalConfig.memoryConstraints.stackSize}B</p>
                    <p>Heap: {additionalConfig.memoryConstraints.heapSize}B</p>
                    <p>Response: {additionalConfig.performanceTargets.maxResponseTime}μs</p>
                    <p>Power: {additionalConfig.performanceTargets.powerConsumption}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderOverview = () => {
    // Calculate configuration completeness
    const configCompleteness = {
      basic: selectedMCU && selectedProtocol && selectedPeripheral ? 100 : 0,
      settings: Object.entries(driverSettings).filter(([key, value]) => {
        if (typeof value === 'boolean') return value === true;
        if (typeof value === 'string') return value !== '' && value !== 'drivers/';
        return false;
      }).length / Object.keys(driverSettings).length * 100,
      additional: Object.entries(additionalConfig).filter(([key, value]) => {
        if (typeof value === 'boolean') return value === true;
        if (typeof value === 'string') return value !== '';
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) return value.length > 0;
          return Object.values(value).some(v => v !== '' && v !== false);
        }
        return false;
      }).length / Object.keys(additionalConfig).length * 100
    };

    const overallCompleteness = Math.round((configCompleteness.basic + configCompleteness.settings + configCompleteness.additional) / 3);
    const canGenerate = selectedMCU && selectedProtocol && selectedPeripheral;

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#3e3e3e]">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff41] to-[#40e0d0] rounded-lg flex items-center justify-center shadow-lg">
            <FileText className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-mono">overview_and_generate</h1>
            <p className="text-gray-300 text-sm">Review your configuration and generate the driver</p>
          </div>
        </div>

        {/* Configuration Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                overallCompleteness >= 80 ? 'bg-green-500/20' : overallCompleteness >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'
              }`}>
                <Check className={`h-3 w-3 ${
                  overallCompleteness >= 80 ? 'text-green-400' : overallCompleteness >= 50 ? 'text-yellow-400' : 'text-red-400'
                }`} />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completion</span>
            </div>
            <p className="text-lg font-bold text-white">{overallCompleteness}%</p>
            <p className="text-gray-400 text-xs mt-1">Configuration complete</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                canGenerate ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                <Play className={`h-3 w-3 ${canGenerate ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Generation</span>
            </div>
            <p className="text-lg font-bold text-white">{canGenerate ? 'Ready' : 'Blocked'}</p>
            <p className="text-gray-400 text-xs mt-1">{canGenerate ? 'All requirements met' : 'Missing requirements'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <File className="h-3 w-3 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Files</span>
            </div>
            <p className="text-lg font-bold text-white">{4 + (driverSettings.testCode ? 1 : 0) + (driverSettings.documentation ? 1 : 0)}</p>
            <p className="text-gray-400 text-xs mt-1">To be generated</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#252526] to-[#1e1e1e] border border-[#3e3e3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="h-3 w-3 text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Features</span>
            </div>
            <p className="text-lg font-bold text-white">{Object.values(driverSettings).filter(Boolean).length}</p>
            <p className="text-gray-400 text-xs mt-1">Enabled features</p>
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Core Configuration */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-blue-400" />
                </div>
                Core Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-blue-400" />
                    <div>
                      <Label className="text-white font-medium">Target MCU</Label>
                      <p className="text-xs text-gray-400">{selectedMCU || 'Not selected'}</p>
                    </div>
                  </div>
                  {selectedMCU && <Check className="h-4 w-4 text-[#00ff41]" />}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <div>
                      <Label className="text-white font-medium">Communication Protocol</Label>
                      <p className="text-xs text-gray-400">{selectedProtocol || 'Not selected'}</p>
                    </div>
                  </div>
                  {selectedProtocol && <Check className="h-4 w-4 text-[#00ff41]" />}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-5 w-5 text-green-400" />
                    <div>
                      <Label className="text-white font-medium">Peripheral Device</Label>
                      <p className="text-xs text-gray-400">{selectedPeripheral || 'Not selected'}</p>
                    </div>
                  </div>
                  {selectedPeripheral && <Check className="h-4 w-4 text-[#00ff41]" />}
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-[#00ff41]/10 to-[#40e0d0]/5 border border-[#00ff41]/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${configCompleteness.basic === 100 ? 'bg-[#00ff41]' : 'bg-orange-400'} animate-pulse`} />
                    <span className={`text-xs font-mono font-semibold ${configCompleteness.basic === 100 ? 'text-[#00ff41]' : 'text-orange-400'}`}>
                      {configCompleteness.basic === 100 ? 'CORE_CONFIG_COMPLETE' : 'CORE_CONFIG_INCOMPLETE'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Essential configuration for driver generation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Files Preview */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-green-400" />
                </div>
                Generated Files
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {/* Core driver files */}
                <div className="flex items-center gap-3 p-2 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <File className="h-4 w-4 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm">{driverSettings.driverName || `${selectedPeripheral?.toLowerCase() || 'device'}_driver`}.c</p>
                    <p className="text-xs text-gray-400">Main driver implementation</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">C</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <File className="h-4 w-4 text-purple-400" />
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm">{driverSettings.driverName || `${selectedPeripheral?.toLowerCase() || 'device'}_driver`}.h</p>
                    <p className="text-xs text-gray-400">Header with API definitions</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs">H</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <File className="h-4 w-4 text-yellow-400" />
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm">driver_config.h</p>
                    <p className="text-xs text-gray-400">Configuration constants</p>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs">CONFIG</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm">Makefile</p>
                    <p className="text-xs text-gray-400">Build system configuration</p>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs">BUILD</Badge>
                </div>
                
                {/* Optional files */}
                {driverSettings.testCode && (
                  <div className="flex items-center gap-3 p-2 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <GitBranch className="h-4 w-4 text-orange-400" />
                    <div className="flex-1">
                      <p className="text-white font-mono text-sm">test_{driverSettings.driverName || 'driver'}.c</p>
                      <p className="text-xs text-gray-400">Unit tests and examples</p>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs">TEST</Badge>
                  </div>
                )}
                
                {driverSettings.documentation && (
                  <div className="flex items-center gap-3 p-2 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <BookOpen className="h-4 w-4 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white font-mono text-sm">README.md</p>
                      <p className="text-xs text-gray-400">Documentation and usage guide</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs">DOCS</Badge>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-gradient-to-r from-[#40e0d0]/10 to-[#00ff41]/5 border border-[#40e0d0]/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="h-3 w-3 text-[#40e0d0]" />
                    <span className="text-xs font-mono font-semibold text-[#40e0d0]">READY_FOR_DOWNLOAD</span>
                  </div>
                  <p className="text-xs text-gray-400">{4 + (driverSettings.testCode ? 1 : 0) + (driverSettings.documentation ? 1 : 0)} files will be packaged as ZIP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Summary */}
          <Card className="border border-[#3e3e3e] bg-gradient-to-br from-[#252526] to-[#1e1e1e] shadow-xl">
            <CardHeader className="pb-4 border-b border-[#3e3e3e]">
              <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-orange-400" />
                </div>
                Configuration Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Driver Settings Summary */}
                <div className="p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-semibold text-white">Driver Settings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-gray-400">Code Style:</div>
                    <div className="text-white font-mono">{driverSettings.codeStyle || 'Default'}</div>
                    <div className="text-gray-400">Optimization:</div>
                    <div className="text-white font-mono capitalize">{driverSettings.optimization}</div>
                    <div className="text-gray-400">Memory Priority:</div>
                    <div className="text-white font-mono capitalize">{driverSettings.memoryPriority}</div>
                    <div className="text-gray-400">License:</div>
                    <div className="text-white font-mono uppercase">{driverSettings.licenseHeader}</div>
                  </div>
                </div>
                
                {/* Active Features */}
                <div className="p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-semibold text-white">Active Features</span>
                  </div>
                  <div className="space-y-1">
                    {driverSettings.errorHandling && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">Error Handling</span></p>}
                    {driverSettings.documentation && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">Documentation</span></p>}
                    {driverSettings.testCode && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">Test Code</span></p>}
                    {driverSettings.halIntegration && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">HAL Integration</span></p>}
                    {driverSettings.debugSupport && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">Debug Support</span></p>}
                    {driverSettings.interruptSupport && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">Interrupt Support</span></p>}
                    {driverSettings.dmaSupport && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">DMA Support</span></p>}
                    {driverSettings.powerManagement && <p className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-[#00ff41]" /> <span className="text-white">Power Management</span></p>}
                  </div>
                </div>
                
                {/* Additional Config */}
                {(additionalConfig.targetApplication || additionalConfig.operatingSystem || additionalConfig.compilerToolchain) && (
                  <div className="p-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e3e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-semibold text-white">Additional Config</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      {additionalConfig.targetApplication && <p><span className="text-gray-400">Target:</span> <span className="text-white font-mono">{additionalConfig.targetApplication}</span></p>}
                      {additionalConfig.operatingSystem && <p><span className="text-gray-400">OS:</span> <span className="text-white font-mono">{additionalConfig.operatingSystem}</span></p>}
                      {additionalConfig.compilerToolchain && <p><span className="text-gray-400">Toolchain:</span> <span className="text-white font-mono">{additionalConfig.compilerToolchain}</span></p>}
                      {additionalConfig.buildSystem && <p><span className="text-gray-400">Build:</span> <span className="text-white font-mono">{additionalConfig.buildSystem}</span></p>}
                      {additionalConfig.testFramework && <p><span className="text-gray-400">Tests:</span> <span className="text-white font-mono">{additionalConfig.testFramework}</span></p>}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generation Actions */}
        <Card className={`border shadow-xl ${
          canGenerate 
            ? 'border-[#00ff41]/30 bg-gradient-to-br from-[#00ff41]/5 to-[#40e0d0]/5' 
            : 'border-red-500/30 bg-gradient-to-br from-red-500/5 to-orange-500/5'
        }`}>
          <CardHeader className={`pb-4 border-b ${
            canGenerate ? 'border-[#00ff41]/20' : 'border-red-500/20'
          }`}>
            <CardTitle className="text-white flex items-center gap-3 text-lg font-semibold font-mono">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                canGenerate 
                  ? 'bg-gradient-to-br from-[#00ff41] to-[#40e0d0]' 
                  : 'bg-gradient-to-br from-red-500 to-orange-500'
              }`}>
                <Play className="h-4 w-4 text-black" />
              </div>
              {canGenerate ? 'Ready to Generate Driver' : 'Complete Configuration Required'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {canGenerate ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Generation Options */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Cog className="h-4 w-4 text-[#00ff41]" />
                      Generation Options
                    </h4>
                    
                    <div className="space-y-2">
                      <Label className="text-white font-medium flex items-center gap-2">
                        <Download className="h-4 w-4 text-[#00ff41]" />
                        Output Format
                      </Label>
                      <Select defaultValue="zip">
                        <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] text-white focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/20">
                          <SelectValue placeholder="Select output format" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2d2d2d] border-[#3e3e3e]">
                          <SelectItem value="zip">ZIP Archive</SelectItem>
                          <SelectItem value="tar">TAR.GZ Archive</SelectItem>
                          <SelectItem value="folder">Individual Files</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white font-medium flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-[#00ff41]" />
                        Include Examples
                      </Label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox className="border-[#3e3e3e] data-[state=checked]:bg-[#00ff41] data-[state=checked]:border-[#00ff41]" defaultChecked />
                          <span className="text-white text-sm">Basic usage examples</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Generation Actions */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Play className="h-4 w-4 text-[#00ff41]" />
                      Generation Actions
                    </h4>
                    
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#00ff41] to-[#40e0d0] hover:from-[#00e038] hover:to-[#30d0c0] text-black font-mono font-bold text-lg neon-glow shadow-lg"
                    >
                      <Play className="mr-3 h-5 w-5" />
                      GENERATE_DRIVER_CODE
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="bg-[#3e3e3e] border border-[#5e5e5e] text-white hover:bg-[#4e4e4e] hover:text-[#00ff41] transition-all font-mono"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Config
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="bg-[#3e3e3e] border border-[#5e5e5e] text-white hover:bg-[#4e4e4e] hover:text-[#40e0d0] transition-all font-mono"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Preview Code
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Generation Info */}
                <div className="p-4 bg-gradient-to-r from-[#00ff41]/10 to-[#40e0d0]/5 border border-[#00ff41]/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-[#00ff41] flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-white font-semibold mb-1">Generation Information</h5>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>• Driver will be optimized for <span className="text-[#00ff41] font-mono">{selectedMCU}</span> microcontroller</p>
                        <p>• Communication via <span className="text-[#00ff41] font-mono">{selectedProtocol}</span> protocol</p>
                        <p>• Peripheral support for <span className="text-[#00ff41] font-mono">{selectedPeripheral}</span></p>
                        <p>• Code style: <span className="text-[#40e0d0] font-mono">{driverSettings.codeStyle || 'Default'}</span></p>
                        <p>• Estimated generation time: <span className="text-[#40e0d0] font-mono">&lt; 30 seconds</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2 text-lg">Configuration Incomplete</h3>
                  <p className="text-gray-400 max-w-md mx-auto">Please complete the required configuration steps to enable driver generation</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    Missing Requirements
                  </h4>
                  
                  {!selectedMCU && (
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <X className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-white font-medium">Target MCU Selection</p>
                        <p className="text-xs text-gray-400">Select a microcontroller unit in Step 1</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => setCurrentStep(0)}
                        className="ml-auto bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                      >
                        Go to Step 1
                      </Button>
                    </div>
                  )}
                  
                  {!selectedProtocol && (
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <X className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-white font-medium">Protocol Selection</p>
                        <p className="text-xs text-gray-400">Choose a communication protocol in Step 2</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => setCurrentStep(1)}
                        className="ml-auto bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                      >
                        Go to Step 2
                      </Button>
                    </div>
                  )}
                  
                  {!selectedPeripheral && (
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <X className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-white font-medium">Peripheral Device</p>
                        <p className="text-xs text-gray-400">Select a peripheral device in Step 3</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => setCurrentStep(2)}
                        className="ml-auto bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                      >
                        Go to Step 3
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderMCUSelection();
      case 1: return renderProtocolSelection();
      case 2: return renderPeripheralSelection();
      case 3: return renderSettings();
      case 4: return renderAdditionalConfig();
      case 5: return renderOverview();
      default: return renderMCUSelection();
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-mono scanlines">
      {/* Terminal Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] border-b border-[#3e3e3e] px-4 py-1.5 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#00ff41]" />
              <span className="font-bold text-[#00ff41] terminal-text text-sm">DRIVER_GENERATOR</span>
              <span className="text-gray-500 text-xs">[RUNNING]</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-xs font-mono">
              <span className="cursor-pointer hover:text-[#00ff41] transition-colors"></span>
              <span className="cursor-pointer hover:text-[#00ff41] transition-colors"></span>
              <span className="cursor-pointer hover:text-[#00ff41] transition-colors"></span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${selectedMCU && selectedProtocol && selectedPeripheral ? 'bg-[#00ff41] pulse-green' : 'bg-orange-500 pulse-orange'}`}></div>
              <span className={selectedMCU && selectedProtocol && selectedPeripheral ? 'text-[#00ff41]' : 'text-orange-400'}>
                {selectedMCU && selectedProtocol && selectedPeripheral ? 'READY' : 'INCOMPLETE'}
              </span>
            </div>
            <span className="text-gray-400">STEP_{currentStep + 1}/{workflowSteps.length}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-8">
        {/* Left File Explorer Panel - IDE Style */}
        <div className="w-64 bg-[#252526] border-r border-[#3e3e3e] flex flex-col">
          {/* Explorer Header */}
          <div className="bg-[#2d2d2d] border-b border-[#3e3e3e] px-3 py-1.5">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-[#00ff41]" />
              <span className="text-sm font-bold text-[#00ff41] font-mono">WIZARD/</span>
            </div>
          </div>

          {/* Workflow Tree - IDE Style */}
          <div className="flex-1">
            <div className="p-2">
              <div className="space-y-1">
                {workflowSteps.map((step, index) => {
                  const status = getStepStatus(step.id);
                  const { isActive, isAccessible, isCompleted, isVisited } = status;
                  
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-all font-mono ${
                        isActive 
                          ? 'bg-[#00ff41]/20 text-[#00ff41] border-l-2 border-[#00ff41]'
                          : isAccessible
                          ? 'hover:bg-[#3e3e3e] text-gray-300 cursor-pointer'
                          : 'text-gray-600 cursor-not-allowed'
                      }`}
                      onClick={() => isAccessible && updateProgressAndNavigate(step.id)}
                    >
                      <div className={`flex-shrink-0 ${
                        isCompleted ? 'text-[#40e0d0]' : isActive ? 'text-[#00ff41]' : isVisited ? 'text-yellow-400' : 'text-gray-500'
                      }`}>
                        {isCompleted ? <Check className="h-3 w-3" /> : step.icon}
                      </div>
                      <span className="flex-1 text-xs">{step.name.toLowerCase().replace(/ /g, '_')}</span>
                      <div className="flex items-center gap-1">
                        {isVisited && !isCompleted && <div className="w-1 h-1 rounded-full bg-yellow-400" />}
                        {isActive && <span className="text-[#00ff41] text-xs">❯</span>}
                      </div>
                    </div>
                  );
                })};
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Always Visible */}
          <div className="bg-[#2d2d2d] border-t border-[#3e3e3e] p-2 space-y-2">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentStep === 0}
                onClick={() => updateProgressAndNavigate(Math.max(0, currentStep - 1))}
                className="flex-1 bg-[#3e3e3e] border border-[#5e5e5e] text-gray-300 hover:bg-[#4e4e4e] hover:text-[#00ff41] transition-all font-mono text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-3 w-3 mr-1 rotate-180" />
                prev
              </Button>
              
              {currentStep === workflowSteps.length - 1 ? (
                <Button 
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-[#00ff41] to-[#40e0d0] hover:from-[#00e038] hover:to-[#30d0c0] text-black font-mono font-bold text-xs neon-glow disabled:opacity-50"
                  disabled={!selectedMCU || !selectedProtocol || !selectedPeripheral}
                >
                  <Play className="h-3 w-3 mr-1" />
                  GEN
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={!isStepAccessible(currentStep + 1)}
                  onClick={() => updateProgressAndNavigate(currentStep + 1)}
                  className="flex-1 bg-[#00ff41] hover:bg-[#00e038] text-black font-mono font-bold text-xs neon-glow disabled:opacity-50"
                >
                  next
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
            
            {/* Compact Status */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${selectedMCU && selectedProtocol && selectedPeripheral ? 'bg-[#00ff41] pulse-green' : 'bg-orange-500 pulse-orange'}`} />
                <span className={`text-xs ${selectedMCU && selectedProtocol && selectedPeripheral ? 'text-[#00ff41]' : 'text-orange-400'}`}>
                  {selectedMCU && selectedProtocol && selectedPeripheral ? 'ready' : 'incomplete'}
                </span>
              </div>
              <span className="text-gray-500 text-xs">{currentStep + 1}/{workflowSteps.length}</span>
            </div>
          </div>
        </div>

        {/* Main Center Panel - IDE Style */}
        <div className="flex-1 flex flex-col">
          {/* Terminal Toolbar */}
          <div className="bg-[#2d2d2d] border-b border-[#3e3e3e] px-4 py-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-[#00ff41]" />
                  <span className="text-sm font-mono text-white">{workflowSteps[currentStep]?.name.toLowerCase().replace(/ /g, '_')}.config</span>
                </div>
                <Badge className="bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 font-mono text-xs">
                  STEP_{currentStep + 1}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-[#3e3e3e] border border-[#5e5e5e] text-gray-300 hover:bg-[#4e4e4e] hover:text-[#00ff41] transition-all font-mono text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  export
                </Button>
                <Button size="sm" className="bg-[#3e3e3e] border border-[#5e5e5e] text-gray-300 hover:bg-[#4e4e4e] hover:text-[#00ff41] transition-all font-mono text-xs" onClick={handleReset} type="button">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  reset
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area - IDE Style */}
          <div className="flex-1 bg-[#1e1e1e] overflow-auto">
            <div className="p-4">
              {renderCurrentStep()}
            </div>
          </div>
        </div>

        {/* Right Properties Panel - IDE Style */}
        <div className="w-64 bg-[#252526] border-l border-[#3e3e3e]">
          <div className="bg-[#2d2d2d] border-b border-[#3e3e3e] px-3 py-1.5">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#00ff41]" />
              <span className="text-sm font-bold text-[#00ff41] font-mono">PROPS/</span>
            </div>
          </div>
          
          <div className="p-3 space-y-3">
            <div className="bg-[#3e3e3e]/30 border border-[#00ff41]/20 rounded p-2">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-3 w-3 text-[#00ff41]" />
                <span className="text-xs font-semibold text-[#00ff41] font-mono">current_selection</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">mcu:</span>
                  <span className="font-medium text-white text-xs truncate">{selectedMCU?.slice(0, 12) || 'null'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">protocol:</span>
                  <span className="font-medium text-white text-xs">{selectedProtocol || 'null'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">peripheral:</span>
                  <span className="font-medium text-white text-xs truncate">{selectedPeripheral?.slice(0, 10) || 'null'}</span>
                </div>
              </div>
            </div>

            {(selectedMCU || selectedProtocol || selectedPeripheral) && (
              <div className="bg-[#3e3e3e]/30 border border-[#40e0d0]/20 rounded p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-3 w-3 text-[#40e0d0]" />
                  <span className="text-xs font-semibold text-[#40e0d0] font-mono">files</span>
                </div>
                <div className="space-y-1 text-xs text-gray-300 font-mono">
                  <div className="flex items-center gap-1">
                    <File className="h-2 w-2 text-gray-500" />
                    <span className="truncate">{selectedPeripheral?.toLowerCase() || 'device'}_driver.c</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <File className="h-2 w-2 text-gray-500" />
                    <span className="truncate">{selectedPeripheral?.toLowerCase() || 'device'}_driver.h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <File className="h-2 w-2 text-gray-500" />
                    <span>config.h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-2 w-2 text-gray-500" />
                    <span>README.md</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#3e3e3e]/30 border border-orange-500/20 rounded p-2">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-3 w-3 text-orange-400" />
                <span className="text-xs font-semibold text-orange-400 font-mono">todo</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-0.5 font-mono">
                <li className="flex items-center gap-1">
                  <span className={selectedMCU ? 'text-green-400' : 'text-orange-400'}>•</span>
                  <span className={selectedMCU ? 'line-through text-gray-500' : ''}>select_mcu</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className={selectedProtocol ? 'text-green-400' : 'text-orange-400'}>•</span>
                  <span className={selectedProtocol ? 'line-through text-gray-500' : ''}>choose_protocol</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className={selectedPeripheral ? 'text-green-400' : 'text-orange-400'}>•</span>
                  <span className={selectedPeripheral ? 'line-through text-gray-500' : ''}>pick_peripheral</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-orange-400">•</span>
                  <span>configure_settings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
