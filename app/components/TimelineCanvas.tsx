'use client';

import React, { useRef, useEffect } from 'react';
import { useTimeline } from '../context/TimelineContext';

export default function TimelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data, activeFilters, setSelectedPhase, setSelectedEvent } = useTimeline();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw timeline
    const drawTimeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw phases
      data.phases.forEach((phase) => {
        if (!activeFilters.some((f) => f.id === phase.id && f.type === 'phase')) return;

        const startX = (new Date(phase.startDate).getTime() - new Date(data.phases[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
        const endX = (new Date(phase.endDate).getTime() - new Date(data.phases[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
        const width = (endX - startX) * (canvas.width / 365);
        const height = 40;
        const y = 50;

        ctx.fillStyle = phase.color;
        ctx.fillRect(startX * (canvas.width / 365), y, width, height);

        // Draw phase name
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(phase.name, startX * (canvas.width / 365) + 5, y + 25);
      });

      // Draw events
      data.events.forEach((event) => {
        if (!activeFilters.some((f) => f.id === event.phaseId && f.type === 'phase')) return;

        const x = (new Date(event.date).getTime() - new Date(data.phases[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
        const y = 120;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x * (canvas.width / 365), y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw event title
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(event.title, x * (canvas.width / 365) + 10, y + 5);
      });
    };

    drawTimeline();

    // Add click handlers
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check for phase clicks
      data.phases.forEach((phase) => {
        const startX = (new Date(phase.startDate).getTime() - new Date(data.phases[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
        const endX = (new Date(phase.endDate).getTime() - new Date(data.phases[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
        const phaseX = startX * (canvas.width / 365);
        const phaseWidth = (endX - startX) * (canvas.width / 365);
        const phaseY = 50;
        const phaseHeight = 40;

        if (
          x >= phaseX &&
          x <= phaseX + phaseWidth &&
          y >= phaseY &&
          y <= phaseY + phaseHeight
        ) {
          setSelectedPhase(phase);
          setSelectedEvent(null);
        }
      });

      // Check for event clicks
      data.events.forEach((event) => {
        const eventX = (new Date(event.date).getTime() - new Date(data.phases[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
        const eventY = 120;
        const eventRadius = 5;

        if (
          Math.sqrt(Math.pow(x - eventX * (canvas.width / 365), 2) + Math.pow(y - eventY, 2)) <= eventRadius
        ) {
          setSelectedEvent(event);
          setSelectedPhase(null);
        }
      });
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
    };
  }, [data, activeFilters, setSelectedPhase, setSelectedEvent]);

  return (
    <div className="flex-1 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
} 