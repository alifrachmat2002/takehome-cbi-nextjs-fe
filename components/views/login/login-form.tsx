"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLogin } from "./useLogin"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { form, onSubmit, isLoading, error, loginSchema } = useLogin();
  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
              <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                      Enter your username below to login to your account
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                          <div className="flex flex-col gap-6">
                              <div className="grid gap-3">
                                  <FormField
                                      name="username"
                                      render={({
                                          field,
                                          fieldState: { error },
                                      }) => (
                                          <FormItem>
                                              <FormLabel>Username</FormLabel>
                                              <FormControl>
                                                  <Input
                                                      {...field}
                                                      className={cn({
                                                          "border-destructive":
                                                              error,
                                                      })}
                                                  />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                              </div>
                              <div className="grid gap-3">
                                  <FormField
                                      name="password"
                                      render={({
                                          field,
                                          fieldState: { error },
                                      }) => (
                                          <FormItem>
                                              <FormLabel>Password</FormLabel>
                                              <FormControl>
                                                  <Input
                                                      {...field}
                                                      className={cn({
                                                          "border-destructive":
                                                              error,
                                                      })}
                                                      type="password"
                                                  />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                              </div>
                              <div className="flex flex-col gap-3">
                                  <Button type="submit" className="w-full" disabled={isLoading}>
                                      {isLoading ? "Logging in" : "Login"}
                                  </Button>
                              </div>
                          </div>
                      </form>
                  </Form>
              </CardContent>
          </Card>
      </div>
  );
}
