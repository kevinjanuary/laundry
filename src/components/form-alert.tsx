import { cn } from "@/lib/utils"

export const FormAlert = ({
  success,
  message,
}: {
  success?: boolean
  message?: string
}) => {
  return (
    <>
      {message && (
        <div
          className={cn(
            "px-4 py-2 rounded-sm text-sm",
            success
              ? "bg-emerald-600/10 text-emerald-600"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {message}
        </div>
      )}
    </>
  )
}
