import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "../App"

export default function TodoForm() {
  const [todo, setTodo] = useState("")
  const queryClient = useQueryClient()

  const { mutate: createTodo, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(BASE_URL + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: todo }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Error creating todo")
      }
      return data
    },
    onSuccess: () => {
      setTodo("")
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
    onError: (error:any) => {
      console.log(error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!todo.trim()) return
    createTodo()
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 text-sm border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" disabled={isPending || !todo.trim()}>
              {isPending ? "Adding..." : "Add Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}