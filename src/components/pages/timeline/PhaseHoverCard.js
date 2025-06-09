import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhaseHoverCard = ({ phase, structures, contradictions, struggles, onClose }) => {
  if (!phase) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="phase-hover-card fixed bg-background border rounded-lg shadow-lg p-4 z-50"
        style={{
          top: phase.position?.top,
          left: phase.position?.left
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">
            {phase.start_year}–{phase.end_year}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Dialectical Flow Box */}
          <div className="dialectical-flow">
            <div className="force-box">{phase.primary_force}</div>
            <div className="flow-arrow">
              <span>→</span>
              <span>{phase.motion_type}</span>
              <span>→</span>
            </div>
            <div className="force-box">{phase.opposing_force}</div>
          </div>

          {/* Phase Summary */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Phase Summary</h4>
            <p className="text-sm text-muted-foreground">{phase.summary}</p>
          </div>

          {/* Linked Elements */}
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-semibold">Events</h4>
              <ul className="text-sm space-y-1">
                {phase.events?.map(event => (
                  <li key={event.id} className="text-muted-foreground">
                    • {event.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Structures</h4>
              <ul className="text-sm space-y-1">
                {phase.linked_structures?.map(id => (
                  <li key={id} className="text-muted-foreground">
                    • {structures.find(s => s.id === id)?.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Struggles</h4>
              <ul className="text-sm space-y-1">
                {phase.linked_struggles?.map(id => (
                  <li key={id} className="text-muted-foreground">
                    • {struggles.find(s => s.id === id)?.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhaseHoverCard; 