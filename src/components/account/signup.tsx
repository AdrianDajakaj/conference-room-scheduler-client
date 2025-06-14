"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export function SignupFormDemo({ onSignupSuccess }: { onSignupSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstname.trim()) newErrors.firstname = "Imię jest wymagane.";
    if (!formData.lastname.trim()) newErrors.lastname = "Nazwisko jest wymagane.";

    if (!formData.email.trim()) {
      newErrors.email = "Adres e-mail jest wymagany.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Podany e-mail jest niepoprawny.";
    }

    const password = formData.password;
    if (!password) {
      newErrors.password = "Hasło jest wymagane.";
    } else {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
      const isLongEnough = password.length >= 8;

      if (!isLongEnough || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        newErrors.password =
          "Hasło musi się składać co najmniej z 8 znaków, zawierać dużą i małą literę, cyfrę oraz znak specjalny.";
      }
    }

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Hasła nie są jednakowe.";

    if (!formData.street.trim()) newErrors.street = "Ulica oraz numer budynku są wymagane.";
    if (!formData.city.trim()) newErrors.city = "Miejscowość jest wymagana.";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Kod pocztowy jest wymagany.";
    if (!formData.country.trim()) newErrors.country = "Kraj jest wymagany.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form data is valid:", formData);
    onSignupSuccess();
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
        Załóż swoje konto
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 mb-8">
        Uzupełnij poprawnie wszystkie pola oznaczone *, aby się zarejestrować.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 border-b pb-2">
              Dane osobowe
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Imię*</Label>
                <Input
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  type="text"
                />
                {errors.firstname && <ErrorText>{errors.firstname}</ErrorText>}
              </LabelInputContainer>
              
              <LabelInputContainer>
                <Label htmlFor="lastname">Nazwisko*</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  type="text"
                />
                {errors.lastname && <ErrorText>{errors.lastname}</ErrorText>}
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email">Adres e-mail*</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                type="email"
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password">Hasło*</Label>
              <Input
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                type="password"
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="confirmPassword">Potwierdź hasło*</Label>
              <Input
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                type="password"
              />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
            </LabelInputContainer>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 border-b pb-2">
              Dane adresowe
            </h3>
            
            <LabelInputContainer>
              <Label htmlFor="street">Ulica, nr. domu/mieszkania*</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="123 Main St"
                type="text"
              />
              {errors.street && <ErrorText>{errors.street}</ErrorText>}
            </LabelInputContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="city">Miejscowość*</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  type="text"
                />
                {errors.city && <ErrorText>{errors.city}</ErrorText>}
              </LabelInputContainer>
              
              <LabelInputContainer>
                <Label htmlFor="postalCode">Kod pocztowy*</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  type="text"
                />
                {errors.postalCode && <ErrorText>{errors.postalCode}</ErrorText>}
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="country">Kraj*</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                type="text"
              />
              {errors.country && <ErrorText>{errors.country}</ErrorText>}
            </LabelInputContainer>
                        <PasswordRequirements />

          </div>
        </div>

        <div className="mt-8 flex justify-center">
            <button
                className="w-auto cursor-pointer group/btn relative inline-block h-12 px-6 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow …"
                type="submit"
            >
                Załóż konto
                <BottomGradient />
            </button>
            </div>

      </form>
    </div>
  );
}

const PasswordRequirements = () => (
  <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
    <p>Hasło musi zawierać:</p>
    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 list-disc pl-5">
      <li>co najmniej 8 znaków</li>
      <li>co najmniej 1 dużą literę</li>
      <li>co najmniej 1 małą literę</li>
      <li>co najmniej 1 cyfrę</li>
      <li>co najmniej 1 znak specjalny</li>
    </ul>
  </div>
);

const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{children}</p>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-1", className)}>{children}</div>
);
