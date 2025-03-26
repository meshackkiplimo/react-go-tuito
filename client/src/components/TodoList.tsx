import { useQuery } from "@tanstack/react-query"
import TodoItem from "./TodoItem"
import { BASE_URL } from "../App"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export type Todo = {
  _id: number
  body: string
  completed: boolean
}

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch(BASE_URL + "/todos")
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }
        return data || []
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle 
          className="text-center bg-gradient-to-l from-[#0b85f8] to-[#00ffff] bg-clip-text text-transparent"
        >
          Today's Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!isLoading && todos?.length === 0 && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl text-center text-muted-foreground">
              All tasks completed! 🤞
            </p>
            <img src="/go.png" alt="Go logo" width={70} height={70} />
          </div>
        )}
        
        <div className="flex flex-col gap-3 mt-4">
          {todos?.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TodoList