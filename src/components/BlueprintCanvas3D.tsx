import React, { useRef, useEffect, useState } from 'react';
import { Layers, RotateCcw, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  stress?: number; // 0 to 1 stress metric
}

interface Edge {
  a: number;
  b: number;
  isCable?: boolean;
  isFoundation?: boolean;
}

export default function BlueprintCanvas3D({ isRtl = false }: { isRtl?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [activeModel, setActiveModel] = useState<'tower' | 'bridge' | 'warehouse'>('tower');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [stressHeatmap, setStressHeatmap] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);
  const [stats, setStats] = useState({ yaw: 0, pitch: 0, loadingSim: 42 });
  
  // Angle state
  const anglesRef = useRef({ yaw: 0.5, pitch: 0.3 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  // Generate 3D structural datasets
  const getStructuralModel = (): { nodes: Point3D[]; edges: Edge[] } => {
    const nodes: Point3D[] = [];
    const edges: Edge[] = [];
    
    if (activeModel === 'tower') {
      // Modern Tapered Skyscraper with central core and bracing
      const floors = 8;
      const nodesPerFloor = 4;
      const heightStep = 30;
      
      // Foundation nodes
      nodes.push({ x: -40, y: 110, z: -40, stress: 0.1 });
      nodes.push({ x: 40, y: 110, z: -40, stress: 0.1 });
      nodes.push({ x: 40, y: 110, z: 40, stress: 0.1 });
      nodes.push({ x: -40, y: 110, z: 40, stress: 0.1 });
      
      // Connect foundation ring
      edges.push({ a: 0, b: 1, isFoundation: true });
      edges.push({ a: 1, b: 2, isFoundation: true });
      edges.push({ a: 2, b: 3, isFoundation: true });
      edges.push({ a: 3, b: 0, isFoundation: true });
      
      // Generate floors
      for (let f = 0; f < floors; f++) {
        // Taper factor: narrower towards top
        const taper = 1 - (f / floors) * 0.55;
        const radius = 35 * taper;
        const fy = 90 - f * heightStep;
        
        const startIndex = nodes.length;
        
        // Floor joints
        nodes.push({ x: -radius, y: fy, z: -radius, stress: 0.15 + (f / floors) * 0.45 });
        nodes.push({ x: radius, y: fy, z: -radius, stress: 0.15 + (f / floors) * 0.45 });
        nodes.push({ x: radius, y: fy, z: radius, stress: 0.15 + (f / floors) * 0.45 });
        nodes.push({ x: -radius, y: fy, z: radius, stress: 0.15 + (f / floors) * 0.45 });
        
        // Floor inner core point
        nodes.push({ x: 0, y: fy, z: 0, stress: 0.1 });
        
        // Connect floor ring outer edges
        edges.push({ a: startIndex, b: startIndex + 1 });
        edges.push({ a: startIndex + 1, b: startIndex + 2 });
        edges.push({ a: startIndex + 2, b: startIndex + 3 });
        edges.push({ a: startIndex + 3, b: startIndex });
        
        // Connect core to outer joints
        edges.push({ a: startIndex + 4, b: startIndex });
        edges.push({ a: startIndex + 4, b: startIndex + 1 });
        edges.push({ a: startIndex + 4, b: startIndex + 2 });
        edges.push({ a: startIndex + 4, b: startIndex + 3 });

        if (f === 0) {
          // Connect first floor to foundation
          edges.push({ a: startIndex, b: 0 });
          edges.push({ a: startIndex + 1, b: 1 });
          edges.push({ a: startIndex + 2, b: 2 });
          edges.push({ a: startIndex + 3, b: 3 });
        } else {
          // Connect to floor below
          const prevStartIndex = startIndex - 5;
          edges.push({ a: startIndex, b: prevStartIndex });
          edges.push({ a: startIndex + 1, b: prevStartIndex + 1 });
          edges.push({ a: startIndex + 2, b: prevStartIndex + 2 });
          edges.push({ a: startIndex + 3, b: prevStartIndex + 3 });
          edges.push({ a: startIndex + 4, b: prevStartIndex + 4 }); // core backbone
          
          // Add structural diagonal cross bracings (X frames)
          edges.push({ a: startIndex, b: prevStartIndex + 1 });
          edges.push({ a: startIndex + 1, b: prevStartIndex });
          edges.push({ a: startIndex + 2, b: prevStartIndex + 3 });
          edges.push({ a: startIndex + 3, b: prevStartIndex + 2 });
        }
      }
      
      // Add spire tip on top
      const topSpireIndex = nodes.length;
      nodes.push({ x: 0, y: -190, z: 0, stress: 0.8 }); // Spire tip
      const lastFloorStart = topSpireIndex - 5;
      edges.push({ a: topSpireIndex, b: lastFloorStart });
      edges.push({ a: topSpireIndex, b: lastFloorStart + 1 });
      edges.push({ a: topSpireIndex, b: lastFloorStart + 2 });
      edges.push({ a: topSpireIndex, b: lastFloorStart + 3 });
      
    } else if (activeModel === 'bridge') {
      // Cable-Stayed Cantilever Bridge
      const sections = 12;
      const width = 25;
      const spanStep = 18;
      const startX = -((sections / 2) * spanStep);
      
      // Roadbed line (Double side decks)
      for (let s = 0; s <= sections; s++) {
        const xCoord = startX + s * spanStep;
        const nodeIdx = nodes.length;
        
        // Left deck joint
        nodes.push({ x: xCoord, y: 35, z: -width, stress: 0.2 + Math.abs(sections/2 - s) * 0.05 });
        // Right deck joint
        nodes.push({ x: xCoord, y: 35, z: width, stress: 0.2 + Math.abs(sections/2 - s) * 0.05 });
        
        // Connect deck width
        edges.push({ a: nodeIdx, b: nodeIdx + 1 });
        
        if (s > 0) {
          const prevIdx = nodeIdx - 2;
          // Connect longitudinal decks
          edges.push({ a: nodeIdx, b: prevIdx });
          edges.push({ a: nodeIdx + 1, b: prevIdx + 1 });
          // Cross-bracing under deck
          edges.push({ a: nodeIdx, b: prevIdx + 1 });
          edges.push({ a: nodeIdx + 1, b: prevIdx });
        }
      }
      
      // Central High Pylon / Tower
      const pylonBottomIdx = nodes.length;
      nodes.push({ x: 0, y: 35, z: 0, stress: 0.3 }); // Deck level anchor
      nodes.push({ x: 0, y: 100, z: -5, stress: 0.2, }); // Foundation deep
      nodes.push({ x: 0, y: 100, z: 5, stress: 0.2 });
      
      const pylonMiddleIdx = nodes.length;
      nodes.push({ x: 0, y: -15, z: 0, stress: 0.4 });
      nodes.push({ x: 0, y: -75, z: 0, stress: 0.7 }); // High cable tip
      
      // Pylon framing
      edges.push({ a: pylonBottomIdx, b: pylonMiddleIdx });
      edges.push({ a: pylonMiddleIdx, b: pylonMiddleIdx + 1 });
      edges.push({ a: pylonBottomIdx - 1, b: pylonBottomIdx }); // connect pillars
      edges.push({ a: pylonBottomIdx - 2, b: pylonBottomIdx });
      
      // Draw Cables (high pylon to deck segments)
      const roadNodesCount = (sections + 1) * 2;
      for (let s = 0; s <= sections; s++) {
        if (s === sections / 2) continue; // skip core
        const deckNodeLIdx = s * 2;
        const deckNodeRIdx = s * 2 + 1;
        
        // High Cables
        const distFromCenter = Math.abs(sections / 2 - s);
        if (distFromCenter <= 4) {
          edges.push({ a: pylonMiddleIdx + 1, b: deckNodeLIdx, isCable: true });
          edges.push({ a: pylonMiddleIdx + 1, b: deckNodeRIdx, isCable: true });
        } else {
          edges.push({ a: pylonMiddleIdx, b: deckNodeLIdx, isCable: true });
          edges.push({ a: pylonMiddleIdx, b: deckNodeRIdx, isCable: true });
        }
      }
      
    } else {
      // Industrial Geodesic Truss/Warehouse Roof structure
      const segments = 6;
      const length = 110;
      const width = 60;
      const lStep = length / segments;
      
      const startX = -length / 2;
      
      for (let i = 0; i <= segments; i++) {
        const xCoord = startX + i * lStep;
        
        // Ground foundation anchors
        const nodeBase = nodes.length;
        nodes.push({ x: xCoord, y: 95, z: -width/2, stress: 0.1 });
        nodes.push({ x: xCoord, y: 95, z: width/2, stress: 0.1 });
        
        // Arched roof joints
        nodes.push({ x: xCoord, y: 15, z: -width/2 + 8, stress: 0.35 });
        nodes.push({ x: xCoord, y: -25, z: -width/4, stress: 0.5 });
        nodes.push({ x: xCoord, y: -35, z: 0, stress: 0.65 });
        nodes.push({ x: xCoord, y: -25, z: width/4, stress: 0.5 });
        nodes.push({ x: xCoord, y: 15, z: width/2 - 8, stress: 0.35 });
        
        // Connect vertical arched rib
        edges.push({ a: nodeBase, b: nodeBase + 2 });
        edges.push({ a: nodeBase + 2, b: nodeBase + 3 });
        edges.push({ a: nodeBase + 3, b: nodeBase + 4 });
        edges.push({ a: nodeBase + 4, b: nodeBase + 5 });
        edges.push({ a: nodeBase + 5, b: nodeBase + 6 });
        edges.push({ a: nodeBase + 6, b: nodeBase + 1 });
        
        // Cross framing ties across the arch span
        edges.push({ a: nodeBase + 2, b: nodeBase + 5 });
        edges.push({ a: nodeBase + 3, b: nodeBase + 5 });
        
        // Connect to previous arch ribs along the length
        if (i > 0) {
          const prevBase = nodeBase - 7;
          for (let r = 0; r < 7; r++) {
            edges.push({ a: nodeBase + r, b: prevBase + r });
            // Diagonal purlin brace for industrial stability
            if (r < 6) {
              edges.push({ a: nodeBase + r, b: prevBase + r + 1 });
            }
          }
        }
      }
    }
    
    return { nodes, edges };
  };

  // Canvas Drawing & Projection Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let modelData = getStructuralModel();

    // Responsive adaptation
    const adjustSize = () => {
      const parent = containerRef.current;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = Math.max(parent.clientHeight || 450, 450) * window.devicePixelRatio;
        canvas.style.width = '100%';
        canvas.style.height = `${parent.clientHeight || 450}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Determine camera/render scale multiplier based on bounding volume
        const minDim = Math.min(parent.clientWidth, 450);
        setScale(minDim / 380);
      }
    };
    
    adjustSize();
    
    const resizeObserver = new ResizeObserver(() => {
      adjustSize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    const renderLoop = () => {
      // Update rotation angles if auto-rotating
      if (autoRotate && !isDraggingRef.current) {
        anglesRef.current.yaw += 0.004;
        // Float the pitch slightly as a wave
        anglesRef.current.pitch = 0.35 + Math.sin(Date.now() * 0.0008) * 0.08;
      }
      
      const yaw = anglesRef.current.yaw;
      const pitch = anglesRef.current.pitch;
      
      // Trigonometric cache
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Dynamic simulated load fluctuation indicator
      const dynamicSimulation = Math.round(38 + Math.sin(Date.now() * 0.002) * 5);
      setStats({
        yaw: Number((yaw * 57.2958 % 360).toFixed(1)),
        pitch: Number((pitch * 57.2958 % 360).toFixed(1)),
        loadingSim: dynamicSimulation
      });
      
      // Clear with dark blueprints space background
      const isLight = document.documentElement.classList.contains('light');
      ctx.fillStyle = isLight ? '#f8fafc' : '#0b0f19'; // Rich light-slate or obsidian tech background
      ctx.fillRect(0, 0, width, height);

      // Draw subtle technical blueprint matrix background grid
      ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.08)' : 'rgba(217, 119, 6, 0.04)'; // Extremely faint golden amber lines
      ctx.lineWidth = 1;
      const gridSpacing = 40;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Projection camera matrix conversion (3D key points mapped to 2D coordinates)
      // Perspective factor
      const d = 400; // Focal distance
      
      const projectedNodes = modelData.nodes.map(node => {
        // Rotate around Y-axis (Yaw)
        let x1 = node.x * cosYaw - node.z * sinYaw;
        let z1 = node.x * sinYaw + node.z * cosYaw;
        
        // Rotate around X-axis (Pitch)
        let y2 = node.y * cosPitch - z1 * sinPitch;
        let z2 = node.y * sinPitch + z1 * cosPitch;
        
        // Perspective mapping
        const scaleVal = d / (d + z2);
        const viewScale = scaleVal * scale * 1.5;
        
        return {
          x: centerX + x1 * viewScale,
          y: centerY + y2 * viewScale,
          z: z2,
          rawX: node.x,
          rawY: node.y,
          rawZ: node.z,
          stress: node.stress || 0.1,
          visible: z2 < d // clipping plane
        };
      });
      
      // Render ground coordinate plane in 3D (Subtle perspective grid below)
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.13)';
      ctx.lineWidth = 1;
      const groundSize = 130;
      const groundPoints = [
        { x: -groundSize, y: 110, z: -groundSize },
        { x: groundSize, y: 110, z: -groundSize },
        { x: groundSize, y: 110, z: groundSize },
        { x: -groundSize, y: 110, z: groundSize }
      ];
      
      const projGround = groundPoints.map(p => {
        let x1 = p.x * cosYaw - p.z * sinYaw;
        let z1 = p.x * sinYaw + p.z * cosYaw;
        let y2 = p.y * cosPitch - z1 * sinPitch;
        let z2 = p.y * sinPitch + z1 * cosPitch;
        const scaleVal = d / (d + z2);
        return {
          x: centerX + x1 * scaleVal * scale * 1.5,
          y: centerY + y2 * scaleVal * scale * 1.5
        };
      });
      
      ctx.beginPath();
      ctx.moveTo(projGround[0].x, projGround[0].y);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(projGround[i].x, projGround[i].y);
      }
      ctx.closePath();
      ctx.stroke();
      
      // Draw ground axis coordinates markers
      if (projGround[0] && projGround[1]) {
        ctx.fillStyle = 'rgba(217, 119, 6, 0.4)';
        ctx.font = '9px monospace';
        ctx.fillText('+X NORTH', projGround[1].x, projGround[1].y);
        ctx.fillText('-Z EAST', projGround[0].x, projGround[0].y);
      }

      // 1. Draw structural edges (Steel tubes / Cables)
      modelData.edges.forEach(edge => {
        const nodeA = projectedNodes[edge.a];
        const nodeB = projectedNodes[edge.b];
        
        if (!nodeA || !nodeB || !nodeA.visible || !nodeB.visible) return;
        
        // Determine line styling based on structural load classification
        if (edge.isCable) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // RED warning/stress high cable anchors
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]); // dotted cables
        } else if (edge.isFoundation) {
          ctx.strokeStyle = '#D97706'; // Solid orange foundation frame
          ctx.lineWidth = 2.5;
          ctx.setLineDash([]);
        } else {
          // Heatmap calculations by joint nodes stress averages
          if (stressHeatmap) {
            const avgStress = (nodeA.stress + nodeB.stress) / 2;
            const blendIntensity = Math.min(avgStress * 1.3, 1);
            // Blend from cold teal/amber to hot neon crimson
            const r = Math.round(217 + blendIntensity * 38);
            const g = Math.round(119 - blendIntensity * 60);
            const b = Math.round(6 + blendIntensity * 10);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
            ctx.lineWidth = 1.3 + (avgStress * 1.5);
          } else {
            ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
            ctx.lineWidth = 1.2;
          }
          ctx.setLineDash([]);
        }
        
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
        ctx.setLineDash([]); // Reset
      });
      
      // 2. Draw vertices / structural node hubs (Steel brackets)
      projectedNodes.forEach((node, i) => {
        if (!node.visible) return;
        
        const rSize = stressHeatmap ? (1.5 + node.stress * 4) : 2.5;
        
        // Color depending on stress state
        let fillCol = '#D97706'; // gold/amber
        let glowCol = 'rgba(217, 119, 6, 0.25)';
        
        if (stressHeatmap && node.stress > 0.5) {
          fillCol = '#EF4444'; // Red stress point warning
          glowCol = 'rgba(239, 68, 68, 0.4)';
        }
        
        // Draw glow aura ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, rSize * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = glowCol;
        ctx.fill();
        
        // Draw solid structural sphere
        ctx.beginPath();
        ctx.arc(node.x, node.y, rSize, 0, Math.PI * 2);
        ctx.fillStyle = fillCol;
        ctx.fill();
        
        // Highlight elite coordinates occasionally for a cyber-blueprint feeling
        if (i % 6 === 0) {
          ctx.fillStyle = 'rgba(217, 119, 6, 0.5)';
          ctx.font = '7.5px monospace';
          ctx.fillText(`J-${i}[${Math.round(node.rawX)},${Math.round(node.rawY)},${Math.round(node.rawZ)}]`, node.x + 6, node.y - 2);
        }
      });
      
      // Real-time floating laser audit lines (resembles topographic layout scanning)
      const scanY = centerY - 140 + (Math.sin(Date.now() * 0.001) * 75);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(centerX - 170 * scale, scanY);
      ctx.lineTo(centerX + 170 * scale, scanY);
      ctx.stroke();
      
      // Scan indicator tag
      ctx.fillStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.font = '8px monospace';
      ctx.fillText("LASER SEISMIC SWEEP", centerX - 165 * scale, scanY - 3);

      animationId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();
    
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [activeModel, autoRotate, stressHeatmap, scale]);

  // Handle Drag Interactions for Rotating the structural wireframe
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = e.clientX - previousMouseRef.current.x;
    const deltaY = e.clientY - previousMouseRef.current.y;
    
    // Scale delta rotation angles
    anglesRef.current.yaw += deltaX * 0.007;
    // Limit pitch to prevent looking exactly from directly above or upside down
    anglesRef.current.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, anglesRef.current.pitch + deltaY * 0.007));
    
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Helper translations for HUD elements based on direction
  const text = isRtl ? {
    model: "النموذج الإنشائي",
    autoRotate: "دوران تلقائي",
    stressMap: "مخطط الإجهاد الحركي",
    tower: "برج المعراج 68 طابقاً",
    bridge: "جسر الكراسي المعلق",
    warehouse: "جمالونات مستودع لوجستي",
    hudTitle: "بيانات الهيكل المباشرة",
    seismic: "الاستقرار الزلزالي",
    safe: "آمن - معايير OSHA",
    windLoad: "حمل الرياح المشخصن",
    interactiveNode: "اسحب الفأرة لتدوير المخطط ثلاثي الأبعاد"
  } : {
    model: "Structural Model",
    autoRotate: "Auto-Rotate",
    stressMap: "Stress Heatmap",
    tower: "Al-Miraj 68-Story tower",
    bridge: "Double-Deck Cable-Stayed Bridge",
    warehouse: "Geodesic Industrial Truss",
    hudTitle: "Structural Engine HUD",
    seismic: "Seismic Stability",
    safe: "Safe - OSHA Target",
    windLoad: "Dynamic Wind Load",
    interactiveNode: "Drag canvas to manually orbit 3D wireframe"
  };

  return (
    <div className="relative w-full rounded-2xl border border-gray-800/80 bg-[#060811] overflow-hidden shadow-2xl shadow-black/80" ref={containerRef}>
      {/* 3D Model Selector Pills */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-2 items-center justify-between pointer-events-auto">
        <div className="flex gap-1.5 bg-gray-900/90 border border-gray-800 p-1 rounded-lg backdrop-blur-md">
          <button
            id="model-tower"
            onClick={() => setActiveModel('tower')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              activeModel === 'tower' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {text.tower}
          </button>
          
          <button
            id="model-bridge"
            onClick={() => setActiveModel('bridge')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              activeModel === 'bridge' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {text.bridge}
          </button>
          
          <button
            id="model-warehouse"
            onClick={() => setActiveModel('warehouse')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              activeModel === 'warehouse' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {text.warehouse}
          </button>
        </div>

        {/* Engine parameter toggles */}
        <div className="flex gap-2">
          <button
            id="toggle-rotate"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-lg border backdrop-blur-md transition-all ${
              autoRotate 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                : 'bg-gray-900/90 border-gray-800 text-gray-500 hover:text-white'
            }`}
            title="Auto Rotation"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
          
          <button
            id="toggle-stress"
            onClick={() => setStressHeatmap(!stressHeatmap)}
            className={`px-2.5 py-1.5 text-[10px] font-mono rounded-lg border backdrop-blur-md flex items-center gap-1.5 transition-all ${
              stressHeatmap 
                ? 'bg-red-500/10 border-red-500/30 text-red-500' 
                : 'bg-gray-900/90 border-gray-800 text-gray-500 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{text.stressMap}</span>
          </button>
        </div>
      </div>

      {/* Primary HTML Render Canvas */}
      <canvas
        id="structural-render-canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="w-full block cursor-grab active:cursor-grabbing"
      />

      {/* Cyber Engineering HUD overlays bottom section */}
      <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} pointer-events-none bg-gray-950/80 border border-gray-800/50 p-3 rounded-lg backdrop-blur-md max-w-[280px]`}>
        <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-gray-400 font-bold tracking-wider">
          <Activity className="w-3 h-3 text-amber-500 animate-pulse" />
          {text.hudTitle}
        </div>
        
        <div className="space-y-1.5 text-[9.5px] font-mono text-gray-500">
          <div className="flex justify-between gap-8">
            <span>ORBIT YAW</span>
            <span className="text-amber-500 font-bold">{stats.yaw}°</span>
          </div>
          <div className="flex justify-between gap-8">
            <span>ORBIT PITCH</span>
            <span className="text-amber-500 font-bold">{stats.pitch}°</span>
          </div>
          
          <div className="h-[1px] bg-gray-800/40 my-1"></div>
          
          <div className="flex justify-between gap-8 items-center">
            <span>{text.seismic}</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> 99.8%
            </span>
          </div>
          
          <div className="flex justify-between gap-8 items-center">
            <span>{text.windLoad}</span>
            <span className="text-amber-500 font-bold">{stats.loadingSim} kN/m²</span>
          </div>
          
          <p className="text-[8px] text-gray-600 leading-none pt-1">
            * {text.interactiveNode}
          </p>
        </div>
      </div>

      {/* Floating safety indicator at bottom-right */}
      <div className={`absolute bottom-4 ${isRtl ? 'left-4' : 'right-4'} pointer-events-none bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded-md backdrop-blur-md font-mono hidden md:flex items-center gap-1.5`}>
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
        {text.safe}
      </div>
    </div>
  );
}
