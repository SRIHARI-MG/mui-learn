import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "./components/Select.tsx";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";
import {
  Alert,
  Container,
  CssBaseline,
  Skeleton,
  Snackbar,
} from "@mui/material";
import Label from "./components/Label.tsx";

const names: string[] = [
  "India",
  "USA",
  "UK",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
];

const schema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .nonempty("Name is required"),
    password: z.string().nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    country: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

type FormData = z.infer<typeof schema>;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
    },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);

    setIsSubmittingForm(true);

    setTimeout(() => {
      reset();
      setIsSubmittingForm(false);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={50}
            />
          </div>
          <Skeleton
            variant="rectangular"
            height={50}
            width="100%"
            sx={{ marginTop: 2 }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <CssBaseline />
      <div className="h-screen flex items-center justify-center px-10">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" required>
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your Name"
                value={watch("name")}
                {...register("name")}
                errorText={errors.name?.message}
                type="text"
                autoComplete="off"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" required>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={watch("password")}
                {...register("password")}
                errorText={errors.password?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" required>
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your Password"
                value={watch("confirmPassword")}
                {...register("confirmPassword")}
                errorText={errors.confirmPassword?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                options={names}
                selectedValues={watch("country") || ""}
                onChange={(value) => setValue("country", value)}
                disabled={false}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full text-xl mt-6"
            disabled={!isValid}
            isLoading={isSubmittingForm}
          >
            Submit
          </Button>
        </form>
        <Snackbar
          open={isSubmitSuccessful}
          autoHideDuration={1200}
          onClose={() => {
            return isSubmitted && false;
          }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Successfully Submitted
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default App;
