"use client";

import { DateTimePicker, TimePicker } from "@/app/_components/datetime-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  feeling: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  notes: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  sessionDateAndtime: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
});

export default function Bookings() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <h1 className="text-2xl text-foreground mb-12 ">
        Book counseling session
        <p className="text-sm text-muted-foreground mt-2">
          Your well-being matters. Booking a session is a step toward support
          and growth.
        </p>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feeling"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>How are you feeling ?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select how you have been feeling" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about how you are feeling"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sessionDateAndtime"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Session date and time</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-3 md:flex-row md:gap-10">
                      <div className="w-72 space-y-2">
                        <DateTimePicker
                          granularity="day"
                          className="resize-none"
                          {...field}
                        />
                      </div>
                      <div className="w-72 space-y-2">
                        <TimePicker {...field} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-muted-foreground text-sm">
            Note: All information provided is confidential and will only be used
            to assist in scheduling your session. If this is an emergency,
            please seek immediate help from a trusted professional or crisis
            hotline.
          </p>

          <Button type="submit" size={"lg"} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
