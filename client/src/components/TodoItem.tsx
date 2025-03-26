import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Trash2, Check } from "lucide-react"
import { BASE_URL } from "../App"
import { Todo } from "./TodoList"

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient()

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Error deleting todo")
      }
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const { mutate: toggleTodo } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Error updating todo")
      }
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  return (
    <Card className={`${todo.completed ? 'bg-muted/50' : ''} transition-colors`}>
      <CardContent className="p-4 flex items-center justify-between">
        <span className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
          {todo.body}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleTodo()}
          >
            <Check className={`h-4 w-4 ${todo.completed ? 'text-green-500' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo()}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}