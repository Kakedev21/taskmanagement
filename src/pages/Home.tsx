"use client"

import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Bell, MoreVertical, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StrictModeDroppable } from "../components/StrictModeDroppable"
import useStore from "../store/blocksStore"
import { useEffect } from "react"

export default function TaskBoard() {
  const { board, moveTask, liveblocks: { enterRoom, leaveRoom } } = useStore()
  const setCursor = useStore((state) => state.setCursor);
  const others = useStore((state) => state.liveblocks.others);
  const userCount = others.length;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    moveTask(source, destination, draggableId)
  }

  useEffect(() => {
    enterRoom("my-room");
    return () => {
      leaveRoom("my-room");
    };
  }, [enterRoom, leaveRoom]);

  console.log("ASd", userCount)


  const othersCursors = others.map((user) => user.presence.cursor);



  return (
    <>
      <div className="flex min-h-screen flex-col" onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {othersCursors.map((cursor, i) => {
            if (!cursor) return null;
            return (
              <svg
                key={i}
                style={{
                  position: "absolute",
                  left: cursor.x,
                  top: cursor.y,
                  width: 24,
                  height: 36,
                  transform: "translate(-50%, -50%)"
                }}
                width="24"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                  fill="#000"
                  stroke="white"
                />
              </svg>
            );
          })}
        </div>
        <main className="flex-1 overflow-auto bg-gray-100/40 p-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {board.columnOrder.map((columnId) => {
                const column = board.columns[columnId]
                return (
                  <div
                    key={column.id}
                    className="flex flex-col rounded-lg bg-gray-100 p-2"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-sm font-semibold">{column.title}</h2>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <StrictModeDroppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex flex-col gap-2"
                        >
                          {column.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="rounded-md bg-white p-3 shadow-sm"
                                >
                                  <p className="text-sm text-gray-800">{task.content}</p>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </StrictModeDroppable>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 justify-start text-gray-500"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add a card
                    </Button>
                  </div>
                )
              })}
            </div>
          </DragDropContext>
        </main>
      </div>
    </>
  )
}