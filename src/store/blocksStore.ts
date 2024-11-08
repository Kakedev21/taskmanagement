import { create } from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";

type Cursor = { x: number; y: number };

type State = {
  cursor: Cursor;
  setCursor: (cursor: Cursor) => void;
};

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Board {
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

interface BlocksStore {
  board: Board;
  setBoard: (board: Board) => void;
  moveTask: (
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number },
    draggableId: string
  ) => void;
  cursor: Cursor;
  setCursor: (cursor: Cursor) => void;
}

const client = createClient({
  publicApiKey:
    "pk_dev_pNIcrMcRy_IWGeLWzELLirATknXJhiourz8C3m5iA6f-aOXWfMfpfNYjcWS04dFp",
});

const initialData: Board = {
  columns: {
    "to-do": {
      id: "to-do",
      title: "To-Do",
      tasks: [
        { id: "task-1", content: "Login Page" },
        { id: "task-2", content: "Registration Page" },
        { id: "task-3", content: "User Interface" },
        { id: "task-4", content: "Admin" },
      ],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        { id: "task-5", content: "Login Page" },
        { id: "task-6", content: "Registration Page" },
        { id: "task-7", content: "User Interface" },
        { id: "task-8", content: "Admin" },
      ],
    },
    "on-review": {
      id: "on-review",
      title: "On Review",
      tasks: [
        { id: "task-9", content: "Login Page" },
        { id: "task-10", content: "Registration Page" },
        { id: "task-11", content: "User Interface" },
        { id: "task-12", content: "Admin" },
      ],
    },
    done: {
      id: "done",
      title: "Done",
      tasks: [
        { id: "task-13", content: "Login Page" },
        { id: "task-14", content: "Registration Page" },
        { id: "task-15", content: "User Interface" },
        { id: "task-16", content: "Admin" },
      ],
    },
  },
  columnOrder: ["to-do", "in-progress", "on-review", "done"],
};

const useStore = create<BlocksStore & WithLiveblocks<BlocksStore>>()(
  liveblocks(
    (set) => ({
      board: initialData,
      setBoard: (board) => set({ board }),
      cursor: { x: 0, y: 0 },
      setCursor: (cursor) => set({ cursor }),
      moveTask: (source, destination, draggableId) => {
        set((state) => {
          if (!destination) {
            return state;
          }

          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return state;
          }

          const start = state.board.columns[source.droppableId];
          const finish = state.board.columns[destination.droppableId];

          if (start === finish) {
            const newTasks = Array.from(start.tasks);
            const [removed] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, removed);

            const newColumn = {
              ...start,
              tasks: newTasks,
            };

            return {
              board: {
                ...state.board,
                columns: {
                  ...state.board.columns,
                  [newColumn.id]: newColumn,
                },
              },
            };
          }

          // Moving from one list to another
          const startTasks = Array.from(start.tasks);
          const [removed] = startTasks.splice(source.index, 1);
          const newStart = {
            ...start,
            tasks: startTasks,
          };

          const finishTasks = Array.from(finish.tasks);
          finishTasks.splice(destination.index, 0, removed);
          const newFinish = {
            ...finish,
            tasks: finishTasks,
          };

          return {
            board: {
              ...state.board,
              columns: {
                ...state.board.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
              },
            },
          };
        });
      },
    }),
    {
      client,
      presenceMapping: { cursor: true },
      storageMapping: {
        board: true,
      },
    }
  )
);

export default useStore;
