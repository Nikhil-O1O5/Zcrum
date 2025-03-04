"use client";

import { useState } from "react";
import SprintManager from "./sprint-manager";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import statuses from "@/data/status";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );

  const onDragEnd = () => {
    // Handle drag-and-drop event
  };

  return (
    <div>
      <SprintManager sprint={currentSprint} setSprint={setCurrentSprint} sprints={sprints} projectId={projectId} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-slate-900 p-4 rounded-lg">
          {statuses.map((column) => (
            <Droppable key={column.key} droppableId={column.key}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  <h3 className="font-semibold mb-2 text-center">{column.name}</h3>
                  {provided.placeholder} {/* ✅ Ensures proper drag-and-drop behavior */}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SprintBoard;
