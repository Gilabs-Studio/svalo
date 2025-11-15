"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Locale } from "@/i18n";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { DemoCredentials } from "@/features/auth/components/demo-credentials";
import { getMessages } from "@/features/auth/lib/get-messages";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface AuthPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function AuthPage({ params }: AuthPageProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();
  const messages = getMessages(locale);

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      // Check URL params for mode
      const searchParams = new URLSearchParams(window.location.search);
      const urlMode = searchParams.get("mode");
      if (urlMode === "register") {
        setMode("register");
      }
    });
  }, [params]);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
    userType: "",
    accountType: "SAVLO",
  });
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginLoading(true);

    const success = await login(email, password);
    if (success) {
      router.push(`/${locale}/dashboard`);
    } else {
      setLoginError(messages.login.error);
      setIsLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (formData.password !== formData.confirmPassword) {
      setRegisterError(messages.register.errors.passwordMismatch);
      return;
    }

    if (formData.password.length < 8) {
      setRegisterError(messages.register.errors.passwordTooShort);
      return;
    }

    setIsRegisterLoading(true);
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMode("login");
    setIsRegisterLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout
      locale={locale}
      mode={mode}
      onModeChange={setMode}
      title={mode === "login" ? messages.login.title : messages.register.title}
      subtitle={
        mode === "login" ? messages.login.subtitle : messages.register.subtitle
      }
      icon={
        mode === "login" ? (
          <LogIn className="w-8 h-8 text-primary" />
        ) : (
          <UserPlus className="w-8 h-8 text-primary" />
        )
      }
    >
      {mode === "login" ? (
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {loginError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={messages.login.email}
              required
              disabled={isLoginLoading}
              className="h-11"
            />

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={messages.login.password}
              required
              disabled={isLoginLoading}
              className="h-11"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300"
              />
              <label
                htmlFor="remember"
                className="text-muted-foreground cursor-pointer"
              >
                {messages.login.rememberMe}
              </label>
            </div>
            <Link href="#" className="text-primary hover:underline text-sm">
              {messages.login.forgotPassword}
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold"
            size="lg"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? messages.login.signingIn : messages.login.signIn}
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{messages.login.demoCredentials}</span>
            <DemoCredentials locale={locale} />
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-5">
          {registerError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {registerError}
            </div>
          )}

          <div className="space-y-4">
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={messages.register.fullName}
              required
              disabled={isRegisterLoading}
              className="h-11"
            />

            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={messages.register.email}
              required
              disabled={isRegisterLoading}
              className="h-11"
            />

            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder={messages.register.phoneNumber}
              required
              disabled={isRegisterLoading}
              className="h-11"
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
                disabled={isRegisterLoading}
                className="h-11"
              >
                <option value="">{messages.register.userType}</option>
                <option value="INDIVIDUAL">Individual</option>
                <option value="BUSINESS">Business</option>
              </Select>
              <Select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                required
                disabled={isRegisterLoading}
                className="h-11"
              >
                <option value="SAVLO">Savlo</option>
                <option value="SAVLO_PLUS">Savlo+</option>
              </Select>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={messages.register.passwordHint}
              required
              disabled={isRegisterLoading}
              className="h-11"
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder={messages.register.confirmPassword}
              required
              disabled={isRegisterLoading}
              className="h-11"
            />
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 rounded border-gray-300"
            />
            <label
              htmlFor="terms"
              className="text-muted-foreground cursor-pointer leading-relaxed"
            >
              {messages.register.terms}{" "}
              <Link href="/terms" className="text-primary hover:underline">
                {messages.register.termsLink}
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {messages.register.privacyLink}
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold"
            size="lg"
            disabled={isRegisterLoading}
          >
            {isRegisterLoading
              ? messages.register.creatingAccount
              : messages.register.createAccount}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
